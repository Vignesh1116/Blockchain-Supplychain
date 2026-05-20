import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Activity,
  Crosshair,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip
} from 'recharts';

const threatData = [
  { subject: 'DDoS', A: 120, B: 110, fullMark: 150 },
  { subject: 'Injection', A: 98, B: 130, fullMark: 150 },
  { subject: 'MITM', A: 86, B: 130, fullMark: 150 },
  { subject: 'Sybil', A: 99, B: 100, fullMark: 150 },
  { subject: 'Tampering', A: 85, B: 90, fullMark: 150 },
  { subject: 'Spoofing', A: 65, B: 85, fullMark: 150 },
];

const trafficData = [
  { time: '00:00', load: 30 },
  { time: '04:00', load: 45 },
  { time: '08:00', load: 25 },
  { time: '12:00', load: 90 }, // Potential spike
  { time: '16:00', load: 40 },
  { time: '20:00', load: 35 },
];

const CyberSecurity = () => {
  const [isLockedDown, setIsLockedDown] = useState(false);
  const [activeThreats, setActiveThreats] = useState([
    { id: 'T-802', type: 'Node Misbehavior', origin: '192.168.1.42', severity: 'High', status: 'Mitigating' },
    { id: 'T-805', type: 'Signature Mismatch', origin: 'Edge_Hub_Sydney', severity: 'Medium', status: 'Investigating' },
  ]);

  const [logs, setLogs] = useState([
    { status: 'PASS', text: 'Auth session verified for User: Admin_01', type: 'emerald' },
    { status: 'WARN', text: 'Port scanning detected from 45.12.33.102', type: 'rose' },
    { status: 'INFO', text: 'Rotating encryption keys for Block #402129', type: 'slate' },
    { status: 'PASS', text: 'Smart Contract MD5 hash match confirmed', type: 'emerald' },
    { status: 'BLKD', text: 'Suspicious payload blocked by Neural Firewall', type: 'rose' },
    { status: 'INFO', text: 'Peer-to-peer node handshake complete (12 nodes)', type: 'slate' },
    { status: 'PASS', text: 'No tampering detected in Ledger segment #92', type: 'emerald' },
    { status: 'INFO', text: 'Routine vulnerability scan: 0 threats found', type: 'slate' },
  ]);

  const handleLockdown = () => {
    const nextState = !isLockedDown;
    setIsLockedDown(nextState);
    if (nextState) {
      // Lockdown activated
      setActiveThreats(prev => prev.map(t => ({ ...t, status: 'CONTAINED', severity: 'Low' })));
      setLogs(prev => [
        { status: 'CRIT', text: 'EMERGENCY PROTOCOL: GLOBAL NETWORK LOCKDOWN INITIALIZED!', type: 'rose' },
        ...prev
      ]);
    } else {
      // Lockdown deactivated
      setActiveThreats(prev => [
        { id: 'T-802', type: 'Node Misbehavior', origin: '192.168.1.42', severity: 'High', status: 'Mitigating' },
        { id: 'T-805', type: 'Signature Mismatch', origin: 'Edge_Hub_Sydney', severity: 'Medium', status: 'Investigating' },
      ]);
      setLogs(prev => [
        { status: 'INFO', text: 'Emergency lockdown lifted. Re-routing consensus peers...', type: 'emerald' },
        ...prev
      ]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            SOVEREIGN <span className="text-nexus-neon-rose">DEFENSE</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Civilization Shield</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleLockdown}
            className={`nexus-button text-xs transition-all ${isLockedDown ? 'border-nexus-neon-emerald/40 text-nexus-neon-emerald bg-nexus-neon-emerald/10' : 'border-nexus-neon-rose/40 text-nexus-neon-rose'}`}
          >
            {isLockedDown ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
            {isLockedDown ? 'Deactivate Lockdown' : 'Initialize Lockdown'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isLockedDown && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl bg-nexus-neon-rose/10 border border-nexus-neon-rose/30 shadow-[0_0_25px_rgba(244,63,94,0.2)] flex items-center justify-between text-white"
          >
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-nexus-neon-rose animate-pulse" size={20} />
              <div>
                <h4 className="text-xs font-bold font-nexus-display tracking-widest uppercase text-nexus-neon-rose">Emergency Lockdown Active</h4>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">Autonomous firewalls active. All inbound external node ingress ports are closed.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Topology Radar */}
        <div className="glass-panel p-8 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <Crosshair className="text-nexus-neon-rose" size={20} />
            Security Radar
          </h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={threatData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="Current Risk"
                  dataKey="A"
                  stroke="#f43f5e"
                  fill="#f43f5e"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Baseline"
                  dataKey="B"
                  stroke="#38bdf8"
                  fill="#38bdf8"
                  fillOpacity={0.1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="p-3 glass-panel bg-nexus-neon-rose/5 border-nexus-neon-rose/20 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Defense Index</p>
                <p className="text-xl font-nexus-display font-bold text-nexus-neon-rose">
                  {isLockedDown ? '100.0%' : '94.2%'}
                </p>
             </div>
             <div className="p-3 glass-panel bg-nexus-neon-cyan/5 border-nexus-neon-cyan/20 rounded-xl">
                <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Node Trust</p>
                <p className="text-xl font-nexus-display font-bold text-nexus-neon-cyan">
                  {isLockedDown ? 'SECURED' : 'Optimal'}
                </p>
             </div>
          </div>
        </div>

        {/* Live Attack Map/Feed */}
        <div className="lg:col-span-2 glass-panel p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-5 cyber-grid"></div>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <Activity className="text-nexus-neon-cyan" size={20} />
            Real-Time Intrusion Detection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="h-48 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={trafficData}>
                     <Area 
                        type="step" 
                        dataKey="load" 
                        stroke="#f43f5e" 
                        fill="#f43f5e" 
                        fillOpacity={0.1} 
                        strokeWidth={2}
                      />
                     <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          border: '1px solid rgba(244, 63, 94, 0.3)',
                          borderRadius: '12px',
                          fontSize: '10px'
                        }}
                      />
                   </AreaChart>
                 </ResponsiveContainer>
                 <p className="text-center text-[10px] text-slate-500 font-mono mt-2 uppercase tracking-widest">Network Anomaly Vector</p>
               </div>

               <div className="space-y-4">
                  {activeThreats.map((threat, i) => (
                    <div key={i} className="p-4 glass-panel border-nexus-neon-rose/30 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-2 bg-nexus-neon-rose/10 rounded-lg">
                             <AlertTriangle size={18} className="text-nexus-neon-rose" />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-white uppercase">{threat.type}</p>
                             <p className="text-[10px] text-slate-500 font-mono">Origin: {threat.origin}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold text-nexus-neon-rose uppercase">{threat.severity} Severity</p>
                          <p className="text-[10px] text-nexus-neon-cyan animate-pulse uppercase">{threat.status}...</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-panel bg-black/40 p-6 flex flex-col font-nexus-mono text-[10px]">
               <div className="flex items-center gap-2 mb-4 text-nexus-neon-cyan">
                  <Fingerprint size={16} />
                  <span className="uppercase tracking-widest">Security Subsystem Logs</span>
               </div>
               <div className="flex-1 space-y-2 text-slate-400 overflow-y-auto max-h-[350px] custom-scrollbar pr-2">
                  {logs.map((log, idx) => (
                     <p key={idx}>
                       <span className={log.type === 'emerald' ? 'text-nexus-neon-emerald' : log.type === 'rose' ? 'text-nexus-neon-rose' : 'text-slate-600'}>
                         [{log.status}]
                       </span>{' '}
                       {log.text}
                     </p>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zero-Trust Architecture Visualizer */}
      <div className="glass-panel p-8 border-nexus-neon-emerald/20">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <ShieldCheck className="text-nexus-neon-emerald" size={24} />
                  Zero-Trust Identity Mesh
               </h2>
               <p className="text-xs text-slate-500 font-mono uppercase mt-1">Autonomous Verification of Every Transaction</p>
            </div>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 glass-panel border-nexus-neon-emerald/30 text-center"
              >
                <div className="w-10 h-10 bg-nexus-neon-emerald/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                   <Lock size={20} className={isLockedDown ? "text-nexus-neon-rose animate-pulse" : "text-nexus-neon-emerald"} />
                </div>
                <p className={isLockedDown ? "text-[10px] font-bold text-nexus-neon-rose uppercase tracking-tighter" : "text-[10px] font-bold text-white uppercase tracking-tighter"}>
                  {isLockedDown ? "NODE_LOCKED" : "NODE_VERIFIED"}
                </p>
                <p className="text-[8px] text-slate-500 font-mono mt-1">ID: 0x8A22...{i}</p>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default CyberSecurity;
