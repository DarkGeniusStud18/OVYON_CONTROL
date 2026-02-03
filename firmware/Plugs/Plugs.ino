#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "../wifi_config.h"

/**
 * OVYON SMART PLUGS NODE
 * Controls 2 smart plugs with energy monitoring simulation.
 */

// Pins
#define RELAY_1 26
#define RELAY_2 27

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  
  digitalWrite(RELAY_1, LOW);
  digitalWrite(RELAY_2, LOW);

  connectWiFi();
  client.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
  client.setCallback(callback);
}

void connectWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Connected!");
}

void callback(char* topic, byte* payload, unsigned int length) {
  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)payload[i];
  String topicStr = String(topic);

  int relay = -1;
  int id = 0;
  if (topicStr.indexOf("/1/") > 0) { relay = RELAY_1; id = 1; }
  else if (topicStr.indexOf("/2/") > 0) { relay = RELAY_2; id = 2; }

  if (relay != -1) {
    digitalWrite(relay, msg == "on" ? HIGH : LOW);
    sendStatus(id, msg == "on");
  }
}

void sendStatus(int id, bool on) {
  StaticJsonDocument<128> doc;
  doc["power"] = on ? "on" : "off";
  doc["consumption"] = on ? (40 + random(5, 15)) : 0; // Simulated Watts
  
  char buffer[128];
  serializeJson(doc, buffer);
  String topic = "ovyon/status/plugs/" + String(id);
  client.publish(topic.c_str(), buffer);
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("OVYON_PLUGS_NODE", OVYON_MQTT_USER, OVYON_MQTT_PASSWORD)) {
      Serial.println("connected");
      client.subscribe("ovyon/control/plugs/+/power");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
  
  // Periodic status update every 30s
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 30000) {
    sendStatus(1, digitalRead(RELAY_1));
    sendStatus(2, digitalRead(RELAY_2));
    lastUpdate = millis();
  }
}