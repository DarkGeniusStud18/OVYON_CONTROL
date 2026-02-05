# 🎭 SIMULATION INTÉGRALE : SOUTENANCE OVYON CONTROL (VERSION FINALE)

**Thème :** Conception d'un écosystème domotique localisé à faible consommation basé sur une application mobile, des objets connectés NFC/Bluetooth et une IA vocale embarquée.

---

## ⏱️ RÉPARTITION DU TEMPS (40 Minutes)
1.  **[00:00 - 15:00] :** Présentation Théorique (Supports visuels)
2.  **[15:00 - 30:00] :** Démonstration Technique Live (App + Maquette + IA)
3.  **[30:00 - 40:00] :** Session de Questions / Réponses (Interactivité)

---

## 🖼️ PARTIE 1 : PRÉSENTATION THÉORIQUE (15 MIN)

### [00:00 - 02:30] Slide 1 : Le Protocole & L'Identité
*   **Contenu du Slide :** Logo OVYON animé, Titre complet, Votre Nom, Nom de l'encadreur, Date.
*   **Action :** Tenez-vous droit, mains visibles, regard circulaire sur le jury.
*   **Discours :** "Monsieur le Président, membres du jury, honorables invités. Nous vivons une ère où la maison devient intelligente, mais cette intelligence est souvent étrangère à nos réalités. Aujourd'hui, je vous présente OVYON Control : le premier écosystème domotique conçu en Afrique, pour l'Afrique."
*   **Réaction Jury :** Prise de notes initiale, attention attirée par le logo professionnel.

