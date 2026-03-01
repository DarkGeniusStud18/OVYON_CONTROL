# GUIDE HARDWARE + FIRMWARE - OVYON CONTROL (VERSION DETAILLEE)

## 1. Objectif
Ce document est le manuel technique d execution pour assembler, cabler, flasher et diagnostiquer les noeuds ESP32 d OVYON.

---

## 2. Prerequis logiciels

## 2.1 Arduino IDE
- Arduino IDE 2.x installe
- Support carte ESP32 installe via:
  `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`

## 2.2 Bibliotheques requises
Installer dans Arduino Library Manager:
- PubSubClient
- ArduinoJson
- ESP32Servo
- DHT sensor library
- Adafruit Unified Sensor

## 2.3 Drivers USB
Selon la carte ESP32:
- CP210x ou CH340

---

## 3. Configuration reseau centrale
Modifier `firmware/wifi_config.h` avant flash:
```cpp
const char* OVYON_SSID = "<VOTRE_WIFI>";
const char* OVYON_PASSWORD = "<VOTRE_PASSWORD>";
const char* OVYON_MQTT_SERVER = "<IP_BACKEND>";
const int OVYON_MQTT_PORT = 1883;
const char* OVYON_MQTT_USER = "ovyon";
const char* OVYON_MQTT_PASSWORD = "demo2024";
```

Important:
- `OVYON_MQTT_SERVER` doit etre l IP locale de la machine backend.
- En cas de changement de salle/reseau, reflasher avec nouvelle IP.

---

## 4. Architecture electrique recommandee

## 4.1 Alimentation
- Utiliser une alimentation 5V externe pour servos/relais.
- Ne pas alimenter tous les actionneurs uniquement via USB ESP32.
- Relier toutes les masses (GND commun).

## 4.2 Bonnes pratiques cablage
- Utiliser fils de section adaptee pour servos.
- Isoler toute connexion nue (gaine thermo).
- Eviter longues lignes non torsadees pour signal servo.
- Ajouter etiquettes physiques sur chaque fil.

## 4.3 Protection
- Ajouter fusible ligne principale (option recommande).
- Ajouter condensateur proche servos si instabilite.

---

## 5. Noeud par noeud (pins, topics, test)

## 5.1 Lights Node
Fichier: `firmware/Lights/Lights.ino`

### Pins
- GPIO 25: salon
- GPIO 26: chambre
- GPIO 27: cuisine

### MQTT
- Subscribe:
  - `ovyon/control/lights/+/power`
  - `ovyon/control/lights/+/brightness`
- Publish status:
  - `ovyon/status/lights/salon`
  - `ovyon/status/lights/chambre`
  - `ovyon/status/lights/cuisine`

### Test rapide
- Envoyer `on` sur `/power` -> sortie active
- Envoyer `0..100` sur `/brightness` -> variation PWM

## 5.2 Door Node
Fichier: `firmware/Door/Door.ino`

### Pin
- Servo GPIO 18

### MQTT
- Subscribe: `ovyon/control/door/main/action`
- Publish: `ovyon/status/door/main`

### Actions attendues
- `open` -> servo ~90 deg, status open/100
- `close` -> servo ~0 deg, status closed/0

## 5.3 Window Node
Fichier: `firmware/Window/Window.ino`

### Pin
- Servo GPIO 19

### MQTT
- Subscribe: `ovyon/control/window/salon/position`
- Publish: `ovyon/status/window/salon`

### Actions attendues
- Message `0..100` -> conversion angle 0..90 deg

## 5.4 Plugs Node
Fichier: `firmware/Plugs/Plugs.ino`

### Pins
- RELAY_1 GPIO 26
- RELAY_2 GPIO 27

### MQTT
- Subscribe: `ovyon/control/plugs/+/power`
- Publish:
  - `ovyon/status/plugs/1`
  - `ovyon/status/plugs/2`

### Actions attendues
- `on/off` par prise
- Retour `consumption` simule

## 5.5 Environment Node
Fichier: `firmware/Environment/Environment.ino`

### Pin
- DHT11 data GPIO 4

### MQTT
- Publish: `ovyon/status/sensor/env`

### Actions attendues
- Publication temp/humidity toutes les ~15s

---

## 6. Procedure flash standard

Pour chaque noeud:
1. Brancher ESP32 en USB data
2. Ouvrir fichier `.ino`
3. Outils -> Board: ESP32 Dev Module
4. Outils -> Port: port actif
5. Upload
6. Ouvrir Serial Monitor 115200
7. Verifier:
   - Wi-Fi connected
   - MQTT connected
   - subscribe/publish OK

---

## 7. Diagnostic et depannage

## 7.1 ESP32 ne se connecte pas au Wi-Fi
- Verifier SSID/password
- Verifier bande 2.4GHz
- Tester hotspot smartphone

## 7.2 MQTT echec
- Verifier IP backend
- Verifier port 1883 ouvert
- Verifier credentials mqtt user/password
- Backend doit etre demarre avant ou pendant

## 7.3 Servo tremble / reset ESP32
- alimentation insuffisante
- isoler alimentation servo
- garder GND commun

## 7.4 Relais ne commute pas
- module relais incompatible niveau logique 3.3V
- tester avec transistor/driver ou relais compatible

## 7.5 DHT retourne NaN
- capteur mal cable
- pull-up absent (si module brut)
- intervalle lecture trop court

---

## 8. Validation firmware complete (manuel)
- [ ] Heartbeat/status recu de chaque noeud
- [ ] Toutes les commandes control executent
- [ ] Aucun reboot spontanne ESP32 en 10 min
- [ ] Reconnexion apres redemarrage backend

---

