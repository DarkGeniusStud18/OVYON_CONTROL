import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import AddModal from '../components/AddModal';
import { 
  Lightbulb, 
  DoorClosed, 
  RectangleVertical, 
  Plug, 
  Power,
  Zap,
  Activity,
  LayoutGrid,
  Map as MapIcon,
  PlusCircle,
  Monitor,
  X
} from 'lucide-react';

/**
 * COMPOSANT : CARTE APPAREIL (DeviceItem)
 * Représente un objet connecté dans la liste avec ses contrôles.
 */
const DeviceItem = ({ device, index }: { device: any, index: number }) => {
  const sendCommand = useStore((state) => state.sendCommand);
  const active = device.state.power === 'on' || device.state.position > 0;

  // Change l'état ON/OFF
  const togglePower = () => {
    const typeFolder = device.type === 'light' ? 'lights' : 
                       device.type === 'plug' ? 'plugs' : 
                       device.type === 'door' ? 'door' :
                       device.type === 'window' ? 'window' : 'other';
    const topic = `ovyon/control/${typeFolder}/${device.id.split('_')[1] || 'main'}/power`;
    const nextState = device.state.power === 'on' ? 'off' : 'on';
    sendCommand(topic, nextState);
  };

  // Mappe les types d'objets vers des icônes Lucide
  const icons = {
    light: <Lightbulb size={20} className={active ? 'text-primary' : 'text-gray-600'} />,
    door: <DoorClosed size={20} className="text-cyan-400" />,
    window: <RectangleVertical size={20} className="text-cyan-400" />,
    plug: <Plug size={20} className={active ? 'text-yellow-400' : 'text-gray-600'} />,
    sensor: <Activity size={20} className="text-blue-400" />,
    other: <Monitor size={20} className={active ? 'text-primary' : 'text-gray-600'} />
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`p-4 rounded-3xl border transition-all duration-500 flex flex-col justify-between min-h-[160px] relative group ${
        active 
        ? 'bg-white/10 border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
        : 'bg-white/[0.02] border-white/5'
      }`}
    >
      {/* Bouton de suppression (CRUD) */}
      <button 
        onClick={() => useStore.getState().deleteDevice(device.id)}
        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
      >
        <X size={12} />
      </button>

      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl transition-colors ${active ? 'bg-primary/20' : 'bg-white/5'}`}>
          {(icons as any)[device.type] || <Zap size={20} />}
        </div>
        {(device.type === 'light' || device.type === 'plug' || device.type === 'other') && (
          <button 
            onClick={togglePower}
            className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-gray-700'}`}
          >
            <motion.div 
              animate={{ x: active ? 20 : 4 }}
              className="absolute top-1 w-3 h-3 bg-white rounded-full"
            />
          </button>
        )}
      </div>

      <div className="space-y-1 mt-2">
        <h4 className="font-bold text-sm text-white/90 truncate">{device.name}</h4>
        <p className={`text-[9px] font-black uppercase tracking-wider ${active ? 'text-primary' : 'text-gray-500'}`}>
          {device.type === 'plug' ? `${device.state.consumption}W` : 
           device.type === 'sensor' ? `${device.state.temperature}°C` :
           (device.type === 'light' ? `${device.state.brightness || 0}%` : (device.state.power || `${device.state.position || 0}%`))}
        </p>
      </div>

      {/* Sliders interactifs pour Lumière/Fenêtre */}
      {device.type === 'light' && active && (
        <input 
          type="range" min="0" max="100" value={device.state.brightness || 0}
          onChange={(e) => sendCommand(`ovyon/control/lights/${device.id.split('_')[1]}/brightness`, e.target.value)}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary mt-3"
        />
      )}

      {device.type === 'window' && (
        <input 
          type="range" min="0" max="100" value={device.state.position || 0}
          onChange={(e) => sendCommand(`ovyon/control/window/${device.id.split('_')[1]}/position`, e.target.value)}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-3"
        />
      )}

      {device.type === 'door' && (
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => sendCommand(`ovyon/control/door/${device.id.split('_')[1]}/action`, 'open')}
            className="flex-1 bg-white/5 hover:bg-cyan-400/20 text-cyan-400 text-[8px] font-black py-1.5 rounded-lg border border-white/5 transition-colors uppercase"
          > Ouvrir </button>
          <button 
            onClick={() => sendCommand(`ovyon/control/door/${device.id.split('_')[1]}/action`, 'close')}
            className="flex-1 bg-white/5 hover:bg-cyan-400/20 text-cyan-400 text-[8px] font-black py-1.5 rounded-lg border border-white/5 transition-colors uppercase"
          > Fermer </button>
        </div>
      )}
    </motion.div>
  );
};

/**
 * COMPOSANT : PLAN 2D (Plan2D)
 * Affiche la maison de dessus avec les nœuds interactifs.
 */
