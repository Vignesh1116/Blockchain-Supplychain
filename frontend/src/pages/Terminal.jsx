import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Cpu, Zap, Database, Shield, ChevronRight } from 'lucide-react';

const Terminal = () => {
  const [logs, setLogs] = useState([
    { type: 'system', text: 'Initializing Nexus Terminal v4.0.2...' },
    { type: 'system', text: 'Establishing secure handshake with Mainnet Node Alpha-1...' },
    { type: 'success', text: 'Connection encrypted via Quantum-Safe SHA-512.' },
    { type: 'info', text: 'Synchronizing local ledger segment #9021...' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLogs = [...logs, { type: 'cmd', text: `nexus@alpha-1:~$ ${input}` }];
    
    // Simple command simulation
    const cmd = input.toLowerCase();
    if (cmd === 'help') {
      newLogs.push({ type: 'info', text: 'Available commands: help, status, sync, scan, clear, deploy --asset' });
    } else if (cmd === 'status') {
      newLogs.push({ type: 'success', text: 'SYSTEM_STATUS: NOMINAL | UPTIME: 142:09:22 | LATENCY: 2.4ms' });
    } else if (cmd === 'clear') {
      setLogs([{ type: 'system', text: 'Terminal cleared.' }]);
      setInput('');
      return;
    } else {
      newLogs.push({ type: 'error', text: `Command not found: ${cmd}. Type 'help' for options.` });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            AETHER <span className="text-nexus-neon-amber">SOVEREIGN</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Civilization Shell</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-panel px-4 py-2 border-nexus-neon-cyan/30 flex items-center gap-3">
              <Cpu size={16} className="text-nexus-neon-cyan animate-pulse" />
              <span className="text-[10px] font-mono text-nexus-neon-cyan uppercase">Kernel: 5.14.0-NEXUS</span>
           </div>
        </div>
      </div>

      <div className="flex-1 glass-panel bg-slate-950/80 border-nexus-border/50 flex flex-col overflow-hidden rounded-3xl relative">
        {/* Decorative scanline */}
        <div className="absolute inset-0 pointer-events-none hologram-effect opacity-10"></div>
        
        {/* Terminal Header */}
        <div className="h-10 bg-white/5 border-b border-white/10 px-6 flex items-center justify-between">
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-nexus-neon-rose/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-nexus-neon-amber/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-nexus-neon-emerald/50"></div>
           </div>
           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">nexus@alpha-1 ~ tty1</span>
        </div>

        {/* Log Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 font-nexus-mono text-xs space-y-2 overflow-y-auto custom-scrollbar"
        >
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 leading-relaxed ${
                log.type === 'success' ? 'text-nexus-neon-emerald' : 
                log.type === 'error' ? 'text-nexus-neon-rose' : 
                log.type === 'cmd' ? 'text-white font-bold' : 
                log.type === 'info' ? 'text-nexus-neon-cyan' : 'text-slate-400'
              }`}
            >
              <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <p className="break-all">{log.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <form 
          onSubmit={handleCommand}
          className="h-14 bg-white/5 border-t border-white/10 px-6 flex items-center gap-3 focus-within:bg-white/10 transition-colors"
        >
          <ChevronRight size={18} className="text-nexus-neon-cyan animate-pulse" />
          <input 
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' for system commands..."
            className="flex-1 bg-transparent border-none outline-none text-nexus-neon-cyan font-nexus-mono text-xs placeholder:text-slate-600"
          />
          <div className="flex items-center gap-4 text-slate-500">
             <Zap size={14} className="hover:text-nexus-neon-cyan cursor-pointer transition-colors" />
             <Database size={14} className="hover:text-nexus-neon-purple cursor-pointer transition-colors" />
             <Shield size={14} className="hover:text-nexus-neon-rose cursor-pointer transition-colors" />
          </div>
        </form>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Network Sync', color: 'nexus-neon-cyan', icon: Zap },
           { label: 'Audit Logs', color: 'nexus-neon-purple', icon: Database },
           { label: 'Security Scan', color: 'nexus-neon-rose', icon: Shield },
           { label: 'Node Health', color: 'nexus-neon-emerald', icon: Cpu }
         ].map((item, i) => (
           <button key={i} className="glass-panel p-4 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-4 group">
              <div className={`p-2 rounded-lg bg-${item.color}/10 group-hover:scale-110 transition-transform`}>
                 <item.icon size={18} className={`text-${item.color}`} />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.label}</span>
           </button>
         ))}
      </div>
    </div>
  );
};

export default Terminal;
