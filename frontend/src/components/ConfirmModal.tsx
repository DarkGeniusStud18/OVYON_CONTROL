import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { feedback } from '../utils/feedback';

const ConfirmModal = () => {
  const { confirmModal, closeConfirmModal } = useStore();

  if (!confirmModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-6 bg-[#0A0B10]/95 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-surface border border-white/10 w-full max-w-sm rounded-[2.5rem] p-8 space-y-6 relative shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-display font-black text-white">{confirmModal.title}</h3>
            <p className="text-sm text-gray-400">{confirmModal.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => { feedback.tap(); closeConfirmModal(); }}
            className="py-4 rounded-2xl bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <X size={16} /> Annuler
          </button>
          <button 
            onClick={() => { 
              feedback.tap();
              confirmModal.onConfirm(); 
              closeConfirmModal(); 
            }}
            className="py-4 rounded-2xl bg-red-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
          >
            <Check size={16} /> Confirmer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
