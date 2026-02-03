import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import AddModal from '../components/AddModal';
import { 
  Zap, 
  Plus, 
  ArrowRight, 
  Thermometer, 
  Wind,
  BellRing
} from 'lucide-react';

const AutomationCard = ({ rule }: any) => {
  const { toggleAutomation, deleteAutomation } = useStore();

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className={`bg-surface/40 backdrop-blur-md p-6 rounded-[2.5rem] border transition-all duration-500 ${rule.enabled ? 'border-primary/30 shadow-[0_10px_30px_rgba(255,107,53,0.1)]' : 'border-white/5 opacity-60'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${rule.enabled ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-500'}`}>
            <Zap size={20} />
          </div>
          <div>
            <h3 className={`font-bold tracking-tight ${rule.enabled ? 'text-white' : 'text-gray-500'}`}>{rule.name}</h3>
            <div className="flex gap-2 mt-1">
              <button onClick={() => deleteAutomation(rule.id)} className="text-[8px] font-black uppercase text-red-500/60 hover:text-red-500 transition-colors">Supprimer</button>
            </div>
          </div>
        </div>
        <button 
          onClick={() => toggleAutomation(rule.id)}
          className={`w-12 h-6 rounded-full relative transition-colors ${rule.enabled ? 'bg-primary' : 'bg-gray-700'}`}
        >
          <motion.div 
            animate={{ x: rule.enabled ? 24 : 4 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full"
          />
        </button>
      </div>
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-[10px] font-black uppercase text-gray-500 leading-relaxed">
          SI <span className="text-primary/80">{rule.triggerDeviceId}</span> {">"} {rule.value} <br/>
          ALORS <span className="text-cyan-400/80">{rule.actionDeviceId}</span>
        </p>
      </div>
    </motion.div>
  );
};

const Automations = () => {
  const { automationRules, isSmartAiEnabled, setSmartAi } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-8 py-4">
      <AnimatePresence>
        {isAdding && <AddModal type="automation" onClose={() => setIsAdding(false)} />}
      </AnimatePresence>

      <header className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-2xl font-display font-bold">Scénarios</h2>
          <p className="text-gray-500 text-sm">Intelligence proactive AION</p>
        </div>
        <motion.button 
          onClick={() => setIsAdding(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/30"
        >
          <Plus size={24} />
        </motion.button>
      </header>

      {/* Sensor Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-500/10 p-6 rounded-[2.5rem] border border-blue-500/20 flex flex-col items-center gap-2">
          <Thermometer className="text-blue-400" />
          <p className="text-2xl font-display font-black">28.5°C</p>
          <p className="text-[9px] font-black uppercase text-blue-400/60 tracking-widest">Température</p>
        </div>
        <div className="bg-green-500/10 p-6 rounded-[2.5rem] border border-green-500/20 flex flex-col items-center gap-2">
          <Wind className="text-green-400" />
          <p className="text-2xl font-display font-black">45%</p>
          <p className="text-[9px] font-black uppercase text-green-400/60 tracking-widest">Humidité</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Automatisations Actives</h3>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 ${isSmartAiEnabled ? 'bg-primary animate-pulse' : 'bg-gray-600'} rounded-full`} />
            <span className={`text-[9px] font-black uppercase ${isSmartAiEnabled ? 'text-primary' : 'text-gray-600'} tracking-widest`}>
              {isSmartAiEnabled ? 'Live Engine' : 'Engine Offline'}
            </span>
          </div>
        </div>
        
        <div className="grid gap-4">
          {automationRules.map(rule => (
            <AutomationCard key={rule.id} rule={rule} />
          ))}
        </div>
      </div>

      <div className={`bg-gradient-to-br ${isSmartAiEnabled ? 'from-primary to-orange-600' : 'from-gray-800 to-gray-900'} p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group transition-all duration-500`}>
        <div className="relative z-10">
          <h3 className="text-xl font-display font-black text-white italic">"Aion, optimise ma consommation"</h3>
          <p className="text-white/70 text-xs mt-2 font-medium">Laissez l'IA gérer vos équipements pour économiser jusqu'à 30% sur votre facture.</p>
          <button 
            onClick={() => setSmartAi(!isSmartAiEnabled)}
            className={`mt-6 px-6 py-3 ${isSmartAiEnabled ? 'bg-white text-primary' : 'bg-primary text-white'} rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all duration-300`}
          >
            {isSmartAiEnabled ? 'Désactiver l\'IA Smart' : 'Activer l\'IA Smart'} <ArrowRight size={14} />
          </button>
        </div>
        <Zap size={140} className={`absolute -right-10 -bottom-10 ${isSmartAiEnabled ? 'text-white/10' : 'text-white/5'} group-hover:scale-110 transition-transform duration-700`} />
      </div>
    </div>
  );
};

export default Automations;
