import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Map as MapIcon, 
  Layers, 
  Target, 
  Info,
  Maximize2,
  Navigation,
  Box
} from 'lucide-react';

const LogisticsNetwork = () => {
  const globeRef = useRef();
  const [loading, setLoading] = useState(true);

  // Realistic mock data for the globe
  const ARC_COUNT = 25;
  const arcsData = useMemo(() => [...Array(ARC_COUNT).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'][Math.round(Math.random() * 3)], ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b'][Math.round(Math.random() * 3)]]
  })), []);

  const nodesData = useMemo(() => [...Array(60).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: Math.random() * 20,
    color: ['#06b6d4', '#8b5cf6', '#10b981'][Math.floor(Math.random() * 3)]
  })), []);

  useEffect(() => {
    // Initial camera position
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
      setLoading(false);
    }
  }, []);

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-0 left-0 z-10">
        <h1 className="text-3xl font-nexus-display font-black text-white tracking-tighter">
          SOVEREIGN <span className="text-nexus-neon-amber">NETWORK</span>
        </h1>
        <p className="text-slate-400 text-xs font-mono mt-1 uppercase tracking-widest">Autonomous Neural Civilization Topology</p>
      </div>

      <div className="flex-1 glass-panel mt-12 overflow-hidden relative cursor-grab active:cursor-grabbing">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-nexus-bg/50 backdrop-blur-xl z-50">
            <div className="text-center">
              <Zap className="text-nexus-neon-cyan animate-bounce mb-4 mx-auto" size={48} />
              <p className="font-nexus-display font-bold text-white uppercase tracking-widest">Initializing Global Mesh...</p>
            </div>
          </div>
        )}

        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          arcsData={arcsData}
          arcColor={'color'}
          arcDashLength={() => Math.random()}
          arcDashGap={() => Math.random()}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
          arcStroke={0.5}
          pointsData={nodesData}
          pointColor={'color'}
          pointAltitude={0.01}
          pointRadius={0.5}
          pointsMerge={true}
          atmosphereColor="#38bdf8"
          atmosphereAltitude={0.15}
        />

        {/* HUD Overlays */}
        <div className="absolute bottom-8 left-8 space-y-4">
          <div className="glass-panel p-4 bg-nexus-bg/60 backdrop-blur-md border-nexus-primary/30 w-64">
            <h3 className="text-xs font-bold text-nexus-neon-cyan mb-3 uppercase tracking-[0.2em]">Node Intelligence</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-mono">Active Nodes</span>
                <span className="text-xs text-white font-bold font-mono">1,429</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-mono">Live Routes</span>
                <span className="text-xs text-white font-bold font-mono">284</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-mono">Network Health</span>
                <span className="text-xs text-nexus-neon-emerald font-bold font-mono">Stable</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {[MapIcon, Layers, Target, Maximize2].map((Icon, i) => (
              <button key={i} className="p-3 glass-panel hover:bg-nexus-primary/20 transition-all text-slate-400 hover:text-white">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-8 right-8">
           <div className="glass-panel p-4 bg-nexus-bg/60 border-nexus-neon-rose/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-nexus-neon-rose animate-ping"></div>
                <span className="text-[10px] font-bold text-nexus-neon-rose uppercase tracking-widest">High Risk Route Detected</span>
              </div>
              <p className="text-[10px] text-slate-300 font-mono leading-relaxed max-w-[200px]">
                Anomalous temperature spikes detected on Route Alpha-X (Pacific). AI Confidence: 94%.
              </p>
           </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2">
           {[
             { color: '#06b6d4', label: 'Primary Transit' },
             { color: '#8b5cf6', label: 'Blockchain Node' },
             { color: '#10b981', label: 'Verified Hub' },
             { color: '#f59e0b', label: 'Risk Anomaly' }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-2 px-3 py-1 glass-panel bg-nexus-bg/40">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default LogisticsNetwork;
