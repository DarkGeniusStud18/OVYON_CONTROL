import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import logger from '../services/logger';
import path from 'path';

/**
 * GESTIONNAIRE D'ÉTAT (STATE MANAGER)
 * Ce fichier est responsable de la persistence. Chaque objet, chaque lumière, 
 * chaque règle est stocké ici pour ne pas être perdu au redémarrage.
 */

export interface DeviceState {
  id: string;
  type: 'light' | 'door' | 'window' | 'plug' | 'sensor' | 'other';
  name: string;
  online: boolean;
  state: any;
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerDeviceId: string;
  value: any;
  actionDeviceId: string;
  enabled: boolean;
}

class StateManager {
  private db: Database | null = null;
  private devices: Map<string, DeviceState> = new Map();
  private rules: AutomationRule[] = [];

  constructor() {
    this.initDatabase();
  }

  /**
   * INITIALISATION DE LA BASE DE DONNÉES
   * Crée les tables si elles n'existent pas.
   */
  private async initDatabase() {
    try {
      this.db = await open({
        filename: path.join(__dirname, '../../ovyon_control.db'),
        driver: sqlite3.Database
      });

      // Table des appareils (ID, type, nom, état en JSON)
      await this.db.exec(`
        CREATE TABLE IF NOT EXISTS devices (
          id TEXT PRIMARY KEY,
          type TEXT,
          name TEXT,
          state_json TEXT
        );
        CREATE TABLE IF NOT EXISTS rules (
          id TEXT PRIMARY KEY,
          name TEXT,
          triggerDeviceId TEXT,
          value TEXT,
          actionDeviceId TEXT,
          enabled INTEGER
        );
      `);

      logger.info("Base de données SQLite initialisée 🗄️");
      await this.loadFromDb();
    } catch (error) {
      logger.error("Erreur SQLite:", error);
    }
  }

  /**
   * CHARGEMENT DES DONNÉES
   * Lit la base SQLite pour remplir la mémoire vive au démarrage.
   */
  private async loadFromDb() {
    if (!this.db) return;
    
    // Chargement des appareils
    const deviceRows = await this.db.all('SELECT * FROM devices');
    if (deviceRows.length === 0) {
      // Si vide, on crée les objets de base pour la démo
      const initialDevices = [
        { id: 'light_salon', type: 'light', name: 'Salon' },
        { id: 'light_cuisine', type: 'light', name: 'Cuisine' },
        { id: 'door_main', type: 'door', name: 'Porte Principale' },
        { id: 'sensor_env', type: 'sensor', name: 'Capteur Environnement' }
      ];
      for (const d of initialDevices) {
        const defaultState = JSON.stringify({ power: 'off', brightness: 0, temperature: 25, position: 0 });
        await this.db.run('INSERT INTO devices (id, type, name, state_json) VALUES (?, ?, ?, ?)', 
          [d.id, d.type, d.name, defaultState]);
        this.devices.set(d.id, { ...d, online: false, state: JSON.parse(defaultState) } as any);
      }
    } else {
      deviceRows.forEach(row => {
        this.devices.set(row.id, {
          id: row.id,
          type: row.type,
          name: row.name,
          online: false,
          state: JSON.parse(row.state_json)
        });
      });
    }

    // Chargement des règles d'automatisation
    const ruleRows = await this.db.all('SELECT * FROM rules');
    this.rules = ruleRows.map(row => ({
      ...row,
      enabled: row.enabled === 1
    }));
  }

