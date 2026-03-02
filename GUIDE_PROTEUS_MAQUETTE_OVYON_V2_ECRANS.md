# GUIDE PROTEUS OVYON V2 - PAS A PAS "ECRAN PAR ECRAN"

## Comment utiliser ce guide

- Lis une section.
- Fais exactement les clics dans l ordre.
- Verifie les "Resultat attendu" avant de passer a l ecran suivant.

Ce guide complete:

- `GUIDE_PROTEUS_MAQUETTE_OVYON.md`
- `simulations/proteus/ovyon_sim_mega.ino`

---

## Ecran 0 - Verification rapide avant ouverture

## A faire

1. Verifier que ce fichier existe:
   - `simulations/proteus/ovyon_sim_mega.ino`
2. Ouvrir Arduino IDE 2.x.

## Resultat attendu

- Le projet OVYON est accessible.
- Arduino IDE s ouvre sans erreur.

---

## Ecran 1 - Ouvrir le sketch OVYON simulation

## Clics exacts

1. `File` -> `Open...`
2. Aller dans `D:\AA_Project\OVYON_CONTROL\simulations\proteus\`
3. Selectionner `ovyon_sim_mega.ino`
4. Cliquer `Open`

## Resultat attendu

- Le code s affiche dans l editeur.
- Tu vois des commandes comme `LIGHT_SALON_ON`, `DOOR_OPEN`, `STATUS`.

---

## Ecran 2 - Selection carte Arduino Mega

## Clics exacts

1. En haut, bouton de selection carte (Board selector)
2. Choisir `Arduino Mega or Mega 2560`
3. Processeur: `ATmega2560`

## Resultat attendu

- La barre du haut indique Arduino Mega 2560.

---

## Ecran 3 - Export du binaire .hex

## Clics exacts

1. `Sketch` -> `Export Compiled Binary`
2. Attendre fin de compilation

## Verification fichier

1. Ouvrir l explorateur dans le dossier du sketch
2. Chercher un fichier `.hex` (ex: `ovyon_sim_mega.ino.hex`)

## Resultat attendu

- Le `.hex` existe.
- Pas d erreur compilation.

---

## Ecran 4 - Creer nouveau projet Proteus

## Clics exacts

1. Ouvrir Proteus
2. `New Project`
3. Nom: `OVYON_Proteus_Maquette_V2`
4. Dossier: `D:\AA_Project\OVYON_CONTROL\simulations\proteus\project_v2`
5. `Next`
6. Laisser schematic active
7. `Do not create PCB layout`
8. `Finish`

## Resultat attendu

- Une feuille blanche de schema apparait.

---

## Ecran 5 - Ajouter composants (bibliotheque)

## Clics exacts

1. Dans la barre gauche, mode composant
2. Cliquer bouton `P` (Pick Devices)
3. Ajouter un par un:
   - `ARDUINO MEGA 2560` x1
   - `LED-RED` x3
   - `LED-GREEN` x2
   - `RESISTOR` x5
   - `SERVO MOTOR` x2
   - `VIRTUAL TERMINAL` x1
4. Fermer la fenetre de recherche

## Resultat attendu

- Tous les composants sont dans la liste de gauche.

---

## Ecran 6 - Placement visuel conseille

## Clics exacts

1. Placer `Arduino Mega` au centre-gauche.
2. Placer 3 LEDs rouges en haut-droite.
3. Placer 2 LEDs vertes en milieu/bas-droite.
4. Placer 2 servos a droite (un haut, un bas).
5. Placer `Virtual Terminal` en bas-gauche.
6. Passer en `Terminals Mode` et placer `GND`/`POWER`.

## Resultat attendu

- Schema propre, espace entre composants.

---

## Ecran 7 - Configurer carte Mega (fichier .hex)

## Clics exacts

1. Double-clic sur `Arduino Mega`
2. `Program File` -> bouton dossier
3. Selectionner `ovyon_sim_mega.ino.hex`
4. `Clock Frequency` = `16MHz`
5. `OK`

## Resultat attendu

- La carte contient le chemin vers le `.hex`.

---

## Ecran 8 - Configurer Virtual Terminal

## Clics exacts

1. Double-clic sur `Virtual Terminal`
2. Regler:
   - Baud Rate: `115200`
   - Data Bits: `8`
   - Parity: `None`
   - Stop Bits: `1`
3. `OK`

## Resultat attendu

- Terminal configure en 115200.

---

## Ecran 9 - Cablage Lights (3 zones)

## Clics exacts

1. Outil `Wire` (ligne)
2. Relier:
   - Mega `D5` -> anode LED rouge 1 (SALON)
   - Mega `D6` -> anode LED rouge 2 (CHAMBRE)
   - Mega `D7` -> anode LED rouge 3 (CUISINE)
3. Pour chaque LED:
   - cathode -> resistance 220 ohm -> GND

## Resultat attendu

- Les 3 lignes D5/D6/D7 sont cablees.
- Chaque LED a sa resistance vers masse.

---

## Ecran 10 - Cablage Plugs (LED vertes)

## Clics exacts

1. Mega `D11` -> anode LED verte 1 (PLUG1)
2. Mega `D12` -> anode LED verte 2 (PLUG2)
3. Chaque cathode -> resistance 220 ohm -> GND

## Resultat attendu

- D11 et D12 pilotent les deux LEDs vertes.

---

## Ecran 11 - Cablage Servos

## Clics exacts

1. Servo DOOR:
   - signal -> Mega `D9`
   - VCC -> POWER
   - GND -> GROUND
2. Servo WINDOW:
   - signal -> Mega `D10`
   - VCC -> POWER
   - GND -> GROUND

## Resultat attendu

- Les 2 servos sont totalement cables (signal + alim + masse).

---

## Ecran 12 - Cablage terminal serie

## Clics exacts

1. Mega `TX0` (pin 1) -> `RXD` Virtual Terminal
2. Mega `RX0` (pin 0) -> `TXD` Virtual Terminal
3. (si disponible) GND terminal -> GND global

## Resultat attendu

- Lien serie croise TX/RX en place.

---

## Ecran 13 - Lancement simulation

## Clics exacts

1. Cliquer `Run` (triangle Play)
2. Regarder la fenetre `Virtual Terminal`

## Resultat attendu

- Messages de demarrage OVYON affiches
- Liste HELP visible
- Ligne STATUS visible

Si rien ne sort:

- pause, verifier Ecrans 7, 8, 12.

---

## Ecran 13B - Recuperer le terminal si ferme par erreur

## Cas 1 (le plus simple)

1. Laisse la simulation en `Run`.
2. Double-clique le composant `VIRTUAL TERMINAL` sur le schema.

## Resultat attendu

- La fenetre terminal se re-ouvre.

## Cas 2 (si double-clic ne marche pas)

1. Clique `Stop`.
2. Attends 1 seconde.
3. Clique `Run`.
4. Double-clique `VIRTUAL TERMINAL`.

## Resultat attendu

- La fenetre terminal revient et affiche les messages de demarrage.

## Cas 3 (si la fenetre est ouverte mais hors ecran)

1. Stop simulation.
2. Sauvegarde le projet.
3. Ferme Proteus.
4. Reouvre le projet.
5. Run + double-clic `VIRTUAL TERMINAL`.

## Resultat attendu

- Le terminal revient a l ecran actif.

## Cas 4 (tu tapes mais rien ne s affiche)

C est souvent normal (pas d echo local). Fais ce test:

1. Tape `STATUS`
2. Appuie `Enter`

Si ok:

- la reponse du sketch s affiche (meme si ta frappe n etait pas visible).

Si rien ne sort:

1. Verifier baud = `115200` (Ecran 8)
2. Verifier cablage serie croise:
   - Mega TX0 (pin 1) -> RXD terminal
   - Mega RX0 (pin 0) -> TXD terminal
3. Verifier simulation en `Run`
4. Verifier `.hex` charge dans la Mega (Ecran 7)

## Astuce anti-blocage

Garde toujours le terminal ouvert avant de cliquer `Run`.
Si tu le fermes, reouvre-le immediatement par double-clic composant.

---

## Ecran 14 - Test commandes live (terminal)

Tape, puis `Enter`:

1. `STATUS`
2. `LIGHT_SALON_ON`
3. `LIGHT_CHAMBRE_ON`
4. `LIGHT_CUISINE_ON`
5. `DOOR_OPEN`
6. `WINDOW_50`
7. `PLUG1_ON`
8. `PLUG2_ON`
9. `STATUS`
10. `ALL_OFF`

## Resultat attendu

- LED rouges s allument selon commandes.
- Servos changent d angle.
- LED vertes plug ON/OFF.
- STATUS reflète chaque etat.

---

## Ecran 15 - Environnement simule

## Clics/actions

1. Dans terminal, taper `ENV_T_29.3`
2. Taper `ENV_H_64`
3. Taper `STATUS`

## Resultat attendu

- Status affiche temperature et humidite mises a jour.

---

## Ecran 16 - Sauvegarde projet

## Clics exacts

1. `File` -> `Save`
2. `File` -> `Save As` (optionnel) pour copier une version soutenance
   - Nom conseille: `OVYON_Proteus_Maquette_V2_DEMO`

## Resultat attendu

- Le schema est sauvegarde.

---

## Ecran 17 - Script mini demo (90 secondes)

1. Lancer simulation
2. `LIGHT_SALON_ON`
3. `DOOR_OPEN`
4. `WINDOW_100`
5. `PLUG1_ON`
6. `STATUS`
7. `ALL_OFF`

Phrase a dire:
"Ici je valide la logique complete de commande et de retour d etat avant la fabrication physique finale."

---

## Ecran 18 - Depannage express (si blocage en direct)

## Cas A: aucune sortie terminal

- Verifier `.hex` charge (Ecran 7)
- Verifier baud 115200 (Ecran 8)
- Verifier TX/RX croise (Ecran 12)

## Cas B: LEDs ne reagissent pas

- Verifier cablage D5/D6/D7 + D11/D12
- Verifier resistances vers GND

## Cas C: servo immobile

- Verifier D9/D10
- Verifier VCC/GND servo
- Retester `DOOR_100` puis `DOOR_0`

---

## Ecran 19 - Passage vers maquette reelle

Quand tout est valide dans Proteus:

1. Reprendre `GUIDE_HARDWARE_FIRMWARE.md`
2. Flasher ESP32 reels
3. Refaire la meme sequence de tests
4. Conserver Proteus comme preuve de conception technique

---

## Resume ultra court

- Compiler `.ino` -> exporter `.hex`
- Charger `.hex` dans Mega Proteus
- Cabler D5/D6/D7, D9/D10, D11/D12, TX/RX
- Lancer et tester commandes terminal
- Sauvegarder schema demo
