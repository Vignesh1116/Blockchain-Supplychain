import React, { useState } from 'react';
import { predictFraud, predictRisk } from '../services/api';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle, 
  XCircle, 
  Info,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FraudDetection = () => {
  const [formData, setFormData] = useState({
    transaction_amount: '',
    delivery_time: '',
    ownership_frequency: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [riskResult, setRiskResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedData = {
        transaction_amount: parseFloat(formData.transaction_amount),
        delivery_time: parseFloat(formData.delivery_time),
        ownership_frequency: parseInt(formData.ownership_frequency)
      };
      
      const [fraudRes, riskRes] = await Promise.all([
        predictFraud(formattedData),
        predictRisk(formattedData)
      ]);
      
      setResult(fraudRes.data);
      setRiskResult(riskRes.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to prediction service. Please ensure the backend is running on port 8001.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Fraud Detection AI</h1>
        <p className="text-slate-400">Validate transactions against trained anomaly detection models</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Search className="w-5 h-5 text-primary-400" />
            New Transaction Analysis
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Transaction Amount ($)</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary-500/50"
                placeholder="e.g. 1200.50"
                value={formData.transaction_amount}
                onChange={(e) => setFormData({...formData, transaction_amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Delivery Time (Days)</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary-500/50"
                placeholder="e.g. 5"
                value={formData.delivery_time}
                onChange={(e) => setFormData({...formData, delivery_time: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Ownership Frequency</label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary-500/50"
                placeholder="e.g. 2"
                value={formData.ownership_frequency}
                onChange={(e) => setFormData({...formData, ownership_frequency: e.target.value})}
              />
            </div>
            <button
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldAlert className="w-5 h-5" />}
              Analyze Transaction
            </button>
          </form>
        </motion.div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Info className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400">Enter transaction details and run AI analysis to see results</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Fraud Result */}
                <div className={`glass-card p-6 border-l-4 ${result.fraud_prediction === 1 ? 'border-red-500' : 'border-emerald-500'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${result.fraud_prediction === 1 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {result.fraud_prediction === 1 ? <AlertCircle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{result.message}</h3>
                      <p className="text-slate-400 mt-1">
                        {result.fraud_prediction === 1 
                          ? "Pattern suggests anomalous activity consistent with supply chain fraud."
                          : "Values within normal operational parameters. No signs of tampering."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Insight */}
                {riskResult && (
                  <div className="glass-card p-6 border-l-4 border-primary-500">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                       Risk Insights: <span className={`px-2 py-0.5 rounded text-xs uppercase ${
                         riskResult.risk_score === 'High' ? 'bg-red-500/20 text-red-400' : 
                         riskResult.risk_score === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 
                         'bg-emerald-500/20 text-emerald-400'
                       }`}>{riskResult.risk_score}</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(riskResult.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                          <span className="text-sm text-slate-400 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className={`text-sm font-semibold ${value === 'Normal' ? 'text-emerald-400' : 'text-amber-400'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FraudDetection;
