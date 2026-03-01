# SCRIPT ORAL PUR - SOUTENANCE OVYON CONTROL (45 MINUTES, MOT A MOT)

## Instructions d usage
- Lis ce texte tel quel.
- Parle lentement, avec pauses courtes entre blocs.
- Si incident technique, bascule vers la section "Pont de secours" de chaque partie.

---

## [00:00 - 02:00] Ouverture officielle

Monsieur le President du jury,
Mesdames et Messieurs les membres du jury,
Mesdames et Messieurs,

Je vous remercie pour votre presence.

Le travail que je presente aujourd hui s intitule OVYON Control.

OVYON Control est un ecosysteme domotique local, resilient, et adapte aux contraintes reelles de notre contexte:
le cout,
la stabilite reseau,
l accessibilite linguistique,
et la securite d usage.

L idee directrice est simple.
Une maison intelligente ne doit pas cesser d etre intelligente quand internet devient instable.

C est pourquoi OVYON a ete pense comme une architecture locale d abord,
avec intelligence embarquee,
connectivite legere,
et controle utilisateur prioritaire.

---

## [02:00 - 05:00] Contexte et probleme

Aujourd hui, la plupart des solutions domotiques disponibles sur le marche sont importees.

Elles posent souvent quatre problemes majeurs.

Premier probleme: le prix d entree.
Le cout d acquisition initial est eleve, et le remplacement des modules est aussi couteux.

Deuxieme probleme: la dependance cloud.
Quand la connexion internet est faible ou coupee, une partie du systeme devient inutilisable.

Troisieme probleme: la langue et l ergonomie.
Beaucoup de solutions ne sont pas pensees pour des commandes locales naturelles,
et encore moins pour des langues africaines.

Quatrieme probleme: la maintenabilite.
Les solutions fermees rendent le diagnostic, la reparation et l evolution difficiles.

Face a cela, mon objectif a ete de construire un systeme:
- techniquement propre,
- economiquement plus accessible,
- exploitable localement,
- et defendable en conditions reelles.

---

## [05:00 - 09:00] Vision et proposition de valeur

OVYON repose sur trois piliers.

Pilier numero un: la souverainete locale.
Les donnees critiques et les etats des equipements sont conserves localement.
Le coeur ne depend pas d un service cloud distant.

Pilier numero deux: l accessibilite d usage.
Le systeme accepte des commandes simples, directes, et une logique vocale progressive.

Pilier numero trois: la robustesse terrain.
Le protocole MQTT est utilise pour sa legerete,
les noeuds ESP32 sont autonomes,
et la reconnection est geree automatiquement.

En resume,
OVYON ne vise pas uniquement l effet demonstration.
OVYON vise l usage quotidien dans un environnement contraint.

---

## [09:00 - 14:00] Architecture technique

Je presente maintenant l architecture.

Le frontend est developpe en React et TypeScript.
Il fournit le tableau de bord,
les commandes,
les pages de parametrage,
les journaux d administration,
et les vues analytiques.

Le backend est developpe en Node.js et TypeScript.
Il expose les services,
gere l orchestration,
la persistance,
et la couche de simulation/administration.

Le broker MQTT est Aedes.
Il gere les publications et abonnements entre application et noeuds materiels.

La persistance est assuree par SQLite,
choisi pour sa simplicite de deploiement local,
sa faible empreinte,
et sa suffisance pour le volume domotique vise.

Cote edge,
la maquette utilise cinq noeuds ESP32 specialises:
- un noeud Lights,
- un noeud Door,
- un noeud Window,
- un noeud Plugs,
- un noeud Environment.

Cote intelligence vocale,
les scripts Python Aion permettent:
- un mode local rapide,
- et un mode semantique enrichi selon la disponibilite reseau.

Cette architecture distribuee est volontaire.
Elle ameliore la tolerance aux pannes,
facilite les tests,
et permet l evolution composant par composant.

---

## [14:00 - 15:00] Transition vers demonstration

Je vais maintenant passer a la demonstration pratique.

L objectif de la demonstration est de prouver quatre points:
- la boucle commande -> action -> retour d etat,
- la capacite vocale,
- la securite operationnelle,
- et la lisibilite du pilotage en temps reel.

---

## [15:00 - 18:00] Demo 1 - Controle lumineux

Je commence par l eclairage.

Depuis l interface,
je commande l allumage de la zone salon.

Vous observez la reaction de la maquette.

Le chemin technique est le suivant:
interface utilisateur,
publication MQTT,
execution par le noeud Lights,
publication du status,
actualisation de l interface.

Je repete l operation sur une autre zone,
puis je teste l extinction.

Maintenant je montre la variation d intensite.

La variation est gerable en pourcentage,
avec conversion PWM sur le noeud Lights.

Cela valide la granularite de commande,
pas seulement un on/off binaire.

Pont de secours en cas d incident:
Si une zone ne repond pas,
je montre immediatement les logs,
je relance la commande,
et je bascule sur une autre zone pour conserver la dynamique de demonstration.

---

## [18:00 - 21:00] Demo 2 - Door et Window

Je passe maintenant aux actionneurs mecaniques.

Premiere action: ouverture de la porte.

Le servo du noeud Door bouge,
et le status publie confirme l etat ouvert.

Deuxieme action: fermeture de la porte.

Ensuite,
je teste la fenetre avec une position intermediaire,
puis une position maximale.

Ici,
l interet technique est la commande proportionnelle.

Ce n est pas seulement ouvrir ou fermer.

