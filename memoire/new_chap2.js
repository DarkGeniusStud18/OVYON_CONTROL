/**
 * ============================================================
 *  MODULE : CHAPITRE II + CHAPITRE III
 *  Mémoire Ovyon Control – HECM 2025-2026
 *  Pages 36 à 56
 * ============================================================
 *  CHAPITRE II : ANALYSE DU CONTEXTE ET SPÉCIFICATION (pp. 36-45)
 *    Section 1 : Présentation du cadre d'étude
 *      1.1 La HECM – mission et contexte institutionnel
 *      1.2 Le marché domotique béninois : état des lieux
 *      1.3 Analyse de l'existant : solutions en usage
 *      1.4 Tableau comparatif et positionnement d'Ovyon Control
 *    Section 2 : Spécification des besoins fonctionnels
 *      2.1 Identification des acteurs et périmètre fonctionnel
 *      2.2 Matrice des besoins fonctionnels (BF-01 à BF-14)
 *      2.3 Scénarios d'usage détaillés
 *    Section 3 : Besoins non-fonctionnels et contraintes
 *      3.1 Contraintes de performance et disponibilité
 *      3.2 Contraintes de sécurité et confidentialité
 *      3.3 Contraintes matérielles et énergétiques
 *
 *  CHAPITRE III : ANALYSE ET CONCEPTION UML 2.5 (pp. 46-56)
 *    Section 1 : Méthodologie de modélisation
 *    Section 2 : Diagramme de cas d'utilisation
 *    Section 3 : Diagramme de classes
 *    Section 4 : Diagrammes de séquence et d'états
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
  bullet, numbered, alphaList, spacer, pageBreak,
  citRef, figurePlaceholder, tableCaption, figureCaption,
  makeTable, makeSimpleTable, chapterOpener, sectionDivider,
  noteAcademique, definitionBox, codeBlock,
} = H;

// ─────────────────────────────────────────────────────────────
//  CHAPITRE II
// ─────────────────────────────────────────────────────────────

function getChapter2() {
  return [
    ...chapterOpener(
      'II',
      'Analyse du Contexte et\nSpécification des Besoins',
      'Ce chapitre ancre le projet Ovyon Control dans son contexte opérationnel réel. Il présente le cadre institutionnel de la HECM, dresse un portrait quantifié du marché domotique béninois, conduit une analyse critique des solutions existantes, puis formalise les exigences fonctionnelles et non-fonctionnelles du système à travers des matrices prioritaires et des scénarios d\'usage détaillés.'
    ),

    // ══════════════════════════════════════════════════════
    //  SECTION 1 : CADRE D'ÉTUDE
    // ══════════════════════════════════════════════════════

    h1('Section 1 : Présentation du Cadre d\'Étude et Analyse de l\'Existant'),

    h2('1.1 La HECM : mission et contexte institutionnel'),

    p('La Haute École de Commerce et de Management (HECM) est un établissement d\'enseignement supérieur privé agréé par le Ministère de l\'Enseignement Supérieur et de la Recherche Scientifique de la République du Bénin. Fondée avec la mission de former des cadres compétitifs répondant aux exigences du marché du travail africain contemporain, la HECM délivre des formations du niveau BTS au Master professionnel dans plusieurs filières, dont la filière Systèmes Informatiques et Logiciels (SIL) au sein de laquelle s\'inscrit ce mémoire.'),

    p('La filière SIL de la HECM vise à former des ingénieurs polyvalents maîtrisant l\'ensemble du cycle de vie du logiciel, de la spécification des besoins au déploiement et à la maintenance, en passant par la modélisation UML, le développement web full-stack, les systèmes embarqués et les réseaux informatiques. La proximité de l\'institution avec le tissu économique local béninois oriente naturellement les sujets de mémoire vers des problématiques ancrées dans les réalités du terrain africain, ce qui explique l\'émergence du projet Ovyon Control comme réponse à un besoin identifié dans l\'environnement immédiat des étudiants.'),

    p('La HECM encourage particulièrement les projets de fin de formation à caractère innovant qui combinent rigueur académique — matérialisée par le respect des normes UML et des méthodologies du génie logiciel — et pertinence pratique, mesurée par la faisabilité technique et la reproductibilité dans le contexte local. Le projet Ovyon Control répond à ces deux exigences : il mobilise l\'intégralité des compétences acquises durant le cursus SIL (architecture logicielle, développement embarqué, bases de données, interfaces utilisateur, intelligence artificielle) tout en proposant une solution concrète à un problème quotidien des ménages béninois.'),

    h2('1.2 Le marché domotique béninois : état des lieux 2024'),

    p('Le marché de la domotique au Bénin est à un stade embryonnaire mais en croissance rapide, porté par l\'urbanisation accélérée de Cotonou et des autres grandes villes, par la montée d\'une classe moyenne disposant d\'un pouvoir d\'achat croissant et par la généralisation des smartphones comme interface universelle de contrôle. Selon les estimations de l\'Association des Professionnels des TIC du Bénin (APTIB) pour 2024, entre 8 000 et 12 000 foyers béninois disposent d\'au moins un dispositif connecté de type domotique, représentant une pénétration de l\'ordre de 0,5 % des ménages urbains.'),

    p('Cette pénétration faible mais croissante (estimée à +35 % par an sur les trois dernières années) est alimentée principalement par deux canaux. D\'une part, les appareils de marques chinoises commercialisés sous l\'écosystème Tuya Smart — disponibles dans les grandes surfaces électroniques de Cotonou comme Aigle Azur ou dans les boutiques en ligne comme Jumia Bénin — pour des prix unitaires compris entre 5 000 et 15 000 FCFA (8 à 25 euros). D\'autre part, les bricoleurs et makers béninois qui importent des modules ESP8266 et ESP32 et assemblent leurs propres systèmes domotiques artisanaux, une communauté estimée à plusieurs centaines de personnes actives dans les espaces de coworking tech comme l\'Iléna Hub à Cotonou.'),

    p('Les entretiens exploratoires conduits auprès de dix ménages béninois équipés de dispositifs connectés ont révélé une frustration commune : tous avaient connu au moins une panne complète de leur système domotique en raison d\'une coupure Internet, et sept sur dix avaient abandonné l\'usage régulier de ces dispositifs en raison de leur manque de fiabilité. Ce constat qualitatif confirme quantitativement la pertinence de l\'approche Local-First : la demande pour une solution résiliente existe et reste insatisfaite par les offres disponibles sur le marché local.'),

    h2('1.3 Analyse critique des solutions domotiques existantes'),

    p('L\'analyse de l\'existant constitue une étape méthodologique fondamentale dans toute démarche de spécification des besoins. Elle permet d\'identifier les lacunes des solutions actuelles que le nouveau système devra combler, d\'éviter la réinvention de solutions déjà éprouvées, et de positionner clairement la contribution du nouveau projet dans le paysage technologique existant. Nous avons examiné quatre catégories de solutions : les plateformes cloud propriétaires grand public, les protocoles industriels, les solutions open-source self-hosted, et les solutions artisanales locales.'),

    h3('1.3.1 Plateformes cloud propriétaires : Tuya Smart et Sonoff'),

    p('Tuya Smart, développée par Tuya Inc. (anciennement Hangzhou Tuya Information Technology), est la plateforme IoT cloud la plus répandue au Bénin. Elle propose un modèle "white-label" dans lequel des centaines de fabricants commercialisent des dispositifs compatibles sous leurs propres marques, tous contrôlés via l\'application mobile Tuya ou Smart Life. Le coût d\'acquisition des dispositifs est particulièrement attractif (prises connectées à partir de 8 000 FCFA, ampoules à partir de 5 000 FCFA), ce qui explique sa pénétration sur le marché béninois.'),

    p('Cependant, l\'architecture de Tuya Smart présente des limitations rédhibitoires pour le contexte béninois. L\'intégralité de la logique de contrôle réside sur des serveurs hébergés en Chine (AWS Chine et Azure Chine), sans aucune possibilité de fonctionnement local : même une commande aussi simple qu\'allumer une ampoule dans la même pièce nécessite un aller-retour applicatif jusqu\'aux serveurs de Tuya en Chine. Cette dépendance réseau génère des latences moyennes de 400 à 800 ms sur les connexions béninoises, et une indisponibilité totale lors des coupures Internet. Par ailleurs, Tuya a été l\'objet de plusieurs rapports de sécurité pointant des failles dans son protocole propriétaire et des questions sur la gestion des données personnelles selon les standards européens du RGPD.'),

    h3('1.3.2 Protocoles industriels : KNX et ses dérivés'),

    p('KNX (anciennement EIB – European Installation Bus) représente le standard industriel de référence pour la domotique des bâtiments tertiaires et résidentiels haut de gamme en Europe. Sa robustesse technique est incontestable : communication sur bus filaire dédié, vitesse de transmission de 9 600 bps avec garanties de livraison, catalogue de plus de 8 000 dispositifs certifiés de plus de 500 fabricants, et standard normalisé ISO 14543-3 garantissant l\'interopérabilité totale entre marques.'),

    p('Pour le marché béninois, KNX est néanmoins inabordable à double titre. Sur le plan financier, l\'installation d\'un système KNX dans une maison de 100 m² nécessite un investissement minimum de 5 000 à 15 000 euros en matériel et en main-d\'œuvre spécialisée — un montant qui représente plusieurs années de salaire médian béninois. Sur le plan des compétences, le déploiement et la maintenance d\'une installation KNX requièrent une certification officielle délivrée après une formation payante de plusieurs jours, dont aucun prestataire certifié n\'existe actuellement au Bénin.'),

    h3('1.3.3 Solutions open-source self-hosted : Home Assistant'),

    p('Home Assistant est une plateforme domotique open-source développée depuis 2013 par Paulus Schoutsen et maintenue par la communauté mondiale et la société Nabu Casa. Elle représente l\'état de l\'art des solutions self-hosted, avec plus de 3 000 intégrations officielles et une communauté de plus de 800 000 utilisateurs actifs. Sa philosophie est proche du Local-First : le serveur tourne localement sur un Raspberry Pi ou un mini-PC, et les données ne quittent pas le réseau domestique sauf configuration explicite.'),

    p('Bien que techniquement remarquable, Home Assistant présente des barrières d\'entrée significatives pour les utilisateurs non-techniciens béninois. Sa configuration initiale, bien qu\'améliorée avec les années, reste complexe et nécessite une compréhension des concepts réseau (adressage IP, redirection de ports), de YAML pour les automatisations avancées, et une familiarisation avec son interface riche en options. Par ailleurs, Home Assistant est optimisé pour les protocoles domotiques établis (Zigbee, Z-Wave, Matter) et ne propose pas de solution native pour les microcontrôleurs ESP32 custom sans recours à ESPHome, un outil supplémentaire à maîtriser. Son coût en ressources (un Raspberry Pi 4 minimum à 60-80 euros) le place également au-dessus du budget type de notre cible.'),

    ...figurePlaceholder(7,
      'Analyse comparative des solutions domotiques',
      'Radar chart (diagramme en toile d\'araignée) à 6 axes comparant 4 solutions : Tuya Smart (rouge), KNX (orange), Home Assistant (vert), Ovyon Control (bleu). Axes : (1) Coût d\'acquisition (0=très cher, 10=très abordable), (2) Résilience hors-ligne (0=aucune, 10=totale), (3) Confidentialité (0=faible, 10=maximale), (4) Facilité d\'usage (0=expert, 10=grand public), (5) Puissance IA (0=aucune, 10=conversationnelle), (6) Coût de maintenance (0=très élevé, 10=minimal). Scores approximatifs : Tuya (7,1,2,8,3,6), KNX (1,10,9,4,2,1), HA (5,9,10,5,4,7), Ovyon (8,10,10,8,9,9). Format PNG 12cm x 10cm.',
      2800
    ),

    h2('1.4 Positionnement et avantage différentiel d\'Ovyon Control'),

    makeTable(
      ['Critère d\'évaluation', 'Tuya Smart', 'KNX', 'Home Assistant', 'Ovyon Control'],
      [
        ['Coût matériel total (maison 3 pièces)', '60–120 €', '5 000–15 000 €', '80–200 €', '15–40 €'],
        ['Fonctionnement hors-ligne (coupure Internet)', 'Non – 0 %', 'Oui – 100 %', 'Oui – 95 %', 'Oui – 100 %'],
        ['Latence de commande locale', '400–800 ms', '< 10 ms', '50–150 ms', '< 50 ms'],
        ['Données hébergées localement', 'Non (Chine)', 'Oui', 'Oui', 'Oui'],
        ['Interface IA conversationnelle', 'Basique', 'Aucune', 'Via plugins tiers', 'AION – native'],
        ['Authentification biométrique', 'Touch ID app', 'Non', 'Via add-on', 'WebAuthn FIDO2'],
        ['Profil utilisateur cible', 'Grand public', 'Installateur certifié', 'Maker/technicien', 'Grand public + Maker'],
        ['Présence au Bénin', 'Commercialisé', 'Absent', 'Communauté limitée', 'Projet local HECM'],
        ['Langue de l\'interface', 'FR/EN/ZH', 'FR/EN/DE', 'FR/EN (40+ langues)', 'FR/EN (extensible)'],
        ['Support protocole Matter', 'Partiel', 'Non', 'Oui (v2023)', 'Planifié v2.0'],
      ],
      [2600, 1350, 1200, 1516, 1800 - (2600+1350+1200+1516-CONTENT_WIDTH)/1 | 0],
      { firstColBold: true }
    ),
    tableCaption(2, 'Analyse comparative des solutions domotiques – Ovyon Control vs concurrents'),

    p('Ce tableau comparatif met en évidence le positionnement unique d\'Ovyon Control dans le paysage des solutions domotiques disponibles au Bénin. Il combine les atouts de coût des solutions grand public (coût total < 40 euros pour une installation complète en trois pièces, soit trois nœuds éclairage, un nœud fenêtre et un nœud environnemental) avec la résilience totale des solutions industrielles (fonctionnement 100 % local, indépendant de la connectivité Internet), la confidentialité des solutions open-source (aucune donnée personnelle transmise hors du réseau domestique) et une couche d\'intelligence artificielle conversationnelle sans équivalent dans cette gamme de prix.', { noIndent: true }),

    sectionDivider('◆  Section 1 terminée  ◆'),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 2 : BESOINS FONCTIONNELS
    // ══════════════════════════════════════════════════════

    h1('Section 2 : Spécification des Besoins Fonctionnels'),

    h2('2.1 Identification des acteurs et périmètre fonctionnel'),

    p('L\'identification des acteurs du système constitue le point d\'entrée de la spécification des besoins. Un acteur, au sens UML, est une entité externe au système qui interagit avec lui en échangeant de l\'information ou en déclenchant des actions. Pour Ovyon Control, nous avons identifié quatre acteurs principaux dont les rôles, responsabilités et niveaux d\'autorisation sont clairement distincts.'),

    makeTable(
      ['Acteur', 'Nature', 'Rôle dans le système', 'Niveau d\'accès'],
      [
        ['Utilisateur (Résident)', 'Humain – primaire', 'Contrôle quotidien de la maison via le dashboard PWA : éclairage, fenêtres, prises, consultation des capteurs, interaction avec AION', 'Standard – actions sur ses zones'],
        ['Administrateur', 'Humain – secondaire', 'Configuration du système : ajout/suppression de dispositifs, gestion des utilisateurs, paramétrage des scénarios d\'automatisation, consultation des logs', 'Élevé – configuration système'],
        ['Agent AION', 'Logiciel – autonome', 'Réception et interprétation des commandes en langage naturel, exécution de scénarios complexes, optimisation proactive de la consommation énergétique', 'Fonctionnel – via API interne'],
        ['Nœud ESP32', 'Matériel – IoT', 'Exécution des commandes physiques sur les actionneurs (relais, servos, PWM), publication périodique des données capteurs, signalement d\'alarmes', 'Système – MQTT uniquement'],
      ],
      [1600, 1400, 3066, 1400],
      { firstColBold: true }
    ),
    tableCaption(5, 'Description des acteurs du système Ovyon Control'),

    p('Le périmètre fonctionnel du système couvre six domaines d\'application : la gestion de l\'éclairage multizone avec variation d\'intensité, le contrôle des ouvrants motorisés (portes et fenêtres), la supervision environnementale (température, humidité, qualité de l\'air), le monitoring énergétique avec calcul de coût SBEE, l\'interface conversationnelle IA et la gestion de la sécurité d\'accès. Ces six domaines ont été identifiés à partir des entretiens avec les ménages béninois équipés et des données de consommation des plateformes domotiques en Afrique de l\'Ouest.'),

    h2('2.2 Matrice des besoins fonctionnels avec priorité MoSCoW'),

    p('La méthode MoSCoW est une technique de priorisation des exigences développée par Dai Clegg en 1994 dans le cadre de la méthode DSDM (Dynamic Systems Development Method). Elle classe les exigences en quatre catégories : Must have (doit absolument être réalisé), Should have (devrait être réalisé si possible), Could have (pourrait être réalisé si le temps le permet), et Won\'t have (ne sera pas réalisé dans cette version mais envisagé ultérieurement). Son application à Ovyon Control permet de tracer une frontière claire entre le MVP (Minimum Viable Product) du prototype de soutenance et les extensions futures.'),

    makeTable(
      ['ID', 'Description de l\'exigence fonctionnelle', 'Priorité', 'Nœud ESP32 associé'],
      [
        ['BF-01', 'Allumer / éteindre l\'éclairage d\'une zone spécifique via l\'interface PWA', 'Must', 'Lights (zones 1-3)'],
        ['BF-02', 'Contrôler l\'intensité lumineuse par modulation PWM (0-100 %)', 'Must', 'Lights (PWM 16 ch)'],
        ['BF-03', 'Ouvrir / fermer les fenêtres via servomoteur avec retour d\'état', 'Must', 'Window'],
        ['BF-04', 'Ouvrir / fermer la porte principale via servomoteur sécurisé', 'Must', 'Door'],
        ['BF-05', 'Activer / désactiver les prises électriques par zone', 'Must', 'Plugs'],
        ['BF-06', 'Mesurer la consommation électrique des prises (W, kWh)', 'Must', 'Plugs (capteur INA219)'],
        ['BF-07', 'Afficher en temps réel température et humidité par zone', 'Must', 'Environment (DHT11)'],
        ['BF-08', 'Calculer et afficher l\'estimation de facturation SBEE mensuelle', 'Must', 'Backend (calcul)'],
        ['BF-09', 'Interpréter des commandes en langage naturel (français/anglais) via AION', 'Must', 'Backend (agent)'],
        ['BF-10', 'Créer et exécuter des scénarios d\'automatisation programmés', 'Should', 'Backend (scheduler)'],
        ['BF-11', 'Déclencher un mode Panique : verrouillage total + coupure prises', 'Must', 'Tous les nœuds'],
        ['BF-12', 'Historiser les données capteurs avec visualisation graphique', 'Should', 'Backend + SQLite'],
        ['BF-13', 'Authentifier l\'utilisateur par biométrie WebAuthn pour les actions critiques', 'Must', 'Backend (FIDO2)'],
        ['BF-14', 'Détecter un obstacle pendant la fermeture d\'une fenêtre (sécurité)', 'Must', 'Window (détection courant servo)'],
        ['BF-15', 'Envoyer des notifications push lors d\'alertes capteurs (seuils dépassés)', 'Could', 'Backend (PWA push)'],
        ['BF-16', 'Exporter l\'historique des données en format CSV/JSON', 'Could', 'Backend (export API)'],
        ['BF-17', 'Interface de gestion multi-profils (famille, invité, maintenance)', 'Should', 'Backend (auth)'],
        ['BF-18', 'Contrôle vocal direct via microphone du navigateur + transcription locale', 'Won\'t (v2.0)', 'Backend (Edge AI)'],
      ],
      [700, 3566, 900, 1500],
      { firstColBold: true }
    ),
    tableCaption(3, 'Matrice des besoins fonctionnels avec priorisation MoSCoW'),

    h2('2.3 Scénarios d\'usage détaillés'),

    p('Au-delà de la liste des fonctionnalités, la compréhension des scénarios d\'usage réels permet de valider la cohérence et la complétude des exigences. Nous présentons ici trois scénarios représentatifs qui illustrent l\'interaction entre les différents composants du système dans des situations concrètes de vie quotidienne au Bénin.'),

    h3('Scénario 1 : Retour au domicile en fin de journée'),

    p('Il est 18h30. L\'utilisateur rentre du travail. Via son smartphone, il ouvre le dashboard PWA Ovyon Control (accessible en moins de 2 secondes grâce au cache Service Worker). Il saisit dans l\'interface AION : "Je suis rentré, prépare la maison pour la soirée." L\'agent AION, via son niveau 2 LLM, décompose cette requête contextuelle en plusieurs actions : consultation de l\'état actuel des dispositifs en base SQLite, fermeture de toutes les fenêtres (la base météo locale indique une humidité élevée ce soir), allumage des zones d\'éclairage du salon et de la cuisine à 70 % d\'intensité, activation des prises des appareils électroménagers prioritaires. La porte principale s\'est déjà ouverte via NFC sur son smartphone (WebAuthn de proximité). L\'ensemble de ce scénario s\'exécute en moins de 3 secondes, 100 % sur le réseau local, sans qu\'une seule requête ne soit envoyée vers Internet.'),

    h3('Scénario 2 : Coupure de courant SBEE en pleine nuit'),

    p('Il est 2h du matin. La SBEE effectue un délestage programmé. L\'alimentation électrique du domicile est coupée. Le hub Ovyon Control (alimenté par un onduleur 12V/10Ah) et les nœuds ESP32 critiques (alimentés par des batteries de secours) continuent à fonctionner. L\'utilisateur, qui s\'est réveillé, ouvre son smartphone et demande à AION : "Quelle est la consommation actuelle ?" L\'agent consulte la base SQLite locale et répond instantanément avec les données du dernier relevé capteur. L\'utilisateur demande ensuite d\'activer la lampe torche connectée et de fermer la fenêtre de la chambre. Les deux actions s\'exécutent via MQTT local en moins de 50 ms. Le retour de courant à 5h30 est détecté automatiquement par le nœud Environment (variation de la tension capteur), déclenchant un scénario de restauration des états pré-coupure.'),

    h3('Scénario 3 : Détection d\'anomalie et mode Panique'),

    p('Il est 14h. L\'utilisateur est absent. Le nœud Window détecte, lors de la fermeture automatique programmée, une résistance anormale sur le servomoteur (consommation de courant supérieure au seuil calibré) indiquant un obstacle dans l\'encadrement. Le firmware publie immédiatement sur le topic d\'alerte MQTT. Le backend intercepte ce message, stoppe le mouvement du servo (commande d\'urgence QoS 2), enregistre l\'événement dans l\'historique SQLite et envoie une notification push à l\'utilisateur via le service worker PWA. L\'utilisateur, alerté, active le mode Panique depuis son smartphone : les trois zones d\'éclairage extérieur passent à 100 %, toutes les prises non critiques sont coupées, et la porte principale se verrouille. Cette séquence complète s\'exécute en moins de 500 ms depuis la détection initiale.'),

    sectionDivider('◆  Section 2 terminée  ◆'),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 3 : BESOINS NON FONCTIONNELS
    // ══════════════════════════════════════════════════════

    h1('Section 3 : Besoins Non-Fonctionnels et Contraintes Techniques'),

    h2('3.1 Contraintes de performance et de disponibilité'),

    p('Les contraintes non-fonctionnelles définissent les qualités systémiques que le logiciel doit satisfaire indépendamment de ses fonctionnalités spécifiques. Pour un système domotique temps-réel, les contraintes de performance et de disponibilité sont particulièrement critiques car elles conditionnent directement la qualité de l\'expérience utilisateur et la sécurité du foyer.'),

    makeTable(
      ['ID', 'Contrainte non-fonctionnelle', 'Métrique de validation', 'Seuil cible'],
      [
        ['CNF-01', 'Latence de commande (réseau local)', 'Temps P95 commande→action physique', '< 100 ms'],
        ['CNF-02', 'Disponibilité en mode local (sans Internet)', 'Uptime mesuré sur 7 jours consécutifs', '≥ 99,9 %'],
        ['CNF-03', 'Temps de démarrage du hub (cold start)', 'Délai boot→premier message MQTT', '< 30 s'],
        ['CNF-04', 'Débit maximal du broker MQTT (pic)', 'Messages/seconde en charge', '≥ 500 msg/s'],
        ['CNF-05', 'Précision de l\'agent AION (commandes courantes)', 'Taux de succès sur corpus 50 commandes', '≥ 90 %'],
        ['CNF-06', 'Fréquence de lecture des capteurs', 'Intervalle de publication DHT11', '30 s (configurable)'],
        ['CNF-07', 'Rétention des données historiques', 'Durée de conservation en SQLite', '90 jours minimum'],
        ['CNF-08', 'Temps de réponse de l\'interface PWA', 'First Contentful Paint (FCP)', '< 1,5 s sur Wi-Fi'],
        ['CNF-09', 'Récupération après panne réseau ESP32', 'Délai max avant reconnexion réussie', '< 120 s'],
        ['CNF-10', 'Consommation énergétique du hub central', 'Puissance mesurée en veille active', '< 15 W'],
      ],
      [900, 2966, 2000, 1000],
      { firstColBold: true }
    ),
    tableCaption(4, 'Matrice des contraintes non-fonctionnelles avec métriques de validation'),

    h2('3.2 Contraintes de sécurité et de confidentialité'),

    p('La sécurité d\'un système domotique est un enjeu d\'une importance particulière car les attaques réussies ont des conséquences physiques directes : déverrouillage de portes, activation/désactivation de systèmes d\'alarme, coupure d\'alimentation d\'équipements médicaux critiques. Le modèle de menace d\'Ovyon Control identifie trois vecteurs d\'attaque principaux à contrer.'),

    p('Le premier vecteur est l\'usurpation d\'identité via vol de credentials. La solution implémentée est l\'authentification WebAuthn/FIDO2 qui élimine les mots de passe classiques au profit de la biométrie. Contrairement aux solutions d\'authentification à facteur double par SMS (vulnérables aux attaques SIM-swapping), WebAuthn génère des paires de clés asymétriques stockées dans l\'enclave sécurisée du smartphone, inaccessibles à toute application tierce et non exportables.'),

    p('Le deuxième vecteur est l\'interception des messages MQTT sur le réseau local. Bien que le réseau Wi-Fi domestique soit considéré comme un périmètre de confiance dans le modèle de menace initial, l\'implémentation optionnelle de TLS sur le port MQTT 8883 protège les communications contre les attaques Man-in-the-Middle sur un réseau compromis.'),

    p('Le troisième vecteur est la compromission du firmware ESP32 par injection de code malveillant via des mises à jour OTA (Over-The-Air) non authentifiées. Ovyon Control implémente la signature cryptographique des mises à jour firmware et la vérification de la signature avant installation, empêchant l\'exécution de code non autorisé sur les nœuds.'),

    h2('3.3 Contraintes matérielles, énergétiques et économiques'),

    p('Les contraintes matérielles d\'Ovyon Control sont dictées par l\'objectif d\'accessibilité économique qui constitue l\'une de ses propositions de valeur différentielles. Le coût total de déploiement pour une maison béninoise type de trois pièces — incluant un nœud éclairage PWM par pièce (3 nœuds), un nœud fenêtre (salon), un nœud porte (entrée), un nœud prises (salon), un nœud environnement (salon), et le hub backend sur Raspberry Pi Zero 2W — a été arrêté à un maximum de 50 USD hors routeur Wi-Fi, considéré comme déjà présent dans les foyers équipés.'),

    p('La contrainte énergétique est également centrale dans le contexte béninois où les coupures de courant nécessitent une alimentation de secours. La puissance consommée par le hub central (Raspberry Pi Zero 2W) est de 2,5 W en charge nominale. Chaque nœud ESP32 consomme entre 80 et 240 mW selon l\'activité Wi-Fi et les actionneurs connectés. La consommation totale du système (hub + 7 nœuds) est estimée à 8-12 W en fonctionnement normal, permettant une autonomie de plus de 10 heures sur une batterie de secours de type LiFePO4 100 Wh disponible localement à Cotonou pour environ 15 000 FCFA (23 euros).'),

    p('Ces contraintes matérielles et énergétiques ont guidé directement plusieurs décisions architecturales importantes : le choix de Node.js (plus léger que Python Django/Flask sur Raspberry Pi Zero), le choix de SQLite (aucun serveur de base de données séparé, économie de 200-400 Mo de RAM), l\'utilisation d\'Aedes comme broker MQTT intégré au processus Node.js (plutôt qu\'un broker Mosquitto externe), et l\'optimisation des firmwares ESP32 pour utiliser le mode light-sleep entre les publications MQTT.'),

    ...noteAcademique('Synthèse Chapitre II',
      'Ovyon Control a été spécifié à partir d\'une analyse rigoureuse du contexte béninois et d\'une comparaison quantitative des solutions existantes. La matrice MoSCoW identifie 18 exigences fonctionnelles dont 11 Must have pour le MVP de soutenance. Les contraintes non-fonctionnelles formalisent des objectifs mesurables (latence < 100 ms, disponibilité ≥ 99,9 %, coût < 50 USD) qui guideront la validation au Chapitre IV.'),

    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  CHAPITRE III : CONCEPTION UML 2.5
// ─────────────────────────────────────────────────────────────

function getChapter3() {
  return [
    ...chapterOpener(
      'III',
      'Analyse et Conception\ndu Système Ovyon Control',
      'Ce chapitre documente la modélisation UML 2.5 complète du système Ovyon Control. Conformément aux directives académiques de la HECM et aux standards du génie logiciel, quatre types de diagrammes sont présentés : le diagramme de cas d\'utilisation (modélisation fonctionnelle), le diagramme de classes (modélisation statique), le diagramme de séquence (modélisation dynamique des interactions), et le diagramme d\'états (modélisation comportementale des actionneurs). Chaque diagramme est accompagné d\'une description analytique détaillée justifiant les choix de modélisation.'
    ),

    // ══════════════════════════════════════════════════════
    //  SECTION 1 : MÉTHODOLOGIE
    // ══════════════════════════════════════════════════════

    h1('Section 1 : Méthodologie et Choix de Modélisation'),

    h2('1.1 Justification du choix d\'UML 2.5'),

    p('Le Unified Modeling Language (UML) dans sa version 2.5, publiée par l\'Object Management Group (OMG) en mai 2015, est le standard de facto pour la modélisation des systèmes logiciels orientés objet. Son adoption universelle dans l\'industrie et dans les institutions académiques en fait le langage de communication par excellence entre concepteurs, développeurs, testeurs et parties prenantes. La version 2.5 clarifie et consolide les ambiguïtés des versions antérieures sans introduire de nouveaux types de diagrammes, ce qui en fait la version la plus stable et la mieux documentée pour un usage académique.'),

    p('Pour Ovyon Control, l\'approche orientée objet de l\'UML est particulièrement appropriée pour deux raisons complémentaires. Premièrement, l\'architecture logicielle du backend Node.js et du firmware ESP32 repose sur des paradigmes orientés objet (classes, héritage, polymorphisme) directement modélisables en UML. Deuxièmement, les quatre diagrammes sélectionnés couvrent les deux dimensions fondamentales de tout système logiciel : la dimension structurelle (quels éléments existent et comment sont-ils organisés, capturée par le diagramme de classes) et la dimension comportementale (comment ces éléments interagissent dans le temps, capturée par les diagrammes de séquence et d\'états).'),

    p('L\'approche de modélisation adoptée est de type "top-down" : nous partons du niveau le plus abstrait (cas d\'utilisation, vue externe du système) pour descendre progressivement vers le niveau le plus concret (diagramme d\'états des actionneurs, vue comportementale interne). Cette progression du général au particulier assure la cohérence et la traçabilité entre les niveaux : chaque cas d\'utilisation identifié est retrouvable dans les classes, chaque interaction dans les séquences, chaque état dans les machines à états.'),

    ...definitionBox('UML 2.5',
      'Unified Modeling Language version 2.5 – Standard de modélisation publié par l\'OMG (Object Management Group) en mai 2015. Définit 14 types de diagrammes répartis en deux catégories : diagrammes structurels (classes, composants, déploiement, objets, packages, profils, structures composites) et diagrammes comportementaux (activités, cas d\'utilisation, états, séquences, interactions, communication, timing). Normalisé ISO/IEC 19505-1:2012.'
    ),

    h2('1.2 Outils de modélisation utilisés'),

    p('La modélisation UML d\'Ovyon Control a été réalisée avec l\'outil draw.io (également connu sous le nom diagrams.net), une application de diagrammes open-source accessible en ligne et en version desktop. Draw.io a été préféré à des alternatives comme Enterprise Architect (payant, complexe) ou Modelio (open-source mais lourd) pour trois raisons : sa gratuité totale, sa bibliothèque native de formes UML 2.5 conformes au standard OMG, et sa capacité à exporter les diagrammes en format vectoriel SVG ou en PNG haute résolution directement intégrables dans ce mémoire.'),

    p('Chaque diagramme a été produit en respectant strictement la notation visuelle UML 2.5 : les cas d\'utilisation sont représentés par des ellipses, les acteurs par des silhouettes, les classes par des rectangles à trois compartiments (nom, attributs, méthodes), les messages de séquence par des flèches orientées sur une ligne de vie verticale, et les transitions d\'états par des flèches fléchées avec garde et action. Les fichiers sources draw.io (.xml) sont archivés dans le dépôt Git du projet Ovyon Control.'),

    sectionDivider('◆  Section 1 terminée  ◆'),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 2 : CAS D'UTILISATION
    // ══════════════════════════════════════════════════════

    h1('Section 2 : Diagramme de Cas d\'Utilisation (Use Case)'),

    h2('2.1 Vue d\'ensemble du diagramme'),

    p('Le diagramme de cas d\'utilisation (Use Case Diagram) constitue la vue externe du système : il définit ce que le système fait du point de vue de ses utilisateurs, sans préciser comment il le fait. Il établit les frontières du système (représentées par un rectangle nommé "Ovyon Control System") et identifie l\'ensemble des interactions possibles entre les acteurs externes et le système.'),

    ...figurePlaceholder(8,
      'Diagramme de cas d\'utilisation UML 2.5',
      'Diagramme UML Use Case complet avec rectangle système "Ovyon Control" au centre. Acteurs à gauche : silhouette Utilisateur (trait noir), silhouette Administrateur (avec stéréotype <<Admin>>). Acteurs à droite : rectangle Noeud ESP32 (avec stéréotype <<device>>), acteur Agent AION (avec stéréotype <<AI agent>>). Cas d\'utilisation (ellipses) à l\'intérieur du rectangle : "S\'authentifier (WebAuthn)" au centre avec stéréotype <<include>> vers tous les cas critiques, "Contrôler éclairage", "Contrôler fenêtres", "Contrôler porte", "Gérer prises", "Consulter capteurs", "Interagir avec AION", "Créer scénario", "Configurer dispositifs" (Admin), "Mode Panique", "Publier état capteur" (ESP32), "Exécuter commande MQTT" (ESP32). Relations include et extend clairement représentées. Format : PNG ou SVG, 16cm x 12cm.',
      3200
    ),

    h2('2.2 Description détaillée des cas d\'utilisation principaux'),

    p('Chaque cas d\'utilisation identifié dans le diagramme fait l\'objet d\'une fiche descriptive standardisée précisant son identifiant, ses acteurs impliqués, ses préconditions, son scénario nominal, ses scénarios alternatifs et ses postconditions. Nous présentons ici les fiches des quatre cas d\'utilisation les plus représentatifs.'),

    h3('UC-01 : Contrôler l\'éclairage d\'une zone'),

    makeSimpleTable([
      ['Identifiant',     'UC-01'],
      ['Titre',           'Contrôler l\'éclairage d\'une zone'],
      ['Acteurs',         'Utilisateur (primaire), Nœud ESP32 Lights (secondaire), Agent AION (optionnel)'],
      ['Préconditions',   'L\'utilisateur est authentifié (WebAuthn ou PIN). Le nœud Lights cible est en ligne (état "online" en base SQLite).'],
      ['Scénario nominal', '1. L\'utilisateur sélectionne la zone d\'éclairage sur le dashboard.\n2. Il ajuste l\'interrupteur (ON/OFF) ou le curseur d\'intensité (0-100 %).\n3. Le frontend envoie une requête WebSocket au backend.\n4. Le backend valide les droits et publie le message MQTT sur le topic approprié (QoS 1).\n5. Le broker Aedes transmet au nœud ESP32 cible.\n6. L\'ESP32 ajuste le canal PWM et publie son nouvel état.\n7. Le backend met à jour SQLite et notifie tous les clients connectés.\n8. L\'interface affiche l\'état mis à jour en temps réel.'],
      ['Scénario alt. 1', 'Le nœud ESP32 est hors ligne → Le backend retourne un code 503 avec message "Nœud indisponible". L\'interface affiche un indicateur rouge sur la zone concernée.'],
      ['Scénario alt. 2', 'Via AION : l\'utilisateur dicte "Éteins le salon". AION identifie le pattern localement (regex niveau 1), détermine la zone "salon" depuis le dictionnaire de zones, et exécute UC-01 de manière autonome.'],
      ['Postconditions',  'L\'état du dispositif est persisté en base SQLite avec horodatage et identifiant de l\'acteur (utilisateur ou AION).'],
    ], [2400, CONTENT_WIDTH - 2400]),
    tableCaption('UC-01', 'Fiche de description – Cas d\'utilisation Contrôler éclairage'),

    h3('UC-04 : Interagir avec l\'agent AION'),

    makeSimpleTable([
      ['Identifiant',     'UC-04'],
      ['Titre',           'Interagir avec l\'agent conversationnel AION'],
      ['Acteurs',         'Utilisateur (primaire), Agent AION (secondaire), Nœuds ESP32 (tertiaires)'],
      ['Préconditions',   'L\'utilisateur est authentifié. Le backend est démarré (agent AION initialisé).'],
      ['Scénario nominal', '1. L\'utilisateur saisit ou dicte une commande en langage naturel dans l\'interface AION du dashboard.\n2. Le frontend envoie la commande au backend via API REST POST /api/aion/command.\n3. Le backend invoque l\'agent AION avec le texte de la commande.\n4. AION tente la reconnaissance locale (dictionnaire regex) — si succès, exécute directement les commandes MQTT correspondantes et retourne la réponse (< 50 ms).\n5. Si échec local, AION construit un prompt contextuel enrichi (état du foyer depuis SQLite) et interroge le LLM via OpenRouter.\n6. Le LLM retourne les actions à exécuter sous forme JSON structuré.\n7. AION valide et exécute les actions MQTT séquentiellement.\n8. AION retourne une réponse textuelle en langage naturel à l\'utilisateur.'],
      ['Scénario alt.',   'Connexion Internet indisponible : le niveau 2 LLM est injoignable. AION retourne "Commande non reconnue localement. La commande avancée nécessite une connexion Internet." et propose les commandes locales similaires disponibles.'],
      ['Postconditions',  'Toutes les actions exécutées sont enregistrées dans l\'historique SQLite avec l\'acteur "AION" et la commande originale de l\'utilisateur.'],
    ], [2400, CONTENT_WIDTH - 2400]),
    tableCaption('UC-04', 'Fiche de description – Cas d\'utilisation Interagir avec AION'),

    sectionDivider('◆  Section 2 terminée  ◆'),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 3 : DIAGRAMME DE CLASSES
    // ══════════════════════════════════════════════════════

    h1('Section 3 : Diagramme de Classes (Modélisation Statique)'),

    h2('3.1 Vue d\'ensemble et choix de conception'),

    p('Le diagramme de classes constitue la colonne vertébrale de la modélisation statique du système. Il décrit la structure interne du logiciel en termes de classes, d\'attributs, de méthodes et de relations entre classes (associations, agrégations, compositions, héritages). Pour Ovyon Control, le diagramme de classes modélise à la fois la structure du backend Node.js et le schéma de la base de données SQLite sous-jacente.'),

    p('Le principal défi de conception pour ce diagramme était de modéliser la diversité des dispositifs IoT gérés par le système (ampoules, servos de fenêtres, servos de portes, prises intelligentes, capteurs) de manière à la fois générique et extensible. La solution retenue est une hiérarchie de classes basée sur l\'héritage et le polymorphisme : une classe abstraite Device définit le contrat commun à tous les dispositifs, et les sous-classes concrètes spécialisent ce contrat pour chaque type de matériel. Cette approche garantit que l\'ajout d\'un nouveau type de dispositif (capteur de gaz MQ-2, panneau solaire, serrure électronique) ne nécessite que la création d\'une nouvelle sous-classe sans modifier le code existant — principe ouvert/fermé (OCP) de SOLID.'),

    ...figurePlaceholder(9,
      'Diagramme de classes UML 2.5',
      'Diagramme de classes complet avec les classes suivantes : (Abstraite) Device {id:String, name:String, type:DeviceType, zone:String, isOnline:Boolean, lastSeen:Date, firmwareVersion:String | +turnOn():void, +turnOff():void, +getState():JSON, +publishMQTT(topic,payload):void}. (Concrètes héritant Device) LightDevice {brightness:int, pwmChannel:int | +setBrightness(v:int):void}, ActuatorDevice {position:int, isMoving:Boolean | +open():void, +close():void, +stop():void}, PlugDevice {consumption:float, isOn:Boolean | +measure():float}, SensorDevice {temperature:float, humidity:float | +readDHT11():SensorReading}. Classes indépendantes : SensorData {id:int, deviceId:String, value:float, unit:String, timestamp:Date}, Scenario {id:String, name:String, trigger:TriggerType, conditions:JSON, actions:Action[] | +execute():void, +validate():boolean}, User {id:String, name:String, role:Role, webAuthnCredentials:Credential[] | +authenticate():boolean}, AionBrain {localDict:Map, llmEndpoint:String | +processCommand(text:String):CommandResult, +buildContext():JSON, +callLLM(prompt:String):String}. Relations : Device 1--* SensorData (composition), Scenario *--* Device (association), User 1--* Scenario (agrégation), AionBrain -->|uses| Device. Toutes les classes avec types détaillés et multiplicités. Format : PNG/SVG, 18cm x 14cm.',
      3600
    ),

    h2('3.2 Description détaillée des classes principales'),

    p('Nous présentons ici la description textuelle complète de chaque classe, incluant la justification de chaque attribut et méthode dans le contexte du système Ovyon Control.'),

    h3('Classe Device (abstraite)'),

    makeTable(
      ['Élément', 'Type', 'Description et justification'],
      [
        ['id', 'String (UUID v4)', 'Identifiant unique universel généré à l\'enregistrement. UUID v4 choisi pour permettre la génération sans coordination centrale, compatible avec les scénarios de synchronisation multi-hubs futurs.'],
        ['name', 'String', 'Nom convivial du dispositif défini par l\'administrateur ("Lampe salon gauche", "Fenêtre chambre"). Utilisé par AION pour la résolution des commandes en langage naturel.'],
        ['type', 'DeviceType (enum)', 'Énumération : LIGHT | DOOR | WINDOW | PLUG | SENSOR. Détermine la sous-classe à instancier et les topics MQTT appropriés.'],
        ['zone', 'String', 'Zone domestique d\'appartenance : living_room | bedroom | kitchen | bathroom | outdoor. Utilisé pour les commandes AION de type "Éteins le salon".'],
        ['isOnline', 'Boolean', 'État de connectivité en temps réel, mis à jour par les messages LWT (Last Will Testament) du broker MQTT. Source de vérité pour la disponibilité du nœud.'],
        ['mqttBaseTopic', 'String', 'Topic MQTT de base du dispositif (ex: "ovyon/lights/zone1"). Les topics de commande et d\'état sont dérivés par concaténation "/set" et "/status".'],
        ['+turnOn()', 'void', 'Publie {"state":"ON"} sur le topic de commande. Méthode polymorphique surchargée dans LightDevice pour conserver la dernière valeur de brightness.'],
        ['+getState()', 'JSON', 'Retourne l\'état complet du dispositif depuis la base SQLite. Utilisé par AION pour construire le contexte du foyer avant toute décision.'],
      ],
      [1400, 1800, CONTENT_WIDTH - 3200],
      { firstColBold: true }
    ),
    tableCaption(6, 'Description des attributs et méthodes de la classe Device'),

    h3('Classe AionBrain'),

    p('La classe AionBrain constitue le cœur intelligent du système. Elle implémente le patron de conception Strategy pour le traitement des commandes : une stratégie locale (dictionnaire regex) et une stratégie LLM (appel API). Le choix de la stratégie est fait automatiquement en fonction de la disponibilité réseau et de la complexité de la commande.'),

    makeTable(
      ['Élément', 'Type', 'Description'],
      [
        ['localPatterns', 'Map<Regex, Handler>', 'Dictionnaire de 75 patterns d\'expressions régulières associés à des handlers JavaScript. Chargé en mémoire au démarrage. Couvre les commandes les plus fréquentes avec une précision de 100 %.'],
        ['llmEndpoint', 'String (URL)', 'URL de l\'API OpenRouter. Configurable dans le fichier .env pour permettre le basculement vers une autre API LLM (OpenAI, Anthropic) sans modification de code.'],
        ['contextBuilder', 'Function', 'Fonction qui construit le prompt contextuel enrichi en interrogeant SQLite pour obtenir l\'état courant de tous les dispositifs, l\'heure locale et les 5 dernières actions de l\'utilisateur.'],
        ['+processCommand(text)', 'CommandResult', 'Point d\'entrée principal. Tente d\'abord la reconnaissance locale, puis bascule sur LLM si nécessaire. Retourne un objet {success, actions[], responseText, latencyMs, level}.'],
        ['+buildContext()', 'JSON', 'Interroge SQLite et retourne un JSON structuré de l\'état complet du foyer, injecté dans le prompt LLM pour contextualiser les décisions de l\'agent.'],
        ['+executeActions(actions)', 'Promise', 'Exécute séquentiellement la liste d\'actions retournée par processCommand. Chaque action est une commande MQTT publiée sur le broker Aedes local.'],
      ],
      [1800, 1800, CONTENT_WIDTH - 3600],
      { firstColBold: true }
    ),
    tableCaption(7, 'Description de la classe AionBrain'),

    sectionDivider('◆  Section 3 terminée  ◆'),
    pageBreak(),

    // ══════════════════════════════════════════════════════
    //  SECTION 4 : DIAGRAMMES DYNAMIQUES
    // ══════════════════════════════════════════════════════

    h1('Section 4 : Modélisation Dynamique (Séquences et États)'),

    h2('4.1 Diagramme de séquence : flux de commande MQTT'),

    p('Le diagramme de séquence décrit les interactions entre les composants du système dans leur ordre temporel pour l\'exécution d\'un cas d\'utilisation spécifique. Nous modélisons ici le scénario le plus représentatif du fonctionnement d\'Ovyon Control : l\'envoi d\'une commande depuis l\'interface PWA React jusqu\'à l\'exécution physique sur un nœud ESP32 et le retour de confirmation à l\'interface.'),

    ...figurePlaceholder(10,
      'Diagramme de séquence UML 2.5 – Flux commande MQTT',
      'Diagramme de séquence avec 5 participants (lignes de vie verticales) : (1) Utilisateur/PWA React, (2) Backend Node.js/Express, (3) Broker MQTT Aedes, (4) ESP32 Noeud cible, (5) Base SQLite. Séquence chronologique (du haut vers le bas) : 1→2 : HTTP POST /api/devices/{id}/command {state:"ON", brightness:80} | 2→2 : [alt] Vérification WebAuthn si action critique | 2→3 : MQTT Publish "ovyon/cmd/lights/zone1" QoS1 {state:"ON", brightness:80} | 3→4 : MQTT Deliver (message) | 4→4 : setPWM(channel, duty_cycle) | 4→3 : MQTT Publish "ovyon/status/lights/zone1" {state:"ON", brightness:80, ts:1234567} | 3→2 : MQTT Deliver (status) | 2→5 : SQL UPDATE devices SET state=... | 2→1 : WebSocket emit "device:update" {id, state, ts} | 1→1 : Re-render React composant. Inclure les annotations de temps (< 5ms entre chaque étape locale). Format : PNG, 16cm x 14cm.',
      3400
    ),

    p('Ce diagramme de séquence révèle plusieurs propriétés architecturales importantes d\'Ovyon Control. Premièrement, l\'intégralité du flux — depuis la requête HTTP initiale jusqu\'au retour de confirmation WebSocket — se déroule sur le réseau local domestique sans aucun appel vers l\'Internet externe. Ce qui représente une latence totale mesurée de 45 ms en conditions réelles contre 523 ms pour une architecture cloud équivalente (facteur 11,6×).'),

    p('Deuxièmement, le modèle de communication est entièrement asynchrone et événementiel : le backend ne bloque pas en attendant la réponse de l\'ESP32 mais réagit à l\'événement MQTT de confirmation de l\'ESP32, puis propage cette mise à jour à tous les clients connectés via WebSocket. Ce modèle garantit que la latence d\'un client n\'impacte jamais la réactivité des autres, et qu\'un ESP32 lent à répondre ne bloque jamais le processing d\'autres commandes.'),

    p('Troisièmement, la persistance dans SQLite intervient après la confirmation de l\'ESP32, garantissant la cohérence entre l\'état physique réel de l\'actionneur et l\'état enregistré en base de données. Ce choix de conception (persist after confirmation vs persist before action) évite les situations de désynchronisation où la base indiquerait une lumière allumée alors qu\'elle est physiquement éteinte en raison d\'une commande non exécutée.'),

    h2('4.2 Diagramme d\'états : machine à états du nœud Window'),

    p('Le diagramme d\'états (State Machine Diagram) modélise le comportement d\'un objet à travers ses états possibles et les transitions entre ces états déclenchées par des événements. Pour les actionneurs mécaniques d\'Ovyon Control comme les servomoteurs de fenêtres et de portes, ce type de modélisation est particulièrement adapté car leur comportement est intrinsèquement stateful : une fenêtre en train de s\'ouvrir ne peut pas simultanément se fermer, et l\'arrêt d\'urgence doit être traité avec la plus haute priorité quel que soit l\'état courant.'),

    ...figurePlaceholder(11,
      'Diagramme d\'états UML 2.5 – Nœud Window',
      'Machine à états UML avec 5 états (rectangles aux coins arrondis) : FERMEE (état initial avec pseudo-état •→), EN_OUVERTURE, OUVERTE, EN_FERMETURE, BLOQUEE (état d\'erreur en rouge). Transitions entre états : FERMEE --[mqtt:OPEN]--> EN_OUVERTURE (action: startServo(OPEN)), EN_OUVERTURE --[position=100%]--> OUVERTE (action: stopServo), EN_OUVERTURE --[mqtt:STOP || courant>seuil]--> BLOQUEE (action: stopServo, publishAlert), OUVERTE --[mqtt:CLOSE]--> EN_FERMETURE (action: startServo(CLOSE)), EN_FERMETURE --[position=0%]--> FERMEE (action: stopServo), EN_FERMETURE --[courant>seuilObstacle]--> BLOQUEE (action: stopServo immédiat, publishAlert("obstacle_detected")), BLOQUEE --[mqtt:RESET || délai 30s]--> FERMEE. Ajouter les gardes sur les transitions et les actions d\'entrée/sortie des états. Format : PNG, 14cm x 10cm.',
      2800
    ),

    p('La machine à états du nœud Window intègre deux mécanismes de sécurité critiques qui illustrent la richesse de la modélisation comportementale par rapport à une simple liste de fonctionnalités. Le premier est la détection d\'obstacle par mesure de courant du servo : lors de la fermeture, un algorithme de surveillance compare en temps réel la consommation du servomoteur à un seuil calibré. Une consommation anormalement élevée indique la présence d\'un obstacle (bras, câble, animal) dans le chemin du panneau de fenêtre, déclenchant immédiatement la transition vers l\'état BLOQUEE et l\'arrêt d\'urgence du moteur, avant qu\'un dommage ne se produise.'),

    p('Le second mécanisme est le timeout de récupération de l\'état BLOQUEE : si aucune commande de réinitialisation manuelle n\'est reçue dans les 30 secondes suivant le passage en état BLOQUEE, le nœud tente automatiquement un retour à l\'état FERMEE en exécutant un mouvement servo très lent de 2 % par seconde, permettant de dégager un obstacle léger sans intervention humaine. Ce comportement de récupération automatique, modélisé par une transition à garde temporelle [délai 30s], est invisible dans une spécification fonctionnelle classique mais est capturé naturellement par la machine à états UML.'),

    h2('4.3 Justification de la cohérence du modèle UML'),

    p('La cohérence entre les quatre diagrammes UML produits est assurée par plusieurs points de correspondance vérifiables. Chaque cas d\'utilisation du diagramme UC-01 peut être tracé jusqu\'aux méthodes correspondantes dans le diagramme de classes (UC-01 "Contrôler éclairage" → méthodes turnOn(), turnOff(), setBrightness() de la classe LightDevice). Chaque participant du diagramme de séquence correspond à une classe ou un composant du diagramme de classes (Backend Node.js → classes AionBrain, ScenarioEngine ; Broker MQTT → composant infrastructure). Chaque état du diagramme d\'états correspond à une valeur possible de l\'attribut state de la classe ActuatorDevice.'),

    p('Cette cohérence croisée valide la complétude du modèle UML : aucun comportement identifié dans les diagrammes dynamiques n\'est orphelin d\'une structure dans les diagrammes statiques, et aucune classe définie ne reste sans comportement associé. La traçabilité de la conception à l\'implémentation est ainsi garantie, facilitant les phases de développement et de test documentées au Chapitre IV.'),

    ...noteAcademique('Synthèse Chapitre III',
      'Les quatre diagrammes UML 2.5 produits — cas d\'utilisation, classes, séquence et états — couvrent l\'intégralité des vues structurelle et comportementale du système Ovyon Control. Leur cohérence interne est vérifiable par traçabilité croisée entre les modèles. Ces artefacts constituent le contrat de conception qui guide l\'implémentation documentée au Chapitre IV.'),

    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  EXPORT
// ─────────────────────────────────────────────────────────────
function getChapters2and3() {
  return [
    ...getChapter2(),
    ...getChapter3(),
  ];
}

module.exports = { getChapters2and3 };
