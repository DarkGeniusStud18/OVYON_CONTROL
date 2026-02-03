# 🏗️ GUIDE DE CONSTRUCTION : ÉCOSYSTÈME OVYON CONTROL

Ce document est le guide technique officiel pour assembler la maquette physique et configurer l'intelligence artificielle de votre projet de soutenance.

---

## 📋 1. Liste du Matériel (BOM - Bill of Materials)

### Niveaux de Contrôle (Hardware)
*   **Microcontrôleurs :** 4 ou 5 x ESP32 DevKit v1 (Un par module pour plus de réalisme).
*   **Actionneurs :**
    *   2 x Servomoteurs (SG90 ou MG996R) pour la Porte et la Fenêtre.
    *   5 x Modules Relais 5V (Simple canal) pour les Lumières et Prises.
*   **Éclairage :** 3 x LEDs de couleurs différentes (Salon, Cuisine, Chambre) + Résistances 220Ω.
*   **Capteurs :** 1 x Capteur de température et humidité DHT11.
*   **Alimentation :** Bloc secteur 5V / 10A (Alimentation commune pour éviter les chutes de tension lors des mouvements de servos).

### Cerveau IA (Aion)
*   **Ordinateur/Board :** Raspberry Pi 4 (ou votre PC portable pour la démo).
*   **Audio :** Micro USB omnidirectionnel + Enceinte Bluetooth ou Jack.

---

## 🛠️ 2. Schéma de Câblage par Module

### Module A : Éclairage (Node Lights)
| Composant | Pin ESP32 | Description |
| :--- | :---: | :--- |
| Relais/LED Salon | **GPIO 25** | Contrôle via MQTT topic `lights/salon` |
| Relais/LED Chambre | **GPIO 26** | Contrôle via MQTT topic `lights/chambre` |
| Relais/LED Cuisine | **GPIO 27** | Contrôle via MQTT topic `lights/cuisine` |

### Module B : Accès (Node Access)
| Composant | Pin ESP32 | Description |
| :--- | :---: | :--- |
| Servo Porte | **GPIO 18** | Angle 0° (fermé) à 90° (ouvert) |
| Servo Fenêtre | **GPIO 19** | Position graduelle 0-100% |

### Module C : Prises (Node Plugs)
| Composant | Pin ESP32 | Description |
| :--- | :---: | :--- |
| Relais Prise 1 | **GPIO 26** | Connecté à un petit ventilateur USB par ex. |
| Relais Prise 2 | **GPIO 27** | Connecté à une lampe de chevet par ex. |

### Module D : Environnement (Node Sensor)
| Composant | Pin ESP32 | Description |
| :--- | :---: | :--- |
| Capteur DHT11 | **GPIO 4** | Envoie Temp/Hum toutes les 15s |

---

## 🚀 3. Étapes de Construction

### Étape 1 : Préparation du Firmware
1.  Ouvrez le dossier `firmware/` dans Arduino IDE.
2.  **CRUCIAL :** Modifiez le fichier `wifi_config.h` avec le nom de votre WiFi et l'adresse IP de votre ordinateur (qui servira de serveur).
3.  Flashez chaque ESP32 avec son code respectif (`Lights.ino`, `Door.ino`, etc.).

### Étape 2 : Assemblage de la Maquette
1.  **Structure :** Utilisez du carton plume ou du bois léger pour créer une mini-maison ou un panneau de présentation vertical.
2.  **Fixation :** Fixez les servos sur les gonds des mini-portes/fenêtres.
3.  **Câblage :** Regroupez tous les fils de masse (GND) et d'alimentation (5V) sur un rail commun pour éviter les fils qui traînent.

### Étape 3 : Configuration de l'IA Aion
1.  Installez Python 3.11 sur votre PC ou Raspberry Pi.
2.  Dans `ai_voice/`, installez les dépendances : `pip install -r requirements.txt`.
3.  Créez un fichier `.env` dans `ai_voice/` et ajoutez votre clé : `GOOGLE_API_KEY=VOTRE_CLE_ICI`.
4.  Lancez Aion : `python aion.py`.

