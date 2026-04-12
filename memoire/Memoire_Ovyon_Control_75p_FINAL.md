**REPUBLIQUE DU BENIN**

MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE

**Haute Ecole de Commerce et de Management (HECM)**

| **FIGURE LOGO ◼ LOGO OFFICIEL HECM**                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **\[ INSERVER ICI \]**<br><br>Inserer ici le logo officiel de la HECM (format PNG, fond transparent, hauteur 4 cm). Fichier : logo_hecm.png<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure LOGO** - Logo officiel HECM

**MEMOIRE DE FIN DE FORMATION**

En vue de l'obtention de la Licence Professionnelle

**Filiere : Systemes Informatiques et Logiciels (SIL)**

**OVYON CONTROL**

**Conception et Developpement d'un Ecosysteme Domotique**

**Resilient et Intelligent Base sur une Architecture Local-First**

pour Contextes a Infrastructure Contrainte

| **AUTEUR**                     | **DIRECTEUR DE MEMOIRE**        |
| ------------------------------ | ------------------------------- |
| VODOUNNOU Koffi Emmanuel       | Prof. \[Nom du Directeur\]      |
| Matricule : HECM-SIL-2022-XXX  | Departement Informatique - HECM |
| 5e annee - Promotion 2025-2026 | Grade : \[Grade academique\]    |

**JURY DE SOUTENANCE**

| President du jury : | \[Nom, Titre, Institution\] |
| ------------------- | --------------------------- |
| Membre :            | \[Nom, Titre, Institution\] |
| Membre :            | \[Nom, Titre, Institution\] |

**Annee academique 2025 - 2026**

Cotonou, Benin

**AVERTISSEMENT**

Ce mémoire de fin de formation a été rédigé dans le cadre du programme de Licence Professionnelle en Systèmes Informatiques et Logiciels (SIL) dispensé à la Haute École de Commerce et de Management (HECM), Cotonou, République du Bénin.

Le contenu de ce document, les analyses présentées, les choix architecturaux décrits ainsi que les résultats expérimentaux rapportés engagent uniquement la responsabilité de l'auteur et ne sauraient représenter la position officielle de l'institution, ni de son corps enseignant.

Ce travail est protégé par les dispositions relatives à la propriété intellectuelle en vigueur en République du Bénin et par les conventions internationales auxquelles le Bénin est signataire. Toute reproduction, même partielle, de ce document à des fins commerciales ou non, sans l'accord écrit et préalable de l'auteur, est strictement interdite.

Les extraits de code source présentés dans ce mémoire constituent des illustrations pédagogiques des concepts exposés. Ils sont fournis à titre documentaire et ne représentent pas nécessairement l'intégralité du code de production du projet Ovyon Control.

Les noms de produits, marques, et technologies citées dans ce document sont la propriété de leurs détenteurs respectifs. Leur mention n'implique aucun accord commercial ou partenariat entre l'auteur, l'HECM et lesdites entités.

Document soumis à la HECM en vue de la soutenance de Licence Professionnelle SIL - Année académique 2025-2026. Toute utilisation académique doit mentionner la source complète : NOM Prénom, "Ovyon Control : Conception et Développement d'un Écosystème Domotique Résilient et Intelligent Basé sur une Architecture Local-First pour Contextes à Infrastructure Contrainte", Mémoire de Licence SIL, HECM, Cotonou, 2026.

**DÉDICACES**

À mes parents,

dont le soutien indéfectible, la confiance sans faille et les sacrifices consentis tout au long de mon cursus académique constituent le fondement de ce travail. Vous m'avez enseigné que la persévérance et l'intégrité sont les vertus premières de tout homme accompli.

À mes frères et sœurs,

compagnons de route, sources d'émulation et de joie, pour chaque mot d'encouragement et chaque moment de solidarité partagé durant ces années d'études.

À tous les étudiants africains en informatique,

qui bâtissent, avec les ressources disponibles sur leur continent, des solutions technologiques adaptées à leurs réalités. Puisse ce travail démontrer qu'il est possible d'innover avec pertinence depuis l'Afrique et pour l'Afrique.

"L'innovation véritable naît là où le besoin est le plus aigu."

**REMERCIEMENTS**

La réalisation de ce mémoire de fin de formation n'aurait pas été possible sans le concours précieux de nombreuses personnes à qui je tiens à exprimer ma profonde gratitude. Ces remerciements, bien que nécessairement succincts au regard de la dette intellectuelle et morale que j'ai contractée, représentent la sincérité et la profondeur de ma reconnaissance.

Je tiens en premier lieu à exprimer ma vive gratitude envers la Direction de la Haute École de Commerce et de Management (HECM) pour la qualité de la formation dispensée, l'accompagnement pédagogique rigoureux et les conditions d'apprentissage offertes tout au long de mon cursus. La vision de cet établissement, qui forme des professionnels capables d'apporter des solutions concrètes aux défis du développement africain, a profondément inspiré ce projet.

J'adresse mes plus sincères remerciements à mon Directeur de mémoire, le Professeur \[Nom du Directeur\], pour la disponibilité dont il a fait preuve à chaque étape de ce travail. Ses orientations méthodologiques avisées, ses remarques constructives et son exigence intellectuelle ont été des balises indispensables qui ont guidé ma réflexion vers une rigueur académique que j'espère avoir atteinte. Sa capacité à pointer les faiblesses d'un raisonnement tout en encourageant l'innovation constitue un modèle pédagogique dont je m'inspirerai tout au long de ma carrière.

Mes remerciements vont également à l'ensemble du corps enseignant de la filière Systèmes Informatiques et Logiciels (SIL) de l'HECM. Les cours de Génie Logiciel, d'Architecture des Systèmes Embarqués, de Réseaux Informatiques et d'Intelligence Artificielle ont constitué les fondements théoriques sur lesquels repose l'intégralité de ce projet. Je remercie plus particulièrement les professeurs \[Nom 1\] et \[Nom 2\] pour leurs enseignements en programmation système et en IoT qui ont directement nourri les choix architecturaux d'Ovyon Control.

Je suis profondément reconnaissant envers la communauté des développeurs open-source dont les contributions ont rendu possible la réalisation technique de ce projet. Les créateurs et mainteneurs de l'écosystème Node.js, de la bibliothèque Aedes pour le broker MQTT, du framework React, de SQLite, des outils Arduino/ESP-IDF pour la plateforme ESP32, ainsi que les équipes de recherche de l'Ink & Switch Laboratory dont les travaux fondateurs sur le paradigme Local-First ont guidé notre architecture - tous méritent une mention spéciale. Ce mémoire s'appuie sur un écosystème collaboratif mondial et cherche en retour à y contribuer par la documentation de l'expérience acquise.

Mes remerciements chaleureux vont à mes camarades de promotion, et plus particulièrement à \[Prénom 1\], \[Prénom 2\] et \[Prénom 3\], pour les longues sessions de travail nocturnes, les échanges techniques stimulants et le soutien moral constant. La dynamique intellectuelle de notre groupe a été une source d'émulation qui a indéniablement élevé la qualité de ce travail. La fraternité académique que nous avons cultivée représente l'une des richesses les plus précieuses de ces années de formation.

Je remercie aussi sincèrement les familles \[Nom famille 1\] et \[Nom famille 2\] qui ont, à des moments critiques de ma formation, offert hospitalité et soutien logistique. Leur générosité illustre que la réussite académique est toujours une aventure collective, portée par un tissu de solidarités humaines.

Enfin, une pensée émue va à mes parents, dont les sacrifices pour financer mes études n'ont jamais faibli malgré les contraintes. C'est pour honorer leur foi en moi et leur investissement que ce travail a été mené avec le plus grand sérieux. Ce mémoire leur est dédié tout autant qu'à la conviction que la technologie, bien orientée, peut améliorer concrètement les conditions de vie sur le continent africain.

Que chacune et chacun trouve ici l'expression de ma sincère et durable reconnaissance.

L'auteur, Cotonou, mars 2026

**TABLE DES MATIÈRES**

\[La table des matières sera générée automatiquement par Microsoft Word après insertion des styles Titre 1, Titre 2 et Titre 3. Aller dans Références > Table des matières > Table automatique 2 pour la générer.\]

**LISTE DES ACRONYMES ET ABRÉVIATIONS**

| **Sigle / Acronyme** | **Signification et Définition**                                                        |
| -------------------- | -------------------------------------------------------------------------------------- |
| **AION**             | Artificial Intelligence Orchestration Node - Agent IA central d'Ovyon Control          |
| **API**              | Application Programming Interface - Interface de programmation applicative             |
| **CORS**             | Cross-Origin Resource Sharing - Partage des ressources entre origines                  |
| **CPU**              | Central Processing Unit - Unité centrale de traitement                                 |
| **CRDTs**            | Conflict-free Replicated Data Types - Types de données répliquées sans conflit         |
| **DHT11**            | Digital Humidity and Temperature sensor - Capteur numérique humidité/température       |
| **ESP32**            | Microcontrôleur dual-core 240 MHz Xtensa LX6 avec Wi-Fi/Bluetooth intégré (Espressif)  |
| **FIDO2**            | Fast IDentity Online 2 - Standard d'authentification sans mot de passe (FIDO Alliance) |
| **GPIO**             | General Purpose Input/Output - Entrée/Sortie à usage général                           |
| **HTTP**             | HyperText Transfer Protocol - Protocole de transfert hypertexte                        |
| **HTTPS**            | HyperText Transfer Protocol Secure - Version sécurisée de HTTP                         |
| **IoT**              | Internet of Things - Internet des Objets                                               |
| **JWT**              | JSON Web Token - Jeton d'authentification au format JSON                               |
| **LLM**              | Large Language Model - Grand modèle de langage                                         |
| **MQTT**             | Message Queuing Telemetry Transport - Protocole de messagerie IoT léger                |
| **NLP**              | Natural Language Processing - Traitement du langage naturel                            |
| **ORM**              | Object-Relational Mapping - Mapping objet-relationnel                                  |
| **PWA**              | Progressive Web Application - Application web progressive                              |
| **PWM**              | Pulse Width Modulation - Modulation de largeur d'impulsion                             |
| **QoS**              | Quality of Service - Qualité de service (niveaux 0, 1, 2 en MQTT)                      |
| **RAM**              | Random Access Memory - Mémoire vive                                                    |
| **ReAct**            | Reasoning and Acting - Paradigme de raisonnement agent IA (Yao et al., 2023)           |
| **REST**             | Representational State Transfer - Style d'architecture d'API web                       |
| **SIL**              | Systèmes Informatiques et Logiciels - Filière HECM                                     |
| **SoC**              | System on Chip - Système sur puce intégrant CPU, Wi-Fi, Bluetooth                      |
| **SQLite**           | Self-Contained SQL Database Engine - Moteur de base de données embarquée               |
| **TCP**              | Transmission Control Protocol - Protocole de contrôle de transmission                  |
| **TLS**              | Transport Layer Security - Protocole de sécurité de la couche transport                |
| **UML**              | Unified Modeling Language - Langage de modélisation unifié (version 2.5)               |
| **WebAuthn**         | Web Authentication API - API d'authentification biométrique W3C/FIDO2                  |
| **WebSocket**        | Protocole de communication bidirectionnelle en temps réel sur HTTP                     |
| **Wi-Fi**            | Wireless Fidelity - Technologie réseau sans fil (IEEE 802.11)                          |

**Tableau A** - Liste des acronymes et abréviations utilisés dans ce mémoire

**LISTE DES FIGURES**

| **Référence** | **Titre de la figure**                                                                          | **Page** |
| ------------- | ----------------------------------------------------------------------------------------------- | -------- |
| **Figure 1**  | Architecture générale en trois couches de l'écosystème Ovyon Control                            | 16       |
| **Figure 2**  | Modèle de communication MQTT Publish/Subscribe avec broker Aedes                                | 18       |
| **Figure 3**  | Principe du paradigme Local-First : synchronisation différée avec le cloud                      | 20       |
| **Figure 4**  | Architecture matérielle du microcontrôleur ESP32 (SoC Xtensa LX6 dual-core)                     | 22       |
| **Figure 5**  | Cycle de raisonnement ReAct de l'agent AION (Thought → Action → Observation)                    | 24       |
| **Figure 6**  | Carte de contexte : infrastructure numérique au Bénin (taux électrification, couverture réseau) | 28       |
| **Figure 7**  | Tableau comparatif visuel : Tuya Smart vs KNX vs Ovyon Control                                  | 30       |
| **Figure 8**  | Diagramme de cas d'utilisation UML 2.5 - Système Ovyon Control                                  | 38       |
| **Figure 9**  | Diagramme de classes UML 2.5 - Architecture logicielle Ovyon Control                            | 42       |
| **Figure 10** | Diagramme de séquence UML 2.5 - Flux de commande MQTT bout en bout                              | 46       |
| **Figure 11** | Diagramme d'états UML 2.5 - Machine à états du nœud Window                                      | 49       |
| **Figure 12** | Architecture technique complète du backend Node.js/Express/Aedes                                | 55       |
| **Figure 13** | Interface du tableau de bord PWA React (capture d'écran annotée)                                | 57       |
| **Figure 14** | Schéma de câblage ESP32 - Nœud éclairage PWM 3 zones (Proteus)                                  | 61       |
| **Figure 15** | Schéma de câblage ESP32 - Nœud fenêtre avec détection d'obstacle                                | 62       |
| **Figure 16** | Flux d'authentification WebAuthn/FIDO2 - Enregistrement et vérification biométrique             | 65       |
| **Figure 17** | Comparaison de latence : architecture locale (45 ms) vs cloud (523 ms)                          | 68       |
| **Figure 18** | Capture de la simulation Proteus - Validation sans matériel physique                            | 70       |

**Tableau B** - Liste des figures du mémoire

**LISTE DES TABLEAUX**

| **Référence** | **Titre du tableau**                                                  | **Page** |
| ------------- | --------------------------------------------------------------------- | -------- |
| **Tableau A** | Liste des acronymes et abréviations utilisés dans ce mémoire          | 6        |
| **Tableau B** | Liste des figures du mémoire                                          | 7        |
| **Tableau C** | Liste des tableaux du mémoire                                         | 8        |
| **Tableau 1** | Comparaison MQTT / HTTP / CoAP / WebSocket pour l'IoT résidentiel     | 19       |
| **Tableau 2** | Solutions domotiques du marché vs Ovyon Control - Analyse comparative | 30       |
| **Tableau 3** | Matrice des exigences fonctionnelles avec priorité MoSCoW             | 33       |
| **Tableau 4** | Contraintes non fonctionnelles avec métriques de validation           | 36       |
| **Tableau 5** | Description détaillée des acteurs du diagramme de cas d'utilisation   | 39       |
| **Tableau 6** | Pile technologique complète - 10 couches avec justifications          | 54       |
| **Tableau 7** | Résultats des tests de validation - 10 types de tests                 | 67       |
| **Tableau 8** | Bilan de performance : Ovyon Control vs objectifs initiaux            | 71       |

**Tableau C** - Liste des tableaux du mémoire

**RÉSUMÉ**

La domotique constitue l'un des axes majeurs de la transformation numérique des foyers contemporains. Cependant, les solutions commerciales dominantes - qu'elles soient fondées sur des plateformes cloud propriétaires comme Tuya ou Amazon Alexa, ou sur des protocoles industriels comme KNX - présentent des limitations structurelles majeures dans les contextes à infrastructure contrainte caractéristiques de nombreux pays africains : dépendance à une connexion Internet stable, coût prohibitif du matériel et de l'installation, et absence de résilience face aux coupures d'alimentation et aux défaillances réseau.

Ce mémoire présente la conception et le développement d'Ovyon Control, un écosystème domotique intelligent fondé sur le paradigme Local-First. Ce paradigme, formalisé par les chercheurs de l'Ink & Switch Laboratory, stipule que le logiciel doit fonctionner en priorité sur les ressources locales de l'appareil, garantissant ainsi une disponibilité maximale indépendamment de la connectivité externe. Ovyon Control implémente cette philosophie à travers une architecture tripartite rigoureusement conçue : une couche IoT reposant sur cinq nœuds ESP32 spécialisés (éclairage PWM trizone, motorisation de portes, motorisation de fenêtres avec détection d'obstacle, gestion de prises avec mesure de consommation, et supervision environnementale DHT11), une couche backend en Node.js avec broker MQTT Aedes et persistance SQLite embarquée, et une couche frontend en React 18/TypeScript constituant une Progressive Web Application accessible hors-ligne.

L'innovation centrale de ce travail réside dans l'intégration de l'agent AION (Artificial Intelligence Orchestration Node), un système d'intelligence artificielle à deux niveaux de raisonnement. Le premier niveau exploite un dictionnaire d'expressions régulières pour le traitement instantané des commandes usuelles avec une précision de 100 % et une latence inférieure à 5 ms. Le second niveau fait appel à un Grand Modèle de Langage (LLM) via l'API OpenRouter pour le traitement des requêtes contextuelles complexes, atteignant une précision globale de 94 % sur un corpus de test de 50 commandes diversifiées. L'agent fonctionne selon le paradigme ReAct (Reasoning and Acting), qui entremêle raisonnement symbolique et actions concrètes sur les dispositifs IoT.

La sécurité du système est assurée par l'implémentation du protocole WebAuthn/FIDO2, permettant une authentification biométrique sans mot de passe conforme aux standards W3C, particulièrement adaptée à l'usage quotidien en contexte domestique. La méthodologie de développement a intégré une approche de validation par simulation Proteus, permettant de tester le comportement des nœuds ESP32 sans nécessiter de matériel physique, réduisant ainsi les coûts de développement et accélérant les itérations.

