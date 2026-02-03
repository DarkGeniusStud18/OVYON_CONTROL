# OVYON CONTROL - Project Context

## Project Overview
**OVYON Control** is a comprehensive, offline-first home automation ecosystem specifically designed for the African market. It provides an accessible, multilingual (French, Fon, Yoruba), and resilient solution for smart home management, bridging the gap between advanced technology and local cultural needs.

The project is a fully functional Minimum Viable Product (MVP) featuring a 2D interactive dashboard, advanced AI integration, and a physical IoT demonstration model.

## Core Architecture
The system relies on four interconnected pillars:

1.  **OVYON Control App (Frontend):**
    *   **Type:** Progressive Web App (PWA) / Interactive Dashboard.
    *   **Stack:** React, TypeScript, Vite, TailwindCSS, Framer Motion, Lucide React, Zustand.
    *   **Key Features:** 2D House Map (SVG-based), List View, Real-time status, Automation control.
    *   **Communication:** MQTT / REST API.

2.  **OVYON Backend (Central Hub):**
    *   **Type:** Hybrid API & MQTT Broker.
    *   **Stack:** Node.js, TypeScript, Express, Aedes (MQTT Broker).
    *   **Role:** Central state management, automation engine, and communication bridge.

3.  **Aion (Local & Smart AI):**
    *   **Type:** Multilingual Voice Assistant & Proactive Brain.
    *   **Stack:** Python, Vosk (Offline STT), Google Gemini API (LLM), MQTT.
    *   **Components:**
        *   `aion.py`: Real-time voice interaction and multilingual processing.
        *   `aion_brain.py`: Proactive security and energy monitoring.
    *   **Key Feature:** Natural language processing for French, Fon, and Yoruba.

4.  **Physical Model (Hardware):**
    *   **Type:** Multi-node IoT System.
    *   **Hardware:** ESP32 microcontrollers (Lights, Access, Plugs, Environment nodes).
    *   **Stack:** C++ (Arduino/ESP-IDF), PubSubClient (MQTT).
    *   **Role:** Physical execution (PWM lighting, Servos for doors/windows) and sensor reporting (DHT11).

## Project Structure & Key Files
*   **`backend/`**: Node.js/TS server managing device states and the MQTT broker.
*   **`frontend/`**: React/TS PWA with high-end UI/UX and 2D floor plan.
*   **`ai_voice/`**: Python-based AI suite for voice control and proactive analysis.
*   **`firmware/`**: Dedicated Arduino code for specialized ESP32 nodes.
*   **`stitch_dashboard_mon_domicile/`**: UI/UX design assets and reference code.
*   **`OVYON_CONTROL.txt`**: Original specification and prompt repository.
*   **`STEPS.md` / `FINAL_COMPLETE_GUIDE.md`**: Implementation guides and final audit logs.

## Current Status
**Status:** 100% Complete / Ready for Defense.
The system is fully integrated, tested, and optimized for performance and resilience.

## Deployment & Execution
1.  **Backend:** `cd backend && npm run dev` (Starts MQTT on 1883, API on 3001)
2.  **Frontend:** `cd frontend && npm run dev` (Dashboard on 5173)
3.  **AI:** `cd ai_voice && python aion.py` & `python aion_brain.py`
4.  **Hardware:** Flash nodes in `firmware/` to respective ESP32 units.

## Usage Note
When working within this codebase, always ensure that state changes are synchronized across the MQTT bus. The `backend` acts as the source of truth for the frontend via REST and the hardware via MQTT.