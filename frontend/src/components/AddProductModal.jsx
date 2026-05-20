import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, MapPin, Truck, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    productName: '',
    origin: '',
    destination: '',
    type: 'Electronics',
    eta: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.origin || !formData.destination) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call and blockchain hashing
    setTimeout(() => {
      const newShipment = {
        id: `SHP-2026-${Math.floor(Math.random() * 90000) + 10000}`,
        productName: formData.productName,
        origin: formData.origin,
        destination: formData.destination,
        status: 'IN_TRANSIT',
        eta: formData.eta || '5 Days',
        temp: (18 + Math.random() * 5).toFixed(1),
        verified: true,
        progress: 0,
        txHash: '0x' + Math.random().toString(16).slice(2, 20).toUpperCase() + '...'
      };
      
      onAdd(newShipment);
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-[#030712] border border-[#00c8b4]/30 shadow-[0_0_20px_rgba(0,200,180,0.2)] rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <CheckCircle2 className="h-10 w-10 text-[#00c8b4]" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-bold text-white">Product Successfully Minted</p>
                <p className="mt-1 text-[11px] text-slate-400 font-mono">TxHash: {newShipment.txHash}</p>
              </div>
            </div>
          </div>
        </div>
      ));
      
      setIsSubmitting(false);
      onClose();
      setFormData({ productName: '', origin: '', destination: '', type: 'Electronics', eta: '' });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] z-[101] p-6"
          >
             <div className="bg-[#0a0f1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
                {/* Glowing effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00c8b4] to-transparent" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#00c8b4]/20 blur-[50px] rounded-full pointer-events-none" />
                
                <div className="p-8 relative">
                   <div className="flex items-center justify-between mb-8">
                      <div>
                         <h2 className="text-2xl font-black text-white tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>Add Product</h2>
                         <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-2">
                           <Sparkles className="w-3 h-3 text-[#00c8b4]" />
                           Smart Contract Integration
                         </p>
                      </div>
                      <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                         <X className="w-5 h-5" />
                      </button>
                   </div>

                   <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Box className="w-3 h-3" /> Product Name
                         </label>
                         <input 
                           type="text" 
                           placeholder="e.g. Nano Circuit v3" 
                           value={formData.productName}
                           onChange={e => setFormData({...formData, productName: e.target.value})}
                           className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#00c8b4]/50 focus:bg-white/10 transition-all text-sm text-white"
                         />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <MapPin className="w-3 h-3" /> Origin Hub
                            </label>
                            <input 
                              type="text" 
                              placeholder="e.g. Shenzhen" 
                              value={formData.origin}
                              onChange={e => setFormData({...formData, origin: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#00c8b4]/50 focus:bg-white/10 transition-all text-sm text-white"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <MapPin className="w-3 h-3" /> Destination
                            </label>
                            <input 
                              type="text" 
                              placeholder="e.g. Berlin" 
                              value={formData.destination}
                              onChange={e => setFormData({...formData, destination: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#00c8b4]/50 focus:bg-white/10 transition-all text-sm text-white"
                            />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <Truck className="w-3 h-3" /> Category
                            </label>
                            <select 
                              value={formData.type}
                              onChange={e => setFormData({...formData, type: e.target.value})}
                              className="w-full bg-[#111827] border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#00c8b4]/50 focus:bg-white/10 transition-all text-sm text-white appearance-none"
                            >
                              <option>Electronics</option>
                              <option>Pharmaceuticals</option>
                              <option>Raw Materials</option>
                              <option>Automotive</option>
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <Calendar className="w-3 h-3" /> Est. Time
                            </label>
                            <input 
                              type="text" 
                              placeholder="e.g. 5 Days" 
                              value={formData.eta}
                              onChange={e => setFormData({...formData, eta: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-[#00c8b4]/50 focus:bg-white/10 transition-all text-sm text-white"
                            />
                         </div>
                      </div>

                      <div className="pt-4">
                         <button 
                           type="submit" 
                           disabled={isSubmitting}
                           className="w-full relative group overflow-hidden rounded-xl py-4 flex justify-center"
                         >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00c8b4] to-[#0066ff] transition-transform duration-300 group-hover:scale-105" />
                            {isSubmitting ? (
                               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                            ) : (
                               <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                  <Sparkles className="w-4 h-4" />
                                  Mint to Ledger
                               </span>
                            )}
                         </button>
                      </div>
                   </form>
                </div>
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;