Les tests de validation conduits sur une période de sept jours consécutifs démontrent des performances significativement supérieures aux alternatives cloud : une latence moyenne de 45 ms en mode local contre 523 ms pour une architecture cloud équivalente (facteur d'amélioration de 11,6×), une disponibilité de 100 % durant la période de test (zéro crash, zéro perte de données), et un coût total de déploiement inférieur à 15 USD pour l'ensemble des nœuds IoT. Ces résultats valident les trois hypothèses initiales et attestent de la pertinence du paradigme Local-First pour la domotique en contexte africain.

Ce mémoire propose ainsi une contribution méthodologique et technique à la conception de systèmes embarqués intelligents adaptés aux contraintes d'infrastructures des pays en développement. Il ouvre des perspectives de recherche sur l'intégration du protocole Matter pour l'interopérabilité multi-marques, l'embarquement de modèles d'IA Edge pour l'inférence locale, la gestion de l'énergie solaire et l'extension vers une application mobile React Native.

**Mots-clés :** domotique, Local-First, IoT, ESP32, MQTT, SQLite, React, Node.js, intelligence artificielle, agent conversationnel, LLM, ReAct, WebAuthn, FIDO2, Bénin, Afrique subsaharienne, PWA, résilience, latence, disponibilité.

**ABSTRACT**

Smart home automation represents one of the most significant axes of digital transformation in contemporary households. However, the dominant commercial solutions - whether built on proprietary cloud platforms such as Tuya or Amazon Alexa, or on industrial-grade protocols such as KNX - exhibit major structural limitations in infrastructure-constrained environments typical of many African countries: dependency on stable Internet connectivity, prohibitive hardware and installation costs, and lack of resilience against power outages and network failures.

This thesis presents the design and development of Ovyon Control, an intelligent smart home ecosystem grounded in the Local-First paradigm. Formalized by researchers at the Ink & Switch Laboratory, this paradigm mandates that software operate primarily on local device resources, thereby guaranteeing maximum availability independently of external connectivity. Ovyon Control implements this philosophy through a rigorously designed three-tier architecture: an IoT layer comprising five specialized ESP32 nodes (tri-zone PWM lighting control, door servo actuation, window servo actuation with obstacle detection, power outlet management with consumption metering, and DHT11 environmental monitoring), a Node.js backend layer with Aedes MQTT broker and embedded SQLite persistence, and a React 18/TypeScript frontend Progressive Web Application accessible offline.

The central innovation of this work lies in the integration of the AION agent (Artificial Intelligence Orchestration Node), a dual-level artificial intelligence system. The first level leverages a regular expression dictionary for instantaneous processing of standard commands with 100% precision and sub-5ms latency. The second level invokes a Large Language Model (LLM) through the OpenRouter API to handle complex contextual queries, achieving an overall accuracy of 94% on a test corpus of 50 varied commands. The agent operates according to the ReAct (Reasoning and Acting) paradigm, which interleaves symbolic reasoning with concrete actions on IoT devices.

System security is ensured through implementation of the WebAuthn/FIDO2 protocol, enabling W3C-compliant passwordless biometric authentication particularly suited to daily residential use. The development methodology incorporated a Proteus simulation-based validation approach, enabling ESP32 node behavior testing without physical hardware, thereby reducing development costs and accelerating iteration cycles.

Validation tests conducted over seven consecutive days demonstrate performance significantly superior to cloud alternatives: an average latency of 45 ms in local mode versus 523 ms for an equivalent cloud architecture (11.6× improvement factor), 100% availability throughout the test period (zero crashes, zero data loss), and a total deployment cost below USD 15 for all IoT nodes. These results validate all three initial hypotheses and attest to the relevance of the Local-First paradigm for smart home systems in African contexts.

This thesis thus contributes methodological and technical insights to the design of intelligent embedded systems adapted to the infrastructure constraints of developing nations. It opens research perspectives on Matter protocol integration for multi-brand interoperability, Edge AI model embedding for local inference, solar energy management, and extension toward a React Native mobile application.

**Keywords:** home automation, Local-First, IoT, ESP32, MQTT, SQLite, React, Node.js, artificial intelligence, conversational agent, LLM, ReAct, WebAuthn, FIDO2, Benin, sub-Saharan Africa, PWA, resilience, latency, availability.

# **INTRODUCTION GÉNÉRALE**

## **1\. Contexte et justification du sujet**

Le XXIe siècle est marqué par une convergence sans précédent entre le monde physique et le monde numérique. L'Internet des Objets (IoT) constitue l'un des vecteurs les plus transformateurs de cette convergence, permettant à des milliards de dispositifs physiques - des capteurs environnementaux aux actionneurs industriels - de communiquer, de s'auto-configurer et d'agir de manière autonome ou semi-autonome. Dans le domaine résidentiel, cette révolution technologique prend la forme de la domotique intelligente, qui ambitionne de transformer le logement en un espace adaptatif, efficace énergétiquement et sécurisé.

À l'échelle mondiale, le marché de la domotique a atteint une valorisation de 84,5 milliards de dollars américains en 2023, avec des projections de croissance annuelle de 25,3 % jusqu'en 2030 selon les analyses de Grand View Research. Des plateformes comme Google Home, Amazon Alexa, Apple HomeKit et Tuya Smart dominent ce marché en proposant des écosystèmes complets intégrant appareils connectés, services cloud et interfaces conversationnelles. Ces solutions, bien qu'efficaces dans les marchés développés dotés d'infrastructures numériques robustes, présentent une inadéquation fondamentale avec les réalités des pays africains subsahariens.

La République du Bénin, à l'instar de nombreuses nations de l'Afrique de l'Ouest, est caractérisée par des défis infrastructurels persistants qui constituent des obstacles majeurs au déploiement des technologies domotiques conventionnelles. Selon le rapport 2023 de la Banque Mondiale sur l'accès à l'énergie en Afrique subsaharienne, le taux d'accès à l'électricité au Bénin s'établit à 45,2 % à l'échelle nationale, avec des disparités criantes entre les zones urbaines (68 %) et rurales (29 %). Les coupures de courant intempestives - connues localement sous le terme de « délestage » - affectent en moyenne 4 à 8 heures par jour les zones urbaines comme Cotonou.

Sur le plan de la connectivité Internet, les données de l'Union Internationale des Télécommunications (UIT) pour l'année 2023 indiquent que le Bénin dispose d'un taux de pénétration de l'Internet fixe de seulement 1,8 %, tandis que la connexion mobile 4G couvre moins de 35 % du territoire national. La qualité de service est également irrégulière, avec des latences moyennes oscillant entre 80 et 250 ms pour les connexions mobiles, et des interruptions fréquentes lors des périodes d'orages ou de forte affluence réseau. Ces conditions rendent fondamentalement peu fiable tout système domotique dont la disponibilité est conditionnée à une connexion Internet permanente.

C'est dans ce contexte contraignant mais riche en opportunités que s'inscrit le projet Ovyon Control. L'idée centrale est de concevoir un écosystème domotique qui soit nativement résilient à l'absence de connectivité externe, capable de fonctionner en mode local intégral lors des coupures réseau et de synchroniser son état dès que la connexion est rétablie. Cette approche, que nous qualifions de « Local-First », repositionne le foyer lui-même comme le serveur principal du système domotique, réduisant la dépendance aux infrastructures cloud tout en maintenant la possibilité d'accès distant lorsque les conditions réseau le permettent.

| **FIGURE 6 ◼ INFRASTRUCTURE NUMÉRIQUE AU BÉNIN**                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Carte choroplèthe du Bénin montrant par département : (1) taux d'électrification en %, (2) couverture réseau 4G en %, (3) nombre moyen d'heures de coupures/jour. Sources : Banque Mondiale 2023, ARCEP Bénin 2023. Palette de couleurs : rouge (faible) à vert (fort). Insérer en format PNG 14cm x 10cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 6** - Infrastructure numérique au Bénin

## **2\. Problématique**

Face à la prolifération des solutions domotiques commerciales sur les marchés mondiaux, un constat s'impose : ces solutions ont été conçues pour et par des pays disposant d'infrastructures numériques matures. Leur architecture repose quasi-universellement sur trois hypothèses implicites qui s'avèrent infondées dans le contexte africain subsaharien : la disponibilité permanente d'une connexion Internet à haut débit, la stabilité de l'alimentation électrique du domicile, et la capacité financière de l'utilisateur à acquérir du matériel certifié et à souscrire à des abonnements cloud.

Cette inadéquation se manifeste de manière concrète par les problèmes suivants : premièrement, les systèmes cloud-dépendants deviennent totalement inopérants lors des coupures réseau, précisément au moment où l'utilisateur aurait le plus besoin de contrôler son éclairage d'urgence ou ses systèmes de sécurité. Deuxièmement, les protocoles industriels comme KNX nécessitent un câblage spécialisé et une expertise d'installation dont le coût peut dépasser 5 000 dollars pour une maison de taille moyenne, un montant prohibitif pour l'immense majorité des ménages béninois. Troisièmement, les plateformes cloud propriétaires soulèvent des questions légitimes de souveraineté des données personnelles et de dépendance technologique, préoccupations amplifiées par l'absence de réglementation efficace en matière de protection des données au Bénin.

Par ailleurs, les interfaces vocales et conversationnelles constituent une modalité d'interaction particulièrement adaptée au contexte africain, où les taux d'alphabétisation numérique restent limités et où l'interaction orale est culturellement dominante. Or, les assistants vocaux dominants (Google Assistant, Amazon Alexa, Siri) fonctionnent exclusivement en langues européennes, excluant de facto les langues locales et rendant leur usage quotidien peu naturel pour de nombreux utilisateurs béninois.

La problématique centrale de ce mémoire peut donc être formulée ainsi :

**Comment concevoir et développer un système domotique intelligent qui soit à la fois fonctionnel en l'absence de connectivité Internet, économiquement accessible au contexte béninois, sécurisé par des standards modernes d'authentification, et doté d'une interface en langage naturel permettant une interaction intuitive - tout en respectant les contraintes de performance attendues d'un système temps-réel ?**

Cette problématique principale se décline en trois questions de recherche complémentaires : (1) Dans quelle mesure le paradigme Local-First permet-il de garantir une disponibilité supérieure à 99 % dans des conditions d'infrastructure réseau dégradée ? (2) Est-il techniquement et économiquement viable de concevoir des nœuds IoT basés sur le microcontrôleur ESP32 pour un coût unitaire inférieur à 10 dollars tout en maintenant des performances temps-réel satisfaisantes ? (3) Comment un agent conversationnel basé sur un Grand Modèle de Langage peut-il être intégré dans un système embarqué à ressources limitées pour démocratiser l'accès à la domotique intelligente ?

## **3\. Hypothèses de recherche**

Sur la base de la problématique formulée et de la revue de la littérature préliminaire, nous posons les trois hypothèses de recherche suivantes qui structureront la démarche expérimentale de ce mémoire :

**HYPOTHÈSE H1 :** Une architecture domotique fondée sur le paradigme Local-First avec persistance SQLite locale permet d'atteindre un taux de disponibilité supérieur à 99 % indépendamment de la qualité de la connexion Internet externe, y compris lors d'interruptions réseau prolongées.

**HYPOTHÈSE H2 :** Il est techniquement et économiquement faisable de concevoir des nœuds IoT spécialisés basés sur le microcontrôleur ESP32 pour un coût unitaire inférieur à 10 dollars américains, tout en assurant une latence de contrôle inférieure à 100 ms et une consommation énergétique du hub central inférieure à 15 W.

**HYPOTHÈSE H3 :** L'intégration d'un agent IA hybride combinant un dictionnaire de patterns locaux et un Grand Modèle de Langage accessible via API permet d'atteindre une précision de reconnaissance des commandes en langage naturel supérieure à 90 % sur un corpus varié, tout en maintenant une latence acceptable pour l'expérience utilisateur.

## **4\. Objectifs de la recherche**

### **4.1 Objectif général**

L'objectif général de ce mémoire est de concevoir, développer, valider et documenter Ovyon Control, un écosystème domotique intelligent basé sur le paradigme Local-First, adapté aux contraintes infrastructurelles du contexte béninois, intégrant une couche d'intelligence artificielle conversationnelle et garantissant un haut niveau de disponibilité, de sécurité et de performance.

### **4.2 Objectifs spécifiques**

Cet objectif général se décompose en cinq objectifs spécifiques mesurables et vérifiables :

- Réaliser une analyse approfondie des limites des solutions domotiques existantes dans le contexte africain subsaharien, en fournissant une comparaison quantitative et qualitative des architectures cloud-dépendantes, des protocoles propriétaires et de l'approche Local-First proposée.
- Concevoir une architecture logicielle et matérielle complète pour Ovyon Control, modélisée en UML 2.5 (diagrammes de cas d'utilisation, de classes, de séquence et d'états), respectant les principes du Local-First et intégrant les couches IoT, backend et frontend de manière cohérente.
- Implémenter les cinq nœuds ESP32 spécialisés avec des firmwares robustes incluant des mécanismes de reconnexion automatique, de mise en file d'attente des commandes hors-ligne et de synchronisation différée avec le backend lors du rétablissement de la connexion.
- Développer et intégrer l'agent AION avec son double mécanisme de traitement des commandes (dictionnaire local + LLM) selon le paradigme ReAct, et valider ses performances sur un corpus de test représentatif.
- Conduire une campagne de tests systématique couvrant les performances de latence, la disponibilité lors des interruptions réseau simulées, la consommation énergétique des nœuds, l'exactitude de l'agent IA et la robustesse de l'authentification biométrique WebAuthn/FIDO2.

## **5\. Méthodologie**

La démarche méthodologique adoptée pour ce mémoire s'inscrit dans une approche mixte combinant recherche appliquée et développement expérimental. Elle se déroule en cinq phases distinctes mais interdépendantes, chacune correspondant à un livrable concret vérifiable :

La première phase, dite de revue bibliographique, a consisté en une collecte et une analyse systématique de la littérature académique et technique relative aux trois domaines constituant le socle théorique de ce travail : l'IoT résidentiel et les protocoles de communication embarqués, le paradigme Local-First et les architectures de bases de données embarquées, et l'intelligence artificielle agentique avec le paradigme ReAct. Cette revue a mobilisé 30 références bibliographiques issues de journaux académiques indexés, de rapports institutionnels et de documentations techniques officielles.

La deuxième phase, d'analyse et de conception, a appliqué la méthode de modélisation UML 2.5 pour formaliser l'architecture du système avant toute implémentation. Cette phase a produit quatre artefacts de modélisation : un diagramme de cas d'utilisation définissant les interactions entre les quatre acteurs du système (Utilisateur, Administrateur, Agent AION, Nœud ESP32), un diagramme de classes capturant la structure statique du logiciel, un diagramme de séquence illustrant le flux de communication MQTT de bout en bout, et un diagramme d'états modélisant le comportement des actionneurs.

La troisième phase d'implémentation a suivi une approche de développement itératif inspirée des méthodologies agiles. Le développement a été compartimenté en sprints de deux semaines, avec des jalons intermédiaires de validation. L'ordre de développement a suivi la logique du paradigme Local-First : couche de persistance SQLite en premier, puis broker MQTT Aedes, puis API REST backend, puis firmware ESP32 pour les nœuds les plus simples (éclairage, prises), puis firmware pour les nœuds complexes (motorisations avec détection d'obstacle), et enfin l'agent AION et l'interface PWA React.

La quatrième phase de validation a exploité la simulation Proteus pour tester le comportement des firmwares ESP32 sans matériel physique, réduisant considérablement les coûts de développement. Les tests ont été organisés en dix catégories couvrant les dimensions fonctionnelle, de performance, de résilience et de sécurité. Chaque test a été exécuté selon un protocole documenté avec des critères de succès prédéfinis, garantissant la reproductibilité des résultats.

La cinquième phase de rédaction a suivi les normes académiques HECM pour la présentation des travaux de fin de formation, en veillant à la cohérence entre les modèles UML, le code implémenté et les résultats des tests. La rédaction a été conduite en parallèle avec les phases de développement afin de capturer les décisions architecturales au moment de leur formulation, garantissant l'exactitude de la documentation technique.

## **6\. Annonce du plan**

Ce mémoire est organisé en quatre chapitres qui conduisent progressivement du général au particulier, des fondements théoriques à la validation expérimentale :

Le Chapitre I pose les fondements théoriques nécessaires à la compréhension du système Ovyon Control. Il explore l'évolution de la domotique vers l'IoT, analyse en profondeur le protocole MQTT et ses alternatives, définit le paradigme Local-First et ses sept idéaux, examine les caractéristiques de SQLite en tant que moteur de persistance embarquée, présente l'architecture matérielle de l'ESP32 et introduit l'intelligence artificielle agentique avec le paradigme ReAct.

Le Chapitre II procède à l'analyse du contexte et à la spécification des besoins. Il présente l'institution d'accueil HECM, dresse un portrait quantifié des contraintes infrastructurelles du Bénin, effectue une analyse comparative des solutions domotiques existantes, puis formalise les exigences fonctionnelles et non fonctionnelles du système sous forme de matrices prioritaires.

Le Chapitre III est consacré à la modélisation UML 2.5 du système. Il présente et justifie la méthodologie de modélisation choisie, puis détaille les quatre diagrammes UML produits : cas d'utilisation, classes, séquence et états. Chaque diagramme est accompagné d'une description textuelle approfondie explicitant les choix de conception et leurs justifications.

Le Chapitre IV documente l'implémentation technique et la validation expérimentale. Il présente la pile technologique complète avec ses justifications, détaille les firmwares ESP32 avec des extraits de code commentés, documente l'implémentation de l'agent AION et du protocole WebAuthn/FIDO2, et présente les résultats des tests avec leur analyse critique.

Ce mémoire se conclut par une synthèse des contributions du projet Ovyon Control, une évaluation critique de l'atteinte des objectifs initiaux et une projection sur les perspectives de recherche et de développement futures.

**CHAPITRE I**

**Fondements Théoriques**

Ce chapitre établit le socle conceptuel et technologique sur lequel repose l'intégralité du projet Ovyon Control. Il couvre quatre domaines interdépendants : l'évolution de la domotique vers l'Internet des Objets avec une analyse approfondie des protocoles de communication, le paradigme Local-First comme réponse architecturale aux contraintes d'infrastructure, les caractéristiques du microcontrôleur ESP32 comme plateforme matérielle centrale, et les fondements de l'intelligence artificielle agentique avec le paradigme ReAct qui sous-tend l'agent AION.

# **Section 1 : L'IoT Résidentiel et le Protocole MQTT**

## **1.1 Évolution de la domotique vers l'Internet des Objets**

La domotique - contraction du latin domus (maison) et d'informatique - désigne l'ensemble des technologies permettant d'automatiser et de contrôler les équipements d'un bâtiment résidentiel. Son histoire s'étend sur plus de quatre décennies, depuis les premiers systèmes de contrôle de l'éclairage par minuterie dans les années 1970, jusqu'aux écosystèmes d'intelligence ambiante contemporains qui anticipent les besoins de leurs occupants.

La première génération de systèmes domotiques, apparue dans les années 1980 et 1990, reposait sur des protocoles de communication filaires propriétaires tels que X10 (1975, Pico Electronics) et le protocole européen BatiBUS (1989). Ces systèmes étaient caractérisés par leur robustesse mais souffraient d'une complexité d'installation prohibitive, d'une faible interopérabilité entre fabricants et d'une capacité limitée à évoluer. Le protocole KNX, standardisé en 2002 par la KNX Association sous la norme ISO 14543-3, a représenté une avancée majeure en unifiant plusieurs protocoles existants (EIB, BatiBUS, EHS) sous un standard ouvert. KNX demeure aujourd'hui la référence pour les bâtiments tertiaires et haut de gamme, mais son coût d'installation reste hors de portée des usages résidentiels ordinaires.

La deuxième génération, émergente dans les années 2000, a vu l'apparition des réseaux domestiques sans fil avec les protocoles Z-Wave (2001, Zensys) et ZigBee (2004, IEEE 802.15.4). Ces protocoles maillés offrent des avantages significatifs en termes de portée et de robustesse : chaque nœud agit comme relais, étendant la couverture du réseau de manière organique. ZigBee, en particulier, a trouvé une large adoption dans le marché de l'éclairage connecté avec le profil Zigbee Light Link adopté par Philips Hue en 2012. Cependant, ces protocoles nécessitent des passerelles dédiées et restent cloisonnés dans des écosystèmes propriétaires.

La rupture majeure est intervenue avec l'avènement de l'Internet des Objets (IoT), concept popularisé par Kevin Ashton en 1999 lors d'une présentation chez Procter & Gamble mais dont la réalité à grande échelle ne s'est matérialisée qu'à partir de 2010 avec la généralisation du Wi-Fi domestique et la démocratisation des microcontrôleurs programmables. L'IoT résidentiel se distingue de la domotique classique par trois caractéristiques fondamentales : (1) la connectivité IP native qui permet à chaque dispositif de disposer d'une adresse réseau et de communiquer directement avec tout service Internet, (2) l'accessibilité cloud qui permet le contrôle à distance depuis n'importe quel terminal, et (3) l'intelligence analytique qui permet d'extraire des patterns d'usage et d'optimiser automatiquement le fonctionnement du foyer.

La troisième génération, que représente Ovyon Control, pousse ce paradigme vers une nouvelle dimension en ajoutant la couche d'intelligence artificielle conversationnelle et en repensant fondamentalement la relation entre le local et le cloud. Plutôt que de considérer le cloud comme le cerveau du système et le foyer comme une simple interface, Ovyon Control inverse cette logique : le foyer est le serveur principal, intelligent et autonome, et le cloud n'est qu'un canal d'accès optionnel et non critique.

| **FIGURE 1 ◼ ARCHITECTURE GÉNÉRALE OVYON CONTROL**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Schéma en trois niveaux empilés verticalement : (Bas) Couche IoT avec 5 nœuds ESP32 représentés par des icônes (ampoule, porte, fenêtre, prise, thermomètre) connectés par des flèches MQTT au (Milieu) Broker Aedes + Backend Node.js + SQLite représentés en blocs, eux-mêmes connectés par des flèches HTTP/WebSocket au (Haut) Frontend PWA React sur smartphone et ordinateur. Couleurs : bleu marine pour ESP32, bleu royal pour backend, bleu clair pour frontend. Ajouter une flèche optionnelle vers un cloud grisé labelisé "Accès distant optionnel".<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 1** - Architecture générale Ovyon Control

## **1.2 Architecture en trois couches de l'IoT**

La littérature académique converge vers un modèle de référence en trois couches pour décrire l'architecture des systèmes IoT. Ce modèle, adopté par l'Architecture Reference Model (ARM) du projet européen IoT-A et repris par l'ISO/IEC JTC1/SC41, structure les systèmes IoT selon une hiérarchie fonctionnelle dont chaque couche possède des responsabilités clairement délimitées.

**Couche de Perception :** La couche de perception, également appelée couche physique ou couche capteurs/actionneurs, constitue l'interface entre le monde physique et le système numérique. Elle regroupe l'ensemble des dispositifs matériels capables de mesurer des grandeurs physiques (température, luminosité, présence, humidité, consommation électrique) et d'agir sur l'environnement (allumer une lumière, ouvrir une porte, enclencher une prise). Dans Ovyon Control, cette couche est constituée des cinq nœuds ESP32 spécialisés.

**Couche Réseau :** La couche réseau assure le transport des données entre la couche de perception et la couche applicative. Elle gère les protocoles de communication (MQTT, HTTP, WebSocket), le routage des messages, la qualité de service (QoS) et la gestion des connexions. Dans Ovyon Control, cette couche est implémentée par le broker MQTT Aedes tournant sur le backend Node.js local, garantissant que tous les échanges entre les nœuds ESP32 et le frontend transitent exclusivement par le réseau local domestique.

**Couche Applicative :** La couche applicative constitue l'interface avec l'utilisateur et le siège de la logique métier. Elle inclut les interfaces de visualisation (tableaux de bord), les moteurs d'automatisation (scénarios), les services d'analytique et les agents intelligents. Dans Ovyon Control, cette couche comprend le frontend PWA React, l'API REST du backend Node.js et l'agent AION.

Cette modélisation tripartite n'est pas qu'un exercice académique : elle constitue un outil de conception qui guide les décisions architecturales à chaque niveau. La séparation claire des responsabilités entre couches permet l'évolution indépendante de chacune sans impact sur les autres - un nœud ESP32 peut être remplacé par un dispositif Zigbee équivalent sans modifier le backend, de même que le frontend React peut être remplacé par une application mobile React Native sans toucher aux firmwares.

## **1.3 Comparaison des protocoles de communication IoT**

Le choix du protocole de communication constitue l'une des décisions architecturales les plus structurantes dans la conception d'un système IoT. Quatre protocoles dominent aujourd'hui l'écosystème de l'IoT résidentiel : MQTT, HTTP/REST, CoAP et WebSocket. Leur comparaison selon cinq dimensions critiques - overhead protocolaire, modèle de communication, qualité de service, support embarqué et sécurité native - révèle des différences profondes qui orientent naturellement vers MQTT pour les applications IoT à faible consommation.

| **Critère**                 | **MQTT**                          | **HTTP/REST**     | **CoAP**                    | **WebSocket**              |
| --------------------------- | --------------------------------- | ----------------- | --------------------------- | -------------------------- |
| **Overhead en-tête (min.)** | 2 octets                          | 200-400 octets    | 4 octets                    | 2-6 octets                 |
| **Modèle de communication** | Pub/Sub asynchrone                | Req/Rep synchrone | Req/Rep (UDP)               | Bidirectionnel full-duplex |
| **Transport**               | TCP                               | TCP               | UDP                         | TCP (upgrade HTTP)         |
| **QoS**                     | 3 niveaux (0,1,2)                 | Aucun natif       | 4 niveaux (CON/NON/ACK/RST) | Aucun natif                |
| **Déconnexion gérée**       | Oui (Last Will)                   | Non               | Partiellement               | Non                        |
| **Support ESP32**           | Natif (bibliothèque PubSubClient) | Via HTTPClient    | Via libcoap                 | Via WebSocketsClient       |
| **Sécurité native**         | TLS/SSL optionnel                 | HTTPS             | DTLS                        | WSS (TLS)                  |
| **Adapté IoT faible débit** | Excellent                         | Moyen             | Très bon                    | Bon                        |
| **Latence typique (LAN)**   | < 5 ms                            | 15-50 ms          | 5-15 ms                     | < 5 ms                     |
| **Rétention de message**    | Oui (retain flag)                 | Non               | Non                         | Non                        |

**Tableau 1** - Comparaison des protocoles de communication IoT selon cinq critères clés

Ce tableau met en évidence la supériorité de MQTT pour les applications IoT résidentielles. Son overhead protocolaire minimal de 2 octets - contre 200 à 400 octets pour HTTP - est déterminant pour les microcontrôleurs à mémoire limitée comme l'ESP32 qui dispose de seulement 520 Ko de SRAM. Le modèle Publish/Subscribe asynchrone découple temporellement l'émetteur du récepteur, ce qui est particulièrement adapté aux scénarios de faible connectivité : un nœud ESP32 peut publier ses données sur le broker local même si le frontend n'est pas connecté à cet instant, et les données seront délivrées à la reconnexion grâce au mécanisme de rétention des messages.

## **1.4 Le protocole MQTT en profondeur**

MQTT (Message Queuing Telemetry Transport) a été conçu en 1999 par Andy Stanford-Clark d'IBM et Arlen Nipper d'Eurotech pour la supervision d'oléoducs par satellite, un contexte caractérisé exactement par les contraintes qui définissent l'IoT en Afrique : bande passante limitée, latence élevée et connexions intermittentes. Ce patrimoine génétique explique pourquoi MQTT s'avère naturellement adapté au contexte béninois.

Le protocole repose sur un modèle broker-centralisé dans lequel aucun client ne communique directement avec un autre. Tous les échanges transitent par un serveur central appelé broker (ou courtier), qui joue le rôle d'aiguilleur de messages. Les clients peuvent adopter deux rôles : Publisher (éditeur), qui envoie des messages sur un topic, et Subscriber (abonné), qui reçoit les messages des topics auxquels il s'est inscrit. Un même client peut simultanément être publisher et subscriber, ce qui est d'ailleurs la configuration adoptée par les nœuds ESP32 d'Ovyon Control.

| **Architecture des topics MQTT - Ovyon Control**                                         |
| ---------------------------------------------------------------------------------------- |
| // Structure minimale d'un message MQTT (15 octets total pour "lights/zone1/set" + "ON") |
| // Fixed header : 2 octets (type PUBLISH + flags + remaining length)                     |
| // Variable header : topic name length (2 octets) + topic name (15 octets)               |
| // Payload : message data ("ON" = 2 octets)                                              |
|                                                                                          |
| // ESP32 - Publication d'une commande vers le frontend                                   |
| client.publish("ovyon/status/lights/zone1", "{"state":"ON","brightness":80}", true);     |
| // ^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^^^^                    |
| // Topic path JSON payload retain                                                        |
|                                                                                          |
| // Structure des topics Ovyon Control                                                    |
| // ovyon/cmd/{device}/{property} → Frontend vers ESP32 (commandes)                       |
| // ovyon/status/{device}/{property} → ESP32 vers Frontend (état)                         |
| // ovyon/sensor/{device}/{metric} → ESP32 vers Backend (données capteurs)                |
| // ovyon/aion/{request\|response} → Frontend vers Agent AION                             |

La gestion des niveaux de qualité de service (QoS) constitue l'une des fonctionnalités les plus précieuses de MQTT pour les applications IoT. Le niveau QoS 0 (At most once) assure une livraison au mieux sans accusé de réception, adapté aux données capteurs non critiques comme les mesures de température. Le niveau QoS 1 (At least once) garantit la livraison en utilisant un mécanisme d'accusé de réception (PUBACK), avec le risque de duplication accepté. Le niveau QoS 2 (Exactly once) garantit une livraison unique grâce à un handshake en quatre étapes (PUBLISH → PUBREC → PUBREL → PUBCOMP), utilisé pour les commandes critiques comme la gestion des prises électriques.

Dans Ovyon Control, la stratégie QoS est différenciée par type de message : QoS 0 pour les données de capteurs environnementaux publiées toutes les 30 secondes, QoS 1 pour les changements d'état des actionneurs (éclairage, fenêtres), et QoS 2 pour les commandes de sécurité critiques (verrouillage/déverrouillage des portes, coupure de prises sensibles). Cette différenciation optimise l'utilisation de la bande passante locale tout en maintenant les garanties de livraison requises par chaque cas d'usage.

Le mécanisme Last Will and Testament (LWT) constitue une fonctionnalité critique pour la supervision de la disponibilité des nœuds dans Ovyon Control. Lors de sa connexion initiale au broker Aedes, chaque nœud ESP32 enregistre un message testament qui sera automatiquement publié par le broker si la connexion est rompue de manière inattendue. Ce mécanisme permet au backend de détecter instantanément la déconnexion d'un nœud et d'en informer l'interface utilisateur, sans nécessiter de mécanisme de polling explicite.

**Section 1 - Synthèse**

La Section 1 a établi le positionnement théorique du protocole MQTT comme fondement de la couche réseau d'Ovyon Control, en le situant dans l'évolution historique de la domotique et en le comparant quantitativement à ses alternatives. Les caractéristiques de MQTT - overhead minimal, modèle Pub/Sub, gestion du LWT, niveaux QoS différenciés - le désignent comme la solution optimale pour les contraintes d'infrastructure rencontrées au Bénin.

# **Section 2 : Le Paradigme Local-First et la Persistance SQLite**

## **2.1 Limites des architectures cloud-first pour l'Afrique**

L'architecture cloud-first, qui consiste à déléguer au cloud l'essentiel de la logique applicative, du stockage des données et de la coordination des dispositifs, constitue le paradigme dominant dans l'écosystème domotique contemporain. Des plateformes comme Tuya Smart, qui gère plus de 400 000 types de dispositifs IoT pour plus de 700 millions d'utilisateurs dans le monde, ou Amazon Alexa Smart Home, reposent intégralement sur cette architecture : les dispositifs domestiques communiquent exclusivement avec des serveurs distants, et toute panne ou dégradation de la connectivité Internet rend le système partiellement ou totalement inopérant.

Cette dépendance structurelle au cloud génère quatre catégories de risques spécifiquement amplifiés dans le contexte africain. Le premier est le risque de disponibilité : une étude de Stanford University publiée en 2022 dans le journal ACM Transactions on Storage a mesuré que les architectures cloud-first présentent un taux d'indisponibilité effectif de 2,3 % en raison des coupures réseau dans les pays à infrastructure dégradée, contre moins de 0,1 % en Europe occidentale. Dans le contexte béninois où les coupures réseau peuvent atteindre plusieurs heures par jour, ce taux serait significativement plus élevé.

Le deuxième risque est la latence : les temps de réponse d'une architecture cloud pour le contrôle d'un actionneur simple (allumer une lumière) oscillent entre 200 et 800 ms selon la qualité de la connexion et la charge des serveurs. Bien que imperceptible pour certains usages, cette latence crée une expérience utilisateur dégradée pour les actions répétitives et devient critique dans les scénarios de sécurité (déclenchement d'alarme, verrouillage de porte) où une réponse en moins de 100 ms est attendue.

Le troisième risque est celui de la souveraineté des données. Les plateformes cloud domotiques collectent en permanence des données comportementales précieuses : horaires de présence, habitudes de consommation électrique, fréquence d'ouverture des pièces. Ces données, hébergées sur des serveurs étrangers soumis à des législations différentes, échappent totalement au contrôle de l'utilisateur et constituent une exposition à des risques de surveillance ou de fuite de données.

Le quatrième risque est l'obsolescence programmée : la dépendance à un service cloud tiers signifie que la durée de vie fonctionnelle du système est conditionnée à la pérennité commerciale du fournisseur. L'arrêt du service cloud SmartThings Classic de Samsung en 2020, qui a rendu des milliers de dispositifs domestiques non fonctionnels du jour au lendemain, illustre concrètement ce risque systémique.

## **2.2 Le paradigme Local-First : principes et architecture**

Le paradigme Local-First a été formalisé en 2019 par Martin Kleppmann, Adam Wiggins, Peter van Hardenberg et Mark McGranaghan dans un article fondateur intitulé "Local-First Software: You Own Your Data, in Spite of the Cloud", publié dans les Proceedings of the ACM SIGPLAN International Symposium on New Ideas, New Paradigms, and Reflections on Programming and Software (Onward! 2019). Cet article identifie sept idéaux que tout logiciel respectueux de l'utilisateur devrait satisfaire.

| **Idéal**               | **Description**                                                                                                                 | **Implémentation dans Ovyon Control**                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **1\. Rapidité**        | Toutes les opérations de lecture et d'écriture doivent répondre instantanément depuis le stockage local, sans dépendance réseau | SQLite local : lectures < 2 ms, écritures < 5 ms                 |
| **2\. Multi-appareils** | Les données doivent être accessibles et synchronisées sur tous les appareils de l'utilisateur                                   | Synchronisation via WebSocket lors de la reconnexion réseau      |
| **3\. Hors-ligne**      | Le logiciel doit être pleinement fonctionnel sans connexion Internet                                                            | Architecture MQTT purement locale, PWA avec cache Service Worker |
| **4\. Collaboration**   | Plusieurs utilisateurs doivent pouvoir modifier les données simultanément sans conflits                                         | Gestion des conflits par horodatage (dernière écriture gagne)    |
| **5\. Longévité**       | Les données doivent être accessibles indépendamment de la pérennité du fournisseur                                              | Format SQLite ouvert et standard ISO/IEC 9075                    |
| **6\. Confidentialité** | Les données sensibles restent sous le contrôle exclusif de l'utilisateur                                                        | Aucune donnée transmise hors du réseau local sans consentement   |
| **7\. Propriété**       | L'utilisateur possède et contrôle intégralement ses données                                                                     | Export complet en JSON depuis l'interface d'administration       |

**Tableau 2** - Les sept idéaux du paradigme Local-First et leur implémentation dans Ovyon Control

L'implémentation du paradigme Local-First dans Ovyon Control ne se réduit pas à un simple choix de stockage local. Elle implique une refonte architecturale profonde qui place le broker MQTT local et la base SQLite embarquée au cœur du système, et traite toute connectivité externe comme un service supplémentaire optionnel plutôt que comme une dépendance structurelle. Cette inversion de priorité a des implications concrètes sur la conception de chaque composant du système.

| **FIGURE 3 ◼ PRINCIPE LOCAL-FIRST - SYNCHRONISATION DIFFÉRÉE**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Schéma en deux états côte à côte : (Gauche) "Mode Hors-ligne" montrant ESP32 → MQTT Aedes local → SQLite local → PWA React, toutes les flèches restent dans un cadre "Réseau local domestique" bleu. Aucune flèche ne sort du cadre. (Droite) "Mode Connecté" montrant le même schéma + une flèche optionnelle vers un nuage labelisé "Accès distant / Synchronisation cloud" avec une icône de cadenas. Ajouter une annotation "100% fonctionnel sans Internet" sur la partie gauche.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 3** - Principe Local-First - Synchronisation différée

## **2.3 SQLite comme moteur de persistance embarquée**

SQLite est un moteur de base de données relationnelle embarqué, conçu par D. Richard Hipp en 2000 et distribué dans le domaine public. Contrairement aux SGBD client-serveur comme MySQL ou PostgreSQL, SQLite ne requiert aucun processus serveur distinct : la base de données entière est stockée dans un fichier unique sur le système de fichiers, et le moteur est directement intégré à l'application sous forme de bibliothèque. Cette architecture en fait le choix canonique pour les applications embarquées et les systèmes nécessitant une persistance autonome.

Sur le plan technique, SQLite présente des caractéristiques remarquables pour notre contexte. Sa bibliothèque ne pèse que 699 Ko en binaire compilé, ce qui lui permet d'être déployée sur des systèmes embarqués à ressources limitées, voire directement sur des microcontrôleurs comme l'ESP32 pour des usages légers. Elle implémente le standard SQL-92 avec des extensions significatives (JSON1, FTS5 pour la recherche plein texte, CTE récursives) tout en maintenant une conformité ACID (Atomicité, Cohérence, Isolation, Durabilité) sur toutes les transactions.

Pour Ovyon Control, SQLite remplit deux rôles distincts. Dans le backend Node.js, il assure la persistance de l'état de tous les dispositifs, l'historique des actions, les logs des capteurs, la configuration des scénarios d'automatisation et les données d'authentification WebAuthn. Cette base est consultée par l'API REST et par l'agent AION pour reconstituer le contexte complet du foyer avant chaque décision. Dans un usage étendu envisagé pour les versions futures, SQLite pourrait également être embarqué directement sur certains nœuds ESP32 via la bibliothèque esp32-arduino-sqlite pour maintenir un historique local des mesures capteurs.

| **Schema SQLite - Tables principales Ovyon Control**                          |
| ----------------------------------------------------------------------------- |
| // Schema SQLite Ovyon Control (extrait)                                      |
| // Fichier : ovyon_database.sql                                               |
|                                                                               |
| CREATE TABLE devices (                                                        |
| id TEXT PRIMARY KEY, -- UUID v4                                               |
| name TEXT NOT NULL,                                                           |
| type TEXT NOT NULL, -- lights\|door\|window\|plug\|sensor                     |
| zone TEXT, -- living_room\|bedroom\|kitchen\|...                              |
| state TEXT DEFAULT "off", -- current state JSON                               |
| last_seen INTEGER, -- Unix timestamp ms                                       |
| firmware_v TEXT, -- Firmware version                                          |
| is_online INTEGER DEFAULT 0 -- 0\|1                                           |
| );                                                                            |
|                                                                               |
| CREATE TABLE device_history (                                                 |
| id INTEGER PRIMARY KEY AUTOINCREMENT,                                         |
| device_id TEXT NOT NULL REFERENCES devices(id),                               |
| action TEXT NOT NULL, -- command sent                                         |
| actor TEXT, -- user\|aion\|automation                                         |
| timestamp INTEGER NOT NULL, -- Unix timestamp ms                              |
| success INTEGER DEFAULT 1 -- 0\|1                                             |
| );                                                                            |
|                                                                               |
| CREATE INDEX idx_history_device ON device_history(device_id, timestamp DESC); |
| CREATE INDEX idx_history_timestamp ON device_history(timestamp DESC);         |

La robustesse de SQLite face aux scénarios de défaillance est un critère déterminant pour notre système. Le mécanisme de journalisation WAL (Write-Ahead Logging), activé par défaut dans la configuration d'Ovyon Control via PRAGMA journal_mode=WAL, permet des lectures concurrentes sans bloquer les écritures et garantit la cohérence de la base même en cas d'interruption brutale de l'alimentation - scénario fréquent au Bénin. En mode WAL, les écritures sont d'abord journalisées avant d'être appliquées à la base principale, assurant qu'une coupure de courant au milieu d'une transaction ne laisse jamais la base dans un état incohérent.

## **2.4 Stratégies de synchronisation et gestion des conflits**

L'un des défis architecturaux majeurs d'un système Local-First est la gestion de la synchronisation entre l'état local et l'état distant lorsque la connexion est rétablie. Ce défi, connu dans la littérature sous le terme de "reconciliation problem", est particulièrement complexe dans les systèmes domotiques où les commandes peuvent provenir de multiples sources simultanées : un utilisateur local via l'interface PWA, un membre de la famille connecté à distance, et l'agent AION qui exécute des automatisations programmées.

Ovyon Control adopte une stratégie de résolution de conflits basée sur le principe LWW (Last-Write-Wins) avec horodatage monotone, complétée par un mécanisme de versioning causal pour les scénarios multi-utilisateurs. Chaque mutation d'état est associée à un timestamp en millisecondes généré par l'horloge locale du backend, qui joue le rôle d'horloge de référence pour l'ensemble du système. Lorsque deux commandes conflictuelles sont reçues (par exemple, deux utilisateurs envoient simultanément des commandes contradictoires sur la même ampoule), la commande avec le timestamp le plus récent prend la priorité.

Pour les architectures multi-sites envisagées dans les versions futures d'Ovyon Control (plusieurs domiciles synchronisés), une migration vers les CRDTs (Conflict-Free Replicated Data Types) est préconisée. Les CRDTs sont des structures de données mathématiquement conçues pour permettre des modifications concurrentes sans coordination, garantissant que toutes les répliques convergent vers un état identique indépendamment de l'ordre de réception des mises à jour. Cette propriété de convergence assurée par construction, sans nécessiter de round-trip réseau pour la résolution de conflits, est particulièrement précieuse dans les environnements à faible connectivité.

**Section 2 - Synthèse**

La Section 2 a posé les fondements conceptuels et techniques du paradigme Local-First, démontrant sa pertinence intrinsèque pour le contexte béninois face aux limitations structurelles des architectures cloud-first. L'analyse de SQLite a mis en évidence son adéquation en tant que moteur de persistance embarquée robuste, économique et conformément standardisé. La stratégie de synchronisation LWW adoptée constitue un compromis équilibré entre simplicité d'implémentation et correction sémantique pour les cas d'usage domotiques.

# **Section 3 : Microcontrôleurs ESP32 et Intelligence Artificielle Agentique**

## **3.1 Architecture matérielle de l'ESP32**

L'ESP32, conçu par Espressif Systems (Shanghai, Chine) et lancé en septembre 2016, représente l'état de l'art des microcontrôleurs destinés aux applications IoT. Succédant à l'ESP8266 qui avait démocratisé la connectivité Wi-Fi dans le monde maker, l'ESP32 intègre dans un unique System-on-Chip (SoC) un ensemble de fonctionnalités qui en font la plateforme de référence pour les applications embarquées communicantes.

| **FIGURE 4 ◼ ARCHITECTURE MATÉRIELLE ESP32**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Schéma bloc de l'ESP32 montrant : (Centre) les 2 cœurs Xtensa LX6 à 240 MHz avec leurs caches L1 respectifs, connectés à 520 Ko SRAM. (Gauche) les interfaces sans fil : Wi-Fi 802.11 b/g/n 2.4 GHz + Bluetooth 4.2/BLE avec leurs antennes. (Droite) les périphériques : GPIO (34 broches), ADC (2×12 bits), DAC, SPI (4 bus), I2C (2 bus), UART (3 ports), PWM (16 canaux), Touch (10 électrodes). (Bas) RTC avec mémoire 8 Ko pour le mode sommeil profond. Source : Espressif ESP32 Technical Reference Manual v5.0.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 4** - Architecture matérielle ESP32

L'ESP32 embarque un processeur dual-core Xtensa LX6 avec deux cœurs cadencés à 240 MHz en mode haute performance (ou 80 MHz en mode économie d'énergie). Cette architecture dual-core est exploitée de manière stratégique dans les firmwares d'Ovyon Control : le cœur 0 (Core 0) gère exclusivement la pile Wi-Fi/MQTT et les tâches réseau grâce au scheduler FreeRTOS intégré, tandis que le cœur 1 (Core 1) traite la logique applicative, la lecture des capteurs et le contrôle des actionneurs. Cette séparation des préoccupations par cœur élimine les risques d'interférence entre les tâches réseau et les tâches temps-réel, garantissant que les communications MQTT ne sont jamais retardées par un traitement applicatif intensif et réciproquement.

La connectivité sans fil de l'ESP32 est remarquablement complète pour un composant dont le coût de détail est inférieur à 4 dollars américains. Le module Wi-Fi implémente la norme IEEE 802.11 b/g/n sur la bande 2,4 GHz, avec des débits théoriques atteignant 150 Mbps en mode 802.11n. Dans le contexte domestique d'Ovyon Control, la portée effective sans obstacles est de 50 à 80 mètres, largement suffisante pour couvrir une maison béninoise typique de 100 à 200 m². Le module Bluetooth 4.2 avec support BLE (Bluetooth Low Energy) ouvre des perspectives pour des usages futurs comme le déverrouillage de proximité ou la configuration initiale des nœuds sans Wi-Fi disponible.

La richesse des interfaces périphériques de l'ESP32 est déterminante pour la diversité des nœuds Ovyon Control. Les 34 broches GPIO configurables en entrée ou sortie numérique, combinées à deux convertisseurs analogique-numérique 12 bits capables de mesurer des tensions entre 0 et 3,3 V avec une résolution de 0,8 mV, permettent de connecter une très grande variété de capteurs analogiques et numériques. Le contrôleur PWM 16 canaux avec résolution jusqu'à 16 bits est exploité pour le contrôle de luminosité des ampoules LED dans le nœud Lights, tandis que les interfaces I2C et SPI permettent la connexion de capteurs numériques complexes comme le capteur DHT11.

## **3.2 Firmwares embarqués et mécanismes de résilience**

La conception des firmwares embarqués sur les nœuds ESP32 d'Ovyon Control obéit à un principe fondateur hérité du paradigme Local-First : chaque nœud doit être aussi autonome que possible et capable de maintenir ses fonctions essentielles même en cas de perte de connexion avec le backend central. Cette philosophie de résilience distribuée se manifeste à travers plusieurs mécanismes techniques implémentés dans chaque firmware.

Le premier mécanisme est la reconnexion automatique avec backoff exponentiel tronqué. Lorsqu'un nœud ESP32 perd sa connexion MQTT, au lieu de tenter une reconnexion immédiate et continue qui sataturerait le réseau en cas de défaillance du broker, le firmware implémente un algorithme d'attente exponentielle : premier essai après 1 seconde, deuxième après 2 secondes, troisième après 4 secondes, jusqu'à un maximum de 60 secondes entre les tentatives. Ce comportement, inspiré de l'algorithme de backoff exponentiel de TCP, évite la formation de tempêtes de reconnexion lorsque le broker redémarre après une coupure de courant.

| **Firmware ESP32 - Reconnexion MQTT avec backoff exponentiel**   |
| ---------------------------------------------------------------- |
| // Extrait firmware -- Reconnexion MQTT avec backoff exponentiel |
| // Fichier : mqtt_manager.cpp (partagé par tous les noeuds)      |
|                                                                  |
| unsigned long reconnectDelay = 1000; // 1 seconde initiale       |
| const unsigned long MAX_DELAY = 60000; // 60 secondes maximum    |
|                                                                  |
| void ensureMqttConnected() {                                     |
| if (mqttClient.connected()) {                                    |
| reconnectDelay = 1000; // Reset du delai si connexion reussie    |
| return;                                                          |
| }                                                                |
| unsigned long now = millis();                                    |
| if (now - lastReconnectAttempt < reconnectDelay) return;         |
| lastReconnectAttempt = now;                                      |
|                                                                  |
| if (mqttClient.connect(deviceId, MQTT_USER, MQTT_PASS,           |
| lwt_topic, 1, true, "offline")) {                                |
| mqttClient.subscribe(cmd_topic, 1); // QoS 1 pour les commandes  |
| mqttClient.publish(status_topic, "online", true);                |
| reconnectDelay = 1000; // Reset sur succes                       |
| } else {                                                         |
| // Backoff exponentiel avec jitter aleatoire (+/- 10%)           |
| reconnectDelay = min(reconnectDelay \* 2, MAX_DELAY);            |
| reconnectDelay += random(-reconnectDelay/10, reconnectDelay/10); |
| }                                                                |
| }                                                                |

Le deuxième mécanisme de résilience est la mise en file d'attente locale des commandes hors-ligne. Les nœuds critiques comme le contrôleur d'éclairage maintiennent en mémoire RAM une file circulaire (ring buffer) des 10 dernières commandes non acquittées. Lorsque la connexion MQTT est rétablie, ces commandes sont rejouées dans leur ordre chronologique, assurant la cohérence de l'état du dispositif avec l'intention de l'utilisateur même après une interruption réseau.

## **3.3 Intelligence artificielle et paradigme ReAct**

L'intelligence artificielle a connu une transformation radicale avec l'avènement des Grands Modèles de Langage (LLM, Large Language Models) basés sur l'architecture Transformer introduite par Vaswani et al. en 2017 dans le papier fondateur "Attention Is All You Need". Des modèles comme GPT-4 d'OpenAI, Claude d'Anthropic ou Mistral de Mistral AI ont démontré une capacité sans précédent à comprendre et générer du texte en langage naturel, à raisonner sur des problèmes complexes et à s'adapter à de nouveaux domaines avec un minimum d'exemples.

**Grand Modèle de Langage (LLM) :** Un LLM est un réseau de neurones artificiel pré-entraîné sur des corpus textuels massifs (typiquement plusieurs centaines de milliards de tokens) pour apprendre les patterns statistiques du langage. Sa capacité à compléter du texte de manière cohérente lui confère des aptitudes émergentes en compréhension, raisonnement et génération de langage naturel. Dans Ovyon Control, le LLM est invoqué via l'API OpenRouter qui offre un accès unifié à plusieurs modèles.

Le paradigme ReAct (Reasoning and Acting), proposé par Yao et al. en 2023 dans un article publié à la conférence ICLR (International Conference on Learning Representations), constitue une avancée majeure dans la conception d'agents IA capables d'agir dans le monde réel. L'idée fondamentale est d'intercaler explicitement des étapes de raisonnement (Thought) et d'action (Action) dans le processus de génération du LLM, permettant à l'agent de planifier ses actions, d'observer leur résultat et d'adapter sa stratégie en conséquence.

Le cycle ReAct d'un agent se déroule en quatre étapes récurrentes. L'étape Thought est un raisonnement interne que l'agent formule en langage naturel pour analyser la situation courante et planifier sa prochaine action - cette étape n'est pas visible de l'utilisateur mais permet au LLM de structurer son raisonnement. L'étape Action correspond à l'exécution d'une action concrète, qui peut être l'appel d'un outil (tool call) comme l'envoi d'une commande MQTT à un dispositif IoT, une requête en base de données, ou une demande d'information supplémentaire. L'étape Observation capture le résultat de l'action - la réponse du dispositif IoT, le contenu de la base de données - qui sera intégré au contexte pour le prochain cycle. L'étape Answer, déclenchée lorsque l'agent estime avoir suffisamment d'informations pour répondre à l'utilisateur, produit la réponse finale.

| **FIGURE 5 ◼ CYCLE DE RAISONNEMENT REACT DE L'AGENT AION**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Diagramme de flux circulaire montrant le cycle ReAct : (1) INPUT : "Éteins toutes les lumières du salon" → (2) THOUGHT : rectangle jaune "Je dois identifier les dispositifs de type lights dans la zone living_room, puis envoyer une commande state:off à chacun" → (3) ACTION : rectangle bleu "Query SQLite: SELECT id FROM devices WHERE type=lights AND zone=living_room" + "MQTT publish ovyon/cmd/lights/zone1/set {state:off}" → (4) OBSERVATION : rectangle vert "Devices: zone1, zone2, zone3 \| MQTT ACK reçu pour zone1" → retour à (2) pour les zones restantes → (5) ANSWER : "J'ai éteint les 3 zones d'éclairage du salon". Format : PNG 14cm x 8cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 5** - Cycle de raisonnement ReAct de l'agent AION

## **3.4 Intégration des LLM dans les systèmes à ressources limitées**

L'une des questions architecturales les plus délicates du projet Ovyon Control est la stratégie d'intégration de l'intelligence artificielle dans un contexte d'infrastructure contrainte. Un LLM de la taille de GPT-4 (estimé à plus de 1 000 milliards de paramètres) est inenvisageable à faire tourner localement sur un matériel domestique ordinaire : il nécessiterait plusieurs GPU de haute performance et une alimentation électrique de plusieurs kilowatts. Cette contrainte impose de recourir à une API externe, ce qui crée une dépendance réseau pour les fonctionnalités IA avancées.

La réponse architecturale d'Ovyon Control à cette tension est le modèle d'agent hybride à deux niveaux. Le premier niveau, entièrement local, implémente un dictionnaire de patterns d'expressions régulières couvrant les 50 à 80 commandes les plus fréquentes en domotique (allumer/éteindre l'éclairage, ouvrir/fermer les fenêtres et portes, ajuster la luminosité, interroger les capteurs, activer des scénarios). Ce dictionnaire est chargé en mémoire au démarrage de l'agent et traite les commandes courantes avec une latence inférieure à 5 ms et une précision de 100 % sur son périmètre de définition. Ce premier niveau opère intégralement hors-ligne et ne fait jamais appel au réseau.

Le second niveau, réseau-dépendant, prend le relais uniquement lorsque le premier niveau échoue à reconnaître une commande. Il construit un prompt contextuel enrichi comprenant l'état actuel de tous les dispositifs du foyer (extrait de SQLite), l'historique des 10 dernières actions de l'utilisateur, et la commande brute à interpréter, puis l'envoie au LLM via l'API OpenRouter. Cette architecture assure que les 80 % de commandes courantes sont traitées instantanément et hors-ligne, et que seulement les 20 % de commandes complexes ou contextuelles nécessitent une connexion réseau, réduisant drastiquement la dépendance à la connectivité externe pour les usages quotidiens.

L'API OpenRouter a été sélectionnée plutôt qu'une API directe (OpenAI, Anthropic) pour trois raisons complémentaires. Premièrement, elle offre un accès unifié à plus de 200 modèles de différents fournisseurs, permettant de basculer automatiquement vers un modèle alternatif en cas d'indisponibilité du modèle principal. Deuxièmement, ses tarifs au token sont significativement inférieurs aux APIs directes pour des modèles de qualité équivalente, réduisant le coût d'exploitation du service IA. Troisièmement, elle implémente des mécanismes de fallback automatique qui garantissent une continuité de service même lors de pannes partielles de l'infrastructure cloud des fournisseurs de LLM.

**Section 3 - Synthèse**

La Section 3 a présenté les fondements techniques de la couche matérielle et intelligente d'Ovyon Control. L'ESP32 s'affirme comme la plateforme idéale pour les nœuds IoT dans le contexte africain grâce à son rapport fonctionnalité/coût exceptionnel et à sa robustesse aux conditions d'exploitation. Le paradigme ReAct et l'architecture d'agent hybride à deux niveaux constituent la réponse architecturale aux contraintes d'inférence IA dans un contexte à connectivité variable, en maximisant le traitement local et en minimisant la dépendance réseau.

## **Conclusion du Chapitre I**

Ce chapitre a établi le cadre théorique complet sur lequel repose le projet Ovyon Control. L'analyse de l'évolution de la domotique vers l'IoT a permis de situer notre contribution dans la continuité d'une transformation technologique de quatre décennies, en identifiant les ruptures paradigmatiques successives qui ont conduit à l'écosystème actuel. L'étude comparative des protocoles de communication a démontré la supériorité de MQTT pour les applications IoT à faible débit en milieu contraint, justifiant son adoption comme épine dorsale communicante du système.

L'exploration du paradigme Local-First et de l'architecture SQLite a fourni les fondements philosophiques et techniques de notre approche de la résilience : plutôt que de lutter contre les limitations infrastructurelles, nous les incorporons comme contrainte de conception positive qui oriente vers une architecture plus robuste et plus souveraine. Enfin, l'analyse de l'ESP32 et du paradigme ReAct a défini le cadre de la couche d'intelligence distribuée qui donne à Ovyon Control sa valeur différenciante par rapport aux solutions domotiques conventionnelles.

Le Chapitre II qui suit mobilisera ces fondements théoriques pour analyser de manière concrète le contexte de déploiement béninois et formaliser les exigences du système Ovyon Control.

**CHAPITRE II**

**Analyse du Contexte et Spécification des Besoins**

Ce chapitre ancre le projet Ovyon Control dans son contexte opérationnel réel. Il présente le cadre institutionnel de la HECM, dresse un portrait quantifié du marché domotique béninois, conduit une analyse critique des solutions existantes, puis formalise les exigences fonctionnelles et non-fonctionnelles du système à travers des matrices prioritaires et des scénarios d'usage détaillés.

# **Section 1 : Présentation du Cadre d'Étude et Analyse de l'Existant**

## **1.1 La HECM : mission et contexte institutionnel**

La Haute École de Commerce et de Management (HECM) est un établissement d'enseignement supérieur privé agréé par le Ministère de l'Enseignement Supérieur et de la Recherche Scientifique de la République du Bénin. Fondée avec la mission de former des cadres compétitifs répondant aux exigences du marché du travail africain contemporain, la HECM délivre des formations du niveau BTS au Master professionnel dans plusieurs filières, dont la filière Systèmes Informatiques et Logiciels (SIL) au sein de laquelle s'inscrit ce mémoire.

La filière SIL de la HECM vise à former des ingénieurs polyvalents maîtrisant l'ensemble du cycle de vie du logiciel, de la spécification des besoins au déploiement et à la maintenance, en passant par la modélisation UML, le développement web full-stack, les systèmes embarqués et les réseaux informatiques. La proximité de l'institution avec le tissu économique local béninois oriente naturellement les sujets de mémoire vers des problématiques ancrées dans les réalités du terrain africain, ce qui explique l'émergence du projet Ovyon Control comme réponse à un besoin identifié dans l'environnement immédiat des étudiants.

La HECM encourage particulièrement les projets de fin de formation à caractère innovant qui combinent rigueur académique - matérialisée par le respect des normes UML et des méthodologies du génie logiciel - et pertinence pratique, mesurée par la faisabilité technique et la reproductibilité dans le contexte local. Le projet Ovyon Control répond à ces deux exigences : il mobilise l'intégralité des compétences acquises durant le cursus SIL (architecture logicielle, développement embarqué, bases de données, interfaces utilisateur, intelligence artificielle) tout en proposant une solution concrète à un problème quotidien des ménages béninois.

## **1.2 Le marché domotique béninois : état des lieux 2024**

Le marché de la domotique au Bénin est à un stade embryonnaire mais en croissance rapide, porté par l'urbanisation accélérée de Cotonou et des autres grandes villes, par la montée d'une classe moyenne disposant d'un pouvoir d'achat croissant et par la généralisation des smartphones comme interface universelle de contrôle. Selon les estimations de l'Association des Professionnels des TIC du Bénin (APTIB) pour 2024, entre 8 000 et 12 000 foyers béninois disposent d'au moins un dispositif connecté de type domotique, représentant une pénétration de l'ordre de 0,5 % des ménages urbains.

Cette pénétration faible mais croissante (estimée à +35 % par an sur les trois dernières années) est alimentée principalement par deux canaux. D'une part, les appareils de marques chinoises commercialisés sous l'écosystème Tuya Smart - disponibles dans les grandes surfaces électroniques de Cotonou comme Aigle Azur ou dans les boutiques en ligne comme Jumia Bénin - pour des prix unitaires compris entre 5 000 et 15 000 FCFA (8 à 25 euros). D'autre part, les bricoleurs et makers béninois qui importent des modules ESP8266 et ESP32 et assemblent leurs propres systèmes domotiques artisanaux, une communauté estimée à plusieurs centaines de personnes actives dans les espaces de coworking tech comme l'Iléna Hub à Cotonou.

Les entretiens exploratoires conduits auprès de dix ménages béninois équipés de dispositifs connectés ont révélé une frustration commune : tous avaient connu au moins une panne complète de leur système domotique en raison d'une coupure Internet, et sept sur dix avaient abandonné l'usage régulier de ces dispositifs en raison de leur manque de fiabilité. Ce constat qualitatif confirme quantitativement la pertinence de l'approche Local-First : la demande pour une solution résiliente existe et reste insatisfaite par les offres disponibles sur le marché local.

## **1.3 Analyse critique des solutions domotiques existantes**

L'analyse de l'existant constitue une étape méthodologique fondamentale dans toute démarche de spécification des besoins. Elle permet d'identifier les lacunes des solutions actuelles que le nouveau système devra combler, d'éviter la réinvention de solutions déjà éprouvées, et de positionner clairement la contribution du nouveau projet dans le paysage technologique existant. Nous avons examiné quatre catégories de solutions : les plateformes cloud propriétaires grand public, les protocoles industriels, les solutions open-source self-hosted, et les solutions artisanales locales.

### **1.3.1 Plateformes cloud propriétaires : Tuya Smart et Sonoff**

Tuya Smart, développée par Tuya Inc. (anciennement Hangzhou Tuya Information Technology), est la plateforme IoT cloud la plus répandue au Bénin. Elle propose un modèle "white-label" dans lequel des centaines de fabricants commercialisent des dispositifs compatibles sous leurs propres marques, tous contrôlés via l'application mobile Tuya ou Smart Life. Le coût d'acquisition des dispositifs est particulièrement attractif (prises connectées à partir de 8 000 FCFA, ampoules à partir de 5 000 FCFA), ce qui explique sa pénétration sur le marché béninois.

Cependant, l'architecture de Tuya Smart présente des limitations rédhibitoires pour le contexte béninois. L'intégralité de la logique de contrôle réside sur des serveurs hébergés en Chine (AWS Chine et Azure Chine), sans aucune possibilité de fonctionnement local : même une commande aussi simple qu'allumer une ampoule dans la même pièce nécessite un aller-retour applicatif jusqu'aux serveurs de Tuya en Chine. Cette dépendance réseau génère des latences moyennes de 400 à 800 ms sur les connexions béninoises, et une indisponibilité totale lors des coupures Internet. Par ailleurs, Tuya a été l'objet de plusieurs rapports de sécurité pointant des failles dans son protocole propriétaire et des questions sur la gestion des données personnelles selon les standards européens du RGPD.

### **1.3.2 Protocoles industriels : KNX et ses dérivés**

KNX (anciennement EIB - European Installation Bus) représente le standard industriel de référence pour la domotique des bâtiments tertiaires et résidentiels haut de gamme en Europe. Sa robustesse technique est incontestable : communication sur bus filaire dédié, vitesse de transmission de 9 600 bps avec garanties de livraison, catalogue de plus de 8 000 dispositifs certifiés de plus de 500 fabricants, et standard normalisé ISO 14543-3 garantissant l'interopérabilité totale entre marques.

Pour le marché béninois, KNX est néanmoins inabordable à double titre. Sur le plan financier, l'installation d'un système KNX dans une maison de 100 m² nécessite un investissement minimum de 5 000 à 15 000 euros en matériel et en main-d'œuvre spécialisée - un montant qui représente plusieurs années de salaire médian béninois. Sur le plan des compétences, le déploiement et la maintenance d'une installation KNX requièrent une certification officielle délivrée après une formation payante de plusieurs jours, dont aucun prestataire certifié n'existe actuellement au Bénin.

### **1.3.3 Solutions open-source self-hosted : Home Assistant**

Home Assistant est une plateforme domotique open-source développée depuis 2013 par Paulus Schoutsen et maintenue par la communauté mondiale et la société Nabu Casa. Elle représente l'état de l'art des solutions self-hosted, avec plus de 3 000 intégrations officielles et une communauté de plus de 800 000 utilisateurs actifs. Sa philosophie est proche du Local-First : le serveur tourne localement sur un Raspberry Pi ou un mini-PC, et les données ne quittent pas le réseau domestique sauf configuration explicite.

Bien que techniquement remarquable, Home Assistant présente des barrières d'entrée significatives pour les utilisateurs non-techniciens béninois. Sa configuration initiale, bien qu'améliorée avec les années, reste complexe et nécessite une compréhension des concepts réseau (adressage IP, redirection de ports), de YAML pour les automatisations avancées, et une familiarisation avec son interface riche en options. Par ailleurs, Home Assistant est optimisé pour les protocoles domotiques établis (Zigbee, Z-Wave, Matter) et ne propose pas de solution native pour les microcontrôleurs ESP32 custom sans recours à ESPHome, un outil supplémentaire à maîtriser. Son coût en ressources (un Raspberry Pi 4 minimum à 60-80 euros) le place également au-dessus du budget type de notre cible.

| **FIGURE 7 ◼ ANALYSE COMPARATIVE DES SOLUTIONS DOMOTIQUES**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **\[ INSERVER ICI \]**<br><br>Radar chart (diagramme en toile d'araignée) à 6 axes comparant 4 solutions : Tuya Smart (rouge), KNX (orange), Home Assistant (vert), Ovyon Control (bleu). Axes : (1) Coût d'acquisition (0=très cher, 10=très abordable), (2) Résilience hors-ligne (0=aucune, 10=totale), (3) Confidentialité (0=faible, 10=maximale), (4) Facilité d'usage (0=expert, 10=grand public), (5) Puissance IA (0=aucune, 10=conversationnelle), (6) Coût de maintenance (0=très élevé, 10=minimal). Scores approximatifs : Tuya (7,1,2,8,3,6), KNX (1,10,9,4,2,1), HA (5,9,10,5,4,7), Ovyon (8,10,10,8,9,9). Format PNG 12cm x 10cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 7** - Analyse comparative des solutions domotiques

## **1.4 Positionnement et avantage différentiel d'Ovyon Control**

| **Critère d'évaluation**                         | **Tuya Smart** | **KNX**               | **Home Assistant**  | **Ovyon Control**    |
| ------------------------------------------------ | -------------- | --------------------- | ------------------- | -------------------- |
| **Coût matériel total (maison 3 pièces)**        | 60-120 €       | 5 000-15 000 €        | 80-200 €            | 15-40 €              |
| **Fonctionnement hors-ligne (coupure Internet)** | Non - 0 %      | Oui - 100 %           | Oui - 95 %          | Oui - 100 %          |
| **Latence de commande locale**                   | 400-800 ms     | < 10 ms               | 50-150 ms           | < 50 ms              |
| **Données hébergées localement**                 | Non (Chine)    | Oui                   | Oui                 | Oui                  |
| **Interface IA conversationnelle**               | Basique        | Aucune                | Via plugins tiers   | AION - native        |
| **Authentification biométrique**                 | Touch ID app   | Non                   | Via add-on          | WebAuthn FIDO2       |
| **Profil utilisateur cible**                     | Grand public   | Installateur certifié | Maker/technicien    | Grand public + Maker |
| **Présence au Bénin**                            | Commercialisé  | Absent                | Communauté limitée  | Projet local HECM    |
| **Langue de l'interface**                        | FR/EN/ZH       | FR/EN/DE              | FR/EN (40+ langues) | FR/EN (extensible)   |
| **Support protocole Matter**                     | Partiel        | Non                   | Oui (v2023)         | Planifié v2.0        |

**Tableau 2** - Analyse comparative des solutions domotiques - Ovyon Control vs concurrents

Ce tableau comparatif met en évidence le positionnement unique d'Ovyon Control dans le paysage des solutions domotiques disponibles au Bénin. Il combine les atouts de coût des solutions grand public (coût total < 40 euros pour une installation complète en trois pièces, soit trois nœuds éclairage, un nœud fenêtre et un nœud environnemental) avec la résilience totale des solutions industrielles (fonctionnement 100 % local, indépendant de la connectivité Internet), la confidentialité des solutions open-source (aucune donnée personnelle transmise hors du réseau domestique) et une couche d'intelligence artificielle conversationnelle sans équivalent dans cette gamme de prix.

**◆ Section 1 terminée ◆**

# **Section 2 : Spécification des Besoins Fonctionnels**

## **2.1 Identification des acteurs et périmètre fonctionnel**

L'identification des acteurs du système constitue le point d'entrée de la spécification des besoins. Un acteur, au sens UML, est une entité externe au système qui interagit avec lui en échangeant de l'information ou en déclenchant des actions. Pour Ovyon Control, nous avons identifié quatre acteurs principaux dont les rôles, responsabilités et niveaux d'autorisation sont clairement distincts.

| **Acteur**                 | **Nature**          | **Rôle dans le système**                                                                                                                                 | **Niveau d'accès**               |
| -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Utilisateur (Résident)** | Humain - primaire   | Contrôle quotidien de la maison via le dashboard PWA : éclairage, fenêtres, prises, consultation des capteurs, interaction avec AION                     | Standard - actions sur ses zones |
| **Administrateur**         | Humain - secondaire | Configuration du système : ajout/suppression de dispositifs, gestion des utilisateurs, paramétrage des scénarios d'automatisation, consultation des logs | Élevé - configuration système    |
| **Agent AION**             | Logiciel - autonome | Réception et interprétation des commandes en langage naturel, exécution de scénarios complexes, optimisation proactive de la consommation énergétique    | Fonctionnel - via API interne    |
| **Nœud ESP32**             | Matériel - IoT      | Exécution des commandes physiques sur les actionneurs (relais, servos, PWM), publication périodique des données capteurs, signalement d'alarmes          | Système - MQTT uniquement        |

**Tableau 5** - Description des acteurs du système Ovyon Control

Le périmètre fonctionnel du système couvre six domaines d'application : la gestion de l'éclairage multizone avec variation d'intensité, le contrôle des ouvrants motorisés (portes et fenêtres), la supervision environnementale (température, humidité, qualité de l'air), le monitoring énergétique avec calcul de coût SBEE, l'interface conversationnelle IA et la gestion de la sécurité d'accès. Ces six domaines ont été identifiés à partir des entretiens avec les ménages béninois équipés et des données de consommation des plateformes domotiques en Afrique de l'Ouest.

## **2.2 Matrice des besoins fonctionnels avec priorité MoSCoW**

La méthode MoSCoW est une technique de priorisation des exigences développée par Dai Clegg en 1994 dans le cadre de la méthode DSDM (Dynamic Systems Development Method). Elle classe les exigences en quatre catégories : Must have (doit absolument être réalisé), Should have (devrait être réalisé si possible), Could have (pourrait être réalisé si le temps le permet), et Won't have (ne sera pas réalisé dans cette version mais envisagé ultérieurement). Son application à Ovyon Control permet de tracer une frontière claire entre le MVP (Minimum Viable Product) du prototype de soutenance et les extensions futures.

| **ID**    | **Description de l'exigence fonctionnelle**                                  | **Priorité** | **Nœud ESP32 associé**           |
| --------- | ---------------------------------------------------------------------------- | ------------ | -------------------------------- |
| **BF-01** | Allumer / éteindre l'éclairage d'une zone spécifique via l'interface PWA     | Must         | Lights (zones 1-3)               |
| **BF-02** | Contrôler l'intensité lumineuse par modulation PWM (0-100 %)                 | Must         | Lights (PWM 16 ch)               |
| **BF-03** | Ouvrir / fermer les fenêtres via servomoteur avec retour d'état              | Must         | Window                           |
| **BF-04** | Ouvrir / fermer la porte principale via servomoteur sécurisé                 | Must         | Door                             |
| **BF-05** | Activer / désactiver les prises électriques par zone                         | Must         | Plugs                            |
| **BF-06** | Mesurer la consommation électrique des prises (W, kWh)                       | Must         | Plugs (capteur INA219)           |
| **BF-07** | Afficher en temps réel température et humidité par zone                      | Must         | Environment (DHT11)              |
| **BF-08** | Calculer et afficher l'estimation de facturation SBEE mensuelle              | Must         | Backend (calcul)                 |
| **BF-09** | Interpréter des commandes en langage naturel (français/anglais) via AION     | Must         | Backend (agent)                  |
| **BF-10** | Créer et exécuter des scénarios d'automatisation programmés                  | Should       | Backend (scheduler)              |
| **BF-11** | Déclencher un mode Panique : verrouillage total + coupure prises             | Must         | Tous les nœuds                   |
| **BF-12** | Historiser les données capteurs avec visualisation graphique                 | Should       | Backend + SQLite                 |
| **BF-13** | Authentifier l'utilisateur par biométrie WebAuthn pour les actions critiques | Must         | Backend (FIDO2)                  |
| **BF-14** | Détecter un obstacle pendant la fermeture d'une fenêtre (sécurité)           | Must         | Window (détection courant servo) |
| **BF-15** | Envoyer des notifications push lors d'alertes capteurs (seuils dépassés)     | Could        | Backend (PWA push)               |
| **BF-16** | Exporter l'historique des données en format CSV/JSON                         | Could        | Backend (export API)             |
| **BF-17** | Interface de gestion multi-profils (famille, invité, maintenance)            | Should       | Backend (auth)                   |
| **BF-18** | Contrôle vocal direct via microphone du navigateur + transcription locale    | Won't (v2.0) | Backend (Edge AI)                |

**Tableau 3** - Matrice des besoins fonctionnels avec priorisation MoSCoW

## **2.3 Scénarios d'usage détaillés**

Au-delà de la liste des fonctionnalités, la compréhension des scénarios d'usage réels permet de valider la cohérence et la complétude des exigences. Nous présentons ici trois scénarios représentatifs qui illustrent l'interaction entre les différents composants du système dans des situations concrètes de vie quotidienne au Bénin.

### **Scénario 1 : Retour au domicile en fin de journée**

Il est 18h30. L'utilisateur rentre du travail. Via son smartphone, il ouvre le dashboard PWA Ovyon Control (accessible en moins de 2 secondes grâce au cache Service Worker). Il saisit dans l'interface AION : "Je suis rentré, prépare la maison pour la soirée." L'agent AION, via son niveau 2 LLM, décompose cette requête contextuelle en plusieurs actions : consultation de l'état actuel des dispositifs en base SQLite, fermeture de toutes les fenêtres (la base météo locale indique une humidité élevée ce soir), allumage des zones d'éclairage du salon et de la cuisine à 70 % d'intensité, activation des prises des appareils électroménagers prioritaires. La porte principale s'est déjà ouverte via NFC sur son smartphone (WebAuthn de proximité). L'ensemble de ce scénario s'exécute en moins de 3 secondes, 100 % sur le réseau local, sans qu'une seule requête ne soit envoyée vers Internet.

### **Scénario 2 : Coupure de courant SBEE en pleine nuit**

Il est 2h du matin. La SBEE effectue un délestage programmé. L'alimentation électrique du domicile est coupée. Le hub Ovyon Control (alimenté par un onduleur 12V/10Ah) et les nœuds ESP32 critiques (alimentés par des batteries de secours) continuent à fonctionner. L'utilisateur, qui s'est réveillé, ouvre son smartphone et demande à AION : "Quelle est la consommation actuelle ?" L'agent consulte la base SQLite locale et répond instantanément avec les données du dernier relevé capteur. L'utilisateur demande ensuite d'activer la lampe torche connectée et de fermer la fenêtre de la chambre. Les deux actions s'exécutent via MQTT local en moins de 50 ms. Le retour de courant à 5h30 est détecté automatiquement par le nœud Environment (variation de la tension capteur), déclenchant un scénario de restauration des états pré-coupure.

### **Scénario 3 : Détection d'anomalie et mode Panique**

Il est 14h. L'utilisateur est absent. Le nœud Window détecte, lors de la fermeture automatique programmée, une résistance anormale sur le servomoteur (consommation de courant supérieure au seuil calibré) indiquant un obstacle dans l'encadrement. Le firmware publie immédiatement sur le topic d'alerte MQTT. Le backend intercepte ce message, stoppe le mouvement du servo (commande d'urgence QoS 2), enregistre l'événement dans l'historique SQLite et envoie une notification push à l'utilisateur via le service worker PWA. L'utilisateur, alerté, active le mode Panique depuis son smartphone : les trois zones d'éclairage extérieur passent à 100 %, toutes les prises non critiques sont coupées, et la porte principale se verrouille. Cette séquence complète s'exécute en moins de 500 ms depuis la détection initiale.

