import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Thermometer, 
  Navigation,
  Sparkles,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    origin: '',
    destination: '',
    tempThreshold: '20',
    batchId: `BATCH-${Math.floor(Math.random() * 100000)}`,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Blockchain Consensus & AI Registration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success('Asset Cryptographically Registered on Mainnet!');
      
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          category: 'Electronics',
          origin: '',
          destination: '',
          tempThreshold: '20',
          batchId: `BATCH-${Math.floor(Math.random() * 100000)}`,
        });
      }, 3000);
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full flex flex-col space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            SOVEREIGN <span className="text-nexus-neon-amber">REGISTRATION</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Civilization Enrollment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        {/* Registration Form */}
        <div className="lg:col-span-2 glass-panel p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5 cyber-grid"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Asset Name</label>
                <div className="relative group">
                  <Box className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-nexus-neon-cyan transition-colors" size={18} />
                  <input 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. Neural Processor X1" 
                    className="w-full bg-white/5 border border-nexus-border/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-nexus-neon-cyan/50 focus:ring-1 focus:ring-nexus-neon-cyan/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category Classification</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-nexus-border/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-nexus-neon-cyan/50 transition-all appearance-none cursor-pointer"
                >
                  <option>Electronics</option>
                  <option>Pharmaceuticals</option>
                  <option>Heavy Industry</option>
                  <option>Aerospace</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Origin Node</label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    required
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. Hub-Berlin" 
                    className="w-full bg-white/5 border border-nexus-border/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-nexus-neon-cyan/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Destination Node</label>
                <div className="relative">
                  <ArrowRight className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    required
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. Tokyo-Central" 
                    className="w-full bg-white/5 border border-nexus-border/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-nexus-neon-cyan/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Temperature Threshold (°C)</label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    name="tempThreshold"
                    value={formData.tempThreshold}
                    onChange={handleChange}
                    type="number" 
                    className="w-full bg-white/5 border border-nexus-border/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-nexus-neon-cyan/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Batch ID</label>
                <div className="relative">
                  <Database className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    readOnly
                    value={formData.batchId}
                    type="text" 
                    className="w-full bg-white/5 border border-nexus-border/50 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-400 font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={loading}
                className="w-full nexus-button py-4 text-sm group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 size={20} className="animate-spin text-nexus-neon-cyan" />
                    <span>Propagating to Nodes...</span>
                  </div>
                ) : success ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-nexus-neon-emerald" />
                    <span>Deployment Successful</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles size={18} />
                    <span>Initialize Asset Deployment</span>
                  </div>
                )}
                
                {/* Progress bar simulation for loading state */}
                {loading && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4 }}
                    className="absolute bottom-0 left-0 h-1 bg-nexus-neon-cyan shadow-[0_0_10px_rgba(6,182,212,1)]"
                  />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Blueprint Visualization Placeholder */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <div className="glass-panel p-6 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 hologram-effect opacity-20 pointer-events-none"></div>
             
             <AnimatePresence mode="wait">
               {loading ? (
                 <motion.div
                   key="loading-v"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.2 }}
                   className="text-center space-y-4"
                 >
                    <div className="w-32 h-32 border-4 border-nexus-neon-cyan/20 border-t-nexus-neon-cyan rounded-full animate-spin mx-auto flex items-center justify-center">
                       <Cpu size={48} className="text-nexus-neon-cyan animate-pulse" />
                    </div>
                    <p className="text-xs font-mono text-nexus-neon-cyan animate-pulse uppercase tracking-[0.3em]">Hashing SHA256...</p>
                 </motion.div>
               ) : success ? (
                 <motion.div
                   key="success-v"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-center space-y-4"
                 >
                    <div className="w-32 h-32 bg-nexus-neon-emerald/10 rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                       <ShieldCheck size={64} className="text-nexus-neon-emerald" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tighter">SECURED</h3>
                      <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">Transaction 0x9a22... verified</p>
                    </div>
                 </motion.div>
               ) : (
                 <motion.div
                   key="idle-v"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="text-center space-y-6"
                 >
                    <div className="w-32 h-32 border-2 border-dashed border-nexus-border rounded-full mx-auto flex items-center justify-center opacity-40">
                       <Box size={48} className="text-slate-400" />
                    </div>
                    <div className="space-y-2 px-8">
                       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Blueprint Ready</h3>
                       <p className="text-[10px] text-slate-500 font-mono leading-relaxed uppercase">
                          Waiting for asset parameters to initialize neural-blockchain anchoring.
                       </p>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="glass-panel p-6 bg-nexus-neon-cyan/5 border-nexus-neon-cyan/20">
             <h3 className="text-xs font-bold text-nexus-neon-cyan uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={14} />
                Network Intelligence
             </h3>
             <ul className="space-y-3">
                {[
                  'Automatic Route Assignment',
                  'IoT Sensor Pairing: Enabled',
                  'AI Risk Baseline: Calculating...',
                  'Blockchain Node Priority: 1 (High)'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] text-slate-400 font-mono uppercase">
                     <div className="w-1 h-1 rounded-full bg-nexus-neon-cyan"></div>
                     {text}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
