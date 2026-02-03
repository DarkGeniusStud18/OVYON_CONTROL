import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Zap, Cpu, Lightbulb, Plug, DoorOpen, Save, Monitor, Layout, Smartphone, Edit3, Keyboard } from 'lucide-react';
import { useStore } from '../store/useStore';
import { feedback } from '../utils/feedback';

interface AddModalProps {
  type: 'device' | 'automation';
  onClose: () => void;
}

const AddModal = ({ type, onClose }: AddModalProps) => {
  const { addAutomation, addDevice, devices } = useStore();
  
  // Custom input toggles
  const [customTrigger, setCustomTrigger] = useState(false);
  const [customAction, setCustomAction] = useState(false);

  // Automation Form State
  const [autoForm, setAutoForm] = useState({
    name: '',
    triggerDeviceId: '',
    value: '',
    actionDeviceId: '',
  });

  // Device Form State
  const [devForm, setDevForm] = useState({
    id: '',
    type: 'light' as any,
    name: '',
    room: 'salon'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    feedback.tap();
    if (type === 'automation') {
      addAutomation({ ...autoForm, enabled: true });
    } else {
      const finalId = `${devForm.type}_${devForm.id || Math.random().toString(36).substr(2, 5)}`;
      addDevice({ 
        id: finalId,
        type: devForm.type,
        name: devForm.name,
        online: true, 
        state: devForm.type === 'light' ? { power: 'off', brightness: 0 } : { power: 'off', consumption: 0 } 
      });
    }
    onClose();
  };

  const deviceTypes = [
    { id: 'light', icon: Lightbulb, label: 'Lumière' },
    { id: 'plug', icon: Plug, label: 'Prise' },
    { id: 'door', icon: DoorOpen, label: 'Accès' },
    { id: 'window', icon: Layout, label: 'Fenêtre' },
    { id: 'other', icon: Monitor, label: 'Autre (TV...)' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#0A0B10]/95 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-surface border border-white/10 w-full max-w-md rounded-[3rem] p-8 space-y-8 relative overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={20} /></button>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              {type === 'automation' ? <Zap size={20} /> : <Cpu size={20} />}
            </div>
            <h2 className="text-xl font-display font-black text-white">
              {type === 'automation' ? 'Nouveau Scénario' : 'Nouvel Appareil'}
            </h2>
          </div>
          <p className="text-sm text-gray-500">Configuration réelle dans la base SQLite</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'automation' ? (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Nom du scénario</label>
                <input required placeholder="ex: Sécurité Nuit" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none transition-all" value={autoForm.name} onChange={e => setAutoForm({...autoForm, name: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Déclencheur</label>
                  <button type="button" onClick={() => setCustomTrigger(!customTrigger)} className={`text-[9px] font-bold uppercase transition-colors ${customTrigger ? 'text-primary' : 'text-gray-600'}`}>
                    {customTrigger ? '[ Liste ]' : '[ Manuel ]'}
                  </button>
                </div>
                {customTrigger ? (
                  <input required placeholder="ID ou Topic MQTT (ex: CLOCK)" className="w-full bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-white outline-none" value={autoForm.triggerDeviceId} onChange={e => setAutoForm({...autoForm, triggerDeviceId: e.target.value})} />
                ) : (
                  <select required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none appearance-none" value={autoForm.triggerDeviceId} onChange={e => setAutoForm({...autoForm, triggerDeviceId: e.target.value})}>
                    <option value="" className="bg-surface">Sélectionner un appareil</option>
                    {devices.map(d => <option key={d.id} value={d.id} className="bg-surface">{d.name}</option>)}
                  </select>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Valeur de comparaison</label>
                <input required placeholder="ex: 22:00 ou 30" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none transition-all" value={autoForm.value} onChange={e => setAutoForm({...autoForm, value: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Action sur</label>
                  <button type="button" onClick={() => setCustomAction(!customAction)} className={`text-[9px] font-bold uppercase transition-colors ${customAction ? 'text-primary' : 'text-gray-600'}`}>
                    {customAction ? '[ Liste ]' : '[ Manuel ]'}
                  </button>
                </div>
                {customAction ? (
                  <input required placeholder="ID ou Topic MQTT (ex: ALL_LIGHTS)" className="w-full bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-white outline-none" value={autoForm.actionDeviceId} onChange={e => setAutoForm({...autoForm, actionDeviceId: e.target.value})} />
                ) : (
                  <select required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none appearance-none" value={autoForm.actionDeviceId} onChange={e => setAutoForm({...autoForm, actionDeviceId: e.target.value})}>
                    <option value="" className="bg-surface">Sélectionner un appareil</option>
                    {devices.map(d => <option key={d.id} value={d.id} className="bg-surface">{d.name}</option>)}
                  </select>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Catégorie d'équipement</label>
                <div className="grid grid-cols-3 gap-2">
                  {deviceTypes.map(t => (
                    <button key={t.id} type="button" onClick={() => { setDevForm({...devForm, type: t.id}); feedback.tap(); }} className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${devForm.type === t.id ? 'bg-primary/20 border-primary/50 text-primary shadow-lg' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'}`}>
                      <t.icon size={18} /><span className="text-[7px] font-black uppercase">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">ID (MQTT)</label>
                  <input required placeholder="ex: tv_salon" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none" value={devForm.id} onChange={e => setDevForm({...devForm, id: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Pièce</label>
                  <select className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none appearance-none" value={devForm.room} onChange={e => setDevForm({...devForm, room: e.target.value})}>
                    <option value="salon" className="bg-surface">Salon</option>
                    <option value="cuisine" className="bg-surface">Cuisine</option>
                    <option value="chambre" className="bg-surface">Chambre</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Nom personnalisé</label>
                <input required placeholder="ex: Télévision Sony" className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-white focus:border-primary/50 outline-none" value={devForm.name} onChange={e => setDevForm({...devForm, name: e.target.value})} />
              </div>
            </div>
          )}

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-primary text-white rounded-[2rem] font-bold text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center justify-center gap-2">
            <Save size={18} /> Enregistrer dans l'Écosystème
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddModal;
