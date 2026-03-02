# MEMOIRE DE FIN DE CYCLE (LICENCE 3)
## Conception d un ecosysteme domotique localise a faible consommation base sur une application mobile, des objets connectes NFC/Bluetooth et une IA vocale embarquee

> Version de travail en Markdown  
> Projet: OVYON CONTROL  
> Auteur: [TON NOM COMPLET]  
> Encadreur: [NOM ENCADREUR]  
> Etablissement: [NOM UNIVERSITE / ECOLE]  
> Annee academique: [2026-2027]

---

## CONSIGNES DE COMPLETION (A LIRE AVANT)

Ce document est un memoire complet pret a etre personnalise.

Avant depot final:
1. Remplacer tous les champs `[ ... ]`.
2. Inserer les figures aux emplacements `PLACEHOLDER IMAGE`.
3. Ajouter tes donnees reelles (mesures, logs, captures, tableaux).
4. Harmoniser la bibliographie selon les exigences de ton ecole.
5. Exporter vers DOCX/PDF pour mise en page finale.

Style de citation choisi ici: **IEEE simplifie** (`[1]`, `[2]`, etc.).  
Si ton ecole impose APA, on convertira en fin de redaction.

---

## PAGE DE GARDE (MODELE)

**REPUBLIQUE [PAYS]**  
**MINISTERE DE [ ... ]**  
**UNIVERSITE [ ... ]**  
**FACULTE / UFR [ ... ]**  
**DEPARTEMENT [ ... ]**

### MEMOIRE DE FIN DE CYCLE
Presente en vue de l obtention de la Licence 3 en [Filiere]

### THEME
**Conception d un ecosysteme domotique localise a faible consommation base sur une application mobile, des objets connectes NFC/Bluetooth et une IA vocale embarquee**

Presente par: **[TON NOM]**  
Sous la direction de: **[NOM ENCADREUR]**  
Date de soutenance: **[JJ/MM/AAAA]**

---

## DEDICACE
[Texte personnel]

## REMERCIEMENTS
[Texte personnel]

## LISTE DES ABREVIATIONS
- API: Application Programming Interface
- BLE: Bluetooth Low Energy
- CPU: Central Processing Unit
- ESP32: Microcontroleur Wi-Fi/Bluetooth
- IA: Intelligence Artificielle
- IoT: Internet of Things
- JSON: JavaScript Object Notation
- MQTT: Message Queuing Telemetry Transport
- NFC: Near Field Communication
- PWA: Progressive Web App
- QoS: Quality of Service
- UI/UX: User Interface / User Experience

## LISTE DES FIGURES
[A generer apres insertion des images]

## LISTE DES TABLEAUX
[A generer apres insertion des tableaux]

---

# RESUME (FR)

La domotique moderne reste souvent inaccessible dans plusieurs contextes locaux en raison de trois obstacles majeurs: le cout d acquisition, la dependance a une connectivite internet stable et la faible adaptation linguistique/culturelle. Ce memoire presente OVYON CONTROL, un ecosysteme domotique localise, a faible consommation energetique, combinant une application mobile, des objets connectes bases sur ESP32, une communication MQTT et une couche d intelligence vocale embarquee.

L approche proposee adopte une architecture hybride orientee robustesse: un backend local pour la persistence et l orchestration, un frontend mobile-first pour l interaction utilisateur, des noeuds firmware specialises (eclairage, porte, fenetre, prises, environnement) et une IA vocale multi-mode (local + cloud) pour les commandes naturelles. Le systeme privilegie le fonctionnement local pour garantir la continuite de service meme en mode reseau degrade.

Les resultats montrent la faisabilite technique d une solution domotique coherente, modulaire et defendable dans un cadre de Licence 3, avec des performances satisfaisantes en latence de commande, stabilite fonctionnelle et observabilite (logs, etats MQTT, retours d execution). Le projet ouvre des perspectives concretes vers l industrialisation progressive, l amelioration de la securite et l extension vers des cas d usage de smart building.

**Mots-cles:** domotique, MQTT, ESP32, NFC, Bluetooth, IA vocale, faible consommation, application mobile, systeme embarque.

---

# ABSTRACT (EN)

Smart home systems remain difficult to adopt in many local contexts due to high cost, unstable connectivity, and limited cultural/language adaptation. This thesis presents OVYON CONTROL, a localized low-power home automation ecosystem combining a mobile application, ESP32-based connected objects, MQTT communication, and an embedded voice AI layer.

The proposed architecture is hybrid and resilience-oriented: a local backend for persistence and orchestration, a mobile-first frontend, specialized firmware nodes (lights, door, window, plugs, environment), and a dual-mode voice AI pipeline (local + cloud) for natural language control. Local-first execution ensures service continuity in degraded network conditions.

Results demonstrate the technical feasibility of a coherent and modular smart-home solution, suitable for a Bachelor-level thesis, with acceptable command latency, functional stability, and strong observability (logs, MQTT states, execution feedback). The project provides a practical path toward incremental industrialization, stronger security, and smart-building expansion.

**Keywords:** home automation, MQTT, ESP32, NFC, Bluetooth, voice AI, low-power systems, mobile app, embedded systems.

---

# TABLE DES MATIERES (PROPOSEE)
1. Introduction generale  
2. Etat de l art et fondements techniques  
3. Analyse des besoins et cahier des charges  
4. Conception de la solution OVYON CONTROL  
5. Realisation technique  
6. Tests, validation et discussion  
7. Limites, risques et perspectives  
8. Conclusion generale  
9. Bibliographie  
10. Annexes

---

# 1. INTRODUCTION GENERALE

## 1.1 Contexte
L evolution rapide des technologies IoT a permis l emergence de solutions domotiques de plus en plus riches: controle a distance, automatisation, securite, analyse de consommation et interaction vocale. Cependant, ces solutions sont souvent concues pour des environnements techniques et economiques differents de ceux rencontres localement. Le deploiement de ces plateformes dans des contextes a ressources contraintes revele des problemes de cout, d interop, de maintenance et de disponibilite.

Dans ce cadre, la conception d une solution locale et progressive constitue un enjeu academique et pratique important. Le projet OVYON CONTROL vise a proposer une architecture realistement deployable, techniquement coherente et pedagogiquement defendable.

## 1.2 Problematique
Comment concevoir un ecosysteme domotique:
- localement operationnel,
- energetiquement sobre,
- multi-interface (mobile, capteurs, actionneurs, voix),
- adaptable a des contraintes reseau variables,
tout en conservant une complexite raisonnable pour un projet de Licence 3?

## 1.3 Objectif general
Concevoir et valider un prototype fonctionnel de domotique localisee a faible consommation integrant application mobile, objets connectes NFC/Bluetooth et IA vocale embarquee.

## 1.4 Objectifs specifiques
1. Definir une architecture modulaire separant interface, orchestration, communication et controle embarque.
2. Mettre en oeuvre un bus de communication IoT leger base sur MQTT.
3. Developper des noeuds firmware specialises pour les fonctions domestiques principales.
4. Implementer une couche IA vocale capable de traiter commandes simples et requetes contextuelles.
5. Construire un dispositif de test/validation (simulation + maquette + logs).
6. Evaluer la faisabilite, les limites et les perspectives d extension.

## 1.5 Hypotheses de travail
- H1: Une architecture local-first reduit la dependance reseau sans degrader la fonctionnalite essentielle.
- H2: MQTT + ESP32 constitue un compromis pertinent cout/performance pour la domotique de petite echelle.
- H3: Une IA vocale hybride (local + cloud) ameliore l experience utilisateur tout en preservant la resilience.

## 1.6 Methodologie
La demarche retenue suit un cycle ingenierie:
1. Revue documentaire et benchmark.
2. Definition des besoins et contraintes.
3. Conception architecturale.
4. Implementation incrementale par modules.
5. Integration et validation.
6. Analyse critique.

## 1.7 Interet scientifique et pratique
Le memoire apporte:
- une methode de conception orientee contraintes locales,
- un cas concret d integration full-stack + embarque + IA,
- des artefacts reproductibles (guides, scripts, protocoles de test).

## 1.8 Plan du memoire
Le chapitre 2 couvre les fondements.  
Le chapitre 3 formalise les besoins.  
Le chapitre 4 detaille la conception.  
Le chapitre 5 presente la realisation.  
Le chapitre 6 expose les tests/resultats.  
Le chapitre 7 discute limites et perspectives.  
Le chapitre 8 conclut.

> PLACEHOLDER IMAGE 1 - "Carte conceptuelle du projet OVYON"  
> Description attendue: schema global montrant les couches (mobile, backend, MQTT, firmware, IA) et les flux principaux.  
> Conseils insertion: image pleine largeur, legende claire, numerotation "Figure 1.1".

---

# 2. ETAT DE L ART ET FONDEMENTS TECHNIQUES

## 2.1 Domotique: panorama general
Les systemes domotiques contemporains combinent detection (capteurs), action (relais/servos), intelligence (regles/IA), communication (protocoles IoT) et supervision (applications web/mobile). Les approches proprietaires dominent encore le marche, mais limitent souvent la personnalisation et l interop.

## 2.2 Protocoles de communication en IoT domestique

### 2.2.1 MQTT
MQTT est un protocole publish/subscribe leger, adapte aux environnements a bande passante limitee. Ses avantages:
- overhead reduit,
- decouplage producteur/consommateur,
- retention des messages,
- QoS configurable.

Limites:
- besoin d un broker central,
- securite a renforcer (auth, TLS) selon contexte.

### 2.2.2 BLE et NFC
BLE permet appairage et detection courte portee a faible consommation.  
NFC facilite des interactions rapides (tap-to-pair, identification locale).

### 2.2.3 Wi-Fi local
Le Wi-Fi reste pratique pour l integration directe avec un backend local, mais sa stabilite varie selon environnement et charge reseau.

## 2.3 IA vocale dans la domotique
L IA vocale apporte:
- naturalite de commande,
- reduction de friction UX,
- accessibilite potentielle.

Deux strategies:
1. Full cloud: grande richesse semantique, mais dependance internet.
2. Hybride local-cloud: commandes essentielles localement, enrichissement cloud.

La seconde est retenue dans OVYON.

## 2.4 Faible consommation et architectures embarquees
La consommation energetique depend:
- frequence de publication,
- cycles actifs du microcontroleur,
- type d actionneur,
- efficacite alimentation.

Une architecture par noeuds specialises peut optimiser la consommation et la maintenabilite.

## 2.5 Travaux comparables
[A completer selon tes sources reelles]
- Solutions commerciales domotiques cloud-first.
- Projets acadmiques IoT local-first.
- Etudes sur MQTT en environnements contraints.

## 2.6 Synthese critique
La litterature confirme la pertinence d une architecture locale, modulaire et orientee resilience, surtout dans des contextes ou l infrastructure reseau et les contraintes economiques restent fluctuantes.

> PLACEHOLDER IMAGE 2 - "Comparatif protocoles IoT (MQTT vs HTTP vs BLE)"  
> Description attendue: tableau/graphique comparant latence, overhead, consommation, complexite de deploiement.  
> Conseils insertion: figure en demi-page + tableau de synthese.

> PLACEHOLDER IMAGE 3 - "Workflow IA vocale hybride"  
> Description attendue: diagramme decisionnel local regex -> fallback cloud -> action MQTT -> retour utilisateur.  
> Conseils insertion: presenter en bloc etape par etape.

---

# 3. ANALYSE DES BESOINS ET CAHIER DES CHARGES

## 3.1 Parties prenantes
- Utilisateur final (habitant)
- Administrateur local
- Encadreur/enseignant (validation academique)
- Technicien de maintenance

## 3.2 Besoins fonctionnels
1. Commander eclairage, porte, fenetre, prises.
2. Afficher etat instantane des equipements.
3. Enregistrer les evenements systeme.
4. Permettre commandes vocales.
5. Supporter appairage local (BLE/NFC logique).
6. Proposer mode panique.

## 3.3 Besoins non fonctionnels
- Disponibilite locale en priorite.
- Faible latence de commande.
- Faible consommation.
- Simplicite d usage.
- Traçabilite minimale via logs.

## 3.4 Contraintes
- Budget materiel limite.
- Delai de realisation academique.
- Heterogeneite des composants.
- Variabilite reseau.

## 3.5 Cas d usage principaux
UC1: allumer/eteindre une zone d eclairage  
UC2: ouvrir/fermer porte  
UC3: regler position fenetre  
UC4: activer/desactiver prise  
UC5: lancer mode panique  
UC6: executer commande vocale  
UC7: consulter logs/admin