---

## 📱 4. Mise en marche de l'Application

1.  **Backend :** Dans le dossier `backend/`, lancez `npm run dev`. Le serveur SQLite et le Broker MQTT démarrent.
2.  **Frontend :** Dans `frontend/`, lancez `npm run dev`. Ouvrez l'URL sur votre navigateur (ou smartphone via l'IP).
3.  **Liaison :** Dans les **Paramètres** de l'appli, vérifiez que l'adresse du "Broker URL" correspond à votre IP.

---

## 🎭 5. Scénario de Démonstration "Wow"

1.  **Appairage :** Allez dans Paramètres -> Connexion Locale. Cliquez sur "Lancer l'appairage". Montrez au jury l'animation fluide pendant que vous simulez la détection d'un nouvel objet.
2.  **Contrôle Tactile :** Passez sur le **Plan 2D**. Touchez le salon, la LED physique doit s'allumer instantanément.
3.  **Intelligence Vocale :** Ouvrez l'onglet **Voice**. Dites *"Aion, je vais dormir"*.
    *   *Effet :* La porte se ferme, toutes les lumières s'éteignent avec un fondu, l'appli confirme vocalement.
4.  **Proactivité :** Laissez la porte ouverte. Après quelques minutes, une notification surgit sur l'app : *"Aion : Il est tard, la porte est restée ouverte. Sécuriser la maison ?"*

---

## 💡 Conseils pour la Soutenance
*   **Mode Offline :** Insistez sur le fait que le système fonctionne SANS internet (sauf pour Gemini).
*   **Culturel :** Mentionnez que l'IA comprend le **Fon** et le **Yoruba**, ce qui est une innovation majeure pour l'accessibilité en Afrique.
*   **Énergie :** Montrez l'onglet **Analytics** pour prouver que vous surveillez la consommation réelle.

**OVYON Control : La domotique pensée pour nous, par nous.**


Le fichier wifi_config.h est le fichier de configuration central de toute votre partie matérielle
  (Hardware). 

  Son rôle est de centraliser les identifiants de connexion afin que vous n'ayez pas à les modifier un par
  un dans chaque fichier .ino (Lumières, Porte, Fenêtre, etc.).

  Voici ses deux fonctions principales :

   1. Configuration WiFi : Il contient le nom (SSID) et le mot de passe du réseau WiFi que vos cartes ESP32
      utiliseront pour communiquer.
   2. Configuration MQTT (Le Serveur) : Il contient l'adresse IP de votre ordinateur (ou Raspberry Pi) qui
      fait tourner le backend. Sans cette adresse correcte, vos objets connectés ne pourront pas recevoir
      les ordres de l'application.

  Pourquoi est-il crucial pour votre soutenance ?
  Le jour de votre présentation, si vous changez de lieu ou si vous utilisez un point d'accès mobile, vous
  n'aurez qu'un seul endroit où modifier les informations avant de reflasher vos cartes.

  Voici un aperçu de son contenu typique (tel que nous l'avons configuré) :

    1 #ifndef WIFI_CONFIG_H
    2 #define WIFI_CONFIG_H
    3 
    4 // Les identifiants de votre réseau local
    5 const char* OVYON_SSID = "NOM_DE_VOTRE_WIFI";
    6 const char* OVYON_PASSWORD = "MOT_DE_PASSE";
    7 
    8 // L'adresse IP de votre serveur Backend (PC ou Raspberry Pi)
    9 const char* OVYON_MQTT_SERVER = "192.168.x.x"; 
   10 const int OVYON_MQTT_PORT = 1883;
   11 
   12 // Identifiants de sécurité MQTT
   13 const char* OVYON_MQTT_USER = "ovyon";
   14 const char* OVYON_MQTT_PASSWORD = "demo2024";
   15 
   16 #endif

  Conseil pour la démo : Assurez-vous que l'adresse OVYON_MQTT_SERVER correspond bien à l'adresse IP
  actuelle de votre machine sur le réseau local.
