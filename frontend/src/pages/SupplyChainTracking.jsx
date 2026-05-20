import React, { useState } from 'react';
import { 
  MapPin, 
  Truck, 
  Box, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  Navigation,
  Plus,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SupplyChainTracking = () => {
  const [activeShipments, setActiveShipments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product: '', origin: '', destination: '', eta: '', status: 'In Transit' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newShipment = {
      id: `SHP-${Math.floor(Math.random() * 9000) + 1000}`,
      product: form.product,
      origin: form.origin,
      destination: form.destination,
      status: form.status,
      eta: form.eta,
      progress: 0,
      steps: [
        { name: 'Manufacturing', done: false },
        { name: 'Port Clearance', done: false },
        { name: 'In Transit', done: false },
        { name: 'Delivered', done: false },
      ]
    };
    setActiveShipments([newShipment, ...activeShipments]);
    setForm({ product: '', origin: '', destination: '', eta: '', status: 'In Transit' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setActiveShipments(activeShipments.filter(s => s.id !== id));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Global Asset Tracking</h1>
          <p className="text-slate-400">See exactly where your products are and their security status in real-time.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="glass-card px-4 py-3 flex items-center gap-3">
            <Truck className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Active Routes</p>
              <p className="text-lg font-bold">{activeShipments.length}</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 py-3 px-5 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Shipment
          </button>
        </div>
      </div>

      {/* Add Shipment Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">New Shipment Entry</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-lg py-2 px-4 outline-none focus:border-indigo-500/50" placeholder="e.g. Lithium Battery" value={form.product} onChange={e => setForm({...form, product: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Origin</label>
                <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-lg py-2 px-4 outline-none focus:border-indigo-500/50" placeholder="City, Country" value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination</label>
                <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-lg py-2 px-4 outline-none focus:border-indigo-500/50" placeholder="City, Country" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">ETA</label>
                <input required type="text" className="w-full bg-white/5 border border-white/5 rounded-lg py-2 px-4 outline-none focus:border-indigo-500/50" placeholder="e.g. 3 Days" value={form.eta} onChange={e => setForm({...form, eta: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                <select className="w-full bg-white/5 border border-white/5 rounded-lg py-2 px-4 outline-none focus:border-indigo-500/50" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option>In Transit</option>
                  <option>Customs Check</option>
                  <option>Awaiting Pickup</option>
                  <option>Delivered</option>
                </select>
              </div>
              <div className="flex items-end">
                <button type="submit" className="btn-primary w-full py-2">Add to Ledger</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Global Network Map */}
        <div className="xl:col-span-2 glass-card relative overflow-hidden group min-h-[500px] bg-slate-950/40">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                {/* Simplified World Map Paths */}
                <path d="M150,100 Q200,80 250,120 T350,100 T450,150 T550,120 T650,180 T750,140 T850,200" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500/30" />
                <path d="M100,250 Q150,230 200,270 T300,250 T400,300 T500,270 T600,330 T700,290 T800,350" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500/30" />
                
                {/* Connection Lines */}
                <motion.path 
                  d="M200,150 L500,200 L800,120" 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="1" 
                  strokeDasharray="5,5"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M150,300 L400,280 L700,350" 
                  fill="none" 
                  stroke="#ec4899" 
                  strokeWidth="1" 
                  strokeDasharray="5,5"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: 100 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Nodes */}
                {[
                  { x: 200, y: 150, label: 'NYC_HUB' },
                  { x: 500, y: 200, label: 'BERLIN_PORT' },
                  { x: 800, y: 120, label: 'TOKYO_CENTER' },
                  { x: 150, y: 300, label: 'SAO_PAULO' },
                  { x: 700, y: 350, label: 'SYDNEY_BASE' }
                ].map((node, i) => (
                  <g key={i}>
                    <circle cx={node.x} cy={node.y} r="3" className="fill-primary-500 shadow-lg shadow-primary-500/50" />
                    <circle cx={node.x} cy={node.y} r="8" className="stroke-primary-500/30 fill-none animate-ping" style={{ animationDuration: '3s' }} />
                    <text x={node.x + 10} y={node.y + 4} className="fill-slate-500 text-[8px] font-bold font-mono uppercase tracking-tighter">{node.label}</text>
                  </g>
                ))}
             </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 p-8 flex flex-col h-full justify-between">
             <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-xl font-bold flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-primary-500" />
                      Global Topology Map
                   </h3>
                   <p className="text-xs text-slate-500 font-mono mt-1">SATELLITE_LINK_ACTIVE // VECTORS_LOCKED</p>
                </div>
                <div className="flex gap-2">
                   <span className="glass-card px-2 py-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10">12 ASSETS_IN_RANGE</span>
                   <span className="glass-card px-2 py-1 text-[10px] font-bold text-primary-400 bg-primary-500/10">ENCRYPTED_FEED</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'NORTH AMERICA', status: 'All Clear', latency: '24ms', color: 'emerald' },
                  { label: 'EUROPE', status: 'High Traffic', latency: '142ms', color: 'amber' },
                  { label: 'ASIA', status: 'Check Required', latency: '310ms', color: 'red' }
                ].map((zone, i) => (
                  <div key={i} className="glass-card p-4 border-l-4" style={{ borderColor: `var(--${zone.color}-500)` }}>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{zone.label}</p>
                    <div className="flex justify-between items-end mt-1">
                       <span className={`text-sm font-black text-${zone.color}-400`}>{zone.status}</span>
                       <span className="text-[10px] font-mono opacity-50">{zone.latency}</span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Shipment List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold px-1">Active Shipments</h2>
          {activeShipments.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Truck className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p className="font-semibold text-slate-400">No active shipments</p>
              <p className="text-xs mt-1 text-slate-500">Click "Add Shipment" above to create your first record</p>
            </div>
          ) : (
            <AnimatePresence>
              {activeShipments.map((shipment, i) => (
                <motion.div 
                  key={shipment.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6 space-y-4 hover:border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold flex items-center gap-2 group-hover:text-indigo-400 transition-colors">
                        {shipment.id} <ChevronRight className="w-4 h-4 text-slate-600" />
                      </h4>
                      <p className="text-sm text-slate-400">{shipment.product}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                        {shipment.status}
                      </span>
                      <button onClick={() => handleDelete(shipment.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {shipment.origin}
                    </div>
                    <div className="w-12 h-[1px] bg-white/10" />
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                      {shipment.destination}
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="text-xs text-slate-500">ETA: <span className="text-indigo-400 font-bold">{shipment.eta}</span></div>

                  <div className="grid grid-cols-4 gap-1 pt-2">
                    {shipment.steps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full border-2 ${step.done ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'border-white/10'}`} />
                        <span className="text-[8px] text-slate-500 text-center leading-tight">{step.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTracking;
