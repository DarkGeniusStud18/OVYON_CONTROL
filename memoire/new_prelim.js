/**
 * ============================================================
 *  MODULE : PAGES PRÉLIMINAIRES
 *  Mémoire Ovyon Control – HECM 2025-2026
 *  Pages 1 à 13 (couverture → résumés)
 * ============================================================
 *  CONTENU :
 *   1.  Page de couverture HECM
 *   2.  Page d'avertissement (usage académique)
 *   3.  Dédicaces
 *   4.  Remerciements (page pleine)
 *   5.  Table des matières (placeholder généré par Word)
 *   6.  Liste des acronymes (28 entrées)
 *   7.  Liste des figures  (18 entrées)
 *   8.  Liste des tableaux (8 entrées)
 *   9.  Résumé français + mots-clés
 *  10.  Abstract anglais  + keywords
 * ============================================================
 */
'use strict';

const {
  Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, HeadingLevel, LineRuleType,
  TableOfContents, PageNumber,
} = require('docx');

const H = require('./thesis_helpers.js');
const {
  FONT, SZ, CLR, SP, LINE_15, CONTENT_WIDTH,
  p, pNoIndent, pItalic, spacer, pageBreak,
  makeTable, makeSimpleTable, h2, h3,
  tableCaption, sectionDivider,
} = H;

// ─────────────────────────────────────────────────────────────
//  HELPERS LOCAUX
// ─────────────────────────────────────────────────────────────

function centered(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: opts.before || 60, after: opts.after || 60, ...LINE_15 },
    children: [new TextRun({
      text, font: FONT,
      size:   opts.size   || SZ.body,
      bold:   opts.bold   || false,
      italic: opts.italic || false,
      color:  opts.color  || CLR.black,
      allCaps: opts.caps  || false,
    })],
  });
}

function coverLine(text, opts = {}) {
  return centered(text, { size: 28, bold: true, color: CLR.navyBlue, ...opts });
}

function dividerLine(color = CLR.royalBlue) {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.THICK, size: 10, color, space: 4 } },
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: ' ', font: FONT, size: 10 })],
  });
}

function thinLine(color = CLR.lightGray) {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color, space: 4 } },
    spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: ' ', font: FONT, size: 6 })],
  });
}

// ─────────────────────────────────────────────────────────────
//  1. PAGE DE COUVERTURE
// ─────────────────────────────────────────────────────────────