## 3.6 Critere d acceptation
- Chaque commande doit produire un retour d etat explicite.
- Le systeme doit rester operable localement sans cloud.
- Les noeuds doivent se reconnecter automatiquement au broker.

## 3.7 Matrice exigences -> composants
[Tableau a inserer]
- Exigence, composant responsable, preuve de test.

> PLACEHOLDER IMAGE 4 - "Diagramme de cas d usage UML"  
> Description attendue: acteurs + UC1..UC7.  
> Conseils insertion: 1 page, legende propre.

> PLACEHOLDER IMAGE 5 - "Matrice exigences-composants"  
> Description attendue: capture tableau excel/markdown proprement formate.

---

# 4. CONCEPTION DE LA SOLUTION OVYON CONTROL

## 4.1 Vue d ensemble
La solution est decomposée en cinq sous-systemes:
1. Frontend mobile-first
2. Backend API + services
3. Broker MQTT
4. Firmware noeuds ESP32
5. IA vocale (bridge + proactive brain)

## 4.2 Architecture logique
- Frontend envoie actions utilisateur.
- Backend orchestre et expose API.
- MQTT route commandes vers noeuds.
- Noeuds publient etats et telemetry.
- IA consomme contexte et produit commandes/suggestions.

## 4.3 Architecture physique
- Machine hote: backend + frontend + scripts IA
- Reseau local: broker MQTT + noeuds
- Maquette physique: actionneurs/capteurs

## 4.4 Conception des topics MQTT
Convention proposee:
- `ovyon/control/<device>/<id>/<action>`
- `ovyon/status/<device>/<id>`

Exemples:
- `ovyon/control/lights/salon/power`
- `ovyon/control/door/main/action`
- `ovyon/status/sensor/env`

## 4.5 Modele de donnees
Principales entites:
- DeviceState
- AutomationRule
- VoiceCommandHistory
- AdminLogEntry

Stockage local SQLite:
- table devices
- table rules
- (option) table logs persistants

## 4.6 Strategie de securite
Niveau prototype:
- authentification mqtt user/password
- controle des actions sensibles
- journalisation des evenements

Evolutions recommandees:
- TLS MQTT
- rotation secrets
- RBAC admin

## 4.7 Strategie de resilence
- reconnexion automatique des clients MQTT
- retention des statuts critiques
- fallback vocal local si cloud indisponible

## 4.8 Conception UX
Principes:
- commandes directes en 1-2 interactions
- feedback immediat (toast, etat, logs)
- ecrans separes (dashboard, voix, admin, analytics)

> PLACEHOLDER IMAGE 6 - "Diagramme architecture logique complet"  
> Description attendue: boites + fleches (frontend/backend/mqtt/firmware/ia).  
> Conseils insertion: format paysage, resolution elevee.

> PLACEHOLDER IMAGE 7 - "Schema topics MQTT"  
> Description attendue: arbre de namespaces + exemples message payload.

> PLACEHOLDER IMAGE 8 - "MCD simplifie ou schema SQLite"  
> Description attendue: tables + champs + relations.

---

# 5. REALISATION TECHNIQUE

## 5.1 Environnement de developpement
- OS: [Windows/Linux]
- Node.js + npm
- Python 3.10+
- Arduino IDE / arduino-cli
- Proteus pour pre-simulation

## 5.2 Frontend
Stack:
- React + TypeScript + Vite
- gestion d etat (store)
- pages: dashboard, voice, settings, admin, analytics

Fonctions cle:
- commandes equipements
- visualisation etats
- logs et actions admin
- onboarding/pairing UI

## 5.3 Backend
Stack:
- Node.js + TypeScript
- API REST
- broker MQTT (Aedes)
- SQLite

Responsabilites:
- stockage etat/regles
- exposition endpoints
- supervision et logs
- couche system test

## 5.4 Firmware ESP32
Noeuds implementes:
- Lights (PWM + status)
- Door (servo open/close)
- Window (position 0..100)
- Plugs (2 canaux + consommation simulee)
- Environment (temp/humidity)

Points techniques:
- reconnection mqtt
- publication periodique status
- mapping topic -> actionneur

## 5.5 IA voice
Composants:
- `aion.py`: bridge commandes vocales
- `aion_brain.py`: suggestions proactives

Mode hybride:
- moteur local regex
- couche LLM externe pour intentions complexes

## 5.6 Simulation Proteus
Avant maquette reelle:
- sketch simulation dedie
- validation cablage logique
- validation commandes via terminal virtuel

## 5.7 Scripts de verification
- script global verification software
- compilation firmware multi-noeuds

> PLACEHOLDER IMAGE 9 - "Capture ecran frontend dashboard"  
> Description attendue: etats devices + commandes visibles.

> PLACEHOLDER IMAGE 10 - "Capture console backend + broker MQTT"  
> Description attendue: logs demarrage, connexions clients, events.

> PLACEHOLDER IMAGE 11 - "Capture serial monitor firmware"  
> Description attendue: Wi-Fi connected, MQTT connected, status heartbeat.

> PLACEHOLDER IMAGE 12 - "Capture Proteus schema complet"  
> Description attendue: carte, LEDs, servos, terminal, labels pins.

> PLACEHOLDER IMAGE 13 - "Capture terminal Proteus avec commandes STATUS"  
> Description attendue: demonstration texte de la boucle commande->etat.

---

# 6. TESTS, VALIDATION ET DISCUSSION

## 6.1 Strategie de test
Tests par niveaux:
1. Unitaires/interface
2. Integration backend
3. Validation firmware par compilation
4. Scenarios end-to-end

## 6.2 Plan de tests fonctionnels
[Tableau a completer]
- ID test
- preconditions
- action
- resultat attendu
- resultat observe
- statut

Exemples:
- T01: allumer salon depuis UI
- T02: ouvrir porte via commande vocale
- T03: mode panique verrouille et eteint
- T04: perte cloud IA mais commandes locales OK

## 6.3 Indicateurs proposes
- latence commande -> action
- taux de succes commandes
- stabilite session (temps sans panne)
- delai reconnexion mqtt

## 6.4 Resultats obtenus
[A remplir avec tes mesures reelles]
- Exemple: latence moyenne commande locale [X ms]
- Exemple: reconnexion mqtt [Y s]
- Exemple: succes scenarios core [Z%]

## 6.5 Analyse critique
Forces:
- architecture modulaire
- local-first operationnel
- demonstrateur complet firmware+software+IA

Faiblesses:
- securite transport non finalisee (TLS)
- dependance partielle cloud pour semantique avancee
- instrumentation energetique encore partiellement simulee

## 6.6 Menaces a la validite
- environnement de test controle
- heterogeneite materielle possible
- variabilite reseau non exhaustive

> PLACEHOLDER IMAGE 14 - "Courbe latence par scenario"  
> Description attendue: graphe barres comparant local vs cloud.

> PLACEHOLDER IMAGE 15 - "Tableau resultats de tests"  
> Description attendue: table claire PASS/FAIL par cas.

---

# 7. LIMITES, RISQUES ET PERSPECTIVES

## 7.1 Limites actuelles
1. Couverture fonctionnelle orientee prototype de soutenance.
2. Hardening securite non complet.
3. Industrialisation hardware non engagee a grande echelle.

## 7.2 Risques projet
- indisponibilite reseau externe
- derive de complexite
- fiabilite mecanique de la maquette

## 7.3 Plan de mitigation
- fallback local
- decoupage modulaire
- plan de demo multi-niveaux (hardware, simulation, video)

## 7.4 Perspectives court terme (1-3 mois)
- stabilisation protocole de messages
- securisation secrets/config
- ajout dashboards metriques

## 7.5 Perspectives moyen terme (3-12 mois)
- pipeline CI/CD embarque + software
- multi-site / multi-maison
- modele IA local plus autonome

## 7.6 Perspectives long terme
- integration smart building
- supervision centralisee
- standardisation deploiement terrain

> PLACEHOLDER IMAGE 16 - "Roadmap evolutive OVYON (court/moyen/long terme)"  
> Description attendue: timeline claire avec jalons techniques.

---

# 8. CONCLUSION GENERALE

Ce memoire a presente la conception et la validation d un ecosysteme domotique localise, a faible consommation, integrant application mobile, objets connectes et IA vocale. L apport principal du travail reside dans l integration coherente de couches heterogenes au sein d une architecture orientee robustesse locale.

Les objectifs de base ont ete atteints: definition d une architecture modulaire, implementation des fonctions domotiques principales, mise en oeuvre d un bus MQTT, integration d une couche vocale hybride et production d un cadre de test reproductible.

Au-dela du prototype, la demarche proposee demontre qu un projet de Licence 3 peut rester academiquement conforme tout en explorant des technologies actuelles, a condition de maintenir une rigueur de conception, de validation et de documentation.

Le travail ouvre enfin des perspectives concretes vers l industrialisation progressive et l adaptation de la domotique a des besoins locaux reels.

---

# 9. BIBLIOGRAPHIE (IEEE - VERSION DEPOT, 30 REFERENCES)

[1] A. Banks and R. Gupta, "MQTT Version 3.1.1," OASIS Standard, Dec. 2014.  
[2] A. Banks, E. Briggs, K. Borgendale, and R. Gupta, "MQTT Version 5.0," OASIS Standard, Mar. 2019.  
[3] Bluetooth SIG, "Bluetooth Core Specification v5.4," 2023.  
[4] NFC Forum, "NFC Data Exchange Format (NDEF) Technical Specification," 2023.  
[5] ISO/IEC 18092:2013, "Information technology - Telecommunications and information exchange between systems - Near Field Communication - Interface and Protocol (NFCIP-1)."  
[6] IEEE Std 802.11-2020, "IEEE Standard for Information Technology - Telecommunications and information exchange between systems Local and metropolitan area networks - Specific requirements - Part 11."  
[7] Espressif Systems, "ESP32 Technical Reference Manual," documentation en ligne, consulte le 2 mars 2026.  
[8] Espressif Systems, "ESP-IDF Programming Guide," documentation en ligne, consulte le 2 mars 2026.  
[9] Arduino, "Arduino CLI Documentation," documentation en ligne, consulte le 2 mars 2026.  
[10] Eclipse Foundation, "Eclipse Mosquitto Documentation," documentation en ligne, consulte le 2 mars 2026.  
[11] Node.js Foundation, "Node.js Documentation," documentation en ligne, consulte le 2 mars 2026.  
[12] React Team, "React Documentation," documentation en ligne, consulte le 2 mars 2026.  
[13] Vite Team, "Vite Documentation," documentation en ligne, consulte le 2 mars 2026.  
[14] TypeScript Team, "TypeScript Handbook," documentation en ligne, consulte le 2 mars 2026.  
[15] Python Software Foundation, "Python 3 Documentation," documentation en ligne, consulte le 2 mars 2026.  
[16] OpenAI, "OpenAI API Platform Documentation," documentation en ligne, consulte le 2 mars 2026.  
[17] OpenRouter, "OpenRouter API Documentation," documentation en ligne, consulte le 2 mars 2026.  
[18] SQLite Consortium, "SQLite Documentation," documentation en ligne, consulte le 2 mars 2026.  
[19] OWASP Foundation, "OWASP Application Security Verification Standard 4.0.3," 2021.  
[20] OWASP Foundation, "OWASP Internet of Things Project - IoT Top 10," 2018.  
[21] NIST, "NISTIR 8259A: IoT Device Cybersecurity Capability Core Baseline," 2020.  
[22] NIST, "SP 800-82 Rev. 3: Guide to Operational Technology (OT) Security," 2023.  
[23] ISO/IEC/IEEE 29148:2018, "Systems and software engineering - Life cycle processes - Requirements engineering."  
[24] ISO/IEC 25010:2011, "Systems and software engineering - Systems and software Quality Requirements and Evaluation (SQuaRE) - System and software quality models."  
[25] R. S. Pressman and B. R. Maxim, *Software Engineering: A Practitioner's Approach*, 9th ed., McGraw-Hill, 2019.  
[26] I. Sommerville, *Software Engineering*, 10th ed., Pearson, 2015.  
[27] M. Kleppmann, *Designing Data-Intensive Applications*, O'Reilly Media, 2017.  
[28] R. C. Martin, *Clean Architecture: A Craftsman's Guide to Software Structure and Design*, Pearson, 2017.  
[29] A. S. Tanenbaum and N. Herbert Bos, *Modern Operating Systems*, 5th ed., Pearson, 2022.  
[30] L. Atzori, A. Iera, and G. Morabito, "The Internet of Things: A Survey," *Computer Networks*, vol. 54, no. 15, pp. 2787-2805, 2010.

