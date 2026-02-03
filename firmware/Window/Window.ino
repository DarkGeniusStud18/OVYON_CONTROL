#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include "../wifi_config.h"

/**
 * OVYON ACCESS NODE (Window) v1.0
 * Position-based control for automatic windows.
 */

#define SERVO_PIN 19
Servo window;

WiFiClient espClient;
PubSubClient mqtt(espClient);

void setup() {
  Serial.begin(115200);
  window.attach(SERVO_PIN);
  window.write(0);

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

  int pos = msg.toInt();
  pos = constrain(pos, 0, 100);
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