import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Database, 
  MapPin, 
  Calendar, 
  User, 
  Plus, 
  Search,
  CheckCircle2,
  FileText,
  Hexagon,
  Fingerprint,
  Zap,
  Box,
  Layers,
  Cpu,
  QrCode
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductRegistration = () => {
  const [product, setProduct] = useState({
    name: '',
    batchNumber: '',
    origin: '',
    manufacturer: '',
    category: 'Electronics',
    productionDate: new Date().toISOString().split('T')[0]
  });

  const [registeredProducts, setRegisteredProducts] = useState([]);
  const [isMinting, setIsMinting] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Generate some initial dummy data
    const initial = Array.from({ length: 5 }).map((_, i) => ({
      id: `PRD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: ['Lithium Ion Cell', 'Quantum Processor v4', 'Optical Sensor Module', 'Titanium Alloy Casing', 'Navigation Unit'][i],
      batch: `BCH-${Math.floor(100 + Math.random() * 900)}`,
      origin: ['Shenzhen, CN', 'Austin, TX', 'Tokyo, JP', 'Berlin, DE', 'Seoul, KR'][i],
      manufacturer: 'TechCorp Global',
      category: 'Electronics',
      status: 'Blockchain Verified',
      hash: '0x' + Math.random().toString(16).slice(2, 12).toUpperCase(),
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0]
    }));
    setRegisteredProducts(initial);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!product.name || !product.batchNumber || !product.origin || !product.manufacturer) {
      toast.error('Please fill in all details to mint to the ledger.');
      return;
    }

    setIsMinting(true);
    
    // Simulate Blockchain Minting Delay
    setTimeout(() => {
      const newProd = {
        id: `PRD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        name: product.name,
        batch: product.batchNumber,
        origin: product.origin,
        manufacturer: product.manufacturer,
        category: product.category,
        status: 'Blockchain Verified',
        hash: '0x' + Math.random().toString(16).slice(2, 12).toUpperCase(),
        date: product.productionDate
      };
      
      setRegisteredProducts([newProd, ...registeredProducts]);
      setIsMinting(false);
      setProduct({
        name: '',
        batchNumber: '',
        origin: '',
        manufacturer: '',
        category: 'Electronics',
        productionDate: new Date().toISOString().split('T')[0]
      });
      
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#030712] border border-[#0066ff]/30 shadow-[0_0_20px_rgba(0,102,255,0.2)] rounded-2xl p-4 flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-10 h-10 rounded-full bg-[#0066ff]/20 flex items-center justify-center border border-[#0066ff]/50">
                   <Fingerprint className="h-5 w-5 text-[#0066ff]" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white">Digital Twin Minted</p>
                <p className="mt-1 text-[11px] text-slate-400 font-mono">Hash: {newProd.hash}</p>
              </div>
            </div>
          </div>
        </div>
      ));
    }, 2000);
  };

  const filtered = registeredProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
             <QrCode className="w-8 h-8 text-[#0066ff]" />
             Asset Registration
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-mono">Initialize new physical assets into the immutable ledger.</p>
        </div>
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl backdrop-blur-sm">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#00c8b4] shadow-[0_0_8px_rgba(0,200,180,0.5)] animate-pulse" />
             <span className="text-xs font-bold text-slate-300 tracking-wider">NETWORK: SECURE</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Registration Form Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-4 space-y-6"
        >
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066ff]/10 blur-[80px] rounded-full pointer-events-none" />
             
             <div className="relative z-10">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                   <Plus className="w-5 h-5 text-[#0066ff]" />
                   Mint Digital Twin
                </h2>
                
                <form onSubmit={handleRegister} className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Box className="w-3 h-3 text-[#0066ff]" /> Product Name
                      </label>
                      <input 
                        type="text" 
                        value={product.name}
                        onChange={e => setProduct({...product, name: e.target.value})}
                        className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-[#0066ff]/50 focus:bg-[#030712] transition-all text-sm text-white"
                        placeholder="e.g. Quantum Processor v4"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Layers className="w-3 h-3 text-[#0066ff]" /> Batch Number
                         </label>
                         <input 
                           type="text" 
                           value={product.batchNumber}
                           onChange={e => setProduct({...product, batchNumber: e.target.value})}
                           className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-[#0066ff]/50 focus:bg-[#030712] transition-all text-sm text-white"
                           placeholder="BCH-849"
                         />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-[#0066ff]" /> Prod. Date
                         </label>
                         <input 
                           type="date" 
                           value={product.productionDate}
                           onChange={e => setProduct({...product, productionDate: e.target.value})}
                           className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-[#0066ff]/50 focus:bg-[#030712] transition-all text-sm text-slate-300"
                         />
                      </div>
                   </div>

                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <User className="w-3 h-3 text-[#0066ff]" /> Manufacturer
                      </label>
                      <input 
                        type="text" 
                        value={product.manufacturer}
                        onChange={e => setProduct({...product, manufacturer: e.target.value})}
                        className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-[#0066ff]/50 focus:bg-[#030712] transition-all text-sm text-white"
                        placeholder="e.g. TechCorp Global"
                      />
                   </div>

                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-[#0066ff]" /> Origin Facility
                      </label>
                      <input 
                        type="text" 
                        value={product.origin}
                        onChange={e => setProduct({...product, origin: e.target.value})}
                        className="w-full bg-[#030712]/50 border border-white/10 rounded-xl py-2.5 px-4 outline-none focus:border-[#0066ff]/50 focus:bg-[#030712] transition-all text-sm text-white"
                        placeholder="e.g. Shenzhen, CN"
                      />
                   </div>

                   <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={isMinting}
                        className="w-full relative group overflow-hidden rounded-xl py-3.5 flex justify-center border border-[#0066ff]/50"
                      >
                         <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/80 to-[#a855f7]/80 opacity-80 transition-transform duration-500 group-hover:scale-105" />
                         {isMinting ? (
                            <div className="flex items-center gap-3 relative z-10">
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                               <span className="text-xs font-bold text-white uppercase tracking-widest">Hashing to Ledger...</span>
                            </div>
                         ) : (
                            <span className="relative z-10 text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                               <Zap className="w-4 h-4" />
                               Register Asset
                            </span>
                         )}
                      </button>
                   </div>
                </form>
             </div>
          </div>

          {/* Real-time Hash Preview */}
          <div className="bg-[#030712] border border-white/5 p-5 rounded-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.05)_0%,transparent_100%)]" />
             <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest flex items-center gap-2">
                <Database className="w-3 h-3" /> Live Payload Preview
             </h4>
             <div className="p-3 bg-white/[0.02] rounded-lg font-mono text-[10px] text-slate-400 border border-white/5 overflow-hidden">
                <div className="flex justify-between mb-1">
                   <span className="text-emerald-400">"asset_id":</span> 
                   <span>"AUTO_GENERATED"</span>
                </div>
                <div className="flex justify-between mb-1">
                   <span className="text-emerald-400">"name":</span> 
                   <span className="truncate ml-2 text-white">{product.name || '...'}</span>
                </div>
                <div className="flex justify-between mb-1">
                   <span className="text-emerald-400">"batch":</span> 
                   <span className="text-white">{product.batchNumber || '...'}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 mt-2 pt-2">
                   <span className="text-blue-400">"hash_preview":</span> 
                   <span className="opacity-50">0x{btoa(product.name + product.batchNumber).slice(0,16).toLowerCase()}...</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Registered Products Ledger */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-8 space-y-6 flex flex-col"
        >
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden flex flex-col flex-1 shadow-sm">
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066ff]" />
                Immutable Asset Ledger
              </h2>
              <div className="relative w-full sm:w-64 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#0066ff] transition-colors" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#030712] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-[#0066ff]/50 text-white placeholder-slate-500 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  placeholder="Search ledger by ID or Name..."
                />
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#030712]/50 text-left border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Asset ID / Hash</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Details</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Origin</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence mode="popLayout">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-16 text-center">
                          <Hexagon className="w-12 h-12 mx-auto mb-4 text-slate-700 stroke-[1]" />
                          <p className="text-sm font-bold text-white">No Assets Found</p>
                          <p className="text-xs mt-1 text-slate-500">Mint a new asset to see it reflected in the ledger.</p>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((prod) => (
                        <motion.tr 
                          key={prod.id} 
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                        >
                          <td className="px-6 py-4">
                             <div className="flex flex-col gap-1">
                                <span className="font-mono text-xs font-bold text-white">{prod.id}</span>
                                <span className="font-mono text-[9px] text-slate-500 truncate w-32" title={prod.hash}>{prod.hash}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="text-sm font-bold text-white group-hover:text-[#0066ff] transition-colors">{prod.name}</span>
                                <div className="flex items-center gap-2 mt-1">
                                   <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">{prod.batch}</span>
                                   <span className="text-[10px] text-slate-500">{prod.date}</span>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                <div className="flex flex-col">
                                   <span className="text-xs font-medium text-slate-300">{prod.origin}</span>
                                   <span className="text-[9px] text-slate-500">{prod.manufacturer}</span>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 bg-[#00c8b4]/10 w-max px-2.5 py-1 rounded-md border border-[#00c8b4]/20">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00c8b4]" />
                              <span className="text-[10px] font-bold text-[#00c8b4] uppercase tracking-wide">
                                Verified
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductRegistration;

