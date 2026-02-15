# Guide de Configuration Matérielle et Firmware - OVYON CONTROL

Ce guide détaille les étapes pour configurer l'IDE Arduino, installer les bibliothèques nécessaires, câbler les composants et flasher les firmwares sur les modules ESP32 de la maquette OVYON.

## 1. Préparation de l'IDE Arduino

### Installation du support ESP32
1. Ouvrez l'IDE Arduino.
2. Allez dans **Fichier > Préférences**.
3. Dans "URL de gestionnaire de cartes supplémentaires", ajoutez :
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
4. Allez dans **Outils > Carte > Gestionnaire de carte**, recherchez "esp32" et installez la dernière version.

### Installation des Bibliothèques
Allez dans **Croquis > Inclure une bibliothèque > Gérer les bibliothèques** et installez :
- **PubSubClient** (par Nick O'Leary) : Pour la communication MQTT.
- **ArduinoJson** (par Benoit Blanchon) : Pour le formatage des données.
- **ESP32Servo** (par Kevin Harrington) : Pour le contrôle de la porte et de la fenêtre.
- **DHT sensor library** (par Adafruit) : Pour le capteur d'environnement.
- **Adafruit Unified Sensor** (par Adafruit) : Dépendance pour le DHT.

---

## 2. Configuration Réseau (Crucial)

Avant de flasher, vous devez configurer le fichier central de connexion.
1. Ouvrez `firmware/wifi_config.h`.
2. Modifiez `OVYON_MQTT_SERVER` par l'adresse IP locale de l'ordinateur qui fait tourner le backend (ex: `192.168.1.15`).
3. Modifiez `OVYON_SSID` et `OVYON_PASSWORD` selon les paramètres de votre routeur/point d'accès.

```cpp
const char* OVYON_SSID = "VOTRE_WIFI";
const char* OVYON_PASSWORD = "VOTRE_MOT_DE_PASSE";
const char* OVYON_MQTT_SERVER = "192.168.X.X"; // IP de votre PC
```

---

## 3. Schéma de Câblage et Flashage

Chaque ESP32 correspond à un nœud spécifique. Voici les branchements pour chacun :

### A. Nœud d'Accès (Porte) - `Door/Door.ino`
- **Composant :** Servomoteur (ex: MG996R ou SG90)
- **Câblage :**
    - Signal (Orange/Jaune) -> **GPIO 18**
    - VCC -> 5V (Alimentation externe recommandée pour les gros servos)
    - GND -> GND (Relier le GND du servo au GND de l'ESP32)

### B. Nœud de Fenêtre - `Window/Window.ino`
- **Composant :** Servomoteur (SG90)
- **Câblage :**
    - Signal (Orange/Jaune) -> **GPIO 19**
    - VCC -> 5V
    - GND -> GND

### C. Nœud d'Éclairage - `Lights/Lights.ino`
- **Composants :** 3 LEDs (ou modules relais)
- **Câblage :**
    - LED Salon -> **GPIO 25**
    - LED Chambre -> **GPIO 26**
    - LED Cuisine -> **GPIO 27**
    - *N'oubliez pas les résistances (220Ω) pour les LEDs.*

### D. Nœud de Prises - `Plugs/Plugs.ino`
- **Composants :** Module Relais 2 Canaux
- **Câblage :**
    - Commande Relais 1 -> **GPIO 26**
    - Commande Relais 2 -> **GPIO 27**
    - VCC Relais -> 5V
    - GND Relais -> GND

### E. Nœud Environnement - `Environment/Environment.ino`
- **Composant :** Capteur DHT11 ou DHT22
- **Câblage :**
    - Data -> **GPIO 4**
    - VCC -> 3.3V
    - GND -> GND

---

## 4. Procédure de Flashage

Pour chaque dossier dans `firmware/` :
1. Connectez l'ESP32 à votre PC via USB.
2. Dans l'IDE Arduino, sélectionnez **Outils > Carte > ESP32 Dev Module**.
3. Sélectionnez le bon port dans **Outils > Port**.
4. Ouvrez le fichier `.ino` correspondant.
5. Cliquez sur **Téléverser** (Flèche vers la droite).
6. Ouvrez le **Moniteur Série** (115200 baud) pour vérifier la connexion au WiFi et au Broker MQTT.

---

## 5. Conseils pour la Maquette (Hardware)

1. **Alimentation :** L'ESP32 peut être alimenté via USB, mais si vous utilisez plusieurs servos et relais, utilisez une source 5V/3A externe. **Partagez impérativement la masse (GND)** entre l'ESP32 et l'alimentation externe.
2. **Relais :** Assurez-vous d'utiliser des modules relais compatibles 3.3V pour les signaux de commande, ou utilisez des transistors/level-shifters si nécessaire.
3. **MQTT :** Le backend doit être lancé (`npm run dev` dans le dossier `backend`) AVANT que les ESP32 n'essaient de se connecter, sinon ils resteront en boucle de reconnexion.
