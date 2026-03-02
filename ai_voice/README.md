# AI Voice Setup (OpenRouter)

## 1. Prerequisites
- Python 3.10+ (3.11 recommended)
- Running backend MQTT broker on `localhost:1883`
- OpenRouter API key

## 2. Install Dependencies
From repository root:

```powershell
cd ai_voice
pip install -r requirements.txt
```

## 3. Configure Environment
Edit `ai_voice/.env`:

```env
OPENROUTER_API_KEY=your_real_openrouter_key
OPENROUTER_MODEL=openai/gpt-oss-120b
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

Optional (recommended by OpenRouter for attribution):
- You can set extra headers in code (`HTTP-Referer`, `X-Title`) if needed later.

## 4. Run AION Voice Bridge
In terminal 1:

```powershell
cd ai_voice
python aion.py
```

Expected:
- Connects to MQTT broker
- Accepts typed commands in console
- Uses local regex first, then OpenRouter for complex prompts

## 5. Run Proactive Brain
In terminal 2:

```powershell
cd ai_voice
python aion_brain.py
```

Expected:
- Subscribes to `ovyon/status/#`
- Periodically sends proactive suggestions to `aion/proactive`

## 6. Quick Test Commands
Type in `aion.py` console:

```text
allume la lumiere du salon
ouvre la porte principale
je vais dormir
```

Check frontend/backend logs for:
- MQTT publish on `ovyon/control/...`
- Transcript publish on `aion/transcript`

## 7. Troubleshooting
- `OPENROUTER_API_KEY missing`:
  - Verify `.env` exists and key is set.
- No MQTT connection:
  - Ensure backend is running and port `1883` is reachable.
- No AI response:
  - Verify API key validity and model name.
- Unicode/encoding oddities in console:
  - Use UTF-8 terminal or ignore display artifacts; logic is unaffected.
