#include <Arduino.h>
#line 1 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "wifi_config.h"

/**
 * NŒUD PRISES INTELLIGENTES OVYON v1.0
 * Contrôle de 2 prises de courant avec simulation de surveillance énergétique.
 */

// Définition des broches
#define RELAY_1 26
#define RELAY_2 27

WiFiClient espClient;
PubSubClient client(espClient);

#line 18 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void setup();
#line 32 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void connectWiFi();
#line 45 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void callback(char* topic, byte* payload, unsigned int length);
#line 64 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void sendStatus(int id, bool on);
#line 76 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void reconnect();
#line 88 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void loop();
#line 18 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Plugs\\Plugs.ino"
void setup() {
  Serial.begin(115200);
  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  
  // État initial éteint pour la sécurité
  digitalWrite(RELAY_1, LOW);
  digitalWrite(RELAY_2, LOW);

  connectWiFi();
  client.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
  client.setCallback(callback);
}

void connectWiFi() {
  Serial.print("Connexion au WiFi OVYON...");
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" CONNECTÉ");
}

/**
 * GESTION DES COMMANDES (ON/OFF)
 */
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

/**
 * ENVOI DE LA CONSOMMATION SIMULÉE
 */
void sendStatus(int id, bool on) {
  StaticJsonDocument<128> doc;
  doc["power"] = on ? "on" : "off";
  // Simulation de Watts (40-55W si allumé)
  doc["consumption"] = on ? (40 + random(5, 15)) : 0; 
  
  char buffer[128];
  serializeJson(doc, buffer);
  String topic = "ovyon/status/plugs/" + String(id);
  client.publish(topic.c_str(), buffer, true);
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentative de connexion MQTT...");
    if (client.connect("OVYON_PLUGS_NODE", OVYON_MQTT_USER, OVYON_MQTT_PASSWORD)) {
      Serial.println("Connecté!");
      client.subscribe("ovyon/control/plugs/+/power");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();
  
  // Mise à jour périodique toutes les 30s
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 30000) {
    sendStatus(1, digitalRead(RELAY_1));
    sendStatus(2, digitalRead(RELAY_2));
    lastUpdate = millis();
  }
}


