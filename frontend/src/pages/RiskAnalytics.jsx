import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Zap,
  Layers
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, BarElement, CategoryScale, LinearScale
);

const RiskAnalytics = () => {
  const radarData = {
    labels: [
      'Inventory Risk',
      'Supplier Credibility',
      'Transaction Integrity',
      'Delivery Speed',
      'Cost Fluctuations',
      'Regulatory Compliance'
    ],
    datasets: [
      {
        label: 'Current Risk Profile',
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#6366f1',
      }
    ],
  };

  const barData = {
    labels: ['Vendor A', 'Vendor B', 'Vendor C', 'Vendor D', 'Vendor E'],
    datasets: [{
      label: 'Anomalies Detected',
      data: [12, 19, 3, 5, 2],
      backgroundColor: '#f43f5e',
      borderRadius: 8,
    }]
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Risk Intelligence Dashboard</h1>
        <p className="text-slate-400">Deep-learning based risk assessment and predictive analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 border-l-4 border-l-red-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-red-400" />
              <h3 className="font-bold">Total Risk Index</h3>
            </div>
            <p className="text-4xl font-black text-white">42.8 <span className="text-sm font-normal text-slate-500 uppercase tracking-widest ml-1">Critical</span></p>
            <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-red-500 h-full w-[42%]" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              AI Recommendations
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                Divert Vendor A shipments to Warehouse 4 to avoid 2.4% delay probability.
              </li>
              <li className="flex gap-3 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                Increase verification frequency for transactions exceeding $2,500.
              </li>
              <li className="flex gap-3 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                System flagged 3 new wallets as "High Association" with known blacklists.
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary-400" />
            Vulnerability Radar
          </h2>
          <div className="h-[400px] flex items-center justify-center">
            <Radar 
              data={radarData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  r: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    pointLabels: { color: '#94a3b8', font: { size: 12 } }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary-400" />
          Anomalies per Strategic Vendor
        </h2>
        <div className="h-[300px]">
          <Bar 
            data={barData} 
            options={{ 
              maintainAspectRatio: false,
              scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, border: { display: false } },
                x: { grid: { display: false } }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default RiskAnalytics;
