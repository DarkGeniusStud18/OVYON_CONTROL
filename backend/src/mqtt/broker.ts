import Aedes from 'aedes';
import { createServer } from 'aedes-server-factory';
import logger from '../services/logger';
import dotenv from 'dotenv';
import { handleMessage } from './messageHandler';

dotenv.config();

const aedes = new Aedes();
const port = parseInt(process.env.MQTT_PORT || '1883', 10);
const wsPort = parseInt(process.env.MQTT_WS_PORT || '8083', 10);
const mqttUser = process.env.MQTT_USER || 'ovyon';
const mqttPassword = process.env.MQTT_PASSWORD || 'demo2024';

// Strict authentication for MQTT clients
// to keep broker access aligned with security claims.
aedes.authenticate = function (client, username, password, callback) {
  const isAuthorized = username === mqttUser && password?.toString() === mqttPassword;
  if (!isAuthorized) {
    logger.warn(`MQTT auth rejected for client=${client?.id ?? 'unknown'} username=${String(username)}`);
  }
  callback(null, isAuthorized);
};

aedes.on('client', function (client) {
  logger.info(`Client Connected: ${client ? client.id : client}`);
});

aedes.on('clientDisconnect', function (client) {
  logger.info(`Client Disconnected: ${client ? client.id : client}`);
});

aedes.on('publish', function (packet, client) {
  if (!client) {
    return;
  }
  const payload = Buffer.isBuffer(packet.payload) ? packet.payload : Buffer.from(packet.payload);
  handleMessage(packet.topic, payload);
});

export function startBroker() {
  const server = createServer(aedes);

  server.listen(port, function () {
    logger.info(`MQTT Broker started on port ${port}`);
  });

  const httpServer = require('http').createServer();
  const ws = require('websocket-stream');
  ws.createServer({ server: httpServer }, aedes.handle);

  httpServer.listen(wsPort, function () {
    logger.info(`MQTT WebSocket started on port ${wsPort}`);
  });

  return aedes;
}

export function publishMqtt(topic: string, payload: string, qos: 0 | 1 | 2 = 1, retain = false): Promise<void> {
  return new Promise((resolve, reject) => {
    aedes.publish(
      {
        cmd: 'publish',
        dup: false,
        topic,
        payload: Buffer.from(payload),
        qos,
        retain
      },
      (error?: Error | null) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}
