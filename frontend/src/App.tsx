import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "./store/useStore";
import {
  Home,
  Mic,
  Settings as SettingsIcon,
  Zap,
  Info,
  Activity,
  Bluetooth,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import VoiceControl from "./pages/VoiceControl";
import Settings from "./pages/Settings";
import Vision from "./pages/Vision";
import Automations from "./pages/Automations";
import Analytics from "./pages/Analytics";
import SplashScreen from "./pages/SplashScreen";
import Loading from "./pages/Loading";
import PairingModal from "./components/PairingModal";
import PinModal from "./components/PinModal";
import ConfirmModal from "./components/ConfirmModal"; // Ajout
import Admin from "./pages/Admin";
import { Toaster } from "react-hot-toast";
import InstallPWA from "./components/InstallPWA";

const NavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${
      active ? "text-primary" : "text-gray-500 hover:text-gray-300"
    }`}
  >
    <div className={`p-2 rounded-2xl ${active ? "bg-primary/10" : ""}`}>
      <Icon size={22} />
    </div>
    <span className="text-[9px] font-black uppercase tracking-[0.2em]">
      {label}
    </span>
  </button>
);

function App() {
  const {
    activeTab,
    setActiveTab,
    initMqtt,
    connected,
    isAppLoading,
    setPairing,
  } = useStore();

  React.useEffect(() => {
    initMqtt();
  }, [initMqtt]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  if (activeTab === "splash") {
    return <SplashScreen onFinish={() => setActiveTab("home")} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white font-sans overflow-x-hidden selection:bg-primary/30">
      {isAppLoading && <Loading />}
      <PairingModal />
      <PinModal />
      <ConfirmModal /> {/* Intégration */}
      <InstallPWA />
      {/* Header (caché en mode Admin) */}
      {activeTab !== "admin" && (
        <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-[#0A0B10]/80 backdrop-blur-2xl flex justify-between items-center border-b border-white/[0.05]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-2xl font-display font-black tracking-tighter flex items-center gap-1">
              OVYON<span className="text-primary text-4xl leading-[0]">.</span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPairing(true)}
              className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <Bluetooth size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("vision")}
              className={`p-2.5 rounded-2xl transition-all duration-300 ${activeTab === "vision" ? "bg-primary/20 text-primary border border-primary/20" : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10"}`}
            >
              <Info size={20} />
            </motion.button>
            <div className="bg-white/5 px-4 py-2 rounded-2xl border border-white/5 flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <div
                className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)] animate-pulse" : "bg-red-500"}`}
              />
              {connected ? "Live" : "Offline"}
            </div>
          </div>
        </header>
      )}
      <main
        className={`pt-24 pb-32 px-6 max-w-lg mx-auto ${activeTab === "admin" ? "pt-4" : ""}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "home" && <Dashboard />}
            {activeTab === "voice" && <VoiceControl />}
            {activeTab === "settings" && <Settings />}
            {activeTab === "vision" && <Vision />}
            {activeTab === "auto" && <Automations />}
            {activeTab === "analytics" && <Analytics />}
            {activeTab === "admin" && <Admin />}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Navbar (cachée en mode Admin) */}
      {activeTab !== "admin" && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-10 pt-4 bg-gradient-to-t from-[#0A0B10] via-[#0A0B10]/95 to-transparent">
          <div className="max-w-md mx-auto bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-3 flex justify-around items-center shadow-2xl relative">
            <NavItem
              icon={Home}
              label="Home"
              active={activeTab === "home"}
              onClick={() => setActiveTab("home")}
            />
            <NavItem
              icon={Zap}
              label="Auto"
              active={activeTab === "auto"}
              onClick={() => setActiveTab("auto")}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("voice")}
              className={`p-5 rounded-full -mt-16 shadow-[0_20px_50px_rgba(255,107,53,0.3)] transition-all duration-500 ${
                activeTab === "voice"
                  ? "bg-primary text-white"
                  : "bg-[#1A1D29] text-gray-400 border border-white/10"
              }`}
            >
              <Mic size={30} />
            </motion.button>

            <NavItem
              icon={Activity}
              label="Stats"
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />
            <NavItem
              icon={SettingsIcon}
              label="System"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </div>
        </nav>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
