import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import logger from '../services/logger';
import path from 'path';

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
  private systemLogs: string[] = [];
  public ready: Promise<void>;

  constructor() {
    this.ready = this.initDatabase();
  }

  private async initDatabase() {
    try {
      this.db = await open({
        filename: path.join(__dirname, '../../ovyon_control.db'),
        driver: sqlite3.Database
      });

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

  private async loadFromDb() {
    if (!this.db) return;
    
    // Load Devices
    const deviceRows = await this.db.all('SELECT * FROM devices');
    deviceRows.forEach(row => {
      this.devices.set(row.id, {
        id: row.id,
        type: row.type,
        name: row.name,
        online: false,
        state: JSON.parse(row.state_json)
      });
    });

    // Load Rules
    const ruleRows = await this.db.all('SELECT * FROM rules');
    this.rules = ruleRows.map(row => ({
      ...row,
      enabled: row.enabled === 1
    }));
  }

  // LOGGING SYSTÈME
  private logAction(action: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.systemLogs.unshift(`[${timestamp}] ${action}`);
    if (this.systemLogs.length > 50) this.systemLogs.pop();
  }

  public getSystemLogs() {
    return this.systemLogs;
  }

  // --- DEVICE MANAGEMENT ---

  public async updateDeviceState(deviceId: string, newState: any) {
    const device = this.devices.get(deviceId);
    if (device) {
      device.state = { ...device.state, ...newState };
      device.online = true;
      if (this.db) {
        await this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', 
          [JSON.stringify(device.state), deviceId]);
      }
      // Log important changes only to avoid spam
      if (newState.power || newState.state) {
        this.logAction(`${device.name}: État changé -> ${JSON.stringify(newState)}`);
      }
    }
  }

  public async addDevice(device: any) {
    if (this.db) {
      const stateJson = JSON.stringify(device.state || { power: 'off' });
      await this.db.run('INSERT OR REPLACE INTO devices (id, type, name, state_json) VALUES (?, ?, ?, ?)',
        [device.id, device.type, device.name, stateJson]);
      this.devices.set(device.id, { ...device, online: true, state: JSON.parse(stateJson) });
      this.logAction(`Nouvel appareil: ${device.name}`);
    }
  }

  public async deleteDevice(deviceId: string) {
    if (this.db) {
      await this.db.run('DELETE FROM devices WHERE id = ?', [deviceId]);
      this.devices.delete(deviceId);
      this.logAction(`Appareil supprimé: ${deviceId}`);
    }
  }

  public async updateDeviceMeta(deviceId: string, name: string) {
    const device = this.devices.get(deviceId);
    if (device && this.db) {
      device.name = name;
      await this.db.run('UPDATE devices SET name = ? WHERE id = ?', [name, deviceId]);
    }
  }

  // --- RULE MANAGEMENT ---

  public async toggleRule(ruleId: string) {
    const rule = this.rules.find(r => r.id === ruleId);
    if (rule && this.db) {
      rule.enabled = !rule.enabled;
      await this.db.run('UPDATE rules SET enabled = ? WHERE id = ?', [rule.enabled ? 1 : 0, ruleId]);
      this.logAction(`Règle ${rule.name}: ${rule.enabled ? 'ACTIVÉE' : 'DÉSACTIVÉE'}`);
    }
  }

  public async addRule(rule: AutomationRule) {
    if (this.db) {
      await this.db.run('INSERT INTO rules (id, name, triggerDeviceId, value, actionDeviceId, enabled) VALUES (?, ?, ?, ?, ?, ?)',
        [rule.id, rule.name, rule.triggerDeviceId, rule.value, rule.actionDeviceId, rule.enabled ? 1 : 0]);
      this.rules.push(rule);
      this.logAction(`Nouvelle règle créée: ${rule.name}`);
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

  // --- SYSTEM FUNCTIONS ---

  public async resetSystem() {
    if (this.db) {
      await this.db.run('DELETE FROM devices');
      await this.db.run('DELETE FROM rules');
      this.devices.clear();
      this.rules = [];
      this.logAction("🛑 SYSTÈME RÉINITIALISÉ (Factory Reset)");
    }
  }

  /**
   * MODE PANIQUE
   * Exécute la séquence de sécurité (Portes fermées, Lumières OFF).
   * Note: En prod, cela enverrait aussi des ordres MQTT.
   */
  public async triggerPanicMode() {
    this.logAction("⚠️ ALERTE PANIQUE DÉCLENCHÉE");
    
    // Simulation logic for DB state
    for (const [id, device] of this.devices.entries()) {
      if (device.type === 'door') device.state = { state: 'closed', position: 0 };
      if (device.type === 'light' || device.type === 'plug') device.state = { power: 'off', brightness: 0 };
      
      if (this.db) {
        await this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', 
          [JSON.stringify(device.state), id]);
      }
    }
  }

  public async updateAllDevices(newState: any) {
    for (const [id, device] of this.devices.entries()) {
      device.state = { ...device.state, ...newState };
      if (this.db) {
        await this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', 
          [JSON.stringify(device.state), id]);
      }
    }
    this.logAction(`COMMANDE GLOBALE : ${JSON.stringify(newState)}`);
  }

  public getAllDevices() { return Array.from(this.devices.values()); }
  public getRules() { return this.rules; }
}

export const stateManager = new StateManager();

