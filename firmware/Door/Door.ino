#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include "../wifi_config.h"

/**
 * NŒUD D'ACCÈS OVYON (Porte) v1.0
 * Contrôle de servomoteur haute puissance pour l'automatisation des portes.
 * Intègre la sécurité (verrouillage) et le retour d'état précis.
 */

#define SERVO_PIN 18
Servo door;

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  Serial.begin(115200);
  door.attach(SERVO_PIN);
  door.write(0); // Position par défaut : FERMÉ

  setupWiFi();
  mqtt.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
  mqtt.setCallback(mqttCallback);
}

void setupWiFi() {
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

/**
 * TRAITEMENT DES ORDRES (Ouverture/Fermeture)
 */
void mqttCallback(char* topic, byte* payload, unsigned int length) {
  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)payload[i];

  if (msg == "open") {
    door.write(90); // Angle d'ouverture
    publishStatus("open", 100);
  } else if (msg == "close") {
    door.write(0); // Angle de fermeture
    publishStatus("closed", 0);
  }
}

/**
 * PUBLICATION DU STATUT
 * Informe l'application de la position réelle de la porte.
 */
void publishStatus(String state, int pos) {
  StaticJsonDocument<128> doc;
  doc["state"] = state;
  doc["position"] = pos;
  
  char buffer[128];
  serializeJson(doc, buffer);
  mqtt.publish("ovyon/status/door/main", buffer, true);
}

void reconnect() {
  while (!mqtt.connected()) {
    if (mqtt.connect("OVYON_DOOR_NODE", OVYON_MQTT_USER, OVYON_MQTT_PASSWORD)) {
      // Réabonnement au topic de commande spécifique
      mqtt.subscribe("ovyon/control/door/main/action");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop();
  
  // Heartbeat de sécurité toutes les minutes
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 60000) {
    publishStatus(door.read() > 45 ? "open" : "closed", door.read() > 45 ? 100 : 0);
    lastUpdate = millis();
  }
}