# GUIDE COMPLET - CONCEPTION DE LA MAQUETTE OVYON SUR PROTEUS (PAS A PAS)

## 1. Objectif
Ce guide te montre exactement comment:
- creer le projet Proteus,
- charger le code Arduino de simulation OVYON,
- cabler chaque element (lumieres, porte, fenetre, prises, terminal),
- lancer et tester la maquette virtuelle.

Ce guide est ecrit pour Proteus 8.x + Arduino IDE 2.x.

---

## 2. Ce qu il faut avant de commencer

## 2.1 Fichiers deja presents dans ton projet
- Sketch de simulation: `simulations/proteus/ovyon_sim_mega.ino`

## 2.2 Logiciels
- Proteus 8 Professional (ISIS Schematic Capture)
- Arduino IDE 2.x

## 2.3 Principe important
On simule OVYON avec **Arduino Mega** dans Proteus (pas ESP32 direct), puis on garde ESP32 pour le hardware reel.

---

## 3. Etape A - Compiler le sketch et recuperer le .hex

1. Ouvre Arduino IDE.
2. Clique `File` -> `Open`.
3. Ouvre: `D:\AA_Project\OVYON_CONTROL\simulations\proteus\ovyon_sim_mega.ino`
4. En haut, dans selection de carte:
   - clique sur la carte actuelle
   - choisis `Arduino Mega or Mega 2560`
   - processeur: `ATmega2560`
5. Clique menu `Sketch` -> `Export Compiled Binary`.
6. Va dans le dossier du sketch et verifie le fichier:
   - `ovyon_sim_mega.ino.hex` (ou nom proche)

Tu utiliseras ce `.hex` dans Proteus.

---

## 4. Etape B - Creer le projet Proteus

1. Ouvre Proteus.
2. Clique `New Project`.
3. Nom du projet: `OVYON_Proteus_Maquette`
4. Dossier: choisis un dossier simple (ex: `D:\AA_Project\OVYON_CONTROL\simulations\proteus\project`)
5. `Next`
6. Option schematic: garder active
7. Option PCB: choisir `Do not create PCB layout`
8. Option firmware: ignorer pour l instant
9. `Finish`

Tu arrives sur la feuille de schema (ISIS).

---

## 5. Etape C - Ajouter les composants (clic par clic)

## 5.1 Ouvrir la bibliotheque
1. A gauche, en mode `Component`, clique bouton `P` (Pick Devices).

## 5.2 Ajouter ces composants
Recherche et ajoute un par un:
- `ARDUINO MEGA 2560` (x1)
- `LED-RED` (x3) pour salon/chambre/cuisine
- `RES` ou `RESISTOR` (x3)
- `SERVO MOTOR` (x2)
- `LED-GREEN` (x2) pour simuler Plug1/Plug2 (simple et fiable)
- `VIRTUAL TERMINAL` (x1)
- `POWER` et `GROUND` (depuis `Terminals Mode`, pas via P)

Conseil:
Si un composant n apparait pas avec ce nom exact, tape des mots cle plus courts:
`ARDUINO`, `LED`, `SERVO`, `TERMINAL`.

---

## 6. Etape D - Placer les composants sur la feuille

1. Selectionne `ARDUINO MEGA 2560`, clique au centre-gauche pour le poser.
2. Pose 3 LED rouges en haut a droite (LIGHT_SALON, LIGHT_CHAMBRE, LIGHT_CUISINE).
3. Pose 3 resistances a cote des LED.
4. Pose 2 servos a droite (DOOR et WINDOW).
5. Pose 2 LED vertes en bas a droite (PLUG1, PLUG2).
6. Pose 1 `VIRTUAL TERMINAL` en bas a gauche.
7. Passe en `Terminals Mode` (barre gauche), pose plusieurs points `GROUND` et `POWER`.

---

## 7. Etape E - Configurer les valeurs avant cablage

## 7.1 Resistances LED
Pour chaque resistance:
1. Double-clique la resistance.
2. `Resistance` = `220`
3. `OK`

## 7.2 Carte Arduino Mega
1. Double-clique `Arduino Mega 2560`.
2. Champ `Program File` -> clique dossier -> selectionne ton `.hex`.
3. `Clock Frequency` = `16MHz` (ou `16000000`)
4. `OK`

## 7.3 Virtual Terminal
1. Double-clique `Virtual Terminal`.
2. `Baud Rate` = `115200`
3. `Data Bits` = `8`
4. `Parity` = `None`
5. `Stop Bits` = `1`
6. `OK`

---

## 8. Etape F - Cablage complet (element par element)

Utilise l outil `Wire` (icome crayon/ligne).