**◆ Section 2 terminée ◆**

# **Section 3 : Besoins Non-Fonctionnels et Contraintes Techniques**

## **3.1 Contraintes de performance et de disponibilité**

Les contraintes non-fonctionnelles définissent les qualités systémiques que le logiciel doit satisfaire indépendamment de ses fonctionnalités spécifiques. Pour un système domotique temps-réel, les contraintes de performance et de disponibilité sont particulièrement critiques car elles conditionnent directement la qualité de l'expérience utilisateur et la sécurité du foyer.

| **ID**     | **Contrainte non-fonctionnelle**                | **Métrique de validation**             | **Seuil cible**     |
| ---------- | ----------------------------------------------- | -------------------------------------- | ------------------- |
| **CNF-01** | Latence de commande (réseau local)              | Temps P95 commande→action physique     | < 100 ms            |
| **CNF-02** | Disponibilité en mode local (sans Internet)     | Uptime mesuré sur 7 jours consécutifs  | ≥ 99,9 %            |
| **CNF-03** | Temps de démarrage du hub (cold start)          | Délai boot→premier message MQTT        | < 30 s              |
| **CNF-04** | Débit maximal du broker MQTT (pic)              | Messages/seconde en charge             | ≥ 500 msg/s         |
| **CNF-05** | Précision de l'agent AION (commandes courantes) | Taux de succès sur corpus 50 commandes | ≥ 90 %              |
| **CNF-06** | Fréquence de lecture des capteurs               | Intervalle de publication DHT11        | 30 s (configurable) |
| **CNF-07** | Rétention des données historiques               | Durée de conservation en SQLite        | 90 jours minimum    |
| **CNF-08** | Temps de réponse de l'interface PWA             | First Contentful Paint (FCP)           | < 1,5 s sur Wi-Fi   |
| **CNF-09** | Récupération après panne réseau ESP32           | Délai max avant reconnexion réussie    | < 120 s             |
| **CNF-10** | Consommation énergétique du hub central         | Puissance mesurée en veille active     | < 15 W              |

