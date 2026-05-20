import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Cpu } from 'lucide-react';

const AiCopilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Greeting Operator. I am Nexus AI. How can I assist with your autonomous supply chain intelligence today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    
    setTimeout(() => {
      let botResponse = '';
      const query = newMsg.text.toLowerCase();
      
      if (query.includes('delay') || query.includes('late')) {
        botResponse = 'Analysis indicates a 14% probability of delay for cargo transit routing via the Rotterdam node due to maritime congestion. Recommending auto-routing to Singapore Hub.';
      } else if (query.includes('fraud') || query.includes('risk')) {
        botResponse = 'Blockchain consensus nodes have flagged anomalous transactions from Supplier AX-99. Random Forest classifier evaluated a High-Risk score. Audit dashboard updated.';
      } else if (query.includes('status') || query.includes('health')) {
        botResponse = 'Sovereign Consensus Network is fully synchronized. Primary hash rate is stable at 1.42 EH/s. All neural models are operational.';
      } else {
        botResponse = 'Query processed. The neural intelligence network is operating within nominal parameters (99.98% stability). What specific ledger trace do you require?';
      }
      
      setMessages(prev => [...prev, { role: 'assistant', text: botResponse }]);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl glass-panel bg-nexus-primary/20 border-nexus-primary shadow-[0_0_30px_rgba(56,189,248,0.4)] cursor-pointer group hover:scale-110 transition-transform flex items-center justify-center outline-none"
          >
            <Cpu className="text-white animate-pulse" size={28} />
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 glass-panel opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Invoke Nexus AI</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 w-[350px] sm:w-[400px] h-[500px] glass-panel bg-nexus-bg/95 border-nexus-primary/30 flex flex-col z-50 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)]"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white/5 border-b border-nexus-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nexus-neon-cyan to-nexus-neon-purple flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  <Bot className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wide font-nexus-display">Nexus AI Copilot</h3>
                  <p className="text-[9px] text-nexus-neon-cyan flex items-center gap-1 font-mono uppercase tracking-widest mt-0.5">
                    <span className="w-1.5 h-1.5 bg-nexus-neon-cyan rounded-full animate-ping" /> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-nexus-neon-rose hover:scale-110 transition-all p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-nexus-primary/20 border border-nexus-primary/30 text-white rounded-br-sm shadow-[0_0_10px_rgba(56,189,248,0.15)]' 
                      : 'bg-white/5 border border-white/5 text-slate-300 rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-nexus-border">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about shipments, risks, network health..."
                  className="w-full bg-nexus-bg/85 border border-nexus-border focus:border-nexus-primary/50 rounded-xl py-3 pl-4 pr-12 outline-none text-xs text-white placeholder-slate-600 transition-all font-nexus-sans"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-2 bg-nexus-primary/20 hover:bg-nexus-primary/40 border border-nexus-primary/30 rounded-lg text-nexus-neon-cyan hover:text-white transition-all outline-none"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiCopilot;