  /**
   * MISE À JOUR DE L'ÉTAT D'UN APPAREIL
   * Sauvegarde le nouvel état (ex: ON/OFF) en base de données.
   */
  public async updateDeviceState(deviceId: string, newState: any) {
    const device = this.devices.get(deviceId);
    if (device) {
      device.state = { ...device.state, ...newState };
      device.online = true;
      if (this.db) {
        await this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', 
          [JSON.stringify(device.state), deviceId]);
      }
    }
  }

  /**
   * TOGGLE D'UNE RÈGLE
   * Active ou désactive un scénario sans le supprimer.
   */
  public async toggleRule(ruleId: string) {
    const rule = this.rules.find(r => r.id === ruleId);
    if (rule && this.db) {
      rule.enabled = !rule.enabled;
      await this.db.run('UPDATE rules SET enabled = ? WHERE id = ?', [rule.enabled ? 1 : 0, ruleId]);
    }
  }

  public async addRule(rule: AutomationRule) {
    if (this.db) {
      await this.db.run('INSERT INTO rules (id, name, triggerDeviceId, value, actionDeviceId, enabled) VALUES (?, ?, ?, ?, ?, ?)',
        [rule.id, rule.name, rule.triggerDeviceId, rule.value, rule.actionDeviceId, rule.enabled ? 1 : 0]);
      this.rules.push(rule);
    }
  }

  public async updateRule(ruleId: string, updates: Partial<AutomationRule>) {
    const rule = this.rules.find(r => r.id === ruleId);
    if (rule && this.db) {
      Object.assign(rule, updates);
      await this.db.run(
        'UPDATE rules SET name = ?, triggerDeviceId = ?, value = ?, actionDeviceId = ?, enabled = ? WHERE id = ?',
        [rule.name, rule.triggerDeviceId, rule.value, rule.actionDeviceId, rule.enabled ? 1 : 0, ruleId]
      );
    }
  }

  public async deleteRule(ruleId: string) {
    if (this.db) {
      await this.db.run('DELETE FROM rules WHERE id = ?', [ruleId]);
      this.rules = this.rules.filter(r => r.id !== ruleId);
    }
  }

  /**
   * ENREGISTREMENT D'UN NOUVEL APPAREIL
   * Méthode utilisée lors de l'appairage NFC/Bluetooth.
   */
  public async addDevice(device: any) {
    if (this.db) {
      const stateJson = JSON.stringify(device.state || { power: 'off' });
      await this.db.run('INSERT OR REPLACE INTO devices (id, type, name, state_json) VALUES (?, ?, ?, ?)',
        [device.id, device.type, device.name, stateJson]);
      this.devices.set(device.id, { ...device, online: true, state: JSON.parse(stateJson) });
      logger.info(`Appareil enregistré en base : ${device.name} (${device.id})`);
    }
  }

  public async deleteDevice(deviceId: string) {
    if (this.db) {
      await this.db.run('DELETE FROM devices WHERE id = ?', [deviceId]);
      this.devices.delete(deviceId);
    }
  }

  public async updateDeviceMeta(deviceId: string, name: string) {
    const device = this.devices.get(deviceId);
    if (device && this.db) {
      device.name = name;
      await this.db.run('UPDATE devices SET name = ? WHERE id = ?', [name, deviceId]);
    }
  }

  /**
   * RÉINITIALISATION TOTALE
   * Efface tout pour remettre le système à l'état d'usine.
   */
  public async resetSystem() {
    if (this.db) {
      await this.db.run('DELETE FROM devices');
      await this.db.run('DELETE FROM rules');
      this.devices.clear();
      this.rules = [];
      logger.warn("SYSTÈME RÉINITIALISÉ : Données SQLite effacées.");
      await this.loadFromDb(); 
    }
  }

  /**
   * COMMANDE GLOBALE
   * Éteint tous les objets connectés d'un coup (Économie d'énergie).
   */
  public async updateAllDevices(newState: any) {
    for (const [id, device] of this.devices.entries()) {
      device.state = { ...device.state, ...newState };
      if (this.db) {
        await this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', 
          [JSON.stringify(device.state), id]);
      }
    }
  }

  public getAllDevices() { return Array.from(this.devices.values()); }
  public getRules() { return this.rules; }
}

export const stateManager = new StateManager();