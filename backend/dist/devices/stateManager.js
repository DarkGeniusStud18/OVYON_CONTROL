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
const crypto_1 = require("crypto");
class StateManager {
    constructor() {
        this.db = null;
        this.devices = new Map();
        this.rules = [];
        this.systemLogs = [];
        this.ready = this.initDatabase();
    }
    ensureColumnExists(tableName, columnName, columnDef) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            const columns = yield this.db.all(`PRAGMA table_info(${tableName})`);
            if (!columns.some((column) => column.name === columnName)) {
                yield this.db.run(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDef}`);
            }
        });
    }
    runSchemaMigrations() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            yield this.ensureColumnExists('auth_users', 'pin_hash', 'TEXT');
            yield this.ensureColumnExists('auth_users', 'updated_at', 'DATETIME');
            yield this.ensureColumnExists('webauthn_credentials', 'public_key_pem', "TEXT DEFAULT ''");
            yield this.ensureColumnExists('webauthn_credentials', 'algorithm', 'INTEGER DEFAULT -7');
        });
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
        CREATE TABLE IF NOT EXISTS command_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          normalized_text TEXT NOT NULL,
          source TEXT NOT NULL,
          matched_intent TEXT,
          success INTEGER NOT NULL,
          suggestions_json TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS auth_users (
          id TEXT PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          display_name TEXT NOT NULL,
          pin_hash TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS webauthn_credentials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          credential_id TEXT NOT NULL UNIQUE,
          public_key_pem TEXT NOT NULL,
          algorithm INTEGER NOT NULL DEFAULT -7,
          transports_json TEXT,
          sign_count INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          last_used_at DATETIME,
          FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS auth_challenges (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          challenge TEXT NOT NULL,
          username TEXT NOT NULL,
          flow TEXT NOT NULL,
          expires_at DATETIME NOT NULL,
          used INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS auth_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id TEXT NOT NULL,
          token_hash TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          expires_at DATETIME NOT NULL,
          revoked INTEGER NOT NULL DEFAULT 0,
          FOREIGN KEY (user_id) REFERENCES auth_users(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_auth_challenges_lookup
          ON auth_challenges(challenge, username, flow, used);
        CREATE INDEX IF NOT EXISTS idx_webauthn_credentials_user
          ON webauthn_credentials(user_id);
        CREATE INDEX IF NOT EXISTS idx_auth_sessions_lookup
          ON auth_sessions(token_hash, revoked, expires_at);
      `);
                logger_1.default.info("Base de données SQLite initialisée 🗄️");
                yield this.runSchemaMigrations();
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
                yield this.db.run('DELETE FROM command_history');
                yield this.db.run('DELETE FROM webauthn_credentials');
                yield this.db.run('DELETE FROM auth_users');
                yield this.db.run('DELETE FROM auth_challenges');
                yield this.db.run('DELETE FROM auth_sessions');
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
    addCommandHistory(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.db)
                return;
            yield this.db.run('INSERT INTO command_history (text, normalized_text, source, matched_intent, success, suggestions_json) VALUES (?, ?, ?, ?, ?, ?)', [
                entry.text,
                entry.normalizedText,
                entry.source,
                entry.matchedIntent,
                entry.success ? 1 : 0,
                ((_a = entry.suggestions) === null || _a === void 0 ? void 0 : _a.length) ? JSON.stringify(entry.suggestions) : null
            ]);
        });
    }
    getRecentCommandHistory() {
        return __awaiter(this, arguments, void 0, function* (limit = 50) {
            if (!this.db)
                return [];
            const safeLimit = Math.max(1, Math.min(limit, 200));
            const rows = yield this.db.all('SELECT id, text, normalized_text, source, matched_intent, success, suggestions_json, created_at FROM command_history ORDER BY id DESC LIMIT ?', [safeLimit]);
            return rows;
        });
    }
    getAuthUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.db)
                return null;
            const row = yield this.db.get('SELECT id, username, display_name, pin_hash, created_at, updated_at FROM auth_users WHERE username = ?', [username.trim().toLowerCase()]);
            return (_a = row) !== null && _a !== void 0 ? _a : null;
        });
    }
    upsertAuthUser(username, displayName, pinHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const normalizedUsername = username.trim().toLowerCase();
            const safeDisplayName = ((displayName === null || displayName === void 0 ? void 0 : displayName.trim()) || normalizedUsername).slice(0, 80);
            const existing = yield this.getAuthUserByUsername(normalizedUsername);
            if (existing) {
                yield this.db.run('UPDATE auth_users SET display_name = ?, pin_hash = COALESCE(?, pin_hash), updated_at = CURRENT_TIMESTAMP WHERE id = ?', [safeDisplayName, pinHash !== null && pinHash !== void 0 ? pinHash : null, existing.id]);
            }
            else {
                yield this.db.run('INSERT INTO auth_users (id, username, display_name, pin_hash) VALUES (?, ?, ?, ?)', [(0, crypto_1.randomUUID)(), normalizedUsername, safeDisplayName, pinHash !== null && pinHash !== void 0 ? pinHash : null]);
            }
            const user = yield this.getAuthUserByUsername(normalizedUsername);
            if (!user) {
                throw new Error('Unable to persist auth user');
            }
            return user;
        });
    }
    getCredentialById(credentialId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!this.db)
                return null;
            const row = yield this.db.get(`SELECT id, user_id, credential_id, public_key_pem, algorithm, transports_json, sign_count, created_at, last_used_at
       FROM webauthn_credentials WHERE credential_id = ?`, [credentialId]);
            return (_a = row) !== null && _a !== void 0 ? _a : null;
        });
    }
    getCredentialsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return [];
            const rows = yield this.db.all(`SELECT id, user_id, credential_id, public_key_pem, algorithm, transports_json, sign_count, created_at, last_used_at
       FROM webauthn_credentials WHERE user_id = ? ORDER BY id DESC`, [userId]);
            return rows;
        });
    }
    addWebAuthnCredential(input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            yield this.db.run(`INSERT OR REPLACE INTO webauthn_credentials
      (id, user_id, credential_id, public_key_pem, algorithm, transports_json, sign_count, created_at, last_used_at)
      VALUES (
        (SELECT id FROM webauthn_credentials WHERE credential_id = ?),
        ?, ?, ?, ?, ?, COALESCE(?, 0),
        COALESCE((SELECT created_at FROM webauthn_credentials WHERE credential_id = ?), CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
      )`, [
                input.credentialId,
                input.userId,
                input.credentialId,
                input.publicKeyPem,
                input.algorithm,
                ((_a = input.transports) === null || _a === void 0 ? void 0 : _a.length) ? JSON.stringify(input.transports) : null,
                (_b = input.signCount) !== null && _b !== void 0 ? _b : 0,
                input.credentialId
            ]);
        });
    }
    updateCredentialCounter(credentialId, signCount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            yield this.db.run('UPDATE webauthn_credentials SET sign_count = ?, last_used_at = CURRENT_TIMESTAMP WHERE credential_id = ?', [signCount, credentialId]);
        });
    }
    storeAuthChallenge(challenge_1, username_1, flow_1) {
        return __awaiter(this, arguments, void 0, function* (challenge, username, flow, ttlSeconds = 300) {
            if (!this.db)
                return;
            const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
            yield this.db.run('INSERT INTO auth_challenges (challenge, username, flow, expires_at, used) VALUES (?, ?, ?, ?, 0)', [challenge, username.trim().toLowerCase(), flow, expiresAt]);
        });
    }
    consumeAuthChallenge(challenge, username, flow) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return false;
            const row = yield this.db.get(`SELECT id FROM auth_challenges
       WHERE challenge = ? AND username = ? AND flow = ? AND used = 0
         AND datetime(expires_at) >= datetime('now')
       ORDER BY id DESC LIMIT 1`, [challenge, username.trim().toLowerCase(), flow]);
            if (!row)
                return false;
            yield this.db.run('UPDATE auth_challenges SET used = 1 WHERE id = ?', [row.id]);
            return true;
        });
    }
    deleteExpiredAuthChallenges() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            yield this.db.run("DELETE FROM auth_challenges WHERE used = 1 OR datetime(expires_at) < datetime('now')");
        });
    }
    hashSessionToken(token) {
        return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    createAuthSession(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, ttlSeconds = 300) {
            if (!this.db) {
                throw new Error('Database not initialized');
            }
            const token = (0, crypto_1.randomBytes)(32).toString('base64url');
            const tokenHash = this.hashSessionToken(token);
            const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
            yield this.db.run('INSERT INTO auth_sessions (user_id, token_hash, expires_at, revoked) VALUES (?, ?, ?, 0)', [userId, tokenHash, expiresAt]);
            return token;
        });
    }
    validateAuthSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db || !token)
                return { valid: false };
            const tokenHash = this.hashSessionToken(token);
            const row = yield this.db.get(`SELECT user_id
       FROM auth_sessions
       WHERE token_hash = ? AND revoked = 0
         AND datetime(expires_at) >= datetime('now')
       ORDER BY id DESC LIMIT 1`, [tokenHash]);
            if (!row)
                return { valid: false };
            return { valid: true, userId: row.user_id };
        });
    }
    revokeAuthSession(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db || !token)
                return;
            yield this.db.run('UPDATE auth_sessions SET revoked = 1 WHERE token_hash = ?', [this.hashSessionToken(token)]);
        });
    }
    deleteExpiredAuthSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            yield this.db.run("DELETE FROM auth_sessions WHERE revoked = 1 OR datetime(expires_at) < datetime('now')");
        });
    }
    getAllDevices() { return Array.from(this.devices.values()); }
    getRules() { return this.rules; }
}
exports.stateManager = new StateManager();