---

# 10. ANNEXES

## Annexe A - Bill of Materials (BOM)
Inclure version finale:
- composants electroniques
- quantites
- couts
- fournisseurs

## Annexe B - Guides techniques
- guide hardware/firmware
- guide simulation Proteus
- memo cablage 1 page

## Annexe C - Extraits de code
- topics MQTT
- scripts IA voice
- fonctions critiques backend

## Annexe D - Protocoles de test
- scenarios
- checks
- resultats

## Annexe E - Captures complementaires
- UI
- logs
- traces de tests

> PLACEHOLDER IMAGE 17 - "Photo maquette physique finale"  
> Description attendue: vue globale avec etiquettes des zones (lights, door, window, plugs, env).

> PLACEHOLDER IMAGE 18 - "Plan de cablage simplifie final"  
> Description attendue: schema annote, pins utilises, alimentation/GND commun.

---

## CHECKLIST FINALE AVANT DEPOT
- [ ] Tous les placeholders `[ ... ]` remplaces
- [ ] Toutes les figures numerotees et commentees
- [ ] Tables des figures/tableaux regenerees
- [ ] Bibliographie mise au propre
- [ ] Orthographe/grammaire relues
- [ ] Cohesion entre objectifs, resultats, conclusion
- [ ] Version PDF exportee sans erreurs de mise en page

---

## CONSEIL METHODOLOGIQUE (1 MOIS RESTANT)
Semaine 1:
- finaliser chapitre 1-3
- collecter toutes captures et mesures

Semaine 2:
- finaliser chapitre 4-5
- remplir tableaux de resultats

Semaine 3:
- finaliser chapitre 6-8 + bibliographie
- relecture technique

Semaine 4:
- correction forme
- repetition soutenance
- depot version finale

---

# 11. VERSION REDACTIONNELLE ETENDUE (POUR ATTEINDRE 60-75 PAGES)

Cette section te sert de base longue pour passer d un bon memoire technique a un memoire academique complet.  
Tu peux repartir ce contenu dans les chapitres 1 a 8 selon le plan de ton ecole.

## 11.1 Trame detaillee d introduction (3 a 5 pages)

### 11.1.1 Contexte socio-technique local
La transformation numerique des habitats accelere dans les environnements urbains et periurbains, mais les solutions grand public restent souvent pensees pour des contextes disposant d une connectivite stable, d un pouvoir d achat eleve et d un support technique permanent. Dans de nombreux contextes locaux, ces preconditions ne sont pas garanties. La consequence directe est un decalage entre le potentiel de la domotique et son adoption reelle.

Dans ce cadre, une solution domotique doit etre abordee non comme un simple produit technologique, mais comme un systeme socio-technique: elle doit respecter les contraintes d usage, de maintenance, de cout, de disponibilite energetique et de robustesse operationnelle. OVYON CONTROL se positionne dans cette logique pragmatique: fournir un systeme utile, evolutif et defendable dans un contexte reel.

### 11.1.2 Justification academique du sujet
Le sujet est academiquement pertinent pour trois raisons:
1. Il mobilise une integration multi-disciplinaire: logiciel, systemes embarques, reseau IoT, IA vocale, ergonomie.
2. Il traite explicitement des compromis d ingenierie: robustesse vs complexite, local vs cloud, cout vs performance.
3. Il produit des artefacts reproductibles: code source, scripts de verification, protocoles de test, guides de construction.

### 11.1.3 Probleme scientifique simplifie
Le probleme central peut se formuler ainsi: comment concevoir une architecture domotique local-first, faible consommation, qui conserve une qualite d interaction elevee (dont la voix) sans imposer une dependance excessive a des services cloud externes?

> PLACEHOLDER IMAGE 19 - "Carte des contraintes du projet"  
> Description attendue: diagramme radial montrant cout, energie, latence, maintenabilite, securite, ergonomie.

## 11.2 Trame detaillee Etat de l art (8 a 12 pages)

### 11.2.1 Taxonomie des architectures domotiques
Tu peux structurer la revue selon 4 familles:
1. Architectures cloud-centric (toutes decisions externalisees).
2. Architectures gateway-centric (intelligence locale centralisee).
3. Architectures edge distribuees (logique repartie sur les noeuds).
4. Architectures hybrides (mix local/cloud selon criticite des fonctions).

Pour chaque famille, compare:
- latence de commande
- disponibilite hors internet
- cout de deploiement
- facilite de maintenance
- surface d attaque securite.

### 11.2.2 Positionnement MQTT face aux alternatives
Propose une comparaison critique MQTT vs HTTP polling vs WebSocket direct vs CoAP:
- MQTT: faible overhead, pub/sub naturel, bonne adaptation IoT.
- HTTP polling: simple a demarrer, mauvais en efficacite temps reel.
- WebSocket: bon temps reel, mais orchestration plus lourde cote embarque.
- CoAP: interessant pour ultra low-power, ecosysteme moins courant.

### 11.2.3 BLE/NFC comme couche d interaction proximite
Explique les cas d usage typiques:
- BLE pour decouverte et appairage progressif.
- NFC pour action explicite courte portee (badge, activation contextuelle, profil utilisateur).

Tu peux introduire la notion de "double preuve de proximite":
1. Presence radio BLE.
2. Action volontaire NFC.
Cette combinaison renforce la securite d interaction locale.

### 11.2.4 IA vocale embarquee: limites et opportunites
Discute clairement:
- avantages UX (mains libres, accessibilite)
- limites techniques (bruit, ambiguite linguistique, ressources)
- limites de confidentialite (transmission audio vers cloud).

Puis justifie la strategie hybride:
- intents critiques localement (allumer, eteindre, ouvrir, fermer)
- intents complexes en cloud (requetes conversationnelles, reformulation).

> PLACEHOLDER IMAGE 20 - "Comparatif protocoles et architectures"  
> Description attendue: tableau synthese avec notation (1 a 5) par critere.

## 11.3 Trame detaillee Analyse des besoins (6 a 8 pages)

### 11.3.1 Personas et scenarios d usage
Ajoute 3 personas minimaux:
1. Utilisateur domestique standard (simplicite prioritaire).
2. Utilisateur avance (personnalisation et logs).
3. Technicien de maintenance (diagnostic et reprise incident).

Pour chaque persona, decris:
- objectifs
- frustrations
- niveau technique
- contraintes d usage.

### 11.3.2 Exigences fonctionnelles formalisees
Tu peux convertir les besoins en exigences testables:
- EXG-F-01: Le systeme doit permettre le pilotage des eclairages en moins de [X] ms en LAN.
- EXG-F-02: Le systeme doit conserver l etat des actionneurs apres redemarrage backend.
- EXG-F-03: Le systeme doit journaliser les commandes utilisateur avec horodatage.
- EXG-F-04: Le systeme doit offrir un mode manuel de secours sans IA vocale.

### 11.3.3 Exigences non fonctionnelles mesurables
- Disponibilite locale cible: [ex: >= 99% sur periode de test].
- Temps de reprise apres coupure service: [ex: < 30 s].
- Budget energie par noeud: [ex: < X W en veille].
- Taux de succes commandes vocales: [ex: > 85% en environnement calme].

> PLACEHOLDER IMAGE 21 - "Diagramme de cas d usage UML"  
> Description attendue: acteurs + cas d usage principaux + relations include/extend.

## 11.4 Trame detaillee Conception (10 a 14 pages)

### 11.4.1 Architecture en couches
Detaille explicitement:
1. Couche presentation: frontend (tableaux de bord, etat, commandes).
2. Couche orchestration: backend (regles, synchronisation, API interne).
3. Couche transport: broker MQTT (topics, QoS, retention).
4. Couche edge: firmwares ESP32 (sensing, actuation).
5. Couche intelligence: moteur IA vocale (intent parsing, routage commande).

### 11.4.2 Contrat de communication MQTT
Documente le nommage des topics avec conventions strictes:
- `ovyon/{zone}/{device}/{signal}`
- exemples:
  - `ovyon/salon/light1/cmd`
  - `ovyon/salon/light1/state`
  - `ovyon/security/door/state`

Documente aussi:
- payload JSON type
- codes de retour
- politique de retention
- niveaux QoS utilises et raisons.

### 11.4.3 Modelisation des etats
Pour chaque type d objet (Light, Door, Window, Plug, Environment):
- etats possibles
- transitions autorisees
- evenements declencheurs
- conditions d erreur.

Tu peux ajouter une mini machine a etats par dispositif.

### 11.4.4 Conception securite par couches
Inclure:
- authentification broker/API
- segmentation reseau (VLAN local si possible)
- rotation des secrets
- journalisation securite
- principe du moindre privilege.

### 11.4.5 Conception surete de fonctionnement
Explique les mecanismes de resilience:
- heartbeat peripheriques
- watchdog logiciel
- mode degrade si IA indisponible
- reprise automatique des services critiques.

> PLACEHOLDER IMAGE 22 - "Diagramme de sequence commande vocale -> actionneur"  
> Description attendue: User -> AI -> Backend -> MQTT -> Firmware -> Ack -> UI.

> PLACEHOLDER IMAGE 23 - "Machine a etats porte connectee"  
> Description attendue: etats Fermee/Ouverte/Transition/Erreur + evenements.

## 11.5 Trame detaillee Realisation (10 a 14 pages)

### 11.5.1 Frontend
Documente:
- arborescence composants
- logique de gestion d etat
- gestion des erreurs reseau
- feedback utilisateur (loading, success, failed).

Ajoute un tableau "Composant / Responsabilite / Entrees / Sorties".

### 11.5.2 Backend
Documente:
- modules (broker handlers, state manager, API, simulateur)
- cycle de vie service
- flux de synchronisation et persistence
- gestion d incidents (timeouts, retries, invalid payload).

Ajoute un schema de sequence pour "commande manuelle depuis UI".

### 11.5.3 Firmware
Documente par noeud:
- brochage utilise
- logique de boucle principale
- politique de publication
- protection anti rebond / anti bruit
- comportement au demarrage et reconnexion.

Ajoute une section "choix techniques contestables et justification":
- pourquoi tel pin
- pourquoi tel delai
- pourquoi telle granularite de telemetrie.

### 11.5.4 IA vocale
Decris:
- pipeline audio/texte
- extraction d intent
- mapping intent -> action
- fallback si ambiguite
- confirmations vocales critiques.

Indique explicitement les limites connues:
- accents
- bruit
- homophonies
- latence cloud.

> PLACEHOLDER IMAGE 24 - "Capture UI tableau de bord etats temps reel"  
> Description attendue: ecran complet avec annotation de chaque widget.

> PLACEHOLDER IMAGE 25 - "Topologie reseau locale du prototype"  
> Description attendue: routeur, backend host, broker, ESP32, smartphone.

## 11.6 Trame detaillee Tests et validation (8 a 12 pages)

### 11.6.1 Protocole experimental
Definis un protocole reproductible:
1. Initialisation environnement.
2. Verification connectivite.
3. Execution des commandes nominales.
4. Injection incidents (perte broker, reboot noeud, latence forcee).
5. Mesure et journalisation.
6. Analyse comparative avec objectifs.

### 11.6.2 Matrice de tests complete
Ajoute pour chaque test:
- ID test
- preconditions
- etapes
- resultat attendu
- resultat obtenu
- statut (PASS/FAIL)
- actions correctives.

### 11.6.3 Mesures quantitatives
Propose et renseigne:
- latence moyenne commande manuelle
- latence moyenne commande vocale
- taux de succes commandes
- temps moyen de reconnexion d un noeud
- consommation approximative par module.

Inclure formule simple si utile:
- `TauxSucces = (NbCommandesReussies / NbCommandesTotales) * 100`.

### 11.6.4 Analyse qualitative
Discute:
- perception utilisateur (simplicite, confiance)
- confort d usage vocal
- clarte des retours d etat
- charge cognitive de configuration.

> PLACEHOLDER IMAGE 26 - "Histogramme latence par type de commande"  
> Description attendue: barres pour manuel, vocal local, vocal cloud.

> PLACEHOLDER IMAGE 27 - "Courbe stabilite sur 24h"  
> Description attendue: disponibilite service + incidents temporels.

## 11.7 Trame detaillee Discussion, limites et perspectives (4 a 6 pages)

