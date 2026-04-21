import json
import logging
import os
import re
import time

import paho.mqtt.client as mqtt
from dotenv import load_dotenv
from openai import OpenAI

"""
AION GENIUS EDITION v1.0
Assistant vocal intelligent localise pour le marche africain.
Gere le multilinguisme (Francais, Fon, Yoruba) et l'intelligence contextuelle.
"""

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] AION_GENIUS: %(message)s",
)
logger = logging.getLogger("AionGenius")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openai/gpt-oss-120b")

if OPENROUTER_API_KEY:
    client = OpenAI(base_url=OPENROUTER_BASE_URL, api_key=OPENROUTER_API_KEY)
    logger.info("Cerveau OpenRouter active (%s).", OPENROUTER_MODEL)
else:
    client = None
    logger.warning("Cle OPENROUTER_API_KEY manquante. Mode local uniquement.")


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


class AionGeniusBridge:
    def __init__(self):
        self.mqtt = mqtt.Client(client_id="AION_SYSTEM_HUB")
        self.mqtt.username_pw_set("ovyon", "demo2024")
        self.mqtt.on_connect = self.on_connect

        self.local_dictionary = {
            "light_on": [r"allume", r"ma lampu", r"tan ina"],
            "light_off": [r"eteins", r"ku lampu", r"pa ina"],
            "door_open": [r"ouvre la porte", r"hun ona", r"open the door"],
            "door_close": [r"ferme la porte", r"ti ona", r"close the door"],
            "all_off": [r"eteins tout", r"ku lampu bi", r"pa gbogbo ina"],
            "status_check": [r"etat", r"statut", r"house status"],
        }

    def on_connect(self, client_instance, userdata, flags, rc):
        if rc == 0:
            logger.info("Aion connecte au broker MQTT avec succes.")
            self.mqtt.subscribe("ovyon/status/#")
        else:
            logger.error("Erreur de connexion MQTT: %s", rc)

    def call_llm_brain(self, text: str):
        if not client:
            return None

        prompt = f"""
Role: Aion, assistant domotique africain haut de gamme.
Ton: Professionnel, chaleureux, efficace.
Langues: Francais, Fon, Yoruba, English.

Equipements controlables:
- lumieres: salon, cuisine, chambre
- porte: principale (action: open/close)
- fenetre: salon
- prises: 1, 2
- systeme: tout eteindre

Entree utilisateur: "{text}"

Tache:
1. Analyser si c'est un ordre ou une question.
2. Generer les commandes MQTT appropriees.
3. Fournir une reponse vocale naturelle.

Retourne UNIQUEMENT un JSON valide au format:
{{
  "commands": [
    {{"topic": "ovyon/control/[type]/[id]/power", "payload": "on|off"}},
    {{"topic": "ovyon/control/door/main/action", "payload": "open|close"}}
  ],
  "language": "fr|fon|yor|en",
  "response": "Ta phrase de reponse a l'utilisateur"
}}
"""

        try:
            start = time.time()
            response = client.chat.completions.create(
                model=OPENROUTER_MODEL,
                temperature=0.2,
                messages=[{"role": "user", "content": prompt}],
            )
            duration = time.time() - start
            logger.info("Raisonnement IA termine en %.2fs", duration)

            content = response.choices[0].message.content or ""
            return extract_json_block(content)
        except Exception as error:
            logger.error("Erreur cerveau OpenRouter: %s", error)
            return None

    def process_voice_command(self, text: str):
        logger.info("Entree vocale recue: '%s'", text)
        text_lower = text.lower()

        for intent, patterns in self.local_dictionary.items():
            for pattern in patterns:
                if re.search(pattern, text_lower):
                    logger.info("Detection locale: %s", intent)
                    self.execute_quick_action(intent, text_lower)
                    self.broadcast_to_ui(text, "D'accord, c'est fait.", "success")
                    return

        logger.info("Escalade vers OpenRouter pour analyse complexe...")
        ai_logic = self.call_llm_brain(text)

        if ai_logic and "commands" in ai_logic:
            for command in ai_logic["commands"]:
                self.mqtt.publish(command["topic"], command["payload"])
                logger.info("Action IA: %s -> %s", command["topic"], command["payload"])

            self.broadcast_to_ui(text, ai_logic.get("response", "Commande executee."), "success")
        else:
            self.broadcast_to_ui(text, "Je n'ai pas pu traiter cette demande. Reessayez ?", "error")

    def execute_quick_action(self, intent: str, original_text: str):
        target = "salon"
        if "cuisine" in original_text:
            target = "cuisine"
        elif "chambre" in original_text:
            target = "chambre"

        if intent == "light_on":
            self.mqtt.publish(f"ovyon/control/lights/{target}/power", "on")
        elif intent == "light_off":
            self.mqtt.publish(f"ovyon/control/lights/{target}/power", "off")
        elif intent == "all_off":
            self.mqtt.publish("ovyon/control/all/power", "off")
        elif intent == "door_open":
            self.mqtt.publish("ovyon/control/door/main/action", "open")
        elif intent == "door_close":
            self.mqtt.publish("ovyon/control/door/main/action", "close")

    def broadcast_to_ui(self, text: str, response: str, status: str):
        payload = {
            "text": text,
            "response": response,
            "status": status,
            "timestamp": time.time(),
        }
        self.mqtt.publish("aion/transcript", json.dumps(payload))

    def run(self):
        try:
            self.mqtt.connect("localhost", 1883, 60)
            self.mqtt.loop_start()
            print("\n" + "=" * 40)
            print("  AION GENIUS EDITION EST EN VEILLE")
            print("=" * 40 + "\n")

            while True:
                user_input = input("AION (Entrez votre commande) > ")
                if user_input.lower() in ["exit", "quit"]:
                    break
                if not user_input.strip():
                    continue
                self.process_voice_command(user_input)
        except KeyboardInterrupt:
            pass
        finally:
            self.mqtt.loop_stop()


if __name__ == "__main__":
    AionGeniusBridge().run()