const Plan2D = () => {
  const { devices, sendCommand } = useStore();
  
  // Définit les zones de la maison (mapping ID -> Position CSS)
  const getRoomCoords = (id: string, room?: string) => {
    if (id === 'door_main') return 'bottom-1/2 left-0';
    if (id === 'sensor_env') return 'top-4 right-4';
    const roomSpots: any = {
      'salon': ['top-1/4 left-1/4', 'top-1/3 left-1/3'],
      'cuisine': ['bottom-1/4 left-1/4'],
      'chambre': ['top-1/2 right-1/4'],
    };
    const targetRoom = room || id.split('_')[1] || 'salon';
    return (roomSpots[targetRoom] || roomSpots['salon'])[0]; 
  };

  return (
    <div className="relative aspect-[4/3] bg-background/50 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-inner">
      {/* Schéma SVG des murs de la mini-maison */}
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-10">
        <rect x="20" y="20" width="360" height="260" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4" />
        <line x1="200" y1="20" x2="200" y2="280" stroke="white" strokeWidth="1" strokeDasharray="4" />
        <line x1="20" y1="150" x2="200" y2="150" stroke="white" strokeWidth="1" strokeDasharray="4" />
      </svg>

      <div className="absolute inset-0 p-8">
        {devices.map(device => {
          const active = device.state.power === 'on' || device.state.position > 0;
          const pos = getRoomCoords(device.id, (device as any).room);
          
          return (
            <div key={device.id} className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2`}>
              <button 
                onClick={() => {
                  if (device.type === 'light' || device.type === 'other' || device.type === 'plug') {
                    sendCommand(`ovyon/control/${device.type}s/${device.id.split('_')[1]}/power`, active ? 'off' : 'on');
                  } else if (device.type === 'door') {
                    sendCommand(`ovyon/control/door/${device.id.split('_')[1]}/action`, active ? 'close' : 'open');
                  }
                }}
                className={`p-4 rounded-full transition-all duration-500 ${
                  active ? 'bg-primary text-white scale-110 shadow-[0_0_30px_#FF6B35]' : 'bg-white/10 text-gray-500'
                }`}
              >
                {device.type === 'light' ? <Lightbulb size={20} /> : 
                 device.type === 'door' ? <DoorClosed size={20} /> :
                 device.type === 'plug' ? <Plug size={20} /> : <Monitor size={20} />}
              </button>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">{device.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * PAGE PRINCIPALE : DASHBOARD
 */
const Dashboard = () => {
  const { devices, sendCommand } = useStore();
  const [view, setView] = useState<'grid' | 'plan'>('grid');
  const [isAdding, setIsAdding] = useState(false);

  const activeCount = devices.filter(d => d.state.power === 'on' || d.state.position > 0).length;

  return (
    <div className="space-y-6 py-4">
      {/* Modal d'ajout d'appareil */}
      <AnimatePresence>
        {isAdding && <AddModal type="device" onClose={() => setIsAdding(false)} />}
      </AnimatePresence>

      <header className="px-2 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-display font-bold">Mon Domicile</h2>
          <p className="text-gray-500 text-sm">Contrôle intelligent OVYON</p>
        </div>
        <div className="flex gap-2">
          {/* Bouton d'ajout */}
          <motion.button 
            whileTap={{ scale: 0.9 }} onClick={() => setIsAdding(true)}
            className="p-2.5 rounded-xl bg-white/5 text-gray-400 border border-white/5 hover:text-primary hover:bg-primary/10 transition-all"
          > <PlusCircle size={20} /> </motion.button>
          
          {/* Switch Vue Liste / Plan 2D */}
          <div className="flex bg-surface/50 p-1 rounded-2xl border border-white/5">
            <button onClick={() => setView('grid')} className={`p-2.5 rounded-xl transition-all ${view === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-gray-500'}`}> <LayoutGrid size={16} /> </button>
            <button onClick={() => setView('plan')} className={`p-2.5 rounded-xl transition-all ${view === 'plan' ? 'bg-primary text-white shadow-lg' : 'text-gray-500'}`}> <MapIcon size={16} /> </button>
          </div>
        </div>
      </header>

      {/* Barre de statistiques */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Actifs', value: activeCount, icon: Activity, color: 'text-green-500' },
          { label: 'Usage', value: '2.4kW', icon: Zap, color: 'text-primary' },
          { label: 'Santé', value: 'OK', icon: ShieldCheck, color: 'text-blue-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface/40 backdrop-blur-md p-4 rounded-3xl border border-white/5 flex flex-col gap-1 items-center">
            <stat.icon size={14} className={stat.color} />
            <p className="text-[14px] font-bold text-white mt-1">{stat.value}</p>
            <p className="text-[8px] font-black uppercase text-gray-500 tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4">
            {devices.map((device, i) => <DeviceItem key={device.id} device={device} index={i} />)}
          </motion.div>
        ) : (
          <motion.div key="plan" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
            <Plan2D />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Switch Maître (Power Off All) */}
      <div className="pt-4 px-2">
        <button 
          onClick={() => sendCommand('ovyon/control/all/power', 'off')}
          className="w-full py-4 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] border border-primary/20 transition-all flex items-center justify-center gap-3 group"
        >
          <Power size={18} className="group-hover:scale-110 transition-transform" />
          Désactiver tous les équipements
        </button>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
);

export default Dashboard;