C est un controle progressif,
qui peut ensuite servir a de vraies regles de confort et d economie.

Pont de secours:
Si un servo bloque,
je verbalise que la logique software reste validee,
et je montre le changement de status attendu dans les logs.

---

## [21:00 - 24:00] Demo 3 - Prises intelligentes

Je passe aux prises.

J active la prise 1,
puis la prise 2.

Le noeud Plugs renvoie:
- l etat on/off,
- et une consommation simulee.

L interet pedagogique est clair:
le systeme ne se contente pas d executer,
il observe et remonte une mesure exploitable.

Je coupe ensuite les deux prises,
pour verifier le retour a zero.

Pont de secours:
Si la valeur de consommation n apparait pas,
je montre que l etat de commutation est bien confirme,
et je rappelle que la consommation actuelle est volontairement simulee au niveau firmware.

---

## [24:00 - 27:00] Demo 4 - Environnement

Je passe au noeud Environment.

Ce noeud publie temperature et humidite periodiquement.

Je montre la reception des donnees,
et leur affichage cote interface.

Cette brique est essentielle,
car elle alimente les futures automatisations contextuelles.

Par exemple:
fermeture fenetre automatique,
alerte de confort,
ou recommandations energetiques.

Pont de secours:
Si la mesure n arrive pas,
je bascule sur la derniere valeur retenue et je montre la logique de polling periodique dans le design.

---

## [27:00 - 30:00] Demo 5 - Voix et intelligence

Je passe a la couche vocale.

Je lance une commande simple,
pour montrer le mode rapide.

Puis je lance une commande plus naturelle,
pour montrer la couche d interpretation contextuelle.

Le point important a retenir est la strategie hybride:
- commandes essentielles en logique locale,
- enrichissement semantique quand disponible.

Ainsi,
le systeme degrade proprement sans perdre les fonctions vitales.

Pont de secours:
Si la latence cloud est forte,
je l annonce explicitement,
et je demonstre la continuit e via les commandes locales immediates.

---

## [30:00 - 33:00] Demo 6 - Securite et administration

Je montre maintenant la console admin.

Chaque action significative est journalisee.

Cette tracabilite est utile pour:
- audit,
- diagnostic,
- maintenance,
- et exploitation.

Je declenche ensuite le mode panique.

Le mode panique force un etat securise global,
avec priorite absolue.

Ce mecanisme est prevu pour les situations d urgence,
ou la simplicite d action prime.

---

## [33:00 - 35:00] Fin demo et recap

Je recapitul e les preuves observees.

Nous avons valide:
- commande temps reel,
- retour d etat bidirectionnel,
- actionneurs et capteurs,
- supervision,
- et mecanisme de securite.

Je passe maintenant a la defense technique en questions/reponses.

---

## [35:00 - 44:00] Questions/Reponses (reponses mot a mot)

### Question probable 1: Pourquoi MQTT?
Reponse:
"J ai choisi MQTT pour sa legerete et son modele pub/sub adapte a l IoT. Le cout reseau est faible, la latence est basse, et la reconnection est simple a gerer sur ESP32."

### Question probable 2: Pourquoi SQLite?
Reponse:
"SQLite est coherent avec un scenario local mono-instance. Il est simple a deployer, robuste, et suffisant pour le volume d evenements d une maquette domotique complete."

### Question probable 3: Comment gerez-vous les pannes internet?
Reponse:
"Le coeur fonctionnel repose localement. Les commandes essentielles peuvent rester operationnelles sans cloud. La couche semantique est une valeur ajoutee, pas un point unique de defaillance."

### Question probable 4: Quelles limites actuelles?
Reponse:
"La principale limite est la dependance reseau pour certaines fonctions d IA contextuelle. Elle est mitigee par la logique locale et un plan de fallback clair."

### Question probable 5: Comment evoluer vers une vraie production?
Reponse:
"Je versionnerais les contrats MQTT, renforcerais la securite transport, industrialiserais le provisionnement des noeuds, et introduirais une couche de supervision centralisee multi-sites."

### Question probable 6: Et la securite utilisateur?
Reponse:
"Les actions sensibles peuvent etre protegees par verification locale, et surtout tout est journalise. L utilisateur conserve la priorite de commande sur les automatismes."

### Question probable 7: Que se passe-t-il en conflit d ordres?
Reponse:
"La commande humaine explicite est prioritaire. Les regles automatiques ne doivent pas annuler une action volontaire immediate."

### Question probable 8: Cout et accessibilite?
Reponse:
"La solution est dimensionnee pour reduire le cout d entree en utilisant des composants disponibles localement, sans exiger une infrastructure serveur lourde."

### Question probable 9: Pourquoi ce projet est pertinent localement?
Reponse:
"Parce qu il repond a des contraintes locales reelles: connectivite fluctuante, besoin de maintenance simple, et besoin de solutions adaptables plutot que verrouillees."

---

## [44:00 - 45:00] Cloture finale

Pour conclure,
OVYON Control demontre qu il est possible de construire une domotique utile,
robuste,
et adaptee a notre contexte,
en combinant architecture locale,
edge computing,
et intelligence progressive.

Ce projet est deja operationnel en maquette complete,
avec une base claire pour industrialisation.

Je vous remercie pour votre attention,
et je suis disponible pour toute question complementaire.

---

## Bloc secours a memoriser (10 secondes)
"Incident ponctuel de demonstration, je vous montre immediatement la preuve par logs et je bascule sur le scenario alternatif prevu."
