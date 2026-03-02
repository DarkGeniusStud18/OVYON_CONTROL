import json
import logging
import os
import re
import time

import paho.mqtt.client as mqtt
from dotenv import load_dotenv
from openai import OpenAI

"""
CERVEAU AION : LE STRATEGE (PROACTIVE BRAIN)
Analyse autonome de l'etat de la maison.
Fournit des suggestions proactives a haute valeur ajoutee.
"""

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] AION_BRAIN: %(message)s",
)
logger = logging.getLogger("AionBrain")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openai/gpt-oss-120b")

if OPENROUTER_API_KEY:
    client = OpenAI(base_url=OPENROUTER_BASE_URL, api_key=OPENROUTER_API_KEY)
else:
    client = None


def extract_json_block(text: str):
    if not text:
        return None

    fence_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fence_match:
        try:
            return json.loads(fence_match.group(1))
        except json.JSONDecodeError:
            pass

    brace_match = re.search(r"\{.*\}", text, re.DOTALL)
    if brace_match:
        try:
            return json.loads(brace_match.group(0))
        except json.JSONDecodeError:
            return None
    return None


class AionProactiveBrain:
    def __init__(self):
        self.mqtt = mqtt.Client(client_id="AION_BRAIN_STRATEGIST")
        self.mqtt.username_pw_set("ovyon", "demo2024")
        self.device_memory = {}
        self.last_deep_analysis = 0
        self.deep_analysis_interval = 600

    def on_message(self, client_instance, userdata, msg):
        try:
            topic = msg.topic
            payload = json.loads(msg.payload.decode())
            self.device_memory[topic] = {
                "data": payload,
                "timestamp": time.time(),
            }
        except Exception:
            pass

    def perform_strategic_analysis(self):
        if not client or not self.device_memory:
            return

        logger.info("Cerveau Aion : lancement de l'audit strategique...")
        snapshot = []
        for topic, info in self.device_memory.items():
            name = topic.split("/")[-1]
            snapshot.append(f"{name}: {info['data']}")

        prompt = f"""
Analyse cet etat de Maison Intelligente Africaine et fournis UNE suggestion proactive intelligente.
Etat actuel: {", ".join(snapshot)}
Heure: {time.strftime('%H:%M')}

Priorites:
1. Securite
2. Economie d'energie
3. Confort

Reponds en francais.
Retourne UNIQUEMENT un JSON valide:
{{ "text": "...", "urgency": "low|medium|high", "category": "security|energy|comfort" }}
"""

        try:
            response = client.chat.completions.create(
                model=OPENROUTER_MODEL,
                temperature=0.2,
                messages=[{"role": "user", "content": prompt}],
            )
            content = response.choices[0].message.content or ""
            result = extract_json_block(content)
            if result:
                self.mqtt.publish("aion/proactive", json.dumps(result))
                logger.info("Suggestion proactive publiee : %s", result.get("text", "N/A"))
        except Exception as error:
            logger.error("Erreur de raisonnement du cerveau : %s", error)

    def on_connect(self, client_instance, userdata, flags, rc):
        if rc == 0:
            logger.info("Stratege connecte au reseau.")
            self.mqtt.subscribe("ovyon/status/#")
        else:
            logger.error("Echec connexion stratege : %s", rc)

    def run(self):
        self.mqtt.on_connect = self.on_connect
        self.mqtt.on_message = self.on_message
        self.mqtt.connect("localhost", 1883, 60)
        self.mqtt.loop_start()

        logger.info("CERVEAU STRATEGE ACTIF - SURVEILLANCE EN COURS...")
        try:
            while True:
                now = time.time()
                if now - self.last_deep_analysis > self.deep_analysis_interval:
                    self.perform_strategic_analysis()
                    self.last_deep_analysis = now
                time.sleep(10)
        except KeyboardInterrupt:
            self.mqtt.loop_stop()


if __name__ == "__main__":
    AionProactiveBrain().run()
