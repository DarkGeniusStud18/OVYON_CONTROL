#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include "../wifi_config.h"

/**
 * NŒUD ENVIRONNEMENT OVYON v1.0
 * Surveillance climatique (Température/Humidité) à faible consommation.
 */

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  Serial.begin(115200);
  dht.begin();
  setupWiFi();
  mqtt.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
}

void setupWiFi() {
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

/**
 * LECTURE ET PUBLICATION DES DONNÉES
 */
void publishStatus() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  // Vérification de la validité des données capteur
  if (isnan(h) || isnan(t)) return;

  StaticJsonDocument<128> doc;
  doc["temperature"] = t;
  doc["humidity"] = h;
  
  char buffer[128];
  serializeJson(doc, buffer);
  mqtt.publish("ovyon/status/sensor/env", buffer, true);
}

void reconnect() {
  while (!mqtt.connected()) {
    if (mqtt.connect("OVYON_ENV_NODE", OVYON_MQTT_USER, OVYON_MQTT_PASSWORD)) {
      Serial.println("Capteur Climatique en Ligne");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop();

  // Rapport intelligent : Toutes les 15 secondes pour économiser la batterie
  static unsigned long lastSent = 0;
  if (millis() - lastSent > 15000) {
    publishStatus();
    lastSent = millis();
  }
}