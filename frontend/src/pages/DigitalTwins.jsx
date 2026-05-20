import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Database, 
  Activity, 
  History, 
  ShieldCheck, 
  Zap, 
  Thermometer, 
  Navigation,
  ExternalLink,
  Search,
  Filter,
  Layers,
  HeartPulse
} from 'lucide-react';

const AssetCard = ({ asset, onClick, active }) => (
  <motion.div
    layout
    onClick={onClick}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`glass-panel p-5 cursor-pointer transition-all duration-300 border-l-4 ${active ? 'border-nexus-neon-cyan bg-nexus-neon-cyan/5' : 'border-nexus-border hover:border-nexus-primary/50'}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-xl">
        <Box size={24} className={active ? 'text-nexus-neon-cyan' : 'text-slate-400'} />
      </div>
      <div className="text-right">
        <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${asset.status === 'In-Transit' ? 'bg-nexus-neon-cyan/20 text-nexus-neon-cyan' : 'bg-nexus-neon-emerald/20 text-nexus-neon-emerald'}`}>
          {asset.status}
        </div>
        <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">ID: {asset.id}</p>
      </div>
    </div>
    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-nexus-neon-cyan transition-colors">{asset.name}</h3>
    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{asset.category}</p>
    
    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
       <div className="flex items-center gap-2">
          <HeartPulse size={12} className="text-nexus-neon-emerald" />
          <span className="text-[10px] font-bold text-nexus-neon-emerald uppercase">Health: {asset.health}%</span>
       </div>
       <div className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-nexus-neon-cyan" />
          <span className="text-[8px] text-slate-500 uppercase">Verified</span>
       </div>
    </div>
  </motion.div>
);

