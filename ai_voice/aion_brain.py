import os
import json
import time
import logging
import paho.mqtt.client as mqtt
import google.generativeai as genai
from dotenv import load_dotenv

/**
 * CERVEAU AION : LE STRATÈGE (PROACTIVE BRAIN)
 * Analyse autonome de l'état de la maison via Gemini AI.
 * Fournit des suggestions proactives naturelles à haute valeur ajoutée.
 */

load_dotenv()

# Configuration des logs pour le suivi en temps réel
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] AION_BRAIN: %(message)s'
)
logger = logging.getLogger("AionBrain")

# Initialisation de l'API Google Gemini
API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    # Utilisation du modèle 1.5-Flash pour la rapidité et l'efficacité
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None

class AionProactiveBrain:
    def __init__(self):
        # Connexion au BUS de communication MQTT
        self.mqtt = mqtt.Client(client_id="AION_BRAIN_STRATEGIST")
        self.mqtt.username_pw_set("ovyon", "demo2024")
        
        # Mémoire interne de l'état de la maison
        self.device_memory = {}
        self.last_deep_analysis = 0
        # Intervalle d'analyse approfondie : 10 minutes (Optimisation batterie/serveur)
        self.deep_analysis_interval = 600 

    def on_message(self, client, userdata, msg):
        """Mise à jour de la mémoire interne à chaque message reçu."""
        try:
            topic = msg.topic
            payload = json.loads(msg.payload.decode())
            # On stocke la dernière donnée connue avec un timestamp
            self.device_memory[topic] = {
                "data": payload,
                "timestamp": time.time()
            }
        except: pass

    def perform_strategic_analysis(self):
        """
        Analyse stratégique : Envoie l'état complet de la maison à Gemini
        pour détecter des anomalies ou opportunités d'optimisation.
        """
        if not model or not self.device_memory: return
        
        logger.info("Cerveau Aion : Lancement de l'audit stratégique...")
        
        # Préparation du "Snapshot" (Photo instantanée de l'état)
        snapshot = []
        for topic, info in self.device_memory.items():
            name = topic.split('/')[-1]
            snapshot.append(f"{name}: {info['data']}")

        # Prompt d'ingénierie pour Gemini
        prompt = f"""
        Analyse cet état de Maison Intelligente Africaine et fournis UNE suggestion proactive intelligente.
        État actuel : {", ".join(snapshot)}
        Heure : {time.strftime('%H:%M')}
        
        Priorités :
        1. Sécurité (est-il tard avec une porte ouverte ?)
        2. Économie d'énergie (consommation élevée ou lumières allumées inutilement ?)
        3. Confort (température/humidité inhabituelle)
        
        Réponds en Français, sur un ton professionnel mais bienveillant.
        Format de sortie JSON UNIQUEMENT : {{ "text": "...", "urgency": "low|medium|high", "category": "security|energy|comfort" }}
        """
        
        try:
            response = model.generate_content(prompt)
            import re
            match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if match:
                result = json.loads(match.group())
                # Publication de la suggestion sur le réseau pour affichage Dashboard
                self.mqtt.publish("aion/proactive", json.dumps(result))
                logger.info(f"Suggestion proactive publiée : {result['text']}")
        except Exception as e:
            logger.error(f"Erreur de raisonnement du Cerveau : {e}")

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info("Stratège connecté au réseau.")
            # Écoute TOUS les statuts pour maintenir sa mémoire à jour
            self.mqtt.subscribe("ovyon/status/#")
        else:
            logger.error(f"Échec connexion stratège : {rc}")

    def run(self):
        self.mqtt.on_connect = self.on_connect
        self.mqtt.on_message = self.on_message
        self.mqtt.connect("localhost", 1883, 60)
        self.mqtt.loop_start()
        
        logger.info("CERVEAU STRATÈGE ACTIF - SURVEILLANCE DES FLUX EN COURS...")
        try:
            while True:
                now = time.time()
                # Vérification périodique
                if now - self.last_deep_analysis > self.deep_analysis_interval:
                    self.perform_strategic_analysis()
                    self.last_deep_analysis = now
                time.sleep(10)
        except KeyboardInterrupt:
            self.mqtt.loop_stop()

if __name__ == "__main__":
    AionProactiveBrain().run()
