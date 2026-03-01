# HARDWARE BILL OF MATERIALS (BOM) COMPLETE - OVYON CONTROL

## 1. Objectif
Cette BOM couvre tout le necessaire pour fabriquer une maquette OVYON complete, presentable en soutenance, avec marge de securite (spares) et accessoires d atelier.

Les prix sont indicatifs (FCFA) et varient selon pays/fournisseur.

---

## 2. BOM electronique principale

| ID | Composant | Quantite mini | Quantite recommandee | Reference conseillee | Prix unitaire estimatif (FCFA) | Total recommande (FCFA) | Criticite |
|---|---|---:|---:|---|---:|---:|---|
| E1 | ESP32 DevKit V1 (30/38 pins) | 5 | 6 | ESP32-WROOM-32 | 4500 | 27000 | Critique |
| E2 | Servomoteur micro | 2 | 3 | SG90 (ou MG90S) | 2500 | 7500 | Critique |
| E3 | Module relais 1 canal 5V | 3 | 5 | High/Low level trigger | 1500 | 7500 | Critique |
| E4 | Module relais 2 canaux 5V | 1 | 2 | optocouple | 3000 | 6000 | Critique |
| E5 | Capteur temperature/humidite | 1 | 2 | DHT11 (ou DHT22) | 2000 | 4000 | Critique |
| E6 | LEDs 5mm (blanc/chaud/couleur) | 6 | 12 | standard | 100 | 1200 | Important |
| E7 | Resistances 220 ohm | 10 | 30 | 1/4W | 50 | 1500 | Important |
| E8 | Resistances 10k ohm | 4 | 10 | 1/4W | 50 | 500 | Important |
| E9 | Breadboard grande | 2 | 3 | MB-102 | 3000 | 9000 | Important |
| E10 | Kit jumpers MM/MF/FF | 1 kit | 2 kits | 120 pcs+ | 4000 | 8000 | Critique |
| E11 | Alimentation 5V 10A | 1 | 1 | SMPS 50W | 12000 | 12000 | Critique |
| E12 | Module buck 5V/3.3V | 1 | 2 | LM2596 | 2000 | 4000 | Important |
| E13 | Condensateur electrolytique 470uF/1000uF | 2 | 6 | 16V+ | 200 | 1200 | Important |
| E14 | Interrupteur ON/OFF ligne principale | 1 | 1 | panel switch | 1000 | 1000 | Important |
| E15 | Fusible + porte-fusible | 1 | 2 | 5A | 1500 | 3000 | Securite |

Sous-total electronique recommande: **~93 900 FCFA**

---

## 3. Materiaux maquette et mecanique

| ID | Materiau | Quantite recommandee | Usage | Prix estimatif (FCFA) |
|---|---|---:|---|---:|
| M1 | Carton plume 5mm (A1/A2) | 3 a 5 plaques | murs/structure | 8000 |
| M2 | MDF fin 3-5mm | 1 plaque | base rigide | 6000 |
| M3 | Equerres/supports servo | 4 | fixation servo | 3000 |
| M4 | Visserie M3 + ecrous + rondelles | 1 kit | fixation modules | 4000 |
| M5 | Colle chaude + batons | 1 kit | assemblage rapide | 3000 |
| M6 | Double face mousse | 2 rouleaux | fixation propre | 2500 |
| M7 | Serre-cables (colson) | 1 sachet | gestion fils | 1500 |
| M8 | Gaine thermo assortie | 1 kit | isolation | 2500 |
| M9 | Etiquettes cable | 1 kit | maintenance | 1500 |

Sous-total mecanique recommande: **~32 000 FCFA**

---

## 4. Outillage atelier

