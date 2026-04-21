import React, { FormEvent, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useStore } from "../store/useStore";
import { Mic, History, CornerDownRight, Zap, Volume2, Sparkles, Send } from "lucide-react";
import { authenticateUser, getWebAuthnSessionToken } from "../utils/biometrics";

const API_HOST =
  typeof window !== "undefined" ? window.location.hostname : "localhost";
const API_BASE = `http://${API_HOST}:3001/api`;

type AionApiResponse = {
  success: boolean;
  intent?: string;
  response: string;
  suggestions: Array<{ text: string; score: number; source: "catalog" | "history" }>;
};

const VoiceControl = () => {
  const { connected, voiceHistory, isAionResponding, addVoiceCommand } = useStore();
  const [commandText, setCommandText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const isBusy = useMemo(() => isAionResponding || isSubmitting, [isAionResponding, isSubmitting]);

  const submitCommand = async (event: FormEvent) => {
    event.preventDefault();
    const text = commandText.trim();
    if (!text || isSubmitting) return;

    setIsSubmitting(true);
    setSuggestions([]);

    try {
      const response = await fetch(`${API_BASE}/aion/command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(getWebAuthnSessionToken()
            ? { Authorization: `Bearer ${getWebAuthnSessionToken()}` }
            : {})
        },
        body: JSON.stringify({ text })
      });

      if (response.status === 401) {
        const ok = await authenticateUser();
        if (!ok) {
          toast.error("WebAuthn requis pour commande critique");
          return;
        }
        const retryToken = getWebAuthnSessionToken();
        const retry = await fetch(`${API_BASE}/aion/command`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(retryToken ? { Authorization: `Bearer ${retryToken}` } : {})
          },
          body: JSON.stringify({ text })
        });
        if (!retry.ok) {
          throw new Error("API AION indisponible");
        }
        const data = (await retry.json()) as AionApiResponse;
        addVoiceCommand({
          text,
          intent: data.intent || "offline_local",
          status: data.success ? "success" : "error",
          response: data.response
        });
        if (!data.success && data.suggestions.length) {
          setSuggestions(data.suggestions.map((item) => item.text));
        }
        if (data.success) {
          toast.success("Commande offline exécutée");
          setCommandText("");
        } else {
          toast.error(data.response || "Commande non reconnue");
        }
        return;
      }

      if (!response.ok) {
        throw new Error("API AION indisponible");
      }

      const data = (await response.json()) as AionApiResponse;
      addVoiceCommand({
        text,
        intent: data.intent || "offline_local",
        status: data.success ? "success" : "error",
        response: data.response
      });

      if (!data.success && data.suggestions.length) {
        setSuggestions(data.suggestions.map((item) => item.text));
      }

      if (data.success) {
        toast.success("Commande offline exécutée");
        setCommandText("");
      } else {
        toast.error(data.response || "Commande non reconnue");
      }
    } catch (error) {
      toast.error("Erreur API /api/aion/command");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <header className="px-2 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-display font-bold">Assistant AION</h2>
          <p className="text-gray-500 text-sm">Contrôle vocal local & intelligent</p>
        </div>
        <div
          className={`px-3 py-1.5 rounded-full border border-white/5 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${
            connected ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          {connected ? "Aion Online" : "Aion Offline"}
        </div>
      </header>

      <form onSubmit={submitCommand} className="bg-surface/40 backdrop-blur-md p-5 rounded-[2rem] border border-white/5 flex gap-3">
        <input
          value={commandText}
          onChange={(event) => setCommandText(event.target.value)}
          placeholder="Ex: allume salon à 70%, fermez porte principale..."
          className="flex-1 bg-background/60 border border-white/5 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-primary/60"
        />
        <button
          type="submit"
          disabled={!commandText.trim() || isSubmitting}
          className="px-4 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send size={14} />
          Envoyer
        </button>
      </form>

      {/* Main Interaction Area */}
      <div className="bg-surface/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center gap-10 relative overflow-hidden h-[400px]">
        <motion.div
          animate={{
            scale: isBusy ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: isBusy ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1]
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
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="relative w-36 h-36 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-[0_20px_50px_rgba(255,107,51,0.5)] z-10 group">
                  <Mic size={48} className="text-white group-hover:scale-110 transition-transform" />
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0px rgba(255, 105, 51, 0.7)", "0 0 0 40px rgba(255, 105, 51, 0)"] }}
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
                          backgroundColor: isBusy ? ["#06b6d4", "#22d3ee", "#06b6d4"] : ["#ff6b35", "#fb923c", "#ff6b35"]
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
                {isBusy ? "AION traite la commande..." : connected ? "Parlez à AION" : "Aion déconnecté"}
              </h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
                {connected ? "Flux offline local actif" : "Vérifiez le broker"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-surface/30 p-4 rounded-[1.5rem] border border-yellow-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-2">Suggestions offline</p>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface/30 p-4 rounded-[2rem] border border-white/5 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
            <Volume2 size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Volume</p>
            <p className="text-xs font-bold text-white">85%</p>
          </div>
        </div>
        <div className="bg-surface/30 p-4 rounded-[2rem] border border-white/5 flex items-center gap-3">
          <div className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-500 uppercase">Latence</p>
            <p className="text-xs font-bold text-white">42ms</p>
          </div>
        </div>
      </div>

      <div className="bg-surface/40 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/5 space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
            <History size={18} />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-white/90">Commandes Récentes</h3>
        </div>
        <div className="space-y-3">
          {voiceHistory.length > 0 ? (
            voiceHistory.slice(0, 5).map((cmd) => (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={cmd.id} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors group">
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
              <p className="text-[9px] font-black uppercase text-gray-600 tracking-[0.2em]">Aucun historique vocal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceControl;
