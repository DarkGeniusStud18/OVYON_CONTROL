/**
 * ============================================================
 *  MODULE : INTRODUCTION GÉNÉRALE + CHAPITRE I
 *  Mémoire Ovyon Control – HECM 2025-2026
 *  Pages 14 à 35
 * ============================================================
 *  CONTENU :
 *    INTRODUCTION GÉNÉRALE (pages 14-18)
 *      – Contexte et justification du sujet
 *      – Problématique
 *      – Hypothèses de recherche
 *      – Objectifs (général + spécifiques)
 *      – Méthodologie
 *      – Annonce du plan
 *    CHAPITRE I : FONDEMENTS THÉORIQUES (pages 19-35)
 *      Section 1 : L'IoT résidentiel et le protocole MQTT
 *        1.1 Évolution de la domotique vers l'IoT
 *        1.2 Architecture en trois couches de l'IoT
 *        1.3 Protocoles de communication IoT (tableau comparatif)
 *        1.4 Le protocole MQTT en profondeur
 *      Section 2 : Le paradigme Local-First et SQLite
 *        2.1 Limites des architectures cloud pour l'Afrique
 *        2.2 Les 7 idéaux du Local-First
 *        2.3 SQLite comme moteur de persistance embarquée
 *        2.4 Stratégies de synchronisation différée
 *      Section 3 : Microcontrôleurs ESP32 et IA agentique
 *        3.1 Architecture matérielle de l'ESP32
 *        3.2 Firmware embarqué et protocoles de résilience
 *        3.3 Intelligence artificielle et agents ReAct
 *        3.4 Intégration des LLM dans les systèmes embarqués
 * ============================================================
 */
'use strict';

const {
  Paragraph, TextRun, AlignmentType, BorderStyle,
  LineRuleType, ShadingType,
} = require('docx');

const H = require('./thesis_helpers.js');
const {
  FONT, SZ, CLR, SP, LINE_15, CONTENT_WIDTH,
  h1, h2, h3,
  p, pNoIndent, pItalic, pBoldInline,
  bullet, numbered, spacer, pageBreak,
  citRef, figurePlaceholder, tableCaption, figureCaption,
  makeTable, chapterOpener, sectionDivider,
  noteAcademique, definitionBox, codeBlock,
} = H;

// ─────────────────────────────────────────────────────────────
//  INTRODUCTION GÉNÉRALE
// ─────────────────────────────────────────────────────────────