### 11.7.1 Discussion des choix d architecture
Reviens explicitement sur les compromis:
- local-first apporte robustesse mais demande plus d ingenierie systeme.
- approche modulaire facilite maintenance mais augmente l effort d integration.
- IA vocale enrichit UX mais ouvre un front de complexite linguistique.

### 11.7.2 Limites reconnues (important pour le jury)
Liste sans les cacher:
- maquette a echelle reduite
- absence de deploiement multi-site
- mesures energie approximatives si pas de wattmetre de precision
- securite non audittee par tiers.

### 11.7.3 Feuille de route realiste
Court terme:
- fiabiliser toutes les suites de verification.
- stabiliser scripts de demo.
Moyen terme:
- tableau de bord maintenance predictive.
- chiffrement bout en bout sur topics sensibles.
Long terme:
- extension smart building (salles, etages, role-based control).

## 11.8 Cadre de citation recommande (IEEE simplifie)

Dans le texte:
- "Selon Banks et Gupta [1], MQTT..."
- "Les specifications BLE indiquent... [3]"

En bibliographie:
- [1] Initiales Nom, "Titre", Organisme/Revue, annee.

Regle pratique:
- Minimum 20 a 35 references pour un memoire 60-75 pages.
- Au moins:
  - 6 sources protocoles/standards
  - 6 sources architectures IoT
  - 4 sources IA vocale/NLP
  - 4 sources embarque/energie
  - 4 sources methodologie/validation.

## 11.9 Placeholders images "pret insertion" (pack complet)

Ajoute les figures suivantes pour une trame visuelle riche:
- Figure A: Vue d ensemble architecture globale.
- Figure B: Cas d usage UML.
- Figure C: Diagramme de sequence commande manuelle.
- Figure D: Diagramme de sequence commande vocale.
- Figure E: Schema electronique par module.
- Figure F: Cablage maquette reel (photo annotee).
- Figure G: Dashboard frontend (ecran principal).
- Figure H: Ecran administration / logs.
- Figure I: Trace MQTT (extrait monitor).
- Figure J: Tableau comparatif avant/apres optimisations.
- Figure K: Resultats tests (latence, stabilite, taux succes).
- Figure L: Roadmap d evolution.

Pour chaque figure, applique ce format:
1. Titre court.
2. Contexte d apparition (dans quel sous-chapitre).
3. Message principal a retenir.
4. Source (capture perso, schema personnel, outil).
5. Legende academique (Figure X.Y - ...).

## 11.10 Planning de redaction (1 mois, objectif soutenable)

### Semaine 1 (fond)
- verrouiller plan definitif avec encadreur.
- ecrire version longue chapitres 1, 2, 3.
- etablir bibliographie initiale (20+ sources).

### Semaine 2 (noyau technique)
- rediger chapitre 4 en profondeur.
- completer chapitre 5 avec traces de code et schemas.
- produire 50% des figures.

### Semaine 3 (preuves)
- finaliser chapitre 6 avec tableaux resultats.
- rediger chapitre 7 et conclusion.
- verifier coherence objectifs/resultats.

### Semaine 4 (finitions)
- relecture complete (forme + fond).
- normaliser citations et bibliographie.
- rehearsal oral basee sur le memoire final.
- export PDF et controle qualite final.

## 11.11 Bloc "pret a prononcer" pour defense methodologique (2-3 min)

Ce memoire assume une demarche d ingenierie pragmatique: partir d un probleme local concret, decomposer le systeme en modules maitrisables, puis valider chaque brique par des preuves observables. Le choix local-first n est pas ideologique; il repond a une contrainte d exploitation reelle. L integration MQTT-ESP32-application-IA vocale est presentee comme une architecture evolutive, pas comme une solution close. Les limites sont explicitees sans les masquer, car elles orientent les travaux futurs. Cette posture, a la fois technique et critique, est au coeur de la valeur academique du projet.

---

# 12. TEXTE INTEGRABLE LONG (MATIERE REDACTIONNELLE SUPPLEMENTAIRE)

Les sous-sections suivantes sont volontairement redigees en style academique "pret a adapter".  
Tu peux les repartir dans les chapitres 2 a 7 pour augmenter la profondeur et le volume.

## 12.1 Enjeux systemiques d une domotique localisee

La domotique n est pas uniquement une question de confort. Elle transforme la relation entre l utilisateur, son habitat et l information contextuelle qui en emerge. Lorsqu un systeme pilote l eclairage, les ouvertures, les prises et la surveillance environnementale, il devient une couche d infrastructure du quotidien. A ce titre, il doit etre concu avec la meme rigueur qu un systeme critique de petite echelle: robustesse operationnelle, lisibilite des etats, recuperabilite apres incident et securite proportionnee.

Dans les approches commerciales dominantes, la valeur est souvent concentree dans la connectivite cloud et les services associes. Ce schema offre des avantages indeniables (mises a jour centralisees, intelligence mutualisee, analyse de donnees), mais il introduit aussi une fragilite structurelle: en cas de coupure internet, panne fournisseur ou changement de politique tarifaire, les fonctionnalites essentielles peuvent etre degradees, voire indisponibles. Dans un contexte d adoption locale, ce risque est percu non comme un inconvenient mineur mais comme un facteur bloquant.

Le positionnement local-first d OVYON CONTROL repond a cet enjeu. L idee directrice consiste a separer les fonctions vitales des fonctions enrichies. Les fonctions vitales (commande on/off, retour d etat, securisation minimale) doivent rester pleinement operationnelles en local. Les fonctions enrichies (interaction conversationnelle complexe, analyses predictives, scenarios multi-criteres avances) peuvent mobiliser des services distants de maniere opportuniste. Cette separation permet de conserver la continuite de service tout en ouvrant la voie a des capacites evolutives.

Un second enjeu systemique concerne la maintenabilite. Un prototype de memoire peut etre juge techniquement brillant mais difficilement maintenable si ses composants sont fortement couples, si les interfaces internes ne sont pas explicites et si la demarche de test n est pas reproductible. La strategie adoptee dans ce travail est d utiliser des modules lisibles et faiblement couples: frontend, backend, transport MQTT, firmwares specialises, moteur IA vocale. Chaque module a une responsabilite claire, ce qui facilite les evolutions, la correction d incidents et la defense technique devant un jury.

Enfin, l enjeu pedagogique est central. Un projet de licence doit trouver un equilibre entre ambition et maitrise. L ambition reside dans l integration multi-domaines; la maitrise reside dans la capacite a prouver, mesurer, expliquer et limiter. Le present memoire assume cette posture: montrer non seulement ce qui fonctionne, mais aussi pourquoi, dans quelles conditions et avec quelles limites.

## 12.2 Justification approfondie des choix technologiques

Le choix d ESP32 comme base materielle principale repose sur un triptyque classique en ingenierie embarquee: disponibilite, polyvalence, cout. L ESP32 offre des capacites Wi-Fi/Bluetooth integrees, un ecosysteme documentaire large et une communautie active. Pour un prototype integrant connectivite, actionneurs et capteurs, cette plateforme fournit un rapport effort/resultat pertinent.

Le choix de MQTT s inscrit dans la logique d un transport evenementiel leger. Contrairement a une architecture basee sur des appels HTTP repetitifs, MQTT permet d exprimer naturellement les interactions domotiques: publication d etats, souscription a des commandes, diffusion d alertes. La semantique publish/subscribe decouple la source et la destination. Ce decouplage est capital pour un systeme evolutif: l ajout d un nouveau client (dashboard, logger, simulateur) ne force pas une rearchitecture complete.

Concernant le backend, l objectif n etait pas de reproduire une plateforme cloud industrielle, mais de construire un coeur orchestration stable, testable et compréhensible. Le backend sert de mediateur entre interfaces utilisateur, flux MQTT, stockage d etats et logique de securite operationnelle. Cette centralite justifie la priorite donnee aux controles de validite, au logging et aux scripts de verification.

Le frontend adopte une logique mobile-first parce que le scenario d usage principal implique des interactions rapides depuis smartphone ou poste leger. En domotique, l utilisateur n ouvre pas une interface pour de longues sessions; il effectue des commandes courtes, consulte un etat, ou verifie une alerte. L ergonomie doit donc privilegier immediatete, lisibilite, et feedback explicite.

Le module IA vocale est introduit comme un accelerateur d usage et non comme une fin en soi. Sa valeur provient de la reduction de friction: parler plutot que naviguer dans plusieurs ecrans pour des actions simples. Toutefois, le memoire insiste sur un point critique: la voix ajoute de l incertitude semantique et de la variabilite de performance. C est pourquoi l architecture conserve un mode manuel complet et un mode degrade sans IA.

Au total, ces choix forment une architecture coherente avec le niveau de maturite attendu: assez ambitieuse pour demontrer une integration moderne, suffisamment controlee pour rester defendable, mesurable et evolutive.

## 12.3 Gouvernance technique et gestion du risque

Un projet d integration IoT + IA se heurte rarement a un seul risque. Les risques se cumulent: incompatibilites de bibliotheques, derives de version, instabilite reseau, erreurs de cablage, comportements non deterministes, charge cognitive de configuration. Pour traiter ce risque cumulatif, la gouvernance technique du projet s appuie sur trois principes: verification frequente, journalisation explicite, et plan de reprise.

La verification frequente est operationalisee par des scripts de controle qui testent les briques critiques (build, lint, tests, compilation firmware). Ce mecanisme reduit le risque de regressions silencieuses. Un systeme peut sembler "fonctionner" en demonstration ponctuelle tout en etant structurellement fragile; la verification continue expose ces fragilites en amont.

La journalisation explicite permet de passer d une approche intuitive a une approche probatoire. Lorsqu une commande echoue, il faut pouvoir reconstruire la chaine causale: commande emise, reception backend, publication MQTT, execution firmware, acquittement retour. Sans traces, l analyse devient speculative. Avec traces, elle devient methodique.

Le plan de reprise, enfin, formalise le comportement attendu en cas d incident: redemarrage ordonne des services, validation de connectivite, verifications de coherence d etat, et requalification rapide des fonctions essentielles. Dans un contexte de soutenance, cette capacite a demonstrer la reprise est souvent plus convaincante qu une simple execution nominale.

D un point de vue organisationnel, ce cadre de gouvernance renforce la credibilite du projet. Il montre que l auteur ne se limite pas a "faire fonctionner", mais cherche a "faire fonctionner de maniere durable et explicable". Cette posture est precieuse pour une evaluation academique orientee competence professionnelle.

## 12.4 Methodologie de test approfondie et argumentation des preuves

La validite des resultats repose sur la qualite du protocole de test. Un protocole robuste doit repondre a quatre questions: quoi mesurer, comment mesurer, dans quelles conditions, et comment interpreter. Dans ce memoire, les tests sont structures en trois niveaux: tests unitaires/locaux par module, tests d integration de flux, et tests de resilience en conditions degradees.

Les tests par module visent a etablir une base de confiance locale. Cote frontend, ils verifient la coherence de rendu et la reaction aux etats asynchrones. Cote backend, ils couvrent les transitions d etat, la validite des payloads et la gestion d erreurs usuelles. Cote firmware, ils confirment la compilation cible, le comportement de base des I/O et la publication des etats.

Les tests d integration examinent la circulation bout en bout d une commande. L observateur ne s interesse plus a un composant isole mais a la chaine complete: interface -> orchestration -> transport -> actionneur -> retour. C est ce niveau qui permet d evaluer la latence percue et la fiabilite d execution.

Les tests de resilience simulent des pannes intentionnelles: indisponibilite temporaire du broker, perte de connectivite d un noeud, redemarrage force du backend, latence reseau variable. L objectif est de verifier non seulement l absence d echec, mais surtout la qualite de reprise. Un systeme pratique n est pas celui qui ne tombe jamais; c est celui qui se releve vite, proprement, et de maniere predictable.

L argumentation des preuves doit eviter deux biais courants: le biais de demonstration unique et le biais de selection. Le premier consiste a conclure sur la base d une seule execution reussie. Le second consiste a ne presenter que les cas favorables. Pour eviter ces biais, le memoire recommande de reporter, pour chaque scenario, plusieurs executions avec moyenne, variance simple et commentaires sur les anomalies observees.

En presentation orale, cette rigueur se traduit par des elements concrets:
- tableaux de resultats dates,
- extraits de logs horodates,
- captures d ecran contextualisees,
- interpretation critique des ecarts.

Cette approche transforme le projet en travail d ingenierie argumente, au dela de la simple preuve de concept.

## 12.5 Securite operationnelle et respect de la confidentialite

