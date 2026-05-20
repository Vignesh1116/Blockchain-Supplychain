import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Star, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  MoreVertical,
  Activity,
  Globe,
  Award,
  AlertCircle
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import GlobalGlobe from '../components/GlobalGlobe';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SupplierNetwork = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const suppliers = [
    { rank: 1, name: 'Alpha Logistics Gmbh', country: 'Germany', reliability: 99.4, lead: 4, quality: 98, txns: 12480, trend: 'up', type: 'logistics' },
    { rank: 2, name: 'Global Circuits Inc.', country: 'Taiwan', reliability: 97.2, lead: 12, quality: 95, txns: 8420, trend: 'up', type: 'manufacturer' },
    { rank: 3, name: 'Tokyo Nanotech', country: 'Japan', reliability: 95.8, lead: 14, quality: 99, txns: 6150, trend: 'down', type: 'distributor' },
    { rank: 4, name: 'Rotterdam Shipping', country: 'Netherlands', reliability: 94.1, lead: 8, quality: 92, txns: 15900, trend: 'up', type: 'logistics' },
    { rank: 5, name: 'Mumbai Textiles Co.', country: 'India', reliability: 92.4, lead: 22, quality: 96, txns: 4200, trend: 'up', type: 'raw material' },
    { rank: 6, name: 'São Paulo Agro', country: 'Brazil', reliability: 88.5, lead: 28, quality: 91, txns: 2900, trend: 'down', type: 'raw material' }
  ];

  const radarData = {
    labels: ['Geopolitical', 'Financial', 'Quality', 'Capacity', 'Compliance', 'Cyber Risk'],
    datasets: [{
      label: 'Risk Profile (Lower is better)',
      data: [12, 19, 8, 25, 10, 15],
      backgroundColor: 'rgba(0, 200, 180, 0.2)',
      borderColor: '#00c8b4',
      pointBackgroundColor: '#00c8b4',
      borderWidth: 2
    }]
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: 'Syne' }}>Supplier Ecosystem</h1>
          <p className="text-sm text-slate-500 font-mono">Dynamic node visualization and decentralized reliability audit</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-card px-6 py-3 flex items-center gap-3">
              <Users className="w-4 h-4 text-[#00c8b4]" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono">1,248 Verified Nodes</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* NETWORK GRAPH */}
         <div className="lg:col-span-2 glass-card p-4 relative overflow-hidden h-[500px]">
            <GlobalGlobe />
         </div>

         {/* RISK ASSESSMENT */}
         <div className="glass-card p-8 flex flex-col h-[500px]">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center justify-between">
               Risk Index Audit
               <AlertCircle className="w-5 h-5 text-[#ef4444]" />
            </h2>
            <div className="flex-1 flex items-center justify-center">
               <Radar 
                 data={radarData} 
                 options={{ 
                    maintainAspectRatio: false,
                    scales: { 
                      r: { 
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        angleLines: { color: 'rgba(255,255,255,0.05)' },
                        pointLabels: { color: '#64748b', font: { family: 'Space Mono', size: 9 } },
                        ticks: { display: false }
                      } 
                    },
                    plugins: { legend: { display: false } }
                 }} 
               />
            </div>
            <div className="pt-6 border-t border-white/5">
               <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Critical Insight</p>
                  <p className="text-xs text-slate-400 font-medium">Capacity risk is elevated by 14.2% in Asian sectors due to port congestion.</p>
               </div>
            </div>
         </div>
      </div>

      {/* SUPPLIER LEADERBOARD */}
      <div className="glass-card overflow-hidden">
         <div className="px-10 py-8 border-b border-white/5">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Verified Reliability Index</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-[#04070f]/80 text-left border-b border-white/5">
                  <tr>
                     <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Rank</th>
                     <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Supplier Entity</th>
                     <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Reliability Score</th>
                     <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Avg Lead Time</th>
                     <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Quality Index</th>
                     <th className="px-10 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Blockchain Txns</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {suppliers.map((s) => (
                    <tr key={s.rank} className="hover:bg-white/5 transition-colors group">
                       <td className="px-10 py-6">
                          <span className={`text-sm font-black font-mono ${s.rank <= 3 ? 'text-[#00c8b4]' : 'text-slate-600'}`}>#0{s.rank}</span>
                       </td>
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                                <span className="text-xs font-bold text-white uppercase">{s.name.split(' ').map(n => n[0]).join('')}</span>
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                   <p className="font-bold text-white text-sm">{s.name}</p>
                                   <ShieldCheck className="w-3 h-3 text-[#00c8b4]" />
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                   <Globe className="w-3 h-3 text-slate-500" />
                                   <span className="text-[10px] text-slate-500 uppercase font-mono">{s.country}</span>
                                </div>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                             <span className="text-sm font-black text-white font-mono">{s.reliability}%</span>
                             {s.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                          </div>
                       </td>
                       <td className="px-10 py-6">
                          <span className="text-sm font-bold text-slate-400 font-mono">{s.lead} DAYS</span>
                       </td>
                       <td className="px-10 py-6">
                          <div className="flex items-center gap-1">
                             {Array.from({ length: 5 }).map((_, i) => (
                               <Star key={i} className={`w-3 h-3 ${i < Math.floor(s.quality / 20) ? 'fill-[#f59e0b] text-[#f59e0b]' : 'text-slate-700'}`} />
                             ))}
                          </div>
                       </td>
                       <td className="px-10 py-6">
                          <span className="text-sm font-black text-white font-mono">{s.txns.toLocaleString()}</span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default SupplierNetwork;