const DigitalTwins = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets] = useState([
    { id: 'AX-1029', name: 'Neural Core Alpha', category: 'High-End Electronics', status: 'In-Transit', health: 98, location: 'Singapore Hub', origin: 'Berlin', dest: 'Tokyo', temp: '22.4°C', humidity: '45%' },
    { id: 'AX-1030', name: 'Bio-Synth Reagent', category: 'Pharmaceuticals', status: 'Warehouse', health: 100, location: 'Hub-Frankfurt', origin: 'Zurich', dest: 'New York', temp: '4.1°C', humidity: '12%' },
    { id: 'AX-1031', name: 'Titanium Shell V3', category: 'Heavy Industry', status: 'In-Transit', health: 85, location: 'Pacific Route 4', origin: 'Osaka', dest: 'Los Angeles', temp: '18.2°C', humidity: '65%' },
    { id: 'AX-1032', name: 'Quantum Sensor G2', category: 'Research Gear', status: 'In-Transit', health: 99, location: 'London Gateway', origin: 'Oxford', dest: 'Seoul', temp: '20.1°C', humidity: '40%' },
  ]);

  if (!selectedAsset && assets.length > 0) {
    setSelectedAsset(assets[0]);
  }

  return (
    <div className="space-y-8 pb-12 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            SOVEREIGN <span className="text-nexus-neon-amber">TWINS</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Civilization Sovereignty</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Filter Assets..." 
              className="bg-white/5 border border-nexus-border/50 rounded-full py-2 pl-10 pr-6 text-xs focus:outline-none focus:border-nexus-primary/50 w-64"
            />
          </div>
          <button className="p-2 glass-panel hover:bg-white/5 rounded-lg transition-colors">
            <Filter size={16} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Asset List Sidebar */}
        <div className="lg:col-span-1 space-y-4 overflow-y-auto custom-scrollbar pr-2 h-full">
           <AnimatePresence>
             {assets.map((asset) => (
               <AssetCard 
                  key={asset.id} 
                  asset={asset} 
                  onClick={() => setSelectedAsset(asset)}
                  active={selectedAsset?.id === asset.id}
               />
             ))}
           </AnimatePresence>
        </div>

        {/* Digital Twin Simulation Detail */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2">
           {selectedAsset && (
             <>
               {/* Primary Hero Visualization */}
               <div className="glass-panel p-8 bg-gradient-to-br from-nexus-neon-cyan/5 to-transparent relative overflow-hidden min-h-[300px]">
                  <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                     <Layers className="text-nexus-neon-cyan animate-pulse" size={120} />
                  </div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-black text-white tracking-tighter uppercase">{selectedAsset.name}</span>
                        <div className="px-3 py-1 bg-nexus-neon-emerald/20 border border-nexus-neon-emerald/40 rounded-full">
                          <span className="text-[10px] font-bold text-nexus-neon-emerald uppercase tracking-widest">Active Sync</span>
                        </div>
                      </div>
                      <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Identity: 0x8a92b2c1d3e4f5g6h7i8j9k0</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                          onClick={() => navigate('/monitoring')}
                          className="nexus-button text-xs py-2"
                        >
                           <Navigation size={14} />
                           Live Tracking
                        </button>
                       <button className="p-2 glass-panel hover:bg-white/5 rounded-xl transition-all">
                          <ExternalLink size={18} className="text-slate-400" />
                       </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 relative z-10">
                     {[
                       { label: 'Current Location', value: selectedAsset.location, icon: Navigation, color: '#06b6d4' },
                       { label: 'Ambient Temp', value: selectedAsset.temp, icon: Thermometer, color: '#f43f5e' },
                       { label: 'Transit Phase', value: '4/6', icon: Activity, color: '#8b5cf6' },
                       { label: 'Trust Integrity', value: '99.9%', icon: ShieldCheck, color: '#10b981' }
                     ].map((item, i) => (
                       <div key={i} className="space-y-1">
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon size={14} style={{ color: item.color }} />
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</span>
                          </div>
                          <p className="text-xl font-nexus-display font-bold text-white">{item.value}</p>
                       </div>
                     ))}
                  </div>

                  {/* Telemetry Sparklines Placeholder */}
                  <div className="mt-12 h-24 w-full flex items-end gap-1">
                     {[...Array(50)].map((_, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         animate={{ height: `${Math.random() * 100}%` }}
                         transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse', delay: i * 0.02 }}
                         className="flex-1 bg-nexus-neon-cyan/20 rounded-t-sm"
                       />
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lifecycle History */}
                  <div className="glass-panel p-6">
                     <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <History className="text-nexus-neon-purple" size={20} />
                        Blockchain Provenance
                     </h3>
                     <div className="space-y-6 relative ml-4">
                        <div className="absolute top-0 bottom-0 left-[-17px] w-[2px] bg-white/5"></div>
                        {[
                          { event: 'Departure Verified', time: '2026-05-12 14:20', loc: 'Berlin Hub' },
                          { event: 'Condition Check', time: '2026-05-12 18:45', loc: 'Transit-Air' },
                          { event: 'Intermediary Scan', time: '2026-05-13 09:12', loc: 'Singapore Gateway' }
                        ].map((step, i) => (
                          <div key={i} className="relative">
                             <div className="absolute left-[-22px] top-1.5 w-3 h-3 rounded-full bg-nexus-neon-purple shadow-[0_0_8px_rgba(139,92,246,1)]"></div>
                             <p className="text-xs font-bold text-white uppercase">{step.event}</p>
                             <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-slate-500 font-mono">{step.time}</span>
                                <span className="text-[10px] text-nexus-neon-cyan font-bold">{step.loc}</span>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* AI Health Diagnostics */}
                  <div className="glass-panel p-6 flex flex-col">
                     <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <Database className="text-nexus-neon-emerald" size={20} />
                        Neural Diagnostics
                     </h3>
                     <div className="space-y-4 flex-1">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Transit Stability</span>
                              <span className="text-xs text-nexus-neon-emerald font-mono">98% Optimal</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="w-[98%] h-full bg-nexus-neon-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                           </div>
                        </div>
                        
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Condition Integrity</span>
                              <span className="text-xs text-nexus-neon-cyan font-mono">Nominal</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="w-[100%] h-full bg-nexus-neon-cyan shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                           </div>
                        </div>
                     </div>
                     <button className="mt-6 w-full nexus-button text-[10px] py-2 border-nexus-neon-emerald/40 text-nexus-neon-emerald">
                        <Zap size={14} />
                        Re-calibrate Sensors
                     </button>
                  </div>
               </div>
             </>
           )}
        </div>
      </div>
    </div>
  );
};

export default DigitalTwins;
