import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  Cpu, 
  Database, 
  Terminal, 
  Settings, 
  Bell, 
  Search,
  Box,
  TrendingUp,
  Activity,
  Zap,
  User,
  LogOut,
  Satellite
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AiCopilot from './AiCopilot';
import toast from 'react-hot-toast';

const NavItem = ({ icon: Icon, label, path, active, collapsed }) => (
  <Link to={path}>
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
        active 
          ? 'bg-nexus-primary/20 text-nexus-neon-cyan border border-nexus-primary/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
      }`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={20} className={active ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''} />
      {!collapsed && (
        <span className="font-nexus-display font-medium tracking-wide text-sm">{label}</span>
      )}
      {active && !collapsed && (
        <motion.div 
          layoutId="nav-glow"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-nexus-neon-cyan shadow-[0_0_8px_rgba(6,182,212,1)]"
        />
      )}
    </motion.div>
  </Link>
);

const NexusLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully.');
    navigate('/login');
  };
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Consensus Reached', desc: 'Block #402,129 verified by 12 nodes.', time: '2m ago', read: false, type: 'info' },
    { id: 2, title: 'Security Alert', desc: 'Suspicious payload blocked by Neural Firewall.', time: '15m ago', read: false, type: 'warn' },
    { id: 3, title: 'Telemetry Update', desc: 'Active routes updated: 1,429 online.', time: '1h ago', read: true, type: 'success' },
  ]);
  const hasUnread = notifications.some(n => !n.read);

  const handleSyncEngine = () => {
    const syncToast = toast.loading('Synchronizing local node ledger with mainnet consensus...');
    setTimeout(() => {
      toast.success('Sync complete. Ledger height: Block #402,129 verified.', {
        id: syncToast,
      });
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Command Center', path: '/' },
    { icon: Globe, label: 'Logistics Network', path: '/logistics' },
    { icon: Activity, label: 'AI Intelligence', path: '/ai-engine' },
    { icon: Database, label: 'Digital Twins', path: '/digital-twins' },
    {icon: Cpu, label: 'Consensus Engine', path: '/blockchain' },
    { icon: ShieldAlert, label: 'Cyber Defense', path: '/security' },
    { icon: Satellite, label: 'Live Telemetry', path: '/monitoring' },
    { icon: Terminal, label: 'Terminal', path: '/terminal' },
  ];

  return (
    <div className="min-h-screen bg-nexus-bg flex overflow-hidden">
      {/* Cinematic Background Particles */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-0 cyber-grid"></div>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-nexus-neon-purple/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className="glass-panel m-4 border-r-0 rounded-3xl z-20 flex flex-col transition-all duration-500 ease-in-out h-[calc(100vh-32px)]"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-nexus-primary/20 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.2)] overflow-hidden">
            <img 
              src="/chainiq_nexus_logo_1778663444252.png" 
              alt="ChainIQ Nexus Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col"
            >
              <span className="text-lg font-nexus-display font-bold text-white tracking-tighter">CHAINIQ <span className="text-nexus-neon-cyan">NEXUS</span></span>
              <span className="text-[10px] text-nexus-primary/60 font-mono tracking-widest uppercase">Decentralized AI Supply Chain Ledger</span>
            </motion.div>
          )}
        </div>

        <div className="px-4 mb-4">
          <Link to="/add-product">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full nexus-button py-3 text-[10px] border-nexus-neon-cyan/40 text-nexus-neon-cyan flex items-center justify-center gap-2"
            >
              <Box size={14} />
              {!collapsed && <span>REGISTER ASSET</span>}
            </motion.button>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              {...item}
              active={location.pathname === item.path}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-nexus-border/50">
          <NavItem icon={Settings} label="System Config" path="/settings" collapsed={collapsed} />
          <div className="mt-4 p-3 glass-panel bg-white/5 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nexus-neon-cyan to-nexus-neon-purple p-[1px]">
              <div className="w-full h-full rounded-full bg-nexus-bg flex items-center justify-center overflow-hidden">
                <User size={16} className="text-nexus-primary" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs font-bold text-white truncate">EXECUTIVE_ALPHA</span>
                <span className="text-[10px] text-nexus-neon-emerald font-mono uppercase">Status: Online</span>
              </div>
            )}
            {!collapsed && (
              <LogOut 
                size={16} 
                onClick={handleLogout}
                className="text-slate-500 cursor-pointer hover:text-nexus-neon-rose transition-colors" 
              />
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Top Navigation */}
        <header className={`h-20 px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-nexus-bg/80 backdrop-blur-md border-b border-nexus-border/30' : ''}`}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400"
            >
              <Activity size={20} />
            </button>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-nexus-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search Nexus Intelligence..." 
                className="bg-white/5 border border-nexus-border/50 rounded-full py-2 pl-10 pr-6 text-sm focus:outline-none focus:border-nexus-primary/50 focus:ring-1 focus:ring-nexus-primary/30 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 glass-panel bg-nexus-neon-cyan/5 border-nexus-neon-cyan/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-nexus-neon-cyan animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]"></div>
              <span className="text-[10px] font-mono text-nexus-neon-cyan uppercase tracking-tighter">Mainnet Node: Alpha-1</span>
            </div>
            
            <div className="relative">
              <Bell 
                size={20} 
                className="text-slate-400 cursor-pointer hover:text-white transition-colors" 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-nexus-neon-rose rounded-full border-2 border-nexus-bg pointer-events-none"></span>
              )}
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)}></div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 glass-panel bg-slate-955 backdrop-blur-xl border-nexus-border rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 flex flex-col gap-3"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-xs font-bold text-white uppercase tracking-widest font-nexus-display">System Alerts</span>
                        {hasUnread && (
                          <button 
                            onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                            className="text-[9px] text-nexus-neon-cyan hover:underline uppercase tracking-wider font-bold"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                        {notifications.length === 0 ? (
                          <p className="text-[10px] text-slate-500 text-center py-4 uppercase">No notifications</p>
                        ) : (
                          notifications.map(n => (
                            <div 
                              key={n.id} 
                              onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}
                              className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${n.read ? 'bg-white/0 border-white/5 opacity-60' : 'bg-white/5 border-nexus-primary/20 hover:border-nexus-primary/40'}`}
                            >
                              <div className="flex justify-between items-start">
                                <span className={`text-[10px] font-bold uppercase tracking-wide ${n.type === 'warn' ? 'text-nexus-neon-rose' : n.type === 'success' ? 'text-nexus-neon-emerald' : 'text-nexus-neon-cyan'}`}>
                                  {n.title}
                                </span>
                                <span className="text-[8px] text-slate-500 font-mono">{n.time}</span>
                              </div>
                              <p className="text-[10px] text-slate-300 mt-1 leading-normal font-sans">{n.desc}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <div className="h-8 w-[1px] bg-nexus-border/50 mx-2"></div>
            
            <button 
              onClick={handleSyncEngine}
              className="nexus-button py-1.5 px-4 text-xs"
            >
              <Zap size={14} className="fill-current" />
              Sync Engine
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Global AI Copilot (Float Action) */}
      <AiCopilot />
    </div>
  );
};

export default NexusLayout;
