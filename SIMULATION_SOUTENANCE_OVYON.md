# SIMULATION INTEGRALE DE SOUTENANCE - OVYON CONTROL (VERSION DETAILLEE)

## 0) But du document

Ce document est un script operationnel complet pour ta soutenance OVYON Control.
Il sert a piloter:

- ton discours,
- la demonstration live,
- la gestion des incidents,
- la defense technique en Q/R,
- et la cloture avec impact.

Utilise-le comme un conducteur scene + un plan de secours.

---

## 1) Format cible de la soutenance

- Duree totale recommandee: **45 minutes**
- Segment 1: **Presentation theorique (15 min)**
- Segment 2: **Demonstration technique live (15 min)**
- Segment 3: **Questions / Reponses (15 min)**

Si le jury impose 40 min:

- Theorie: 13 min
- Demo: 15 min
- Q/R: 12 min

---

## 2) Message central a marteler

"OVYON Control n est pas un prototype gadget. C est une architecture domotique locale, resiliente, multilingue et faible consommation, adaptee au contexte africain."

Trois promesses a repeter:

1. **Souverainete locale**: donnees en local (SQLite), pas de dependance cloud pour le coeur.
2. **Accessibilite reelle**: commandes en francais et langues locales.
3. **Robustesse terrain**: MQTT + ESP32 + logique locale = service meme en conditions reseau degradees.

---

## 3) Preparation avant soutenance

## 3.1 Check J-7 a J-2

- Verifier que tout le systeme est testable de bout en bout.
- Geler les features: plus de nouvelles fonctions de derniere minute.
- Nettoyer le repo et preparer une branche stable de demo.
- Enregistrer une video de demo complete (2 a 4 min) en plan B.
- Preparer un jeu de captures ecran de secours (dashboard, voice, admin, analytics).

## 3.2 Check J-1

- Rejouer la soutenance en conditions reelles avec chronometre.
- Tester la maquette physique (lumiere, porte, fenetre, prises) 3 fois de suite.
- Tester biometrie, appairage, mode panique.
- Verifier la cle API Gemini et son quota.
- Charger tous les appareils: laptop, smartphone, powerbanks.

## 3.3 Check Jour J (H-2 a H-0)

- Arriver en avance, installer le poste demo.
- Desactiver MAJ auto et notifications systeme.
- Passer en mode Ne pas deranger.
- Verifier audio sortie + micro.
- Ouvrir les fenetres/onglets necessaires avant entree du jury.
- Garder un hotspot mobile pret.
- Avoir un cable HDMI de secours + adaptateur.

---

## 4) Architecture a presenter clairement (verbal)

## 4.1 Vue systeme

- **Frontend**: React + TypeScript + Vite (interface utilisateur premium).
- **Backend**: Node.js + TypeScript (API, orchestration, logique metier).
- **Broker MQTT**: Aedes (messagerie IoT faible latence).
- **Persistence**: SQLite local (historique, etat devices, regles, logs).
- **AI Voice**: Python (`aion.py`, `aion_brain.py`) avec mode local + mode semantique.
- **Firmware**: ESP32 (Door, Lights, Window, Plugs, Environment).

## 4.2 Argument technique simple

- MQTT pour minimiser trafic et consommation.
- SQLite pour robustesse locale sans infra lourde.
- IA hybride:
  - local regex = rapide et tolerant aux pannes,
  - cloud semantique = intelligence contextuelle.

---

## 5) Script minute par minute - Segment 1 (Theorie, 15 min)

## [00:00 - 01:30] Ouverture

**Objectif:** installer autorite + vision.

**Texte recommande:**
"Monsieur le President, membres du jury, je vous presente OVYON Control, un ecosysteme domotique local adapte a notre realite: cout, connectivite, langue, securite."

**A faire:**

- posture stable,
- debit lent,
- contact visuel circulaire.

## [01:30 - 04:00] Problematique

**A montrer:** cout des solutions importees, dependance internet, barriere linguistique.

**Texte recommande:**
"Le probleme n est pas seulement technique. Il est contextuel: une maison intelligente qui tombe quand internet tombe n est pas vraiment intelligente chez nous."

## [04:00 - 07:00] Solution OVYON

