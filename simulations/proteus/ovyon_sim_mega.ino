#include <Servo.h>

/*
  OVYON Proteus Simulation Sketch (Arduino Mega 2560)
  ---------------------------------------------------
  Purpose:
  - Simulate core OVYON node behavior in Proteus before physical build.
  - Drive LEDs/relays/servos from Serial commands.
  - Print status lines for Virtual Terminal monitoring.

  Recommended Proteus mapping:
  - D5  -> LED/Relay LIGHT_SALON
  - D6  -> LED/Relay LIGHT_CHAMBRE
  - D7  -> LED/Relay LIGHT_CUISINE
  - D9  -> SERVO_DOOR
  - D10 -> SERVO_WINDOW
  - D11 -> RELAY_PLUG1
  - D12 -> RELAY_PLUG2
*/

// Outputs
const int PIN_LIGHT_SALON = 5;
const int PIN_LIGHT_CHAMBRE = 6;
const int PIN_LIGHT_CUISINE = 7;
const int PIN_PLUG1 = 11;
const int PIN_PLUG2 = 12;

const int PIN_SERVO_DOOR = 9;
const int PIN_SERVO_WINDOW = 10;

Servo servoDoor;
Servo servoWindow;

// Simulated state
bool lightSalon = false;
bool lightChambre = false;
bool lightCuisine = false;
bool plug1 = false;
bool plug2 = false;

int doorPosition = 0;    // 0..100 (%)
int windowPosition = 0;  // 0..100 (%)

float temperatureC = 26.0f;
float humidityPct = 58.0f;

// Serial command buffer
String cmdBuffer = "";

unsigned long lastTelemetryMs = 0;
const unsigned long TELEMETRY_PERIOD_MS = 3000;

void applyOutputs() {
  digitalWrite(PIN_LIGHT_SALON, lightSalon ? HIGH : LOW);
  digitalWrite(PIN_LIGHT_CHAMBRE, lightChambre ? HIGH : LOW);
  digitalWrite(PIN_LIGHT_CUISINE, lightCuisine ? HIGH : LOW);

  digitalWrite(PIN_PLUG1, plug1 ? HIGH : LOW);
  digitalWrite(PIN_PLUG2, plug2 ? HIGH : LOW);

  // Map 0..100 (%) to 0..90 deg (same logic used in OVYON firmware for window)
  int doorAngle = map(doorPosition, 0, 100, 0, 90);
  int windowAngle = map(windowPosition, 0, 100, 0, 90);

  servoDoor.write(doorAngle);
  servoWindow.write(windowAngle);
}

void printHelp() {
  Serial.println("=== OVYON PROTEUS SIM COMMANDS ===");
  Serial.println("LIGHT_SALON_ON | LIGHT_SALON_OFF");
  Serial.println("LIGHT_CHAMBRE_ON | LIGHT_CHAMBRE_OFF");
  Serial.println("LIGHT_CUISINE_ON | LIGHT_CUISINE_OFF");
  Serial.println("DOOR_OPEN | DOOR_CLOSE | DOOR_<0..100>");
  Serial.println("WINDOW_0 | WINDOW_50 | WINDOW_100 | WINDOW_<0..100>");
  Serial.println("PLUG1_ON | PLUG1_OFF");
  Serial.println("PLUG2_ON | PLUG2_OFF");
  Serial.println("ALL_OFF");
  Serial.println("ENV_T_<value>   (example: ENV_T_27.5)");
  Serial.println("ENV_H_<value>   (example: ENV_H_61)");
  Serial.println("STATUS");
  Serial.println("HELP");
  Serial.println("==================================");
}

void printStatus() {
  Serial.print("STATUS ");
  Serial.print("LIGHTS[salon=");
  Serial.print(lightSalon ? "on" : "off");
  Serial.print(",chambre=");
  Serial.print(lightChambre ? "on" : "off");
  Serial.print(",cuisine=");
  Serial.print(lightCuisine ? "on" : "off");
  Serial.print("] ");

  Serial.print("DOOR=");
  Serial.print(doorPosition);
  Serial.print("% ");

  Serial.print("WINDOW=");
  Serial.print(windowPosition);
  Serial.print("% ");

  Serial.print("PLUGS[1=");
  Serial.print(plug1 ? "on" : "off");
  Serial.print(",2=");
  Serial.print(plug2 ? "on" : "off");
  Serial.print("] ");

  Serial.print("ENV[T=");
  Serial.print(temperatureC, 1);
  Serial.print("C,H=");
  Serial.print(humidityPct, 1);
  Serial.println("%]");
}

