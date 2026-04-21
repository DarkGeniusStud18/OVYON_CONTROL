import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import logger from '../services/logger';
import path from 'path';
import { createHash, randomBytes, randomUUID } from 'crypto';

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

export interface CommandHistoryEntry {
  id: number;
  text: string;
  normalized_text: string;
  source: string;
  matched_intent: string | null;
  success: number;
  suggestions_json: string | null;
  created_at: string;
}

export interface AuthUserEntry {
  id: string;
  username: string;
  display_name: string;
  pin_hash: string | null;
  created_at: string;
  updated_at: string;
}

export interface WebAuthnCredentialEntry {
  id: number;
  user_id: string;
  credential_id: string;
  public_key_pem: string;
  algorithm: number;
  transports_json: string | null;
  sign_count: number;
  created_at: string;
  last_used_at: string | null;
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

  private async ensureColumnExists(tableName: string, columnName: string, columnDef: string) {
    if (!this.db) return;
    const columns = await this.db.all(`PRAGMA table_info(${tableName})`) as Array<{ name: string }>;
    if (!columns.some((column) => column.name === columnName)) {
      await this.db.run(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDef}`);
    }
  }

  private async runSchemaMigrations() {
    if (!this.db) return;
    await this.ensureColumnExists('auth_users', 'pin_hash', 'TEXT');
    await this.ensureColumnExists('auth_users', 'updated_at', 'DATETIME');
    await this.ensureColumnExists('webauthn_credentials', 'public_key_pem', "TEXT DEFAULT ''");
    await this.ensureColumnExists('webauthn_credentials', 'algorithm', 'INTEGER DEFAULT -7');
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

      logger.info("Base de données SQLite initialisée 🗄️");
      await this.runSchemaMigrations();
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
      await this.db.run('DELETE FROM command_history');
      await this.db.run('DELETE FROM webauthn_credentials');
      await this.db.run('DELETE FROM auth_users');
      await this.db.run('DELETE FROM auth_challenges');
      await this.db.run('DELETE FROM auth_sessions');
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

  public async addCommandHistory(entry: {
    text: string;
    normalizedText: string;
    source: string;
    matchedIntent: string | null;
    success: boolean;
    suggestions?: string[];
  }) {
    if (!this.db) return;
    await this.db.run(
      'INSERT INTO command_history (text, normalized_text, source, matched_intent, success, suggestions_json) VALUES (?, ?, ?, ?, ?, ?)',
      [
        entry.text,
        entry.normalizedText,
        entry.source,
        entry.matchedIntent,
        entry.success ? 1 : 0,
        entry.suggestions?.length ? JSON.stringify(entry.suggestions) : null
      ]
    );
  }

  public async getRecentCommandHistory(limit = 50): Promise<CommandHistoryEntry[]> {
    if (!this.db) return [];
    const safeLimit = Math.max(1, Math.min(limit, 200));
    const rows = await this.db.all(
      'SELECT id, text, normalized_text, source, matched_intent, success, suggestions_json, created_at FROM command_history ORDER BY id DESC LIMIT ?',
      [safeLimit]
    );
    return rows as CommandHistoryEntry[];
  }

  public async getAuthUserByUsername(username: string): Promise<AuthUserEntry | null> {
    if (!this.db) return null;
    const row = await this.db.get(
      'SELECT id, username, display_name, pin_hash, created_at, updated_at FROM auth_users WHERE username = ?',
      [username.trim().toLowerCase()]
    );
    return (row as AuthUserEntry | undefined) ?? null;
  }

  public async upsertAuthUser(username: string, displayName?: string, pinHash?: string | null): Promise<AuthUserEntry> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    const normalizedUsername = username.trim().toLowerCase();
    const safeDisplayName = (displayName?.trim() || normalizedUsername).slice(0, 80);
    const existing = await this.getAuthUserByUsername(normalizedUsername);

    if (existing) {
      await this.db.run(
        'UPDATE auth_users SET display_name = ?, pin_hash = COALESCE(?, pin_hash), updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [safeDisplayName, pinHash ?? null, existing.id]
      );
    } else {
      await this.db.run(
        'INSERT INTO auth_users (id, username, display_name, pin_hash) VALUES (?, ?, ?, ?)',
        [randomUUID(), normalizedUsername, safeDisplayName, pinHash ?? null]
      );
    }

    const user = await this.getAuthUserByUsername(normalizedUsername);
    if (!user) {
      throw new Error('Unable to persist auth user');
    }

    return user;
  }

  public async getCredentialById(credentialId: string): Promise<WebAuthnCredentialEntry | null> {
    if (!this.db) return null;
    const row = await this.db.get(
      `SELECT id, user_id, credential_id, public_key_pem, algorithm, transports_json, sign_count, created_at, last_used_at
       FROM webauthn_credentials WHERE credential_id = ?`,
      [credentialId]
    );
    return (row as WebAuthnCredentialEntry | undefined) ?? null;
  }

  public async getCredentialsForUser(userId: string): Promise<WebAuthnCredentialEntry[]> {
    if (!this.db) return [];
    const rows = await this.db.all(
      `SELECT id, user_id, credential_id, public_key_pem, algorithm, transports_json, sign_count, created_at, last_used_at
       FROM webauthn_credentials WHERE user_id = ? ORDER BY id DESC`,
      [userId]
    );
    return rows as WebAuthnCredentialEntry[];
  }

  public async addWebAuthnCredential(input: {
    userId: string;
    credentialId: string;
    publicKeyPem: string;
    algorithm: number;
    transports?: string[];
    signCount?: number;
  }): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    await this.db.run(
      `INSERT OR REPLACE INTO webauthn_credentials
      (id, user_id, credential_id, public_key_pem, algorithm, transports_json, sign_count, created_at, last_used_at)
      VALUES (
        (SELECT id FROM webauthn_credentials WHERE credential_id = ?),
        ?, ?, ?, ?, ?, COALESCE(?, 0),
        COALESCE((SELECT created_at FROM webauthn_credentials WHERE credential_id = ?), CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
      )`,
      [
        input.credentialId,
        input.userId,
        input.credentialId,
        input.publicKeyPem,
        input.algorithm,
        input.transports?.length ? JSON.stringify(input.transports) : null,
        input.signCount ?? 0,
        input.credentialId
      ]
    );
  }

  public async updateCredentialCounter(credentialId: string, signCount: number): Promise<void> {
    if (!this.db) return;
    await this.db.run(
      'UPDATE webauthn_credentials SET sign_count = ?, last_used_at = CURRENT_TIMESTAMP WHERE credential_id = ?',
      [signCount, credentialId]
    );
  }

  public async storeAuthChallenge(challenge: string, username: string, flow: 'register' | 'login', ttlSeconds = 300): Promise<void> {
    if (!this.db) return;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
    await this.db.run(
      'INSERT INTO auth_challenges (challenge, username, flow, expires_at, used) VALUES (?, ?, ?, ?, 0)',
      [challenge, username.trim().toLowerCase(), flow, expiresAt]
    );
  }

  public async consumeAuthChallenge(challenge: string, username: string, flow: 'register' | 'login'): Promise<boolean> {
    if (!this.db) return false;

    const row = await this.db.get(
      `SELECT id FROM auth_challenges
       WHERE challenge = ? AND username = ? AND flow = ? AND used = 0
         AND datetime(expires_at) >= datetime('now')
       ORDER BY id DESC LIMIT 1`,
      [challenge, username.trim().toLowerCase(), flow]
    ) as { id: number } | undefined;

    if (!row) return false;

    await this.db.run('UPDATE auth_challenges SET used = 1 WHERE id = ?', [row.id]);
    return true;
  }

  public async deleteExpiredAuthChallenges(): Promise<void> {
    if (!this.db) return;
    await this.db.run("DELETE FROM auth_challenges WHERE used = 1 OR datetime(expires_at) < datetime('now')");
  }

  private hashSessionToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  public async createAuthSession(userId: string, ttlSeconds = 300): Promise<string> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const token = randomBytes(32).toString('base64url');
    const tokenHash = this.hashSessionToken(token);
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

    await this.db.run(
      'INSERT INTO auth_sessions (user_id, token_hash, expires_at, revoked) VALUES (?, ?, ?, 0)',
      [userId, tokenHash, expiresAt]
    );
    return token;
  }

  public async validateAuthSession(token: string): Promise<{ valid: boolean; userId?: string }> {
    if (!this.db || !token) return { valid: false };
    const tokenHash = this.hashSessionToken(token);
    const row = await this.db.get(
      `SELECT user_id
       FROM auth_sessions
       WHERE token_hash = ? AND revoked = 0
         AND datetime(expires_at) >= datetime('now')
       ORDER BY id DESC LIMIT 1`,
      [tokenHash]
    ) as { user_id: string } | undefined;

    if (!row) return { valid: false };
    return { valid: true, userId: row.user_id };
  }

  public async revokeAuthSession(token: string): Promise<void> {
    if (!this.db || !token) return;
    await this.db.run('UPDATE auth_sessions SET revoked = 1 WHERE token_hash = ?', [this.hashSessionToken(token)]);
  }

  public async deleteExpiredAuthSessions(): Promise<void> {
    if (!this.db) return;
    await this.db.run("DELETE FROM auth_sessions WHERE revoked = 1 OR datetime(expires_at) < datetime('now')");
  }

  public getAllDevices() { return Array.from(this.devices.values()); }
  public getRules() { return this.rules; }
}

export const stateManager = new StateManager();