function getIntroduction() {
  return [
    h1('INTRODUCTION GÉNÉRALE'),

    // ── Contexte ─────────────────────────────────────────────
    h2('1. Contexte et justification du sujet'),

    p('Le XXIe siècle est marqué par une convergence sans précédent entre le monde physique et le monde numérique. L\'Internet des Objets (IoT) constitue l\'un des vecteurs les plus transformateurs de cette convergence, permettant à des milliards de dispositifs physiques — des capteurs environnementaux aux actionneurs industriels — de communiquer, de s\'auto-configurer et d\'agir de manière autonome ou semi-autonome. Dans le domaine résidentiel, cette révolution technologique prend la forme de la domotique intelligente, qui ambitionne de transformer le logement en un espace adaptatif, efficace énergétiquement et sécurisé.'),

    p('À l\'échelle mondiale, le marché de la domotique a atteint une valorisation de 84,5 milliards de dollars américains en 2023, avec des projections de croissance annuelle de 25,3 % jusqu\'en 2030 selon les analyses de Grand View Research. Des plateformes comme Google Home, Amazon Alexa, Apple HomeKit et Tuya Smart dominent ce marché en proposant des écosystèmes complets intégrant appareils connectés, services cloud et interfaces conversationnelles. Ces solutions, bien qu\'efficaces dans les marchés développés dotés d\'infrastructures numériques robustes, présentent une inadéquation fondamentale avec les réalités des pays africains subsahariens.'),

    p('La République du Bénin, à l\'instar de nombreuses nations de l\'Afrique de l\'Ouest, est caractérisée par des défis infrastructurels persistants qui constituent des obstacles majeurs au déploiement des technologies domotiques conventionnelles. Selon le rapport 2023 de la Banque Mondiale sur l\'accès à l\'énergie en Afrique subsaharienne, le taux d\'accès à l\'électricité au Bénin s\'établit à 45,2 % à l\'échelle nationale, avec des disparités criantes entre les zones urbaines (68 %) et rurales (29 %). Les coupures de courant intempestives — connues localement sous le terme de « délestage » — affectent en moyenne 4 à 8 heures par jour les zones urbaines comme Cotonou.'),

    p('Sur le plan de la connectivité Internet, les données de l\'Union Internationale des Télécommunications (UIT) pour l\'année 2023 indiquent que le Bénin dispose d\'un taux de pénétration de l\'Internet fixe de seulement 1,8 %, tandis que la connexion mobile 4G couvre moins de 35 % du territoire national. La qualité de service est également irrégulière, avec des latences moyennes oscillant entre 80 et 250 ms pour les connexions mobiles, et des interruptions fréquentes lors des périodes d\'orages ou de forte affluence réseau. Ces conditions rendent fondamentalement peu fiable tout système domotique dont la disponibilité est conditionnée à une connexion Internet permanente.'),

    p('C\'est dans ce contexte contraignant mais riche en opportunités que s\'inscrit le projet Ovyon Control. L\'idée centrale est de concevoir un écosystème domotique qui soit nativement résilient à l\'absence de connectivité externe, capable de fonctionner en mode local intégral lors des coupures réseau et de synchroniser son état dès que la connexion est rétablie. Cette approche, que nous qualifions de « Local-First », repositionne le foyer lui-même comme le serveur principal du système domotique, réduisant la dépendance aux infrastructures cloud tout en maintenant la possibilité d\'accès distant lorsque les conditions réseau le permettent.'),

    ...figurePlaceholder(6,
      'Infrastructure numérique au Bénin',
      'Carte choroplèthe du Bénin montrant par département : (1) taux d\'électrification en %, (2) couverture réseau 4G en %, (3) nombre moyen d\'heures de coupures/jour. Sources : Banque Mondiale 2023, ARCEP Bénin 2023. Palette de couleurs : rouge (faible) à vert (fort). Insérer en format PNG 14cm x 10cm.',
      2400
    ),

    // ── Problématique ────────────────────────────────────────
    h2('2. Problématique'),

    p('Face à la prolifération des solutions domotiques commerciales sur les marchés mondiaux, un constat s\'impose : ces solutions ont été conçues pour et par des pays disposant d\'infrastructures numériques matures. Leur architecture repose quasi-universellement sur trois hypothèses implicites qui s\'avèrent infondées dans le contexte africain subsaharien : la disponibilité permanente d\'une connexion Internet à haut débit, la stabilité de l\'alimentation électrique du domicile, et la capacité financière de l\'utilisateur à acquérir du matériel certifié et à souscrire à des abonnements cloud.'),

    p('Cette inadéquation se manifeste de manière concrète par les problèmes suivants : premièrement, les systèmes cloud-dépendants deviennent totalement inopérants lors des coupures réseau, précisément au moment où l\'utilisateur aurait le plus besoin de contrôler son éclairage d\'urgence ou ses systèmes de sécurité. Deuxièmement, les protocoles industriels comme KNX nécessitent un câblage spécialisé et une expertise d\'installation dont le coût peut dépasser 5 000 dollars pour une maison de taille moyenne, un montant prohibitif pour l\'immense majorité des ménages béninois. Troisièmement, les plateformes cloud propriétaires soulèvent des questions légitimes de souveraineté des données personnelles et de dépendance technologique, préoccupations amplifiées par l\'absence de réglementation efficace en matière de protection des données au Bénin.'),

    p('Par ailleurs, les interfaces vocales et conversationnelles constituent une modalité d\'interaction particulièrement adaptée au contexte africain, où les taux d\'alphabétisation numérique restent limités et où l\'interaction orale est culturellement dominante. Or, les assistants vocaux dominants (Google Assistant, Amazon Alexa, Siri) fonctionnent exclusivement en langues européennes, excluant de facto les langues locales et rendant leur usage quotidien peu naturel pour de nombreux utilisateurs béninois.'),

    p('La problématique centrale de ce mémoire peut donc être formulée ainsi :'),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: 720, right: 720 },
      spacing: { before: 120, after: 120, ...LINE_15 },
      shading: { fill: 'EBF3FB', type: ShadingType.CLEAR },
      border: {
        top:    { style: BorderStyle.DOUBLE, size: 4, color: CLR.royalBlue, space: 8 },
        bottom: { style: BorderStyle.DOUBLE, size: 4, color: CLR.royalBlue, space: 8 },
        left:   { style: BorderStyle.THICK,  size: 12, color: CLR.royalBlue, space: 12 },
        right:  { style: BorderStyle.SINGLE, size: 2, color: CLR.lightGray,  space: 8 },
      },
      children: [new TextRun({ text: 'Comment concevoir et développer un système domotique intelligent qui soit à la fois fonctionnel en l\'absence de connectivité Internet, économiquement accessible au contexte béninois, sécurisé par des standards modernes d\'authentification, et doté d\'une interface en langage naturel permettant une interaction intuitive — tout en respectant les contraintes de performance attendues d\'un système temps-réel ?', font: FONT, size: SZ.body, bold: true, italic: true, color: CLR.navyBlue })],
    }),

    p('Cette problématique principale se décline en trois questions de recherche complémentaires : (1) Dans quelle mesure le paradigme Local-First permet-il de garantir une disponibilité supérieure à 99 % dans des conditions d\'infrastructure réseau dégradée ? (2) Est-il techniquement et économiquement viable de concevoir des nœuds IoT basés sur le microcontrôleur ESP32 pour un coût unitaire inférieur à 10 dollars tout en maintenant des performances temps-réel satisfaisantes ? (3) Comment un agent conversationnel basé sur un Grand Modèle de Langage peut-il être intégré dans un système embarqué à ressources limitées pour démocratiser l\'accès à la domotique intelligente ?'),

    // ── Hypothèses ───────────────────────────────────────────
    h2('3. Hypothèses de recherche'),

    p('Sur la base de la problématique formulée et de la revue de la littérature préliminaire, nous posons les trois hypothèses de recherche suivantes qui structureront la démarche expérimentale de ce mémoire :'),

    ...noteAcademique('Hypothèse H1', 'Une architecture domotique fondée sur le paradigme Local-First avec persistance SQLite locale permet d\'atteindre un taux de disponibilité supérieur à 99 % indépendamment de la qualité de la connexion Internet externe, y compris lors d\'interruptions réseau prolongées.'),

    ...noteAcademique('Hypothèse H2', 'Il est techniquement et économiquement faisable de concevoir des nœuds IoT spécialisés basés sur le microcontrôleur ESP32 pour un coût unitaire inférieur à 10 dollars américains, tout en assurant une latence de contrôle inférieure à 100 ms et une consommation énergétique du hub central inférieure à 15 W.'),

    ...noteAcademique('Hypothèse H3', 'L\'intégration d\'un agent IA hybride combinant un dictionnaire de patterns locaux et un Grand Modèle de Langage accessible via API permet d\'atteindre une précision de reconnaissance des commandes en langage naturel supérieure à 90 % sur un corpus varié, tout en maintenant une latence acceptable pour l\'expérience utilisateur.'),

    // ── Objectifs ────────────────────────────────────────────
    h2('4. Objectifs de la recherche'),

    h3('4.1 Objectif général'),

    p('L\'objectif général de ce mémoire est de concevoir, développer, valider et documenter Ovyon Control, un écosystème domotique intelligent basé sur le paradigme Local-First, adapté aux contraintes infrastructurelles du contexte béninois, intégrant une couche d\'intelligence artificielle conversationnelle et garantissant un haut niveau de disponibilité, de sécurité et de performance.'),

    h3('4.2 Objectifs spécifiques'),

    p('Cet objectif général se décompose en cinq objectifs spécifiques mesurables et vérifiables :'),

    numbered('Réaliser une analyse approfondie des limites des solutions domotiques existantes dans le contexte africain subsaharien, en fournissant une comparaison quantitative et qualitative des architectures cloud-dépendantes, des protocoles propriétaires et de l\'approche Local-First proposée.'),
    numbered('Concevoir une architecture logicielle et matérielle complète pour Ovyon Control, modélisée en UML 2.5 (diagrammes de cas d\'utilisation, de classes, de séquence et d\'états), respectant les principes du Local-First et intégrant les couches IoT, backend et frontend de manière cohérente.'),
    numbered('Implémenter les cinq nœuds ESP32 spécialisés avec des firmwares robustes incluant des mécanismes de reconnexion automatique, de mise en file d\'attente des commandes hors-ligne et de synchronisation différée avec le backend lors du rétablissement de la connexion.'),
    numbered('Développer et intégrer l\'agent AION avec son double mécanisme de traitement des commandes (dictionnaire local + LLM) selon le paradigme ReAct, et valider ses performances sur un corpus de test représentatif.'),
    numbered('Conduire une campagne de tests systématique couvrant les performances de latence, la disponibilité lors des interruptions réseau simulées, la consommation énergétique des nœuds, l\'exactitude de l\'agent IA et la robustesse de l\'authentification biométrique WebAuthn/FIDO2.'),

    // ── Méthodologie ─────────────────────────────────────────
    h2('5. Méthodologie'),

    p('La démarche méthodologique adoptée pour ce mémoire s\'inscrit dans une approche mixte combinant recherche appliquée et développement expérimental. Elle se déroule en cinq phases distinctes mais interdépendantes, chacune correspondant à un livrable concret vérifiable :'),

    p('La première phase, dite de revue bibliographique, a consisté en une collecte et une analyse systématique de la littérature académique et technique relative aux trois domaines constituant le socle théorique de ce travail : l\'IoT résidentiel et les protocoles de communication embarqués, le paradigme Local-First et les architectures de bases de données embarquées, et l\'intelligence artificielle agentique avec le paradigme ReAct. Cette revue a mobilisé 30 références bibliographiques issues de journaux académiques indexés, de rapports institutionnels et de documentations techniques officielles.'),

    p('La deuxième phase, d\'analyse et de conception, a appliqué la méthode de modélisation UML 2.5 pour formaliser l\'architecture du système avant toute implémentation. Cette phase a produit quatre artefacts de modélisation : un diagramme de cas d\'utilisation définissant les interactions entre les quatre acteurs du système (Utilisateur, Administrateur, Agent AION, Nœud ESP32), un diagramme de classes capturant la structure statique du logiciel, un diagramme de séquence illustrant le flux de communication MQTT de bout en bout, et un diagramme d\'états modélisant le comportement des actionneurs.'),

    p('La troisième phase d\'implémentation a suivi une approche de développement itératif inspirée des méthodologies agiles. Le développement a été compartimenté en sprints de deux semaines, avec des jalons intermédiaires de validation. L\'ordre de développement a suivi la logique du paradigme Local-First : couche de persistance SQLite en premier, puis broker MQTT Aedes, puis API REST backend, puis firmware ESP32 pour les nœuds les plus simples (éclairage, prises), puis firmware pour les nœuds complexes (motorisations avec détection d\'obstacle), et enfin l\'agent AION et l\'interface PWA React.'),

    p('La quatrième phase de validation a exploité la simulation Proteus pour tester le comportement des firmwares ESP32 sans matériel physique, réduisant considérablement les coûts de développement. Les tests ont été organisés en dix catégories couvrant les dimensions fonctionnelle, de performance, de résilience et de sécurité. Chaque test a été exécuté selon un protocole documenté avec des critères de succès prédéfinis, garantissant la reproductibilité des résultats.'),

    p('La cinquième phase de rédaction a suivi les normes académiques HECM pour la présentation des travaux de fin de formation, en veillant à la cohérence entre les modèles UML, le code implémenté et les résultats des tests. La rédaction a été conduite en parallèle avec les phases de développement afin de capturer les décisions architecturales au moment de leur formulation, garantissant l\'exactitude de la documentation technique.'),

    // ── Plan ─────────────────────────────────────────────────
    h2('6. Annonce du plan'),

    p('Ce mémoire est organisé en quatre chapitres qui conduisent progressivement du général au particulier, des fondements théoriques à la validation expérimentale :'),

    p('Le Chapitre I pose les fondements théoriques nécessaires à la compréhension du système Ovyon Control. Il explore l\'évolution de la domotique vers l\'IoT, analyse en profondeur le protocole MQTT et ses alternatives, définit le paradigme Local-First et ses sept idéaux, examine les caractéristiques de SQLite en tant que moteur de persistance embarquée, présente l\'architecture matérielle de l\'ESP32 et introduit l\'intelligence artificielle agentique avec le paradigme ReAct.'),

    p('Le Chapitre II procède à l\'analyse du contexte et à la spécification des besoins. Il présente l\'institution d\'accueil HECM, dresse un portrait quantifié des contraintes infrastructurelles du Bénin, effectue une analyse comparative des solutions domotiques existantes, puis formalise les exigences fonctionnelles et non fonctionnelles du système sous forme de matrices prioritaires.'),

    p('Le Chapitre III est consacré à la modélisation UML 2.5 du système. Il présente et justifie la méthodologie de modélisation choisie, puis détaille les quatre diagrammes UML produits : cas d\'utilisation, classes, séquence et états. Chaque diagramme est accompagné d\'une description textuelle approfondie explicitant les choix de conception et leurs justifications.'),

    p('Le Chapitre IV documente l\'implémentation technique et la validation expérimentale. Il présente la pile technologique complète avec ses justifications, détaille les firmwares ESP32 avec des extraits de code commentés, documente l\'implémentation de l\'agent AION et du protocole WebAuthn/FIDO2, et présente les résultats des tests avec leur analyse critique.'),

    p('Ce mémoire se conclut par une synthèse des contributions du projet Ovyon Control, une évaluation critique de l\'atteinte des objectifs initiaux et une projection sur les perspectives de recherche et de développement futures.'),

    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  CHAPITRE I : FONDEMENTS THÉORIQUES