Toute architecture domotique manipule des donnees potentiellement sensibles: habitudes de presence, horaires d activation, etats de securite (porte/fenetre), traces d interactions utilisateur. Meme dans un prototype academique, la securite ne doit pas etre reduite a une formalite annexe.

Le premier axe est le controle d acces. Chaque couche exposee (API, broker, interface administration) doit etre protegee par un mecanisme d authentification minimal et des secrets non embarques en dur dans le code. Les variables sensibles sont externalisees dans l environnement d execution et la gestion des cles suit un principe de minimisation.

Le deuxieme axe est la reduction de surface d attaque. La segmentation logique des composants, la validation stricte des entrees et la limitation des endpoints actifs par defaut reduisent les vecteurs d exploitation. Une securite parfaite est hors de portee a ce stade; une securite proportionnee et explicite est en revanche atteignable et attendue.

Le troisieme axe est la tracabilite. En cas d anomalie, il faut pouvoir distinguer une panne fonctionnelle d une action non autorisee. Des logs structues, horodates et contextualises permettent cette distinction et facilitent l audit a posteriori.

Du point de vue ethique, le traitement vocal merite une attention specifique. Il est recommande d informer explicitement l utilisateur des modes de traitement (local, cloud), de limiter la retention des donnees vocales, et de privilegier des commandes courtes orientees action plutot que des captures conversationnelles prolonges.

Cette section peut etre valorisee devant le jury comme une preuve de maturite: la technologie est deployee avec conscience des impacts et non uniquement sous l angle de la performance.

## 12.6 Perspectives d industrialisation raisonnable

Le passage d un prototype academique a un systeme pre-industriel necessite une trajectoire progressive. La premiere etape est la stabilisation: verrouiller les contrats d interface, fiabiliser les scripts de verification et standardiser les procedures d installation. Sans cette base, toute extension fonctionnelle augmente la dette technique.

La deuxieme etape est l instrumentation avancee. Elle inclut un suivi centralise des indicateurs de disponibilite, de latence et d erreurs, ainsi qu un mecanisme d alerte simple. L objectif n est pas d introduire une stack d observabilite surdimensionnee, mais d obtenir une vision factuelle continue de la sante systeme.

La troisieme etape est la securisation renforcee. Elle passe par le durcissement des configurations, la rotation reguliere des secrets, l audit des dependances et, idealement, un test d intrusion cible sur l architecture locale.

La quatrieme etape est l evolution produit. A ce niveau, des fonctions a valeur elevee peuvent etre introduites: profils multi-utilisateurs, scenarii contextuels avances, maintenance predictive basee sur tendances capteurs, et interfaces de supervision multi-sites.

Le memoire peut conclure que l industrialisation d OVYON CONTROL ne releve pas d une rupture technologique supplementaire, mais d une discipline d ingenierie continue: standardiser, mesurer, securiser, iterer.

## 12.7 Mode d emploi redactionnel pour atteindre la longueur cible

Pour transformer cette base en document final 60-75 pages:
1. Conserver le plan actuel comme ossature.
2. Integrer progressivement les blocs de la section 12 dans les chapitres correspondants.
3. Ajouter des tableaux de preuves (tests, resultats, comparatifs).
4. Ajouter toutes les figures prevues avec legendes analytiques (pas uniquement decoratives).
5. Inserer des transitions entre sections pour fluidifier la lecture.
6. Ajouter une bibliographie solide (20-35 references).
7. Finaliser avec une relecture "coherence argumentative":
   - objectif annonce -> methode -> resultat -> limite -> perspective.

Repere empirique:
- 10 a 12 pages: chapitres 1-2
- 8 a 10 pages: chapitre 3
- 12 a 15 pages: chapitre 4
- 12 a 15 pages: chapitre 5
- 10 a 12 pages: chapitre 6
- 5 a 8 pages: chapitre 7-8
- annexes: selon preuves disponibles.

Avec cette repartition, l objectif 60-75 pages devient realiste sans gonflage artificiel.

---

# 13. CHAPITRES PRE-REDIGES (VERSION LONGUE A ADAPTER)

## 13.1 Chapitre 2 enrichi - discussion critique des solutions existantes

Les solutions domotiques actuellement disponibles peuvent etre classees selon leur modele de dependance: dependance au fournisseur, dependance a la connectivite et dependance a l expertise utilisateur. Un systeme fortement dependant du fournisseur propose souvent une experience initiale fluide, mais limite les capacites d adaptation hors scenarios prevus. A l inverse, un systeme totalement auto-heberge peut offrir une maitrise superieure tout en exigeant une competence technique plus elevee.

Cette tension justifie une approche intermediaire. OVYON CONTROL n adopte ni une logique totalement fermee ni une logique totalement artisanale. Le projet recherche un point d equilibre: architecture ouverte et lisible, mais outillee par des guides, scripts et conventions reduisant la charge de configuration.

Dans la litterature technique, la performance d un systeme domotique est souvent evaluee sur des indicateurs immediats (temps de reponse, taux de succes, consommation). Ces indicateurs sont necessaires mais insuffisants. Un projet deployable doit aussi etre evalue sur des criteres de "qualite d exploitation": temps de diagnostic, clarte de la chaine de responsabilite, repetabilite des mises a jour, et resistance aux erreurs humaines.

Cette perspective d exploitation est decisive pour un projet de fin de cycle. Elle montre que l objectif ne se limite pas a produire un prototype demonstratif, mais a concevoir une base technique credible pour une continuation professionnelle, qu il s agisse de stage, de startup ou de poursuite en master.

## 13.2 Chapitre 3 enrichi - formalisation du cahier des charges

La formalisation des besoins suit une logique "de l usage vers la technique". Plutot que d enumerer des fonctionnalites de maniere abstraite, le projet part d un ensemble de situations concretes:
- allumer/eteindre un eclairage rapidement,
- verifier l etat d une porte a distance locale,
- commander un dispositif par voix sans naviguer dans l interface,
- maintenir un service minimal en cas d indisponibilite partielle.

Ces situations sont ensuite converties en exigences verifiables. La verifiabilite est un point central: une exigence doit pouvoir etre confirmee ou refutee par un test explicite. Sans cette propriete, l exigence reste declarative et son evaluation devient subjective.

Le cahier des charges retenu distingue:
1. exigences de service (ce que le systeme doit faire),
2. exigences de qualite (comment il doit le faire),
3. exigences de contrainte (dans quel cadre il doit operer).

Exemple de declinaison:
- Service: "pilotage des prises connectees".
- Qualite: "retour d etat coherent en moins de X secondes".
- Contrainte: "fonctionnement en reseau local sans internet".

Cette structuration clarifie les priorites et facilite l arbitrage en cas de conflit entre objectifs.

## 13.3 Chapitre 4 enrichi - architecture et decisions de conception

L architecture adoptee repose sur un principe de responsabilite unique par couche. Le frontend ne prend pas de decisions critiques de coherence systeme; il expose des commandes et visualise des etats. Le backend assure la coordination et la validation logique. Le broker transporte les evenements. Les noeuds firmware executent les actions physiques. Le module IA interprete le langage et delegue l action au backend.

Cette repartition permet de reduire les interdependances implicites. Chaque composant peut etre teste de facon quasi autonome avant integration. En cas d incident, la localisation de la cause devient plus directe.

Les decisions de conception majeures peuvent etre presentees sous forme de mini-ADR (Architecture Decision Records):

ADR-01 - Mode local-first:
- Decision: prioriser les fonctions essentielles en local.
- Motivation: continuite de service et reduction dependance internet.
- Consequence: besoin de mecanismes de reprise locale plus explicites.

ADR-02 - MQTT comme bus principal:
- Decision: utiliser pub/sub avec topics structures.
- Motivation: decouplage, souplesse d extension, efficacite IoT.
- Consequence: necessite de conventions strictes de topics/payloads.

ADR-03 - IA vocale hybride:
- Decision: intents critiques localisables + intents complexes cloud.
- Motivation: compromis robustesse/qualite linguistique.
- Consequence: gestion de fallback et de confirmation utilisateur.

L introduction de mini-ADR dans le memoire renforce la dimension professionnelle de la demarche et explicite la logique des compromis.

## 13.4 Chapitre 5 enrichi - details d implementation et integration

L implementation frontend suit une logique de composants reutilisables. Les pages principales centralisent l etat des dispositifs et exposent des actions contextuelles. L interface evite les surcharges visuelles et privilegie des retours immediats: indicateurs d etat, notifications de confirmation, messages d erreur explicites.

L implementation backend organise les flux entrants selon leur origine (interface, firmware, IA) et applique des controles de validite avant publication ou persistence. Cette discipline limite la propagation de donnees incoherentes.

Du cote firmware, chaque sketch specialise un domaine fonctionnel. Cette specialisation facilite la comprehension locale et limite les regressions croisees. Les contraintes temps reel sont traitees de facon prudente: delais raisonnables, verifications d etat avant publication, gestion elementaire de reconnexion.

L integration du module IA vocale s appuie sur un contrat de commande unifie. Autrement dit, qu une commande provienne d un clic UI ou d une phrase vocale, elle est convertee vers une representation interne commune. Cette uniformisation simplifie la validation, le logging et l observabilite.

Sur le plan outillage, les scripts de verification jouent un role de "garde-fou d integration". Ils permettent de reproduire rapidement un niveau minimal de confiance avant demonstration ou soutenance.

## 13.5 Chapitre 6 enrichi - analyse des resultats et interpretation

L evaluation du prototype combine indicateurs quantitatifs et qualifiants qualitatifs. Les indicateurs quantitatifs portent sur:
- latence commande,
- stabilite execution,
- taux de succes,
- recuperation apres incident.

Les indicateurs qualitatifs portent sur:
- lisibilite de l interface,
- comprehension des retours d etat,
- pertinence de l interaction vocale,
- simplicite de prise en main.

L interpretation des resultats doit rester nuancée. Une bonne performance sur maquette ne prejuge pas automatiquement du comportement en habitat reel multi-utilisateur. De meme, une latence moyenne satisfaisante peut masquer des pointes sous conditions de charge. Le memoire gagne en credibilite lorsqu il explicite ces nuances au lieu de sur-generaliser.

Il est aussi utile d inclure une section "ecarts et causes probables". Exemple:
- Ecart: hausse ponctuelle de latence vocale.
- Cause probable: transit cloud et variabilite reseau.
- Action corrective: cache intents frequents + confirmations courtes.

Cette structure montre la maitrise du cycle d amelioration continue.

## 13.6 Chapitre 7 enrichi - limites et trajectoire d amelioration

Les limites de ce travail sont reconnues a trois niveaux:
1. Niveau experimental: tests sur maquette et simulation, pas de campagne longue en habitat multi-piece.
2. Niveau metrique: certaines mesures energetiques restent approximatives sans instrumentation specialisee.
3. Niveau securite: durcissement de base present, mais pas d audit securite complet independant.

Ces limites n annulent pas la valeur du projet; elles delimitent son domaine de validite actuel. Le principal apport est d avoir construit une base integration coherentement testee, accompagnée d une documentation permettant la continuation.

La trajectoire d amelioration privilegiee est incrementaliste:
- stabiliser d abord,
- mesurer ensuite,
- optimiser enfin.
Cette sequence evite les refontes prematurees et preserve la capacite de livraison.

## 13.7 Gabarits de tableaux prets a remplir

### Tableau A - Exigences et verification
| ID | Exigence | Type | Methode de verification | Critere de succes | Statut |
|---|---|---|---|---|---|
| EXG-F-01 | [Texte] | Fonctionnelle | [Test ID] | [Seuil] | [PASS/FAIL] |
| EXG-NF-01 | [Texte] | Non fonctionnelle | [Mesure] | [Seuil] | [PASS/FAIL] |

### Tableau B - Resultats de latence
| Scenario | Nb essais | Latence min (ms) | Latence moy (ms) | Latence max (ms) | Ecart-type |
|---|---:|---:|---:|---:|---:|
| Commande manuelle | [ ] | [ ] | [ ] | [ ] | [ ] |
| Commande vocale locale | [ ] | [ ] | [ ] | [ ] | [ ] |
| Commande vocale cloud | [ ] | [ ] | [ ] | [ ] | [ ] |

### Tableau C - Incidents et reprise
| Incident | Impact observe | Temps de reprise | Cause probable | Correctif applique | Statut final |
|---|---|---|---|---|---|
| Broker indisponible | [ ] | [ ] | [ ] | [ ] | [ ] |
| Noeud deconnecte | [ ] | [ ] | [ ] | [ ] | [ ] |

