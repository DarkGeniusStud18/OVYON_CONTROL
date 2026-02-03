import React from 'react';
import { motion } from 'framer-motion';
import { Target, Rocket, Users, ShieldCheck, Globe } from 'lucide-react';

const Vision = () => {
  return (
    <div className="space-y-8 py-4">
      <header className="space-y-2">
        <h2 className="text-3xl font-display font-black italic">Vision OVYON</h2>
        <p className="text-primary text-sm font-bold uppercase tracking-widest">L'avenir de la domotique en Afrique</p>
      </header>

      <div className="space-y-4">
        <div className="bg-surface/40 p-6 rounded-[2rem] border border-white/5 space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Target size={24} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Mission</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Démocratiser la maison intelligente en Afrique avec des solutions accessibles, 
            fonctionnant sans internet et parlant nos langues locales (Fon, Yoruba, Wolof, etc.).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5 space-y-2">
            <Rocket className="text-accent" size={20} />
            <h4 className="font-bold text-xs uppercase tracking-wider">Scalabilité</h4>
            <p className="text-[10px] text-gray-500 italic">Du simple studio aux smart cities africaines.</p>
          </div>
          <div className="bg-white/[0.02] p-5 rounded-3xl border border-white/5 space-y-2">
            <ShieldCheck className="text-green-500" size={20} />
            <h4 className="font-bold text-xs uppercase tracking-wider">Sécurité</h4>
            <p className="text-[10px] text-gray-500 italic">Protection des données locale et souveraine.</p>
          </div>
        </div>

        <div className="bg-primary/10 p-6 rounded-[2rem] border border-primary/20">
          <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
            <Globe size={14} className="text-primary" />
            Impact Social
          </h3>
          <p className="text-sm text-gray-300">
            Intégration prévue avec les systèmes d'irrigation intelligents pour l'agriculture 
            urbaine et le suivi de santé à domicile.
          </p>
        </div>
      </div>

      <div className="py-10 text-center space-y-2">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Projet de Soutenance</p>
        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Licence 3 - Système Informatique et Logiciels</p>
      </div>
    </div>
  );
};

export default Vision;
