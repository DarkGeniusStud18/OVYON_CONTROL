# MEMO 1 PAGE - CABLAGE PROTEUS OVYON (RAPIDE)

## 1) Fichier a compiler
- Sketch: `simulations/proteus/ovyon_sim_mega.ino`
- Carte Arduino IDE: `Arduino Mega 2560 (ATmega2560)`
- Menu: `Sketch -> Export Compiled Binary`
- Fichier charge dans Proteus: `*.hex`

---

## 2) Composants minimum
- `ARDUINO MEGA 2560` x1
- `LED-RED` x3 + `RESISTOR 220 ohm` x3 (Lights)
- `LED-GREEN` x2 + `RESISTOR 220 ohm` x2 (Plugs)
- `SERVO MOTOR` x2 (Door/Window)
- `VIRTUAL TERMINAL` x1
- `POWER` + `GROUND`

---

## 3) Cablage express (pins)

## Lights
- D5 -> LED rouge SALON (anode)
- D6 -> LED rouge CHAMBRE (anode)
- D7 -> LED rouge CUISINE (anode)
- Chaque cathode -> R220 -> GND

## Plugs
- D11 -> LED verte PLUG1 (anode)
- D12 -> LED verte PLUG2 (anode)
- Chaque cathode -> R220 -> GND

## Servos
- Door signal -> D9
- Window signal -> D10
- Servo VCC -> POWER
- Servo GND -> GROUND

## Terminal serie
- Mega TX0 (pin 1) -> RXD terminal
- Mega RX0 (pin 0) -> TXD terminal
- Baud terminal: `115200`

---

## 4) Config Proteus a ne pas oublier
- Double clic Mega:
  - `Program File` = ton `.hex`
  - `Clock` = `16MHz`
- Double clic Virtual Terminal:
  - `115200 / 8N1`

---

## 5) Sequence test (60 sec)
1. `HELP`
2. `LIGHT_SALON_ON`
3. `LIGHT_CHAMBRE_ON`
4. `DOOR_OPEN`
5. `WINDOW_50`
6. `PLUG1_ON`
7. `STATUS`
8. `ALL_OFF`

---

## 6) Commandes utiles
- Lights: `LIGHT_SALON_ON/OFF`, `LIGHT_CHAMBRE_ON/OFF`, `LIGHT_CUISINE_ON/OFF`
- Door: `DOOR_OPEN`, `DOOR_CLOSE`, `DOOR_0..100`
- Window: `WINDOW_0..100`
- Plugs: `PLUG1_ON/OFF`, `PLUG2_ON/OFF`
- Env: `ENV_T_27.5`, `ENV_H_61`
- Global: `STATUS`, `HELP`, `ALL_OFF`

---

## 7) Depannage ultra rapide
- Rien dans terminal:
  - verifier `.hex` charge
  - verifier TX/RX croise
  - verifier 115200
- LED ne reagit pas:
  - verifier polarite LED + R220 vers GND
- Servo ne bouge pas:
  - verifier D9/D10 + VCC/GND servo

---

## 8) Phrase soutenance (si maquette physique absente)
"Cette simulation valide le design electrique et la logique de commande avant integration hardware finale."