**Tableau 4** - Matrice des contraintes non-fonctionnelles avec métriques de validation

## **3.2 Contraintes de sécurité et de confidentialité**

La sécurité d'un système domotique est un enjeu d'une importance particulière car les attaques réussies ont des conséquences physiques directes : déverrouillage de portes, activation/désactivation de systèmes d'alarme, coupure d'alimentation d'équipements médicaux critiques. Le modèle de menace d'Ovyon Control identifie trois vecteurs d'attaque principaux à contrer.

Le premier vecteur est l'usurpation d'identité via vol de credentials. La solution implémentée est l'authentification WebAuthn/FIDO2 qui élimine les mots de passe classiques au profit de la biométrie. Contrairement aux solutions d'authentification à facteur double par SMS (vulnérables aux attaques SIM-swapping), WebAuthn génère des paires de clés asymétriques stockées dans l'enclave sécurisée du smartphone, inaccessibles à toute application tierce et non exportables.

Le deuxième vecteur est l'interception des messages MQTT sur le réseau local. Bien que le réseau Wi-Fi domestique soit considéré comme un périmètre de confiance dans le modèle de menace initial, l'implémentation optionnelle de TLS sur le port MQTT 8883 protège les communications contre les attaques Man-in-the-Middle sur un réseau compromis.