| ID | Outil | Quantite | Obligatoire | Prix estimatif (FCFA) |
|---|---|---:|---|---:|
| T1 | Multimetre digital | 1 | Oui | 7000 |
| T2 | Fer a souder + etain | 1 | Recommande | 12000 |
| T3 | Pince coupante/denudeur | 1 | Oui | 5000 |
| T4 | Tournevis precision | 1 kit | Oui | 4000 |
| T5 | Pistolet colle chaude | 1 | Oui | 5000 |
| T6 | Cable USB data (micro/USB-C selon cartes) | 2 | Oui | 3000 |

Sous-total outillage: **~36 000 FCFA**

---

## 5. Infrastructure logicielle et systeme

| ID | Element | Quantite | Detail |
|---|---|---:|---|
| S1 | Laptop/PC | 1 | backend + frontend + monitoring |
| S2 | Smartphone Android/iOS | 1 | demo app + biometrie |
| S3 | Python 3.11+ | 1 | AI voice scripts |
| S4 | Node.js LTS + npm | 1 | backend/frontend |
| S5 | Arduino IDE 2.x | 1 | firmware flash |
| S6 | Librairies firmware | 5+ | PubSubClient, ArduinoJson, ESP32Servo, DHT |

---

## 6. Audio et presentation (soutenance)

| ID | Composant | Quantite recommandee | But | Prix estimatif (FCFA) |
|---|---|---:|---|---:|
| P1 | Micro externe USB | 1 | commande vocale fiable | 12000 |
| P2 | Petite enceinte amplifiee | 1 | retour Aion audible | 15000 |
| P3 | Cable HDMI + adaptateur | 1 set | projection | 10000 |
| P4 | Multiprise + rallonge | 1 | alimentation scene | 8000 |
| P5 | Powerbank 20 000 mAh | 1 | secours | 20000 |

Sous-total presentation: **~65 000 FCFA**

---

## 7. Budget global estimatif
- Electronique: ~93 900 FCFA
- Mecanique: ~32 000 FCFA
- Outillage: ~36 000 FCFA
- Presentation: ~65 000 FCFA

**Total projet recommande (avec marge): ~226 900 FCFA**

Version economique (sans spares et sans audio premium): **~120 000 a 150 000 FCFA**

---

## 8. Liste achat rapide (checklist magasin)

## 8.1 Obligatoire absolu
- [ ] 5 ESP32 minimum
- [ ] 2 servos minimum
- [ ] Relais (3x 1CH + 1x 2CH minimum)
- [ ] 1 DHT11/DHT22
- [ ] Alim 5V puissante
- [ ] Breadboards + jumpers
- [ ] Resistances 220 ohm et 10k
- [ ] Outils de base + USB data

## 8.2 Recommande pour fiabilite
- [ ] 1 ESP32 spare
- [ ] 1 servo spare
- [ ] 1 relais spare
- [ ] Condensateurs de filtrage
- [ ] Fusible + inter principal
- [ ] Etiquettes cablage

## 8.3 Recommande pour soutenance
- [ ] Micro USB
- [ ] Enceinte
- [ ] Video demo offline de backup
- [ ] Deuxieme cable HDMI/adaptateur

---

## 9. Compatibilite et substitutions
- ESP32 equivalent accepte si support Arduino stable.
- DHT22 peut remplacer DHT11 (plus precis).
- Relais peuvent etre remplaces par MOSFET selon charge.
- SG90 peut etre remplace par MG90S/MG996R si couple necessaire.

---

## 10. Notes d achat pratiques
- Acheter en lot pour uniformiser pinout et comportement.
- Eviter modules no-name sans datasheet.
- Tester chaque composant a reception (DOA check).
- Toujours garder 10 a 20% de marge sur consommables (fils, connecteurs, gaine, vis).

---

## 11. Lien avec les autres documents
- Construction complete: `GUIDE_CONSTRUCTION_OVYON.md`
- Execution hardware/firmware: `GUIDE_HARDWARE_FIRMWARE.md`
- Script oral soutenance: `SCRIPT_ORAL_SOUTENANCE_45MIN_OVYON.md`
