import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Cpu,
  BarChart3,
  LineChart as LineChartIcon,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const predictionData = [
  { day: 'Mon', actual: 4000, predicted: 4200 },
  { day: 'Tue', actual: 3000, predicted: 3100 },
  { day: 'Wed', actual: 2000, predicted: 2400 },
  { day: 'Thu', actual: 2780, predicted: 2900 },
  { day: 'Fri', actual: 1890, predicted: 2100 },
  { day: 'Sat', actual: 2390, predicted: 2500 },
  { day: 'Sun', actual: 3490, predicted: 3600 },
];

const pieData = [
  { name: 'On-Time', value: 85 },
  { name: 'Minor Delay', value: 10 },
  { name: 'High Risk', value: 5 },
];

const COLORS = ['#10b981', '#f59e0b', '#f43f5e'];

const AIEngine = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const triggerAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
            NEURAL <span className="text-nexus-neon-cyan">INTELLIGENCE</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Civilization Cognition</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={triggerAnalysis}
            className="nexus-button"
          >
            <Sparkles size={16} className={analyzing ? 'animate-spin' : ''} />
            {analyzing ? 'Processing Neural Net...' : 'Run Global Optimization'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Prediction Model */}
        <div className="lg:col-span-2 glass-panel p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="text-nexus-neon-cyan" size={24} />
              LSTM Demand Forecasting
            </h2>
            <div className="px-3 py-1 bg-nexus-neon-cyan/10 border border-nexus-neon-cyan/30 rounded-full">
              <span className="text-[10px] font-bold text-nexus-neon-cyan uppercase">Model Accuracy: 98.2%</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '12px'
                  }}
                />
                <Area type="monotone" dataKey="actual" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Line type="monotone" dataKey="predicted" stroke="#f472b6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: 'Model', value: 'XGB-Hybrid' },
               { label: 'Epochs', value: '1,420' },
               { label: 'Loss', value: '0.0024' },
               { label: 'Latency', value: '12ms' }
             ].map((item, i) => (
               <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{item.label}</p>
                  <p className="text-sm font-nexus-display font-bold text-white">{item.value}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Global Health Composition */}
        <div className="glass-panel p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-white mb-8 self-start flex items-center gap-3">
            <Activity className="text-nexus-neon-emerald" size={24} />
            Fleet Health
          </h2>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 w-full space-y-3">
             {pieData.map((item, i) => (
               <div key={i} className="flex items-center justify-between p-3 glass-panel bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Anomaly Detection Hub */}
        <div className="glass-panel p-8">
           <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="text-nexus-neon-amber" size={24} />
              AI Anomaly Detection
           </h2>
           <div className="space-y-4">
              {[
                { title: 'Temperature Deviation', route: 'Arctic-Line-02', prob: '92%', status: 'Critical' },
                { title: 'Suspicious Route Delay', route: 'Pacific-Central', prob: '74%', status: 'Warning' },
                { title: 'IoT Sensor Interruption', route: 'EU-Express', prob: '45%', status: 'Normal' }
              ].map((item, i) => (
                <div key={i} className="p-4 glass-panel bg-white/5 flex items-center justify-between hover:border-nexus-neon-amber/50 transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${item.status === 'Critical' ? 'bg-nexus-neon-rose/10' : 'bg-nexus-neon-amber/10'}`}>
                         <Activity size={20} className={item.status === 'Critical' ? 'text-nexus-neon-rose' : 'text-nexus-neon-amber'} />
                      </div>
                      <div>
                         <h3 className="text-sm font-bold text-white group-hover:text-nexus-neon-cyan transition-colors">{item.title}</h3>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{item.route}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-bold text-white">{item.prob}</p>
                      <p className="text-[10px] text-slate-500 uppercase">Confidence</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-panel p-8 bg-nexus-neon-cyan/5 border-nexus-neon-cyan/20">
           <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Brain className="text-nexus-neon-cyan" size={24} />
              Optimization Insights
           </h2>
           <div className="space-y-6">
              <div className="p-4 bg-nexus-bg/50 border border-nexus-neon-cyan/30 rounded-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                    <Zap className="text-nexus-neon-cyan" size={40} />
                 </div>
                 <h4 className="text-xs font-bold text-nexus-neon-cyan uppercase tracking-widest mb-2">Inventory Re-routing Suggestion</h4>
                 <p className="text-sm text-slate-300 leading-relaxed">
                    Based on predicted demand spikes in South-East Asia, we recommend shifting 15% of surplus from Hub-Berlin to Hub-Singapore via Route-Epsilon.
                 </p>
                 <button className="mt-4 text-[10px] font-bold text-nexus-neon-cyan uppercase flex items-center gap-2 hover:underline">
                    Apply Optimization <CheckCircle2 size={12} />
                 </button>
              </div>

              <div className="p-4 bg-nexus-bg/50 border border-nexus-neon-purple/30 rounded-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                    <BarChart3 className="text-nexus-neon-purple" size={40} />
                 </div>
                 <h4 className="text-xs font-bold text-nexus-neon-purple uppercase tracking-widest mb-2">Cost-Efficiency Opportunity</h4>
                 <p className="text-sm text-slate-300 leading-relaxed">
                    AI models indicate a 12% potential cost reduction by switching to Hydrogen-powered vessels for long-haul routes over the next 30 days.
                 </p>
                 <button className="mt-4 text-[10px] font-bold text-nexus-neon-purple uppercase flex items-center gap-2 hover:underline">
                    View Impact Analysis <CheckCircle2 size={12} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIEngine;
