#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include "../wifi_config.h"

/**
 * OVYON ACCESS NODE (Door) v1.0
 * High-torque servo control for automatic doors.
 */

#define SERVO_PIN 18
Servo door;

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  Serial.begin(115200);
  door.attach(SERVO_PIN);
  door.write(0); // Default CLOSED

  setupWiFi();
  mqtt.setServer(OVYON_MQTT_SERVER, OVYON_MQTT_PORT);
  mqtt.setCallback(mqttCallback);
}

void setupWiFi() {
  WiFi.begin(OVYON_SSID, OVYON_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) delay(500);
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)payload[i];

  if (msg == "open") {
    door.write(90);
    publishStatus("open", 100);
  } else if (msg == "close") {
    door.write(0);
    publishStatus("closed", 0);
  }
}

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
      mqtt.subscribe("ovyon/control/door/main/action");
    } else {
      delay(5000);
    }
  }
}

void loop() {
  if (!mqtt.connected()) reconnect();
  mqtt.loop();
  
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate > 60000) {
    publishStatus(door.read() > 45 ? "open" : "closed", door.read() > 45 ? 100 : 0);
    lastUpdate = millis();
  }
}
