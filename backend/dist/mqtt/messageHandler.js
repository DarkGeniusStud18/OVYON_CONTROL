"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
const stateManager_1 = require("../devices/stateManager");
function handleMessage(topic, message) {
    const payloadStr = message.toString();
    let payload;
    try {
        // Try parsing JSON, otherwise treat as string
        payload = JSON.parse(payloadStr);
    }
    catch (e) {
        payload = payloadStr;
    }
    // Handle Control Commands
    if (topic.startsWith('ovyon/control/')) {
        const parts = topic.split('/');
        const type = parts[2];
        const id = parts[3];
        const action = parts[4];
        if (type === 'all' && action === 'power') {
            stateManager_1.stateManager.updateAllDevices({ power: payload });
        }
    }
    // Handle Status Updates (Devices -> App/Backend)
    if (topic.startsWith('ovyon/status/')) {
        const parts = topic.split('/');
        // ovyon/status/[type]/[id] -> parts[2]=type, parts[3]=id
        // But specific topics are ovyon/status/lights/salon
        const type = parts[2];
        const id = parts[3];
        const deviceId = type === 'lights' ? `light_${id}` :
            type === 'door' ? 'door_main' : // Specific mapping based on text
                type === 'window' ? `window_${id}` :
                    type === 'plugs' ? `plug_${id}` : id;
        // A better way is to rely on consistent naming or correct mapping.
        // Based on text: 
        // lights/salon -> light_salon
        // door/main -> door_main
        // window/salon -> window_salon
        // plugs/1 -> plug_1
        let mappedId = '';
        if (type === 'lights')
            mappedId = `light_${id}`;
        else if (type === 'door')
            mappedId = `door_${id}`;
        else if (type === 'window')
            mappedId = `window_${id}`;
        else if (type === 'plugs')
            mappedId = `plug_${id}`;
        else if (type === 'sensor')
            mappedId = `sensor_${id}`;
        if (mappedId) {
            stateManager_1.stateManager.updateDeviceState(mappedId, payload);
        }
    }
}
