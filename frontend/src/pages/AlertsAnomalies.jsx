import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertOctagon, 
  ShieldAlert, 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Zap,
  Info
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AlertsAnomalies = () => {
  const [filter, setFilter] = useState('ALL');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const initialAlerts = [
      { id: 1, type: 'Temperature Breach', severity: 'CRITICAL', confidence: 98, shipment: 'SHP-2026-1182', node: 'Rotterdam_L7', time: '2m ago', desc: 'Container #C-884 reported +28°C against +4°C threshold.' },
      { id: 2, type: 'Demand Spike', severity: 'HIGH', confidence: 94, shipment: 'Electronics SKU', node: 'Asia_Predictor', time: '14m ago', desc: 'Unusual 45% demand increase detected in South-East sector.' },
      { id: 3, type: 'Route Delay', severity: 'MEDIUM', confidence: 82, shipment: 'SHP-2026-0992', node: 'Suez_Oracles', time: '1h ago', desc: 'Current ETA exceeds smart contract threshold by 12 hours.' },
      { id: 4, type: 'Node Offline', severity: 'CRITICAL', confidence: 100, shipment: 'System Infrastructure', node: 'Mumbai_Consensus', time: '3h ago', desc: 'Network node failed to sign the last 3 block proposals.' }
    ];
    setAlerts(initialAlerts);

    const interval = setInterval(() => {
      const types = ['Package Tampering', 'Customs Hold', 'Latency Spike', 'Validation Failure'];
      const severities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
      const newAlert = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        confidence: Math.floor(Math.random() * 30) + 70,
        shipment: 'SHP-2026-' + (Math.floor(Math.random() * 9000) + 1000),
        node: 'Edge_Node_' + Math.floor(Math.random() * 99),
        time: 'Just now',
        desc: 'Heuristic analysis flagged unusual data pattern in edge node stream.'
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    toast.success('Alert Acknowledged & Logged to Blockchain');
  };

  const filteredAlerts = alerts.filter(a => filter === 'ALL' || a.severity === filter);

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Critical', data: [4, 7, 3, 8, 5, 2, 6], backgroundColor: '#ef4444' },
      { label: 'High', data: [12, 15, 8, 22, 14, 9, 18], backgroundColor: '#f59e0b' },
      { label: 'Medium', data: [25, 30, 22, 45, 28, 15, 32], backgroundColor: '#0066ff' }
    ]
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: 'Syne' }}>Alert Intelligence</h1>
          <p className="text-sm text-slate-500 font-mono">Neural-network anomaly detection with cryptographic audit trails</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-card px-6 py-3 flex items-center gap-3">
              <Zap className="w-4 h-4 text-[#00c8b4]" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono">94.8% Auto-Resolved</span>
           </div>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Incidents', value: '1,284', icon: Activity, color: 'text-white' },
           { label: 'Critical Open', value: '12', icon: AlertOctagon, color: 'text-red-400' },
           { label: 'Avg Resp Time', value: '14.2m', icon: Clock, color: 'text-[#00c8b4]' },
           { label: 'ML Confidence', value: '98.2%', icon: ShieldAlert, color: 'text-[#0066ff]' }
         ].map((stat, i) => (
           <div key={i} className="glass-card p-6 border-white/5">
              <div className="flex justify-between items-center mb-4">
                 <stat.icon className={`w-5 h-5 ${stat.color}`} />
                 <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-white font-mono">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* ALERT FEED */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-black text-white uppercase tracking-tighter">Live Anomaly Stream</h2>
               <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                  {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-lg text-[9px] font-black tracking-widest transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                      {f}
                    </button>
                  ))}
               </div>
            </div>
            <div className="space-y-4">
               <AnimatePresence mode="popLayout">
                  {filteredAlerts.map((alert) => (
                    <motion.div 
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass-card p-6 border-l-4 group"
                      style={{ borderLeftColor: alert.severity === 'CRITICAL' ? '#ef4444' : alert.severity === 'HIGH' ? '#f59e0b' : '#0066ff' }}
                    >
                       <div className="flex justify-between items-start mb-4">
                          <div className="space-y-1">
                             <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-black uppercase tracking-widest font-mono ${alert.severity === 'CRITICAL' ? 'text-red-400' : 'text-slate-400'}`}>
                                   {alert.severity} Incident
                                </span>
                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                <span className="text-[10px] font-bold text-slate-500 font-mono">{alert.time}</span>
                             </div>
                             <h3 className="text-lg font-black text-white tracking-tighter uppercase">{alert.type}</h3>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">ML Confidence</p>
                             <div className="flex items-center gap-2">
                                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-[#00c8b4]" style={{ width: `${alert.confidence}%` }} />
                                </div>
                                <span className="text-[10px] font-black text-[#00c8b4] font-mono">{alert.confidence}%</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-2xl">{alert.desc}</p>
                       <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex gap-8">
                             <div>
                                <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Impacted SKU/Shipment</p>
                                <p className="text-[10px] text-white font-mono font-bold tracking-tight">{alert.shipment}</p>
                             </div>
                             <div>
                                <p className="text-[8px] font-bold text-slate-600 uppercase mb-1">Origin Node</p>
                                <p className="text-[10px] text-white font-mono font-bold tracking-tight">{alert.node}</p>
                             </div>
                          </div>
                          <div className="flex gap-3">
                             <button onClick={() => handleAcknowledge(alert.id)} className="px-5 py-2 bg-[#00c8b4]/10 text-[#00c8b4] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#00c8b4]/20 transition-all">
                                Acknowledge
                             </button>
                             <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                                <ChevronRight className="w-5 h-5" />
                             </button>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         </div>

         {/* TREND CHART */}
         <div className="space-y-8">
            <div className="glass-card p-8">
               <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8">Incident Trends</h2>
               <div className="h-[300px]">
                  <Bar 
                    data={barData} 
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

            <div className="glass-card p-8 bg-indigo-500/5 border-indigo-500/20">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                     <Info className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-black text-white text-sm uppercase tracking-tighter">AI Resolution Engine</h4>
                     <p className="text-[10px] text-slate-500 font-mono mt-1">Autonomous protocol is active</p>
                  </div>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">
                  The resolution engine has automatically handled 84.2% of low-severity anomalies today by rerouting logistics data through alternative validator nodes.
               </p>
               <button className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all border border-white/5">
                  View Automation Logs
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AlertsAnomalies;
