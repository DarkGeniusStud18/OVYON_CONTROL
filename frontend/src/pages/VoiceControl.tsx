import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useStore } from "../store/useStore";
import { Mic, History, CornerDownRight, Zap, Volume2, Sparkles, Send } from "lucide-react";
import { authenticateUser, getWebAuthnSessionToken } from "../utils/biometrics";

const API_BASE = import.meta.env.VITE_API_URL || "https://ovyon-control.onrender.com/api";
const VOICE_LANG_KEY = "ovyon_voice_lang";
const UI_LANG_KEY = "ovyon_ui_lang";

const VOICE_LANG_OPTIONS = [
  { value: "fr-FR", label: "Francais (fr-FR)" },
  { value: "en-US", label: "English (en-US)" },
  { value: "yo-NG", label: "Yoruba (yo-NG)" },
] as const;

const UI_LANG_OPTIONS = [
  { value: "fr", label: "UI FR" },
  { value: "en", label: "UI EN" },
  { value: "yo", label: "UI YO" },
] as const;

const UI_TEXT = {
  fr: {
    title: "Assistant AION",
    subtitle: "Controle vocal local et intelligent",
    online: "Aion Online",
    offline: "Aion Offline",
    volume: "Volume",
    latency: "Latence",
    listening: "Ecoute active...",
    processing: "AION traite la commande...",
    speak: "Parlez a AION",
    disconnected: "Aion deconnecte",
    streamOn: "Flux offline local actif",
    streamOff: "Verifiez le broker",
    placeholder: "Ex: allume salon a 70%, ferme porte principale...",
    send: "Envoyer",
    suggestions: "Suggestions offline",
    recent: "Commandes recentes",
    noHistory: "Aucun historique vocal",
    authNeeded: "WebAuthn requis pour commande critique",
    offlineOk: "Commande offline executee",
    notRecognized: "Commande non reconnue",
    apiError: "Erreur API /api/aion/command",
    sttUnsupported: "Reconnaissance vocale non supportee sur ce navigateur",
    micError: "Impossible d'activer le micro",
  },
  en: {
    title: "AION Assistant",
    subtitle: "Local and smart voice control",
    online: "Aion Online",
    offline: "Aion Offline",
    volume: "Volume",
    latency: "Latency",
    listening: "Listening...",
    processing: "AION is processing...",
    speak: "Speak to AION",
    disconnected: "Aion disconnected",
    streamOn: "Offline local flow active",
    streamOff: "Check broker connection",
    placeholder: "Ex: turn on living room at 70%, close main door...",
    send: "Send",
    suggestions: "Offline suggestions",
    recent: "Recent commands",
    noHistory: "No voice history",
    authNeeded: "WebAuthn required for critical command",
    offlineOk: "Offline command executed",
    notRecognized: "Command not recognized",
    apiError: "API error /api/aion/command",
    sttUnsupported: "Speech recognition not supported on this browser",
    micError: "Unable to activate microphone",
  },
  yo: {
    title: "Iranlowo AION",
    subtitle: "Ibaraenisepo ohun ni agbegbe",
    online: "Aion Online",
    offline: "Aion Offline",
    volume: "Iwon didun",
    latency: "Idaduro",
    listening: "N gbo...",
    processing: "AION n sise lori ase...",
    speak: "So fun AION",
    disconnected: "Aion ko so",
    streamOn: "Ise offline n sise",
    streamOff: "Jowo sayewo broker",
    placeholder: "Apeere: tan ina yara ni 70%, ti ilekun nla...",
    send: "Ran",
    suggestions: "Awon aba offline",
    recent: "Ase to sese",
    noHistory: "Ko si itan ohun",
    authNeeded: "WebAuthn nilo fun ase pataki",
    offlineOk: "Ase offline ti sise",
    notRecognized: "A ko mo ase naa",
    apiError: "Asise API /api/aion/command",
    sttUnsupported: "A ko le lo speech recognition lori browser yii",
    micError: "Ko le mu gbohun soke",
  },
} as const;

