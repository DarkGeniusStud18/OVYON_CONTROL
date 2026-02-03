import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Power, 
  Clock, 
  CreditCard, 
  LayoutList,
  Lightbulb,
  Microwave,
  Info,
  ChevronRight, 
  TrendingUp, 
  History,
  Activity,
  Plug
} from 'lucide-react';
import { useStore } from '../store/useStore';

/**
 * COMPOSANT : CARTE ANALYTICS (AnalyticsCard)
 * Conteneur premium avec effet de flou pour les statistiques.
 */
const AnalyticsCard = ({ icon: Icon, title, children, colorClass }: any) => (
  <div className="bg-surface/40 backdrop-blur-md p-5 rounded-[2.5rem] border border-white/5 space-y-4 overflow-hidden">
    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
      <div className={`p-2.5 rounded-xl ${colorClass || 'bg-primary/10 text-primary'}`}>
        <Icon size={18} />
      </div>
      <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/90">{title}</h3>
    </div>
    <div className="w-full">
      {children}
    </div>
  </div>
);

const StatMiniCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-surface/30 p-4 rounded-[2rem] border border-white/5 flex flex-col items-center gap-2 text-center">
    <Icon size={14} className={color} />
    <div>
      <p className="text-[14px] font-bold text-white">{value}</p>
      <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">{label}</p>
    </div>
  </div>
);

/**
 * COMPOSANT : ITEM D'USAGE (DeviceUsageItem)
 * Affiche la consommation spécifique d'un appareil réel.
 */
const DeviceUsageItem = ({ device, index }: any) => {
  const sendCommand = useStore(state => state.sendCommand);
  const active = device.state.power === 'on';

  const togglePower = () => {
    const typeFolder = device.type === 'light' ? 'lights' : 'plugs';
    const topic = `ovyon/control/${typeFolder}/${device.id.split('_')[1]}/power`;
    const nextState = active ? 'off' : 'on';
    sendCommand(topic, nextState);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${active ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-600'}`}>
          {device.type === 'light' ? <Lightbulb size={16} /> : <Plug size={16} />}
        </div>
        <div>
          <p className="text-sm font-medium text-white/80">{device.name}</p>
          <p className={`text-[9px] font-black uppercase ${active ? 'text-green-500' : 'text-gray-500'}`}>
            {active ? `En marche • ${device.state.consumption || 0}W` : 'Éteint'}
          </p>
        </div>
      </div>
      <button 
        onClick={togglePower}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${active ? 'bg-primary' : 'bg-gray-700'}`}
      >
        <motion.div 
          animate={{ x: active ? 20 : 4 }}
          className="absolute h-3 w-3 rounded-full bg-white transition-all" 
        />
      </button>
    </motion.div>
  );
};

/**
 * PAGE ANALYTICS
 * Connectée à la base de données réelle via useStore.
 */
const Analytics = () => {
  const { devices } = useStore();
  
  // Calcul des statistiques réelles basées sur la base de données
  const controllableDevices = devices.filter(d => d.type === 'light' || d.type === 'plug');
  const totalPower = controllableDevices.reduce((acc, d) => acc + (d.state.power === 'on' ? (d.state.consumption || 40) : 0), 0);
  const activeCount = controllableDevices.filter(d => d.state.power === 'on').length;
  
  // Estimation de facture (Simulation basée sur la conso réelle)
  const estimatedBill = Math.round(totalPower * 0.15 * 24 * 30); // Formule FCFA indicative

  return (
    <div className="space-y-6 py-4">
      <header className="px-2">
        <h2 className="text-2xl font-display font-bold">Consommation</h2>
        <p className="text-gray-500 text-sm">Analyse énergétique de l'écosystème</p>
      </header>

      {/* Résumé Principal */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-gradient-to-br from-primary/20 to-transparent p-6 rounded-[2.5rem] border border-primary/20 flex justify-between items-center overflow-hidden relative">
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Facture Estimée</p>
            <h3 className="text-3xl font-display font-black text-white">{estimatedBill.toLocaleString()} FCFA</h3>
            <p className="text-xs text-white/40">Projection mensuelle réelle</p>
          </div>
          <TrendingUp size={80} className="absolute -right-4 -bottom-4 text-primary/10 -rotate-12" />
        </div>

        <StatMiniCard icon={Zap} label="Instantané" value={`${totalPower}W`} color="text-primary" />
        <StatMiniCard icon={Power} label="Appareils ON" value={activeCount} color="text-green-400" />
      </div>

      {/* Section Graphique Corrigée */}
      <AnalyticsCard icon={Activity} title="Activité sur 24h">
        <div className="w-full pt-2">
          <div className="h-32 w-full">
            <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Chemin du graphique - Ajusté pour ne pas déborder */}
              <path 
                d="M0 110 C 40 110, 60 20, 100 80 S 160 40, 200 90 S 300 30, 400 70 L 400 120 L 0 120 Z" 
                fill="url(#chartGradient)" 
              />
              <path 
                d="M0 110 C 40 110, 60 20, 100 80 S 160 40, 200 90 S 300 30, 400 70" 
                fill="none" 
                stroke="#FF6B35" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between mt-4 px-2">
            {['00h', '06h', '12h', '18h', '24h'].map(h => (
              <span key={h} className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{h}</span>
            ))}
          </div>
        </div>
      </AnalyticsCard>

      {/* Liste des équipements réels */}
      <AnalyticsCard icon={History} title="Détails par Équipement">
        <div className="space-y-1">
          {controllableDevices.length > 0 ? (
            controllableDevices.map((device, i) => (
              <DeviceUsageItem key={device.id} device={device} index={i} />
            ))
          ) : (
            <p className="text-center py-6 text-[10px] uppercase font-black text-gray-600 tracking-widest">
              Aucun équipement de puissance détecté
            </p>
          )}
        </div>
      </AnalyticsCard>

      {/* Conseil Intelligent */}
      <div className="p-6 border border-primary/20 rounded-[2.5rem] bg-primary/5 space-y-3 relative overflow-hidden group">
        <div className="flex items-center gap-3 text-primary relative z-10">
          <Info size={20} />
          <h3 className="text-xs font-black uppercase tracking-[0.2em]">Optimisation OVYON</h3>
        </div>
        <p className="text-sm text-white/70 leading-relaxed relative z-10">
          Votre consommation instantanée est de <span className="text-primary font-bold">{totalPower}W</span>. 
          {totalPower > 200 ? " Pensez à couper les appareils en veille pour économiser." : " Votre maison est en mode éco-performant."}
        </p>
        <Zap size={100} className="absolute -right-10 -bottom-10 text-primary/5 group-hover:scale-110 transition-transform duration-700" />
      </div>

      <footer className="text-center py-6">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 italic">
          Données synchronisées avec SQLite Local
        </p>
      </footer>
    </div>
  );
};

export default Analytics;
