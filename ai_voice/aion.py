import os
import json
import time
import logging
import re
import paho.mqtt.client as mqtt
import google.generativeai as genai
from dotenv import load_dotenv

/**
 * AION GENIUS EDITION v1.0
 * Assistant vocal intelligent localisé pour le marché africain.
 * Gère le multilinguisme (Français, Fon, Yoruba) et l'intelligence contextuelle.
 */

load_dotenv()

# Formatage du logger pour une console propre et professionnelle
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] AION_GENIUS: %(message)s'
)
logger = logging.getLogger("AionGenius")

# CONFIGURATION DE L'IA GEMINI (Google)
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    # On utilise gemini-1.5-flash pour une réponse vocale ultra-rapide
    model = genai.GenerativeModel('gemini-1.5-flash')
    logger.info("Cerveau Gemini 1.5-Flash activé.")
else:
    model = None
    logger.warning("Clé API Gemini manquante. Mode local uniquement.")

class AionGeniusBridge:
    def __init__(self):
        # Création du client MQTT pour parler aux objets connectés
        self.mqtt = mqtt.Client(client_id="AION_SYSTEM_HUB")
        self.mqtt.username_pw_set("ovyon", "demo2024")
        self.mqtt.on_connect = self.on_connect
        
        # MOTEUR DE RECONNAISSANCE LOCAL (Ultra-rapide, fonctionne sans Internet)
        # Utilise des REGEX (Expressions Régulières) pour détecter les ordres simples.
        self.local_dictionary = {
            'light_on': [r'allume', r'ma lampu', r'tan ina'],
            'light_off': [r'éteins', r'ku lampu', r'pa ina'],
            'door_open': [r'ouvre la porte', r'hùn ona', r'open the door'],
            'door_close': [r'ferme la porte', r'tì ona', r'close the door'],
            'all_off': [r'éteins tout', r'ku lampu bi', r'pa gbogbo ina'],
            'status_check': [r'état', r'statut', r'house status']
        }

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info("Aion connecté au Broker MQTT avec succès.")
            # Écoute les statuts pour avoir le contexte de la maison
            self.mqtt.subscribe("ovyon/status/#")
        else:
            logger.error(f"Erreur de connexion MQTT: {rc}")

    /**
     * APPEL AU CERVEAU GEMINI
     * Utilisé pour les phrases complexes (ex: "Je vais me coucher")
     */
    def call_gemini_brain(self, text):
        if not model: return None
        
        # On définit le rôle et les équipements pour que l'IA ne délire pas
        prompt = f"""
        Rôle : Aion, assistant domotique africain haut de gamme.
        Ton : Professionnel, chaleureux, efficace.
        Langues : Français, Fon, Yoruba.
        
        Équipements contrôlables :
        - lumières : salon, cuisine, chambre
        - porte : principale (action: open/close)
        - fenêtre : salon
        - prises : 1, 2
        - système : tout éteindre
        
        Entrée utilisateur : "{text}"
        
        Tâche : 
        1. Analyser si c'est un ordre ou une question.
        2. Générer les commandes MQTT appropriées.
        3. Fournir une réponse vocale naturelle.
        
        Format de sortie (JSON UNIQUEMENT) :
        {{
            "commands": [
                {{"topic": "ovyon/control/[type]/[id]/power", "payload": "on|off"}},
                {{"topic": "ovyon/control/door/main/action", "payload": "open|close"}}
            ],
            "language": "fr|fon|yor",
            "response": "Ta phrase de réponse à l'utilisateur"
        }}
        """
        try:
            start = time.time()
            response = model.generate_content(prompt)
            duration = time.time() - start
            logger.info(f"Raisonnement IA terminé en {duration:.2f}s")
            
            # Extraction propre du JSON dans la réponse texte
            match = re.search(r'\{{.*\}}', response.text, re.DOTALL)
            if match:
                return json.loads(match.group())
            return None
        except Exception as e:
            logger.error(f"Erreur Cerveau Gemini : {e}")
            return None

    /**
     * PIPELINE DE TRAITEMENT
     * 1. On teste les mots-clés locaux (rapide)
     * 2. Si échec, on demande à Gemini (intelligent)
     */
    def process_voice_command(self, text):
        logger.info(f"Entrée vocale reçue : '{text}'")
        text_lower = text.lower()
        
        # 1. Match Rapide (Mode Local / Offline)
        for intent, patterns in self.local_dictionary.items():
            for p in patterns:
                if re.search(p, text_lower):
                    logger.info(f"Détection locale : {intent}")
                    self.execute_quick_action(intent, text_lower)
                    self.broadcast_to_ui(text, "D'accord, c'est fait.", "success")
                    return

        # 2. Match Intelligent (Mode Cloud Gemini)
        logger.info("Escalade vers Gemini pour analyse complexe...")
        ai_logic = self.call_gemini_brain(text)
        
        if ai_logic and "commands" in ai_logic:
            for cmd in ai_logic["commands"]:
                self.mqtt.publish(cmd["topic"], cmd["payload"])
                logger.info(f"Action IA : {cmd['topic']} -> {cmd['payload']}")
            
            self.broadcast_to_ui(text, ai_logic["response"], "success")
        else:
            self.broadcast_to_ui(text, "Je n'ai pas pu traiter cette demande. Réessayez ?", "error")

    def execute_quick_action(self, intent, original_text):
        """Mappe les ordres simples vers les topics MQTT correspondants."""
        target = "salon"
        if 'cuisine' in original_text: target = "cuisine"
        elif 'chambre' in original_text: target = "chambre"

        if intent == 'light_on':
            self.mqtt.publish(f"ovyon/control/lights/{target}/power", "on")
        elif intent == 'light_off':
            self.mqtt.publish(f"ovyon/control/lights/{target}/power", "off")
        elif intent == 'all_off':
            self.mqtt.publish("ovyon/control/all/power", "off")
        elif intent == 'door_open':
            self.mqtt.publish("ovyon/control/door/main/action", "open")
        elif intent == 'door_close':
            self.mqtt.publish("ovyon/control/door/main/action", "close")

    def broadcast_to_ui(self, text, response, status):
        """Envoie le résultat au Dashboard pour l'affichage en temps réel."""
        payload = {
            "text": text,
            "response": response,
            "status": status,
            "timestamp": time.time()
        }
        self.mqtt.publish("aion/transcript", json.dumps(payload))

    def run(self):
        """Boucle principale d'écoute."""
        try:
            self.mqtt.connect("localhost", 1883, 60)
            self.mqtt.loop_start()
            print("\n" + "="*40)
            print("  AION GENIUS EDITION EST EN VEILLE")
            print("="*40 + "\n")
            
            while True:
                # Simulation de l'entrée vocale via le clavier pour la démo
                user_input = input("🎤 AION (Entrez votre commande) > ")
                if user_input.lower() in ['exit', 'quit']: break
                if not user_input.strip(): continue
                self.process_voice_command(user_input)
                
        except KeyboardInterrupt:
            pass
        finally:
            self.mqtt.loop_stop()

if __name__ == "__main__":
    AionGeniusBridge().run()