type AionApiResponse = {
  success: boolean;
  intent?: string;
  response: string;
  suggestions: Array<{ text: string; score: number; source: "catalog" | "history" }>;
};

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: any) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const VoiceControl = () => {
  const { connected, voiceHistory, isAionResponding, addVoiceCommand } = useStore();
  const [commandText, setCommandText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState<string>(() => {
    if (typeof window === "undefined") return "fr-FR";
    return window.localStorage.getItem(VOICE_LANG_KEY) || "fr-FR";
  });
  const [uiLang, setUiLang] = useState<"fr" | "en" | "yo">(() => {
    if (typeof window === "undefined") return "fr";
    const saved = window.localStorage.getItem(UI_LANG_KEY);
    return saved === "en" || saved === "yo" ? saved : "fr";
  });
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const t = UI_TEXT[uiLang];

  const isBusy = useMemo(
    () => isAionResponding || isSubmitting || isListening,
    [isAionResponding, isSubmitting, isListening],
  );

  const sendCommandText = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isSubmitting) return;

    setIsSubmitting(true);
    setSuggestions([]);

    try {
      const response = await fetch(`${API_BASE}/aion/command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(getWebAuthnSessionToken() ? { Authorization: `Bearer ${getWebAuthnSessionToken()}` } : {}),
        },
        body: JSON.stringify({ text }),
      });

      if (response.status === 401) {
        const ok = await authenticateUser();
        if (!ok) {
          toast.error(t.authNeeded);
          return;
        }
        const retryToken = getWebAuthnSessionToken();
        const retry = await fetch(`${API_BASE}/aion/command`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(retryToken ? { Authorization: `Bearer ${retryToken}` } : {}),
          },
          body: JSON.stringify({ text }),
        });
        if (!retry.ok) throw new Error("AION API unavailable");
        const data = (await retry.json()) as AionApiResponse;
        addVoiceCommand({
          text,
          intent: data.intent || "offline_local",
          status: data.success ? "success" : "error",
          response: data.response,
        });
        if (!data.success && data.suggestions.length) {
          setSuggestions(data.suggestions.map((item) => item.text));
        }
        if (data.success) {
          toast.success(t.offlineOk);
          setCommandText("");
        } else {
          toast.error(data.response || t.notRecognized);
        }
        return;
      }

      if (!response.ok) throw new Error("AION API unavailable");

      const data = (await response.json()) as AionApiResponse;
      addVoiceCommand({
        text,
        intent: data.intent || "offline_local",
        status: data.success ? "success" : "error",
        response: data.response,
      });

      if (!data.success && data.suggestions.length) {
        setSuggestions(data.suggestions.map((item) => item.text));
      }

      if (data.success) {
        toast.success(t.offlineOk);
        setCommandText("");
      } else {
        toast.error(data.response || t.notRecognized);
      }
    } catch {
      toast.error(t.apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitCommand = async (event: FormEvent) => {
    event.preventDefault();
    await sendCommandText(commandText);
  };

  const startVoiceCapture = () => {
    if (isSubmitting) return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      toast.error(t.sttUnsupported);
      return;
    }

    const recognition = new Recognition();
    recognition.lang = voiceLang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => {
      setIsListening(false);
      toast.error(t.micError);
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onresult = async (event: any) => {
      const finalText = Array.from(event.results)
        .map((result: any) => result[0]?.transcript || "")
        .join(" ")
        .trim();
      setCommandText(finalText);
      if (event.results[event.results.length - 1]?.isFinal && finalText) {
        await sendCommandText(finalText);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const toggleVoiceCapture = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }
    startVoiceCapture();
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(VOICE_LANG_KEY, voiceLang);
  }, [voiceLang]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(UI_LANG_KEY, uiLang);
  }, [uiLang]);

  return (
    <div className="space-y-6 py-4">
      <header className="px-2 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-display font-bold">{t.title}</h2>
          <p className="text-gray-500 text-sm">{t.subtitle}</p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-full border border-white/5 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
            connected ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          {connected ? t.online : t.offline}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface/30 p-4 rounded-[2rem] border border-white/5 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
            <Volume2 size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">{t.volume}</p>
            <p className="text-xs font-bold text-white">85%</p>
          </div>
        </div>
        <div className="bg-surface/30 p-4 rounded-[2rem] border border-white/5 flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">{t.latency}</p>
            <p className="text-xs font-bold text-white">42ms</p>
          </div>
        </div>
      </div>

      <div className="bg-surface/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center gap-10 relative overflow-hidden h-[520px]">
        <motion.div
          animate={{
            scale: isBusy ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: isBusy ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className={`absolute inset-0 rounded-full blur-[100px] ${isBusy ? "bg-cyan-500" : "bg-primary"}`}
        />

        <div className="relative z-10 flex flex-col items-center gap-8 w-full">
          <AnimatePresence mode="wait">
            {!isBusy ? (
              <motion.div
                key="mic"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                <div className="absolute -inset-8 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={toggleVoiceCapture}
                  className="relative w-36 h-36 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-[0_20px_50px_rgba(255,107,51,0.5)] z-10 group"
                >
                  <Mic size={48} className="text-white group-hover:scale-110 transition-transform" />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(255, 105, 51, 0.7)",
                        "0 0 0 40px rgba(255, 105, 51, 0)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full"
                  />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="response"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="p-6 bg-cyan-500/20 rounded-full border border-cyan-500/30 text-cyan-400">
                  <Sparkles size={40} className="animate-spin-slow" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center space-y-8 w-full">
            <div className="flex items-center justify-center gap-1.5 h-16">
              {[0.3, 0.5, 0.8, 1, 0.8, 0.5, 0.3].map((scale, index) => (
                <motion.div
                  key={index}
                  animate={
                    connected
                      ? {
                          height: isBusy ? [20 * scale, 80 * scale, 40 * scale] : [10 * scale, 40 * scale, 10 * scale],
                          backgroundColor: isBusy ? ["#06b6d4", "#22d3ee", "#06b6d4"] : ["#ff6b35", "#fb923c", "#ff6b35"],
                        }
                      : { height: 4 }
                  }
                  transition={{ repeat: Infinity, duration: isBusy ? 0.6 : 1.2, delay: index * 0.1 }}
                  className="w-2 rounded-full shadow-lg"
                />
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-black text-white tracking-tight">
                {isListening ? t.listening : isBusy ? t.processing : connected ? t.speak : t.disconnected}
              </h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {connected ? t.streamOn : t.streamOff}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={submitCommand} className="bg-surface/40 backdrop-blur-md p-5 rounded-[2rem] border border-white/5 flex gap-3">
        <select
          value={uiLang}
          onChange={(event) => setUiLang(event.target.value as "fr" | "en" | "yo")}
          className="bg-background/60 border border-white/5 rounded-xl px-3 py-3 text-xs text-white outline-none"
        >
          {UI_LANG_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={voiceLang}
          onChange={(event) => setVoiceLang(event.target.value)}
          className="bg-background/60 border border-white/5 rounded-xl px-3 py-3 text-xs text-white outline-none"
        >
          {VOICE_LANG_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>

        <input
          value={commandText}
          onChange={(event) => setCommandText(event.target.value)}
          placeholder={t.placeholder}
          className="flex-1 bg-background/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={!commandText.trim() || isSubmitting}
          className="px-4 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send size={14} />
          {t.send}
        </button>
      </form>

      <div className="bg-surface/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/5 space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <History size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-white/90">{t.recent}</h3>
        </div>
        <div className="space-y-3">
          {voiceHistory.length > 0 ? (
            voiceHistory.slice(0, 5).map((cmd) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={cmd.id}
                className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <CornerDownRight size={14} className="text-primary opacity-50" />
                  <div>
                    <p className="text-sm font-medium text-white/80">{cmd.text}</p>
                    {cmd.response && <p className="text-[10px] text-cyan-400 italic">"{cmd.response}"</p>}
                  </div>
                </div>
                <p className="text-[9px] font-black text-gray-500 font-mono">
                  {new Date(cmd.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em]">{t.noHistory}</p>
            </div>
          )}
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-surface/30 p-4 rounded-[1.5rem] border border-yellow-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-2">{t.suggestions}</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setCommandText(suggestion)}
                className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-300 text-xs hover:bg-yellow-500/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceControl;
