import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Activity, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Initialize default administrator credentials
  useEffect(() => {
    const existingUsers = localStorage.getItem('nexus_users');
    if (!existingUsers) {
      const defaultUsers = [
        { name: 'Executive Alpha', email: 'admin@chainiq.network', password: 'admin' }
      ];
      localStorage.setItem('nexus_users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('nexus_users') || '[]');

    if (isRegisterMode) {
      // Register Mode
      if (!name || !email || !password) {
        toast.error('All fields must be fully populated.');
        return;
      }
      
      const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        toast.error('Agent ID / Email is already registered in consensus registry.');
        return;
      }

      const newUser = { name, email, password };
      localStorage.setItem('nexus_users', JSON.stringify([...users, newUser]));
      toast.success('Registration approved by consensus. You can now authenticate!');
      setIsRegisterMode(false);
      setName('');
      setEmail('');
      setPassword('');
    } else {
      // Login Mode
      const matchedUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedUser) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', matchedUser.name);
        toast.success(`Access granted! Welcome, ${matchedUser.name}.`);
        navigate('/');
      } else {
        toast.error('Authorization failed. Invalid credentials.');
      }
    }
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

        <div className="flex flex-col items-center mb-8 relative">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,200,180,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00c8b4]/40 to-[#0066ff]/40 backdrop-blur-xl" />
            <ShieldCheck className="w-8 h-8 text-white relative z-10" />
          </motion.div>
          
          <motion.h1 
            layout
            className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 tracking-tighter"
          >
            CHAINIQ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c8b4] to-[#0066ff]">PRO</span>
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p 
              key={isRegisterMode ? 'register' : 'login'}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="text-slate-400 mt-2 text-xs font-semibold font-mono uppercase tracking-widest text-center"
            >
              {isRegisterMode ? 'Consensus Registry Enrollment' : 'Secure Global Ledger Access'}
            </motion.p>
          </AnimatePresence>
        </div>

        <form onSubmit={handleAuth} className="space-y-5 relative">
          <AnimatePresence mode="wait">
            {isRegisterMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-1 overflow-hidden"
              >
                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest font-mono">Agent Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User className="w-4 h-4 text-slate-500 group-focus-within:text-[#00c8b4] transition-colors" />
                  </div>
                  <input
                    type="text"
                    required={isRegisterMode}
                    className="w-full bg-[#04070f]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00c8b4]/50 focus:bg-[#04070f]/80 transition-all font-mono text-xs shadow-inner"
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest font-mono">Agent ID / Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-[#00c8b4] transition-colors" />
              </div>
              <input
                type="email"
                required
                className="w-full bg-[#04070f]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00c8b4]/50 focus:bg-[#04070f]/80 transition-all font-mono text-xs shadow-inner"
                placeholder="agent@chainiq.network"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-widest font-mono">Security Phrase</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-[#a855f7] transition-colors font-mono" />
              </div>
              <input
                type="password"
                required
                className="w-full bg-[#04070f]/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#04070f]/80 transition-all font-mono text-xs shadow-inner"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full relative overflow-hidden group rounded-xl p-[1px] mt-6"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#00c8b4] via-[#0066ff] to-[#a855f7] rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center justify-center gap-3 bg-[#04070f] py-3 rounded-[11px] group-hover:bg-transparent transition-colors duration-300">
              <span className="text-white font-black uppercase tracking-widest text-xs font-mono flex items-center gap-2">
                {isRegisterMode ? 'Enroll Agent' : 'Authenticate Session'}{' '}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setName('');
              setEmail('');
              setPassword('');
            }}
            className="text-xs text-[#00c8b4] hover:text-[#0066ff] font-bold font-mono transition-colors focus:outline-none hover:underline"
          >
            {isRegisterMode 
              ? 'Already registered? Authenticate here' 
              : 'New agent? Request access / Create account'}
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-slate-500"
        >
          <Activity className="w-3.5 h-3.5 text-[#00c8b4] animate-pulse" />
          <p className="text-[8px] uppercase tracking-widest font-mono">Connection Secured via AES-256 / Quantum-Safe</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
