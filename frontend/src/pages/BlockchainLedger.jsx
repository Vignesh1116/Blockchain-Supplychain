import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Hash, 
  Zap, 
  ChevronRight, 
  Search,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const BlockchainLedger = () => {
  const [blocks, setBlocks] = useState([]);
  const [isMining, setIsMining] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);

  const generateBlock = (prevHash = '0x0000000000000000000000000000000000000000000000000000000000000000') => {
    return {
      number: 847293 + blocks.length,
      timestamp: new Date().toISOString(),
      prevHash,
      hash: '0x' + Math.random().toString(16).slice(2, 34).toUpperCase() + Math.random().toString(16).slice(2, 34).toUpperCase(),
      merkleRoot: '0x' + Math.random().toString(16).slice(2, 34).toUpperCase(),
      nonce: Math.floor(Math.random() * 1000000),
      difficulty: 4.8,
      txns: [
        { id: 'tx_01', type: 'PAYMENT', value: '$12,400', from: 'Node_Shanghai', to: 'Node_Mumbai' },
        { id: 'tx_02', type: 'SHIPMENT_VERIFY', value: 'SHP-2026-4412', from: 'Node_Rotterdam', to: 'Node_Chicago' },
        { id: 'tx_03', type: 'SMART_CONTRACT', value: 'SLA_ENFORCE', from: 'Contract_0x4F', to: 'Oracle_A7' }
      ],
      miner: 'Cluster_Alpha_' + Math.floor(Math.random() * 99),
      gasUsed: (Math.random() * 2).toFixed(2) + 'M',
      size: (Math.random() * 50 + 20).toFixed(1) + ' KB'
    };
  };

  useEffect(() => {
    // Initial chain
    const initial = [];
    let lastHash = '0x0000000000000000000000000000000000000000000000000000000000000000';
    for(let i=0; i<4; i++) {
      const b = generateBlock(lastHash);
      b.number = 847289 + i;
      initial.push(b);
      lastHash = b.hash;
    }
    setBlocks(initial.reverse());
  }, []);

  useEffect(() => {
    const mineInterval = setInterval(() => {
      setIsMining(true);
      setMiningProgress(0);
      
      const step = 2;
      const progressTimer = setInterval(() => {
        setMiningProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            setIsMining(false);
            const newBlock = generateBlock(blocks[0]?.hash);
            setBlocks(prevBlocks => [newBlock, ...prevBlocks].slice(0, 10));
            toast.success(`Block #${newBlock.number} Mined Successfully`, {
              icon: '⛏️',
              className: 'verified-badge text-white font-bold'
            });
            return 100;
          }
          return prev + step;
        });
      }, 100);
    }, 6000);

    return () => clearInterval(mineInterval);
  }, [blocks]);

  const verifyHash = (blockNum) => {
    const t = toast.loading(`Verifying cryptographic hash for Block #${blockNum}...`);
    setTimeout(() => {
      toast.success('Hash Integrity Validated ✓', { id: t });
    }, 1500);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: 'Syne' }}>Ledger Explorer</h1>
          <p className="text-sm text-slate-500 font-mono">Immutable audit trail of all global logistics and smart contract events</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass-card px-6 py-3 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isMining ? 'bg-amber-500 animate-pulse' : 'bg-[#00c8b4]'}`} />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono">
                {isMining ? 'Mining Block...' : 'Consensus Active'}
              </span>
           </div>
        </div>
      </div>

      {/* MINING STATUS BAR */}
      <AnimatePresence>
        {isMining && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-6 border-amber-500/20 bg-amber-500/5"
          >
             <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                   <Cpu className="w-5 h-5 text-amber-500 animate-spin" />
                   <p className="text-xs font-black text-amber-500 uppercase tracking-widest font-mono">Processing Consensus Algorithm (Proof of Authority 2.0)</p>
                </div>
                <p className="text-xs font-bold text-amber-500 font-mono">{miningProgress}%</p>
             </div>
             <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full mining-progress"
                  style={{ width: `${miningProgress}%` }}
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HORIZONTAL CHAIN VIEW */}
      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
         {blocks.slice().reverse().map((block, i) => (
           <React.Fragment key={block.number}>
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="min-w-[320px] glass-card p-6 border-white/5 hover:border-[#00c8b4]/30 cursor-pointer group"
               onClick={() => verifyHash(block.number)}
             >
                <div className="flex justify-between items-start mb-4">
                   <span className="text-xs font-black text-[#00c8b4] font-mono tracking-tighter">BLOCK #{block.number}</span>
                   <ShieldCheck className="w-4 h-4 text-[#00c8b4] opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-4">
                   <div>
                      <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Block Hash</p>
                      <p className="text-[10px] text-white font-mono break-all leading-tight">{block.hash.substring(0, 32)}...</p>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                         <Hash className="w-3 h-3 text-slate-500" />
                         <span className="text-[10px] text-slate-400 font-mono">{block.txns.length} TXNS</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase">{block.size}</span>
                   </div>
                </div>
             </motion.div>
             {i < blocks.length - 1 && (
               <div className="flex items-center justify-center px-2">
                  <ArrowRight className="w-6 h-6 text-slate-800" />
               </div>
             )}
           </React.Fragment>
         ))}
      </div>

      {/* DETAILED BLOCK LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <AnimatePresence initial={false}>
            {blocks.map((block) => (
               <motion.div 
                 key={block.number}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="glass-card p-8 space-y-6"
               >
                  <div className="flex justify-between items-center">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#00c8b4]/10 rounded-2xl flex items-center justify-center border border-[#00c8b4]/20">
                           <Layers className="w-6 h-6 text-[#00c8b4]" />
                        </div>
                        <div>
                           <h3 className="text-lg font-black text-white font-mono leading-none">BLOCK #{block.number}</h3>
                           <p className="text-[10px] text-slate-500 font-mono mt-1">{block.timestamp}</p>
                        </div>
                     </div>
                     <button onClick={() => verifyHash(block.number)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                        Verify Integrity
                     </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-white/5">
                     <div>
                        <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Miner Node</p>
                        <p className="text-xs text-white font-mono font-bold tracking-tighter">{block.miner}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Gas Used</p>
                        <p className="text-xs text-emerald-400 font-mono font-bold tracking-tighter">{block.gasUsed}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Difficulty</p>
                        <p className="text-xs text-[#0066ff] font-mono font-bold tracking-tighter">{block.difficulty}</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Transactions Included</p>
                     {block.txns.map((tx, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-white/10 transition-all">
                           <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${tx.type === 'PAYMENT' ? 'bg-[#00c8b4]' : tx.type === 'SHIPMENT_VERIFY' ? 'bg-[#0066ff]' : 'bg-[#a855f7]'}`} />
                              <span className="text-[10px] font-black text-white font-mono">{tx.type}</span>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-[10px] text-slate-400 font-mono">{tx.from} → {tx.to}</span>
                              <span className="text-[10px] font-black text-white font-mono">{tx.value}</span>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="pt-4 flex flex-col gap-2">
                     <p className="text-[8px] font-bold text-slate-600 uppercase">Cryptographic Hashes</p>
                     <div className="grid grid-cols-1 gap-2">
                        <div className="p-2 bg-black/40 rounded flex items-center justify-between">
                           <span className="text-[8px] text-slate-500 uppercase font-mono tracking-widest">Hash</span>
                           <span className="text-[9px] text-[#00c8b4] font-mono truncate ml-4">{block.hash}</span>
                        </div>
                        <div className="p-2 bg-black/40 rounded flex items-center justify-between">
                           <span className="text-[8px] text-slate-500 uppercase font-mono tracking-widest">Merkle Root</span>
                           <span className="text-[9px] text-[#a855f7] font-mono truncate ml-4">{block.merkleRoot}</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default BlockchainLedger;