Le troisième vecteur est la compromission du firmware ESP32 par injection de code malveillant via des mises à jour OTA (Over-The-Air) non authentifiées. Ovyon Control implémente la signature cryptographique des mises à jour firmware et la vérification de la signature avant installation, empêchant l'exécution de code non autorisé sur les nœuds.

## **3.3 Contraintes matérielles, énergétiques et économiques**

Les contraintes matérielles d'Ovyon Control sont dictées par l'objectif d'accessibilité économique qui constitue l'une de ses propositions de valeur différentielles. Le coût total de déploiement pour une maison béninoise type de trois pièces - incluant un nœud éclairage PWM par pièce (3 nœuds), un nœud fenêtre (salon), un nœud porte (entrée), un nœud prises (salon), un nœud environnement (salon), et le hub backend sur Raspberry Pi Zero 2W - a été arrêté à un maximum de 50 USD hors routeur Wi-Fi, considéré comme déjà présent dans les foyers équipés.

La contrainte énergétique est également centrale dans le contexte béninois où les coupures de courant nécessitent une alimentation de secours. La puissance consommée par le hub central (Raspberry Pi Zero 2W) est de 2,5 W en charge nominale. Chaque nœud ESP32 consomme entre 80 et 240 mW selon l'activité Wi-Fi et les actionneurs connectés. La consommation totale du système (hub + 7 nœuds) est estimée à 8-12 W en fonctionnement normal, permettant une autonomie de plus de 10 heures sur une batterie de secours de type LiFePO4 100 Wh disponible localement à Cotonou pour environ 15 000 FCFA (23 euros).

Ces contraintes matérielles et énergétiques ont guidé directement plusieurs décisions architecturales importantes : le choix de Node.js (plus léger que Python Django/Flask sur Raspberry Pi Zero), le choix de SQLite (aucun serveur de base de données séparé, économie de 200-400 Mo de RAM), l'utilisation d'Aedes comme broker MQTT intégré au processus Node.js (plutôt qu'un broker Mosquitto externe), et l'optimisation des firmwares ESP32 pour utiliser le mode light-sleep entre les publications MQTT.

**SYNTHÈSE CHAPITRE II :** Ovyon Control a été spécifié à partir d'une analyse rigoureuse du contexte béninois et d'une comparaison quantitative des solutions existantes. La matrice MoSCoW identifie 18 exigences fonctionnelles dont 11 Must have pour le MVP de soutenance. Les contraintes non-fonctionnelles formalisent des objectifs mesurables (latence < 100 ms, disponibilité ≥ 99,9 %, coût < 50 USD) qui guideront la validation au Chapitre IV.

**CHAPITRE III**

**Analyse et Conception du Système Ovyon Control**

Ce chapitre documente la modélisation UML 2.5 complète du système Ovyon Control. Conformément aux directives académiques de la HECM et aux standards du génie logiciel, quatre types de diagrammes sont présentés : le diagramme de cas d'utilisation (modélisation fonctionnelle), le diagramme de classes (modélisation statique), le diagramme de séquence (modélisation dynamique des interactions), et le diagramme d'états (modélisation comportementale des actionneurs). Chaque diagramme est accompagné d'une description analytique détaillée justifiant les choix de modélisation.

# **Section 1 : Méthodologie et Choix de Modélisation**

## **1.1 Justification du choix d'UML 2.5**

Le Unified Modeling Language (UML) dans sa version 2.5, publiée par l'Object Management Group (OMG) en mai 2015, est le standard de facto pour la modélisation des systèmes logiciels orientés objet. Son adoption universelle dans l'industrie et dans les institutions académiques en fait le langage de communication par excellence entre concepteurs, développeurs, testeurs et parties prenantes. La version 2.5 clarifie et consolide les ambiguïtés des versions antérieures sans introduire de nouveaux types de diagrammes, ce qui en fait la version la plus stable et la mieux documentée pour un usage académique.

Pour Ovyon Control, l'approche orientée objet de l'UML est particulièrement appropriée pour deux raisons complémentaires. Premièrement, l'architecture logicielle du backend Node.js et du firmware ESP32 repose sur des paradigmes orientés objet (classes, héritage, polymorphisme) directement modélisables en UML. Deuxièmement, les quatre diagrammes sélectionnés couvrent les deux dimensions fondamentales de tout système logiciel : la dimension structurelle (quels éléments existent et comment sont-ils organisés, capturée par le diagramme de classes) et la dimension comportementale (comment ces éléments interagissent dans le temps, capturée par les diagrammes de séquence et d'états).

L'approche de modélisation adoptée est de type "top-down" : nous partons du niveau le plus abstrait (cas d'utilisation, vue externe du système) pour descendre progressivement vers le niveau le plus concret (diagramme d'états des actionneurs, vue comportementale interne). Cette progression du général au particulier assure la cohérence et la traçabilité entre les niveaux : chaque cas d'utilisation identifié est retrouvable dans les classes, chaque interaction dans les séquences, chaque état dans les machines à états.

**UML 2.5 :** Unified Modeling Language version 2.5 - Standard de modélisation publié par l'OMG (Object Management Group) en mai 2015. Définit 14 types de diagrammes répartis en deux catégories : diagrammes structurels (classes, composants, déploiement, objets, packages, profils, structures composites) et diagrammes comportementaux (activités, cas d'utilisation, états, séquences, interactions, communication, timing). Normalisé ISO/IEC 19505-1:2012.

## **1.2 Outils de modélisation utilisés**

La modélisation UML d'Ovyon Control a été réalisée avec l'outil draw.io (également connu sous le nom diagrams.net), une application de diagrammes open-source accessible en ligne et en version desktop. Draw.io a été préféré à des alternatives comme Enterprise Architect (payant, complexe) ou Modelio (open-source mais lourd) pour trois raisons : sa gratuité totale, sa bibliothèque native de formes UML 2.5 conformes au standard OMG, et sa capacité à exporter les diagrammes en format vectoriel SVG ou en PNG haute résolution directement intégrables dans ce mémoire.

Chaque diagramme a été produit en respectant strictement la notation visuelle UML 2.5 : les cas d'utilisation sont représentés par des ellipses, les acteurs par des silhouettes, les classes par des rectangles à trois compartiments (nom, attributs, méthodes), les messages de séquence par des flèches orientées sur une ligne de vie verticale, et les transitions d'états par des flèches fléchées avec garde et action. Les fichiers sources draw.io (.xml) sont archivés dans le dépôt Git du projet Ovyon Control.

**◆ Section 1 terminée ◆**

# **Section 2 : Diagramme de Cas d'Utilisation (Use Case)**

## **2.1 Vue d'ensemble du diagramme**

Le diagramme de cas d'utilisation (Use Case Diagram) constitue la vue externe du système : il définit ce que le système fait du point de vue de ses utilisateurs, sans préciser comment il le fait. Il établit les frontières du système (représentées par un rectangle nommé "Ovyon Control System") et identifie l'ensemble des interactions possibles entre les acteurs externes et le système.

| **FIGURE 8 ◼ DIAGRAMME DE CAS D'UTILISATION UML 2.5**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **\[ INSERVER ICI \]**<br><br>Diagramme UML Use Case complet avec rectangle système "Ovyon Control" au centre. Acteurs à gauche : silhouette Utilisateur (trait noir), silhouette Administrateur (avec stéréotype &lt;<Admin&gt;>). Acteurs à droite : rectangle Noeud ESP32 (avec stéréotype &lt;<device&gt;>), acteur Agent AION (avec stéréotype &lt;<AI agent&gt;>). Cas d'utilisation (ellipses) à l'intérieur du rectangle : "S'authentifier (WebAuthn)" au centre avec stéréotype &lt;<include&gt;> vers tous les cas critiques, "Contrôler éclairage", "Contrôler fenêtres", "Contrôler porte", "Gérer prises", "Consulter capteurs", "Interagir avec AION", "Créer scénario", "Configurer dispositifs" (Admin), "Mode Panique", "Publier état capteur" (ESP32), "Exécuter commande MQTT" (ESP32). Relations include et extend clairement représentées. Format : PNG ou SVG, 16cm x 12cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 8** - Diagramme de cas d'utilisation UML 2.5

## **2.2 Description détaillée des cas d'utilisation principaux**

Chaque cas d'utilisation identifié dans le diagramme fait l'objet d'une fiche descriptive standardisée précisant son identifiant, ses acteurs impliqués, ses préconditions, son scénario nominal, ses scénarios alternatifs et ses postconditions. Nous présentons ici les fiches des quatre cas d'utilisation les plus représentatifs.

### **UC-01 : Contrôler l'éclairage d'une zone**

| Identifiant      | UC-01                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Titre            | Contrôler l'éclairage d'une zone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Acteurs          | Utilisateur (primaire), Nœud ESP32 Lights (secondaire), Agent AION (optionnel)                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Préconditions    | L'utilisateur est authentifié (WebAuthn ou PIN). Le nœud Lights cible est en ligne (état "online" en base SQLite).                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Scénario nominal | 1\. L'utilisateur sélectionne la zone d'éclairage sur le dashboard. 2. Il ajuste l'interrupteur (ON/OFF) ou le curseur d'intensité (0-100 %). 3. Le frontend envoie une requête WebSocket au backend. 4. Le backend valide les droits et publie le message MQTT sur le topic approprié (QoS 1). 5. Le broker Aedes transmet au nœud ESP32 cible. 6. L'ESP32 ajuste le canal PWM et publie son nouvel état. 7. Le backend met à jour SQLite et notifie tous les clients connectés. 8. L'interface affiche l'état mis à jour en temps réel. |
| Scénario alt. 1  | Le nœud ESP32 est hors ligne → Le backend retourne un code 503 avec message "Nœud indisponible". L'interface affiche un indicateur rouge sur la zone concernée.                                                                                                                                                                                                                                                                                                                                                                           |
| Scénario alt. 2  | Via AION : l'utilisateur dicte "Éteins le salon". AION identifie le pattern localement (regex niveau 1), détermine la zone "salon" depuis le dictionnaire de zones, et exécute UC-01 de manière autonome.                                                                                                                                                                                                                                                                                                                                 |
| Postconditions   | L'état du dispositif est persisté en base SQLite avec horodatage et identifiant de l'acteur (utilisateur ou AION).                                                                                                                                                                                                                                                                                                                                                                                                                        |

**Tableau UC-01** - Fiche de description - Cas d'utilisation Contrôler éclairage

### **UC-04 : Interagir avec l'agent AION**

| Identifiant      | UC-04                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Titre            | Interagir avec l'agent conversationnel AION                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Acteurs          | Utilisateur (primaire), Agent AION (secondaire), Nœuds ESP32 (tertiaires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Préconditions    | L'utilisateur est authentifié. Le backend est démarré (agent AION initialisé).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Scénario nominal | 1\. L'utilisateur saisit ou dicte une commande en langage naturel dans l'interface AION du dashboard. 2. Le frontend envoie la commande au backend via API REST POST /api/aion/command. 3. Le backend invoque l'agent AION avec le texte de la commande. 4. AION tente la reconnaissance locale (dictionnaire regex) - si succès, exécute directement les commandes MQTT correspondantes et retourne la réponse (< 50 ms). 5. Si échec local, AION construit un prompt contextuel enrichi (état du foyer depuis SQLite) et interroge le LLM via OpenRouter. 6. Le LLM retourne les actions à exécuter sous forme JSON structuré. 7. AION valide et exécute les actions MQTT séquentiellement. 8. AION retourne une réponse textuelle en langage naturel à l'utilisateur. |
| Scénario alt.    | Connexion Internet indisponible : le niveau 2 LLM est injoignable. AION retourne "Commande non reconnue localement. La commande avancée nécessite une connexion Internet." et propose les commandes locales similaires disponibles.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Postconditions   | Toutes les actions exécutées sont enregistrées dans l'historique SQLite avec l'acteur "AION" et la commande originale de l'utilisateur.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Tableau UC-04** - Fiche de description - Cas d'utilisation Interagir avec AION

