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
const service_1 = require("./aion/service");
const routes_1 = __importDefault(require("./auth/routes"));
const middleware_1 = require("./auth/middleware");
const engine_1 = require("./aion/engine");
dotenv_1.default.config();
const app = (0, express_1.default)();
const apiPort = process.env.API_PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', routes_1.default);
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
    res.json(stateManager_1.stateManager.getAllDevices());
});
app.post('/api/devices', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const device = req.body;
    yield stateManager_1.stateManager.addDevice(device);
    res.json({ success: true, device });
}));
app.put('/api/devices/:id', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.updateDeviceMeta(req.params.id, req.body.name);
    res.json({ success: true });
}));
app.delete('/api/devices/:id', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.deleteDevice(req.params.id);
    res.json({ success: true });
}));
// --- ROUTES RULES ---
app.get('/api/rules', (req, res) => {
    res.json(stateManager_1.stateManager.getRules());
});
app.post('/api/rules', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rule = req.body;
    yield stateManager_1.stateManager.addRule(rule);
    res.json({ success: true, rule });
}));
app.post('/api/rules/:id/toggle', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.toggleRule(req.params.id);
    res.json({ success: true });
}));
app.put('/api/rules/:id', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.updateRule(req.params.id, req.body);
    res.json({ success: true });
}));
app.delete('/api/rules/:id', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.deleteRule(req.params.id);
    res.json({ success: true });
}));
// --- ROUTES SYSTEM & SECURITY ---
app.post('/api/system/reset', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.resetSystem();
    res.json({ success: true, message: 'Systeme reinitialise' });
}));
app.post('/api/system/panic', middleware_1.requireWebAuthnSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield stateManager_1.stateManager.triggerPanicMode();
    res.json({ success: true, message: 'Securite activee' });
}));
app.get('/api/admin/logs', middleware_1.requireWebAuthnSession, (req, res) => {
    res.json(stateManager_1.stateManager.getSystemLogs());
});
// --- ROUTES AION OFFLINE ---
app.get('/api/aion/offline-catalog', (req, res) => {
    res.json({
        count: (0, service_1.getOfflineCatalog)().length,
        commands: (0, service_1.getOfflineCatalog)()
    });
});
app.post('/api/aion/command', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const text = String(((_a = req.body) === null || _a === void 0 ? void 0 : _a.text) || '').trim();
    if (!text) {
        res.status(400).json({ success: false, message: 'Champ text requis.' });
        return;
    }
    const historyRows = yield stateManager_1.stateManager.getRecentCommandHistory(40);
    const preview = (0, engine_1.processOfflineCommand)({
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
        const session = yield stateManager_1.stateManager.validateAuthSession(token);
        if (!session.valid) {
            res.status(401).json({
                success: false,
                response: 'Authentification WebAuthn requise pour cette commande critique.',
                suggestions: preview.suggestions
            });
            return;
        }
    }
    const result = yield (0, service_1.handleAionOfflineCommand)(text);
    res.json(result);
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield stateManager_1.stateManager.ready;
        (0, broker_1.startBroker)();
        app.listen(apiPort, () => {
            logger_1.default.info(`API REST OVYON lancee sur le port ${apiPort}`);
        });
    });
}
main().catch((err) => logger_1.default.error('Erreur critique au demarrage:', err));
