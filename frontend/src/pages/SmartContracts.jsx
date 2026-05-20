import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Plus, 
  X, 
  CheckCircle2, 
  Activity,
  ArrowUpRight,
  Code2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler 
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const SmartContracts = () => {
  const [showModal, setShowModal] = useState(false);
  const [logs, setLogs] = useState([]);
  
  const contracts = [
    { type: 'Payment Release', address: '0x4F...E8B2', status: 'ACTIVE', abi: 'v2.4.1', trigger: 'Delivery Confirmed', lastExec: '2m ago' },
    { type: 'SLA Enforcement', address: '0x88...A210', status: 'PENDING', abi: 'v1.0.2', trigger: 'Temp > 24°C', lastExec: '1h ago' },
    { type: 'Dispute Resolution', address: '0x12...C441', status: 'EXECUTED', abi: 'v2.1.0', trigger: 'Delay > 48h', lastExec: '12m ago' },
    { type: 'Quality Verification', address: '0x99...F992', status: 'ACTIVE', abi: 'v3.0.0', trigger: 'Lab Result Received', lastExec: '34s ago' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        contract: contracts[Math.floor(Math.random() * contracts.length)].type,
        action: ['TRIGGER_FIRED', 'FUNDS_RELEASED', 'PENALTY_APPLIED', 'STATE_UPDATED'][Math.floor(Math.random() * 4)],
        gas: (Math.random() * 0.5).toFixed(3) + ' ETH',
        time: new Date().toLocaleTimeString()
      };
      setLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = (e) => {
    e.preventDefault();
    const t = toast.loading('Compiling Solidity & Deploying to Network...');
    setTimeout(() => {
      toast.success('Contract Deployed to 0x' + Math.random().toString(16).slice(2, 10).toUpperCase(), { id: t });
      setShowModal(false);
    }, 2500);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: 'Syne' }}>Smart Contracts</h1>
          <p className="text-sm text-slate-500 font-mono">Autonomous logic execution via EVM-compatible decentralized infrastructure</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-3">
           <Plus className="w-5 h-5" />
           Deploy New Contract
        </button>
      </div>

      {/* CONTRACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {contracts.map((contract, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="glass-card p-8 space-y-6 group hover:border-[#00c8b4]/50"
           >
              <div className="flex justify-between items-start">
                 <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#00c8b4] group-hover:bg-[#00c8b4]/10 transition-all">
                    <Code2 className="w-6 h-6" />
                 </div>
                 <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${contract.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                    {contract.status}
                 </span>
              </div>
              <div>
                 <h3 className="text-lg font-black text-white font-mono leading-none mb-2">{contract.type}</h3>
                 <p className="text-[10px] text-slate-500 font-mono">ADDRESS: {contract.address}</p>
              </div>
              <div className="space-y-3 pt-4 border-t border-white/5">
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-600 uppercase">Trigger</span>
                    <span className="text-[10px] text-[#00c8b4] font-mono font-bold tracking-tighter">{contract.trigger}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-600 uppercase">ABI Version</span>
                    <span className="text-[10px] text-white font-mono">{contract.abi}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-bold text-slate-600 uppercase">Last Exec</span>
                    <span className="text-[10px] text-slate-500 font-mono">{contract.lastExec}</span>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* EXECUTION TIMELINE */}
         <div className="lg:col-span-2 glass-card p-8">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Contract Execution Timeline</h2>
            <div className="h-[350px]">
               <Line 
                 data={{
                   labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                   datasets: [{
                     label: 'Executions',
                     data: [12, 19, 15, 25, 22, 30, 28],
                     borderColor: '#00c8b4',
                     backgroundColor: 'rgba(0, 200, 180, 0.1)',
                     fill: true,
                     tension: 0.4
                   }]
                 }} 
                 options={{ 
                    maintainAspectRatio: false,
                    scales: { 
                      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } } },
                      x: { grid: { display: false }, ticks: { color: '#64748b', font: { family: 'Space Mono', size: 10 } } }
                    },
                    plugins: { legend: { display: false } }
                 }} 
               />
            </div>
         </div>

         {/* LIVE LOG */}
         <div className="glass-card p-8 flex flex-col h-[474px]">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center justify-between">
               Execution Log
               <Activity className="w-5 h-5 text-[#00c8b4] animate-pulse" />
            </h2>
            <div className="flex-1 space-y-4 overflow-hidden">
               <AnimatePresence initial={false}>
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-white/5 rounded-xl border border-white/5"
                    >
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-black text-[#00c8b4] font-mono uppercase tracking-widest">{log.action}</span>
                          <span className="text-[9px] text-slate-500 font-mono">{log.time}</span>
                       </div>
                       <div className="flex justify-between items-end">
                          <p className="text-[11px] text-white font-bold">{log.contract}</p>
                          <p className="text-[9px] text-slate-600 font-mono">GAS: {log.gas}</p>
                       </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>
      </div>

      {/* DEPLOY MODAL */}
      <AnimatePresence>
         {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#04070f]/90 backdrop-blur-md">
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="glass-card p-10 w-full max-w-lg space-y-8 border-[#00c8b4]/30 shadow-[0_0_50px_rgba(0,200,180,0.1)]"
               >
                  <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-black text-white uppercase tracking-tighter">New Smart Contract</h2>
                     <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-all">
                        <X className="w-6 h-6" />
                     </button>
                  </div>
                  <form onSubmit={handleDeploy} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Contract Template</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-[#00c8b4]/50 transition-all font-mono text-xs text-white appearance-none">
                           <option>Payment Release (Escrow)</option>
                           <option>SLA Performance Penalty</option>
                           <option>Multi-Party Dispute Resolver</option>
                           <option>Automated Quality Audit</option>
                        </select>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">EVM Version</label>
                           <input type="text" value="London / 0.8.19" disabled className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none font-mono text-xs text-slate-500" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Trigger Type</label>
                           <input type="text" value="ORACLE_EVENT" disabled className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 outline-none font-mono text-xs text-slate-500" />
                        </div>
                     </div>
                     <button className="btn-primary w-full py-5 text-sm">Initiate Deployment</button>
                  </form>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default SmartContracts;
