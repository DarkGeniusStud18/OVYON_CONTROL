# Liste du Matériel et Logiciels - OVYON CONTROL

Ce document répertorie tout ce dont vous avez besoin pour construire la maquette physique (le hardware) du système OVYON.

## 1. Composants Électroniques (Le Cœur)

### Microcontrôleurs
*   **5x ESP32 DevKit V1 (30 pins):** Un pour chaque nœud (Porte, Fenêtre, Éclairage, Prises, Environnement). *Note : Vous pouvez en utiliser moins en combinant les fonctions, mais le projet est conçu pour être distribué.*

### Actionneurs (Moteurs et Relais)
*   **2x Servomoteurs SG90 (ou MG996R pour plus de force):** Pour l'ouverture de la porte et de la fenêtre.
*   **1x Module Relais 2 Canaux (5V):** Pour le nœud des prises intelligentes (contrôle de lampes de chevet ou petits appareils).
*   **3x Modules Relais ou 3x Transistors (ex: TIP120) / LEDs:** Pour le nœud d'éclairage (Salon, Chambre, Cuisine).

### Capteurs
*   **1x Capteur DHT11 ou DHT22:** Pour la température et l'humidité (nœud environnement).

---

## 2. Alimentation et Connexion

*   **1x Alimentation Externe 5V / 3A (DC Jack ou Bloc secteur):** Crucial pour alimenter les servos et les ESP32 simultanément sans chutes de tension.
*   **1x Module de puissance pour Breadboard (5V/3.3V):** Pour distribuer l'énergie proprement.
*   **Câbles Jumper (Dupont):** Mâle-Mâle, Mâle-Femelle, et Femelle-Femelle (prévoir au moins 40 de chaque).
*   **3x Breadboards (Grandes):** Pour le prototypage rapide des nœuds.
*   **Résistances :** 220Ω (pour les LEDs) et 10kΩ (résistance de pull-up pour le capteur DHT si non modulé).

---

## 3. Logiciels et Configuration

*   **Arduino IDE:** Version 2.0 ou supérieure de préférence.
*   **Pilotes USB vers UART :** (CP2102 ou CH340 selon votre version d'ESP32).
*   **Bibliothèques Arduino (à installer via le Library Manager) :**
    *   `PubSubClient` (par Nick O'Leary)
    *   `ArduinoJson` (par Benoit Blanchon)
    *   `ESP32Servo` (par Kevin Harrington)
    *   `DHT sensor library` (par Adafruit)
*   **Serveur MQTT :** Inclus dans le dossier `backend` du projet (Aedes).
*   **Node.js & NPM :** Pour faire tourner le backend et le frontend.

---

## 4. Matériaux de Construction (La Maquette)

*   **Structure :** Carton plume (5mm), bois léger (contreplaqué 3mm) ou plastique recyclé pour les murs de la maison.
*   **Fixation :** Pistolet à colle chaude, ruban adhésif double face, ou vis M3 pour les supports ESP32.
*   **Décoration :** Impression 2D du plan de la maison (pour coller au sol de la maquette).

---

## 5. Outillage Recommandé

*   **Multimètre :** Pour tester les tensions et la continuité.
*   **Fer à souder et étain :** (Optionnel si vous utilisez des breadboards, mais recommandé pour la version finale).
*   **Dénudeur de fils / Pince coupante.**
*   **Câble Micro-USB :** De bonne qualité pour le transfert de données vers les ESP32.

---

## 6. Récapitulatif par Nœud

| Nœud | Composants Spécifiques | Rôle |
| :--- | :--- | :--- |
| **Porte** | 1x ESP32 + 1x Servo | Accès principal |
| **Fenêtre** | 1x ESP32 + 1x Servo | Aération / Sécurité |
| **Lumières** | 1x ESP32 + 3x LEDs/Relais | Éclairage zones |
| **Prises** | 1x ESP32 + 1x Relais 2CH | Appareils ménagers |
| **Environnement** | 1x ESP32 + 1x DHT11 | Climat |
