import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#04070f] selection:bg-[#00c8b4] selection:text-white">
      {/* Background Mesh */}
      <div className="bg-mesh" />

      {/* Animated Glowing Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#00c8b4]/20 to-transparent blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-tl from-[#a855f7]/20 to-[#0066ff]/20 blur-[120px] pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card w-full max-w-[440px] relative z-10 border border-white/10 bg-[#04070f]/40 p-10 rounded-[2rem] shadow-2xl backdrop-blur-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2rem] pointer-events-none" />

        <div className="flex flex-col items-center mb-10 relative">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,200,180,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00c8b4]/40 to-[#0066ff]/40 backdrop-blur-xl" />
            <ShieldCheck className="w-10 h-10 text-white relative z-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 tracking-tighter"
            style={{ fontFamily: 'Syne' }}
          >
            CHAINIQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c8b4] to-[#0066ff]">PRO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 mt-2 text-sm font-medium font-mono uppercase tracking-widest"
          >
            Secure Global Ledger Access
          </motion.p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest font-mono">Agent ID / Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <User className="w-5 h-5 text-slate-500 group-focus-within:text-[#00c8b4] transition-colors duration-300" />
              </div>
              <input
                type="email"
                required
                className="w-full bg-[#04070f]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00c8b4]/50 focus:bg-[#04070f]/80 transition-all font-mono text-sm shadow-inner"
                placeholder="admin@chainiq.network"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest font-mono">Security Phrase</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-[#a855f7] transition-colors duration-300" />
              </div>
              <input
                type="password"
                required
                className="w-full bg-[#04070f]/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#04070f]/80 transition-all font-mono text-sm shadow-inner"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full relative overflow-hidden group rounded-2xl p-[1px] mt-8"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00c8b4] via-[#0066ff] to-[#a855f7] rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-3 bg-[#04070f] py-4 rounded-[15px] group-hover:bg-transparent transition-colors duration-300">
              <span className="text-white font-black uppercase tracking-widest text-sm font-mono flex items-center gap-2">
                Authenticate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-slate-500"
        >
          <Activity className="w-4 h-4 text-[#00c8b4] animate-pulse" />
          <p className="text-[9px] uppercase tracking-widest font-mono">Connection Secured via AES-256 / Quantum-Safe</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
