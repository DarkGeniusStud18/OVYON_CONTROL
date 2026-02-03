import os
import json
import time
import logging
import paho.mqtt.client as mqtt
import google.generativeai as genai
from dotenv import load_dotenv

/**
 * AION BRAIN: THE STRATEGIC OVERSEER
 * Autonomous analysis of the house state using Gemini AI.
 * Provides high-value, natural language proactive suggestions.
 */

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] AION_BRAIN: %(message)s'
)
logger = logging.getLogger("AionBrain")

API_KEY = os.getenv("GOOGLE_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    model = None

class AionProactiveBrain:
    def __init__(self):
        self.mqtt = mqtt.Client(client_id="AION_BRAIN_STRATEGIST")
        self.mqtt.username_pw_set("ovyon", "demo2024")
        self.device_memory = {}
        self.last_deep_analysis = 0
        self.deep_analysis_interval = 600 # 10 minutes for battery/server optimization

    def on_message(self, client, userdata, msg):
        try:
            topic = msg.topic
            payload = json.loads(msg.payload.decode())
            # Maintain a real-time memory of the house
            self.device_memory[topic] = {
                "data": payload,
                "timestamp": time.time()
            }
        except: pass

    def perform_strategic_analysis(self):
        if not model or not self.device_memory: return
        
        logger.info("Aion Brain: Performing Strategic House Audit...")
        
        # Prepare a concise house snapshot for Gemini
        snapshot = []
        for topic, info in self.device_memory.items():
            name = topic.split('/')[-1]
            snapshot.append(f"{name}: {info['data']}")

        prompt = f"""
        Analyze this African Smart Home status and provide ONE intelligent proactive tip.
        Current Snapshot: {", ".join(snapshot)}
        Time: {time.strftime('%H:%M')}
        
        Prioritize:
        1. Security (is it late and the door is open?)
        2. Power Saving (high consumption or lights on in unused rooms?)
        3. Comfort (unusual temperature/humidity)
        
        Answer in French, professional yet friendly.
        Output valid JSON only: {{ "text": "...", "urgency": "low|medium|high", "category": "security|energy|comfort" }}
        """
        
        try:
            response = model.generate_content(prompt)
            match = re.search(r'\{.*\}', response.text, re.DOTALL)
            if match:
                result = json.loads(match.group())
                self.mqtt.publish("aion/proactive", json.dumps(result))
                logger.info(f"Proactive Suggestion published: {result['text']}")
        except Exception as e:
            logger.error(f"Brain reasoning error: {e}")

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            logger.info("Strategist connected to network.")
            self.mqtt.subscribe("ovyon/status/#")
        else:
            logger.error(f"Strategist connection failed: {rc}")

    def run(self):
        import re # Required for regex in analysis
        self.mqtt.on_connect = self.on_connect
        self.mqtt.on_message = self.on_message
        self.mqtt.connect("localhost", 1883, 60)
        self.mqtt.loop_start()
        
        logger.info("BRAIN STRATEGIST ACTIVE - MONITORING HOUSE FLOW...")
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