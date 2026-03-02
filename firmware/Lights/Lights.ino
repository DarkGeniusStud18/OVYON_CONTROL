#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "wifi_config.h"

/**
 * NŒUD D'ÉCLAIRAGE OVYON v1.0
 * Ce code permet de contrôler 3 zones lumineuses avec effet de fondu (PWM).
 * Communication bidirectionnelle via MQTT.
 */

// Définition des broches GPIO pour les LEDs/Relais
const int PINS[] = {25, 26, 27};
const char* NAMES[] = {"salon", "chambre", "cuisine"};
const int CHANNELS[] = {0, 1, 2}; // Canaux PWM de l'ESP32

// Configuration PWM pour un effet "Premium Fade" (Dimming fluide)
const int FREQ = 5000;
const int RESOLUTION = 8; // Précision de 0 à 255

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  Serial.begin(115200);
  
  // Initialisation des sorties PWM
  for (int i = 0; i < 3; i++) {
    ledcSetup(CHANNELS[i], FREQ, RESOLUTION);
    ledcAttachPin(PINS[i], CHANNELS[i]);
    ledcWrite(CHANNELS[i], 0); // Éteint par défaut
  }

  setupWiFi();
  mqtt.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
  mqtt.setCallback(mqttCallback); // Définit la fonction qui gère les ordres reçus
}

/**
 * CONNEXION AU RÉSEAU WIFI
 * Utilise les identifiants stockés dans wifi_config.h
 */
void setupWiFi() {
  Serial.print("Connexion au réseau OVYON...");
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" CONNECTÉ");
}

/**
 * GESTION DES MESSAGES MQTT (Entrants)
 * Exécutée quand l'application mobile envoie un ordre.
 */
void mqttCallback(char* topic, byte* payload, unsigned int length) {
  String topicStr = String(topic);
  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)payload[i];

  // On cherche quelle pièce est visée par le message
  for (int i = 0; i < 3; i++) {
    if (topicStr.indexOf(NAMES[i]) > 0) {
      if (topicStr.endsWith("/power")) {
        // Commande ON/OFF simple
        ledcWrite(CHANNELS[i], msg == "on" ? 255 : 0);
      } else if (topicStr.endsWith("/brightness")) {
        // Commande de variation d'intensité (0-100)
        int val = msg.toInt();
        ledcWrite(CHANNELS[i], map(val, 0, 100, 0, 255));
      }
      publishStatus(i); // On renvoie l'état actuel pour mettre à jour l'appli
      break;
    }
  }
}

/**
 * ENVOI DE L'ÉTAT (Sortant)
 * Publie les données au format JSON vers le Broker MQTT.
 */
void publishStatus(int index) {
  StaticJsonDocument<128> doc;
  int currentVal = ledcRead(CHANNELS[index]);
  doc["power"] = currentVal > 0 ? "on" : "off";
  doc["brightness"] = map(currentVal, 0, 255, 0, 100);
  
  char buffer[128];
  serializeJson(doc, buffer);
  String statusTopic = "ovyon/status/lights/" + String(NAMES[index]);
  mqtt.publish(statusTopic.c_str(), buffer, true); // Message "retained" pour persistence
}

/**
 * GESTION DE LA RECONNEXION
 * S'assure que le module reste toujours en ligne.
 */
void reconnect() {
  while (!mqtt.connected()) {
    Serial.print("Tentative de reconnexion MQTT...");
    if (mqtt.connect("OVYON_LIGHTS_NODE", OVYON_MQTT_USER, OVYON_MQTT_PASSWORD)) {
      Serial.println("CONNECTÉ");
      // Ré-inscription aux ordres de contrôle
      mqtt.subscribe("ovyon/control/lights/+/power");
      mqtt.subscribe("ovyon/control/lights/+/brightness");
    } else {
      delay(5000); // Attend 5s avant de réessayer
    }
  }
}

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop(); // Maintient la connexion active

  // Envoi périodique du statut (Heartbeat) toutes les 30 secondes
  static unsigned long lastHeartbeat = 0;
  if (millis() - lastHeartbeat > 30000) {
    for (int i = 0; i < 3; i++) publishStatus(i);
    lastHeartbeat = millis();
  }
}
