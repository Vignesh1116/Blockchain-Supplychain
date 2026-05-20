import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Map, 
  TrendingUp, 
  Layers, 
  FileText, 
  Users, 
  AlertOctagon,
  LogOut,
  Bell,
  Search,
  Settings,
  Package,
  Command,
  Box
} from 'lucide-react';
import AiCopilot from './AiCopilot';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Assets', path: '/assets', icon: Box },
    { name: 'Shipments', path: '/tracking', icon: Map },
    { name: 'Forecast', path: '/forecast', icon: TrendingUp },
    { name: 'Ledger', path: '/explorer', icon: Layers },
    { name: 'Contracts', path: '/contracts', icon: FileText },
    { name: 'Network', path: '/suppliers', icon: Users },
    { name: 'Security', path: '/alerts', icon: AlertOctagon },
  ];

  return (
    <div className="flex h-screen w-full text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className="w-[280px] flex flex-col z-20 relative bg-[#030712]/50 backdrop-blur-3xl border-r border-white/5">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white leading-none">
              ChainIQ
            </h1>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-1">Enterprise</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 text-[14px] font-bold relative group ${
                  isActive ? 'text-white bg-blue-600/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                  />
                )}
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-[14px] font-bold"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative z-10 w-[calc(100%-280px)]">
        {/* Top Nav */}
        <header className="h-[88px] flex items-center justify-between px-10 bg-[#030712]/50 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
          <div className="relative w-[400px] group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
             <input 
               type="text" 
               placeholder="Search intelligence, networks..." 
               className="w-full bg-[#0a0f1a] border border-white/5 rounded-xl py-3 pl-12 pr-12 outline-none focus:bg-[#0f172a] focus:border-blue-500/50 transition-all text-sm text-white placeholder-slate-500 font-semibold shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
             />
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-white/5">
                <Command className="w-3 h-3" /> K
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
               <button className="p-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                 <Settings className="w-5 h-5" />
               </button>
               <button className="relative p-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
               </button>
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-white/5 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Sarah C.</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=0f172a" alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 scroll-smooth relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={location.pathname}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.3 }}
               className="h-full"
             >
                {children}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
      <AiCopilot />
    </div>
  );
};

export default MainLayout;
