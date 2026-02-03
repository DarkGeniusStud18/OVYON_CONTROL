import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const containerVariants = {
    exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0, 
      transition: { type: "spring", stiffness: 260, damping: 20 } 
    }
  };

  const letterVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const word = "OVYON".split("");

  React.useEffect(() => {
    const timer = setTimeout(onFinish, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#004E89' }}
    >
      {/* Dynamic Background Pulses */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute w-[500px] h-[500px] bg-white rounded-full blur-[120px]"
      />

      <div className="flex flex-col items-center gap-8 relative z-10">
        <motion.div 
          variants={logoVariants}
          className="p-5 bg-white rounded-[2.5rem] shadow-2xl shadow-black/20"
        >
          <Home size={64} className="text-[#FF6B35]" />
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex">
            {word.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="text-6xl font-black tracking-tighter text-white"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 0.8, letterSpacing: "0.4em" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-sm font-bold text-white uppercase ml-2"
          >
            Control
          </motion.p>
        </div>
      </div>

      {/* Bottom Loading Indicator */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.5, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-20 h-1 bg-white/20 rounded-full overflow-hidden"
      >
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-full h-full bg-primary"
        />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;