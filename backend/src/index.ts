import express from 'express';
import cors from 'cors';
import { stateManager } from './devices/stateManager';
import { startBroker } from './mqtt/broker';
import logger from './services/logger';
import dotenv from 'dotenv';

// Chargement des variables d'environnement (ports, identifiants, etc.)
dotenv.config();

const app = express();
const apiPort = process.env.API_PORT || 3001;

// Autorise le frontend React à communiquer avec cette API
app.use(cors());
app.use(express.json());

/** 
 * ROUTES DE L'API REST
 * Utilisées pour les actions qui nécessitent une confirmation ou une persistence en base de données.
 */

// Récupère tous les appareils enregistrés en base SQLite
app.get('/api/devices', (req, res) => {
  res.json(stateManager.getAllDevices());
});

// Récupère la liste des scénarios d'automatisation
app.get('/api/rules', (req, res) => {
  res.json(stateManager.getRules());
});

// Active ou désactive un scénario spécifique
app.post('/api/rules/:id/toggle', async (req, res) => {
  await stateManager.toggleRule(req.params.id);
  res.json({ success: true });
});

// Modifie les détails d'un scénario
app.put('/api/rules/:id', async (req, res) => {
  await stateManager.updateRule(req.params.id, req.body);
  res.json({ success: true });
});

// Supprime un scénario de la base de données
app.delete('/api/rules/:id', async (req, res) => {
  await stateManager.deleteRule(req.params.id);
  res.json({ success: true });
});

// Enregistre un nouveau scénario
app.post('/api/rules', async (req, res) => {
  const rule = req.body;
  await stateManager.addRule(rule);
  res.json({ success: true, rule });
});

// Ajoute un nouvel appareil (ex: quand on clique sur "Enregistrer" dans l'app)
app.post('/api/devices', async (req, res) => {
  const device = req.body;
  await stateManager.addDevice(device);
  res.json({ success: true, device });
});

// Met à jour le nom ou la pièce d'un appareil
app.put('/api/devices/:id', async (req, res) => {
  await stateManager.updateDeviceMeta(req.params.id, req.body.name);
  res.json({ success: true });
});

// Supprime définitivement un appareil du système
app.delete('/api/devices/:id', async (req, res) => {
  await stateManager.deleteDevice(req.params.id);
  res.json({ success: true });
});

// Remise à zéro totale (Utile pour la fin de la démonstration)
app.post('/api/system/reset', async (req, res) => {
  await stateManager.resetSystem();
  res.json({ success: true, message: 'Système réinitialisé' });
});

/**
 * LANCEMENT DU SERVEUR
 */
async function main() {
    // 1. Démarre le Broker MQTT (Le facteur qui distribue les messages aux ESP32)
    startBroker();
    
    // 2. Lance le serveur Web pour l'application mobile
    app.listen(apiPort, () => {
        logger.info(`API REST OVYON lancée sur le port ${apiPort} 🚀`);
    });
}

main().catch(err => logger.error("Erreur critique au démarrage:", err));