**A montrer:** les 3 piliers (local, multilingue, low-power).

**Texte recommande:**
"OVYON repond avec une architecture locale, multi-niveaux, capable de continuer a servir meme en mode degrade."

## [07:00 - 11:30] Architecture technique

**A montrer:** schema Frontend <-> Backend <-> MQTT <-> ESP32 + SQLite + AI.

**Texte recommande:**
"La valeur de cette architecture est dans l equilibre entre performance locale, simplicite de maintenance et evolutivite."

**Points jury techniques:**

- pourquoi SQLite,
- pourquoi MQTT,
- strategie de reconnexion,
- logique de priorite commande humaine vs automation.

## [11:30 - 15:00] Securite + impact

**A montrer:** biometrie, logs admin, mode panique, perspectives smart building.

**Texte recommande:**
"Nous ne controlons pas seulement des ampoules; nous gerons la confiance et la continuite de service domestique."

---

## 6) Script minute par minute - Segment 2 (Demo live, 15 min)

## [15:00 - 16:30] Lancement app

**Action:** ouvrir l application.

**Dire:**
"Je demarre par l experience utilisateur: navigation fluide, etat systeme en direct, architecture orientee usage."

## [16:30 - 19:00] Controle tactile maquette

**Action:** allumer/eteindre une lumiere depuis UI.

**Validation visible:** maquette reagit immediatement.

**Dire:**
"La boucle complete UI -> MQTT -> device -> retour etat fonctionne en temps reel."

## [19:00 - 22:30] IA vocale

**Action 1 (locale):** commande simple.
**Action 2 (semantique):** phrase naturelle (ex: je vais dormir).

**Dire:**
"Le mode local garantit la reactivite; le mode semantique apporte la comprehension contextuelle."

## [22:30 - 25:00] Appairage + biometrie

**Action:** mode appairage, selection device, tentative ouverture porte avec verification biometrie.

**Dire:**
"On reduit la friction d installation tout en securisant les actions critiques."

## [25:00 - 27:30] Console admin

**Action:** afficher logs systeme en direct.

**Dire:**
"Chaque action importante est tracable: essentiel pour audit, maintenance et diagnostic."

## [27:30 - 30:00] Mode panique + analytics

**Action:** declencher mode panique puis montrer stats/consommation.

**Dire:**
"Le systeme combine securite immediate et pilotage energitique sur la duree."

---

## 7) Script minute par minute - Segment 3 (Q/R, 15 min)

## [30:00 - 33:00] Questions architecture

Repondre court, structure:

- Contexte,
- Choix,
- Trade-off,
- Resultat.

## [33:00 - 36:00] Questions securite

Toujours citer:

- controle d acces,
- verification identite,
- journalisation,
- plan de reprise.

## [36:00 - 39:00] Questions scalabilite

Expliquer:

- ajout progressif des noeuds,
- separation des couches,
- migration possible de persistence si besoin.

## [39:00 - 43:00] Questions cout / industrialisation

Donner un angle concret:

- cout d entree,
- maintenance,
- simplicite de deploiement local.

## [43:00 - 45:00] Cloture

"OVYON est deja fonctionnel, mesurable et defendable techniquement. La suite est l industrialisation et le deploiement a echelle terrain."

---

## 8) Banque de questions jury (avec reponses pretes)

## Q1. Pourquoi pas un cloud complet?

**R:** Parce que la disponibilite reseau n est pas garantie partout. Le cloud peut enrichir, mais le coeur doit rester local pour la continuite de service.

## Q2. Pourquoi SQLite et pas PostgreSQL?

**R:** SQLite est adapte au contexte mono-instance local, simple a deployer, faible empreinte, excellent pour la soutenance et le terrain domestique.

## Q3. Que se passe-t-il si Gemini est indisponible?

**R:** Le systeme degrade proprement vers les commandes locales regex. Les fonctions essentielles restent operationnelles.

## Q4. Comment gerer un conflit automation vs commande manuelle?

**R:** Priorite a l action humaine immediate. Les regles automatiques ne doivent pas annuler une commande explicite utilisateur.

## Q5. Comment securisez-vous l acces sensible?

