#include <Arduino.h>
#line 1 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include "wifi_config.h"

/**
 * NŒUD D'ACCÈS OVYON (Fenêtre) v1.0
 * Contrôle positionnel précis (0-100%) pour l'aération intelligente.
 */

#define SERVO_PIN 19
Servo window;

WiFiClient espClient;
PubSubClient mqtt(espClient);

#line 18 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void setup();
#line 28 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void setupWiFi();
#line 37 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void mqttCallback(char* topic, byte* payload, unsigned int length);
#line 48 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void publishStatus(int pos);
#line 56 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void reconnect();
#line 66 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void loop();
#line 18 "D:\\AA_Project\\OVYON_CONTROL\\firmware\\Window\\Window.ino"
void setup() {
  Serial.begin(115200);
  window.attach(SERVO_PIN);
  window.write(0); // Fermé au démarrage

  setupWiFi();
  mqtt.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
  mqtt.setCallback(mqttCallback);
}

void setupWiFi() {
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

/**
 * GESTION DE LA POSITION PROPORTIONNELLE
 * Reçoit un entier (0-100) et le convertit en angle de servo.
 */
void mqttCallback(char* topic, byte* payload, unsigned int length) {
  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)payload[i];

  int pos = msg.toInt();
  pos = constrain(pos, 0, 100); // Sécurité bornes
  window.write(map(pos, 0, 100, 0, 90));
  
  publishStatus(pos);
}

void publishStatus(int pos) {
  StaticJsonDocument<128> doc;
  doc["position"] = pos;
  char buffer[128];
  serializeJson(doc, buffer);
  mqtt.publish("ovyon/status/window/salon", buffer, true);
}

void reconnect() {
  while (!mqtt.connected()) {
    if (mqtt.connect("OVYON_WINDOW_NODE", OVYON_MQTT_USER, OVYON_MQTT_PASSWORD)) {
      mqtt.subscribe("ovyon/control/window/salon/position");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop();
}


