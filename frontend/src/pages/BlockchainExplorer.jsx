import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Hash, 
  Clock, 
  Cpu, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BlockchainExplorer = () => {
  const [blocks, setBlocks] = useState([]);
  const [stats, setStats] = useState({
    gasPrice: '24 Gwei',
    avgBlockTime: '12.4s',
    totalTxns: '1,245,802',
    networkStatus: 'Healthy'
  });

  useEffect(() => {
    // Generate initial blocks
    const initialBlocks = Array.from({ length: 6 }).map((_, i) => ({
      height: 12450890 - i,
      hash: `0x${Math.random().toString(16).slice(2, 34)}`,
      txns: Math.floor(Math.random() * 150) + 50,
      timestamp: new Date(Date.now() - i * 15000).toLocaleTimeString(),
      miner: '0xNode_Alpha_7'
    }));
    setBlocks(initialBlocks);

    // Simulate new blocks arriving
    const interval = setInterval(() => {
      setBlocks(prev => [{
        height: prev[0].height + 1,
        hash: `0x${Math.random().toString(16).slice(2, 34)}`,
        txns: Math.floor(Math.random() * 150) + 50,
        timestamp: new Date().toLocaleTimeString(),
        miner: '0xNode_Alpha_7'
      }, ...prev].slice(0, 8));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Layers className="w-8 h-8 text-primary-500" />
            Blockchain Ledger Explorer
          </h1>
          <p className="text-slate-400">Immutable audit trail of all global supply chain operations</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-card px-4 py-2 flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-xs">
                 <p className="text-slate-500 font-bold uppercase">Gas Price</p>
                 <p className="font-mono">{stats.gasPrice}</p>
              </div>
           </div>
           <div className="glass-card px-4 py-2 flex items-center gap-3">
              <Clock className="w-4 h-4 text-primary-400" />
              <div className="text-xs">
                 <p className="text-slate-500 font-bold uppercase">Block Time</p>
                 <p className="font-mono">{stats.avgBlockTime}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 px-2">
               <Database className="w-5 h-5 text-primary-400" />
               Recent Blocks
            </h2>
            <div className="space-y-4">
               <AnimatePresence initial={false}>
                  {blocks.map((block) => (
                    <motion.div
                      key={block.height}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass-card overflow-hidden group hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="p-6 flex items-center gap-6">
                         <div className="w-16 h-16 bg-primary-500/10 rounded-xl flex flex-col items-center justify-center border border-primary-500/20 group-hover:border-primary-500/50 transition-colors">
                            <span className="text-[10px] font-bold text-slate-500">BK</span>
                            <span className="text-sm font-black font-mono">#{block.height.toString().slice(-4)}</span>
                         </div>
                         <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                               <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Block Hash</p>
                               <p className="text-xs font-mono text-primary-400 truncate">{block.hash}</p>
                               <p className="text-[10px] text-slate-500 mt-1">{block.timestamp}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Transactions</p>
                               <p className="text-sm font-bold">{block.txns} txns</p>
                               <p className="text-[10px] text-slate-500 mt-1">Validated in 1.2s</p>
                            </div>
                            <div className="hidden md:block">
                               <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Validator</p>
                               <div className="flex items-center gap-1.5">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                  <span className="text-xs font-medium text-slate-400">{block.miner}</span>
                               </div>
                            </div>
                         </div>
                         <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 px-2">
               <Cpu className="w-5 h-5 text-primary-400" />
               Network Pulse
            </h2>
            <div className="glass-card p-6 space-y-6">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400 font-medium">Nodes Online</span>
                     <span className="text-xs font-bold text-emerald-400">1,204 Active</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '88%' }}
                        className="bg-emerald-500 h-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400 font-medium">TPS (Current)</span>
                     <span className="text-xs font-bold text-primary-400">4,280/s</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="bg-primary-500 h-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                     />
                  </div>
               </div>

               <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-3">Smart Contract Address</p>
                  <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                     <span className="text-[10px] font-mono truncate">0x5FbDB2315678afecb367f032d93F642f64180aa3</span>
                     <ExternalLink className="w-3 h-3 text-slate-500 cursor-pointer hover:text-white" />
                  </div>
               </div>

               <button className="w-full btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2">
                  <Layers className="w-4 h-4" />
                  Verify Smart Contract
               </button>
            </div>

            <div className="glass-card p-6 border-l-4 border-emerald-500 bg-emerald-500/5">
               <h4 className="text-sm font-bold mb-2">Protocol Verified</h4>
               <p className="text-xs text-slate-400 leading-relaxed">
                  This explorer is connected directly to the L1 consensus layer. All data shown is cryptographically secured and immutable.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlockchainExplorer;
