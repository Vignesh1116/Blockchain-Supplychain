import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const GlobalGlobe = () => {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
      globeEl.current.controls().enableZoom = false;
      
      // Auto position camera to see multiple nodes
      globeEl.current.pointOfView({ lat: 20, lng: 70, altitude: 2.2 });
    }
  }, []);

  const nodes = [
    { lat: 51.1657, lng: 10.4515, name: 'Alpha Logistics Gmbh (Germany)', color: '#00c8b4' },
    { lat: 23.6978, lng: 120.9605, name: 'Global Circuits Inc. (Taiwan)', color: '#0066ff' },
    { lat: 36.2048, lng: 138.2529, name: 'Tokyo Nanotech (Japan)', color: '#00c8b4' },
    { lat: 52.1326, lng: 5.2913, name: 'Rotterdam Shipping (Netherlands)', color: '#a855f7' },
    { lat: 20.5937, lng: 78.9629, name: 'Mumbai Textiles Co. (India)', color: '#f59e0b' },
    { lat: -14.2350, lng: -51.9253, name: 'São Paulo Agro (Brazil)', color: '#f59e0b' }
  ];

  const arcs = [
    { startLat: 23.6978, startLng: 120.9605, endLat: 51.1657, endLng: 10.4515, color: ['#0066ff', '#00c8b4'] }, // Taiwan to Germany
    { startLat: 36.2048, startLng: 138.2529, endLat: -14.2350, endLng: -51.9253, color: ['#00c8b4', '#f59e0b'] }, // Japan to Brazil
    { startLat: 20.5937, startLng: 78.9629, endLat: 52.1326, endLng: 5.2913, color: ['#f59e0b', '#a855f7'] } // India to Netherlands
  ];

  return (
    <div ref={containerRef} className="w-full h-full relative rounded-2xl overflow-hidden cursor-move bg-black/40">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={nodes}
        pointColor="color"
        pointAltitude={0.05}
        pointRadius={0.5}
        pointsMerge={true}
        labelsData={nodes}
        labelLat={d => d.lat}
        labelLng={d => d.lng}
        labelText={d => d.name}
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => 'rgba(255, 255, 255, 0.75)'}
        labelResolution={2}
        arcsData={arcs}
        arcStartLat={d => d.startLat}
        arcStartLng={d => d.startLng}
        arcEndLat={d => d.endLat}
        arcEndLng={d => d.endLng}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        atmosphereColor="#00c8b4"
        atmosphereAltitude={0.25}
      />
      <div className="absolute top-4 left-4 pointer-events-none">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Live Global Logistics Mesh</h3>
      </div>
    </div>
  );
};

export default GlobalGlobe;