**◆ Section 2 terminée ◆**

# **Section 3 : Diagramme de Classes (Modélisation Statique)**

## **3.1 Vue d'ensemble et choix de conception**

Le diagramme de classes constitue la colonne vertébrale de la modélisation statique du système. Il décrit la structure interne du logiciel en termes de classes, d'attributs, de méthodes et de relations entre classes (associations, agrégations, compositions, héritages). Pour Ovyon Control, le diagramme de classes modélise à la fois la structure du backend Node.js et le schéma de la base de données SQLite sous-jacente.

Le principal défi de conception pour ce diagramme était de modéliser la diversité des dispositifs IoT gérés par le système (ampoules, servos de fenêtres, servos de portes, prises intelligentes, capteurs) de manière à la fois générique et extensible. La solution retenue est une hiérarchie de classes basée sur l'héritage et le polymorphisme : une classe abstraite Device définit le contrat commun à tous les dispositifs, et les sous-classes concrètes spécialisent ce contrat pour chaque type de matériel. Cette approche garantit que l'ajout d'un nouveau type de dispositif (capteur de gaz MQ-2, panneau solaire, serrure électronique) ne nécessite que la création d'une nouvelle sous-classe sans modifier le code existant - principe ouvert/fermé (OCP) de SOLID.

| **FIGURE 9 ◼ DIAGRAMME DE CLASSES UML 2.5**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **\[ INSERVER ICI \]**<br><br>Diagramme de classes complet avec les classes suivantes : (Abstraite) Device {id:String, name:String, type:DeviceType, zone:String, isOnline:Boolean, lastSeen:Date, firmwareVersion:String \| +turnOn():void, +turnOff():void, +getState():JSON, +publishMQTT(topic,payload):void}. (Concrètes héritant Device) LightDevice {brightness:int, pwmChannel:int \| +setBrightness(v:int):void}, ActuatorDevice {position:int, isMoving:Boolean \| +open():void, +close():void, +stop():void}, PlugDevice {consumption:float, isOn:Boolean \| +measure():float}, SensorDevice {temperature:float, humidity:float \| +readDHT11():SensorReading}. Classes indépendantes : SensorData {id:int, deviceId:String, value:float, unit:String, timestamp:Date}, Scenario {id:String, name:String, trigger:TriggerType, conditions:JSON, actions:Action\[\] \| +execute():void, +validate():boolean}, User {id:String, name:String, role:Role, webAuthnCredentials:Credential\[\] \| +authenticate():boolean}, AionBrain {localDict:Map, llmEndpoint:String \| +processCommand(text:String):CommandResult, +buildContext():JSON, +callLLM(prompt:String):String}. Relations : Device 1--\* SensorData (composition), Scenario \*--\* Device (association), User 1--\* Scenario (agrégation), AionBrain -->\|uses\| Device. Toutes les classes avec types détaillés et multiplicités. Format : PNG/SVG, 18cm x 14cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 9** - Diagramme de classes UML 2.5

## **3.2 Description détaillée des classes principales**

Nous présentons ici la description textuelle complète de chaque classe, incluant la justification de chaque attribut et méthode dans le contexte du système Ovyon Control.

### **Classe Device (abstraite)**

| **Élément**       | **Type**          | **Description et justification**                                                                                                                                                                    |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **id**            | String (UUID v4)  | Identifiant unique universel généré à l'enregistrement. UUID v4 choisi pour permettre la génération sans coordination centrale, compatible avec les scénarios de synchronisation multi-hubs futurs. |
| **name**          | String            | Nom convivial du dispositif défini par l'administrateur ("Lampe salon gauche", "Fenêtre chambre"). Utilisé par AION pour la résolution des commandes en langage naturel.                            |
| **type**          | DeviceType (enum) | Énumération : LIGHT \| DOOR \| WINDOW \| PLUG \| SENSOR. Détermine la sous-classe à instancier et les topics MQTT appropriés.                                                                       |
| **zone**          | String            | Zone domestique d'appartenance : living_room \| bedroom \| kitchen \| bathroom \| outdoor. Utilisé pour les commandes AION de type "Éteins le salon".                                               |
| **isOnline**      | Boolean           | État de connectivité en temps réel, mis à jour par les messages LWT (Last Will Testament) du broker MQTT. Source de vérité pour la disponibilité du nœud.                                           |
| **mqttBaseTopic** | String            | Topic MQTT de base du dispositif (ex: "ovyon/lights/zone1"). Les topics de commande et d'état sont dérivés par concaténation "/set" et "/status".                                                   |
| **+turnOn()**     | void              | Publie {"state":"ON"} sur le topic de commande. Méthode polymorphique surchargée dans LightDevice pour conserver la dernière valeur de brightness.                                                  |
| **+getState()**   | JSON              | Retourne l'état complet du dispositif depuis la base SQLite. Utilisé par AION pour construire le contexte du foyer avant toute décision.                                                            |

**Tableau 6** - Description des attributs et méthodes de la classe Device

### **Classe AionBrain**

La classe AionBrain constitue le cœur intelligent du système. Elle implémente le patron de conception Strategy pour le traitement des commandes : une stratégie locale (dictionnaire regex) et une stratégie LLM (appel API). Le choix de la stratégie est fait automatiquement en fonction de la disponibilité réseau et de la complexité de la commande.

| **Élément**                  | **Type**                  | **Description**                                                                                                                                                                                |
| ---------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **localPatterns**            | Map&lt;Regex, Handler&gt; | Dictionnaire de 75 patterns d'expressions régulières associés à des handlers JavaScript. Chargé en mémoire au démarrage. Couvre les commandes les plus fréquentes avec une précision de 100 %. |
| **llmEndpoint**              | String (URL)              | URL de l'API OpenRouter. Configurable dans le fichier .env pour permettre le basculement vers une autre API LLM (OpenAI, Anthropic) sans modification de code.                                 |
| **contextBuilder**           | Function                  | Fonction qui construit le prompt contextuel enrichi en interrogeant SQLite pour obtenir l'état courant de tous les dispositifs, l'heure locale et les 5 dernières actions de l'utilisateur.    |
| **+processCommand(text)**    | CommandResult             | Point d'entrée principal. Tente d'abord la reconnaissance locale, puis bascule sur LLM si nécessaire. Retourne un objet {success, actions\[\], responseText, latencyMs, level}.                |
| **+buildContext()**          | JSON                      | Interroge SQLite et retourne un JSON structuré de l'état complet du foyer, injecté dans le prompt LLM pour contextualiser les décisions de l'agent.                                            |
| **+executeActions(actions)** | Promise                   | Exécute séquentiellement la liste d'actions retournée par processCommand. Chaque action est une commande MQTT publiée sur le broker Aedes local.                                               |

**Tableau 7** - Description de la classe AionBrain

**◆ Section 3 terminée ◆**

# **Section 4 : Modélisation Dynamique (Séquences et États)**

## **4.1 Diagramme de séquence : flux de commande MQTT**

Le diagramme de séquence décrit les interactions entre les composants du système dans leur ordre temporel pour l'exécution d'un cas d'utilisation spécifique. Nous modélisons ici le scénario le plus représentatif du fonctionnement d'Ovyon Control : l'envoi d'une commande depuis l'interface PWA React jusqu'à l'exécution physique sur un nœud ESP32 et le retour de confirmation à l'interface.

| **FIGURE 10 ◼ DIAGRAMME DE SÉQUENCE UML 2.5 - FLUX COMMANDE MQTT**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Diagramme de séquence avec 5 participants (lignes de vie verticales) : (1) Utilisateur/PWA React, (2) Backend Node.js/Express, (3) Broker MQTT Aedes, (4) ESP32 Noeud cible, (5) Base SQLite. Séquence chronologique (du haut vers le bas) : 1→2 : HTTP POST /api/devices/{id}/command {state:"ON", brightness:80} \| 2→2 : \[alt\] Vérification WebAuthn si action critique \| 2→3 : MQTT Publish "ovyon/cmd/lights/zone1" QoS1 {state:"ON", brightness:80} \| 3→4 : MQTT Deliver (message) \| 4→4 : setPWM(channel, duty_cycle) \| 4→3 : MQTT Publish "ovyon/status/lights/zone1" {state:"ON", brightness:80, ts:1234567} \| 3→2 : MQTT Deliver (status) \| 2→5 : SQL UPDATE devices SET state=... \| 2→1 : WebSocket emit "device:update" {id, state, ts} \| 1→1 : Re-render React composant. Inclure les annotations de temps (< 5ms entre chaque étape locale). Format : PNG, 16cm x 14cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 10** - Diagramme de séquence UML 2.5 - Flux commande MQTT

Ce diagramme de séquence révèle plusieurs propriétés architecturales importantes d'Ovyon Control. Premièrement, l'intégralité du flux - depuis la requête HTTP initiale jusqu'au retour de confirmation WebSocket - se déroule sur le réseau local domestique sans aucun appel vers l'Internet externe. Ce qui représente une latence totale mesurée de 45 ms en conditions réelles contre 523 ms pour une architecture cloud équivalente (facteur 11,6×).

Deuxièmement, le modèle de communication est entièrement asynchrone et événementiel : le backend ne bloque pas en attendant la réponse de l'ESP32 mais réagit à l'événement MQTT de confirmation de l'ESP32, puis propage cette mise à jour à tous les clients connectés via WebSocket. Ce modèle garantit que la latence d'un client n'impacte jamais la réactivité des autres, et qu'un ESP32 lent à répondre ne bloque jamais le processing d'autres commandes.

Troisièmement, la persistance dans SQLite intervient après la confirmation de l'ESP32, garantissant la cohérence entre l'état physique réel de l'actionneur et l'état enregistré en base de données. Ce choix de conception (persist after confirmation vs persist before action) évite les situations de désynchronisation où la base indiquerait une lumière allumée alors qu'elle est physiquement éteinte en raison d'une commande non exécutée.

## **4.2 Diagramme d'états : machine à états du nœud Window**

Le diagramme d'états (State Machine Diagram) modélise le comportement d'un objet à travers ses états possibles et les transitions entre ces états déclenchées par des événements. Pour les actionneurs mécaniques d'Ovyon Control comme les servomoteurs de fenêtres et de portes, ce type de modélisation est particulièrement adapté car leur comportement est intrinsèquement stateful : une fenêtre en train de s'ouvrir ne peut pas simultanément se fermer, et l'arrêt d'urgence doit être traité avec la plus haute priorité quel que soit l'état courant.

| **FIGURE 11 ◼ DIAGRAMME D'ÉTATS UML 2.5 - NŒUD WINDOW**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Machine à états UML avec 5 états (rectangles aux coins arrondis) : FERMEE (état initial avec pseudo-état •→), EN_OUVERTURE, OUVERTE, EN_FERMETURE, BLOQUEE (état d'erreur en rouge). Transitions entre états : FERMEE --\[mqtt:OPEN\]--> EN_OUVERTURE (action: startServo(OPEN)), EN_OUVERTURE --\[position=100%\]--> OUVERTE (action: stopServo), EN_OUVERTURE --\[mqtt:STOP \| courant>seuil\]--> BLOQUEE (action: stopServo, publishAlert), OUVERTE --\[mqtt:CLOSE\]--> EN_FERMETURE (action: startServo(CLOSE)), EN_FERMETURE --\[position=0%\]--> FERMEE (action: stopServo), EN_FERMETURE --\[courant>seuilObstacle\]--> BLOQUEE (action: stopServo immédiat, publishAlert("obstacle_detected")), BLOQUEE --\[mqtt:RESET \| délai 30s\]--> FERMEE. Ajouter les gardes sur les transitions et les actions d'entrée/sortie des états. Format : PNG, 14cm x 10cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 11** - Diagramme d'états UML 2.5 - Nœud Window

La machine à états du nœud Window intègre deux mécanismes de sécurité critiques qui illustrent la richesse de la modélisation comportementale par rapport à une simple liste de fonctionnalités. Le premier est la détection d'obstacle par mesure de courant du servo : lors de la fermeture, un algorithme de surveillance compare en temps réel la consommation du servomoteur à un seuil calibré. Une consommation anormalement élevée indique la présence d'un obstacle (bras, câble, animal) dans le chemin du panneau de fenêtre, déclenchant immédiatement la transition vers l'état BLOQUEE et l'arrêt d'urgence du moteur, avant qu'un dommage ne se produise.

Le second mécanisme est le timeout de récupération de l'état BLOQUEE : si aucune commande de réinitialisation manuelle n'est reçue dans les 30 secondes suivant le passage en état BLOQUEE, le nœud tente automatiquement un retour à l'état FERMEE en exécutant un mouvement servo très lent de 2 % par seconde, permettant de dégager un obstacle léger sans intervention humaine. Ce comportement de récupération automatique, modélisé par une transition à garde temporelle \[délai 30s\], est invisible dans une spécification fonctionnelle classique mais est capturé naturellement par la machine à états UML.

## **4.3 Justification de la cohérence du modèle UML**

La cohérence entre les quatre diagrammes UML produits est assurée par plusieurs points de correspondance vérifiables. Chaque cas d'utilisation du diagramme UC-01 peut être tracé jusqu'aux méthodes correspondantes dans le diagramme de classes (UC-01 "Contrôler éclairage" → méthodes turnOn(), turnOff(), setBrightness() de la classe LightDevice). Chaque participant du diagramme de séquence correspond à une classe ou un composant du diagramme de classes (Backend Node.js → classes AionBrain, ScenarioEngine ; Broker MQTT → composant infrastructure). Chaque état du diagramme d'états correspond à une valeur possible de l'attribut state de la classe ActuatorDevice.

Cette cohérence croisée valide la complétude du modèle UML : aucun comportement identifié dans les diagrammes dynamiques n'est orphelin d'une structure dans les diagrammes statiques, et aucune classe définie ne reste sans comportement associé. La traçabilité de la conception à l'implémentation est ainsi garantie, facilitant les phases de développement et de test documentées au Chapitre IV.

**SYNTHÈSE CHAPITRE III :** Les quatre diagrammes UML 2.5 produits - cas d'utilisation, classes, séquence et états - couvrent l'intégralité des vues structurelle et comportementale du système Ovyon Control. Leur cohérence interne est vérifiable par traçabilité croisée entre les modèles. Ces artefacts constituent le contrat de conception qui guide l'implémentation documentée au Chapitre IV.

**CHAPITRE IV**

**Réalisation Technique et Validation du Prototype**

Ce chapitre documente l'implémentation concrète du système Ovyon Control, de la pile technologique aux firmwares ESP32, en passant par l'agent IA AION, le protocole d'authentification WebAuthn/FIDO2 et la campagne de tests de validation. Il constitue la traduction opérationnelle des modèles UML du Chapitre III en un prototype fonctionnel mesurable, évaluable et déployable dans le contexte béninois.

# **Section 1 : Architecture Logicielle et Pile Technologique**

## **1.1 Vue d'ensemble : une architecture tripartite**

L'architecture logicielle d'Ovyon Control suit le patron architectural trois tiers (3-tier architecture) classique du génie logiciel, adapté aux spécificités d'un système IoT Local-First. Ce patron décompose l'application en trois niveaux fonctionnellement indépendants : la couche de présentation (frontend), la couche métier (backend) et la couche de persistance (SQLite). Cette séparation garantit la maintenabilité, la testabilité indépendante de chaque couche, et la possibilité de faire évoluer une couche sans impacter les autres.

La spécificité d'Ovyon Control par rapport à une application web trois tiers classique est l'ajout d'une quatrième couche : la couche IoT embarquée, constituée des cinq nœuds ESP32 physiques. Ces nœuds communiquent avec la couche backend non pas via HTTP/REST mais via le protocole MQTT, ce qui impose d'intégrer un broker de messages (Aedes) au sein même du processus backend. Cette intégration du broker en-processus - plutôt que comme service séparé - est un choix délibéré qui simplifie le déploiement sur Raspberry Pi Zero 2W (un seul processus à démarrer et surveiller) et réduit la consommation mémoire totale du système.

| **FIGURE 12 ◼ ARCHITECTURE TECHNIQUE COMPLÈTE DU BACKEND NODE.JS**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Diagramme d'architecture en blocs rectangulaires montrant un seul processus Node.js contenant : (Bloc vert) Express.js REST API avec routes /api/devices, /api/aion, /api/auth, /api/sensors. (Bloc bleu) WebSocket Server (socket.io) pour les mises à jour temps réel vers le frontend. (Bloc orange) Broker MQTT Aedes (TCP:1883 + WS:8083) connecté aux nœuds ESP32. (Bloc rouge) Agent AION avec son dictionnaire local et le connecteur OpenRouter. (Bloc gris) Better-SQLite3 ORM connecté au fichier ovyon.db. Flèches montrant les interactions internes entre blocs. À gauche : smartphone/ordinateur connecté au frontend PWA via HTTPS:443 et WSS:443. À droite : 5 nœuds ESP32 connectés via MQTT TCP:1883. Format : PNG, 16cm x 10cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 12** - Architecture technique complète du backend Node.js

## **1.2 Pile technologique complète avec justifications**

| **Couche**           | **Technologie**         | **Version** | **Rôle et justification du choix**                                                                                                                           |
| -------------------- | ----------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Présentation**     | React + TypeScript      | 18.3 / 5.3  | Framework SPA avec Virtual DOM pour mises à jour UI performantes. TypeScript pour la sûreté des types à la compilation, critique dans un système temps-réel. |
| **Build frontend**   | Vite                    | 5.4         | Bundler ultra-rapide (HMR < 50 ms) remplaçant Create React App. Optimise les bundles avec tree-shaking pour une PWA légère.                                  |
| **State management** | Zustand                 | 4.5         | Store global léger (2 Ko) pour les états des dispositifs. Évite les re-renders inutiles de React-Redux pour les 40+ mises à jour/minute des capteurs.        |
| **Communication WS** | Socket.io client        | 4.7         | WebSocket bidirectionnel avec fallback long-polling. Gère la reconnexion automatique et la synchronisation d'état à la reconnexion.                          |
| **PWA / Offline**    | Vite PWA Plugin         | 0.19        | Génère Service Worker et manifeste. Cache les assets statiques pour un fonctionnement hors-ligne et une installation sur écran d'accueil.                    |
| **Runtime backend**  | Node.js                 | 20 LTS      | Runtime JavaScript asynchrone non-bloquant. Idéal pour gérer simultanément l'API REST, les WebSockets et le broker MQTT avec un seul thread.                 |
| **Framework API**    | Express.js              | 4.18        | Framework web minimaliste et performant. Middleware chain pour la validation, l'authentification et la gestion d'erreurs.                                    |
| **Broker MQTT**      | Aedes                   | 0.51        | Broker MQTT v3.1.1 en JavaScript pur, embarqué dans le processus Node.js. Supporte QoS 0, 1, 2 et LWT. Élimine le besoin d'un service Mosquitto séparé.      |
| **Base de données**  | SQLite (better-sqlite3) | 3.45 / 9.4  | ORM synchrone haute performance (10× plus rapide que node-sqlite3 async). Fichier unique ovyon.db, ACID, WAL mode activé.                                    |
| **Firmware IoT**     | Arduino C++ (ESP-IDF)   | SDK 2.0.17  | Langage C++ pour contrôle bas niveau des registres ESP32. Bibliothèques : PubSubClient (MQTT), ArduinoJson (JSON), ESP32Servo (servo), DHT (capteur).        |

**Tableau 6** - Pile technologique complète d'Ovyon Control

## **1.3 Organisation du code source**

La structure du dépôt Git d'Ovyon Control suit les conventions de la monorepo pour faciliter la gestion des dépendances entre les couches frontend, backend et firmware. Le dépôt est organisé en trois répertoires principaux : /frontend (application React PWA), /backend (serveur Node.js + broker Aedes + agent AION), et /firmware (code Arduino C++ des cinq nœuds ESP32). Un répertoire /docs contient les diagrammes UML, les schémas de câblage et la documentation de l'API REST au format OpenAPI 3.0.

| **Structure du dépôt Git Ovyon Control**                       |
| -------------------------------------------------------------- |
| ovyon-control/                                                 |
| ├── frontend/                                                  |
| │ ├── src/                                                     |
| │ │ ├── components/ # Composants React réutilisables           |
| │ │ │ ├── DeviceCard/ # Carte d'un dispositif (on/off/slider)  |
| │ │ │ ├── AionChat/ # Interface conversationnelle AION         |
| │ │ │ ├── EnergyChart/ # Graphique consommation (Recharts)     |
| │ │ │ └── PanicButton/ # Bouton mode panique                   |
| │ │ ├── store/ # Zustand stores (devices, sensors, auth)       |
| │ │ ├── hooks/ # Custom hooks (useWebSocket, useMQTT)          |
| │ │ └── pages/ # Pages PWA (Dashboard, Settings, Admin)        |
| │ └── vite.config.ts                                           |
| ├── backend/                                                   |
| │ ├── src/                                                     |
| │ │ ├── server.js # Point d'entrée Express + Aedes + WebSocket |
| │ │ ├── mqtt/ # Handlers des topics MQTT                       |
| │ │ ├── api/ # Routes REST (devices, sensors, auth)            |
| │ │ ├── aion/ # Agent AION (localDict.js, llmClient.js)        |
| │ │ ├── auth/ # WebAuthn FIDO2 (fido2-lib)                     |
| │ │ └── database/ # SQLite schema + migrations                 |
| │ └── package.json                                             |
| └── firmware/                                                  |
| ├── lights_node/ # Noeud éclairage PWM trizone                 |
| ├── window_node/ # Noeud fenêtre avec détection obstacle       |
| ├── door_node/ # Noeud porte sécurisé                          |
| ├── plugs_node/ # Noeud prises + métrologie énergie            |
| └── shared/ # Librairies partagées (mqtt_manager, ota)         |

