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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stateManager_1 = require("./devices/stateManager");
const broker_1 = require("./mqtt/broker");
const logger_1 = __importDefault(require("./services/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const apiPort = process.env.API_PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- ROUTES DEVICES ---
app.get('/api/devices', (req, res) => {
    res.json(stateManager_1.stateManager.getAllDevices());
});
app.post('/api/devices', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device = req.body;
    yield stateManager_1.stateManager.addDevice(device);
    res.json({ success: true, device });
}));
app.put('/api/devices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.updateDeviceMeta(req.params.id, req.body.name);
    res.json({ success: true });
}));
app.delete('/api/devices/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.deleteDevice(req.params.id);
    res.json({ success: true });
}));
// --- ROUTES RULES ---
app.get('/api/rules', (req, res) => {
    res.json(stateManager_1.stateManager.getRules());
});
app.post('/api/rules', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rule = req.body;
    yield stateManager_1.stateManager.addRule(rule);
    res.json({ success: true, rule });
}));
app.post('/api/rules/:id/toggle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.toggleRule(req.params.id);
    res.json({ success: true });
}));
app.put('/api/rules/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.updateRule(req.params.id, req.body);
    res.json({ success: true });
}));
app.delete('/api/rules/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.deleteRule(req.params.id);
    res.json({ success: true });
}));
// --- ROUTES SYSTEM & SECURITY ---
app.post('/api/system/reset', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.resetSystem();
    res.json({ success: true, message: 'Système réinitialisé' });
}));
app.post('/api/system/panic', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.triggerPanicMode();
    res.json({ success: true, message: 'Sécurité activée' });
}));
app.get('/api/admin/logs', (req, res) => {
    res.json(stateManager_1.stateManager.getSystemLogs());
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, broker_1.startBroker)();
        app.listen(apiPort, () => {
            logger_1.default.info(`API REST OVYON lancée sur le port ${apiPort} 🚀`);
        });
    });
}
main().catch(err => logger_1.default.error("Erreur critique au démarrage:", err));