## 9. Commandes utilitaires cote projet
Verification logicielle globale:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-soutenance.ps1 -SkipFirmware
```

Verification complete incluant firmware (si arduino-cli + core esp32 installes):
```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-soutenance.ps1
```

---

## 10. Recommandations de robustesse (version soutenance)
- Garder 1 ESP32 spare pre-flashe
- Garder 1 servo spare
- Garder 1 module relais spare
- Preparer scenario fallback pure software si panne maquette
- Toujours avoir video de demo pre-enregistree

---

## 11. Simulation Proteus (Protheus) + Arduino IDE avant maquette reelle

## 11.1 Objectif
Cette section permet de previsualiser le comportement de la maquette sans assembler le hardware physique:
- valider les logiques ON/OFF,
- tester les transitions servo,
- verifier les messages serie,
- presenter un rendu technique en soutenance meme sans prototype final.

## 11.2 Point important sur ESP32
Proteus ne simule pas nativement et de facon stable tous les projets ESP32/MQTT modernes.
Workflow recommande:
1. Simuler la logique electrique avec une carte AVR (Arduino UNO/MEGA) dans Proteus.
2. Garder le code ESP32 OVYON comme reference finale hardware.
3. Utiliser Wokwi (en parallele) si tu veux une simulation plus proche ESP32.

En pratique, Proteus est excellent pour valider cablage logique et interactions de base, mais pas pour reproduire completement la stack Wi-Fi/MQTT ESP32.

## 11.3 Prerequis Proteus
- Proteus 8.x avec module VSM installe.
- Arduino IDE 2.x installe.
- Bibliotheques de composants Proteus disponibles:
  - Arduino UNO/MEGA,
  - LED + resistance,
  - Relay SPDT (ou equivalent),
  - Servo motor,
  - DHT11 (si present dans ta librairie),
  - Virtual Terminal,
  - Oscilloscope (optionnel).

## 11.4 Lier Proteus a Arduino IDE (workflow .hex)

## Etape A - Creer un sketch de simulation
Dans Arduino IDE, creer un sketch dedie simulation, par exemple:
`simulations/proteus/ovyon_sim_mega.ino`

Ce sketch doit:
- reproduire les entrees/sorties des noeuds OVYON (sans Wi-Fi),
- lire des commandes via Serial,
- piloter LEDs/servo/relais virtuels.

## Etape B - Compiler et exporter le binaire
Dans Arduino IDE:
- Selectionner la bonne carte (ex: Arduino Mega 2560).
- Menu `Sketch` -> `Export Compiled Binary`.

Tu obtiens un fichier `.hex` (ex: `ovyon_sim_mega.ino.hex`) dans le dossier du sketch.

## Etape C - Charger le .hex dans Proteus
1. Ouvrir ton schema Proteus.
2. Double-cliquer sur la carte Arduino (UNO/MEGA).
3. Champ `Program File` -> pointer vers le `.hex` exporte.
4. `Clock Frequency`:
   - UNO: 16 MHz
   - MEGA: 16 MHz
5. Lancer la simulation.

## 11.5 Schema Proteus conseille (minimum demo)

## Bloc A - Lights
- D5, D6, D7 -> LED + R220 ohm vers GND
- Option: remplacer LED par relais virtuel

## Bloc B - Door/Window
- D9 -> Servo Door
- D10 -> Servo Window

## Bloc C - Plugs
- D11, D12 -> relais virtuels Plug1/Plug2

## Bloc D - Environment
- D2 <- DHT11 data (ou capteur equivalent simulation)

## Bloc E - Monitoring
- TX/RX carte -> Virtual Terminal
- Baud rate: 115200

## 11.6 Convention de commandes serie (simulation)
Pour piloter rapidement la simulation depuis Virtual Terminal, utiliser des commandes texte:
- `LIGHT_SALON_ON`
- `LIGHT_SALON_OFF`
- `DOOR_OPEN`
- `DOOR_CLOSE`
- `WINDOW_0`
- `WINDOW_50`
- `WINDOW_100`
- `PLUG1_ON`
- `PLUG1_OFF`

Le sketch de simulation traduit ces commandes en actions GPIO/servo.

## 11.7 Correspondance OVYON (recommandee)
Garder une table dans ton sketch pour aligner simulation et projet reel:
- Lights salon/chambre/cuisine -> sorties virtuelles
- Door action -> servo
- Window position -> servo
- Plugs 1/2 -> relais
- Sensor env -> valeurs periodiques serie

Ainsi, meme si les broches ne sont pas identiques aux GPIO ESP32, la logique metier reste identique.

## 11.8 Limites a annoncer au jury
Si tu montres Proteus en soutenance, annonce clairement:
- \"Cette simulation valide la logique fonctionnelle et le cablage.\"
- \"La couche reseau ESP32/MQTT est validee separement sur firmware reel.\"
- \"La simulation ne remplace pas le test materiel final, elle l accelere.\"

Cette formulation renforce ta credibilite technique.

## 11.9 Procedure demo hybride conseillee
1. Montrer 60-90 secondes de Proteus (vue cablage + action virtuels).
2. Basculer sur dashboard OVYON.
3. Montrer logs/backend pour prouver la coherence architecture.
4. Conclure: simulation = preuve de conception, maquette = preuve d integration.

## 11.10 Checklist de validation simulation
- [ ] Le `.hex` se charge sans erreur dans Proteus
- [ ] Les LEDs repondent aux commandes
- [ ] Les servos changent bien de position
- [ ] Les relais virtuels commutent correctement
- [ ] Le Virtual Terminal affiche les etats attendus
- [ ] Les timings sont stables (pas de freeze simulation)
