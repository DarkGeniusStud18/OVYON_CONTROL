import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bluetooth, Nfc, Loader2, CheckCircle2, X, Signal, Smartphone, Info } from 'lucide-react';
import { useStore } from '../store/useStore';

import { feedback } from '../utils/feedback';

const PairingModal = () => {
  const { isPairing, setPairing, pairingStatus, setPairingStatus, discoveredDevices, setDiscoveredDevices } = useStore();

  useEffect(() => {
    if (isPairing && pairingStatus === 'scanning') {
      feedback.tap();
      const timer = setTimeout(() => {
        setDiscoveredDevices([
          { id: 'esp32_lights_01', name: 'OVYON-LIGHTS-A1', rssi: -45, type: 'light' },
          { id: 'esp32_plugs_02', name: 'OVYON-PLUGS-B2', rssi: -62, type: 'plug' },
          { id: 'esp32_door_01', name: 'OVYON-ACCESS-DOOR', rssi: -78, type: 'door' },
        ]);
        setPairingStatus('list');
        feedback.notify();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isPairing, pairingStatus, setDiscoveredDevices, setPairingStatus]);

  const handleSelect = (device: any) => {
    feedback.tap();
    setPairingStatus('success');
    feedback.success();
    setTimeout(() => {
      setPairing(false);
      setPairingStatus('idle');
    }, 3000);
  };

  if (!isPairing) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#0A0B10]/95 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-surface border border-white/10 w-full max-w-md rounded-[3rem] p-8 space-y-8 relative overflow-hidden shadow-2xl"
      >
        <button onClick={() => setPairing(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <AnimatePresence mode="wait">
              {pairingStatus === 'scanning' && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="relative"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                  />
                  <div className="bg-primary/10 p-6 rounded-full border border-primary/20">
                    <Bluetooth size={40} className="text-primary animate-pulse" />
                  </div>
                </motion.div>
              )}

              {pairingStatus === 'list' && (
                <motion.div key="list" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-cyan-500/10 p-6 rounded-full border border-cyan-500/20">
                  <Smartphone size={40} className="text-cyan-400" />
                </motion.div>
              )}

              {pairingStatus === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="bg-green-500/10 p-6 rounded-full border border-green-500/20"
                >
                  <CheckCircle2 size={40} className="text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-display font-black text-white">
              {pairingStatus === 'scanning' && 'Recherche BLE/NFC...'}
              {pairingStatus === 'list' && 'Appareils Détectés'}
              {pairingStatus === 'success' && 'Configuration Terminée'}
            </h3>
            <p className="text-sm text-gray-400 px-4">
              {pairingStatus === 'scanning' && 'Approchez votre smartphone ou activez le Bluetooth.'}
              {pairingStatus === 'list' && 'Veuillez sélectionner l\'appareil OVYON à configurer.'}
              {pairingStatus === 'success' && 'L\'équipement a été lié avec succès à votre écosystème.'}
            </p>
          </div>

          {pairingStatus === 'list' && (
            <motion.div 
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="w-full space-y-3 mt-4"
            >
              {discoveredDevices.map((device) => (
                <motion.button
                  key={device.id}
                  variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(device)}
                  className="w-full flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                      <Bluetooth size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-white/90">{device.name}</p>
                      <p className="text-[10px] font-black uppercase text-gray-500">{device.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <Signal size={12} />
                    <span className="text-[10px] font-bold">{device.rssi}dBm</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {pairingStatus === 'scanning' && (
            <div className="flex gap-1.5 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div key={i} animate={{ scaleY: [1, 2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }} className="w-1 h-3 bg-primary rounded-full" />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PairingModal;
