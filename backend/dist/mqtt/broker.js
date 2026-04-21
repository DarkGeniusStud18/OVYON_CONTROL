"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBroker = startBroker;
exports.publishMqtt = publishMqtt;
const aedes_1 = __importDefault(require("aedes"));
const aedes_server_factory_1 = require("aedes-server-factory");
const logger_1 = __importDefault(require("../services/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const messageHandler_1 = require("./messageHandler");
dotenv_1.default.config();
const aedes = new aedes_1.default();
const port = parseInt(process.env.MQTT_PORT || '1883', 10);
const wsPort = parseInt(process.env.MQTT_WS_PORT || '8083', 10);
const mqttUser = process.env.MQTT_USER || 'ovyon';
const mqttPassword = process.env.MQTT_PASSWORD || 'demo2024';
// Strict authentication for MQTT clients
// to keep broker access aligned with security claims.
aedes.authenticate = function (client, username, password, callback) {
    var _a;
    const isAuthorized = username === mqttUser && (password === null || password === void 0 ? void 0 : password.toString()) === mqttPassword;
    if (!isAuthorized) {
        logger_1.default.warn(`MQTT auth rejected for client=${(_a = client === null || client === void 0 ? void 0 : client.id) !== null && _a !== void 0 ? _a : 'unknown'} username=${String(username)}`);
    }
    callback(null, isAuthorized);
};
aedes.on('client', function (client) {
    logger_1.default.info(`Client Connected: ${client ? client.id : client}`);
});
aedes.on('clientDisconnect', function (client) {
    logger_1.default.info(`Client Disconnected: ${client ? client.id : client}`);
});
aedes.on('publish', function (packet, client) {
    if (!client) {
        return;
    }
    const payload = Buffer.isBuffer(packet.payload) ? packet.payload : Buffer.from(packet.payload);
    (0, messageHandler_1.handleMessage)(packet.topic, payload);
});
function startBroker() {
    const server = (0, aedes_server_factory_1.createServer)(aedes);
    server.listen(port, function () {
        logger_1.default.info(`MQTT Broker started on port ${port}`);
    });
    const httpServer = require('http').createServer();
    const ws = require('websocket-stream');
    ws.createServer({ server: httpServer }, aedes.handle);
    httpServer.listen(wsPort, function () {
        logger_1.default.info(`MQTT WebSocket started on port ${wsPort}`);
    });
    return aedes;
}
function publishMqtt(topic, payload, qos = 1, retain = false) {
    return new Promise((resolve, reject) => {
        aedes.publish({
            cmd: 'publish',
            dup: false,
            topic,
            payload: Buffer.from(payload),
            qos,
            retain
        }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}
