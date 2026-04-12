# Mémoire Ovyon Control – Instructions d'assemblage

## Fichiers requis (dans le même dossier)

```
thesis_helpers.js       ← Module helpers (fourni précédemment)
new_prelim.js           ← Pages préliminaires (fourni précédemment)
new_intro_chap1.js      ← Introduction + Chapitre I (fourni précédemment)
new_chap2.js            ← Chapitre II + III (ce livrable)
new_chap3_4.js          ← Chapitre IV + Conclusion + Bibliographie (ce livrable)
build_memoire.js        ← Assembleur final (ce livrable)
```

## Installation

```bash
npm install docx
```

## Génération

```bash
node build_memoire.js
```

→ Produit : `Memoire_Ovyon_Control_75p_FINAL.docx`

---

## Estimation des pages

| Section | Pages estimées |
|---------|---------------|
| Pages préliminaires (couverture → abstracts) | 1 – 13 |
| Introduction générale | 14 – 18 |
| Chapitre I – Fondements théoriques | 19 – 35 |
| Chapitre II – Analyse du contexte | 36 – 45 |
| Chapitre III – Conception UML 2.5 | 46 – 56 |
| Chapitre IV – Réalisation + Tests | 57 – 71 |
| Conclusion générale | 72 – 73 |
| Bibliographie (30 réf.) | 74 – 75 |
| **Total** | **75 pages** |

---

## Figures à insérer (18 placeholders)

Chaque placeholder bleu `[INSÉRER ICI]` doit être remplacé par la figure réelle :

| Figure | Description |
|--------|-------------|
| Fig. LOGO | Logo officiel HECM (PNG transparent) |
| Fig. 1 | Architecture 3 couches Ovyon Control |
| Fig. 2 | Schéma MQTT Pub/Sub avec Aedes |
| Fig. 3 | Principe Local-First (mode offline vs online) |
| Fig. 4 | Architecture matérielle ESP32 (schema bloc) |
| Fig. 5 | Cycle ReAct de l'agent AION |
| Fig. 6 | Carte infrastructure numérique Bénin |
| Fig. 7 | Radar chart comparaison solutions |
| Fig. 8 | Diagramme de cas d'utilisation UML |
| Fig. 9 | Diagramme de classes UML |
| Fig. 10 | Diagramme de séquence MQTT |
| Fig. 11 | Machine à états nœud Window |
| Fig. 12 | Architecture backend Node.js |
| Fig. 13 | Capture dashboard PWA React |
| Fig. 14 | Schéma câblage Lights (Proteus) |
| Fig. 15 | Schéma câblage Window (Proteus) |
| Fig. 16 | Flux WebAuthn/FIDO2 |
| Fig. 17 | Graphique comparaison latence |
| Fig. 18 | Capture simulation Proteus |

---

## Éléments à personnaliser

- `[Nom du Directeur]` → Nom réel du directeur de mémoire
- `[Grade académique]` → Titre du directeur (Dr., Prof., M., Mme)
- `[Nom jury 1/2/3]` → Membres du jury de soutenance
- `HECM-SIL-2022-XXX` → Votre matricule HECM réel
- `VODOUNNOU Koffi Emmanuel` → Votre nom complet si différent
- `[Prénom 1/2/3]` → Noms de vos camarades de promotion
- `[Nom famille 1/2]` → Noms des familles d'accueil

---

## Après génération du DOCX

1. **Générer la table des matières** : Onglet Références → Table des matières → Insérer table automatique
2. **Insérer les figures** : Cliquer sur chaque placeholder → Supprimer → Insérer image
3. **Mettre à jour les numéros de page** : Ctrl+A → F9
4. **Vérification orthographe** : Révision → Vérifier le document
5. **Export PDF/A pour dépôt** : Fichier → Enregistrer sous → PDF → Options → ISO 19005-1 (PDF/A)