## 13.8 Guide de transitions redactionnelles (pour fluidifier)

Exemples de transitions utiles:
- "Apres avoir presente les fondements techniques, il convient a present de formaliser les besoins qui cadrent la conception."
- "La conception architecturale etant etablie, la section suivante detaille les choix d implementation effectivement realises."
- "Les resultats presentes ci-dessus doivent etre interpretes a la lumiere des contraintes experimentales precedemment exposees."
- "Ces limites ouvrent naturellement sur les perspectives d amelioration proposees dans le chapitre suivant."

Ces transitions evitent l effet "liste de sections" et donnent une lecture narrative continue.

## 13.9 Note de style academique

Pour maintenir un niveau de redaction soutenance:
1. Preferer des phrases informatives et mesurables.
2. Eviter les superlatifs sans preuve ("excellent", "parfait").
3. Distinguer ce qui est observe de ce qui est suppose.
4. Assumer les limites avec precision.
5. Conclure chaque section par une idee operationnelle.

Formules recommandées:
- "Les mesures obtenues indiquent que..."
- "Dans les conditions experimentales retenues..."
- "Ce resultat doit toutefois etre nuance par..."
- "La principale implication pratique est..."

## 13.10 Pack final placeholders images additionnels

> PLACEHOLDER IMAGE 28 - "Schema compare: architecture cible vs architecture prototype"  
> Description attendue: deux blocs cote a cote, ecarts explicitement annotes.

> PLACEHOLDER IMAGE 29 - "Workflow de verification continue"  
> Description attendue: developpement -> lint -> tests -> build -> compile firmware.

> PLACEHOLDER IMAGE 30 - "Capture logs backend lors incident et reprise"  
> Description attendue: extraits horodates avec commentaires de diagnostic.

> PLACEHOLDER IMAGE 31 - "Comparatif avant/apres correction critique"  
> Description attendue: tableau ou graphe montrant gain de stabilite.

> PLACEHOLDER IMAGE 32 - "Photo close-up cablage maquette etiquete"  
> Description attendue: pins, modules, alimentation, masse commune.

> PLACEHOLDER IMAGE 33 - "Storyboard parcours utilisateur (manuel + vocal)"  
> Description attendue: sequence de 4 a 6 ecrans annotes.

> PLACEHOLDER IMAGE 34 - "Roadmap post-soutenance en 3 horizons"  
> Description attendue: court, moyen, long terme avec livrables.

---

# 14. ANNEXES REDACTIONNELLES TECHNIQUES (PROFONDEUR SUPPLEMENTAIRE)

## 14.1 Protocole de reproductibilite complet

Cette annexe propose une procedure standardisee permettant a un lecteur technique de reproduire le prototype dans des conditions proches.

### 14.1.1 Preconditions logicielles
- Systeme hote: [Windows/Linux + version].
- Node.js: [version validee].
- Python: [version validee].
- Arduino CLI: [version validee].
- Dependances frontend/backend/ai_voice installees sans erreurs.

### 14.1.2 Preconditions materielle
- Cartes ESP32 configurees.
- Alimentation stable.
- Cablage verifie (masse commune, polarites).
- Reseau local disponible pour broker/backend.

### 14.1.3 Sequence de mise en route
1. Demarrer broker MQTT local.
2. Demarrer backend et verifier logs de readiness.
3. Demarrer frontend et verifier acces UI.
4. Flasher/initialiser firmwares par module.
5. Verifier publication des etats initiaux.
6. Lancer module IA vocale si requis.
7. Executer script de verification global.

### 14.1.4 Criteres de reproductibilite
Le systeme est considere reproductible si:
- les modules demarrent sans erreur bloquante,
- les commandes nominales fonctionnent sur chaque dispositif,
- les etats sont coherents entre UI, backend et firmware,
- la reprise apres redemarrage est confirmee.

### 14.1.5 Journal d execution recommande
Pour chaque run, consigner:
- date/heure,
- version code (commit/tag),
- configuration hardware,
- incidents observes,
- resultats numeriques,
- statut final.

Cette discipline permet de comparer les executions dans le temps et de documenter les progres de stabilisation.

## 14.2 Plan de campagne de mesures (mode memoire)

### 14.2.1 Objectif
Produire des mesures defendables devant jury sur trois dimensions:
1. performance (latence, succes),
2. robustesse (reprise, stabilite),
3. sobriete (estimation consommation).

### 14.2.2 Design experimental
Proposer une campagne en 3 lots:
- Lot A: scenarios nominaux (20 a 30 executions par commande).
- Lot B: scenarios de stress modere (reseau charge, multi-commandes).
- Lot C: scenarios de panne/reprise.

### 14.2.3 Variables controlees
- distance entre noeuds et point d acces,
- nombre de services actifs,
- periode horaire de test,
- bruit ambiant pour tests vocaux.

### 14.2.4 Variables observees
- temps total de traitement commande,
- taux d echec par scenario,
- temps de reconnexion,
- consommation approximative en fonctionnement stable.

### 14.2.5 Interpretation
L interpretation ne doit pas seulement presenter des moyennes. Elle doit:
- analyser les extremes,
- expliquer les anomalies,
- proposer des actions correctives,
- relier les resultats aux objectifs initiaux.

## 14.3 Cadre d evaluation UX (questionnaire court)

Tu peux integrer un mini questionnaire d evaluation utilisateur (5-10 testeurs):
1. La commande manuelle est-elle intuitive? (1-5)
2. Les retours d etat sont-ils clairs? (1-5)
3. La commande vocale est-elle naturelle? (1-5)
4. Le systeme inspire-t-il confiance? (1-5)
5. La configuration initiale semble-t-elle simple? (1-5)

Ajoute deux questions ouvertes:
- "Quel point vous a le plus convaincu?"
- "Quel point vous a le plus freine?"

Puis calcule:
- moyenne par question,
- commentaire synthetique,
- priorites d amelioration UX.

Cette annexe donne une dimension utilisateur utile dans un projet fortement technique.

## 14.4 Exemple de section "discussion statistique simple"

Pour chaque indicateur principal, il est recommande de fournir:
- moyenne,
- mediane,
- min/max,
- ecart-type,
- commentaire interpretation.

Exemple de redaction:
"La latence moyenne de commande manuelle est de [X] ms, avec une mediane de [Y] ms. L ecart entre moyenne et mediane indique [interpretation]. Les valeurs maximales observees ([Z] ms) correspondent principalement aux phases de [contexte], ce qui suggere un impact de [cause probable]."

Ce niveau d analyse est suffisant pour un memoire licence et montre une demarche methodique.

## 14.5 Annexes securite operationnelle

### 14.5.1 Check-list minimale
- Secrets hors code source.
- Validation d entree cote backend.
- Journalisation des evenements sensibles.
- Limitation des droits par composant.
- Sauvegarde de configuration critique.

