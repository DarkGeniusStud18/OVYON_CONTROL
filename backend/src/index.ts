import express from 'express';
import cors from 'cors';
import { stateManager } from './devices/stateManager';
import { startBroker } from './mqtt/broker';
import logger from './services/logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const apiPort = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());

// --- ROUTES DEVICES ---
app.get('/api/devices', (req, res) => {
  res.json(stateManager.getAllDevices());
});

app.post('/api/devices', async (req, res) => {
  const device = req.body;
  await stateManager.addDevice(device);
  res.json({ success: true, device });
});

app.put('/api/devices/:id', async (req, res) => {
  await stateManager.updateDeviceMeta(req.params.id, req.body.name);
  res.json({ success: true });
});

app.delete('/api/devices/:id', async (req, res) => {
  await stateManager.deleteDevice(req.params.id);
  res.json({ success: true });
});

// --- ROUTES RULES ---
app.get('/api/rules', (req, res) => {
  res.json(stateManager.getRules());
});

app.post('/api/rules', async (req, res) => {
  const rule = req.body;
  await stateManager.addRule(rule);
  res.json({ success: true, rule });
});

app.post('/api/rules/:id/toggle', async (req, res) => {
  await stateManager.toggleRule(req.params.id);
  res.json({ success: true });
});

app.put('/api/rules/:id', async (req, res) => {
  await stateManager.updateRule(req.params.id, req.body);
  res.json({ success: true });
});

app.delete('/api/rules/:id', async (req, res) => {
  await stateManager.deleteRule(req.params.id);
  res.json({ success: true });
});

// --- ROUTES SYSTEM & SECURITY ---
app.post('/api/system/reset', async (req, res) => {
  await stateManager.resetSystem();
  res.json({ success: true, message: 'Système réinitialisé' });
});

app.post('/api/system/panic', async (req, res) => {
  await stateManager.triggerPanicMode();
  res.json({ success: true, message: 'Sécurité activée' });
});

app.get('/api/admin/logs', (req, res) => {
  res.json(stateManager.getSystemLogs());
});

async function main() {
    startBroker();
    app.listen(apiPort, () => {
        logger.info(`API REST OVYON lancée sur le port ${apiPort} 🚀`);
    });
}

main().catch(err => logger.error("Erreur critique au démarrage:", err));
