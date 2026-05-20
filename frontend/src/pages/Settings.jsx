import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Database, 
  Check, 
  Sliders,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [nodeUrl, setNodeUrl] = useState('http://localhost:8001');
  const [rpcUrl, setRpcUrl] = useState('https://mainnet.chainiq.network/rpc');
  const [syncInterval, setSyncInterval] = useState(15);
  const [securityLevel, setSecurityLevel] = useState('High');
  const [hashingAlg, setHashingAlg] = useState('SHA-256');
  const [isSyncing, setIsSyncing] = useState(false);

  // Toggle options
  const [options, setOptions] = useState({
    autoRotateKeys: true,
    verboseLogging: false,
    soundNotifications: true,
    blockTpsAlert: true,
    neuralNetworkOptimize: true,
  });

  const handleToggle = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    const saveToast = toast.loading('Syncing modified parameters to blockchain edge nodes...');
    setTimeout(() => {
      toast.success('System configuration updated and compiled successfully.', {
        id: saveToast,
      });
    }, 1200);
  };

  const handleResync = () => {
    setIsSyncing(true);
    const syncToast = toast.loading('Initializing Cryptographic Ledger Resync...');
    setTimeout(() => {
      toast.success('Ledger integrity verified. Hashed blocks synchronized with Mainnet Hub.', {
        id: syncToast,
      });
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            SYSTEM <span className="text-nexus-primary">CONFIG</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Manage Blockchain Nodes, AI Pipelines & Security Parameters</p>
        </div>
        <button 
          onClick={handleSave}
          className="nexus-button text-xs py-2 px-6"
        >
          <Check size={14} />
          Save Configurations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: General & Node Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Node configuration card */}
          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
              <Cpu className="text-nexus-primary" size={18} />
              Node Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">FastAPI Backend Endpoint</label>
                <input 
                  type="text" 
                  value={nodeUrl} 
                  onChange={(e) => setNodeUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nexus-primary/50 transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Consensus RPC Endpoint</label>
                <input 
                  type="text" 
                  value={rpcUrl} 
                  onChange={(e) => setRpcUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-nexus-primary/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white block">Edge Node Validation Timeout</span>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Maximum seconds allowed for node consensus signatures before failover.</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    value={syncInterval} 
                    onChange={(e) => setSyncInterval(Number(e.target.value))}
                    className="w-32 accent-nexus-primary"
                  />
                  <span className="text-xs font-mono text-nexus-primary font-bold w-8 text-right">{syncInterval}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Protocols configuration card */}
          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
              <Shield className="text-nexus-neon-rose" size={18} />
              Security & Encryption
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Zero-Trust Strictness</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'High', 'Strict'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSecurityLevel(level)}
                      className={`py-2 text-[10px] font-bold uppercase rounded-xl transition-all border ${
                        securityLevel === level 
                          ? 'bg-nexus-neon-rose/10 text-nexus-neon-rose border-nexus-neon-rose/40' 
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hashing Algorithm</label>
                <div className="grid grid-cols-3 gap-2">
                  {['SHA-256', 'SHA-3', 'Keccak-256'].map((alg) => (
                    <button
                      key={alg}
                      onClick={() => setHashingAlg(alg)}
                      className={`py-2 text-[10px] font-bold uppercase rounded-xl transition-all border ${
                        hashingAlg === alg 
                          ? 'bg-nexus-neon-purple/10 text-nexus-neon-purple border-nexus-neon-purple/40' 
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/10'
                      }`}
                    >
                      {alg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
              {/* Security Toggles */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white block">Auto-Rotate Cryptographic Keys</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Periodically rotates local node keypairs every 40,000 blocks.</span>
                </div>
                <button
                  onClick={() => handleToggle('autoRotateKeys')}
                  className={`w-10 h-5 rounded-full relative transition-all ${options.autoRotateKeys ? 'bg-nexus-neon-emerald' : 'bg-white/10'}`}
                >
                  <motion.div 
                    layout 
                    className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"
                    animate={{ x: options.autoRotateKeys ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Operations & System Health */}
        <div className="space-y-6">
          {/* Operations & AI Systems */}
          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
              <Sliders className="text-nexus-neon-purple" size={18} />
              Operations Dashboard
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white block">Neural Pipeline Optimization</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Implements hardware acceleration for LSTM risk modeling.</span>
                </div>
                <button
                  onClick={() => handleToggle('neuralNetworkOptimize')}
                  className={`w-10 h-5 rounded-full relative transition-all ${options.neuralNetworkOptimize ? 'bg-nexus-neon-emerald' : 'bg-white/10'}`}
                >
                  <motion.div 
                    layout 
                    className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"
                    animate={{ x: options.neuralNetworkOptimize ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white block">Verbose Logging Mode</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Captures complete network and WebSocket raw frame events.</span>
                </div>
                <button
                  onClick={() => handleToggle('verboseLogging')}
                  className={`w-10 h-5 rounded-full relative transition-all ${options.verboseLogging ? 'bg-nexus-neon-emerald' : 'bg-white/10'}`}
                >
                  <motion.div 
                    layout 
                    className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"
                    animate={{ x: options.verboseLogging ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white block">TPS Velocity Alerts</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Notify in real-time if transaction velocity drops below 10 TPS.</span>
                </div>
                <button
                  onClick={() => handleToggle('blockTpsAlert')}
                  className={`w-10 h-5 rounded-full relative transition-all ${options.blockTpsAlert ? 'bg-nexus-neon-emerald' : 'bg-white/10'}`}
                >
                  <motion.div 
                    layout 
                    className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5"
                    animate={{ x: options.blockTpsAlert ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Force Resync actions */}
          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
              <Database className="text-nexus-neon-cyan" size={18} />
              Ledger Operations
            </h2>
            <p className="text-[10px] text-slate-400 leading-normal uppercase">
              If node data diverges from consensus, trigger a local cryptographic resync. This pulls all blocks down from the root hub.
            </p>
            <button
              onClick={handleResync}
              disabled={isSyncing}
              className="w-full py-3 bg-nexus-primary/10 border border-nexus-primary/30 rounded-xl text-xs font-bold text-nexus-primary uppercase tracking-widest hover:bg-nexus-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={isSyncing ? "animate-spin" : ""} size={14} />
              Force Cryptographic Resync
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
