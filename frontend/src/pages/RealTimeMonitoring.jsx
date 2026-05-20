import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Box, 
  Database, 
  AlertCircle, 
  TrendingUp,
  History,
  Info,
  ExternalLink,
  Satellite
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const RealTimeMonitoring = () => {
  const [data, setData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [riskHistory, setRiskHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const handleGenerateReport = async () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("SupplyTraceAI Node Audit Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Node Status: ACTIVE STREAM`, 14, 35);
    
    doc.setDrawColor(200);
    doc.line(14, 40, 196, 40);
    
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text("1. Live Telemetry & Risk Index", 14, 50);
    
    autoTable(doc, {
      startY: 55,
      head: [['Parameter', 'Current State']],
      body: [
        ['Risk Score', data?.risk_update?.score?.toString() || '0.0'],
        ['Severity Level', data?.risk_update?.pred || '---'],
        ['Active Tracking', data?.tracking?.product || 'N/A'],
        ['Current Location', data?.tracking?.location || 'N/A']
      ],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }
    });
    
    doc.text("2. Recent Blockchain Transactions", 14, doc.lastAutoTable.finalY + 15);
    
    const txnBody = transactions.map(t => [t.id, t.hash.substring(0,16)+'...', `$${t.amount}`, t.status]);
    
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Transaction ID', 'Hash Segment', 'Amount', 'Status']],
      body: txnBody.length > 0 ? txnBody : [['No recent transactions', '', '', '']],
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.text("3. Incident & Alert Log", 14, doc.lastAutoTable.finalY + 15);
    
    const alertBody = alerts.map(a => [a.timestamp, a.type, a.severity, a.message]);
    
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Timestamp', 'Type', 'Severity', 'Description']],
      body: alertBody.length > 0 ? alertBody : [['No critical incidents', '-', '-', '-']],
      theme: 'striped',
      headStyles: { fillColor: [220, 38, 38] }
    });

    const footerY = 280;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("SupplyTraceAI - Immutable Reporting Engine v2.4 | Cryptographically Verified", 14, footerY);

    try {
      const pdfBlob = doc.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'SupplyTraceAI_Node_Audit.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error.name !== 'AbortError') console.error('Save failed', error);
    }
  };

  useEffect(() => {
    // Connect to WebSocket dynamically based on host location
    const wsHost = window.location.hostname || '127.0.0.1';
    ws.current = new WebSocket(`ws://${wsHost}:8001/ws/monitoring`);

    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);
    
    ws.current.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setData(payload);
      
      // Update transaction list
      setTransactions(prev => [payload.transaction, ...prev].slice(0, 5));
      
      // Update alerts if present
      if (payload.alert) {
        setAlerts(prev => [
          { ...payload.alert, timestamp: payload.timestamp, id: Date.now() }, 
          ...prev
        ].slice(0, 3));
      }
      
      // Update risk history for chart
      setRiskHistory(prev => [
        ...prev, 
        { time: payload.timestamp, score: payload.risk_update.score }
      ].slice(-10));
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const chartData = {
    labels: riskHistory.map(d => d.time),
    datasets: [{
      label: 'Real-time Risk Index',
      data: riskHistory.map(d => d.score),
      borderColor: '#06b6d4',
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#06b6d4',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        min: 0, 
        max: 100, 
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono' } }
      },
      x: { 
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono' } }
      }
    },
    plugins: { legend: { display: false } },
    animation: { duration: 0 }
  };

  return (
    <div id="monitoring-content" className="space-y-8 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
              REAL-TIME <span className="text-nexus-neon-cyan">TELEMETRY</span>
            </h1>
            <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest font-bold flex items-center gap-1.5 ${isConnected ? 'bg-nexus-neon-emerald/20 text-nexus-neon-emerald border border-nexus-neon-emerald/30' : 'bg-nexus-neon-rose/20 text-nexus-neon-rose border border-nexus-neon-rose/30'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-nexus-neon-emerald animate-pulse' : 'bg-nexus-neon-rose'}`} />
              {isConnected ? 'LIVE_STREAM_ACTIVE' : 'CONNECTION_OFFLINE'}
            </div>
          </div>
          <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Continuous telemetry from global logistics nodes and smart contracts</p>
        </div>
        <div className="flex items-center gap-3 font-nexus-display" data-html2canvas-ignore>
          <button 
            id="report-button-monitoring"
            onClick={handleGenerateReport} 
            className="nexus-button text-xs py-2 w-36 text-center"
          >
            Generate Report
          </button>
          <div className="glass-panel px-4 py-2 text-xs font-mono text-nexus-primary border-nexus-primary/30">
            LAST_SYNC: {data?.timestamp || '--:--:--'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tracking Card */}
        <motion.div 
          layout
          className="lg:col-span-1 glass-panel p-6 flex flex-col justify-between border-l-4 border-l-nexus-primary"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-white/5 rounded-xl text-nexus-primary">
              <Satellite className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Tracking</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={data?.tracking?.product}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-1"
            >
              <h3 className="font-bold text-base text-white tracking-wide">{data?.tracking?.product || 'Scanning...'}</h3>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-nexus-sans">
                <div className="w-1.5 h-1.5 rounded-full bg-nexus-primary" />
                {data?.tracking?.location}
              </div>
              <div className="mt-4 px-2.5 py-1 bg-nexus-primary/20 border border-nexus-primary/40 rounded-full text-[10px] font-bold text-nexus-primary inline-block uppercase tracking-wider">
                {data?.tracking?.status}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Risk Card */}
        <motion.div 
          layout
          className="lg:col-span-1 glass-panel p-6 flex flex-col justify-between border-l-4 border-l-nexus-neon-purple"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-white/5 rounded-xl text-nexus-neon-purple">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Index</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-nexus-display font-black text-white">{data?.risk_update?.score || '0.0'}</h3>
            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-2 tracking-widest uppercase">
              LEVEL: <span className={data?.risk_update?.pred === 'High' ? 'text-nexus-neon-rose font-black' : 'text-nexus-neon-emerald'}>{data?.risk_update?.pred || '---'}</span>
            </p>
          </div>
        </motion.div>

        {/* Transaction Pulse */}
        <div className="lg:col-span-2 glass-panel p-4 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Database className="w-24 h-24 text-nexus-primary" />
          </div>
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Global Ledger Pulse</h4>
          <div className="space-y-2">
            <AnimatePresence>
              {transactions.length === 0 ? (
                <div className="h-28 flex flex-col items-center justify-center text-center opacity-30">
                  <p className="text-xs">Waiting for transaction broadcast...</p>
                </div>
              ) : (
                transactions.map((txn) => (
                  <motion.div 
                    key={txn.hash}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-nexus-primary/10 flex items-center justify-center border border-nexus-primary/20">
                        <History className="w-4 h-4 text-nexus-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-bold text-white">{txn.id}</p>
                        <p className="text-[9px] text-slate-500 font-mono">{txn.hash.substring(0, 14)}...</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white font-mono">${txn.amount}</p>
                      <span className="text-[9px] text-nexus-neon-emerald font-black uppercase tracking-widest">{txn.status}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Chart */}
        <div className="lg:col-span-2 glass-panel p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-nexus-neon-cyan" />
              Live Risk Telemetry
            </h2>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-nexus-neon-cyan animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Streaming</span>
            </div>
          </div>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-nexus-neon-rose" />
            Critical Alerts
          </h2>
          <div className="space-y-4 flex-1">
            <AnimatePresence>
              {alerts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-12">
                  <ShieldAlert className="w-12 h-12 mb-2 text-slate-500" />
                  <p className="text-xs">No critical incidents in current session</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl border-l-4 ${alert.severity === 'CRITICAL' ? 'bg-nexus-neon-rose/10 border-nexus-neon-rose text-white shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'bg-nexus-neon-amber/10 border-nexus-neon-amber text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-black uppercase tracking-tighter font-mono ${alert.severity === 'CRITICAL' ? 'text-nexus-neon-rose' : 'text-nexus-neon-amber'}`}>
                        {alert.type}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono">{alert.timestamp}</span>
                    </div>
                    <p className="text-xs font-semibold leading-tight">{alert.message}</p>
                    <button className="mt-2 text-[9px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider">
                      Investigate <ExternalLink className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[9px] text-slate-500 font-mono uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            Alerts processed by Neural Security Cluster B
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
