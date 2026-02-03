#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include "../wifi_config.h"

/**
 * OVYON ENVIRONMENT NODE v1.0
 * Low-power climate monitoring (Temp/Humidity).
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

void publishStatus() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
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
      Serial.println("Climate Sensor Online");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop();

  // Smart Reporting: Every 15 seconds to save battery in mini-house scenario
  static unsigned long lastSent = 0;
  if (millis() - lastSent > 15000) {
    publishStatus();
    lastSent = millis();
  }
}
