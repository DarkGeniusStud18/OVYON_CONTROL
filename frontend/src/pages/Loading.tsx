import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[90] bg-background flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute h-full w-full rounded-full bg-primary"
          />
          <motion.div 
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20 z-10"
          >
            <Home className="text-white" size={32} />
          </motion.div>
        </div>
        <p className="text-base font-medium text-gray-500 animate-pulse">Chargement...</p>
      </div>
    </div>
  );
};

export default Loading;
