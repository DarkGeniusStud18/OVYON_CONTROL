"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateManager = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const logger_1 = __importDefault(require("../services/logger"));
const path_1 = __importDefault(require("path"));
class StateManager {
    constructor() {
        this.db = null;
        this.devices = new Map();
        this.rules = [];
        this.systemLogs = []; // Logs en mémoire pour l'admin
        this.initDatabase();
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.db = yield (0, sqlite_1.open)({
                    filename: path_1.default.join(__dirname, '../../ovyon_control.db'),
                    driver: sqlite3_1.default.Database
                });
                yield this.db.exec(`
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
                logger_1.default.info("Base de données SQLite initialisée 🗄️");
                yield this.loadFromDb();
            }
            catch (error) {
                logger_1.default.error("Erreur SQLite:", error);
            }
        });
    }
    loadFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            // Load Devices
            const deviceRows = yield this.db.all('SELECT * FROM devices');
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
            const ruleRows = yield this.db.all('SELECT * FROM rules');
            this.rules = ruleRows.map(row => (Object.assign(Object.assign({}, row), { enabled: row.enabled === 1 })));
        });
    }
    // LOGGING SYSTÈME
    logAction(action) {
        const timestamp = new Date().toLocaleTimeString();
        this.systemLogs.unshift(`[${timestamp}] ${action}`);
        if (this.systemLogs.length > 50)
            this.systemLogs.pop();
    }
    getSystemLogs() {
        return this.systemLogs;
    }
    // --- DEVICE MANAGEMENT ---
    updateDeviceState(deviceId, newState) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = this.devices.get(deviceId);
            if (device) {
                device.state = Object.assign(Object.assign({}, device.state), newState);
                device.online = true;
                if (this.db) {
                    yield this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', [JSON.stringify(device.state), deviceId]);
                }
                // Log important changes only to avoid spam
                if (newState.power || newState.state) {
                    this.logAction(`${device.name}: État changé -> ${JSON.stringify(newState)}`);
                }
            }
        });
    }
    addDevice(device) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                const stateJson = JSON.stringify(device.state || { power: 'off' });
                yield this.db.run('INSERT OR REPLACE INTO devices (id, type, name, state_json) VALUES (?, ?, ?, ?)', [device.id, device.type, device.name, stateJson]);
                this.devices.set(device.id, Object.assign(Object.assign({}, device), { online: true, state: JSON.parse(stateJson) }));
                this.logAction(`Nouvel appareil: ${device.name}`);
            }
        });
    }
    deleteDevice(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.run('DELETE FROM devices WHERE id = ?', [deviceId]);
                this.devices.delete(deviceId);
                this.logAction(`Appareil supprimé: ${deviceId}`);
            }
        });
    }
    updateDeviceMeta(deviceId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = this.devices.get(deviceId);
            if (device && this.db) {
                device.name = name;
                yield this.db.run('UPDATE devices SET name = ? WHERE id = ?', [name, deviceId]);
            }
        });
    }
    // --- RULE MANAGEMENT ---
    toggleRule(ruleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = this.rules.find(r => r.id === ruleId);
            if (rule && this.db) {
                rule.enabled = !rule.enabled;
                yield this.db.run('UPDATE rules SET enabled = ? WHERE id = ?', [rule.enabled ? 1 : 0, ruleId]);
                this.logAction(`Règle ${rule.name}: ${rule.enabled ? 'ACTIVÉE' : 'DÉSACTIVÉE'}`);
            }
        });
    }
    addRule(rule) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.run('INSERT INTO rules (id, name, triggerDeviceId, value, actionDeviceId, enabled) VALUES (?, ?, ?, ?, ?, ?)', [rule.id, rule.name, rule.triggerDeviceId, rule.value, rule.actionDeviceId, rule.enabled ? 1 : 0]);
                this.rules.push(rule);
                this.logAction(`Nouvelle règle créée: ${rule.name}`);
            }
        });
    }
    updateRule(ruleId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const rule = this.rules.find(r => r.id === ruleId);
            if (rule && this.db) {
                Object.assign(rule, updates);
                yield this.db.run('UPDATE rules SET name = ?, triggerDeviceId = ?, value = ?, actionDeviceId = ?, enabled = ? WHERE id = ?', [rule.name, rule.triggerDeviceId, rule.value, rule.actionDeviceId, rule.enabled ? 1 : 0, ruleId]);
            }
        });
    }
    deleteRule(ruleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.run('DELETE FROM rules WHERE id = ?', [ruleId]);
                this.rules = this.rules.filter(r => r.id !== ruleId);
            }
        });
    }
    // --- SYSTEM FUNCTIONS ---
    resetSystem() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.run('DELETE FROM devices');
                yield this.db.run('DELETE FROM rules');
                this.devices.clear();
                this.rules = [];
                this.logAction("🛑 SYSTÈME RÉINITIALISÉ (Factory Reset)");
            }
        });
    }
    /**
     * MODE PANIQUE
     * Exécute la séquence de sécurité (Portes fermées, Lumières OFF).
     * Note: En prod, cela enverrait aussi des ordres MQTT.
     */
    triggerPanicMode() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logAction("⚠️ ALERTE PANIQUE DÉCLENCHÉE");
            // Simulation logic for DB state
            for (const [id, device] of this.devices.entries()) {
                if (device.type === 'door')
                    device.state = { state: 'closed', position: 0 };
                if (device.type === 'light' || device.type === 'plug')
                    device.state = { power: 'off', brightness: 0 };
                if (this.db) {
                    yield this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', [JSON.stringify(device.state), id]);
                }
            }
        });
    }
    updateAllDevices(newState) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [id, device] of this.devices.entries()) {
                device.state = Object.assign(Object.assign({}, device.state), newState);
                if (this.db) {
                    yield this.db.run('UPDATE devices SET state_json = ? WHERE id = ?', [JSON.stringify(device.state), id]);
                }
            }
            this.logAction(`COMMANDE GLOBALE : ${JSON.stringify(newState)}`);
        });
    }
    getAllDevices() { return Array.from(this.devices.values()); }
    getRules() { return this.rules; }
}
exports.stateManager = new StateManager();