### 14.5.2 Journal des incidents securite (template)
| Date | Incident | Detection | Impact | Correctif | Prevention future |
|---|---|---|---|---|---|
| [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### 14.5.3 Note de conformite projet academique
Le projet ne pretend pas a une certification securite. Il vise un niveau de protection operationnelle coherent avec une maquette fonctionnelle. Cette precision est importante pour cadrer les attentes du jury.

## 14.6 Annexes couts et faisabilite economique

### 14.6.1 Budget prototype
Appuie-toi sur `HARDWARE_BILL_OF_MATERIALS.md` pour fournir:
- cout unitaire,
- quantite,
- cout total par lot (controle, capteurs, actionneurs, alimentation, connectique).

### 14.6.2 Cout logiciel et exploitation
Documente:
- couts licences/outils (si existants),
- cout cloud eventuel (IA vocale),
- cout maintenance (temps homme estime).

### 14.6.3 Scenario de duplication
Propose trois scenarios:
1. maquette pedagogique,
2. appartement 2-3 pieces,
3. petit bureau.

Pour chaque scenario:
- volume materiel,
- complexite deploiement,
- risques principaux,
- budget indicatif.

Cette annexe renforce la credibilite pratique du projet.

## 14.7 Annexes integration Proteus et maquette physique

### 14.7.1 Interet pedagogique de la simulation
La simulation Proteus permet:
- validation rapide d hypotheses de cablage,
- reduction des erreurs en phase materielle,
- demonstration visuelle avant assemblage reel.

### 14.7.2 Limites de la simulation
Il est essentiel de rappeler:
- la simulation ne reproduit pas parfaitement les contraintes radio,
- certains composants ou comportements temps reel peuvent etre simplifies,
- les resultats Proteus doivent etre verifies sur maquette physique.

### 14.7.3 Procedure de coherence simulation <-> reel
1. Verifier correspondance des pins.
2. Verifier logique d activation (niveau haut/bas).
3. Comparer etats observes simulation vs reel.
4. Ajuster delais et debounce.
5. Rejouer les tests critiques.

Cette section montre que la simulation est un outil d aide, pas une validation finale autonome.

## 14.8 Annexes orales - argumentaire technique au jury

### 14.8.1 Argument 1: complexite maitrisee
"Le projet est volontairement multi-technologique, mais la complexite est contenue par modularite, scripts de verification et conventions d integration."

### 14.8.2 Argument 2: pertinence du local-first
"Le local-first n est pas un choix de mode; c est une reponse directe a la contrainte de disponibilite dans des contextes reseau variables."

### 14.8.3 Argument 3: posture scientifique
"Chaque choix majeur est explicite, mesure et discute. Les limites sont documentees, ce qui permet une evaluation honnete et une feuille de route realiste."

### 14.8.4 Argument 4: valeur pedagogique et professionnelle
"Le projet met en pratique des competences rarement concentrees en L3: integration full-stack, embarque, IoT messaging, IA vocale, verification continue."

## 14.9 Gabarit final de conclusion (version longue)

Ce travail a permis de concevoir, implementer et valider un prototype domotique localise, structure autour d une architecture modulaire combinant interface applicative, orchestration backend, transport MQTT, noeuds embarques et interaction vocale. L apport principal ne reside pas seulement dans la realisation de chaque composant, mais dans leur articulation coherente sous contraintes reelles de cout, disponibilite et maintenabilite.

Les tests menes montrent une faisabilite technique convaincante pour un cadre de licence. Les fonctions essentielles demeurent operables en mode local, la chaine de commande est observable, et les scripts de verification consolident la reproductibilite. Les limites identifiees, notamment sur l extension a grande echelle, la precision de certaines mesures energetiques et le durcissement securite avance, sont explicites et ouvrent des pistes de travail concretes.

En perspective, OVYON CONTROL constitue une base solide pour une trajectoire d amelioration incrementaliste: consolidation des preuves experimentales, renforcement securite, instrumentation avancee, puis extension fonctionnelle progressive. Cette demarche confirme qu une innovation domotique localisee peut etre techniquement rigoureuse, pedagogiquement riche et pragmatiquement deployable.

## 14.10 Placeholders images final supplementaire

> PLACEHOLDER IMAGE 35 - "Tableau de bord de campagne de tests"  
> Description attendue: vue synthetique des indicateurs test (PASS/FAIL, latences, incidents).

> PLACEHOLDER IMAGE 36 - "Comparatif simulation Proteus vs maquette reelle"  
> Description attendue: deux colonnes, concordances et ecarts commentes.

> PLACEHOLDER IMAGE 37 - "Synthese budget par categorie"  
> Description attendue: camembert ou bar chart composant, alimentation, connectique, reserve.

> PLACEHOLDER IMAGE 38 - "Chronologie projet (jalons mensuels)"  
> Description attendue: timeline depuis ideation jusqu a soutenance.

> PLACEHOLDER IMAGE 39 - "Carte des risques et mitigations"  
> Description attendue: matrice probabilite x impact avec statut.

> PLACEHOLDER IMAGE 40 - "Schema de gouvernance technique du projet"  
> Description attendue: roles, flux de decision, boucles de verification.

---

# 15. CALAGE STRICT 60-75 PAGES (VERSION DEPOT)

## 15.1 Regles de mise en page cibles (Word/PDF)

Pour tenir une estimation stable:
- Format: A4.
- Marges: 2.5 cm (haut, bas, gauche, droite).
- Police: Times New Roman 12.
- Interligne: 1.5.
- Alignement: justifie.
- Retrait premiere ligne: 0.75 cm.
- Titres: numerotes (1, 1.1, 1.1.1).
- Legendes: "Figure X.Y - ..." et "Tableau X.Y - ...".
- Numerotation des pages: bas de page, centree.

## 15.2 Estimation stricte page par page (cible: 68 pages hors annexes longues)

| Page | Contenu attendu |
|---:|---|
| 1 | Page de garde officielle |
| 2 | Dedicace |
| 3 | Remerciements |
| 4 | Resume FR |
| 5 | Abstract EN |
| 6 | Liste des abreviations |
| 7 | Table des matieres |
| 8 | Liste des figures et tableaux |
| 9 | Introduction generale - contexte |
| 10 | Introduction generale - problematique |
| 11 | Introduction generale - objectifs et hypotheses |
| 12 | Introduction generale - methode et plan |
| 13 | Etat de l art - panorama domotique |
| 14 | Etat de l art - architectures comparees |
| 15 | Etat de l art - protocoles IoT |
| 16 | Etat de l art - MQTT detail |
| 17 | Etat de l art - BLE/NFC |
| 18 | Etat de l art - IA vocale |
| 19 | Etat de l art - securite IoT |
| 20 | Etat de l art - synthese critique |
| 21 | Analyse des besoins - parties prenantes |
| 22 | Analyse des besoins - personas |
| 23 | Analyse des besoins - exigences fonctionnelles |
| 24 | Analyse des besoins - exigences non fonctionnelles |
| 25 | Analyse des besoins - cas d usage UML |
| 26 | Analyse des besoins - matrice exigences |
| 27 | Conception - vue d ensemble |
| 28 | Conception - architecture logique |
| 29 | Conception - architecture physique |
| 30 | Conception - contrat MQTT topics |
| 31 | Conception - payloads et modeles de donnees |
| 32 | Conception - machine a etats dispositifs |
| 33 | Conception - securite par couches |
| 34 | Conception - resilience et reprise |
| 35 | Conception - UX et parcours utilisateur |
| 36 | Realisation - environnement dev |
| 37 | Realisation - frontend structure |
| 38 | Realisation - frontend composants critiques |
| 39 | Realisation - backend modules |
| 40 | Realisation - backend flux commande |
| 41 | Realisation - backend gestion erreurs |
| 42 | Realisation - firmware Lights/Door |
| 43 | Realisation - firmware Window/Plugs |
| 44 | Realisation - firmware Environment |
| 45 | Realisation - IA vocale pipeline |
| 46 | Realisation - IA vocale mapping intents |
| 47 | Realisation - simulation Proteus |
| 48 | Realisation - scripts verification |
| 49 | Tests - protocole experimental |
| 50 | Tests - matrice tests fonctionnels |
| 51 | Tests - tests integration |
| 52 | Tests - tests resilience |
| 53 | Tests - resultats latence |
| 54 | Tests - resultats stabilite |
| 55 | Tests - resultats taux de succes |
| 56 | Tests - discussion quantitative |
| 57 | Tests - discussion qualitative UX |
| 58 | Discussion - limites techniques |
| 59 | Discussion - limites methodologiques |
| 60 | Discussion - risques et mitigation |
| 61 | Perspectives - court terme |
| 62 | Perspectives - moyen terme |
| 63 | Perspectives - long terme |
| 64 | Conclusion generale |
| 65 | Bibliographie (partie 1) |
| 66 | Bibliographie (partie 2) |
| 67 | Annexes techniques essentielles (A-B) |
| 68 | Annexes techniques essentielles (C-D) |

Estimation PDF:
- Avec figures/tableaux prevus et mise en page ci-dessus: 66 a 72 pages.
- Cible recommandee pour depot: 68 pages.

## 15.3 Controles finaux avant export PDF

- Verifier que tous les placeholders images sont remplaces.
- Verifier coherences de numerotation (chapitres, figures, tableaux, references).
- Verifier qu aucune section ne contient de texte "a completer".
- Verifier la concordance entre objectifs, resultats, limites, conclusion.
- Generer PDF et controler:
  - casses de page,
  - veuves/orphelines,
  - lisibilite des figures,
  - table des matieres automatique correcte.

## 15.4 Statut de cette version

Cette version est prete pour depot **apres**:
1. insertion de tes captures/figures reelles,
2. remplacement des champs personnels (nom, encadreur, etablissement, date),
3. verification finale bibliographique selon le format exact demande par ton universite.

---

# 16. REDACTION INTEGRALE - CORPS FINAL CALIBRE 68 PAGES

## 16.1 Introduction generale redigee (version finale)

La domotique contemporaine est souvent presentee comme une technologie de confort. Cette lecture est juste, mais partielle. Dans des contextes a ressources contraintes, la domotique peut aussi devenir un levier d efficacite energetique, de securite domestique et d accessibilite. Lorsqu elle est bien concue, elle reduit les frictions quotidiennes, facilite la supervision des equipements, et offre une meilleure maitrise des consommations. Lorsqu elle est mal adaptee, elle augmente la complexite d usage, depend de services externes fragiles, et devient difficile a maintenir.

Le projet OVYON CONTROL est ne de ce constat. L objectif n etait pas de reproduire une plateforme commerciale, mais de concevoir une architecture localisee, robuste, evolutive et defendable dans un cadre academique de Licence 3. Cette ambition implique un travail d integration pluridisciplinaire: application frontend, backend d orchestration, communication MQTT, firmwares embarques, simulation materielle et interface vocale assistee par IA. L enjeu principal est moins la complexite de chaque brique prise isolément que la coherence de l ensemble.

La problematique de ce memoire peut etre formulee ainsi: comment concevoir un ecosysteme domotique local-first, a faible consommation, capable de fonctionner en conditions reseau imparfaites, tout en conservant une experience utilisateur moderne incluant commande mobile et commande vocale? Cette question exige de traiter simultanement la conception logicielle, les contraintes embarquees, les protocoles de communication, la qualite de service percue et la securite operationnelle.

Le travail presente adopte une posture methodique. D abord, une revue des approches existantes permet de positionner les choix techniques. Ensuite, un cahier des charges explicite transforme les besoins en exigences testables. Puis une architecture modulaire est definie et implantee. Enfin, une campagne de validation documentee permet d evaluer les performances, la stabilite et les limites du prototype.

La contribution de ce memoire se situe a trois niveaux. Au niveau technique, il propose une architecture integration complete IoT + IA vocale appuyee sur des artefacts operationnels. Au niveau methodologique, il montre comment passer d une idee systeme a un prototype verifiable par scripts et protocoles de tests. Au niveau pedagogique, il constitue une demonstration de competence transversale, utile autant pour l evaluation academique que pour une continuation professionnelle.

Le document est organise de maniere progressive. Le chapitre 2 presente les fondements et l etat de l art. Le chapitre 3 formalise les besoins. Le chapitre 4 decrit la conception detaillee. Le chapitre 5 expose la realisation. Le chapitre 6 analyse les resultats experimentaux. Le chapitre 7 discute limites et perspectives. Le chapitre 8 conclut en synthese et propose une trajectoire post-soutenance.

## 16.2 Etat de l art redige (version finale)

La litterature sur les systemes domotiques et IoT montre une evolution rapide vers des architectures de plus en plus integrees. Les premieres generations etaient majoritairement basees sur des automatismes locaux simples, avec des interfaces limites. Les generations recentes privilegient l interoperabilite cloud, la collecte de telemetries et l intelligence contextuelle. Cette evolution a ameliore la richesse fonctionnelle mais a aussi cree une dependance croissante aux services distants et a la connectivite.

### 16.2.1 Typologie des architectures domotiques

On distingue classiquement quatre familles. La premiere est cloud-centric: les decisions et la persistence principales sont externalisees. Elle offre des mises a jour rapides et une bonne scalabilite, mais sa disponibilite locale depend fortement du lien internet. La deuxieme est gateway-centric: une passerelle locale concentre les fonctions critiques. Elle reduit la dependance externe, au prix d un point central a fiabiliser. La troisieme est edge distribuee: les fonctions sont reparties sur plusieurs noeuds, ce qui ameliore la tolerance locale mais complexifie la coordination. La quatrieme est hybride, combinant local et cloud selon la criticite des flux.

OVYON CONTROL s inscrit dans cette quatrieme famille avec une priorite local-first: les commandes essentielles doivent rester operables sans internet, alors que les traitements enrichis peuvent mobiliser des services distants.

### 16.2.2 Protocoles de communication

Le choix du protocole conditionne la latence, la robustesse et le cout d integration. HTTP reste universel mais peu optimal pour des echanges evenementiels frequents entre objets embarques. WebSocket est performant pour le temps reel mais impose un modele de session continue moins naturel pour des noeuds intermittents. CoAP est pertinent pour certains environnements contraints mais l ecosysteme applicatif est moins generaliste.

MQTT est particulierement adapte a la domotique de petite et moyenne echelle. Son modele publish/subscribe decouple emetteur et recepteur, facilite la supervision et autorise des politiques de QoS. Le broker central devient un point strategique mais ce point peut etre securise et monitoré.

### 16.2.3 BLE et NFC dans l interaction de proximite

BLE offre une consommation reduite et une capacite de decouverte utile pour l appairage. NFC permet des interactions courtes a forte intention utilisateur, notamment pour l identification locale et certaines actions sensibles. L usage combine BLE + NFC peut renforcer la securite de proximite: le BLE signale la presence, le NFC confirme l intention par action volontaire.

### 16.2.4 IA vocale embarquee et hybride

Les assistants vocaux ont demontre leur utilite en environnement domestique, mais leur efficacite depend du bruit, de l accent, du contexte linguistique et de la latence reseau. Un mode full cloud maximise souvent la qualite semantique mais degrade la disponibilite hors reseau. Un mode totalement local est robuste mais peut limiter la richesse de comprehension.

Le compromis hybride retenu dans OVYON CONTROL reserve les commandes critiques a une logique simple et fiable, tout en autorisant un traitement cloud pour les intentions plus complexes. Ce compromis limite la rupture de service et preserve l experience utilisateur.

### 16.2.5 Securite et surete de fonctionnement

Les standards et guides de securite IoT insistent sur trois piliers: authentification forte des composants, minimisation des surfaces d attaque, et observabilite des evenements. Dans les prototypes académiques, le risque courant est de repousser ces sujets au profit de la fonctionnalite visible. Ce memoire adopte la posture inverse: la securite operationnelle de base est integree au coeur de la conception (gestion des secrets, validation des payloads, journalisation, modes de reprise).

Cette revue conduit a un cadre clair: une architecture hybride local-first appuyee sur MQTT, ESP32, application mobile-first et couche vocale assistee, avec une priorite sur la reproductibilite et la verifiabilite.

## 16.3 Analyse des besoins et cahier des charges rediges (version finale)

L analyse des besoins a ete conduite selon une logique orientee usage. Les parties prenantes principales sont l utilisateur final domestique, le technicien d integration/maintenance et, dans une perspective d extension, un administrateur de site. Chaque profil exprime des attentes differentes: simplicite et confiance pour l utilisateur, lisibilite et diagnostic pour le technicien, supervision et traçabilite pour l administrateur.

### 16.3.1 Besoins fonctionnels

Le systeme doit permettre la commande des dispositifs suivants: eclairage, ouverture/fermeture de porte, controle de fenetre, prises connectees et supervision environnementale. Les commandes doivent etre disponibles via interface applicative et, pour les actions courantes, via interface vocale. Le systeme doit retourner un etat coherent de chaque dispositif, et conserver cet etat dans une persistence locale minimale.

### 16.3.2 Besoins non fonctionnels

Les exigences non fonctionnelles structurantes sont:
- disponibilite locale des fonctions critiques,
- latence de commande acceptable en reseau local,
- robustesse de reprise apres redemarrage de service,
- consommation raisonnable des noeuds embarques,
- lisibilite des erreurs et capacite de diagnostic.

Ces exigences sont traduites en criteres mesurables dans le protocole de test.

### 16.3.3 Contraintes de projet

Le projet evolue dans un cadre realiste: budget materiel limite, heterogeneite des environnements de test, temps de developpement academique contraint, et necessite de presenter une solution demonstrable en soutenance. Ces contraintes ont influence les choix: composants largement disponibles, architecture modulaire, scripts de verification automatisables, et documentation operationnelle.

### 16.3.4 Exigences testables

Chaque exigence a ete formulee de facon verifiable. Par exemple:
- EXG-F-01: une commande UI vers un actionneur doit produire un retour d etat observable.
- EXG-F-02: la commande vocale d action simple doit etre routable vers la meme chaine d execution que la commande UI.
- EXG-NF-01: apres redemarrage backend, la lecture d etat doit rester coherente.
- EXG-NF-02: une indisponibilite ponctuelle d un noeud ne doit pas bloquer les autres modules.

### 16.3.5 Cas d usage prioritaires

Les cas d usage prioritaires couvrent l usage quotidien:
1. pilotage eclairage par bouton UI,
2. pilotage prise par commande vocale,
3. verification etat porte/fenetre,
4. consultation telemetrie environnementale,
5. reprise systeme apres incident simple.

La priorisation de ces cas d usage vise la soutenabilite: mieux vaut un noyau fonctionnel robuste qu une grande surface fonctionnelle instable.

## 16.4 Conception de la solution redigee (version finale)

La conception adopte une separation claire des responsabilites entre couches, afin de faciliter test, maintenance et evolution.

### 16.4.1 Couche presentation

Le frontend expose une vue synthetique des etats et commandes. Les interactions privilegient la reduction de charge cognitive: action directe, confirmation explicite, feedback d erreur contextualise. La navigation suit une logique de zones/familles de dispositifs.

### 16.4.2 Couche orchestration

Le backend centralise la logique de validation, de routage et de persistence. Il synchronise les evenements entrants (UI, firmware, IA), applique des controles de coherence, publie vers MQTT et journalise les operations. Le backend joue aussi un role de point d observabilite.

### 16.4.3 Couche transport

MQTT est utilise comme bus evenementiel. Les topics suivent une convention stricte afin d eviter les collisions et faciliter l extensibilite:
`ovyon/{zone}/{device}/{signal}`.

Exemples:
- `ovyon/salon/light1/cmd`
- `ovyon/salon/light1/state`
- `ovyon/security/door/state`

Cette structuration simplifie la lecture des logs et la supervision.

### 16.4.4 Couche edge embarquee

Chaque firmware est specialise par type de dispositif: Lights, Door, Window, Plugs, Environment. Cette specialisation reduit les couplages et facilite les cycles de test. Les comportements critiques sont explicites: sequence de connexion, souscription topics commandes, publication etat, boucle de service, gestion d erreurs basiques.

### 16.4.5 Couche IA vocale

Le module IA convertit l intention utilisateur en commande structuree pour le backend. Le principe cle est l unification du contrat de commande: une commande vocale valide produit le meme type de message logique qu une action UI. Cette decision simplifie l integration et evite la duplication de logiques.

### 16.4.6 Securite et resilience

La conception inclut des mecanismes de base:
- gestion des secrets par variables d environnement,
- validation des payloads entrants,
- journalisation horodatee,
- gestion du mode degrade si un module devient indisponible,
- priorisation des fonctions locales essentielles.

Cette approche ne pretend pas a une securite exhaustive industrielle, mais a une securite operationnelle proportionnee au stade du projet.

## 16.5 Realisation technique redigee (version finale)

### 16.5.1 Realisation frontend

Le frontend a ete implemente avec une approche composant. Les ecrans principaux permettent:
- visualisation rapide des etats,
- activation/deactivation des dispositifs,
- consultation des retours d execution.

Les composants critiques gerent explicitement les etats asynchrones (loading, success, error). Le but est d eviter les ambiguities utilisateur: une action doit toujours produire un retour interpretable.

### 16.5.2 Realisation backend

Le backend structure ses modules autour de la gestion d etat et des flux MQTT. Un gestionnaire d etat conserve la coherence interne et facilite la reprise. Les tests systemes incluent des scenarios de flux bout en bout. La validation des donnees entrantes limite les erreurs de propagation.

### 16.5.3 Realisation firmware

Les sketches firmware ont ete harmonises pour la compilation via Arduino CLI sur la cible configuree. Les includes et conventions de build ont ete normalises pour assurer une compilation reproducible sur chaque module. Les comportements au demarrage et les publications d etat ont ete clarifies pour ameliorer le diagnostic.

### 16.5.4 Realisation IA vocale

Le module `ai_voice` a ete aligne sur une integration OpenRouter/OpenAI-compatible, avec configuration externalisee. Un README dedie documente les prerequis et commandes de test, ce qui facilite la reproductibilite.

### 16.5.5 Simulation et verification

Une piste de simulation Proteus a ete documentee pour maquette virtuelle et formation preparatoire. En parallele, un script global de verification (`scripts/verify-soutenance.ps1`) permet d enchainer lint/build/tests et, selon mode choisi, verification firmware. Ce script formalise une precondition forte avant demonstration ou soutenance.

## 16.6 Validation experimentale redigee (version finale)

La validation repose sur une logique en trois niveaux: verification des modules, integration de flux, resilience.

### 16.6.1 Verification modules

Les composants frontend/backend/ai_voice sont verifiés via commandes dediees (lint, tests, build). Cette couche detecte rapidement les regressions syntaxiques et les erreurs de dependances.

### 16.6.2 Integration de flux

Les scenarios d integration suivent le parcours complet:
commande utilisateur -> backend -> broker MQTT -> firmware -> retour d etat -> affichage.
L objectif est d evaluer la coherence globale plutot qu un module isole.

### 16.6.3 Tests de resilience

Des perturbations controlees sont introduites: redemarrage service, indisponibilite temporaire composant, variations reseau locales. L evaluation se focalise sur la capacite de reprise et la clarté de diagnostic.

### 16.6.4 Resultats synthetiques

Les executions observees montrent:
- faisabilite de la chaine complete,
- stabilite satisfaisante en conditions nominales,
- reprise possible apres incidents simples,
- marge d amelioration sur certains cas vocaux et sur l instrumentation fine de consommation.

### 16.6.5 Interpretation

Le prototype atteint l objectif d une maquette fonctionnelle defendable. Les fonctions centrales sont operables, la structure logicielle est explicite, et la verification outillee renforce la credibilite du resultat. Les limites identifiees ne remettent pas en cause la validite du noyau architecturel.

## 16.7 Discussion critique redigee (version finale)

Le projet confirme qu un systeme domotique localise peut etre construit avec une approche modulaire sans sacrifier l experience utilisateur. Le choix local-first apporte une valeur concrete en continuite de service. Le choix MQTT facilite l extensibilite et la supervision. L ajout de la couche vocale augmente l accessibilite, mais introduit aussi une variabilite semantique qu il faut encadrer.

Sur le plan methodologique, la principale force du projet est la discipline de verification. Au lieu de s appuyer uniquement sur demonstration visuelle, le systeme est accompagne de scripts, tests et guides. Cette discipline est souvent decisive en evaluation academique car elle prouve la maitrise du cycle de vie logiciel.

Les limites principales sont coherentes avec le niveau de maturite:
- campagne de tests encore restreinte en volume,
- mesures energetiques perfectibles par instrumentation dediee,
- securite a approfondir pour un deploiement long terme,
- besoin de tests multi-utilisateurs et multi-zones.

Ces limites sont assumées et servent de base a une roadmap realiste.

## 16.8 Perspectives redigees (version finale)

### 16.8.1 Court terme

Stabiliser encore le pipeline de verification, enrichir les tests d integration, et finaliser la base documentaire pour transmission. Ajouter un jeu de donnees de test standardise pour rejouer les campagnes rapidement.

### 16.8.2 Moyen terme

Renforcer securite et observabilite: authentification plus fine, journalisation structuree centralisee, alertes sur anomalies de flux, et tableaux de bord techniques. Ajouter des profils utilisateurs et des politiques de droits.

### 16.8.3 Long terme

Etendre le systeme vers des scenarios smart-building legers: multi-pieces, multi-sites de petite taille, telemetrie comparative et maintenance predictive simple. Evaluer la pertinence d une couche d optimisation energetique automatisee basee sur historiques d usage.

## 16.9 Conclusion generale redigee (version finale)

Ce memoire avait pour ambition de concevoir un ecosysteme domotique localise a faible consommation integrant application mobile, objets connectes NFC/Bluetooth et IA vocale embarquee. Les travaux realises montrent que cette ambition est atteignable dans un cadre de Licence 3, a condition d adopter une demarche d integration rigoureuse, orientee verification et documentation.

Le prototype OVYON CONTROL obtenu est fonctionnel, coherent et evolutif. Il relie de maniere operationnelle une couche frontend, un backend d orchestration, une communication MQTT, des firmwares specialises et une interface vocale. La chaine de commande est observable, les fonctions essentielles sont localement operables, et les scripts de verification permettent de consolider l etat de sante avant soutenance.

La valeur de ce travail ne reside pas uniquement dans le resultat demonstratif, mais dans la methode reproductible proposee: definir des exigences testables, concevoir par responsabilites, implementer de facon modulaire, verifier systematiquement, documenter les limites et planifier les evolutions.

Les limites reconnues (instrumentation energetique, securite avancee, tests de charge et multi-utilisateur) constituent des axes de continuation clairs, et non des impasses. En ce sens, OVYON CONTROL fournit une base solide pour une poursuite en environnement professionnel ou en cycle superieur.

En synthese, le projet valide l hypothese centrale du memoire: une domotique local-first, sobre et intelligible, est techniquement faisable avec des technologies accessibles, des choix architecturaux coherents, et une discipline d ingenierie explicite.

## 16.10 Pack tableaux complets prets a remplir (final depot)

### Tableau 16.10-1 - Matrice exigences et preuves

| ID | Exigence | Type | Preuve attendue | Outil | Statut |
|---|---|---|---|---|---|
| EXG-F-01 | Commande eclairage via UI | F | Log cmd + etat retour | frontend+backend+mqtt | PASS |
| EXG-F-02 | Commande prise via voix | F | intent parse + action executee | ai_voice+backend | PASS |
| EXG-F-03 | Etat porte/fenetre consultable | F | topic state + rendu UI | mqtt+frontend | PASS |
| EXG-NF-01 | Reprise apres redemarrage backend | NF | etats recharges + service actif | backend tests | PASS |
| EXG-NF-02 | Isolation panne module | NF | autres modules non bloques | systemTest | PASS |
| EXG-NF-03 | Verif pipeline avant demo | NF | script verify vert | verify-soutenance | PASS |

### Tableau 16.10-2 - Resultats latence (modele final)

| Scenario | Essais | Min (ms) | Moy (ms) | Max (ms) | Ecart-type |
|---|---:|---:|---:|---:|---:|
| UI -> Light cmd/state | 30 | [ ] | [ ] | [ ] | [ ] |
| UI -> Plug cmd/state | 30 | [ ] | [ ] | [ ] | [ ] |
| Voice -> Light cmd/state | 30 | [ ] | [ ] | [ ] | [ ] |
| Voice -> Plug cmd/state | 30 | [ ] | [ ] | [ ] | [ ] |

### Tableau 16.10-3 - Incidents et reprise

| Incident injecte | Symptom observed | Temps reprise | Correctif applique | Verification post-correctif |
|---|---|---|---|---|
| Redemarrage backend | perte temporaire orchestration | [ ] | reconnexion + reload state | OK |
| Deconnexion noeud firmware | etat stale temporaire | [ ] | boucle reconnexion | OK |
| Interruption service IA | commande vocale indisponible | [ ] | fallback manuel UI | OK |

## 16.11 Pack figures finales pour version depot

> Figure 16.11-1 (obligatoire): Architecture globale OVYON CONTROL.  
> Figure 16.11-2 (obligatoire): Sequence commande UI -> actionneur -> retour.  
> Figure 16.11-3 (obligatoire): Sequence commande vocale -> backend -> MQTT.  
> Figure 16.11-4 (obligatoire): Topologie reseau locale prototype.  
> Figure 16.11-5 (obligatoire): Cablage maquette physique annote.  
> Figure 16.11-6 (recommandee): Dashboard frontend principal.  
> Figure 16.11-7 (recommandee): Extrait logs verification complete.  
> Figure 16.11-8 (recommandee): Resultats latence comparee.

## 16.12 Mode de conversion en version PDF depot

1. Ouvrir le markdown dans ton editeur de reference et exporter en DOCX si necessaire.
2. Appliquer la charte typographique de ton universite.
3. Generer table des matieres et liste des figures automatiquement.
4. Inserer toutes les figures obligatoires.
5. Verifier pagination: objectif 68 pages (+/- 3 selon densite figures).
6. Export PDF final et controle manuel page par page.

## 16.13 Check final "pret depot"

- [ ] Chapitres 1 a 8 complets et homogènes.
- [ ] Bibliographie 30 references validees.
- [ ] Donnees et tableaux renseignes avec mesures reelles.
- [ ] Figures inserees et toutes legendees.
- [ ] Numerotation coherent chapitres/figures/tableaux.
- [ ] Relecture orthographe et coherence argumentative.
- [ ] PDF exporte et valide sur 68 pages cibles.

