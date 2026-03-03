import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      console.log("✅ PWA: beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e);
      // Afficher le popup après un court délai
      setTimeout(() => setShowPopup(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-6 right-6 z-[100] max-w-[320px] w-full"
        >
          <div className="bg-[#1A1D29]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-2xl relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Smartphone size={24} />
              </div>

              <div className="flex-1 pr-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">
                  OVYON App
                </h3>
                <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                  Installez l'application pour une expérience fluide et un accès
                  rapide.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleInstall}
                  className="mt-4 w-full py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={14} />
                  Installer
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPWA;