## 8.1 Lights (3 zones)
- Mega `D5` -> Anode LED SALON
- Mega `D6` -> Anode LED CHAMBRE
- Mega `D7` -> Anode LED CUISINE

Puis pour chaque LED:
- Cathode LED -> Resistance 220 ohm -> GND

## 8.2 Plugs (simulation simple par LED)
- Mega `D11` -> Anode LED verte PLUG1
- Mega `D12` -> Anode LED verte PLUG2

Puis:
- Cathode LED -> Resistance 220 ohm -> GND

Note:
Dans ce schema de previsualisation, les prises sont representees par LED vertes (plus simple que relais VSM).

## 8.3 Servos
### Servo DOOR
- Signal du servo DOOR -> Mega `D9`
- VCC servo DOOR -> `POWER`
- GND servo DOOR -> `GROUND`

### Servo WINDOW
- Signal du servo WINDOW -> Mega `D10`
- VCC servo WINDOW -> `POWER`
- GND servo WINDOW -> `GROUND`

## 8.4 Virtual Terminal (communication serie)
- Mega `TX0` (pin 1) -> `RXD` du Virtual Terminal
- Mega `RX0` (pin 0) -> `TXD` du Virtual Terminal
- GND Mega -> GND terminal (si present sur ton modele)

Important:
Le croisement TX/RX est obligatoire.

---

## 9. Etape G - Lancer la simulation

1. Clique bouton `Run` (triangle Play en bas).
2. Le terminal doit afficher:
   - demarrage simulation OVYON,
   - liste des commandes (`HELP`),
   - un premier `STATUS`.

Si rien ne s affiche:
- verifie le `.hex`,
- verifie baud rate 115200,
- verifie cablage TX/RX croise.

---

## 10. Etape H - Tester les commandes (dans Virtual Terminal)

Tape une commande puis `Enter`.

Commandes disponibles:
- `HELP`
- `STATUS`
- `LIGHT_SALON_ON`
- `LIGHT_SALON_OFF`
- `LIGHT_CHAMBRE_ON`
- `LIGHT_CHAMBRE_OFF`
- `LIGHT_CUISINE_ON`
- `LIGHT_CUISINE_OFF`
- `DOOR_OPEN`
- `DOOR_CLOSE`
- `DOOR_0` a `DOOR_100`
- `WINDOW_0` a `WINDOW_100`
- `PLUG1_ON`, `PLUG1_OFF`
- `PLUG2_ON`, `PLUG2_OFF`
- `ENV_T_27.5` (temperature simulee)
- `ENV_H_61` (humidite simulee)
- `ALL_OFF`

Exemple de sequence demo:
1. `LIGHT_SALON_ON`
2. `DOOR_OPEN`
3. `WINDOW_50`
4. `PLUG1_ON`
5. `STATUS`
6. `ALL_OFF`

---

## 11. Validation finale (checklist)
- [ ] Le terminal affiche le menu `HELP` au demarrage
- [ ] LED salon/chambre/cuisine reagissent correctement
- [ ] Les 2 servos bougent sur commandes
- [ ] LED Plug1/Plug2 reagissent
- [ ] La commande `STATUS` affiche un etat coherent
- [ ] La simulation ne freeze pas pendant 3-5 minutes

---

## 12. Problemes courants et corrections

## 12.1 Erreur: program file invalide
- Re-exporte le binaire dans Arduino IDE (`Export Compiled Binary`)
- Recharge le nouveau `.hex` dans la carte Proteus

## 12.2 Le terminal ne recoit rien
- Verifier `TX0 -> RXD` et `RX0 -> TXD`
- Verifier baud 115200
- Verifier simulation en `Run` (pas `Pause`)

## 12.3 Servo ne bouge pas
- Verifier VCC/GND du servo
- Verifier signal sur D9 (door) ou D10 (window)
- Tester `DOOR_100` puis `DOOR_0`

## 12.4 LED allumee en permanence
- Verifier polarite LED (anode/cathode)
- Verifier resistance vers GND

---

## 13. Astuce soutenance (si maquette physique pas prete)
Tu peux presenter:
1. Le schema Proteus cable en direct.
2. Le terminal avec commandes et etats.
3. Les LEDs/servos qui reagissent.
4. Puis expliquer: "Cette simulation valide le design electrique et la logique de controle."

Cela montre une vraie demarche d ingenierie, meme avant fabrication physique.

---

## 14. Prochaine etape apres Proteus
Quand la simulation est stable:
1. Reprendre les pins et flux logiques valides.
2. Passer au montage physique selon:
   - `GUIDE_CONSTRUCTION_OVYON.md`
   - `GUIDE_HARDWARE_FIRMWARE.md`
3. Refaire la meme sequence de tests sur hardware reel.
