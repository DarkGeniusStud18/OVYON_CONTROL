import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, Delete, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { feedback } from '../utils/feedback';
import { toast } from 'react-hot-toast';

const PinModal = () => {
  const { isPinModalOpen, setPinModalOpen, setAdminMode } = useStore();
  const [pin, setPin] = useState('');
  const correctPin = "1234";

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      feedback.tap();
      setPin(prev => prev + num);
    }
  };

  const handleDelete = () => {
    feedback.tap();
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin === correctPin) {
      feedback.success();
      setAdminMode(true);
      toast.success("Accès Administrateur Accordé");
      setPinModalOpen(false);
      setPin('');
    } else {
      feedback.error();
      toast.error("Code PIN incorrect");
      setPin('');
    }
  };

  if (!isPinModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#0A0B10]/95 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-surface border border-white/10 w-full max-w-sm rounded-[3rem] p-8 space-y-8 relative shadow-2xl"
      >
        <button 
          onClick={() => { setPinModalOpen(false); setPin(''); }} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-500">
            <ShieldCheck size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">Accès Sécurisé</h3>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Entrez le code PIN Admin</p>
          </div>
        </div>

        {/* PIN Display */}
        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                pin.length > i ? 'bg-primary border-primary scale-125 shadow-[0_0_10px_#FF6B35]' : 'border-white/10'
              }`} 
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="h-16 rounded-2xl bg-white/5 border border-white/5 text-xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleNumberClick('0')}
            className="h-16 rounded-2xl bg-white/5 border border-white/5 text-xl font-bold text-white hover:bg-white/10 active:scale-95 transition-all"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 active:scale-95 transition-all"
          >
            <Delete size={20} />
          </button>
        </div>

        <button 
          disabled={pin.length < 4}
          onClick={handleSubmit}
          className={`w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
            pin.length === 4 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-800 text-gray-500'
          }`}
        >
          <CheckCircle2 size={16} /> Valider l'identité
        </button>
      </motion.div>
    </div>
  );
};

export default PinModal;
