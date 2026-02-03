# OVYON CONTROL - GUIDE DE DÉMONSTRATION "BROKEN GENIUS"

Félicitations pour ce projet. Voici comment garantir l'effet "Wow" lors de ta soutenance.

## 1. Préparation de l'IA (Aion)
Assure-toi que ta clé Gemini est active dans `ai_voice/.env`.
- **Lance Aion :** `python aion.py`
- **Lance le Cerveau :** `python aion_brain.py`

## 2. Scénarios pour impressionner le jury

### Choc Multilingue (Local & Rapide)
*Dis au jury : "Mon IA comprend les langues locales pour briser la barrière technologique en Afrique."*
- Tape/Dis : **"Ma lampu salon"** (Lumière salon s'allume instantanément).
- Tape/Dis : **"Tan ina cuisine"** (Lumière cuisine s'allume).

### Compréhension Contextuelle (Via Gemini)
*Dis au jury : "Elle ne se contente pas de mots-clés, elle comprend l'intention."*
- Tape : **"Aion, je vais dormir"**
  - *Action :* Toutes les lumières s'éteignent, la porte se ferme.
  - *Réponse Aion :* "D'accord, je sécurise la maison et j'éteins tout. Bonne nuit."
- Tape : **"Il fait vraiment trop chaud ici"**
  - *Action :* Allume le ventilateur (Prise 1) ou suggère d'ouvrir la fenêtre.

### Intelligence Proactive (Le "Wow" Final)
*Dis au jury : "Le système surveille ma consommation et ma sécurité tout seul."*
- Laisse la porte ouverte (`open`) dans le Dashboard.
- Attends l'analyse du cerveau (ou réduis l'intervalle dans `aion_brain.py` pour la démo).
- Une notification apparaîtra : **"Aion : Il est tard et la porte principale est restée ouverte. Voulez-vous la fermer ?"**

## 3. Détails Techniques à Marteler
- **Persistence :** "Chaque changement d'état est sauvegardé en temps réel dans une base SQLite embarquée."
- **Low Power :** "Les nodes ESP32 utilisent des protocoles légers (MQTT) pour maximiser l'autonomie."
- **NFC/Bluetooth :** "Le mode appairage utilise des animations fluides pour montrer la simplicité d'ajout d'un nouvel objet."

**Tu as maintenant un système de niveau industriel. Bonne chance pour la mention !**