### [02:30 - 05:00] Slide 2 : La Fracture Numérique (Problématique)
*   **Contenu du Slide :** Graphique montrant le coût des solutions importées vs revenu moyen. Icônes barrées : Wi-Fi instable, Langue Anglaise, Cloud étranger.
*   **Discours :** "Pourquoi la domotique échoue-t-elle chez nous ? Trois barrières : le coût exorbitant, la dépendance à une connexion internet constante, et la barrière de la langue. Nos parents ne devraient pas avoir à apprendre l'anglais pour allumer leur salon."
*   **Réaction Public :** Hochements de tête (votre famille comprend l'utilité concrète).

### [05:00 - 08:00] Slide 3 : La Réponse OVYON (Solution)
*   **Contenu du Slide :** Trois piliers : 1. Souveraineté (Offline SQLite), 2. Accessibilité (Multilingue), 3. Résilience (Low Power MQTT).
*   **Discours :** "OVYON est localisé. Les données restent dans la maison via une base SQLite embarquée. Il parle Fon, Yoruba et Français. Il consomme peu grâce à une optimisation fine du protocole MQTT sur microcontrôleurs ESP32."

### [08:00 - 12:00] Slide 4 : Architecture "Genius" (Technique)
*   **Contenu du Slide :** Schéma technique : Frontend (React/Vite) <-> Broker MQTT (Aedes) <-> Backend (Node.js/SQLite) <-> IA (Gemini API/Python).
*   **Discours :** "Techniquement, nous avons un système hybride. Le Frontend est une PWA ultra-légère. Le Backend assure la persistance réelle. L'IA Aion utilise Gemini 1.5-Flash pour le raisonnement sémantique tout en gardant une réactivité locale par Regex."
*   **Réaction Jury :** Regard attentif sur la complexité du stack technologique.

### [12:00 - 15:00] Slide 5 : Sécurité & Perspectives
*   **Contenu du Slide :** Visualisation de l'API WebAuthn (Biométrie), Appairage Bluetooth/NFC, Vision 2030 (Smart City).
*   **Discours :** "Nous ne faisons pas que de la domotique, nous faisons de la confiance. L'authentification biométrique sécurise chaque accès. OVYON est une plateforme évolutive prête pour l'industrialisation."

---

## 🛠️ PARTIE 2 : PRÉSENTATION PRATIQUE (15 MIN)

### [15:00 - 16:30] L'Effet "Wow" Initial (SplashScreen & Map)
*   **Action :** Ouvrez l'application. L'animation SplashScreen staggered "OVYON" s'exécute. Passez sur le Plan 2D.
*   **Discours :** "Regardez cette interface. Pas de scrollbars, un design épuré. Le plan 2D que vous voyez est généré dynamiquement à partir de ma base de données SQLite."
*   **Geste :** Touchez une lampe sur l'écran. La LED physique sur la maquette s'allume instantanément.

### [16:30 - 20:00] Intelligence Artificielle AION
*   **Action :** Allez sur l'onglet Voice.
*   **Discours :** "Je vais parler à ma maison en langue locale."
*   **Commande 1 :** "Ma lampu salon" (Fon).
*   **Effet :** Waveform premium s'active, couleur orange. La lumière s'allume.
*   **Commande 2 (Complexe) :** "Aion, je vais dormir."
*   **Effet :** Waveform passe au bleu (Aion réfléchit via Gemini). Toutes les lumières s'éteignent, la porte se ferme.
*   **Réaction Jury :** Surprise visible devant la compréhension sémantique de la phrase.

### [20:00 - 23:00] Appairage & Biométrie (La Preuve Technique)
*   **Action :** Allez dans Paramètres -> Connexion Locale. Cliquez sur "Lancer un Appairage".
*   **Effet :** Animation de recherche Bluetooth. Une liste d'appareils apparaît. Sélectionnez-en un.
*   **Discours :** "L'installation d'un nouvel objet ne nécessite aucune compétence technique. C'est du Plug & Play local."
*   **Action :** Activez la Biométrie. Tentez d'ouvrir la porte. Posez votre doigt sur le capteur du téléphone (ou reconnaissance faciale).
*   **Effet :** Toast "Identité confirmée", la porte s'ouvre.

### [23:00 - 27:00] Admin, Logs & Mode Panique
*   **Action :** Montrez les Logs Admin.
*   **Discours :** "Voici le cœur du réacteur. Chaque message MQTT, chaque erreur, chaque accès est tracé ici. C'est l'outil de maintenance."
*   **Action :** Activez le bouton rouge "PANIQUE" sur le Dashboard.
*   **Effet :** Alerte sonore (Feedback Engine), toutes les lumières clignotent, la porte se verrouille.
*   **Discours :** "En cas d'urgence, un seul clic sécurise l'intégralité du foyer."

### [27:00 - 30:00] Analytics & Économie
*   **Action :** Allez sur l'onglet Stats.
*   **Discours :** "Ici, les données sont réelles. Le graphique montre la charge sur 24h. Le système calcule ma facture estimée en FCFA pour éviter les surprises en fin de mois."

---

## ⚠️ GESTION DES INCIDENTS (PLAN DE SECOURS)

| Scénario Critique | Solution "Expert" à dire au jury |
| :--- | :--- |
| **L'IA Gemini est lente** | "Le mode Cloud subit une latence réseau, mais voyez la puissance du mode local (Regex) qui répond instantanément." |
| **Un ESP32 se déconnecte** | "Le système détecte l'absence de 'Heartbeat'. Il va tenter une reconnexion automatique en background, c'est la résilience MQTT." |
| **La démo plante** | "C'est l'intérêt du bouton 'Réinitialiser' que j'ai prévu. Une remise à zéro d'usine pour garantir la stabilité." (Faites le reset avec le sourire). |
| **Biométrie échoue** | "Le navigateur exige une connexion HTTPS sécurisée pour WebAuthn, je vais utiliser le code de secours." |

---

## ❓ QUESTIONS POSSIBLES & RÉPONSES STRATÉGIQUES

**Q1 : Comment gérez-vous la panne de courant, fréquente en Afrique ?**
*   **R :** "Le système est basé sur des ESP32 alimentés en 5V. Il peut tourner sur une simple batterie Powerbank ou un petit panneau solaire, contrairement aux systèmes énergivores sur PC."

**Q2 : Le Fon et le Yoruba sont-ils gérés par Gemini ou en local ?**
*   **R :** "Les deux ! Les mots-clés vitaux sont en local (Regex) pour fonctionner sans internet. Gemini intervient pour la traduction de phrases naturelles plus nuancées."

**Q3 : SQLite est-il suffisant pour une maison entière ?**
*   **R :** "Absolument. Pour des milliers d'événements domotiques, SQLite est bien plus rapide et léger qu'un serveur SQL classique, tout en garantissant l'intégrité des données."

---

## 💡 CHECKLIST DU MATIN DE LA SOUTENANCE
1.  [ ] Charger les Powerbanks des ESP32 à 100%.
2.  [ ] Vérifier l'adresse IP du PC et la mettre dans `wifi_config.h`.
3.  [ ] Tester la clé API Gemini (solde du compte Google Cloud).
4.  [ ] Avoir une vidéo de démo enregistrée sur le bureau (au cas où tout brûle).
5.  [ ] **Sourire :** Vous êtes le créateur, vous êtes l'expert du système.

---
**FIN DU SCRIPT - MENTION TRÈS BIEN VISÉE.**


















    # 🎭 SIMULATION INTÉGRALE : SOUTENANCE OVYON CONTROL (ÉDITION ULTIME)
        **Thème :** Conception d'un écosystème domotique localisé à faible consommation basé sur une application mobile, des objets connectés
    NFC/Bluetooth et une IA vocale embarquée.
        ---
        ## ⏱️ RÉPARTITION STRATÉGIQUE DU TEMPS
    1.  **[00:00 - 15:00] :** Présentation Théorique (La vision et l'architecture)
    2.  **[15:00 - 30:00] :** Démonstration Pratique (Le "Wow Effect" en live)
    3.  **[30:00 - 45:00] :** Questions / Réponses (La défense technique)
        ---
        ## 🖼️ PARTIE 1 : PRÉSENTATION THÉORIQUE (15 MIN)
        ### [00:00 - 03:00] Slide 1 : Ouverture & Cadre Institutionnel
    *   **Contenu du Slide :**
        *   Logo OVYON (Premium, haute résolution)
        *   Identité de l'étudiant, Maître de mémoire, Université.
        *   Image de fond : Une maison africaine moderne stylisée.
    *   **Action :** Démarrez d'une voix posée, regardez chaque membre du jury dans les yeux.
    *   **Discours :** "Monsieur le Président du jury, éminents membres, chers parents et amis. Je me tiens devant vous aujourd'hui pour      
       présenter OVYON Control. Dans un monde où la technologie est devenue omniprésente, une question demeure : comment l'adapter à nos réalités
       locales ? Ce projet n'est pas seulement un gadget technique, c'est une infrastructure de vie pensée pour la souveraineté numérique et     
       l'inclusion linguistique."
    *   **Réaction Jury :** Intérêt marqué pour le terme "souveraineté numérique".
    
    ### [03:00 - 06:00] Slide 2 : La Fracture Domotique (Le Problème)
    *   **Contenu du Slide :**
        *   Iconographie : Dollar ($) barré, Nuage (Cloud) barré, Drapeau anglais barré.
        *   Bullet points : Coût d'importation (x3), Dépendance Internet (80% de latence), Barrière linguistique (Français vs Langues locales)
    *   **Discours :** "Actuellement, installer une domotique européenne en Afrique est un défi : les données partent sur des serveurs        
       étrangers, le coût est prohibitif, et le système ne comprend pas nos grands-parents qui parlent Fon ou Yoruba. Si Internet tombe, la maiso
       devient 'stupide'. OVYON élimine ces dépendances."
    *   **Réaction Jury :** Certains membres notent l'argument sur la dépendance Internet.
    
    ### [06:00 - 09:00] Slide 3 : Architecture "Low Power" & Resiliente
    *   **Contenu du Slide :**
        *   Diagramme de flux : ESP32 (MQTT) <-> Serveur Local <-> SQLite.
        *   Texte : Protocole MQTT (léger), Persistence SQLite (local), Absence de cloud.
    *   **Discours :** "Pour garantir une faible consommation, j'ai choisi le protocole MQTT. Contrairement au HTTP, il envoie des paquets    
       minuscules, idéal pour l'autonomie des batteries. Pour la sécurité, aucune donnée ne sort de la maison : j'utilise une base de données    
       SQLite embarquée sur le serveur local."
    *   **Réaction Jury :** Un membre technique vérifie si SQLite est bien mentionné pour la persistence.
    
    ### [09:00 - 12:00] Slide 4 : L'Intelligence Artificielle AION
    *   **Contenu du Slide :**
        *   Schéma hybride : Moteur de Regex (Local) + Gemini 1.5 (Cloud Intelligent).
        *   Liste des langues : Français, Fon, Yoruba.
    *   **Discours :** "Le cerveau, c'est AION. Une IA vocale hybride. Pour les ordres simples comme 'allume la lumière', le traitement est   
       instantané et offline. Pour les demandes complexes comme 'Aion, je vais dormir', le système fait appel à l'API Gemini pour une compréhensi
       sémantique profonde."
    *   **Réaction Public :** Curiosité sur la partie multilingue.
    
    ### [12:00 - 15:00] Slide 5 : Sécurité & NFC/Bluetooth
    *   **Contenu du Slide :**
        *   Visuel : Une empreinte digitale scannant un smartphone.
        *   Termes clés : WebAuthn API, Pairage NFC rapide, Bluetooth LE.
    *   **Discours :** "Nous sécurisons l'accès physique via la biométrie native du smartphone. L'ajout d'un nouvel équipement se fait par    
       simple contact NFC ou scan Bluetooth, simplifiant l'installation pour l'utilisateur non-technique."
    
    ## 🛠️ PARTIE 2 : DÉMONSTRATION PRATIQUE (15 MIN)
    
    ### [15:00 - 17:00] Lancement & Design Premium
    *   **Action :** Ouvrez l'application sur tablette/écran géant.
    *   **Visuel :** SplashScreen OVYON fluide, chargement des données SQLite.
    *   **Discours :** "Bienvenue dans l'interface OVYON. Notez l'absence de barres de défilement pour une immersion totale. L'esthétique     
       Glassmorphism n'est pas seulement belle, elle est conçue pour la lisibilité."
    *   **Effet :** Montrez le Plan 2D qui se dessine selon les objets en base.
    
    ### [17:00 - 20:00] Le Contrôle Tactile & Feedback Haptique
    *   **Action :** Touchez l'icône de la cuisine sur le plan 2D.
    *   **Effet :** La LED cuisine sur la maquette s'allume. Le son "Toggle" retentit.
    *   **Discours :** "Chaque pression génère un retour sonore et haptique. L'allumage sur la maquette utilise le PWM (Pulse Width Modulation
       pour un effet de fondu luxueux, réduisant aussi le choc électrique sur le composant."
    
    ### [20:00 - 24:00] Démo IA : Le Choc Multilingue
    *   **Action :** Ouvrez l'onglet Voice.
    *   **Commande 1 :** "Ma lampu salon" (Allume le salon en Fon).
    *   **Effet :** Waveform réagit, la lumière s'allume.
    *   **Commande 2 :** "Aion, je vais dormir."
    *   **Effet :** Aion répond : "D'accord, je sécurise la maison et j'éteins tout. Bonne nuit." (Lumières OFF, Porte se ferme).
    *   **Discours :** "Voyez comment l'IA a interprété 'dormir' comme une séquence d'actions sécuritaires sans que je n'aie à les lister."   
    
    ### [24:00 - 27:00] Pairing & Biométrie
    *   **Action :** Allez dans Paramètres -> Lancer Appairage.
    *   **Effet :** Liste d'appareils Bluetooth trouvés. Sélectionnez-en un.
    *   **Action :** Activez la biométrie dans les réglages. Tentez d'ouvrir la porte principale.
    *   **Visuel :** Le système demande l'empreinte. Validez sur le smartphone.
    *   **Discours :** "Sans mon empreinte, personne ne peut ouvrir cette porte, même via l'application. C'est la sécurité bancaire appliquée 
       la maison."
    
    ### [27:00 - 30:00] Console Admin & Panic Mode
    *   **Action :** Affichez les logs admin (Admin Console).
    *   **Action :** Cliquez sur le bouton "PANIQUE" rouge.
    *   **Effet :** Alarme sonore, stroboscope sur la maquette, verrouillage total.
    *   **Discours :** "En situation de stress, l'utilisateur n'a pas le temps de chercher. Ce mode force le système dans son état le plus    
       sécurisé."
    
    ## ⚠️ GESTION DES ACCIDENTS (LES SOLUTIONS DE L'EXPERT)
    
    | Accident Possible | Discours de rattrapage | Solution Technique |
    | :--- | :--- | :--- |
    | **Pas de Wi-Fi** | "Le système est conçu pour être résilient." | Basculez sur le point d'accès mobile de secours. |
    | **Gemini hors-ligne** | "L'intelligence locale prend le relais." | Utilisez les commandes Regex directes (Allume salon). |
    | **La porte bloque** | "Le système détecte une résistance mécanique." | Utilisez le bouton 'STOP' ou forcez la position via le slider. | 
    | **SQLite Erreur** | "Une corruption mineure, utilisons le Reset." | Bouton 'Réinitialiser' dans Paramètres (Factory Reset). |
    | **Public trop bruyant** | "Aion filtre les bruits ambiants..." | Rapprochez le micro ou tapez la commande au clavier. |
   
    ## ❓ QUESTIONS / RÉPONSES : LA DÉFENSE (10 MIN)
   
    **Q1 : Pourquoi ne pas avoir utilisé de serveurs distants ?**
    *   **Réponse :** "Pour trois raisons : 1. La vie privée, car ce qui se passe chez vous reste chez vous. 2. La latence, car 200ms de délai
       local valent mieux que 3 secondes via un serveur aux USA. 3. La continuité de service en zone rurale."
   
    **Q2 : Le coût de revient de votre solution ?**
    *   **Réponse :** "Un nœud OVYON coûte moins de 10 000 FCFA à produire, contre 45 000 FCFA pour une solution importée de qualité
       équivalente."
   
    **Q3 : Comment le système gère-t-il les conflits de règles ?**
    *   **Réponse :** "Le backend priorise toujours les actions humaines sur les automatisations. Si je force l'extinction, le capteur ne pour
       pas rallumer immédiatement sans mon accord."
   
    **Q4 : Votre projet est-il scalable ?**
    *   **Réponse :** "Oui, grâce au protocole MQTT et à l'ID unique des devices, nous pouvons gérer jusqu'à 255 nœuds sur un simple réseau   
       local domestique."
   
    ## 🏁 DISCOURS DE CLÔTURE (LE FINAL)
    *   **Action :** Éteignez l'appli, regardez votre famille, puis le jury.
    *   **Discours :** "OVYON Control n'est que le début d'une vision plus large pour les Smart Cities africaines. En maîtrisant le hardware e
       l'IA, nous ne sommes plus de simples consommateurs, mais des créateurs de solutions. Merci de votre attention, j'attends avec impatience v
       critiques et suggestions."
   
    ## 📋 CHECKLIST TECHNIQUE (AVANT DE MONTER SUR SCÈNE)
    *   **Hardware :** Vérifier que les servos ne sont pas entravés.
    *   **Logiciel :** Vider les logs de `ovyon_control.db` pour une démo propre.
    *   **Réseau :** Désactiver les mises à jour Windows/Mac pour garder toute la bande passante.
    *   **Clé API :** Vérifier que le quota Gemini est suffisant.
    *   **Audio :** Tester le volume de sortie pour que le jury entende Aion répondre.
   
    **STATUT DU DOCUMENT : PRÊT POUR LA SOUTENANCE.**