import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Terminal, ArrowLeft, Trash2, RefreshCw, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { authenticateUser, getWebAuthnSessionToken } from '../utils/biometrics';
import { toast } from 'react-hot-toast';

const Admin = () => {
  const { adminLogs, fetchAdminLogs, setActiveTab, resetSystem } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const start = async () => {
      if (!getWebAuthnSessionToken()) {
        const ok = await authenticateUser();
        if (!ok) {
          toast.error("Session admin non déverrouillée");
          return;
        }
      }

      if (cancelled) return;
      fetchAdminLogs();
      interval = setInterval(fetchAdminLogs, 2000);
    };

    void start();
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, [fetchAdminLogs]);

  // Auto-scroll vers le bas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [adminLogs]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] space-y-4 py-4">
      {/* Header Admin */}
      <header className="px-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('settings')} 
            className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} className="text-white"/>
          </button>
          <div>
            <h2 className="text-2xl font-display font-bold text-red-500 flex items-center gap-2">
              <ShieldAlert size={24} /> Admin Console
            </h2>
            <p className="text-gray-500 text-xs font-mono tracking-widest">SYSTEM.ROOT.ACCESS</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-red-500 uppercase">Live</span>
        </div>
      </header>

      {/* Terminal Area */}
      <div className="flex-1 bg-[#0d1117] rounded-[2rem] border border-red-500/20 p-6 font-mono text-xs overflow-hidden flex flex-col shadow-2xl relative">
        {/* Scanlines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%]" />
        
        <div className="flex items-center gap-2 mb-4 text-green-500 border-b border-white/5 pb-2 relative z-10">
          <Terminal size={14} />
          <span className="opacity-50">ovyon_core@system:~$</span>
          <span className="text-white">tail -f /var/log/syslog</span>
        </div>
        
        <div className="overflow-y-auto flex-1 space-y-2 pr-2 custom-scrollbar relative z-10">
          {adminLogs.length === 0 && <p className="text-gray-600 italic">En attente de logs...</p>}
          {adminLogs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={i} 
              className="break-words border-l-2 border-white/5 pl-2"
            >
              <span className="text-gray-600 select-none">[{log.split(']')[0].replace('[', '')}]</span>
              <span className={`${log.includes('PANIQUE') || log.includes('supprimé') ? 'text-red-500 font-bold' : log.includes('enregistré') ? 'text-green-400' : 'text-blue-300'} ml-2`}>
                {log.split(']')[1]}
              </span>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="grid grid-cols-2 gap-4 px-1">
        <button 
          onClick={resetSystem}
          className="py-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
        >
          <Trash2 size={16} /> Factory Reset
        </button>
        <button 
          onClick={async () => {
            if (!getWebAuthnSessionToken()) {
              const ok = await authenticateUser();
              if (!ok) {
                toast.error("Session admin non déverrouillée");
                return;
              }
            }
            fetchAdminLogs();
          }}
          className="py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
        >
          <RefreshCw size={16} /> Refresh Logs
        </button>
      </div>
    </div>
  );
};

export default Admin;
