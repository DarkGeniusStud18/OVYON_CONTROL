"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSimulator = startSimulator;
const mqtt_1 = __importDefault(require("mqtt"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../services/logger"));
dotenv_1.default.config();
const brokerUrl = `mqtt://localhost:${process.env.MQTT_PORT}`;
const client = mqtt_1.default.connect(brokerUrl, {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD
});
const state = {
    'lights/salon': { power: 'on', brightness: 75 },
    'lights/chambre': { power: 'off', brightness: 0 },
    'lights/cuisine': { power: 'on', brightness: 100 },
    'door/main': { position: 0, state: 'closed' },
    'window/salon': { position: 50 },
    'plugs/1': { power: 'on', consumption: 45 },
    'plugs/2': { power: 'off', consumption: 0 }
};
function startSimulator() {
    client.on('connect', () => {
        logger_1.default.info('Premium Simulator online');
        client.subscribe('ovyon/control/#');
        setInterval(() => {
            Object.entries(state).forEach(([path, data]) => {
                // Dynamic Consumption Simulation
                if (path.startsWith('plugs') && data.power === 'on') {
                    data.consumption = Math.round((40 + Math.random() * 15) * 10) / 10;
                }
                client.publish(`ovyon/status/${path}`, JSON.stringify(data));
            });
        }, 3000);
    });
    client.on('message', (topic, message) => {
        const payload = message.toString();
        const parts = topic.split('/');
        const type = parts[2];
        const id = parts[3];
        const sub = parts[4];
        const key = `${type}/${id}`;
        if (!state[key])
            return;
        if (sub === 'power') {
            state[key].power = payload;
            state[key].brightness = payload === 'on' ? 100 : 0;
        }
        else if (sub === 'brightness') {
            state[key].brightness = parseInt(payload);
            state[key].power = state[key].brightness > 0 ? 'on' : 'off';
        }
        else if (type === 'door' && sub === 'action') {
            state[key].state = payload === 'open' ? 'open' : 'closed';
            state[key].position = payload === 'open' ? 100 : 0;
        }
        else if (type === 'window' && sub === 'position') {
            state[key].position = parseInt(payload);
        }
        // Immediate feedback loop
        client.publish(`ovyon/status/${key}`, JSON.stringify(state[key]));
    });
}