bool startsWith(const String& value, const String& prefix) {
  return value.substring(0, prefix.length()) == prefix;
}

int clampPercent(int v) {
  if (v < 0) return 0;
  if (v > 100) return 100;
  return v;
}

void handleCommand(String cmd) {
  cmd.trim();
  cmd.toUpperCase();
  if (cmd.length() == 0) return;

  if (cmd == "HELP") {
    printHelp();
    return;
  }

  if (cmd == "STATUS") {
    printStatus();
    return;
  }

  if (cmd == "ALL_OFF") {
    lightSalon = false;
    lightChambre = false;
    lightCuisine = false;
    plug1 = false;
    plug2 = false;
    doorPosition = 0;
    windowPosition = 0;
    applyOutputs();
    Serial.println("OK ALL_OFF");
    printStatus();
    return;
  }

  if (cmd == "LIGHT_SALON_ON") { lightSalon = true; }
  else if (cmd == "LIGHT_SALON_OFF") { lightSalon = false; }
  else if (cmd == "LIGHT_CHAMBRE_ON") { lightChambre = true; }
  else if (cmd == "LIGHT_CHAMBRE_OFF") { lightChambre = false; }
  else if (cmd == "LIGHT_CUISINE_ON") { lightCuisine = true; }
  else if (cmd == "LIGHT_CUISINE_OFF") { lightCuisine = false; }
  else if (cmd == "PLUG1_ON") { plug1 = true; }
  else if (cmd == "PLUG1_OFF") { plug1 = false; }
  else if (cmd == "PLUG2_ON") { plug2 = true; }
  else if (cmd == "PLUG2_OFF") { plug2 = false; }
  else if (cmd == "DOOR_OPEN") { doorPosition = 100; }
  else if (cmd == "DOOR_CLOSE") { doorPosition = 0; }
  else if (startsWith(cmd, "DOOR_")) {
    doorPosition = clampPercent(cmd.substring(5).toInt());
  }
  else if (startsWith(cmd, "WINDOW_")) {
    windowPosition = clampPercent(cmd.substring(7).toInt());
  }
  else if (startsWith(cmd, "ENV_T_")) {
    temperatureC = cmd.substring(6).toFloat();
  }
  else if (startsWith(cmd, "ENV_H_")) {
    humidityPct = cmd.substring(6).toFloat();
  }
  else {
    Serial.print("ERR UNKNOWN_CMD: ");
    Serial.println(cmd);
    Serial.println("Type HELP for command list.");
    return;
  }

  applyOutputs();
  Serial.print("OK ");
  Serial.println(cmd);
  printStatus();
}

void readSerialCommands() {
  while (Serial.available() > 0) {
    char c = (char)Serial.read();
    if (c == '\n' || c == '\r') {
      if (cmdBuffer.length() > 0) {
        handleCommand(cmdBuffer);
        cmdBuffer = "";
      }
    } else {
      cmdBuffer += c;
      if (cmdBuffer.length() > 120) {
        cmdBuffer = "";
        Serial.println("ERR CMD_TOO_LONG");
      }
    }
  }
}

void sendPeriodicTelemetry() {
  unsigned long now = millis();
  if (now - lastTelemetryMs < TELEMETRY_PERIOD_MS) return;
  lastTelemetryMs = now;

  // Small drift to emulate live sensor updates in simulation
  temperatureC += 0.1f;
  if (temperatureC > 30.5f) temperatureC = 24.8f;

  humidityPct += 0.4f;
  if (humidityPct > 68.0f) humidityPct = 52.0f;

  Serial.print("TELEMETRY ");
  Serial.print("ovyon/status/sensor/env ");
  Serial.print("{\"temperature\":");
  Serial.print(temperatureC, 1);
  Serial.print(",\"humidity\":");
  Serial.print(humidityPct, 1);
  Serial.println("}");
}

void setup() {
  pinMode(PIN_LIGHT_SALON, OUTPUT);
  pinMode(PIN_LIGHT_CHAMBRE, OUTPUT);
  pinMode(PIN_LIGHT_CUISINE, OUTPUT);
  pinMode(PIN_PLUG1, OUTPUT);
  pinMode(PIN_PLUG2, OUTPUT);

  servoDoor.attach(PIN_SERVO_DOOR);
  servoWindow.attach(PIN_SERVO_WINDOW);

  Serial.begin(115200);
  while (!Serial) { ; }

  applyOutputs();

  Serial.println("OVYON Proteus simulation started.");
  printHelp();
  printStatus();
}

void loop() {
  readSerialCommands();
  sendPeriodicTelemetry();
}