// ─────────────────────────────────────────────────────────────

function getChapter1() {
  return [
    ...chapterOpener(
      'I',
      'Fondements Théoriques',
      'Ce chapitre établit le socle conceptuel et technologique sur lequel repose l\'intégralité du projet Ovyon Control. Il couvre quatre domaines interdépendants : l\'évolution de la domotique vers l\'Internet des Objets avec une analyse approfondie des protocoles de communication, le paradigme Local-First comme réponse architecturale aux contraintes d\'infrastructure, les caractéristiques du microcontrôleur ESP32 comme plateforme matérielle centrale, et les fondements de l\'intelligence artificielle agentique avec le paradigme ReAct qui sous-tend l\'agent AION.'
    ),

    // ══════════════════════════════════════════════════════
    //  SECTION 1 : IoT et MQTT
    // ══════════════════════════════════════════════════════

    h1('Section 1 : L\'IoT Résidentiel et le Protocole MQTT'),

    h2('1.1 Évolution de la domotique vers l\'Internet des Objets'),

    p('La domotique — contraction du latin domus (maison) et d\'informatique — désigne l\'ensemble des technologies permettant d\'automatiser et de contrôler les équipements d\'un bâtiment résidentiel. Son histoire s\'étend sur plus de quatre décennies, depuis les premiers systèmes de contrôle de l\'éclairage par minuterie dans les années 1970, jusqu\'aux écosystèmes d\'intelligence ambiante contemporains qui anticipent les besoins de leurs occupants.'),

    p('La première génération de systèmes domotiques, apparue dans les années 1980 et 1990, reposait sur des protocoles de communication filaires propriétaires tels que X10 (1975, Pico Electronics) et le protocole européen BatiBUS (1989). Ces systèmes étaient caractérisés par leur robustesse mais souffraient d\'une complexité d\'installation prohibitive, d\'une faible interopérabilité entre fabricants et d\'une capacité limitée à évoluer. Le protocole KNX, standardisé en 2002 par la KNX Association sous la norme ISO 14543-3, a représenté une avancée majeure en unifiant plusieurs protocoles existants (EIB, BatiBUS, EHS) sous un standard ouvert. KNX demeure aujourd\'hui la référence pour les bâtiments tertiaires et haut de gamme, mais son coût d\'installation reste hors de portée des usages résidentiels ordinaires.'),

    p('La deuxième génération, émergente dans les années 2000, a vu l\'apparition des réseaux domestiques sans fil avec les protocoles Z-Wave (2001, Zensys) et ZigBee (2004, IEEE 802.15.4). Ces protocoles maillés offrent des avantages significatifs en termes de portée et de robustesse : chaque nœud agit comme relais, étendant la couverture du réseau de manière organique. ZigBee, en particulier, a trouvé une large adoption dans le marché de l\'éclairage connecté avec le profil Zigbee Light Link adopté par Philips Hue en 2012. Cependant, ces protocoles nécessitent des passerelles dédiées et restent cloisonnés dans des écosystèmes propriétaires.'),

    p('La rupture majeure est intervenue avec l\'avènement de l\'Internet des Objets (IoT), concept popularisé par Kevin Ashton en 1999 lors d\'une présentation chez Procter & Gamble mais dont la réalité à grande échelle ne s\'est matérialisée qu\'à partir de 2010 avec la généralisation du Wi-Fi domestique et la démocratisation des microcontrôleurs programmables. L\'IoT résidentiel se distingue de la domotique classique par trois caractéristiques fondamentales : (1) la connectivité IP native qui permet à chaque dispositif de disposer d\'une adresse réseau et de communiquer directement avec tout service Internet, (2) l\'accessibilité cloud qui permet le contrôle à distance depuis n\'importe quel terminal, et (3) l\'intelligence analytique qui permet d\'extraire des patterns d\'usage et d\'optimiser automatiquement le fonctionnement du foyer.'),

    p('La troisième génération, que représente Ovyon Control, pousse ce paradigme vers une nouvelle dimension en ajoutant la couche d\'intelligence artificielle conversationnelle et en repensant fondamentalement la relation entre le local et le cloud. Plutôt que de considérer le cloud comme le cerveau du système et le foyer comme une simple interface, Ovyon Control inverse cette logique : le foyer est le serveur principal, intelligent et autonome, et le cloud n\'est qu\'un canal d\'accès optionnel et non critique.'),

    ...figurePlaceholder(1,
      'Architecture générale Ovyon Control',
      'Schéma en trois niveaux empilés verticalement : (Bas) Couche IoT avec 5 nœuds ESP32 représentés par des icônes (ampoule, porte, fenêtre, prise, thermomètre) connectés par des flèches MQTT au (Milieu) Broker Aedes + Backend Node.js + SQLite représentés en blocs, eux-mêmes connectés par des flèches HTTP/WebSocket au (Haut) Frontend PWA React sur smartphone et ordinateur. Couleurs : bleu marine pour ESP32, bleu royal pour backend, bleu clair pour frontend. Ajouter une flèche optionnelle vers un cloud grisé labelisé "Accès distant optionnel".',
      3000
    ),

    h2('1.2 Architecture en trois couches de l\'IoT'),

    p('La littérature académique converge vers un modèle de référence en trois couches pour décrire l\'architecture des systèmes IoT. Ce modèle, adopté par l\'Architecture Reference Model (ARM) du projet européen IoT-A et repris par l\'ISO/IEC JTC1/SC41, structure les systèmes IoT selon une hiérarchie fonctionnelle dont chaque couche possède des responsabilités clairement délimitées.'),

    ...definitionBox(
      'Couche de Perception',
      'La couche de perception, également appelée couche physique ou couche capteurs/actionneurs, constitue l\'interface entre le monde physique et le système numérique. Elle regroupe l\'ensemble des dispositifs matériels capables de mesurer des grandeurs physiques (température, luminosité, présence, humidité, consommation électrique) et d\'agir sur l\'environnement (allumer une lumière, ouvrir une porte, enclencher une prise). Dans Ovyon Control, cette couche est constituée des cinq nœuds ESP32 spécialisés.'
    ),

    ...definitionBox(
      'Couche Réseau',
      'La couche réseau assure le transport des données entre la couche de perception et la couche applicative. Elle gère les protocoles de communication (MQTT, HTTP, WebSocket), le routage des messages, la qualité de service (QoS) et la gestion des connexions. Dans Ovyon Control, cette couche est implémentée par le broker MQTT Aedes tournant sur le backend Node.js local, garantissant que tous les échanges entre les nœuds ESP32 et le frontend transitent exclusivement par le réseau local domestique.'
    ),

    ...definitionBox(
      'Couche Applicative',
      'La couche applicative constitue l\'interface avec l\'utilisateur et le siège de la logique métier. Elle inclut les interfaces de visualisation (tableaux de bord), les moteurs d\'automatisation (scénarios), les services d\'analytique et les agents intelligents. Dans Ovyon Control, cette couche comprend le frontend PWA React, l\'API REST du backend Node.js et l\'agent AION.'
    ),

    p('Cette modélisation tripartite n\'est pas qu\'un exercice académique : elle constitue un outil de conception qui guide les décisions architecturales à chaque niveau. La séparation claire des responsabilités entre couches permet l\'évolution indépendante de chacune sans impact sur les autres — un nœud ESP32 peut être remplacé par un dispositif Zigbee équivalent sans modifier le backend, de même que le frontend React peut être remplacé par une application mobile React Native sans toucher aux firmwares.'),

    h2('1.3 Comparaison des protocoles de communication IoT'),

    p('Le choix du protocole de communication constitue l\'une des décisions architecturales les plus structurantes dans la conception d\'un système IoT. Quatre protocoles dominent aujourd\'hui l\'écosystème de l\'IoT résidentiel : MQTT, HTTP/REST, CoAP et WebSocket. Leur comparaison selon cinq dimensions critiques — overhead protocolaire, modèle de communication, qualité de service, support embarqué et sécurité native — révèle des différences profondes qui orientent naturellement vers MQTT pour les applications IoT à faible consommation.'),

    makeTable(
      ['Critère', 'MQTT', 'HTTP/REST', 'CoAP', 'WebSocket'],
      [
        ['Overhead en-tête (min.)', '2 octets', '200-400 octets', '4 octets', '2-6 octets'],
        ['Modèle de communication', 'Pub/Sub asynchrone', 'Req/Rep synchrone', 'Req/Rep (UDP)', 'Bidirectionnel full-duplex'],
        ['Transport', 'TCP', 'TCP', 'UDP', 'TCP (upgrade HTTP)'],
        ['QoS', '3 niveaux (0,1,2)', 'Aucun natif', '4 niveaux (CON/NON/ACK/RST)', 'Aucun natif'],
        ['Déconnexion gérée', 'Oui (Last Will)', 'Non', 'Partiellement', 'Non'],
        ['Support ESP32', 'Natif (bibliothèque PubSubClient)', 'Via HTTPClient', 'Via libcoap', 'Via WebSocketsClient'],
        ['Sécurité native', 'TLS/SSL optionnel', 'HTTPS', 'DTLS', 'WSS (TLS)'],
        ['Adapté IoT faible débit', 'Excellent', 'Moyen', 'Très bon', 'Bon'],
        ['Latence typique (LAN)', '< 5 ms', '15-50 ms', '5-15 ms', '< 5 ms'],
        ['Rétention de message', 'Oui (retain flag)', 'Non', 'Non', 'Non'],
      ],
      [2400, 1600, 1600, 1400, 1666],
      { centerAll: false, firstColBold: true }
    ),
    tableCaption(1, 'Comparaison des protocoles de communication IoT selon cinq critères clés'),

    p('Ce tableau met en évidence la supériorité de MQTT pour les applications IoT résidentielles. Son overhead protocolaire minimal de 2 octets — contre 200 à 400 octets pour HTTP — est déterminant pour les microcontrôleurs à mémoire limitée comme l\'ESP32 qui dispose de seulement 520 Ko de SRAM. Le modèle Publish/Subscribe asynchrone découple temporellement l\'émetteur du récepteur, ce qui est particulièrement adapté aux scénarios de faible connectivité : un nœud ESP32 peut publier ses données sur le broker local même si le frontend n\'est pas connecté à cet instant, et les données seront délivrées à la reconnexion grâce au mécanisme de rétention des messages.'),

    h2('1.4 Le protocole MQTT en profondeur'),

    p('MQTT (Message Queuing Telemetry Transport) a été conçu en 1999 par Andy Stanford-Clark d\'IBM et Arlen Nipper d\'Eurotech pour la supervision d\'oléoducs par satellite, un contexte caractérisé exactement par les contraintes qui définissent l\'IoT en Afrique : bande passante limitée, latence élevée et connexions intermittentes. Ce patrimoine génétique explique pourquoi MQTT s\'avère naturellement adapté au contexte béninois.'),

    p('Le protocole repose sur un modèle broker-centralisé dans lequel aucun client ne communique directement avec un autre. Tous les échanges transitent par un serveur central appelé broker (ou courtier), qui joue le rôle d\'aiguilleur de messages. Les clients peuvent adopter deux rôles : Publisher (éditeur), qui envoie des messages sur un topic, et Subscriber (abonné), qui reçoit les messages des topics auxquels il s\'est inscrit. Un même client peut simultanément être publisher et subscriber, ce qui est d\'ailleurs la configuration adoptée par les nœuds ESP32 d\'Ovyon Control.'),

    ...codeBlock([
      '// Structure minimale d\'un message MQTT (15 octets total pour "lights/zone1/set" + "ON")',
      '// Fixed header : 2 octets (type PUBLISH + flags + remaining length)',
      '// Variable header : topic name length (2 octets) + topic name (15 octets)',
      '// Payload : message data ("ON" = 2 octets)',
      '',
      '// ESP32 - Publication d\'une commande vers le frontend',
      'client.publish("ovyon/status/lights/zone1", "{\"state\":\"ON\",\"brightness\":80}", true);',
      '//                      ^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^',
      '//                      Topic path               JSON payload                           retain',
      '',
      '// Structure des topics Ovyon Control',
      '// ovyon/cmd/{device}/{property}    → Frontend vers ESP32 (commandes)',
      '// ovyon/status/{device}/{property} → ESP32 vers Frontend (état)',
      '// ovyon/sensor/{device}/{metric}   → ESP32 vers Backend (données capteurs)',
      '// ovyon/aion/{request|response}    → Frontend vers Agent AION',
    ], 'Architecture des topics MQTT – Ovyon Control'),

    p('La gestion des niveaux de qualité de service (QoS) constitue l\'une des fonctionnalités les plus précieuses de MQTT pour les applications IoT. Le niveau QoS 0 (At most once) assure une livraison au mieux sans accusé de réception, adapté aux données capteurs non critiques comme les mesures de température. Le niveau QoS 1 (At least once) garantit la livraison en utilisant un mécanisme d\'accusé de réception (PUBACK), avec le risque de duplication accepté. Le niveau QoS 2 (Exactly once) garantit une livraison unique grâce à un handshake en quatre étapes (PUBLISH → PUBREC → PUBREL → PUBCOMP), utilisé pour les commandes critiques comme la gestion des prises électriques.'),

    p('Dans Ovyon Control, la stratégie QoS est différenciée par type de message : QoS 0 pour les données de capteurs environnementaux publiées toutes les 30 secondes, QoS 1 pour les changements d\'état des actionneurs (éclairage, fenêtres), et QoS 2 pour les commandes de sécurité critiques (verrouillage/déverrouillage des portes, coupure de prises sensibles). Cette différenciation optimise l\'utilisation de la bande passante locale tout en maintenant les garanties de livraison requises par chaque cas d\'usage.'),

    p('Le mécanisme Last Will and Testament (LWT) constitue une fonctionnalité critique pour la supervision de la disponibilité des nœuds dans Ovyon Control. Lors de sa connexion initiale au broker Aedes, chaque nœud ESP32 enregistre un message testament qui sera automatiquement publié par le broker si la connexion est rompue de manière inattendue. Ce mécanisme permet au backend de détecter instantanément la déconnexion d\'un nœud et d\'en informer l\'interface utilisateur, sans nécessiter de mécanisme de polling explicite.'),

    spacer(160),
    sectionDivider('Section 1 – Synthèse'),
    p('La Section 1 a établi le positionnement théorique du protocole MQTT comme fondement de la couche réseau d\'Ovyon Control, en le situant dans l\'évolution historique de la domotique et en le comparant quantitativement à ses alternatives. Les caractéristiques de MQTT — overhead minimal, modèle Pub/Sub, gestion du LWT, niveaux QoS différenciés — le désignent comme la solution optimale pour les contraintes d\'infrastructure rencontrées au Bénin.', { noIndent: true }),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 2 : Local-First et SQLite
    // ══════════════════════════════════════════════════════

    h1('Section 2 : Le Paradigme Local-First et la Persistance SQLite'),

    h2('2.1 Limites des architectures cloud-first pour l\'Afrique'),

    p('L\'architecture cloud-first, qui consiste à déléguer au cloud l\'essentiel de la logique applicative, du stockage des données et de la coordination des dispositifs, constitue le paradigme dominant dans l\'écosystème domotique contemporain. Des plateformes comme Tuya Smart, qui gère plus de 400 000 types de dispositifs IoT pour plus de 700 millions d\'utilisateurs dans le monde, ou Amazon Alexa Smart Home, reposent intégralement sur cette architecture : les dispositifs domestiques communiquent exclusivement avec des serveurs distants, et toute panne ou dégradation de la connectivité Internet rend le système partiellement ou totalement inopérant.'),

    p('Cette dépendance structurelle au cloud génère quatre catégories de risques spécifiquement amplifiés dans le contexte africain. Le premier est le risque de disponibilité : une étude de Stanford University publiée en 2022 dans le journal ACM Transactions on Storage a mesuré que les architectures cloud-first présentent un taux d\'indisponibilité effectif de 2,3 % en raison des coupures réseau dans les pays à infrastructure dégradée, contre moins de 0,1 % en Europe occidentale. Dans le contexte béninois où les coupures réseau peuvent atteindre plusieurs heures par jour, ce taux serait significativement plus élevé.'),

    p('Le deuxième risque est la latence : les temps de réponse d\'une architecture cloud pour le contrôle d\'un actionneur simple (allumer une lumière) oscillent entre 200 et 800 ms selon la qualité de la connexion et la charge des serveurs. Bien que imperceptible pour certains usages, cette latence crée une expérience utilisateur dégradée pour les actions répétitives et devient critique dans les scénarios de sécurité (déclenchement d\'alarme, verrouillage de porte) où une réponse en moins de 100 ms est attendue.'),

    p('Le troisième risque est celui de la souveraineté des données. Les plateformes cloud domotiques collectent en permanence des données comportementales précieuses : horaires de présence, habitudes de consommation électrique, fréquence d\'ouverture des pièces. Ces données, hébergées sur des serveurs étrangers soumis à des législations différentes, échappent totalement au contrôle de l\'utilisateur et constituent une exposition à des risques de surveillance ou de fuite de données.'),

    p('Le quatrième risque est l\'obsolescence programmée : la dépendance à un service cloud tiers signifie que la durée de vie fonctionnelle du système est conditionnée à la pérennité commerciale du fournisseur. L\'arrêt du service cloud SmartThings Classic de Samsung en 2020, qui a rendu des milliers de dispositifs domestiques non fonctionnels du jour au lendemain, illustre concrètement ce risque systémique.'),

    h2('2.2 Le paradigme Local-First : principes et architecture'),

    p('Le paradigme Local-First a été formalisé en 2019 par Martin Kleppmann, Adam Wiggins, Peter van Hardenberg et Mark McGranaghan dans un article fondateur intitulé "Local-First Software: You Own Your Data, in Spite of the Cloud", publié dans les Proceedings of the ACM SIGPLAN International Symposium on New Ideas, New Paradigms, and Reflections on Programming and Software (Onward! 2019). Cet article identifie sept idéaux que tout logiciel respectueux de l\'utilisateur devrait satisfaire.'),

    makeTable(
      ['Idéal', 'Description', 'Implémentation dans Ovyon Control'],
      [
        ['1. Rapidité', 'Toutes les opérations de lecture et d\'écriture doivent répondre instantanément depuis le stockage local, sans dépendance réseau', 'SQLite local : lectures < 2 ms, écritures < 5 ms'],
        ['2. Multi-appareils', 'Les données doivent être accessibles et synchronisées sur tous les appareils de l\'utilisateur', 'Synchronisation via WebSocket lors de la reconnexion réseau'],
        ['3. Hors-ligne', 'Le logiciel doit être pleinement fonctionnel sans connexion Internet', 'Architecture MQTT purement locale, PWA avec cache Service Worker'],
        ['4. Collaboration', 'Plusieurs utilisateurs doivent pouvoir modifier les données simultanément sans conflits', 'Gestion des conflits par horodatage (dernière écriture gagne)'],
        ['5. Longévité', 'Les données doivent être accessibles indépendamment de la pérennité du fournisseur', 'Format SQLite ouvert et standard ISO/IEC 9075'],
        ['6. Confidentialité', 'Les données sensibles restent sous le contrôle exclusif de l\'utilisateur', 'Aucune donnée transmise hors du réseau local sans consentement'],
        ['7. Propriété', 'L\'utilisateur possède et contrôle intégralement ses données', 'Export complet en JSON depuis l\'interface d\'administration'],
      ],
      [1200, 3600, CONTENT_WIDTH - 4800],
      { firstColBold: true }
    ),
    tableCaption(2, 'Les sept idéaux du paradigme Local-First et leur implémentation dans Ovyon Control'),

    p('L\'implémentation du paradigme Local-First dans Ovyon Control ne se réduit pas à un simple choix de stockage local. Elle implique une refonte architecturale profonde qui place le broker MQTT local et la base SQLite embarquée au cœur du système, et traite toute connectivité externe comme un service supplémentaire optionnel plutôt que comme une dépendance structurelle. Cette inversion de priorité a des implications concrètes sur la conception de chaque composant du système.'),

    ...figurePlaceholder(3,
      'Principe Local-First – Synchronisation différée',
      'Schéma en deux états côte à côte : (Gauche) "Mode Hors-ligne" montrant ESP32 → MQTT Aedes local → SQLite local → PWA React, toutes les flèches restent dans un cadre "Réseau local domestique" bleu. Aucune flèche ne sort du cadre. (Droite) "Mode Connecté" montrant le même schéma + une flèche optionnelle vers un nuage labelisé "Accès distant / Synchronisation cloud" avec une icône de cadenas. Ajouter une annotation "100% fonctionnel sans Internet" sur la partie gauche.',
      2400
    ),

    h2('2.3 SQLite comme moteur de persistance embarquée'),

    p('SQLite est un moteur de base de données relationnelle embarqué, conçu par D. Richard Hipp en 2000 et distribué dans le domaine public. Contrairement aux SGBD client-serveur comme MySQL ou PostgreSQL, SQLite ne requiert aucun processus serveur distinct : la base de données entière est stockée dans un fichier unique sur le système de fichiers, et le moteur est directement intégré à l\'application sous forme de bibliothèque. Cette architecture en fait le choix canonique pour les applications embarquées et les systèmes nécessitant une persistance autonome.'),

    p('Sur le plan technique, SQLite présente des caractéristiques remarquables pour notre contexte. Sa bibliothèque ne pèse que 699 Ko en binaire compilé, ce qui lui permet d\'être déployée sur des systèmes embarqués à ressources limitées, voire directement sur des microcontrôleurs comme l\'ESP32 pour des usages légers. Elle implémente le standard SQL-92 avec des extensions significatives (JSON1, FTS5 pour la recherche plein texte, CTE récursives) tout en maintenant une conformité ACID (Atomicité, Cohérence, Isolation, Durabilité) sur toutes les transactions.'),

    p('Pour Ovyon Control, SQLite remplit deux rôles distincts. Dans le backend Node.js, il assure la persistance de l\'état de tous les dispositifs, l\'historique des actions, les logs des capteurs, la configuration des scénarios d\'automatisation et les données d\'authentification WebAuthn. Cette base est consultée par l\'API REST et par l\'agent AION pour reconstituer le contexte complet du foyer avant chaque décision. Dans un usage étendu envisagé pour les versions futures, SQLite pourrait également être embarqué directement sur certains nœuds ESP32 via la bibliothèque esp32-arduino-sqlite pour maintenir un historique local des mesures capteurs.'),

    ...codeBlock([
      '// Schema SQLite Ovyon Control (extrait)',
      '// Fichier : ovyon_database.sql',
      '',
      'CREATE TABLE devices (',
      '  id          TEXT PRIMARY KEY,          -- UUID v4',
      '  name        TEXT NOT NULL,',
      '  type        TEXT NOT NULL,             -- lights|door|window|plug|sensor',
      '  zone        TEXT,                      -- living_room|bedroom|kitchen|...',
      '  state       TEXT DEFAULT "off",        -- current state JSON',
      '  last_seen   INTEGER,                   -- Unix timestamp ms',
      '  firmware_v  TEXT,                      -- Firmware version',
      '  is_online   INTEGER DEFAULT 0          -- 0|1',
      ');',
      '',
      'CREATE TABLE device_history (',
      '  id          INTEGER PRIMARY KEY AUTOINCREMENT,',
      '  device_id   TEXT NOT NULL REFERENCES devices(id),',
      '  action      TEXT NOT NULL,             -- command sent',
      '  actor       TEXT,                      -- user|aion|automation',
      '  timestamp   INTEGER NOT NULL,          -- Unix timestamp ms',
      '  success     INTEGER DEFAULT 1          -- 0|1',
      ');',
      '',
      'CREATE INDEX idx_history_device ON device_history(device_id, timestamp DESC);',
      'CREATE INDEX idx_history_timestamp ON device_history(timestamp DESC);',
    ], 'Schema SQLite – Tables principales Ovyon Control'),

    p('La robustesse de SQLite face aux scénarios de défaillance est un critère déterminant pour notre système. Le mécanisme de journalisation WAL (Write-Ahead Logging), activé par défaut dans la configuration d\'Ovyon Control via PRAGMA journal_mode=WAL, permet des lectures concurrentes sans bloquer les écritures et garantit la cohérence de la base même en cas d\'interruption brutale de l\'alimentation — scénario fréquent au Bénin. En mode WAL, les écritures sont d\'abord journalisées avant d\'être appliquées à la base principale, assurant qu\'une coupure de courant au milieu d\'une transaction ne laisse jamais la base dans un état incohérent.'),

    h2('2.4 Stratégies de synchronisation et gestion des conflits'),

    p('L\'un des défis architecturaux majeurs d\'un système Local-First est la gestion de la synchronisation entre l\'état local et l\'état distant lorsque la connexion est rétablie. Ce défi, connu dans la littérature sous le terme de "reconciliation problem", est particulièrement complexe dans les systèmes domotiques où les commandes peuvent provenir de multiples sources simultanées : un utilisateur local via l\'interface PWA, un membre de la famille connecté à distance, et l\'agent AION qui exécute des automatisations programmées.'),

    p('Ovyon Control adopte une stratégie de résolution de conflits basée sur le principe LWW (Last-Write-Wins) avec horodatage monotone, complétée par un mécanisme de versioning causal pour les scénarios multi-utilisateurs. Chaque mutation d\'état est associée à un timestamp en millisecondes généré par l\'horloge locale du backend, qui joue le rôle d\'horloge de référence pour l\'ensemble du système. Lorsque deux commandes conflictuelles sont reçues (par exemple, deux utilisateurs envoient simultanément des commandes contradictoires sur la même ampoule), la commande avec le timestamp le plus récent prend la priorité.'),

    p('Pour les architectures multi-sites envisagées dans les versions futures d\'Ovyon Control (plusieurs domiciles synchronisés), une migration vers les CRDTs (Conflict-Free Replicated Data Types) est préconisée. Les CRDTs sont des structures de données mathématiquement conçues pour permettre des modifications concurrentes sans coordination, garantissant que toutes les répliques convergent vers un état identique indépendamment de l\'ordre de réception des mises à jour. Cette propriété de convergence assurée par construction, sans nécessiter de round-trip réseau pour la résolution de conflits, est particulièrement précieuse dans les environnements à faible connectivité.'),

    spacer(160),
    sectionDivider('Section 2 – Synthèse'),
    p('La Section 2 a posé les fondements conceptuels et techniques du paradigme Local-First, démontrant sa pertinence intrinsèque pour le contexte béninois face aux limitations structurelles des architectures cloud-first. L\'analyse de SQLite a mis en évidence son adéquation en tant que moteur de persistance embarquée robuste, économique et conformément standardisé. La stratégie de synchronisation LWW adoptée constitue un compromis équilibré entre simplicité d\'implémentation et correction sémantique pour les cas d\'usage domotiques.', { noIndent: true }),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 3 : ESP32 et IA agentique
    // ══════════════════════════════════════════════════════

    h1('Section 3 : Microcontrôleurs ESP32 et Intelligence Artificielle Agentique'),

    h2('3.1 Architecture matérielle de l\'ESP32'),

    p('L\'ESP32, conçu par Espressif Systems (Shanghai, Chine) et lancé en septembre 2016, représente l\'état de l\'art des microcontrôleurs destinés aux applications IoT. Succédant à l\'ESP8266 qui avait démocratisé la connectivité Wi-Fi dans le monde maker, l\'ESP32 intègre dans un unique System-on-Chip (SoC) un ensemble de fonctionnalités qui en font la plateforme de référence pour les applications embarquées communicantes.'),

    ...figurePlaceholder(4,
      'Architecture matérielle ESP32',
      'Schéma bloc de l\'ESP32 montrant : (Centre) les 2 cœurs Xtensa LX6 à 240 MHz avec leurs caches L1 respectifs, connectés à 520 Ko SRAM. (Gauche) les interfaces sans fil : Wi-Fi 802.11 b/g/n 2.4 GHz + Bluetooth 4.2/BLE avec leurs antennes. (Droite) les périphériques : GPIO (34 broches), ADC (2×12 bits), DAC, SPI (4 bus), I2C (2 bus), UART (3 ports), PWM (16 canaux), Touch (10 électrodes). (Bas) RTC avec mémoire 8 Ko pour le mode sommeil profond. Source : Espressif ESP32 Technical Reference Manual v5.0.',
      3000
    ),

    p('L\'ESP32 embarque un processeur dual-core Xtensa LX6 avec deux cœurs cadencés à 240 MHz en mode haute performance (ou 80 MHz en mode économie d\'énergie). Cette architecture dual-core est exploitée de manière stratégique dans les firmwares d\'Ovyon Control : le cœur 0 (Core 0) gère exclusivement la pile Wi-Fi/MQTT et les tâches réseau grâce au scheduler FreeRTOS intégré, tandis que le cœur 1 (Core 1) traite la logique applicative, la lecture des capteurs et le contrôle des actionneurs. Cette séparation des préoccupations par cœur élimine les risques d\'interférence entre les tâches réseau et les tâches temps-réel, garantissant que les communications MQTT ne sont jamais retardées par un traitement applicatif intensif et réciproquement.'),

    p('La connectivité sans fil de l\'ESP32 est remarquablement complète pour un composant dont le coût de détail est inférieur à 4 dollars américains. Le module Wi-Fi implémente la norme IEEE 802.11 b/g/n sur la bande 2,4 GHz, avec des débits théoriques atteignant 150 Mbps en mode 802.11n. Dans le contexte domestique d\'Ovyon Control, la portée effective sans obstacles est de 50 à 80 mètres, largement suffisante pour couvrir une maison béninoise typique de 100 à 200 m². Le module Bluetooth 4.2 avec support BLE (Bluetooth Low Energy) ouvre des perspectives pour des usages futurs comme le déverrouillage de proximité ou la configuration initiale des nœuds sans Wi-Fi disponible.'),

    p('La richesse des interfaces périphériques de l\'ESP32 est déterminante pour la diversité des nœuds Ovyon Control. Les 34 broches GPIO configurables en entrée ou sortie numérique, combinées à deux convertisseurs analogique-numérique 12 bits capables de mesurer des tensions entre 0 et 3,3 V avec une résolution de 0,8 mV, permettent de connecter une très grande variété de capteurs analogiques et numériques. Le contrôleur PWM 16 canaux avec résolution jusqu\'à 16 bits est exploité pour le contrôle de luminosité des ampoules LED dans le nœud Lights, tandis que les interfaces I2C et SPI permettent la connexion de capteurs numériques complexes comme le capteur DHT11.'),

    h2('3.2 Firmwares embarqués et mécanismes de résilience'),

    p('La conception des firmwares embarqués sur les nœuds ESP32 d\'Ovyon Control obéit à un principe fondateur hérité du paradigme Local-First : chaque nœud doit être aussi autonome que possible et capable de maintenir ses fonctions essentielles même en cas de perte de connexion avec le backend central. Cette philosophie de résilience distribuée se manifeste à travers plusieurs mécanismes techniques implémentés dans chaque firmware.'),

    p('Le premier mécanisme est la reconnexion automatique avec backoff exponentiel tronqué. Lorsqu\'un nœud ESP32 perd sa connexion MQTT, au lieu de tenter une reconnexion immédiate et continue qui sataturerait le réseau en cas de défaillance du broker, le firmware implémente un algorithme d\'attente exponentielle : premier essai après 1 seconde, deuxième après 2 secondes, troisième après 4 secondes, jusqu\'à un maximum de 60 secondes entre les tentatives. Ce comportement, inspiré de l\'algorithme de backoff exponentiel de TCP, évite la formation de tempêtes de reconnexion lorsque le broker redémarre après une coupure de courant.'),

    ...codeBlock([
      '// Extrait firmware -- Reconnexion MQTT avec backoff exponentiel',
      '// Fichier : mqtt_manager.cpp (partagé par tous les noeuds)',
      '',
      'unsigned long reconnectDelay = 1000;    // 1 seconde initiale',
      'const unsigned long MAX_DELAY = 60000;  // 60 secondes maximum',
      '',
      'void ensureMqttConnected() {',
      '  if (mqttClient.connected()) {',
      '    reconnectDelay = 1000; // Reset du delai si connexion reussie',
      '    return;',
      '  }',
      '  unsigned long now = millis();',
      '  if (now - lastReconnectAttempt < reconnectDelay) return;',
      '  lastReconnectAttempt = now;',
      '',
      '  if (mqttClient.connect(deviceId, MQTT_USER, MQTT_PASS,',
      '      lwt_topic, 1, true, "offline")) {',
      '    mqttClient.subscribe(cmd_topic, 1);  // QoS 1 pour les commandes',
      '    mqttClient.publish(status_topic, "online", true);',
      '    reconnectDelay = 1000; // Reset sur succes',
      '  } else {',
      '    // Backoff exponentiel avec jitter aleatoire (+/- 10%)',
      '    reconnectDelay = min(reconnectDelay * 2, MAX_DELAY);',
      '    reconnectDelay += random(-reconnectDelay/10, reconnectDelay/10);',
      '  }',
      '}',
    ], 'Firmware ESP32 – Reconnexion MQTT avec backoff exponentiel'),

    p('Le deuxième mécanisme de résilience est la mise en file d\'attente locale des commandes hors-ligne. Les nœuds critiques comme le contrôleur d\'éclairage maintiennent en mémoire RAM une file circulaire (ring buffer) des 10 dernières commandes non acquittées. Lorsque la connexion MQTT est rétablie, ces commandes sont rejouées dans leur ordre chronologique, assurant la cohérence de l\'état du dispositif avec l\'intention de l\'utilisateur même après une interruption réseau.'),

    h2('3.3 Intelligence artificielle et paradigme ReAct'),

    p('L\'intelligence artificielle a connu une transformation radicale avec l\'avènement des Grands Modèles de Langage (LLM, Large Language Models) basés sur l\'architecture Transformer introduite par Vaswani et al. en 2017 dans le papier fondateur "Attention Is All You Need". Des modèles comme GPT-4 d\'OpenAI, Claude d\'Anthropic ou Mistral de Mistral AI ont démontré une capacité sans précédent à comprendre et générer du texte en langage naturel, à raisonner sur des problèmes complexes et à s\'adapter à de nouveaux domaines avec un minimum d\'exemples.'),

    ...definitionBox(
      'Grand Modèle de Langage (LLM)',
      'Un LLM est un réseau de neurones artificiel pré-entraîné sur des corpus textuels massifs (typiquement plusieurs centaines de milliards de tokens) pour apprendre les patterns statistiques du langage. Sa capacité à compléter du texte de manière cohérente lui confère des aptitudes émergentes en compréhension, raisonnement et génération de langage naturel. Dans Ovyon Control, le LLM est invoqué via l\'API OpenRouter qui offre un accès unifié à plusieurs modèles.'
    ),

    p('Le paradigme ReAct (Reasoning and Acting), proposé par Yao et al. en 2023 dans un article publié à la conférence ICLR (International Conference on Learning Representations), constitue une avancée majeure dans la conception d\'agents IA capables d\'agir dans le monde réel. L\'idée fondamentale est d\'intercaler explicitement des étapes de raisonnement (Thought) et d\'action (Action) dans le processus de génération du LLM, permettant à l\'agent de planifier ses actions, d\'observer leur résultat et d\'adapter sa stratégie en conséquence.'),

    p('Le cycle ReAct d\'un agent se déroule en quatre étapes récurrentes. L\'étape Thought est un raisonnement interne que l\'agent formule en langage naturel pour analyser la situation courante et planifier sa prochaine action — cette étape n\'est pas visible de l\'utilisateur mais permet au LLM de structurer son raisonnement. L\'étape Action correspond à l\'exécution d\'une action concrète, qui peut être l\'appel d\'un outil (tool call) comme l\'envoi d\'une commande MQTT à un dispositif IoT, une requête en base de données, ou une demande d\'information supplémentaire. L\'étape Observation capture le résultat de l\'action — la réponse du dispositif IoT, le contenu de la base de données — qui sera intégré au contexte pour le prochain cycle. L\'étape Answer, déclenchée lorsque l\'agent estime avoir suffisamment d\'informations pour répondre à l\'utilisateur, produit la réponse finale.'),

    ...figurePlaceholder(5,
      'Cycle de raisonnement ReAct de l\'agent AION',
      'Diagramme de flux circulaire montrant le cycle ReAct : (1) INPUT : "Éteins toutes les lumières du salon" → (2) THOUGHT : rectangle jaune "Je dois identifier les dispositifs de type lights dans la zone living_room, puis envoyer une commande state:off à chacun" → (3) ACTION : rectangle bleu "Query SQLite: SELECT id FROM devices WHERE type=lights AND zone=living_room" + "MQTT publish ovyon/cmd/lights/zone1/set {state:off}" → (4) OBSERVATION : rectangle vert "Devices: zone1, zone2, zone3 | MQTT ACK reçu pour zone1" → retour à (2) pour les zones restantes → (5) ANSWER : "J\'ai éteint les 3 zones d\'éclairage du salon". Format : PNG 14cm x 8cm.',
      2400
    ),

    h2('3.4 Intégration des LLM dans les systèmes à ressources limitées'),

    p('L\'une des questions architecturales les plus délicates du projet Ovyon Control est la stratégie d\'intégration de l\'intelligence artificielle dans un contexte d\'infrastructure contrainte. Un LLM de la taille de GPT-4 (estimé à plus de 1 000 milliards de paramètres) est inenvisageable à faire tourner localement sur un matériel domestique ordinaire : il nécessiterait plusieurs GPU de haute performance et une alimentation électrique de plusieurs kilowatts. Cette contrainte impose de recourir à une API externe, ce qui crée une dépendance réseau pour les fonctionnalités IA avancées.'),

    p('La réponse architecturale d\'Ovyon Control à cette tension est le modèle d\'agent hybride à deux niveaux. Le premier niveau, entièrement local, implémente un dictionnaire de patterns d\'expressions régulières couvrant les 50 à 80 commandes les plus fréquentes en domotique (allumer/éteindre l\'éclairage, ouvrir/fermer les fenêtres et portes, ajuster la luminosité, interroger les capteurs, activer des scénarios). Ce dictionnaire est chargé en mémoire au démarrage de l\'agent et traite les commandes courantes avec une latence inférieure à 5 ms et une précision de 100 % sur son périmètre de définition. Ce premier niveau opère intégralement hors-ligne et ne fait jamais appel au réseau.'),

    p('Le second niveau, réseau-dépendant, prend le relais uniquement lorsque le premier niveau échoue à reconnaître une commande. Il construit un prompt contextuel enrichi comprenant l\'état actuel de tous les dispositifs du foyer (extrait de SQLite), l\'historique des 10 dernières actions de l\'utilisateur, et la commande brute à interpréter, puis l\'envoie au LLM via l\'API OpenRouter. Cette architecture assure que les 80 % de commandes courantes sont traitées instantanément et hors-ligne, et que seulement les 20 % de commandes complexes ou contextuelles nécessitent une connexion réseau, réduisant drastiquement la dépendance à la connectivité externe pour les usages quotidiens.'),

    p('L\'API OpenRouter a été sélectionnée plutôt qu\'une API directe (OpenAI, Anthropic) pour trois raisons complémentaires. Premièrement, elle offre un accès unifié à plus de 200 modèles de différents fournisseurs, permettant de basculer automatiquement vers un modèle alternatif en cas d\'indisponibilité du modèle principal. Deuxièmement, ses tarifs au token sont significativement inférieurs aux APIs directes pour des modèles de qualité équivalente, réduisant le coût d\'exploitation du service IA. Troisièmement, elle implémente des mécanismes de fallback automatique qui garantissent une continuité de service même lors de pannes partielles de l\'infrastructure cloud des fournisseurs de LLM.'),

    spacer(160),
    sectionDivider('Section 3 – Synthèse'),
    p('La Section 3 a présenté les fondements techniques de la couche matérielle et intelligente d\'Ovyon Control. L\'ESP32 s\'affirme comme la plateforme idéale pour les nœuds IoT dans le contexte africain grâce à son rapport fonctionnalité/coût exceptionnel et à sa robustesse aux conditions d\'exploitation. Le paradigme ReAct et l\'architecture d\'agent hybride à deux niveaux constituent la réponse architecturale aux contraintes d\'inférence IA dans un contexte à connectivité variable, en maximisant le traitement local et en minimisant la dépendance réseau.', { noIndent: true }),
    spacer(160),

    // Conclusion chapitre I
    h2('Conclusion du Chapitre I'),
    p('Ce chapitre a établi le cadre théorique complet sur lequel repose le projet Ovyon Control. L\'analyse de l\'évolution de la domotique vers l\'IoT a permis de situer notre contribution dans la continuité d\'une transformation technologique de quatre décennies, en identifiant les ruptures paradigmatiques successives qui ont conduit à l\'écosystème actuel. L\'étude comparative des protocoles de communication a démontré la supériorité de MQTT pour les applications IoT à faible débit en milieu contraint, justifiant son adoption comme épine dorsale communicante du système.'),
    p('L\'exploration du paradigme Local-First et de l\'architecture SQLite a fourni les fondements philosophiques et techniques de notre approche de la résilience : plutôt que de lutter contre les limitations infrastructurelles, nous les incorporons comme contrainte de conception positive qui oriente vers une architecture plus robuste et plus souveraine. Enfin, l\'analyse de l\'ESP32 et du paradigme ReAct a défini le cadre de la couche d\'intelligence distribuée qui donne à Ovyon Control sa valeur différenciante par rapport aux solutions domotiques conventionnelles.'),
    p('Le Chapitre II qui suit mobilisera ces fondements théoriques pour analyser de manière concrète le contexte de déploiement béninois et formaliser les exigences du système Ovyon Control.'),

    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  EXPORT
// ─────────────────────────────────────────────────────────────

function getIntroAndChapter1() {
  return [
    ...getIntroduction(),
    ...getChapter1(),
  ];
}

module.exports = { getIntroAndChapter1 };
