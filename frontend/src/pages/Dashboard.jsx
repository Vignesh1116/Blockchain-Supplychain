import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  Activity, 
  ShieldCheck, 
  Zap, 
  AlertTriangle,
  Globe,
  ArrowUpRight,
  Database,
  Layers
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const chartData = [
  { name: '00:00', value: 400, risk: 24 },
  { name: '04:00', value: 300, risk: 13 },
  { name: '08:00', value: 600, risk: 58 },
  { name: '12:00', value: 800, risk: 39 },
  { name: '16:00', value: 500, risk: 48 },
  { name: '20:00', value: 900, risk: 28 },
  { name: '23:59', value: 1100, risk: 18 },
];

const StatCard = ({ icon: Icon, label, value, trend, color, subtext }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass-panel p-6 border-l-4"
    style={{ borderColor: color }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-10`} style={{ backgroundColor: color }}>
        <Icon size={24} style={{ color }} />
      </div>
      <div className="flex flex-col items-end">
        <div className={`flex items-center gap-1 text-xs font-bold ${trend.startsWith('+') ? 'text-nexus-neon-emerald' : 'text-nexus-neon-rose'}`}>
          {trend} <TrendingUp size={12} className={trend.startsWith('-') ? 'rotate-90' : ''} />
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">24H Delta</span>
      </div>
    </div>
    <div className="flex flex-col">
      <h3 className="text-slate-400 text-xs font-medium uppercase tracking-widest">{label}</h3>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-3xl font-nexus-display font-bold text-white">{value}</span>
        <span className="text-[10px] text-slate-500 font-mono">{subtext}</span>
      </div>
    </div>
    
    {/* Micro-sparkline simulation */}
    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '70%' }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-nexus-display font-black text-white tracking-tighter">
            SOVEREIGN <span className="text-nexus-neon-amber">INTELLIGENCE</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-mono uppercase tracking-[0.2em]">Autonomous Neural Civilization | Omega Node 1.0.0</p>
        </div>
        <div className="flex gap-3">
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-bold">SYSTEM_STABILITY</span>
              <span className="text-xs text-nexus-neon-emerald font-mono">99.98% NOMINAL</span>
            </div>
            <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[99%] h-full bg-nexus-neon-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Package} 
          label="Active Assets" 
          value="12,842" 
          trend="+14.2%" 
          color="#06b6d4" 
          subtext="UNITS"
        />
        <StatCard 
          icon={Zap} 
          label="Tx Velocity" 
          value="48.2" 
          trend="+5.7%" 
          color="#8b5cf6" 
          subtext="TPS"
        />
        <StatCard 
          icon={ShieldCheck} 
          label="Trust Score" 
          value="98.4" 
          trend="+0.2%" 
          color="#10b981" 
          subtext="INDEX"
        />
        <StatCard 
          icon={AlertTriangle} 
          label="Detected Risks" 
          value="07" 
          trend="-22.5%" 
          color="#f43f5e" 
          subtext="ALERTS"
        />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Intelligence Chart */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="text-nexus-neon-cyan" size={20} />
                Neural Intelligence Flow
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-1 uppercase">Synchronized with Global Node Network</p>
            </div>
            <div className="flex gap-2">
              {['REAL-TIME', '24H', '7D', '30D'].map((t, i) => (
                <button key={t} className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-widest border transition-all ${i === 0 ? 'bg-nexus-neon-cyan/20 border-nexus-neon-cyan/40 text-nexus-neon-cyan' : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorRisk)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Transaction Feed */}
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="text-nexus-neon-purple" size={18} />
            Consensus Pulse
          </h2>
          <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-nexus-primary/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-nexus-neon-emerald animate-pulse"></div>
                    <span className="text-[10px] font-mono text-nexus-neon-emerald uppercase tracking-widest">Verified</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">0x{Math.random().toString(16).slice(2, 8)}...</span>
                </div>
                <p className="text-xs text-white font-medium group-hover:text-nexus-neon-cyan transition-colors">Asset #AX-4029 Transfer to Singapore Hub</p>
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-2">
                    <Database size={10} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500">Block 402,129</span>
                  </div>
                  <div className="text-[10px] font-mono text-nexus-neon-cyan">2.4ms latency</div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/blockchain')}
            className="mt-6 w-full py-2 bg-nexus-primary/10 border border-nexus-primary/20 rounded-xl text-[10px] font-bold text-nexus-primary uppercase tracking-[0.2em] hover:bg-nexus-primary/20 transition-all"
          >
            Open Explorer
          </button>
        </div>
      </div>

      {/* Global Risk Map Integration Placeholder */}
      <div className="glass-panel p-8 overflow-hidden relative min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="w-full h-full cyber-grid"></div>
        </div>
        <div className="z-10 text-center">
          <Globe className="text-nexus-primary mx-auto mb-4 animate-pulse" size={64} />
          <h2 className="text-2xl font-black text-white tracking-tighter">GLOBAL LOGISTICS TOPOLOGY</h2>
          <p className="text-slate-400 font-mono text-xs uppercase mt-2">Simulating 1,429 Live Routes | AI Risk Index: Low</p>
          <button 
            onClick={() => navigate('/logistics')}
            className="nexus-button mt-6 group"
          >
            Launch 3D Visualization
            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
          </button>
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-nexus-primary/40 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-nexus-primary/40 rounded-br-3xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
