import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Wifi, 
  Cpu, 
  Globe2, 
  Info,
  RefreshCw,
  Trash2,
  Edit,
  PlusCircle,
  Bluetooth,
  Fingerprint,
  AlertTriangle,
  FileText,
  Lock,
  Unlock
} from 'lucide-react';
import { useStore } from '../store/useStore';
import AddModal from '../components/AddModal';

const SettingCard = ({ icon: Icon, title, children }: any) => (
  <div className="bg-surface/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 space-y-4">
    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
      <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-sm uppercase tracking-widest">{title}</h3>
    </div>
    {children}
  </div>
);

const Settings = () => {
  const { connected, settings, updateSettings, devices, initMqtt, setPairing, resetSystem, setActiveTab, setAdminMode, setPinModalOpen } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6 py-4 pb-20">
      <AnimatePresence>
        {isAdding && <AddModal type="device" onClose={() => setIsAdding(false)} />}
      </AnimatePresence>

      <header className="px-2">
        <h2 className="text-2xl font-display font-bold">Configuration</h2>
        <p className="text-gray-500 text-sm">Gestion avancée du système OVYON</p>
      </header>

      <div className="space-y-4">
        {/* SÉCURITÉ AVANCÉE */}
        <SettingCard icon={Fingerprint} title="Sécurité & Accès">
          <div className="space-y-4">
            {/* Biométrie */}
            <div className="flex items-center justify-between p-2">
              <div>
                <p className="text-sm font-medium text-white">Verrouillage Biométrique</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Actions sensibles (Porte)</p>
              </div>
              <button 
                onClick={() => updateSettings({ biometricsEnabled: !settings.biometricsEnabled })}
                className={`w-12 h-6 rounded-full relative transition-colors ${settings.biometricsEnabled ? 'bg-primary' : 'bg-gray-700'}`}
              >
                <motion.div animate={{ x: settings.biometricsEnabled ? 24 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
            
            {/* Mode Administrateur (Toggle avec PIN Modal) */}
            <div className="flex items-center justify-between p-2 border-t border-white/5 pt-4">
              <div>
                <p className="text-sm font-medium text-white">Mode Administrateur</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Accès aux logs et root</p>
              </div>
              <button 
                onClick={() => {
                  if (settings.adminModeEnabled) {
                    setAdminMode(false);
                  } else {
                    setPinModalOpen(true);
                  }
                }}
                className={`w-12 h-6 rounded-full relative transition-colors ${settings.adminModeEnabled ? 'bg-red-500' : 'bg-gray-700'}`}
              >
                <motion.div animate={{ x: settings.adminModeEnabled ? 24 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>

            {/* Lien direct vers Admin (visible uniquement si déverrouillé) */}
            <AnimatePresence>
              {settings.adminModeEnabled && (
                <motion.button 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onClick={() => setActiveTab('admin')}
                  className="w-full py-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/20 transition-all overflow-hidden"
                >
                  <Unlock size={16} /> Ouvrir la Console Root
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </SettingCard>

        {/* Bouton Panique */}
        <SettingCard icon={AlertTriangle} title="Urgence">
          <div className="flex items-center justify-between p-2">
            <div>
              <p className="text-sm font-medium text-white">Bouton Panique</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">Afficher sur le dashboard</p>
            </div>
            <button 
              onClick={() => updateSettings({ panicButtonEnabled: !settings.panicButtonEnabled })}
              className={`w-12 h-6 rounded-full relative transition-colors ${settings.panicButtonEnabled ? 'bg-primary' : 'bg-gray-700'}`}
            >
              <motion.div animate={{ x: settings.panicButtonEnabled ? 24 : 4 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </button>
          </div>
        </SettingCard>

        {/* CONNEXION LOCALE */}
        <SettingCard icon={Bluetooth} title="Connexion Locale">
          <div className="space-y-4">
            <button 
              onClick={() => setPairing(true)}
              className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <Bluetooth size={18} className="animate-pulse" /> Lancer Appairage BLE/NFC
            </button>
          </div>
        </SettingCard>

        {/* MQTT CONFIG */}
        <SettingCard icon={Wifi} title="Connectivité MQTT">
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-background/50 p-4 rounded-2xl border border-white/5">
              <div className="flex-1 mr-4">
                <p className="text-xs font-bold text-gray-400 uppercase">Broker URL</p>
                <input 
                  type="text" value={settings.brokerUrl}
                  onChange={(e) => updateSettings({ brokerUrl: e.target.value })}
                  className="bg-transparent text-sm font-mono text-primary mt-1 w-full border-none p-0 focus:ring-0 outline-none"
                />
              </div>
              <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${connected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {connected ? 'Actif' : 'Erreur'}
              </div>
            </div>
            <button onClick={() => initMqtt(true)} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
              <RefreshCw size={14} /> Re-connecter au Broker
            </button>
          </div>
        </SettingCard>

        {/* DANGER ZONE */}
        <div className="p-4 border-2 border-red-500/10 rounded-[2rem] bg-red-500/5 space-y-4">
          <div className="flex items-center gap-2 text-red-500 px-2">
            <ShieldCheck size={18} />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Zone de Sécurité</h3>
          </div>
          <button 
            onClick={resetSystem}
            className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={16} /> Réinitialiser tout le système
          </button>
        </div>
      </div>

      <footer className="text-center py-10 opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white">OVYON CONTROL v1.0.0 PREMIUM</p>
      </footer>
    </div>
  );
};

export default Settings;