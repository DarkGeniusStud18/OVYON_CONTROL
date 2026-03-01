# GUIDE DE CONSTRUCTION COMPLET - OVYON CONTROL (VERSION DETAILLEE)

## 1. Objectif du guide
Ce guide explique pas a pas comment fabriquer une maquette OVYON fonctionnelle de niveau soutenance:
- montage physique,
- architecture electrique,
- flash firmware,
- integration backend/frontend/IA,
- tests finaux de validation.

Ce document est le guide principal de construction. Le document `GUIDE_HARDWARE_FIRMWARE.md` est le guide d execution technique detaillee par noeud.

---

## 2. Architecture cible de la maquette

## 2.1 Niveaux
1. Niveau interface: Frontend React (tablette/PC/smartphone)
2. Niveau orchestration: Backend Node.js + broker MQTT (Aedes) + SQLite
3. Niveau edge: 5 noeuds ESP32 (Door, Window, Lights, Plugs, Environment)
4. Niveau intelligence: AI voice Python (`aion.py`, `aion_brain.py`)

## 2.2 Flux principal
Utilisateur -> Frontend -> API/Store -> MQTT publish -> ESP32 action -> MQTT status -> Frontend refresh

## 2.3 Parametres reseau actuels (projet)
- MQTT broker host (firmware): `192.168.1.100` (a ajuster selon ton reseau)
- MQTT port: `1883`
- MQTT user: `ovyon`
- MQTT password: `demo2024`
- MQTT WebSocket (frontend): `8083`

---

## 3. Plan de fabrication recommande

## 3.1 Etape A - Preparation atelier
- Surface de travail isolee et stable.
- Alimentation coupee pendant le cablage.
- Etiquetage obligatoire des fils (Door, Window, Light1, Light2, Plug1...).
- Verification du materiel avec `HARDWARE_BILL_OF_MATERIALS.md`.

## 3.2 Etape B - Construction mecanique de la maquette
- Fabriquer une base rigide (bois MDF 5mm ou carton plume epais).
- Definir 5 zones visibles:
  - zone salon/chambre/cuisine (lumiere),
  - zone porte,
  - zone fenetre,
  - zone prises,
  - zone environnement.
- Prevoir des trappes d acces pour maintenance des ESP32.
- Fixer les servos sur supports rigides (eviter collage direct sans equerre).

## 3.3 Etape C - Construction electrique
- Utiliser une alimentation 5V centrale de puissance suffisante (voir BOM).
- Regle critique: masse commune (GND) entre alimentation externe, ESP32, capteurs, servos, relais.
- Separer les lignes:
  - ligne puissance actionneurs (servo/relais),
  - ligne logique ESP32/capteurs.
- Proteger les lignes sensibles (gaine thermo, serre-cables).

## 3.4 Etape D - Flash firmware par noeud
Ordre recommande:
1. Lights
2. Door
3. Window
4. Plugs
5. Environment

Pour chaque flash:
- verifier `firmware/wifi_config.h`,
- selectionner la bonne carte/port,
- televerser,
- confirmer sur Serial Monitor.

## 3.5 Etape E - Integration logicielle
1. Lancer backend (`backend`)
2. Lancer frontend (`frontend`)
3. Lancer AI voice (`ai_voice`)
4. Connecter la maquette et verifier les statuses MQTT

## 3.6 Etape F - Validation complete
Executer:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-soutenance.ps1 -SkipFirmware
```
Puis valider la maquette en manuel avec un protocole de test (section 8).

---

## 4. Cablage logique attendu (resume)

## 4.1 Node Lights (`firmware/Lights/Lights.ino`)
- GPIO 25: salon
- GPIO 26: chambre
- GPIO 27: cuisine
- Topics:
  - `ovyon/control/lights/+/power`
  - `ovyon/control/lights/+/brightness`
  - status: `ovyon/status/lights/<room>`

## 4.2 Node Door (`firmware/Door/Door.ino`)
- Servo pin: GPIO 18
- Topic commande: `ovyon/control/door/main/action`
- Status: `ovyon/status/door/main`

## 4.3 Node Window (`firmware/Window/Window.ino`)
- Servo pin: GPIO 19
- Topic commande: `ovyon/control/window/salon/position`
- Status: `ovyon/status/window/salon`

## 4.4 Node Plugs (`firmware/Plugs/Plugs.ino`)
- Relay 1: GPIO 26
- Relay 2: GPIO 27
- Topic commande: `ovyon/control/plugs/+/power`
- Status:
  - `ovyon/status/plugs/1`
  - `ovyon/status/plugs/2`

## 4.5 Node Environment (`firmware/Environment/Environment.ino`)
- DHT11 data: GPIO 4
- Status: `ovyon/status/sensor/env`

---

## 5. Procedure de mise en service complete

## 5.1 Firmware
- Ouvrir `firmware/wifi_config.h`
- Configurer SSID / mot de passe / IP MQTT
- Flasher les 5 noeuds

## 5.2 Backend
```powershell
cd backend
npm run dev
```
Verification attendue:
- broker MQTT demarre,
- API accessible,
- logs ecrits sans erreur critique.

## 5.3 Frontend
```powershell
cd frontend
npm run dev
```
Verification attendue:
- UI charge,
- connexion broker visible,
- devices visibles/apres heartbeat.

## 5.4 AI Voice
```powershell
cd ai_voice
pip install -r requirements.txt
python aion.py
# optionnel en parallele
python aion_brain.py
```

---

## 6. Scenarios de demonstration recommandes

## 6.1 Scenario rapide (3 min)
1. Ouvrir dashboard
2. Allumer salon
3. Ouvrir puis fermer porte
4. Lire temperature/humidite

## 6.2 Scenario soutenance (10 a 15 min)
1. Controle tactile lumiere
2. Commande vocale locale
3. Commande vocale contextuelle
4. Appairage
5. Biometrie
6. Admin logs
7. Panic mode
8. Analytics

---

## 7. Risques terrain et mitigation
- Chute tension servo -> alim externe + condensateur + masse commune
- Reconnexion MQTT lente -> boucle reconnect deja presente dans firmware
- Latence IA cloud -> bascule commandes locales
- Bruit salle -> micro filaire ou saisie texte de secours
- Deconnexion Wi-Fi -> hotspot de secours preconfigure

---

## 8. Protocole de test final (obligatoire avant soutenance)

## 8.1 Tests unitaires fonctionnels maquette
- [ ] Allumage/extinction 3 zones lumiere
- [ ] Variation brightness lights
- [ ] Door open/close + status exact
- [ ] Window position 0/50/100
- [ ] Plug1 on/off + conso simulee
- [ ] Plug2 on/off + conso simulee
- [ ] DHT status recu toutes les 15s

## 8.2 Tests resilients
- [ ] Redemarrage backend sans reboot ESP32
- [ ] Coupure/reprise Wi-Fi
- [ ] Redemarrage frontend sans perte etat retenu

## 8.3 Test repetition soutenance
- [ ] run complet en 15 min sans blocage
- [ ] 2 incidents simules geres calmement

---

## 9. Livrables minimum pour jour J
- Maquette cablage propre et etiquete
- Laptop configure (backend/frontend)
- Smartphone demo
- Script soutenance imprime
- Video plan B offline
- Captures ecran plan C

---

## 10. Annexes utiles
- Guide technique detail: `GUIDE_HARDWARE_FIRMWARE.md`
- BOM complete achat: `HARDWARE_BILL_OF_MATERIALS.md`
- Script oral 45 min: `SCRIPT_ORAL_SOUTENANCE_45MIN_OVYON.md`