**R:** Verification biometrie pour actions critiques + trace dans logs admin + separation claire commande/etat.

## Q6. Quel est le principal risque actuel?

**R:** Dependance partielle au reseau pour les fonctions semantiques cloud. Mitigee par le mode local et plan de reprise.

## Q7. Comment passer a l echelle?

**R:** Standardiser les topics MQTT, versionner les contrats de messages, et introduire un stockage plus robuste si volume multi-sites.

---

## 9) Gestion des incidents en direct (playbook)

| Incident          | Signal visible           | Reponse orale immediate                                                | Action concrete                        |
| ----------------- | ------------------------ | ---------------------------------------------------------------------- | -------------------------------------- |
| IA cloud lente    | latence reponse vocale   | "Je bascule sur mode local pour montrer la resilience."                | lancer commande locale                 |
| Device offline    | pas de reaction maquette | "Le monitoring l a detecte, je montre la reprise."                     | relancer device ou fallback autre node |
| Biometrie refusee | echec auth               | "Comportement normal en mode securise, je passe en procedure secours." | code secours/demo alternative          |
| UI figee          | freeze temporaire        | "Je redemarre le module interface, la couche backend reste active."    | refresh app, conserver backend         |
| Reseau coupe      | pertes cloud             | "Le coeur local continue."                                             | hotspot / mode local                   |

Regle d or:

- ne jamais paniquer,
- expliquer calmement,
- transformer l incident en preuve de robustesse.

---

## 10) Checklist technique finale (pre-scene)

## 10.1 Logiciel

- Frontend: build OK, lint OK, tests OK.
- Backend: build OK, tests OK.
- AI: syntaxe Python OK.
- Script de verification pret: `scripts/verify-soutenance.ps1`.

## 10.2 Materiel

- ESP32 alimentes,
- maquette testee,
- smartphone charge,
- cable HDMI + adaptateur + rallonge.

## 10.3 Reseau

- Wi-Fi principal valide,
- hotspot de secours pret,
- DNS stable,
- mode local testable sans internet.

## 10.4 Contenu

- slides ordonnees,
- demo video plan B,
- captures d ecran plan C,
- fiche Q/R imprimee.

---

## 11) Checklist posture et prise de parole

- Parler en blocs courts de 20 a 40 secondes.
- Une idee forte par slide.
- Eviter jargon inutile; expliquer valeur avant details.
- Si question piege:
  1. reformuler,
  2. donner fait verifiable,
  3. reconnaitre limite,
  4. proposer evolution.

Formule utile:
"Aujourd hui, voici ce qui est implemente et valide. Voici ce qui est prevu en extension."

---

## 12) Grille d auto-evaluation avant passage

Note chaque axe de 0 a 5:

- Clarte du probleme,
- Pertinence architecture,
- Qualite demonstration,
- Maitrise incidents,
- Qualite defense Q/R,
- Gestion du temps,
- Impact final.

Si un axe < 4:

- refaire repetition ciblee 20 min sur cet axe.

---

## 13) Mini script de cloture (memoriser)

"OVYON Control apporte une reponse realiste a un besoin local: automatiser, securiser et piloter la maison avec des contraintes terrain reelles. L architecture est deja fonctionnelle, testee et defendable. La prochaine etape est le passage a une industrialisation modulaire et deploiement multi-sites. Merci."

---

## 14) Annexes utiles

## 14.1 Commandes de verification (poste dev)

```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-soutenance.ps1 -SkipFirmware
```

Avec firmware (si `arduino-cli` + core ESP32 installes):

```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify-soutenance.ps1
```

## 14.2 Sequence de demo conseillee (ordre exact)

1. Ouverture app
2. Controle lumiere
3. Commande vocale locale
4. Commande vocale semantique
5. Appairage
6. Biometrie
7. Logs admin
8. Mode panique
9. Analytics

---

## 15) Verdict de preparation

Tu es pret si et seulement si:

- tu peux finir ta demo complete en 15 min sans hesiter,
- tu peux repondre a 10 questions techniques sans lire,
- tu peux encaisser 2 incidents consecutifs sans perdre le fil narratif.

**Objectif soutenance:** convaincre que OVYON est deja un systeme operationnel, et pas une simple idee.
