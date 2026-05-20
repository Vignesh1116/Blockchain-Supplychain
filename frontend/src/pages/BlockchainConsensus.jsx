import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Activity,
  Hash,
  Share2,
  Lock,
  Box
} from 'lucide-react';

const Block = ({ block, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20, scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    className="glass-panel p-4 min-w-[280px] border-nexus-primary/30 relative !overflow-visible"
  >
    <div className="absolute -top-3 left-4 px-2 py-1 bg-nexus-primary rounded text-[9px] font-bold text-white uppercase">
      BLOCK #{block.height}
    </div>
    <div className="space-y-3 mt-2">
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>HASH:</span>
        <span className="text-nexus-neon-cyan">{block.hash.slice(0, 16)}...</span>
      </div>
      <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
        <span>PREV:</span>
        <span>{block.prevHash.slice(0, 16)}...</span>
      </div>
      <div className="h-[1px] bg-white/5 w-full"></div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400">Transactions</span>
          <span className="text-xs text-white font-bold">{block.txCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400">Validator</span>
          <span className="text-xs text-nexus-neon-purple font-mono uppercase">{block.validator}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 py-1.5 px-3 bg-nexus-neon-emerald/10 rounded-lg">
        <ShieldCheck size={12} className="text-nexus-neon-emerald" />
        <span className="text-[10px] font-bold text-nexus-neon-emerald uppercase">Consensus Reached</span>
      </div>
    </div>
  </motion.div>
);

const BlockchainConsensus = () => {
  const [blocks, setBlocks] = useState([
    { height: 402128, hash: '0000x8a92b2c1d3e4f5', prevHash: '0000x7b81a1b2c3d4e5', txCount: 142, validator: 'NODE_ALPHA' },
    { height: 402127, hash: '0000x7b81a1b2c3d4e5', prevHash: '0000x6c70z9y8x7w6v5', txCount: 89, validator: 'NODE_GAMMA' },
    { height: 402126, hash: '0000x6c70z9y8x7w6v5', prevHash: '0000x5d69q2p1o0n9m8', txCount: 204, validator: 'NODE_DELTA' },
  ]);

  const [mining, setMining] = useState(false);
  const [logs, setLogs] = useState([
    'Initializing Consensus Pulse...',
    'Synchronizing with Peer: Node_Delta',
    'Broadcasting Transaction: 0x4a92... to pool',
    'Validating Smart Contract: ASSET_REG_V2',
    'Consensus achieved on Block #402128',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${Math.random() > 0.5 ? 'Verifying block segment...' : 'Node consensus heartbeat active'}`, ...prev.slice(0, 10)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mineNewBlock = () => {
    setMining(true);
    setTimeout(() => {
      const newBlock = {
        height: blocks[0].height + 1,
        hash: '0000x' + Math.random().toString(16).slice(2, 16),
        prevHash: blocks[0].hash,
        txCount: Math.floor(Math.random() * 300),
        validator: 'NODE_ALPHA'
      };
      setBlocks([newBlock, ...blocks]);
      setMining(false);
      setLogs(prev => [`BLOCK_GENERATED: Consensus reached on Height #${newBlock.height}`, ...prev]);
    }, 3000);
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            SOVEREIGN <span className="text-nexus-neon-amber">CONSENSUS</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Ledger & Civilization Pulse</p>
        </div>
        <div className="flex gap-3">
           <div className="glass-panel px-4 py-2 border-nexus-neon-purple/30 flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold">CURRENT_DIFFICULTY</span>
                <span className="text-xs text-nexus-neon-purple font-mono">0x1F028822</span>
              </div>
              <div className="w-[1px] h-8 bg-white/5"></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold">TOTAL_HASH_RATE</span>
                <span className="text-xs text-white font-mono">1.42 EH/s</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Main Chain Visualization */}
        <div className="lg:col-span-2 glass-panel p-8 overflow-hidden relative flex flex-col">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-full cyber-grid"></div>
          </div>
          
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Box className="text-nexus-neon-cyan" size={24} />
              Mainnet Chain Explorer
            </h2>
            <button 
              onClick={mineNewBlock}
              disabled={mining}
              className={`nexus-button border-nexus-neon-purple/50 text-xs ${mining ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {mining ? (
                <>
                  <Zap size={14} className="animate-spin" />
                  Propagating Hash...
                </>
              ) : (
                <>
                  <Cpu size={14} />
                  Initiate Block Generation
                </>
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center gap-12 overflow-x-auto custom-scrollbar pt-6 pb-8 relative">
             <AnimatePresence mode="popLayout">
               {blocks.map((block, index) => (
                 <React.Fragment key={block.height}>
                   <Block block={block} />
                   {index < blocks.length - 1 && (
                     <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-[1px] bg-gradient-to-r from-nexus-primary to-transparent"></div>
                        <Lock size={12} className="text-slate-600" />
                        <div className="w-12 h-[1px] bg-gradient-to-l from-nexus-primary to-transparent"></div>
                     </motion.div>
                   )}
                 </React.Fragment>
               ))}
             </AnimatePresence>
          </div>

          {/* Node Mesh HUD */}
          <div className="mt-auto pt-8 border-t border-white/5 grid grid-cols-3 gap-6">
             {[
               { label: 'Active Nodes', value: '42', icon: Share2, color: '#06b6d4' },
               { label: 'Sync Status', value: '100%', icon: Activity, color: '#10b981' },
               { label: 'Latency', value: '2.4ms', icon: Zap, color: '#f59e0b' }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white/5">
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{item.label}</p>
                    <p className="text-lg font-nexus-display font-bold text-white">{item.value}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Console Logs */}
        <div className="glass-panel p-6 flex flex-col bg-slate-950/50 backdrop-blur-3xl border-nexus-neon-cyan/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="text-nexus-neon-cyan" size={18} />
              Live Execution Logs
            </h2>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
          </div>
          <div className="flex-1 font-nexus-mono text-[10px] space-y-3 overflow-y-auto custom-scrollbar pr-2">
            {logs.map((log, i) => (
              <div key={i} className={`flex gap-3 ${i === 0 ? 'text-nexus-neon-cyan animate-pulse' : 'text-slate-400'}`}>
                <span className="text-slate-600">[{blocks[0].height - i}]</span>
                <p className="flex-1 break-all leading-relaxed">{log}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Consensus Confidence</span>
                <span className="text-[10px] text-nexus-neon-emerald font-mono">99.999%</span>
             </div>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '99.999%' }}
                  className="h-full bg-nexus-neon-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainConsensus;
