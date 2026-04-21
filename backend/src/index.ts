import express from 'express';
import cors from 'cors';
import { stateManager } from './devices/stateManager';
import { startBroker } from './mqtt/broker';
import logger from './services/logger';
import dotenv from 'dotenv';
import { getOfflineCatalog, handleAionOfflineCommand } from './aion/service';
import authRouter from './auth/routes';
import { requireWebAuthnSession } from './auth/middleware';
import { processOfflineCommand } from './aion/engine';

dotenv.config();

const app = express();
const apiPort = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/', (_req, res) => {
  res.status(200).json({
    service: 'ovyon-backend',
    status: 'ok',
    apiBase: '/api',
    health: '/health'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// --- ROUTES DEVICES ---
app.get('/api/devices', (req, res) => {
  res.json(stateManager.getAllDevices());
});

app.post('/api/devices', requireWebAuthnSession, async (req, res) => {
  const device = req.body;
  await stateManager.addDevice(device);
  res.json({ success: true, device });
});

app.put('/api/devices/:id', requireWebAuthnSession, async (req, res) => {
  await stateManager.updateDeviceMeta(req.params.id, req.body.name);
  res.json({ success: true });
});

app.delete('/api/devices/:id', requireWebAuthnSession, async (req, res) => {
  await stateManager.deleteDevice(req.params.id);
  res.json({ success: true });
});

// --- ROUTES RULES ---
app.get('/api/rules', (req, res) => {
  res.json(stateManager.getRules());
});

app.post('/api/rules', requireWebAuthnSession, async (req, res) => {
  const rule = req.body;
  await stateManager.addRule(rule);
  res.json({ success: true, rule });
});

app.post('/api/rules/:id/toggle', requireWebAuthnSession, async (req, res) => {
  await stateManager.toggleRule(req.params.id);
  res.json({ success: true });
});

app.put('/api/rules/:id', requireWebAuthnSession, async (req, res) => {
  await stateManager.updateRule(req.params.id, req.body);
  res.json({ success: true });
});

app.delete('/api/rules/:id', requireWebAuthnSession, async (req, res) => {
  await stateManager.deleteRule(req.params.id);
  res.json({ success: true });
});

// --- ROUTES SYSTEM & SECURITY ---
app.post('/api/system/reset', requireWebAuthnSession, async (req, res) => {
  await stateManager.resetSystem();
  res.json({ success: true, message: 'Systeme reinitialise' });
});

app.post('/api/system/panic', requireWebAuthnSession, async (req, res) => {
  await stateManager.triggerPanicMode();
  res.json({ success: true, message: 'Securite activee' });
});

app.get('/api/admin/logs', requireWebAuthnSession, (req, res) => {
  res.json(stateManager.getSystemLogs());
});

// --- ROUTES AION OFFLINE ---
app.get('/api/aion/offline-catalog', (req, res) => {
  res.json({
    count: getOfflineCatalog().length,
    commands: getOfflineCatalog()
  });
});

app.post('/api/aion/command', async (req, res) => {
  const text = String(req.body?.text || '').trim();
  if (!text) {
    res.status(400).json({ success: false, message: 'Champ text requis.' });
    return;
  }

  const historyRows = await stateManager.getRecentCommandHistory(40);
  const preview = processOfflineCommand({
    text,
    history: historyRows.map((row) => ({
      text: row.text,
      normalizedText: row.normalized_text,
      matchedIntent: row.matched_intent,
      success: row.success === 1
    }))
  });

  const criticalIntents = new Set(['door_open', 'door_close', 'door_lock', 'door_unlock', 'panic_mode']);
  if (preview.intent && criticalIntents.has(preview.intent)) {
    const authHeader = String(req.headers.authorization || '');
    const token = authHeader.toLowerCase().startsWith('bearer ')
      ? authHeader.slice(7).trim()
      : '';
    const session = await stateManager.validateAuthSession(token);
    if (!session.valid) {
      res.status(401).json({
        success: false,
        response: 'Authentification WebAuthn requise pour cette commande critique.',
        suggestions: preview.suggestions
      });
      return;
    }
  }

  const result = await handleAionOfflineCommand(text);
  res.json(result);
});

async function main() {
  await stateManager.ready;
  startBroker();
  app.listen(apiPort, () => {
    logger.info(`API REST OVYON lancee sur le port ${apiPort}`);
  });
}

main().catch((err) => logger.error('Erreur critique au demarrage:', err));