function coverPage() {
  return [
    // ── Bandeau institution ──────────────────────────────────
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 40, line: 280, lineRule: LineRuleType.AUTO },
      shading: { fill: CLR.navyBlue, type: ShadingType.CLEAR },
      children: [
        new TextRun({ text: 'REPUBLIQUE DU BENIN', font: FONT, size: 22, bold: true, color: CLR.white }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0, line: 260, lineRule: LineRuleType.AUTO },
      shading: { fill: CLR.navyBlue, type: ShadingType.CLEAR },
      children: [new TextRun({ text: 'MINISTERE DE L\'ENSEIGNEMENT SUPERIEUR ET DE LA RECHERCHE SCIENTIFIQUE', font: FONT, size: 18, color: 'BBDDFF' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 120, line: 260, lineRule: LineRuleType.AUTO },
      shading: { fill: CLR.navyBlue, type: ShadingType.CLEAR },
      children: [new TextRun({ text: 'Haute Ecole de Commerce et de Management  (HECM)', font: FONT, size: 20, bold: true, color: CLR.white })],
    }),
    spacer(40),
    // ── Logo placeholder ────────────────────────────────────
    ...H.figurePlaceholder(
      'LOGO',
      'Logo officiel HECM',
      'Inserer ici le logo officiel de la HECM (format PNG, fond transparent, hauteur 4 cm). Fichier : logo_hecm.png',
      1200
    ),
    spacer(40),
    dividerLine(CLR.royalBlue),
    // ── Mention mémoire ─────────────────────────────────────
    centered('MEMOIRE DE FIN DE FORMATION', { size: 26, bold: true, color: CLR.royalBlue, caps: true, before: 120, after: 60 }),
    centered('En vue de l\'obtention de la Licence Professionnelle', { size: 22, italic: true, color: CLR.darkGray, before: 40, after: 40 }),
    centered('Filiere : Systemes Informatiques et Logiciels (SIL)', { size: 22, bold: true, color: CLR.navyBlue, before: 40, after: 80 }),
    dividerLine(CLR.royalBlue),
    spacer(80),

    // ── Titre du mémoire ────────────────────────────────────
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 80, after: 80, ...LINE_15 },
      border: {
        top:    { style: BorderStyle.DOUBLE, size: 6, color: CLR.royalBlue, space: 8 },
        bottom: { style: BorderStyle.DOUBLE, size: 6, color: CLR.royalBlue, space: 8 },
        left:   { style: BorderStyle.SINGLE, size: 4, color: CLR.lightGray,  space: 8 },
        right:  { style: BorderStyle.SINGLE, size: 4, color: CLR.lightGray,  space: 8 },
      },
      children: [new TextRun({ text: '', font: FONT, size: 10 })],
    }),
    centered('OVYON CONTROL', { size: 40, bold: true, color: CLR.navyBlue, caps: true, before: 120, after: 40 }),
    centered('Conception et Developpement d\'un Ecosysteme Domotique', { size: 26, bold: true, color: CLR.royalBlue, before: 40, after: 40 }),
    centered('Resilient et Intelligent Base sur une Architecture Local-First', { size: 26, bold: true, color: CLR.royalBlue, before: 0, after: 40 }),
    centered('pour Contextes a Infrastructure Contrainte', { size: 24, italic: true, color: CLR.darkGray, before: 40, after: 120 }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      border: { bottom: { style: BorderStyle.DOUBLE, size: 6, color: CLR.royalBlue, space: 8 } },
      children: [new TextRun({ text: ' ', font: FONT, size: 6 })],
    }),
    spacer(120),

    // ── Auteur / Directeur ──────────────────────────────────
    makeTable(
      ['AUTEUR', 'DIRECTEUR DE MEMOIRE'],
      [['VODOUNNOU Koffi Emmanuel', 'Prof. [Nom du Directeur]'],
       ['Matricule : HECM-SIL-2022-XXX', 'Departement Informatique – HECM'],
       ['5e annee – Promotion 2025-2026', 'Grade : [Grade academique]']],
      [Math.floor(CONTENT_WIDTH / 2), CONTENT_WIDTH - Math.floor(CONTENT_WIDTH / 2)],
      { centerAll: true }
    ),
    spacer(120),

    // ── Jury ────────────────────────────────────────────────
    centered('JURY DE SOUTENANCE', { size: 20, bold: true, color: CLR.navyBlue, before: 80, after: 60 }),
    makeSimpleTable(
      [['President du jury :', '[Nom, Titre, Institution]'],
       ['Membre :',             '[Nom, Titre, Institution]'],
       ['Membre :',             '[Nom, Titre, Institution]']],
      [2800, CONTENT_WIDTH - 2800]
    ),
    spacer(120),

    // ── Date ────────────────────────────────────────────────
    centered('Annee academique 2025 – 2026', { size: 22, bold: true, color: CLR.navyBlue, before: 80 }),
    centered('Cotonou, Benin', { size: 20, italic: true, color: CLR.medGray }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  2. PAGE D'AVERTISSEMENT
// ─────────────────────────────────────────────────────────────

function avertissementPage() {
  return [
    spacer(480),
    centered('AVERTISSEMENT', { size: 28, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(160),
    p('Ce mémoire de fin de formation a été rédigé dans le cadre du programme de Licence Professionnelle en Systèmes Informatiques et Logiciels (SIL) dispensé à la Haute École de Commerce et de Management (HECM), Cotonou, République du Bénin.'),
    p('Le contenu de ce document, les analyses présentées, les choix architecturaux décrits ainsi que les résultats expérimentaux rapportés engagent uniquement la responsabilité de l\'auteur et ne sauraient représenter la position officielle de l\'institution, ni de son corps enseignant.'),
    p('Ce travail est protégé par les dispositions relatives à la propriété intellectuelle en vigueur en République du Bénin et par les conventions internationales auxquelles le Bénin est signataire. Toute reproduction, même partielle, de ce document à des fins commerciales ou non, sans l\'accord écrit et préalable de l\'auteur, est strictement interdite.'),
    p('Les extraits de code source présentés dans ce mémoire constituent des illustrations pédagogiques des concepts exposés. Ils sont fournis à titre documentaire et ne représentent pas nécessairement l\'intégralité du code de production du projet Ovyon Control.'),
    p('Les noms de produits, marques, et technologies citées dans ce document sont la propriété de leurs détenteurs respectifs. Leur mention n\'implique aucun accord commercial ou partenariat entre l\'auteur, l\'HECM et lesdites entités.'),
    spacer(240),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 80, after: 80, line: 280, lineRule: LineRuleType.AUTO },
      shading: { fill: 'EBF3FB', type: ShadingType.CLEAR },
      border: {
        top:    { style: BorderStyle.SINGLE, size: 4, color: CLR.steelBlue, space: 6 },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: CLR.steelBlue, space: 6 },
        left:   { style: BorderStyle.THICK,  size: 12, color: CLR.steelBlue, space: 10 },
        right:  { style: BorderStyle.SINGLE, size: 4, color: CLR.steelBlue, space: 6 },
      },
      children: [new TextRun({ text: 'Document soumis à la HECM en vue de la soutenance de Licence Professionnelle SIL – Année académique 2025-2026. Toute utilisation académique doit mentionner la source complète : NOM Prénom, "Ovyon Control : Conception et Développement d\'un Écosystème Domotique Résilient et Intelligent Basé sur une Architecture Local-First pour Contextes à Infrastructure Contrainte", Mémoire de Licence SIL, HECM, Cotonou, 2026.', font: FONT, size: SZ.note, italic: true, color: CLR.darkGray })],
    }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  3. DÉDICACES
// ─────────────────────────────────────────────────────────────

function dedicacesPage() {
  return [
    spacer(600),
    centered('DÉDICACES', { size: 28, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(240),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 60, ...LINE_15 },
      border: {
        left:  { style: BorderStyle.THICK, size: 8, color: CLR.royalBlue, space: 12 },
        right: { style: BorderStyle.THICK, size: 8, color: CLR.royalBlue, space: 12 },
      },
      indent: { left: 720, right: 720 },
      children: [new TextRun({ text: 'À mes parents,', font: FONT, size: SZ.body, italic: true, color: CLR.darkGray })],
    }),
    p('dont le soutien indéfectible, la confiance sans faille et les sacrifices consentis tout au long de mon cursus académique constituent le fondement de ce travail. Vous m\'avez enseigné que la persévérance et l\'intégrité sont les vertus premières de tout homme accompli.', { noIndent: true, italic: true }),
    spacer(80),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 60, ...LINE_15 },
      border: {
        left:  { style: BorderStyle.THICK, size: 8, color: CLR.royalBlue, space: 12 },
        right: { style: BorderStyle.THICK, size: 8, color: CLR.royalBlue, space: 12 },
      },
      indent: { left: 720, right: 720 },
      children: [new TextRun({ text: 'À mes frères et sœurs,', font: FONT, size: SZ.body, italic: true, color: CLR.darkGray })],
    }),
    p('compagnons de route, sources d\'émulation et de joie, pour chaque mot d\'encouragement et chaque moment de solidarité partagé durant ces années d\'études.', { noIndent: true, italic: true }),
    spacer(80),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 60, ...LINE_15 },
      border: {
        left:  { style: BorderStyle.THICK, size: 8, color: CLR.royalBlue, space: 12 },
        right: { style: BorderStyle.THICK, size: 8, color: CLR.royalBlue, space: 12 },
      },
      indent: { left: 720, right: 720 },
      children: [new TextRun({ text: 'À tous les étudiants africains en informatique,', font: FONT, size: SZ.body, italic: true, color: CLR.darkGray })],
    }),
    p('qui bâtissent, avec les ressources disponibles sur leur continent, des solutions technologiques adaptées à leurs réalités. Puisse ce travail démontrer qu\'il est possible d\'innover avec pertinence depuis l\'Afrique et pour l\'Afrique.', { noIndent: true, italic: true }),
    spacer(240),
    pItalic('"L\'innovation véritable naît là où le besoin est le plus aigu."', { size: 22 }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  4. REMERCIEMENTS
// ─────────────────────────────────────────────────────────────

function remerciementsPage() {
  return [
    spacer(160),
    centered('REMERCIEMENTS', { size: 28, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(120),

    p('La réalisation de ce mémoire de fin de formation n\'aurait pas été possible sans le concours précieux de nombreuses personnes à qui je tiens à exprimer ma profonde gratitude. Ces remerciements, bien que nécessairement succincts au regard de la dette intellectuelle et morale que j\'ai contractée, représentent la sincérité et la profondeur de ma reconnaissance.'),

    p('Je tiens en premier lieu à exprimer ma vive gratitude envers la Direction de la Haute École de Commerce et de Management (HECM) pour la qualité de la formation dispensée, l\'accompagnement pédagogique rigoureux et les conditions d\'apprentissage offertes tout au long de mon cursus. La vision de cet établissement, qui forme des professionnels capables d\'apporter des solutions concrètes aux défis du développement africain, a profondément inspiré ce projet.'),

    p('J\'adresse mes plus sincères remerciements à mon Directeur de mémoire, le Professeur [Nom du Directeur], pour la disponibilité dont il a fait preuve à chaque étape de ce travail. Ses orientations méthodologiques avisées, ses remarques constructives et son exigence intellectuelle ont été des balises indispensables qui ont guidé ma réflexion vers une rigueur académique que j\'espère avoir atteinte. Sa capacité à pointer les faiblesses d\'un raisonnement tout en encourageant l\'innovation constitue un modèle pédagogique dont je m\'inspirerai tout au long de ma carrière.'),

    p('Mes remerciements vont également à l\'ensemble du corps enseignant de la filière Systèmes Informatiques et Logiciels (SIL) de l\'HECM. Les cours de Génie Logiciel, d\'Architecture des Systèmes Embarqués, de Réseaux Informatiques et d\'Intelligence Artificielle ont constitué les fondements théoriques sur lesquels repose l\'intégralité de ce projet. Je remercie plus particulièrement les professeurs [Nom 1] et [Nom 2] pour leurs enseignements en programmation système et en IoT qui ont directement nourri les choix architecturaux d\'Ovyon Control.'),

    p('Je suis profondément reconnaissant envers la communauté des développeurs open-source dont les contributions ont rendu possible la réalisation technique de ce projet. Les créateurs et mainteneurs de l\'écosystème Node.js, de la bibliothèque Aedes pour le broker MQTT, du framework React, de SQLite, des outils Arduino/ESP-IDF pour la plateforme ESP32, ainsi que les équipes de recherche de l\'Ink & Switch Laboratory dont les travaux fondateurs sur le paradigme Local-First ont guidé notre architecture — tous méritent une mention spéciale. Ce mémoire s\'appuie sur un écosystème collaboratif mondial et cherche en retour à y contribuer par la documentation de l\'expérience acquise.'),

    p('Mes remerciements chaleureux vont à mes camarades de promotion, et plus particulièrement à [Prénom 1], [Prénom 2] et [Prénom 3], pour les longues sessions de travail nocturnes, les échanges techniques stimulants et le soutien moral constant. La dynamique intellectuelle de notre groupe a été une source d\'émulation qui a indéniablement élevé la qualité de ce travail. La fraternité académique que nous avons cultivée représente l\'une des richesses les plus précieuses de ces années de formation.'),

    p('Je remercie aussi sincèrement les familles [Nom famille 1] et [Nom famille 2] qui ont, à des moments critiques de ma formation, offert hospitalité et soutien logistique. Leur générosité illustre que la réussite académique est toujours une aventure collective, portée par un tissu de solidarités humaines.'),

    p('Enfin, une pensée émue va à mes parents, dont les sacrifices pour financer mes études n\'ont jamais faibli malgré les contraintes. C\'est pour honorer leur foi en moi et leur investissement que ce travail a été mené avec le plus grand sérieux. Ce mémoire leur est dédié tout autant qu\'à la conviction que la technologie, bien orientée, peut améliorer concrètement les conditions de vie sur le continent africain.'),

    spacer(160),
    pItalic('Que chacune et chacun trouve ici l\'expression de ma sincère et durable reconnaissance.'),
    spacer(80),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 60, after: 60, ...LINE_15 },
      children: [new TextRun({ text: 'L\'auteur, Cotonou, mars 2026', font: FONT, size: SZ.body, italic: true, color: CLR.darkGray })],
    }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  5. TABLE DES MATIÈRES (placeholder TOC Word)
// ─────────────────────────────────────────────────────────────

function tableDesMatieresPage() {
  return [
    centered('TABLE DES MATIÈRES', { size: 28, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(80),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 80, line: 280, lineRule: LineRuleType.AUTO },
      children: [new TextRun({ text: '[La table des matières sera générée automatiquement par Microsoft Word après insertion des styles Titre 1, Titre 2 et Titre 3. Aller dans Références > Table des matières > Table automatique 2 pour la générer.]', font: FONT, size: SZ.note, italic: true, color: CLR.medGray })],
    }),
    new TableOfContents('Table des matières', {
      hyperlink: true,
      headingStyleRange: '1-3',
    }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  6. LISTE DES ACRONYMES
// ─────────────────────────────────────────────────────────────

function listeAcronymesPage() {
  const acronymes = [
    ['AION',    'Artificial Intelligence Orchestration Node – Agent IA central d\'Ovyon Control'],
    ['API',     'Application Programming Interface – Interface de programmation applicative'],
    ['CORS',    'Cross-Origin Resource Sharing – Partage des ressources entre origines'],
    ['CPU',     'Central Processing Unit – Unité centrale de traitement'],
    ['CRDTs',   'Conflict-free Replicated Data Types – Types de données répliquées sans conflit'],
    ['DHT11',   'Digital Humidity and Temperature sensor – Capteur numérique humidité/température'],
    ['ESP32',   'Microcontrôleur dual-core 240 MHz Xtensa LX6 avec Wi-Fi/Bluetooth intégré (Espressif)'],
    ['FIDO2',   'Fast IDentity Online 2 – Standard d\'authentification sans mot de passe (FIDO Alliance)'],
    ['GPIO',    'General Purpose Input/Output – Entrée/Sortie à usage général'],
    ['HTTP',    'HyperText Transfer Protocol – Protocole de transfert hypertexte'],
    ['HTTPS',   'HyperText Transfer Protocol Secure – Version sécurisée de HTTP'],
    ['IoT',     'Internet of Things – Internet des Objets'],
    ['JWT',     'JSON Web Token – Jeton d\'authentification au format JSON'],
    ['LLM',     'Large Language Model – Grand modèle de langage'],
    ['MQTT',    'Message Queuing Telemetry Transport – Protocole de messagerie IoT léger'],
    ['NLP',     'Natural Language Processing – Traitement du langage naturel'],
    ['ORM',     'Object-Relational Mapping – Mapping objet-relationnel'],
    ['PWA',     'Progressive Web Application – Application web progressive'],
    ['PWM',     'Pulse Width Modulation – Modulation de largeur d\'impulsion'],
    ['QoS',     'Quality of Service – Qualité de service (niveaux 0, 1, 2 en MQTT)'],
    ['RAM',     'Random Access Memory – Mémoire vive'],
    ['ReAct',   'Reasoning and Acting – Paradigme de raisonnement agent IA (Yao et al., 2023)'],
    ['REST',    'Representational State Transfer – Style d\'architecture d\'API web'],
    ['SIL',     'Systèmes Informatiques et Logiciels – Filière HECM'],
    ['SoC',     'System on Chip – Système sur puce intégrant CPU, Wi-Fi, Bluetooth'],
    ['SQLite',  'Self-Contained SQL Database Engine – Moteur de base de données embarquée'],
    ['TCP',     'Transmission Control Protocol – Protocole de contrôle de transmission'],
    ['TLS',     'Transport Layer Security – Protocole de sécurité de la couche transport'],
    ['UML',     'Unified Modeling Language – Langage de modélisation unifié (version 2.5)'],
    ['WebAuthn','Web Authentication API – API d\'authentification biométrique W3C/FIDO2'],
    ['WebSocket','Protocole de communication bidirectionnelle en temps réel sur HTTP'],
    ['Wi-Fi',   'Wireless Fidelity – Technologie réseau sans fil (IEEE 802.11)'],
  ];

  return [
    centered('LISTE DES ACRONYMES ET ABRÉVIATIONS', { size: 24, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(80),
    makeTable(
      ['Sigle / Acronyme', 'Signification et Définition'],
      acronymes,
      [1800, CONTENT_WIDTH - 1800],
      { firstColBold: true }
    ),
    tableCaption('A', 'Liste des acronymes et abréviations utilisés dans ce mémoire'),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  7. LISTE DES FIGURES
// ─────────────────────────────────────────────────────────────

function listeFiguresPage() {
  const figures = [
    ['Figure 1',  'Architecture générale en trois couches de l\'écosystème Ovyon Control', '16'],
    ['Figure 2',  'Modèle de communication MQTT Publish/Subscribe avec broker Aedes',       '18'],
    ['Figure 3',  'Principe du paradigme Local-First : synchronisation différée avec le cloud', '20'],
    ['Figure 4',  'Architecture matérielle du microcontrôleur ESP32 (SoC Xtensa LX6 dual-core)', '22'],
    ['Figure 5',  'Cycle de raisonnement ReAct de l\'agent AION (Thought → Action → Observation)', '24'],
    ['Figure 6',  'Carte de contexte : infrastructure numérique au Bénin (taux électrification, couverture réseau)', '28'],
    ['Figure 7',  'Tableau comparatif visuel : Tuya Smart vs KNX vs Ovyon Control',          '30'],
    ['Figure 8',  'Diagramme de cas d\'utilisation UML 2.5 – Système Ovyon Control',         '38'],
    ['Figure 9',  'Diagramme de classes UML 2.5 – Architecture logicielle Ovyon Control',    '42'],
    ['Figure 10', 'Diagramme de séquence UML 2.5 – Flux de commande MQTT bout en bout',      '46'],
    ['Figure 11', 'Diagramme d\'états UML 2.5 – Machine à états du nœud Window',             '49'],
    ['Figure 12', 'Architecture technique complète du backend Node.js/Express/Aedes',        '55'],
    ['Figure 13', 'Interface du tableau de bord PWA React (capture d\'écran annotée)',        '57'],
    ['Figure 14', 'Schéma de câblage ESP32 – Nœud éclairage PWM 3 zones (Proteus)',          '61'],
    ['Figure 15', 'Schéma de câblage ESP32 – Nœud fenêtre avec détection d\'obstacle',       '62'],
    ['Figure 16', 'Flux d\'authentification WebAuthn/FIDO2 – Enregistrement et vérification biométrique', '65'],
    ['Figure 17', 'Comparaison de latence : architecture locale (45 ms) vs cloud (523 ms)',   '68'],
    ['Figure 18', 'Capture de la simulation Proteus – Validation sans matériel physique',     '70'],
  ];

  return [
    centered('LISTE DES FIGURES', { size: 24, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(80),
    makeTable(
      ['Référence', 'Titre de la figure', 'Page'],
      figures,
      [1400, CONTENT_WIDTH - 2200, 800],
      { firstColBold: true }
    ),
    tableCaption('B', 'Liste des figures du mémoire'),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  8. LISTE DES TABLEAUX
// ─────────────────────────────────────────────────────────────

function listeTableauxPage() {
  const tableaux = [
    ['Tableau A',  'Liste des acronymes et abréviations utilisés dans ce mémoire',              '6'],
    ['Tableau B',  'Liste des figures du mémoire',                                              '7'],
    ['Tableau C',  'Liste des tableaux du mémoire',                                             '8'],
    ['Tableau 1',  'Comparaison MQTT / HTTP / CoAP / WebSocket pour l\'IoT résidentiel',        '19'],
    ['Tableau 2',  'Solutions domotiques du marché vs Ovyon Control – Analyse comparative',     '30'],
    ['Tableau 3',  'Matrice des exigences fonctionnelles avec priorité MoSCoW',                 '33'],
    ['Tableau 4',  'Contraintes non fonctionnelles avec métriques de validation',               '36'],
    ['Tableau 5',  'Description détaillée des acteurs du diagramme de cas d\'utilisation',      '39'],
    ['Tableau 6',  'Pile technologique complète – 10 couches avec justifications',              '54'],
    ['Tableau 7',  'Résultats des tests de validation – 10 types de tests',                     '67'],
    ['Tableau 8',  'Bilan de performance : Ovyon Control vs objectifs initiaux',                '71'],
  ];

  return [
    centered('LISTE DES TABLEAUX', { size: 24, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(80),
    makeTable(
      ['Référence', 'Titre du tableau', 'Page'],
      tableaux,
      [1400, CONTENT_WIDTH - 2200, 800],
      { firstColBold: true }
    ),
    tableCaption('C', 'Liste des tableaux du mémoire'),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  9. RÉSUMÉ FRANÇAIS
// ─────────────────────────────────────────────────────────────

function resumeFrancaisPage() {
  return [
    centered('RÉSUMÉ', { size: 28, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(120),

    p('La domotique constitue l\'un des axes majeurs de la transformation numérique des foyers contemporains. Cependant, les solutions commerciales dominantes — qu\'elles soient fondées sur des plateformes cloud propriétaires comme Tuya ou Amazon Alexa, ou sur des protocoles industriels comme KNX — présentent des limitations structurelles majeures dans les contextes à infrastructure contrainte caractéristiques de nombreux pays africains : dépendance à une connexion Internet stable, coût prohibitif du matériel et de l\'installation, et absence de résilience face aux coupures d\'alimentation et aux défaillances réseau.'),

    p('Ce mémoire présente la conception et le développement d\'Ovyon Control, un écosystème domotique intelligent fondé sur le paradigme Local-First. Ce paradigme, formalisé par les chercheurs de l\'Ink & Switch Laboratory, stipule que le logiciel doit fonctionner en priorité sur les ressources locales de l\'appareil, garantissant ainsi une disponibilité maximale indépendamment de la connectivité externe. Ovyon Control implémente cette philosophie à travers une architecture tripartite rigoureusement conçue : une couche IoT reposant sur cinq nœuds ESP32 spécialisés (éclairage PWM trizone, motorisation de portes, motorisation de fenêtres avec détection d\'obstacle, gestion de prises avec mesure de consommation, et supervision environnementale DHT11), une couche backend en Node.js avec broker MQTT Aedes et persistance SQLite embarquée, et une couche frontend en React 18/TypeScript constituant une Progressive Web Application accessible hors-ligne.'),

    p('L\'innovation centrale de ce travail réside dans l\'intégration de l\'agent AION (Artificial Intelligence Orchestration Node), un système d\'intelligence artificielle à deux niveaux de raisonnement. Le premier niveau exploite un dictionnaire d\'expressions régulières pour le traitement instantané des commandes usuelles avec une précision de 100 % et une latence inférieure à 5 ms. Le second niveau fait appel à un Grand Modèle de Langage (LLM) via l\'API OpenRouter pour le traitement des requêtes contextuelles complexes, atteignant une précision globale de 94 % sur un corpus de test de 50 commandes diversifiées. L\'agent fonctionne selon le paradigme ReAct (Reasoning and Acting), qui entremêle raisonnement symbolique et actions concrètes sur les dispositifs IoT.'),

    p('La sécurité du système est assurée par l\'implémentation du protocole WebAuthn/FIDO2, permettant une authentification biométrique sans mot de passe conforme aux standards W3C, particulièrement adaptée à l\'usage quotidien en contexte domestique. La méthodologie de développement a intégré une approche de validation par simulation Proteus, permettant de tester le comportement des nœuds ESP32 sans nécessiter de matériel physique, réduisant ainsi les coûts de développement et accélérant les itérations.'),

    p('Les tests de validation conduits sur une période de sept jours consécutifs démontrent des performances significativement supérieures aux alternatives cloud : une latence moyenne de 45 ms en mode local contre 523 ms pour une architecture cloud équivalente (facteur d\'amélioration de 11,6×), une disponibilité de 100 % durant la période de test (zéro crash, zéro perte de données), et un coût total de déploiement inférieur à 15 USD pour l\'ensemble des nœuds IoT. Ces résultats valident les trois hypothèses initiales et attestent de la pertinence du paradigme Local-First pour la domotique en contexte africain.'),

    p('Ce mémoire propose ainsi une contribution méthodologique et technique à la conception de systèmes embarqués intelligents adaptés aux contraintes d\'infrastructures des pays en développement. Il ouvre des perspectives de recherche sur l\'intégration du protocole Matter pour l\'interopérabilité multi-marques, l\'embarquement de modèles d\'IA Edge pour l\'inférence locale, la gestion de l\'énergie solaire et l\'extension vers une application mobile React Native.'),

    spacer(160),
    // Mots-clés
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 80, after: 80, ...LINE_15 },
      shading: { fill: 'EBF3FB', type: ShadingType.CLEAR },
      border: {
        left: { style: BorderStyle.THICK, size: 10, color: CLR.royalBlue, space: 10 },
      },
      indent: { left: 360 },
      children: [
        new TextRun({ text: 'Mots-clés : ', font: FONT, size: SZ.body, bold: true, color: CLR.navyBlue }),
        new TextRun({ text: 'domotique, Local-First, IoT, ESP32, MQTT, SQLite, React, Node.js, intelligence artificielle, agent conversationnel, LLM, ReAct, WebAuthn, FIDO2, Bénin, Afrique subsaharienne, PWA, résilience, latence, disponibilité.', font: FONT, size: SZ.body, italic: true, color: CLR.darkGray }),
      ],
    }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  10. ABSTRACT (ANGLAIS)
// ─────────────────────────────────────────────────────────────

function abstractPage() {
  return [
    centered('ABSTRACT', { size: 28, bold: true, color: CLR.navyBlue, caps: true }),
    dividerLine(CLR.royalBlue),
    spacer(120),

    p('Smart home automation represents one of the most significant axes of digital transformation in contemporary households. However, the dominant commercial solutions — whether built on proprietary cloud platforms such as Tuya or Amazon Alexa, or on industrial-grade protocols such as KNX — exhibit major structural limitations in infrastructure-constrained environments typical of many African countries: dependency on stable Internet connectivity, prohibitive hardware and installation costs, and lack of resilience against power outages and network failures.'),

    p('This thesis presents the design and development of Ovyon Control, an intelligent smart home ecosystem grounded in the Local-First paradigm. Formalized by researchers at the Ink & Switch Laboratory, this paradigm mandates that software operate primarily on local device resources, thereby guaranteeing maximum availability independently of external connectivity. Ovyon Control implements this philosophy through a rigorously designed three-tier architecture: an IoT layer comprising five specialized ESP32 nodes (tri-zone PWM lighting control, door servo actuation, window servo actuation with obstacle detection, power outlet management with consumption metering, and DHT11 environmental monitoring), a Node.js backend layer with Aedes MQTT broker and embedded SQLite persistence, and a React 18/TypeScript frontend Progressive Web Application accessible offline.'),

    p('The central innovation of this work lies in the integration of the AION agent (Artificial Intelligence Orchestration Node), a dual-level artificial intelligence system. The first level leverages a regular expression dictionary for instantaneous processing of standard commands with 100% precision and sub-5ms latency. The second level invokes a Large Language Model (LLM) through the OpenRouter API to handle complex contextual queries, achieving an overall accuracy of 94% on a test corpus of 50 varied commands. The agent operates according to the ReAct (Reasoning and Acting) paradigm, which interleaves symbolic reasoning with concrete actions on IoT devices.'),

    p('System security is ensured through implementation of the WebAuthn/FIDO2 protocol, enabling W3C-compliant passwordless biometric authentication particularly suited to daily residential use. The development methodology incorporated a Proteus simulation-based validation approach, enabling ESP32 node behavior testing without physical hardware, thereby reducing development costs and accelerating iteration cycles.'),

    p('Validation tests conducted over seven consecutive days demonstrate performance significantly superior to cloud alternatives: an average latency of 45 ms in local mode versus 523 ms for an equivalent cloud architecture (11.6× improvement factor), 100% availability throughout the test period (zero crashes, zero data loss), and a total deployment cost below USD 15 for all IoT nodes. These results validate all three initial hypotheses and attest to the relevance of the Local-First paradigm for smart home systems in African contexts.'),

    p('This thesis thus contributes methodological and technical insights to the design of intelligent embedded systems adapted to the infrastructure constraints of developing nations. It opens research perspectives on Matter protocol integration for multi-brand interoperability, Edge AI model embedding for local inference, solar energy management, and extension toward a React Native mobile application.'),

    spacer(160),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 80, after: 80, ...LINE_15 },
      shading: { fill: 'EBF3FB', type: ShadingType.CLEAR },
      border: { left: { style: BorderStyle.THICK, size: 10, color: CLR.royalBlue, space: 10 } },
      indent: { left: 360 },
      children: [
        new TextRun({ text: 'Keywords: ', font: FONT, size: SZ.body, bold: true, color: CLR.navyBlue }),
        new TextRun({ text: 'home automation, Local-First, IoT, ESP32, MQTT, SQLite, React, Node.js, artificial intelligence, conversational agent, LLM, ReAct, WebAuthn, FIDO2, Benin, sub-Saharan Africa, PWA, resilience, latency, availability.', font: FONT, size: SZ.body, italic: true, color: CLR.darkGray }),
      ],
    }),
    pageBreak(),
  ];
}

// ─────────────────────────────────────────────────────────────
//  EXPORT
// ─────────────────────────────────────────────────────────────

function getPreliminaryPages() {
  return [
    ...coverPage(),
    ...avertissementPage(),
    ...dedicacesPage(),
    ...remerciementsPage(),
    ...tableDesMatieresPage(),
    ...listeAcronymesPage(),
    ...listeFiguresPage(),
    ...listeTableauxPage(),
    ...resumeFrancaisPage(),
    ...abstractPage(),
  ];
}

module.exports = { getPreliminaryPages };
