/**
 * ============================================================
 *  ASSEMBLEUR FINAL – MÉMOIRE OVYON CONTROL
 *  Génère : Memoire_Ovyon_Control_75p_FINAL.docx
 *
 *  USAGE :
 *    node build_memoire.js
 *
 *  PRÉREQUIS (dans le même dossier) :
 *    thesis_helpers.js
 *    new_prelim.js
 *    new_intro_chap1.js
 *    new_chap2.js
 *    new_chap3_4.js
 *
 *  INSTALLATION DES DÉPENDANCES :
 *    npm install docx
 * ============================================================
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { Document, Packer } = require('docx');

const H = require('./thesis_helpers.js');
const { getPreliminaryPages }       = require('./new_prelim.js');
const { getIntroAndChapter1 }       = require('./new_intro_chap1.js');
const { getChapters2and3 }          = require('./new_chap2.js');
const { getChapters4AndConclusion } = require('./new_chap3_4.js');

// ─────────────────────────────────────────────────────────────
//  ASSEMBLAGE
// ─────────────────────────────────────────────────────────────

console.log('Assemblage du mémoire Ovyon Control...');
console.time('Génération DOCX');

const allChildren = [
  ...getPreliminaryPages(),
  ...getIntroAndChapter1(),
  ...getChapters2and3(),
  ...getChapters4AndConclusion(),
];

console.log(`Blocs totaux assemblés : ${allChildren.length}`);

const doc = new Document({
  creator:     'Ovyon Control – HECM SIL 2025-2026',
  title:       'Conception et Réalisation d\'un Écosystème Domotique Local-First Résilient et Intelligent : Cas du Projet Ovyon Control',
  description: 'Mémoire de Licence Professionnelle SIL, HECM Bénin, Année académique 2025-2026',
  subject:     'Domotique, IoT, Local-First, MQTT, ESP32, Intelligence Artificielle, WebAuthn',
  keywords:    'domotique, local-first, iot, esp32, mqtt, sqlite, react, nodejs, aion, webauthn, fido2, benin',

  numbering: { config: H.NUMBERING },
  styles:    H.STYLES,

  sections: [{
    properties: H.SECTION_PROPS,
    headers:    { default: H.makeHeader() },
    footers:    { default: H.makeFooter() },
    children:   allChildren,
  }],
});

// ─────────────────────────────────────────────────────────────
//  GÉNÉRATION DU FICHIER
// ─────────────────────────────────────────────────────────────

const OUTPUT = path.resolve(__dirname, 'Memoire_Ovyon_Control_75p_FINAL.docx');

Packer.toBuffer(doc)
  .then(buffer => {
    fs.writeFileSync(OUTPUT, buffer);
    console.timeEnd('Génération DOCX');
    console.log(`\n✅ Fichier généré : ${OUTPUT}`);
    console.log(`   Taille : ${(buffer.length / 1024).toFixed(0)} Ko`);
    console.log(`   Blocs  : ${allChildren.length} éléments`);
    console.log('\n--- ESTIMATION DU NOMBRE DE PAGES ---');
    console.log('  • 75 pages avec Times New Roman 12pt, interligne 1.5');
    console.log('  • Marges A4 : haut/droite/bas 2.5cm, gauche 3cm');
    console.log('  • Placeholders de figures occupent ~0.5 page chacun');
    console.log('  • Pour confirmer : ouvrir dans Word → Ctrl+Fin → voir n° page');
    console.log('\n--- PROCHAINES ÉTAPES ---');
    console.log('  1. Insérer les vraies figures aux emplacements [INSÉRER ICI]');
    console.log('  2. Mettre à jour la table des matières : Références → MAJ table');
    console.log('  3. Vérifier/compléter les noms [Nom du Directeur], [Matricule]');
    console.log('  4. Relecture orthographique finale (LibreOffice Writer / Word)');
    console.log('  5. Exporter en PDF/A pour le dépôt officiel HECM');
  })
  .catch(err => {
    console.error('❌ Erreur lors de la génération :', err.message);
    process.exit(1);
  });