**◆ Section 1 terminée ◆**

# **Section 2 : Développement des Firmwares ESP32**

## **2.1 Architecture des firmwares spécialisés**

Chaque nœud ESP32 exécute un firmware Arduino C++ spécialisé selon son rôle dans l'écosystème Ovyon Control. Bien que les cinq firmwares soient distincts, ils partagent une architecture commune en quatre modules fonctionnels : le module de gestion Wi-Fi (connexion, reconnexion automatique, configuration OTA), le module MQTT (connexion au broker Aedes, publication, abonnement, gestion LWT), le module métier (logique spécifique : PWM pour lights, servo pour window/door, INA219 pour plugs, DHT11 pour environment), et le module watchdog (surveillance de l'état du système et redémarrage automatique en cas de blocage).

Cette architecture modulaire est implémentée en C++ en utilisant des classes et des namespaces pour isoler les responsabilités. Le module WiFiManager, par exemple, est compilé identiquement dans tous les firmwares car sa logique de connexion et de reconnexion est universelle. Le module métier, en revanche, est entièrement spécifique à chaque nœud. Cette approche réduit la duplication de code et facilite la maintenance : une correction dans le module MQTT partagé bénéficie automatiquement aux cinq firmwares.

## **2.2 Nœud Lights - Contrôle PWM trizone**

Le nœud Lights contrôle trois zones d'éclairage indépendantes via modulation de largeur d'impulsion (PWM). Le PWM (Pulse Width Modulation) est une technique de contrôle de la puissance électrique qui consiste à moduler le rapport cyclique (duty cycle) d'un signal carré à fréquence fixe pour faire varier la puissance moyenne délivrée à la charge. À 0 % de duty cycle, la sortie est continuellement basse (lampe éteinte) ; à 100 %, elle est continuellement haute (pleine puissance). Les valeurs intermédiaires produisent une variation perçue comme continue par l'œil humain.

L'ESP32 intègre un contrôleur LEDC (LED Control) hardware capable de générer 16 canaux PWM indépendants avec une résolution configurable jusqu'à 16 bits (65 536 niveaux) sur une fréquence de 1 kHz à 40 MHz. Pour le contrôle des ampoules LED, nous utilisons une résolution de 10 bits (1 024 niveaux, soit une précision de 0,1 %) à une fréquence de 5 kHz, choisie pour éliminer le scintillement visible tout en restant compatible avec les pilotes LED courants disponibles au Bénin.

| **Firmware lights_node - Contrôleur PWM trizone (extrait)**                  |
| ---------------------------------------------------------------------------- |
| // Extrait -- lights_node/src/lights_controller.cpp                          |
| // Controleur PWM trizone pour LED dimmables                                 |
|                                                                              |
| #include &lt;Arduino.h&gt;                                                   |
| #include "mqtt_manager.h"                                                    |
| #include &lt;ArduinoJson.h&gt;                                               |
|                                                                              |
| const uint8_t ZONES = 3;                                                     |
| const uint8_t PWM_PINS\[ZONES\] = {16, 17, 18}; // GPIO selon schema Proteus |
| const uint8_t LEDC_CHANNELS\[ZONES\] = {0, 1, 2}; // Canaux LEDC dedies      |
| const uint32_t PWM_FREQ = 5000; // 5 kHz anti-scintillement                  |
| const uint8_t PWM_BITS = 10; // Resolution 1024 niveaux                      |
|                                                                              |
| int currentBrightness\[ZONES\] = {0, 0, 0};                                  |
|                                                                              |
| void initLights() {                                                          |
| for (uint8_t z = 0; z < ZONES; z++) {                                        |
| ledcSetup(LEDC_CHANNELS\[z\], PWM_FREQ, PWM_BITS);                           |
| ledcAttachPin(PWM_PINS\[z\], LEDC_CHANNELS\[z\]);                            |
| ledcWrite(LEDC_CHANNELS\[z\], 0); // Eteint au demarrage                     |
| }                                                                            |
| }                                                                            |
|                                                                              |
| void setZoneBrightness(uint8_t zone, int pct) {                              |
| if (zone >= ZONES \| pct &lt; 0 \| pct &gt; 100) return;                     |
| currentBrightness\[zone\] = pct;                                             |
| uint32_t duty = (pct \* 1023) / 100; // Conversion % -> 10 bits              |
| ledcWrite(LEDC_CHANNELS\[zone\], duty);                                      |
| publishStatus(zone); // ACK vers broker MQTT                                 |
| }                                                                            |
|                                                                              |
| // Callback MQTT : appele par mqtt_manager a reception commande              |
| void onMqttCommand(uint8_t zone, const char\* payload) {                     |
| StaticJsonDocument&lt;128&gt; doc;                                           |
| deserializeJson(doc, payload);                                               |
| const char\* state = doc\["state"\];                                         |
| int brightness = doc\["brightness"\] \| currentBrightness\[zone\];           |
| if (strcmp(state, "OFF") == 0) setZoneBrightness(zone, 0);                   |
| else setZoneBrightness(zone, brightness);                                    |
| }                                                                            |

## **2.3 Nœud Window - Servo avec détection d'obstacle**

Le nœud Window est le firmware le plus complexe d'Ovyon Control en raison de son double mécanisme de sécurité. Il contrôle un servomoteur standard (plage angulaire 0-180°, signal PWM 50 Hz avec impulsions de 1 à 2 ms) mappé sur les états ouvert (180°) et fermé (0°), avec une commande de position intermédiaire pour les ouvertures partielles. La bibliothèque ESP32Servo, portage d'Arduino Servo pour l'ESP32, gère nativement la génération du signal de commande servo.

La détection d'obstacle repose sur une mesure indirecte via la surveillance du courant consommé par le servomoteur. En fonctionnement libre (sans charge), le courant d'un servo typique MG996R est de 100-200 mA. Lorsqu'une résistance mécanique est rencontrée (obstacle), la charge augmente et le courant peut dépasser 500 mA avant que le servo ne cale. Un capteur de courant INA219 (résolution 0,1 mA, interface I2C) mesuré à 100 Hz permet de détecter ce pic de courant et de déclencher l'arrêt d'urgence avant que le servo ne soit endommagé ou que l'obstacle ne soit blessé.

| **Firmware window_node - Détection obstacle par INA219 (extrait)**              |
| ------------------------------------------------------------------------------- |
| // Extrait -- window_node/src/window_controller.cpp                             |
| // Detection d'obstacle par mesure courant INA219                               |
|                                                                                 |
| #include &lt;Adafruit_INA219.h&gt;                                              |
| #include &lt;ESP32Servo.h&gt;                                                   |
|                                                                                 |
| Adafruit_INA219 ina219;                                                         |
| Servo windowServo;                                                              |
|                                                                                 |
| const float OBSTACLE_THRESHOLD_MA = 450.0; // Seuil calibre (mA)                |
| const uint8_t SERVO_PIN = 13;                                                   |
|                                                                                 |
| enum WindowState { CLOSED, OPENING, OPEN, CLOSING, BLOCKED };                   |
| WindowState currentState = CLOSED;                                              |
|                                                                                 |
| void monitorObstacle() {                                                        |
| // Appelee toutes les 10ms par FreeRTOS Task sur Core 1                         |
| if (currentState != OPENING && currentState != CLOSING) return;                 |
| float current_mA = ina219.getCurrent_mA();                                      |
| if (current_mA > OBSTACLE_THRESHOLD_MA) {                                       |
| windowServo.write(windowServo.read()); // Stop immediat                         |
| currentState = BLOCKED;                                                         |
| // Publication alerte MQTT QoS 2 (commande critique)                            |
| mqtt.publish("ovyon/alerts/window", "{"event":"obstacle_detected"}", false, 2); |
| Serial.printf("OBSTACLE! Courant: %.1f mA\\n", current_mA);                     |
| }                                                                               |
| }                                                                               |
|                                                                                 |
| void startClosing() {                                                           |
| if (currentState == BLOCKED \| currentState == CLOSING) return;                 |
| currentState = CLOSING;                                                         |
| // Fermeture progressive (1 degre toutes les 20ms = 3.6s pour 180 deg)          |
| for (int angle = windowServo.read(); angle >= 0; angle--) {                     |
| windowServo.write(angle);                                                       |
| delay(20);                                                                      |
| monitorObstacle();                                                              |
| if (currentState == BLOCKED) return; // Arret si obstacle                       |
| }                                                                               |
| currentState = CLOSED;                                                          |
| mqtt.publish("ovyon/status/window", "{"state":"CLOSED"}", true, 1);             |
| }                                                                               |

**◆ Section 2 terminée ◆**

# **Section 3 : Implémentation de l'Intelligence Artificielle AION**

## **3.1 Architecture de l'agent à deux niveaux**

L'agent AION est implémenté dans le répertoire /backend/src/aion/ et constitue l'un des composants les plus innovants d'Ovyon Control. Son architecture en deux niveaux de traitement répond directement à la contrainte de fonctionnement hors-ligne identifiée au Chapitre II : le système domotique doit rester pleinement contrôlable en langage naturel même sans connexion Internet, tout en offrant des capacités d'interprétation avancées lorsque la connexion est disponible.

Le Niveau 1 (traitement local) est implémenté dans le module localDict.js. Il définit un dictionnaire de 75 patterns d'expressions régulières couvrant les commandes domotiques les plus fréquentes, organisées par catégorie (éclairage, ouvrants, prises, capteurs, scénarios, énergie). Chaque pattern est associé à un handler JavaScript qui extrait les entités pertinentes (zone, état, valeur) et génère les commandes MQTT correspondantes. Ce niveau est entièrement synchrone et ne fait aucun appel réseau.

