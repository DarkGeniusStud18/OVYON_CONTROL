# OVYON CONTROL - Manuel de Finalisation Ultime (MVP de Soutenance)

Ce guide détaille comment mettre en place l'écosystème **OVYON Control**, incluant le Dashboard 2D, l'IA avancée Gemini, et les nodes ESP32 optimisés.

## 🛠️ 1. Liste du Matériel & Câblage (BOM Complet)

### Composants Principaux
- **ESP32 (DevKit v1)** : 4 unités.
- **Micro USB (pour Raspberry Pi / PC)** : 1 unité.
- **Servo SG90 / MG996R** : 2 unités (Porte + Fenêtre).
- **Relais 5V (Simple Canal)** : 5 unités (Lumières + Prises).
- **LEDs** : 6 unités (3 Lumières, 2 Prises, 1 Status).
- **Alimentation DC 5V / 10A** : Très important pour alimenter tous les ESP32 et servos sans chute de tension.

### Pinout (Câblage ESP32)
| Module | Composant | Pin GPIO |
| :--- | :--- | :---: |
| **Node Lumière** | Salon / Chambre / Cuisine | 25 / 26 / 27 |
| **Node Accès** | Porte / Fenêtre | 18 / 19 |
| **Node Prises** | Prise 1 / Prise 2 | 26 / 27 |

---

## 💻 2. Déploiement Logiciel

### A. Backend (Système Central)
1. `cd backend && npm install`
2. `npm run dev`
   * *Expose l'API REST sur le port 3001 et le Broker MQTT sur 1883.*

### B. Frontend (Interface Premium)
1. `cd frontend && npm install`
2. `npm run dev`
3. Ouvrez `http://localhost:5173`.
   * **Fonctionnalités à tester :** Basculez entre la "Vue Liste" et le "Plan 2D" sur le dashboard. Observez les transitions fluides.

### C. IA Aion (Cerveau Avancé)
1. `cd ai_voice && pip install -r requirements.txt`
2. Modifiez le fichier `.env` pour ajouter votre `GOOGLE_API_KEY`.
3. `python aion.py`
   * **Test IA Smart :** Dites *"Il fait un peu sombre dans le salon"*. Gemini interprètera cela comme une commande d'allumage et Aion répondra vocalement.

---

## 🎭 3. Démonstration pour le Jury

### Étape 1 : Présentation de la Vision
Allez sur l'onglet **"Vision"** de l'application. Expliquez comment OVYON répond au besoin local (langues, offline, coût).

### Étape 2 : Le Plan Tactile
Passez sur le **"Plan 2D"**. Cliquez sur les zones de la maison (Salon, Cuisine). Les lumières sur la maquette physique doivent réagir avec un effet de fondu (dimming) grâce au PWM.

### Étape 3 : L'IA Multilingue
Ouvrez l'onglet **"Voice"**. 
- Dites : *"Allume la lumière"* (Français).
- Dites : *"Ma lampu"* (Fon).
- Dites : *"Tan ina"* (Yoruba).
Le système prouve sa flexibilité culturelle.

### Étape 4 : Monitoring & Sécurité
Allez dans **"System"**. Montrez l'état des nodes ESP32. Débranchez-en un pour montrer la détection d'offline en temps réel.

---
**OVYON Control : La domotique simplifiée, adaptée, et prête pour le futur.**
