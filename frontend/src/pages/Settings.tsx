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
  Bluetooth
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
  const { connected, settings, updateSettings, devices, initMqtt, setPairing, resetSystem } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6 py-4">
      <AnimatePresence>
        {isAdding && <AddModal type="device" onClose={() => setIsAdding(false)} />}
      </AnimatePresence>

      <header className="px-2">
        <h2 className="text-2xl font-display font-bold">Configuration</h2>
        <p className="text-gray-500 text-sm">Gestion avancée du système OVYON</p>
      </header>

      <div className="space-y-4">
        {/* Connectivity Trigger */}
        <SettingCard icon={Bluetooth} title="Connexion Locale">
          <div className="space-y-4">
            <p className="text-xs text-gray-400 px-1">Configurez vos équipements via Bluetooth Low Energy ou NFC pour une installation sans fil simplifiée.</p>
            <button 
              onClick={() => setPairing(true)}
              className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <Bluetooth size={18} className="animate-pulse" />
              Lancer un Appairage BLE/NFC
            </button>
          </div>
        </SettingCard>

        {/* Connection Status */}
        <SettingCard icon={Wifi} title="Connectivité MQTT">
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-background/50 p-4 rounded-2xl border border-white/5">
              <div className="flex-1 mr-4">
                <p className="text-xs font-bold text-gray-400 uppercase">Broker URL</p>
                <input 
                  type="text"
                  value={settings.brokerUrl}
                  onChange={(e) => updateSettings({ brokerUrl: e.target.value })}
                  className="bg-transparent text-sm font-mono text-primary mt-1 w-full border-none p-0 focus:ring-0"
                />
              </div>
              <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${connected ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {connected ? 'Actif' : 'Erreur'}
              </div>
            </div>
            <button 
              onClick={() => useStore.getState().initMqtt(true)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Re-connecter au Broker
            </button>
          </div>
        </SettingCard>

        {/* Notifications */}
        <SettingCard icon={ShieldCheck} title="Préférences Alertes">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2">
              <span className="text-xs font-medium text-gray-400">Notifications Push</span>
              <button 
                onClick={() => { updateSettings({ notificationsEnabled: !settings.notificationsEnabled }); useStore.getState().initMqtt(); /* Refresh logic if needed */ }}
                className={`w-12 h-6 rounded-full relative transition-colors ${settings.notificationsEnabled ? 'bg-primary' : 'bg-gray-700'}`}
              >
                <motion.div 
                  animate={{ x: settings.notificationsEnabled ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-xs font-medium text-gray-400">Alertes Sécurité Smart</span>
              <button 
                onClick={() => updateSettings({ securityAlerts: !settings.securityAlerts })}
                className={`w-12 h-6 rounded-full relative transition-colors ${settings.securityAlerts ? 'bg-primary' : 'bg-gray-700'}`}
              >
                <motion.div 
                  animate={{ x: settings.securityAlerts ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>
          </div>
        </SettingCard>

        {/* System Info */}
        <SettingCard icon={Cpu} title="Matériel & ESP32">
          <div className="space-y-2">
            <div className="divide-y divide-white/5 max-h-60 overflow-y-auto pr-2">
              {devices.map(node => (
                <div key={node.id} className="flex justify-between items-center py-3 px-1 hover:bg-white/5 rounded-xl transition-colors">
                  <div>
                    <p className="text-xs font-bold">{node.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{node.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black uppercase ${node.online ? 'text-green-500' : 'text-red-500'}`}>
                      {node.online ? 'Online' : 'Offline'}
                    </span>
                    <button className="p-2 text-gray-600 hover:text-white transition-colors">
                      <Edit size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full mt-4 py-4 bg-primary/10 border border-dashed border-primary/30 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
            >
              <PlusCircle size={16} />
              Ajouter un équipement
            </button>
          </div>
        </SettingCard>

        {/* Danger Zone */}
        <div className="p-4 border-2 border-red-500/10 rounded-[2rem] bg-red-500/5 space-y-4">
          <div className="flex items-center gap-2 text-red-500 px-2">
            <ShieldCheck size={18} />
            <h3 className="text-xs font-black uppercase tracking-[0.2em]">Zone de Sécurité</h3>
          </div>
          <button 
            onClick={resetSystem}
            className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Réinitialiser tout le système
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