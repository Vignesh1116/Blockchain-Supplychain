import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  MapPin, 
  Thermometer, 
  CheckCircle, 
  Clock,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';
import AddProductModal from '../components/AddProductModal';

const ShipmentTracker = () => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [shipments, setShipments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const generateShipments = () => {
      const origins = ['Shanghai', 'Mumbai', 'Rotterdam', 'Singapore', 'London'];
      const dests = ['Chicago', 'São Paulo', 'Lagos', 'Berlin', 'New York'];
      const statuses = ['IN_TRANSIT', 'AT_CUSTOMS', 'DELAYED', 'DELIVERED'];
      
      return Array.from({ length: 12 }, (_, i) => ({
        id: `SHP-${2026}-${Math.floor(Math.random() * 90000) + 10000}`,
        origin: origins[Math.floor(Math.random() * origins.length)],
        destination: dests[Math.floor(Math.random() * dests.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        eta: Math.floor(Math.random() * 10) + 2 + ' Days',
        temp: (18 + Math.random() * 5).toFixed(1),
        verified: true,
        progress: Math.floor(Math.random() * 100),
        txHash: '0x' + Math.random().toString(16).slice(2, 20).toUpperCase() + '...'
      }));
    };

    setShipments(generateShipments());

    const interval = setInterval(() => {
      setShipments(prev => prev.map(s => {
        if (s.status === 'DELIVERED') return s;
        const newProgress = Math.min(100, s.progress + Math.random() * 2);
        return { 
          ...s, 
          progress: newProgress,
          temp: (18 + Math.random() * 5).toFixed(1),
          status: newProgress === 100 ? 'DELIVERED' : s.status
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const t = toast.loading('Exporting to IPFS...');
    setTimeout(() => {
      toast.success('Data pinned to IPFS CID: Qm...XyZ', { id: t });
    }, 2000);
  };

  const filtered = shipments.filter(s => {
    const matchesFilter = filter === 'ALL' || s.status === filter;
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || 
                          s.destination.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter" style={{ fontFamily: 'Syne' }}>Shipment Logistics</h1>
          <p className="text-sm text-slate-500 font-mono">Real-time status tracking via decentralized oracle network</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setIsModalOpen(true)} className="glass-card px-6 py-3 flex items-center gap-3 text-xs font-bold text-white bg-[#00c8b4]/10 border border-[#00c8b4]/30 hover:bg-[#00c8b4]/20 hover:scale-105 transition-all">
              <Plus className="w-4 h-4 text-[#00c8b4]" />
              ADD PRODUCT
           </button>
           <button onClick={handleExport} className="glass-card px-6 py-3 flex items-center gap-3 text-xs font-bold text-white hover:bg-white/5 transition-all">
              <Download className="w-4 h-4 text-slate-300" />
              Export
           </button>
        </div>
      </div>

      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(newShipment) => setShipments([newShipment, ...shipments])} 
      />

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00c8b4] transition-colors" />
            <input 
              type="text" 
              placeholder="Search Shipment ID or Destination..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-6 outline-none focus:border-[#00c8b4]/30 focus:bg-white/10 transition-all font-mono text-xs text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
            {['ALL', 'IN_TRANSIT', 'DELAYED', 'DELIVERED'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${filter === f ? 'bg-[#00c8b4] text-white shadow-lg shadow-[#00c8b4]/20' : 'text-slate-500 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
         </div>
      </div>

      {/* SHIPMENT TABLE */}
      <div className="glass-card overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-[#04070f]/80 text-left border-b border-white/5">
                  <tr>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Shipment ID</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Origin → Destination</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Current Status</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Transit Stats</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Blockchain Trust</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((s) => (
                      <motion.tr 
                        key={s.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/5 transition-colors group"
                      >
                         <td className="px-8 py-6">
                            <span className="text-sm font-black text-white font-mono">{s.id}</span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="text-xs">
                                  <p className="font-bold text-white">{s.origin}</p>
                                  <p className="text-[10px] text-slate-500 font-mono mt-1">L-NOD_47</p>
                               </div>
                               <div className="flex-1 h-px bg-white/10 w-8 relative">
                                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 bg-[#00c8b4] rounded-full shadow-[0_0_8px_#00c8b4]" />
                               </div>
                               <div className="text-xs text-right">
                                  <p className="font-bold text-white">{s.destination}</p>
                                  <p className="text-[10px] text-slate-500 font-mono mt-1">R-NOD_12</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${s.status === 'IN_TRANSIT' ? 'bg-[#00c8b4] animate-pulse' : s.status === 'DELAYED' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                               <span className={`text-[10px] font-black font-mono tracking-widest ${s.status === 'DELAYED' ? 'text-red-400' : 'text-slate-300'}`}>
                                  {s.status}
                               </span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="w-48">
                               <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                     <Thermometer className="w-3 h-3 text-[#a855f7]" />
                                     <span className="text-[10px] font-bold text-[#a855f7] font-mono">{s.temp}°C</span>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-500 font-mono">{Math.floor(s.progress)}%</span>
                               </div>
                               <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-gradient-to-r from-[#00c8b4] to-[#0066ff]"
                                    animate={{ width: `${s.progress}%` }}
                                  />
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex flex-col gap-1">
                               <div className="flex items-center gap-2">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#00c8b4]" />
                                  <span className="text-[10px] font-bold text-white font-mono uppercase tracking-tighter">VERIFIED</span>
                               </div>
                               <span className="text-[9px] text-slate-600 font-mono">{s.txHash}</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-600 hover:text-white transition-all">
                               <MoreVertical className="w-4 h-4" />
                            </button>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ShipmentTracker;
