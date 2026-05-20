import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout
import NexusLayout from './components/NexusLayout';

// Pages
import Dashboard from './pages/Dashboard';
import LogisticsNetwork from './pages/LogisticsNetwork';
import AIEngine from './pages/AIEngine';
import BlockchainConsensus from './pages/BlockchainConsensus';
import CyberSecurity from './pages/CyberSecurity';
import DigitalTwins from './pages/DigitalTwins';
import AddProduct from './pages/AddProduct';
import Terminal from './pages/Terminal';
import RealTimeMonitoring from './pages/RealTimeMonitoring';
import Settings from './pages/Settings';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard/App Routes */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <NexusLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/logistics" element={<LogisticsNetwork />} />
                  <Route path="/ai-engine" element={<AIEngine />} />
                  <Route path="/digital-twins" element={<DigitalTwins />} />
                  <Route path="/blockchain" element={<BlockchainConsensus />} />
                  <Route path="/security" element={<CyberSecurity />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/terminal" element={<Terminal />} />
                  <Route path="/monitoring" element={<RealTimeMonitoring />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </NexusLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {/* Global Toast Notifications */}
      <Toaster 
        position="bottom-left"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#fff',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            backdropFilter: 'blur(10px)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#fff',
            },
          }
        }}
      />
    </Router>
  );
};

export default App;
