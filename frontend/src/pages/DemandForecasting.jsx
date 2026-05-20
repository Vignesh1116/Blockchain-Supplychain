import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  Cpu, 
  Clock, 
  ChevronDown,
  Zap,
  Package,
  Activity,
  ArrowRight,
  Download
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler 
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
);

const DemandForecasting = () => {
  const skus = ['Electronics / Consumer', 'Pharmaceutical / Cold', 'Automotive / Parts', 'FMCG / High Velocity'];
  const [selectedSku, setSelectedSku] = useState(skus[0]);
  const [stats, setStats] = useState({
    rmse: 14.2,
    mae: 11.5,
    mape: 4.8,
    r2: 0.942,
    retrain: 3600
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        rmse: (14 + Math.random() * 0.5).toFixed(1),
        r2: (0.94 + Math.random() * 0.01).toFixed(3),
        retrain: prev.retrain > 0 ? prev.retrain - 1 : 3600
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const { forecastData, featureImportance } = useMemo(() => {
    const labels = [];
    const actualData = [];
    const predictedData = [];
    const confHigh = [];
    const confLow = [];
    
    for (let i = -30; i <= 60; i++) {
      labels.push(i === 0 ? 'Today' : i < 0 ? `T${i}` : `T+${i}`);
      const x = (i + 30) / 90; 
      const trend = 400 + (x * 150); 
      const season = Math.sin(x * Math.PI * 4) * 50; 
      
      if (i <= 0) {
        const noise = (Math.random() - 0.5) * 15;
        const val = trend + season + noise;
        actualData.push(val);
        predictedData.push(null);
        confHigh.push(null);
        confLow.push(null);
      } else {
        const val = trend + season;
        if (i === 1) actualData.push(null);
        predictedData.push(val);
        
        const uncertainty = 10 + (i * 0.6);
        confHigh.push(val + uncertainty);
        confLow.push(val - uncertainty);
      }
    }
    
    predictedData[30] = actualData[30];
    confHigh[30] = actualData[30];
    confLow[30] = actualData[30];

    return {
      forecastData: {
        labels,
        datasets: [
          {
            label: 'Actual Demand',
            data: actualData,
            borderColor: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.4,
            fill: true
          },
          {
            label: 'Predicted Demand',
            data: predictedData,
            borderColor: '#3b82f6',
            borderWidth: 3,
            borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: false
          },
          {
            label: 'Confidence Interval',
            data: confHigh,
            borderColor: 'transparent',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            pointRadius: 0,
            tension: 0.4,
            fill: '+1'
          },
          {
            label: 'Confidence Low',
            data: confLow,
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            pointRadius: 0,
            tension: 0.4,
            fill: false
          }
        ]
      },
      featureImportance: {
        labels: ['Holiday Cycle', 'Historical Sales', 'Supply Lead Time', 'Market Trend', 'Geopolitical Risk', 'Inventory Gap'],
        datasets: [{
          label: 'Importance %',
          data: [88, 76, 64, 58, 42, 31],
          backgroundColor: '#3b82f6',
          hoverBackgroundColor: '#60a5fa',
          borderRadius: 4,
          borderWidth: 0,
          barThickness: 16
        }]
      }
    };
  }, [selectedSku]);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Demand Forecasting</h1>
          <p className="text-sm font-medium text-slate-400">Advanced ML models predicting supply chain requirements with 96% accuracy.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                <Package className="w-5 h-5" />
            </div>
            <select 
              className="bg-[#0f172a]/80 border border-white/10 rounded-xl py-2.5 pl-12 pr-10 outline-none focus:border-blue-500/50 transition-all text-sm font-bold text-white appearance-none cursor-pointer shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] hover:bg-[#1e293b]"
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
            >
                {skus.map(s => <option key={s} value={s} className="bg-[#0f172a]">{s}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button className="bg-white text-black hover:bg-slate-200 transition-colors px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* MODEL STATS */}
         <div className="bg-[#0f172a]/40 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="p-6 border-b border-white/5 bg-white/[0.02]">
               <div className="flex items-center gap-3 mb-1">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </div>
                  <h2 className="text-sm font-bold text-white">Model Metrics</h2>
               </div>
               <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-2">Ensemble LSTM + XGBoost</p>
            </div>
            
            <div className="p-6 space-y-6 flex-1 relative z-10">
               {[
                 { label: 'RMSE Error', value: stats.rmse, unit: 'units' },
                 { label: 'MAE Score', value: stats.mae, unit: 'units' },
                 { label: 'MAPE', value: stats.mape, unit: '%' },
                 { label: 'R² Accuracy', value: stats.r2, unit: '' }
               ].map((s, i) => (
                 <div key={i} className="flex justify-between items-end">
                    <p className="text-sm font-medium text-slate-400">{s.label}</p>
                    <div className="flex items-baseline gap-1">
                       <p className="text-xl font-black text-white tracking-tight">{s.value}</p>
                       <p className="text-xs text-slate-500 font-bold">{s.unit}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="px-6 py-4 bg-black/40 border-t border-white/5 relative z-10">
               <div className="flex justify-between items-center">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Next Retrain</p>
                  <p className="text-sm font-bold text-blue-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {formatTime(stats.retrain)}
                  </p>
               </div>
            </div>
         </div>

         {/* FORECAST CHART */}
         <div className="lg:col-span-3 bg-[#0f172a]/40 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-10 bg-white/[0.02]">
               <div>
                  <h2 className="text-lg font-bold text-white">90-Day Predictive Horizon</h2>
                  <p className="text-sm font-medium text-slate-400 mt-1">Simulated demand curve with 95% confidence bounds</p>
               </div>
               <div className="flex gap-6">
                  {[
                    { label: 'Actual', color: '#ffffff', border: 'solid' },
                    { label: 'Predicted', color: '#3b82f6', border: 'dashed' },
                    { label: 'Confidence', color: 'rgba(59, 130, 246, 0.3)', border: 'none' }
                  ].map((l, i) => (
                    <div key={i} className="flex items-center gap-2">
                       <div className="w-4 h-1 rounded-full" style={{ backgroundColor: l.border === 'none' ? l.color : 'transparent', borderTop: l.border !== 'none' ? `3px ${l.border} ${l.color}` : 'none' }} />
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{l.label}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="flex-1 min-h-[380px] p-6 relative z-10">
               <Line 
                 data={forecastData} 
                 options={{ 
                    maintainAspectRatio: false,
                    interaction: { intersect: false, mode: 'index' },
                    scales: { 
                      y: { 
                        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, 
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 12, weight: '500' }, padding: 12 } 
                      },
                      x: { 
                        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, 
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 12, weight: '500' }, padding: 12, maxTicksLimit: 12 } 
                      }
                    },
                    plugins: { 
                       legend: { display: false },
                       tooltip: {
                          backgroundColor: '#0f172a', 
                          titleColor: '#ffffff',
                          bodyColor: '#cbd5e1',
                          titleFont: { family: 'Inter', size: 14, weight: 'bold' }, 
                          bodyFont: { family: 'Inter', size: 13, weight: '500' }, 
                          borderColor: 'rgba(255,255,255,0.1)', 
                          borderWidth: 1, 
                          padding: 16,
                          boxPadding: 6,
                          usePointStyle: true,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                          filter: function(tooltipItem) {
                             return tooltipItem.datasetIndex !== 3; // Hide lower bound
                          }
                       }
                    }
                 }} 
               />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* FEATURE IMPORTANCE */}
         <div className="bg-[#0f172a]/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <h2 className="text-lg font-bold text-white mb-1">Model Attribution</h2>
            <p className="text-sm font-medium text-slate-400 mb-8">Key factors driving the prediction engine</p>
            
            <div className="h-[240px]">
               <Bar 
                 data={featureImportance} 
                 options={{ 
                    indexAxis: 'y',
                    maintainAspectRatio: false,
                    scales: { 
                      x: { 
                        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, 
                        ticks: { color: '#94a3b8', font: { family: 'Inter', size: 12, weight: '500' } } 
                      },
                      y: { 
                        grid: { display: false }, 
                        ticks: { color: '#f8fafc', font: { family: 'Inter', size: 13, weight: 'bold' } } 
                      }
                    },
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                         backgroundColor: '#0f172a', 
                         titleColor: '#ffffff',
                         bodyColor: '#cbd5e1',
                         titleFont: { family: 'Inter', size: 13, weight: 'bold' }, 
                         bodyFont: { family: 'Inter', size: 13, weight: '500' }, 
                         borderColor: 'rgba(255,255,255,0.1)', 
                         borderWidth: 1, 
                         padding: 12
                      }
                    }
                 }} 
               />
            </div>
         </div>

         {/* RECOMMENDATIONS */}
         <div className="bg-[#0f172a]/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <h2 className="text-lg font-bold text-white">Actionable Insights</h2>
                  <p className="text-sm font-medium text-slate-400 mt-1">AI-generated supply optimization tasks</p>
               </div>
               <button className="text-sm font-bold text-blue-400 hover:text-white transition-colors flex items-center gap-1 bg-blue-500/10 px-4 py-2 rounded-lg">
                 View All <ArrowRight className="w-4 h-4" />
               </button>
            </div>
            
            <div className="space-y-4">
               {[
                 { sku: 'SKU-7721', action: 'Reorder Now', qty: '1,200', confidence: 98, supplier: 'Alpha Gmbh', urgent: true },
                 { sku: 'SKU-8842', action: 'Reduce Stock', qty: '450', confidence: 84, supplier: 'Global Inc', urgent: false },
                 { sku: 'SKU-1092', action: 'Diversify Supplier', qty: '800', confidence: 91, supplier: 'Tokyo Nano', urgent: false },
               ].map((rec, i) => (
                 <div key={i} className="p-4 bg-black/20 rounded-xl border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border ${rec.urgent ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/10 text-white'}`}>
                          <Zap className={`w-5 h-5 ${rec.urgent ? 'fill-red-500/20' : ''}`} />
                       </div>
                       <div>
                          <p className="text-base font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{rec.sku}</p>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{rec.supplier}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={`text-sm font-bold ${rec.urgent ? 'text-red-400' : 'text-slate-300'}`}>{rec.action}</p>
                       <div className="flex items-center gap-2 mt-1.5 justify-end">
                          <span className="text-xs font-medium text-slate-400">{rec.qty} units</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">{rec.confidence}% Conf</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default DemandForecasting;