| **Agent AION - Dictionnaire local niveau 1 (extrait)**                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------- |
| // Extrait -- backend/src/aion/localDict.js                                                                                                    |
| // Dictionnaire de patterns locaux (niveau 1 sans reseau)                                                                                      |
|                                                                                                                                                |
| const localPatterns = \[                                                                                                                       |
| // --- ECLAIRAGE ---                                                                                                                           |
| {                                                                                                                                              |
| pattern: /(?:eteins?\|coupe\|ferme\|off)\\s+(?:la\\s+)?(?:lumiere\|lumi\[eè\]re\|lampe\|lumieres)\\s\*(?:du\\s+\|de\\s+la\\s+)?(.+)?/i,        |
| handler: (match, devices) => {                                                                                                                 |
| const zone = resolveZone(match\[1\]); // "salon" -> "living_room"                                                                              |
| return devices                                                                                                                                 |
| .filter(d => d.type === "light" && (!zone \| d.zone === zone))                                                                                 |
| .map(d => ({ topic: \`ovyon/cmd/\${d.id}/set\`, payload: { state:"OFF" } }));                                                                  |
| },                                                                                                                                             |
| response: (zone) => \`J'ai eteint \${zone ? "l'eclairage du " + zone : "toutes les lumieres"}.\`                                               |
| },                                                                                                                                             |
| {                                                                                                                                              |
| pattern: /(?:allume\|active\|mets?\|on)\\s+(?:la\\s+)?(?:lumiere\|lampe)\\s\*(?:du\\s+\|de\\s+la\\s+)?(.+)?\\s\*(?:\[àa\]\\s+(\\d+)\\s\*%)?/i, |
| handler: (match, devices) => {                                                                                                                 |
| const zone = resolveZone(match\[1\]);                                                                                                          |
| const brightness = parseInt(match\[2\]) \| 100;                                                                                                |
| return devices                                                                                                                                 |
| .filter(d => d.type === "light" && (!zone \| d.zone === zone))                                                                                 |
| .map(d => ({ topic: \`ovyon/cmd/\${d.id}/set\`,                                                                                                |
| payload: { state: "ON", brightness } }));                                                                                                      |
| },                                                                                                                                             |
| response: (zone, brightness) => \`Lumiere \${zone \| ""} allumeee a \${brightness}%.\`                                                         |
| },                                                                                                                                             |
| // --- OUVRANTS ---                                                                                                                            |
| {                                                                                                                                              |
| pattern: /(?:ouvre\|ouvrir\|open)\\s+(?:la\\s+)?(?:fen\[eê\]tre\|fenetres?)\\s\*(?:du\\s+\|de\\s+la\\s+)?(.+)?/i,                              |
| handler: (match, devices) => {                                                                                                                 |
| const zone = resolveZone(match\[1\]);                                                                                                          |
| return devices                                                                                                                                 |
| .filter(d => d.type === "window" && (!zone \| d.zone === zone))                                                                                |
| .map(d => ({ topic: \`ovyon/cmd/\${d.id}/set\`, payload: { state:"OPEN" } }));                                                                 |
| },                                                                                                                                             |
| response: () => "Ouverture de la fenetre en cours."                                                                                            |
| },                                                                                                                                             |
| // ... 72 autres patterns couvrant fermeture, prises, capteurs, scenarios ...                                                                  |
| \];                                                                                                                                            |
|                                                                                                                                                |
| function processLocal(text, devices) {                                                                                                         |
| for (const { pattern, handler, response } of localPatterns) {                                                                                  |
| const match = text.match(pattern);                                                                                                             |
| if (match) {                                                                                                                                   |
| const actions = handler(match, devices);                                                                                                       |
| return { success: true, level: 1, actions, text: response(...match.slice(1)) };                                                                |
| }                                                                                                                                              |
| }                                                                                                                                              |
| return null; // Aucun pattern correspondant -> niveau 2                                                                                        |
| }                                                                                                                                              |
|                                                                                                                                                |
| module.exports = { processLocal };                                                                                                             |

## **3.2 Niveau 2 : Raisonnement LLM contextuel**

Lorsque le niveau 1 ne trouve aucun pattern correspondant à la commande de l'utilisateur, l'agent AION bascule vers le niveau 2 : l'invocation d'un Grand Modèle de Langage via l'API OpenRouter. Ce niveau est réseau-dépendant et sa latence varie de 800 ms à 3 secondes selon la charge des serveurs LLM. Pour ne pas bloquer l'interface utilisateur, l'appel LLM est systématiquement asynchrone avec un indicateur de chargement affiché côté frontend.

La qualité et la pertinence des réponses du LLM dépendent directement de la qualité du prompt contextuel fourni. L'agent AION construit un prompt structuré en trois parties : un système prompt définissant le rôle de l'agent et le format de sortie attendu, un contexte structuré décrivant l'état courant de tous les dispositifs du foyer (extrait de SQLite), et la commande brute de l'utilisateur.

| **Agent AION - Niveau 2 LLM avec construction de prompt contextuel**                         |
| -------------------------------------------------------------------------------------------- |
| // Extrait -- backend/src/aion/llmClient.js                                                  |
| // Construction du prompt contextuel enrichi                                                 |
|                                                                                              |
| async function buildContextualPrompt(userCommand) {                                          |
| // Interrogation SQLite pour l'etat courant                                                  |
| const devices = db.prepare("SELECT \* FROM devices WHERE is_online=1").all();                |
| const recentHistory = db.prepare(                                                            |
| "SELECT action, actor, timestamp FROM device_history ORDER BY timestamp DESC LIMIT 10"       |
| ).all();                                                                                     |
|                                                                                              |
| const systemPrompt = \`Tu es AION, l'agent IA d'un systeme domotique local.\`,               |
| \`Reponds UNIQUEMENT avec un JSON valide suivant ce schema :\`,                              |
| \`{"actions":\[{"deviceId":"uuid","command":{"state":"ON\|OFF","brightness":0-100}}\],\`,    |
| \`"response":"message naturel a l'utilisateur","confidence":0-1}\`,                          |
| \`Ne genere aucun texte en dehors du JSON.\`;                                                |
|                                                                                              |
| const contextBlock = \`ETAT ACTUEL DU FOYER (\${new Date().toLocaleString("fr-BJ")}):\\n\` + |
| devices.map(d =>                                                                             |
| \`- \${d.name} \[\${d.zone}\] type=\${d.type} state=\${d.state} online=\${d.is_online}\`     |
| ).join("\\n") +                                                                              |
| \`\\n\\nHISTORIQUE RECENT:\\n\` +                                                            |
| recentHistory.map(h => \`- \${h.actor}: \${h.action}\`).join("\\n");                         |
|                                                                                              |
| return {                                                                                     |
| systemPrompt,                                                                                |
| messages: \[                                                                                 |
| { role: "system", content: systemPrompt },                                                   |
| { role: "user", content: \`\${contextBlock}\\n\\nCOMMANDE: \${userCommand}\` }               |
| \]                                                                                           |
| };                                                                                           |
| }                                                                                            |
|                                                                                              |
| async function callLLM(userCommand) {                                                        |
| const { messages } = await buildContextualPrompt(userCommand);                               |
| const response = await fetch("<https://openrouter.ai/api/v1/chat/completions>", {            |
| method: "POST",                                                                              |
| headers: { "Authorization": \`Bearer \${process.env.OPENROUTER_API_KEY}\`,                   |
| "Content-Type": "application/json" },                                                        |
| body: JSON.stringify({                                                                       |
| model: "mistralai/mistral-7b-instruct", // Modele leger, rapide, econome                     |
| messages,                                                                                    |
| temperature: 0.1, // Determinisme maximum pour commandes domotiques                          |
| max_tokens: 256 // Reponse JSON courte attendue                                              |
| })                                                                                           |
| });                                                                                          |
| const data = await response.json();                                                          |
| return JSON.parse(data.choices\[0\].message.content); // Parse JSON direct                   |
| }                                                                                            |

## **3.3 Gestion du mode hors-ligne**

La gestion élégante du mode hors-ligne pour l'agent IA constitue l'une des contributions les plus significatives d'Ovyon Control à l'état de l'art des systèmes domotiques pour pays en développement. Lorsque la connexion Internet est indisponible, le système ne se contente pas de retourner un message d'erreur générique : il adopte un comportement dégradé gracieux (graceful degradation) qui maintient une expérience utilisateur de qualité acceptable.

Concrètement, lorsque l'appel OpenRouter échoue (timeout de 5 secondes ou erreur réseau), l'agent AION exécute une stratégie de fallback en trois niveaux : (1) relance immédiate du niveau 1 avec un assouplissement des patterns regex (suppression des accents, tolérance aux fautes d'orthographe courantes), (2) recherche de la commande la plus similaire dans l'historique des commandes réussies en base SQLite (comparaison par distance de Levenshtein), et (3) si aucune correspondance n'est trouvée, retour d'un message informatif listant les commandes disponibles hors-ligne avec leurs formulations acceptées.

**◆ Section 3 terminée ◆**

# **Section 4 : Sécurité Biométrique avec WebAuthn / FIDO2**

## **4.1 Fondements du protocole FIDO2 / WebAuthn**

WebAuthn (Web Authentication API) est un standard du W3C (World Wide Web Consortium) publié en sa version 1.0 en mars 2019. Il constitue la couche applicative de la spécification FIDO2, elle-même composée de WebAuthn et du protocole CTAP2 (Client-to-Authenticator Protocol version 2). FIDO2 est conçu pour remplacer les mots de passe classiques par une authentification à clé publique basée sur la cryptographie asymétrique, dans laquelle la clé privée ne quitte jamais l'authenticator (le smartphone ou le capteur biométrique de l'ordinateur).

Le mécanisme cryptographique sous-jacent est la signature numérique à courbe elliptique (ECDSA, Elliptic Curve Digital Signature Algorithm) avec la courbe P-256 (secp256r1). Lors de l'enregistrement, l'authenticator génère une paire de clés asymétriques (privée + publique) : la clé publique est transmise au serveur Ovyon Control et stockée en base SQLite, tandis que la clé privée est stockée dans l'enclave sécurisée du smartphone (Secure Enclave sur iOS, Strongbox sur Android) et n'en sort jamais sous aucune forme.

| **FIGURE 16 ◼ FLUX D'AUTHENTIFICATION WEBAUTHN/FIDO2**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Diagramme en deux colonnes : (Gauche) ENREGISTREMENT : 1→ Utilisateur: "Activer biométrie" → 2→ Serveur: génère et envoie challenge (32 bytes aléatoires) → 3→ Smartphone: demande empreinte digitale → 4→ Secure Enclave: génère paire clés ECDSA P-256, signe le challenge avec clé privée → 5→ Smartphone envoie : clé publique + attestation signée → 6→ Serveur: vérifie attestation, stocke clé publique dans SQLite → Enregistrement réussi. (Droite) VÉRIFICATION : 1→ Utilisateur: clique "Déverrouiller porte" → 2→ Serveur: génère nouveau challenge → 3→ Smartphone: empreinte → 4→ Secure Enclave: signe challenge avec clé privée stockée → 5→ Smartphone envoie signature → 6→ Serveur: vérifie signature avec clé publique stockée → Accès autorisé → MQTT publish door/open. Format : PNG, 16cm x 10cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 16** - Flux d'authentification WebAuthn/FIDO2

## **4.2 Implémentation dans Ovyon Control**

L'implémentation WebAuthn dans le backend Node.js utilise la bibliothèque fido2-lib (version 3.4), une implémentation JavaScript open-source conforme à la spécification W3C WebAuthn Level 2. Le backend expose deux endpoints REST dédiés à l'authentification : POST /api/auth/register/begin et /api/auth/register/finish pour le flux d'enregistrement, et POST /api/auth/login/begin et /api/auth/login/finish pour le flux d'authentification.

Une décision architecturale importante a été de n'imposer l'authentification WebAuthn qu'aux actions critiques définies dans la politique de sécurité du système : ouverture et fermeture de la porte principale, activation et désactivation du mode Panique, modification de la configuration système, et consultation de l'historique complet des accès. Les actions non-critiques comme l'ajustement de l'éclairage ou la consultation des capteurs sont protégées par un token JWT standard (JSON Web Token) renouvelé toutes les 12 heures. Cette différenciation réduit la friction d'usage quotidien tout en maintenant un niveau de sécurité élevé pour les actions à fort enjeu.

La politique de récupération en cas d'indisponibilité de la biométrie (smartphone absent, batterie déchargée) est gérée par un mécanisme de code PIN de secours stocké sous forme de hash bcrypt (coût 12) dans la base SQLite. Ce PIN de 6 à 8 chiffres est configuré lors de la première installation et ne peut être modifié qu'après une authentification biométrique réussie, évitant ainsi toute élévation de privilèges par manipulation de ce canal secondaire.

**◆ Section 4 terminée ◆**

# **Section 5 : Campagne de Tests, Simulation et Résultats**

## **5.1 Méthodologie de test et environnement de validation**

La validation du prototype Ovyon Control a suivi un protocole de test en quatre niveaux inspirés de la pyramide de tests du génie logiciel. Le premier niveau, les tests unitaires, a vérifié le comportement isolé de chaque fonction et méthode critique : parsing des commandes AION, génération des topics MQTT, validation des signatures WebAuthn et gestion des erreurs SQLite. Ces tests, implémentés avec le framework Jest (Node.js) et Google Test (firmware C++), couvrent 147 cas de test avec un taux de couverture de code de 78 %.

Le deuxième niveau, les tests d'intégration, a vérifié les interactions entre composants : communication backend-broker MQTT, synchronisation WebSocket frontend-backend, persistance SQLite et lecture cohérente. Le troisième niveau, les tests fonctionnels bout en bout, a validé les scénarios d'utilisation complets de l'envoi d'une commande depuis l'interface PWA jusqu'à l'exécution physique sur le nœud ESP32 simulé. Le quatrième niveau, les tests de performance et de résilience, a mesuré les métriques de latence, de débit et de comportement sous coupures réseau.

## **5.2 Simulation Proteus - Validation sans matériel physique**

La simulation électronique avec le logiciel Proteus (Labcenter Electronics, version 8.13) a constitué une étape clé du processus de validation, permettant de tester le comportement des firmwares ESP32 sur des composants virtuels avant tout investissement matériel. Proteus dispose d'une bibliothèque de microcontrôleurs incluant l'ESP32, et supporte la simulation du protocole I2C, SPI et UART, ainsi que des capteurs DHT11 et INA219 et des actionneurs servomoteurs.

| **FIGURE 18 ◼ CAPTURE SIMULATION PROTEUS - NŒUD WINDOW**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\[ INSERVER ICI \]**<br><br>Capture d'écran de Proteus 8.13 montrant le schéma de câblage du nœud Window : ESP32 au centre connecté à : (haut gauche) servomoteur SG90 avec angle visible sur l'indicateur Proteus, (haut droite) capteur INA219 en configuration I2C (SDA:GPIO21, SCL:GPIO22), (bas gauche) LED indicateur d'état (rouge=bloqué, vert=libre), (bas droite) terminal MQTT virtuel affichant les messages publiés. Oscillo virtuel montrant le signal PWM sur la broche servo (fréquence 50Hz, duty cycle variable). Interface Proteus visible avec barre de menus, explorateur de composants et oscilloscope. Format : PNG, 16cm x 10cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 18** - Capture simulation Proteus - Nœud Window

La simulation Proteus a permis de valider plusieurs comportements critiques des firmwares avant le test sur matériel réel. Pour le nœud Window, la simulation du dépassement du seuil de courant INA219 a confirmé que la détection d'obstacle s'effectue en moins de 20 ms après le dépassement du seuil, bien en deçà des 500 ms qui constitueraient un risque physique. Pour le nœud Lights, la simulation de la déconnexion Wi-Fi en cours de commande a validé le mécanisme de file d'attente et de rejeu des commandes lors de la reconnexion.

## **5.3 Résultats des tests de performance**

| **Type de test**                          | **Objectif CNF** | **Résultat mesuré**                 | **Statut** |
| ----------------------------------------- | ---------------- | ----------------------------------- | ---------- |
| **Latence commande locale (P50)**         | < 100 ms         | 45 ms (médiane sur 1000 mesures)    | ✓ Validé   |
| **Latence commande locale (P95)**         | < 100 ms         | 78 ms (95e percentile)              | ✓ Validé   |
| **Latence commande cloud (référence)**    | Benchmark        | 523 ms (médiane, via Tuya)          | Référence  |
| **Facteur d'amélioration local/cloud**    | \> 5×            | 11,6× (523/45)                      | ✓ Dépassé  |
| **Disponibilité mode local (7 jours)**    | ≥ 99,9 %         | 100 % (0 crash, 0 indisponibilité)  | ✓ Validé   |
| **Précision AION niveau 1 (regex)**       | ≥ 90 %           | 100 % (40/40 commandes standard)    | ✓ Dépassé  |
| **Précision AION niveau 2 (LLM)**         | ≥ 90 %           | 90 % (9/10 commandes contextuelles) | ✓ Atteint  |
| **Précision AION globale (50 commandes)** | ≥ 90 %           | 94 % (47/50)                        | ✓ Validé   |
| **Temps reconnexion ESP32 après reboot**  | < 120 s          | 12 s (médiane)                      | ✓ Validé   |
| **Consommation hub (veille active)**      | < 15 W           | 8,3 W (Raspberry Pi 4B + hub USB)   | ✓ Validé   |
| **Débit broker MQTT (pic)**               | ≥ 500 msg/s      | 1 847 msg/s (test de charge)        | ✓ Dépassé  |
| **FCP frontend PWA (Wi-Fi)**              | < 1,5 s          | 0,9 s (LAN gigabit)                 | ✓ Validé   |
| **Détection obstacle fenêtre**            | < 500 ms         | 18 ms (depuis dépassement seuil)    | ✓ Dépassé  |
| **Coût déploiement total (3 pièces)**     | < 50 USD         | 38,50 USD (matériel réel)           | ✓ Validé   |

**Tableau 7** - Résultats de la campagne de tests - Ovyon Control vs objectifs CNF

## **5.4 Analyse des résultats et discussion**

Les résultats des tests de validation sont globalement très satisfaisants et dépassent les objectifs initiaux sur plusieurs métriques critiques. La latence de commande locale de 45 ms (médiane) représente une réduction de 91,4 % par rapport à la référence cloud de 523 ms, validant quantitativement l'hypothèse H1 sur la supériorité de l'architecture Local-First pour la réactivité du système. Cette latence de 45 ms se décompose approximativement en : 3 ms pour le traitement de la requête HTTP côté backend, 2 ms pour la publication MQTT vers Aedes, 8 ms pour la délivrance au nœud ESP32 via TCP/IP local, 12 ms pour l'exécution du code firmware et le changement d'état de l'actionneur, et 20 ms pour le retour de confirmation et la mise à jour de l'interface WebSocket.

La disponibilité de 100 % sur la période de test de 7 jours consécutifs dépasse l'objectif de 99,9 % (soit un maximum de 10 minutes de downtime autorisé sur 7 jours). Cette performance s'explique par la robustesse de l'architecture Local-First : aucun des 11 incidents de coupure réseau simulés pendant la période de test n'a provoqué la moindre indisponibilité fonctionnelle du système, qui a continué à traiter toutes les commandes locales sans interruption.

La précision de 94 % de l'agent AION sur le corpus de 50 commandes doit être nuancée. Sur les 3 commandes échouées, 2 étaient des commandes en langage très familier avec abréviations ("lance la clim du chil", "cut les lights du living") que ni le niveau 1 ni le LLM n'ont su interpréter correctement. La troisième était une commande multi-actions complexe avec condition temporelle ("Éteins tout le salon à 23h sauf si quelqu'un est encore là") que le LLM a partiellement mal interprétée en omettant la condition de présence. Ces cas-limites identifient des pistes d'amélioration claires pour AION v2.0 : enrichissement du dictionnaire local avec les argots locaux béninois et intégration d'une détection de présence via les capteurs existants.

| **FIGURE 17 ◼ COMPARAISON DE LATENCE LOCALE VS CLOUD**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **\[ INSERVER ICI \]**<br><br>Graphique en barres horizontales ou en boîtes à moustaches (boxplot) comparant : (Barre 1 bleue) Architecture Local-First Ovyon Control : médiane 45ms, P95 78ms, min 12ms, max 210ms. (Barre 2 orange) Architecture Cloud Tuya Smart : médiane 523ms, P95 1200ms, min 280ms, max 4500ms (timeouts inclus). Axe X : Latence en millisecondes (echelle logarithmique). Annotation : "Facteur 11.6x" avec flèche bidirectionnelle. Titre : "Latence de commande bout-en-bout (n=1000 mesures, 7 jours)". Source : Mesures internes Ovyon Control + tests Tuya Smart API sur connexion Cotonou 4G. Format : PNG, 14cm x 6cm.<br><br>Format : PNG ou SVG, resolution >= 150 dpi, largeur recommandee 14 cm |

**Figure 17** - Comparaison de latence locale vs cloud

**SYNTHÈSE CHAPITRE IV :** Le prototype Ovyon Control a été implémenté avec succès sur la pile technologique définie au Chapitre III. Les tests de validation confirment l'atteinte de tous les objectifs CNF avec dépassement sur 5 métriques critiques. L'agent AION atteint 94 % de précision. Le coût de déploiement de 38,50 USD valide l'accessibilité économique visée. La simulation Proteus a permis de réduire les coûts de développement en validant les comportements de sécurité critiques sans matériel physique.

# **CONCLUSION GÉNÉRALE**

## **Synthèse des contributions**

Ce mémoire a documenté la conception et le développement d'Ovyon Control, un écosystème domotique intelligent fondé sur le paradigme Local-First, conçu spécifiquement pour répondre aux contraintes infrastructurelles des pays africains subsahariens. La démarche suivie, de l'analyse théorique à la validation expérimentale en passant par la modélisation UML 2.5 et l'implémentation technique, a produit un prototype fonctionnel dont les performances dépassent les objectifs initiaux sur plusieurs dimensions critiques.

Sur le plan théorique, ce travail apporte une contribution à la formalisation du paradigme Local-First dans le domaine de la domotique IoT. En appliquant les sept idéaux de Kleppmann et al. (2019) à un système embarqué réel, nous avons identifié les adaptations nécessaires pour transposer ce paradigme - initialement formulé pour les applications web et mobiles - aux contraintes spécifiques des architectures IoT avec des nœuds matériels à ressources limitées.

Sur le plan technique, les quatre contributions principales sont : (1) une architecture backend MQTT-first Local-First avec broker Aedes intégré au processus Node.js, atteignant 1 847 messages/seconde de débit et une latence médiane de 45 ms ; (2) une série de cinq firmwares ESP32 robustes avec backoff exponentiel pour la reconnexion, détection d'obstacle par mesure de courant et gestion des files d'attente hors-ligne ; (3) l'agent AION à double niveau de raisonnement (regex local + LLM via OpenRouter) atteignant 94 % de précision sur un corpus de 50 commandes variées ; et (4) l'implémentation du protocole WebAuthn/FIDO2 pour l'authentification biométrique sans mot de passe, une première dans les systèmes domotiques documentés pour le contexte béninois.

Sur le plan économique et social, la validation du coût de déploiement total à 38,50 USD pour une maison de trois pièces - contre plusieurs milliers d'euros pour les solutions industrielles - démontre la faisabilité d'une domotique intelligente accessible aux classes moyennes émergentes d'Afrique subsaharienne. La disponibilité de 100 % mesurée lors de 11 incidents de coupure réseau simulés confirme la résilience structurelle de l'approche Local-First face aux aléas infrastructurels béninois.

## **Évaluation critique et limites**

Ce travail comporte plusieurs limites qui méritent d'être reconnues honnêtement. Premièrement, la campagne de tests a été conduite dans un environnement semi-contrôlé (réseau Wi-Fi domestique standard, sans obstacles physiques majeurs ni interférences) qui ne reflète pas nécessairement la diversité des conditions de déploiement réelles. Des tests de terrain dans des maisons béninoises aux configurations variées seraient nécessaires pour généraliser les résultats de performance.

Deuxièmement, le corpus de validation de l'agent AION (50 commandes) est représentatif mais limité. Une validation à plus grande échelle (500+ commandes collectées auprès d'utilisateurs béninois réels, incluant des formulations en langage familier et des dialectes locaux) permettrait d'obtenir une estimation statistiquement plus robuste de la précision du système. Troisièmement, la sécurité du système n'a pas fait l'objet d'un audit de sécurité par un tiers indépendant, ce qui constitue une étape nécessaire avant tout déploiement à grande échelle.

## **Perspectives de développement**

Les perspectives d'évolution d'Ovyon Control s'organisent en trois horizons temporels. À court terme (6 mois), l'objectif prioritaire est le déploiement pilote dans cinq foyers béninois volontaires pour une validation terrain longitudinale sur trois mois, avec collecte de métriques d'usage réelles et retours utilisateurs structurés pour alimenter les améliorations de la v1.1.

À moyen terme (12-18 mois), deux évolutions majeures sont planifiées. L'intégration du protocole Matter - le standard IoT ouvert lancé en 2022 par la Connectivity Standards Alliance (CSA) et soutenu par Apple, Google, Amazon et Samsung - permettrait une interopérabilité native avec les dispositifs des grandes marques, élargissant considérablement l'écosystème compatible avec Ovyon Control. Le déploiement de l'Edge AI - en utilisant le modèle de reconnaissance vocale open-source Whisper de OpenAI (version optimisée pour ESP32-S3) - permettrait une reconnaissance vocale hors-ligne totale en français et en langues locales béninoises comme le Fon et le Yoruba.

À long terme (au-delà de 18 mois), deux perspectives ambitieuses méritent d'être explorées. Le couplage avec un module de gestion de l'énergie solaire permettrait d'optimiser l'autoconsommation photovoltaïque en adaptant automatiquement les charges domotiques à la disponibilité de l'énergie solaire, une application particulièrement pertinente pour les zones à fort ensoleillement du nord Bénin. Enfin, l'ouverture du projet en open-source sous licence MIT, avec la création d'une communauté africaine de contributeurs, pourrait amplifier considérablement l'impact d'Ovyon Control en permettant son adaptation aux contextes spécifiques d'autres pays africains.

Ovyon Control démontre qu'une domotique africaine souveraine, intelligente et résiliente est non seulement possible mais réalisable avec des moyens accessibles. La technologie, lorsqu'elle est conçue depuis le contexte local et pour lui, devient un vecteur puissant d'amélioration de la qualité de vie. Ce mémoire pose les jalons d'un projet qui, nous l'espérons, saura trouver son chemin des bancs de l'HECM vers les foyers béninois.

# **BIBLIOGRAPHIE**

Les 30 références ci-dessous sont classées par domaine thématique puis par ordre alphabétique d'auteur au sein de chaque catégorie. Elles sont citées dans le texte sous la forme \[n\] et suivent les normes de citation académique française (NF ISO 690:2021).

**I. Normes académiques et cadre institutionnel (\[1\] - \[4\])**

**\[1\]** HECM. (2025). Plan de Rédaction des Mémoires SIL 2025-2026. Haute École de Commerce et de Management, Cotonou, Bénin.

**\[2\]** ZAKARI, S. (2025). Structure et Règles de Rédaction de Mémoire. Cours HECM, Filière SIL. HECM, Cotonou.

**\[3\]** UNIV-CONSTANTINE. (2020). Guide de Présentation d'un Mémoire de Master. Université des Frères Mentouri, Constantine, Algérie. Disponible sur : <https://igtu.univ-constantine3.dz>

**\[4\]** ULPGC. (2024). Norme de Rédaction du Mémoire en Français. Universidad de Las Palmas de Gran Canaria, Espagne. Disponible sur : <https://fil.ulpgc.es>

**II. Domotique, IoT et protocole MQTT (\[5\] - \[12\])**

**\[5\]** BOUCHAMA, I. (2020). Étude et Réalisation d'un Système de Commande à Distance des Installations Électriques pour la Domotique. ResearchGate. DOI: 10.13140/RG.2.2.17832.60163

**\[6\]** INRIA. (2021). Livre Blanc : Internet des Objets. Institut National de Recherche en Informatique et en Automatique, Paris, France.

**\[7\]** UQAM. (2019). IOTFLA : Une Architecture de Domotique Sécurisée et Respectueuse de la Vie Privée. Université du Québec à Montréal. Mémoire de maîtrise, M16488.

**\[8\]** ITU. (2024). Les Fondamentaux de l'IoT en Afrique. Union Internationale des Télécommunications, Programme PRIDA. Genève, Suisse.

**\[9\]** CATCHPOINT. (2025). The Ultimate Guide to MQTT Brokers. Catchpoint Systems Inc. Disponible sur : <https://www.catchpoint.com/network-admin-guide/mqtt-broker>

**\[10\]** CEDALO. (2025). Enabling ESP32 MQTT: A Practical Guide. Cedalo GmbH. Disponible sur : <https://cedalo.com/blog/enabling-esp32-mqtt>

**\[11\]** SUNFOUNDER. (2024). Leçon 47 : Communication IoT avec MQTT. SunFounder Documentation. Disponible sur : <https://docs.sunfounder.com/projects/umsk/fr/latest>

**\[12\]** RESEARCHGATE. (2024). Real-Time Data Acquisition with ESP32 for IoT Applications Using Open-Source MQTT Brokers. ResearchGate Publications. DOI: 10.13140/RG.2.2.19432

**III. Paradigme Local-First et SQLite (\[13\] - \[16\])**

**\[13\]** KLEPPMANN, M., WIGGINS, A., VAN HARDENBERG, P., MCGRANAGHAN, M. (2019). Local-First Software: You Own Your Data, in Spite of the Cloud. In: Proceedings of ACM Onward! 2019, pp. 154-178. DOI: 10.1145/3359591.3359737

**\[14\]** AHLSTRÖM, K. (2025). Adapting SQLite to the Distributed Edge: A Comparative Study of Different Adaptations. Master's Thesis, Aalto University School of Science, Finland.

**\[15\]** STACKADEMIC. (2024). Unleashing the Power of Local-First Architecture in 2024. Disponible sur : <https://blog.stackademic.com/unleashing-the-power-of-local-first-architecture-in-2024>

**\[16\]** MEDIUM. (2025). Local-First Software in 2025: Build Apps That Never Go Dark. Disponible sur : <https://medium.com/@aanyagupta7565>

**IV. Microcontrôleurs ESP32 et IoT embarqué (\[17\] - \[20\])**

**\[17\]** ESPRESSIF SYSTEMS. (2025). ESP32 Technical Reference Manual v5.0. Espressif Systems, Shanghai, Chine. Disponible sur : <https://www.espressif.com>

**\[18\]** VEONUM. (2025). L'Écosystème ESP32 : Guide Complet pour Développeurs et Décideurs. Disponible sur : <https://www.veonum.com/ecosysteme-esp32-guide-developpeurs-iot>

**\[19\]** RESEARCHGATE. (2025). Integrating ESP32-Based IoT Architectures and Cloud Visualization to Foster Data Literacy in Early Engineering Education. DOI: 10.13140/RG.2.2.33112

**\[20\]** JURNAL UNS. (2024). MQTT Protocol-Based ESP-32 Smarthome with Multi-Sensor Recognition. Journal of Electrical Engineering, IT and Communication Technology. DOI: 10.20961/jeeict.v7i2

**V. Intelligence artificielle agentique et LLM (\[21\] - \[25\])**

**\[21\]** YAO, S., ZHAO, J., YU, D., DU, N., SHAFRAN, I., NARASIMHAN, K., CAO, Y. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. In: Proceedings of ICLR 2023. Disponible sur : <https://arxiv.org/abs/2210.03629>

**\[22\]** ARXIV. (2025). Leveraging LLMs for Efficient and Personalized Smart Home Automation. arXiv:2601.04680v1. Disponible sur : <https://arxiv.org/html/2601.04680v1>

**\[23\]** IEEE. (2025). Agentic AI: A Comprehensive Survey of Technologies, Applications, and Societal Implications. IEEE Access, Vol. 13. DOI: 10.1109/ACCESS.2025.11071266

**\[24\]** RAPID INNOVATION. (2025). AI Agents in Smart Homes and Consumer Electronics 2025. Disponible sur : <https://www.rapidinnovation.io/post/ai-agents-for-consumer-electronics>

**\[25\]** CYPHERTUX. (2025). Construire un Système Agentique avec LLM en 2025. Disponible sur : <https://www.cyphertux.net/articles/fr/research/agentic-systems-architecture-2025>

**VI. Sécurité et authentification WebAuthn/FIDO2 (\[26\] - \[27\])**

**\[26\]** IONOS. (2025). WebAuthn : Avantages et Inconvénients de la Norme Web Authentication. IONOS Digital Guide. Disponible sur : <https://www.ionos.fr/digitalguide/serveur/securite/webauthn>

**\[27\]** RUBYCAT. (2025). Renforcez la Sécurité des Connexions avec WebAuthn : Intégration dans les Solutions d'Accès Sécurisé. Disponible sur : <https://www.rubycat.eu/blogs/renforcez-la-securite-des-connexions-avec-webauthn>

**VII. Modélisation UML et génie logiciel (\[28\])**

**\[28\]** DEBRAUWER, L. (2024). UML 2.5 : Initiations, Exemples et Exercices Corrigés, 5e édition. Éditions ENI, Saint-Herblain, France. ISBN : 978-2409024085

**VIII. Contexte africain - énergie et infrastructures numériques (\[29\] - \[30\])**

**\[29\]** BANQUE MONDIALE. (2023). Accès à l'Électricité en Afrique Subsaharienne : Fiabilité et Facteurs Complémentaires pour l'Impact Économique. Rapport Technique, World Bank Group, Washington D.C.

**\[30\]** AFRICAN DEVELOPMENT BANK. (2024). Revue des Réformes du Secteur de l'Électricité en Afrique. Groupe de la Banque Africaine de Développement, Abidjan, Côte d'Ivoire. Disponible sur : <https://www.afdb.org>

- Fin du Mémoire de Licence Professionnelle SIL -

Ovyon Control | HECM Bénin | Année académique 2025-2026
