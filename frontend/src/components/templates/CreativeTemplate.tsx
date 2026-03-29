'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioProps } from '../../types/portfolio';
import { 
  Github, 
  ExternalLink, 
  Zap, 
  Terminal as TerminalIcon, 
  Code2, 
  Cpu, 
  Activity,
  Dna,
  Binary,
  Globe,
  Lock,
  ChevronRight,
  Box,
  LayoutGrid,
  ShieldCheck,
  Radio,
  BrainCircuit,
  Sparkles,
  Command,
  Eye,
  Microscope,
  Database,
  Search,
  MessageSquareCode
} from 'lucide-react';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  CreativeScrollBackdrop,
  ScrollReveal3D,
  ScrollParallaxLayer,
} from '@/components/motion/ScrollScene3D';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AIInsights: React.FC = () => {
  const [analyzing, setAnalyzing] = React.useState(true);
  const [insight, setInsight] = React.useState("");
  
  const insights = [
    "Neural patterns suggest a focus on high-performance microservices architecture.",
    "System analysis identifies a preference for type-safe functional programming paradigms.",
    "Project velocity is 42% above the industry average for similar repositories.",
    "Core logic demonstrates a strong commitment to modular and scalable code design.",
    "AI has detected significant expertise in cloud-native infrastructure and deployment."
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnalyzing(true);
      setTimeout(() => {
        setInsight(insights[Math.floor(Math.random() * insights.length)]);
        setAnalyzing(false);
      }, 1500);
    }, 8000);
    
    setInsight(insights[0]);
    setAnalyzing(false);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-cyan-500/[0.02] border border-cyan-500/10 rounded-2xl space-y-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <BrainCircuit size={32} className="text-cyan-500 animate-pulse" />
      </div>
      
      <div className="flex items-center gap-3">
        <Sparkles size={14} className="text-cyan-400" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">Neural_Insights</h3>
      </div>
      
      <AnimatePresence mode="wait">
        {analyzing ? (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 text-[10px] text-white/20 italic"
          >
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
            Analyzing_Codebase_Patterns...
          </motion.div>
        ) : (
          <motion.p 
            key="insight"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-white/60 leading-relaxed italic"
          >
            {"// "}
            {insight}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActiveTerminal: React.FC = () => {
  const [lines, setLines] = React.useState<string[]>([
    "devanta@arch:~$ systemctl status ai-neural-sync",
    "● ai-neural-sync.service - AI Neural Synchronization",
    "   Loaded: loaded (/etc/systemd/system/ai-neural-sync.service; enabled; vendor preset: enabled)",
    "   Active: active (running) since " + new Date().toISOString()
  ]);
  const [inputValue, setInputValue] = React.useState("");
  
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    
    const newLines = [...lines, `devanta@arch:~$ ${inputValue}`];
    
    if (inputValue.toLowerCase() === 'help') {
      newLines.push("Available commands: help, status, scan, clear, about, game");
    } else if (inputValue.toLowerCase() === 'game') {
      newLines.push("INITIALIZING_CODE_RAIN_PROTOCOL...");
      newLines.push("3... 2... 1...");
      newLines.push("ERROR: SYSTEM_OVERLOAD. PLAY_BRICK_BREAKER_IN_SIDEBAR_INSTEAD.");
    } else if (inputValue.toLowerCase() === 'scan') {
      newLines.push("Scanning repository structures...");
      newLines.push("Detected 12 vulnerabilities in legacy code.");
      newLines.push("Recommended fix: Neural-Link encryption V3.");
    } else if (inputValue.toLowerCase() === 'about') {
      newLines.push("DEVANTA OS v3.0.0-legend");
      newLines.push("Neural Architecture: Quantum-Optimized");
      newLines.push("User: LEGEND_LEVEL_DEVELOPER");
    } else if (inputValue.toLowerCase() === 'clear') {
      setLines([]);
      setInputValue("");
      return;
    } else {
      newLines.push(`Command not found: ${inputValue}`);
    }
    
    setLines(newLines.slice(-8));
    setInputValue("");
  };

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden font-mono">
      <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
          <div className="w-2 h-2 rounded-full bg-green-500/40" />
        </div>
        <span className="text-[9px] text-white/20 uppercase tracking-widest">Active_Shell_v3.0</span>
      </div>
      <div className="p-6 space-y-1 h-[200px] overflow-y-auto scrollbar-hide text-[10px] text-cyan-400/70">
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed">{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center gap-2">
          <span className="text-fuchsia-500">devanta@arch:~$</span>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent border-none outline-none p-0 text-white w-full"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

const SystemTerminal: React.FC = () => {
  const [lines, setLines] = React.useState<string[]>([]);
  const messages = [
    "BOOT_SEQUENCE_INITIALIZED",
    "LOADING_CORE_MODULES...",
    "SYNCING_ARCHIVE_DATA...",
    "ESTABLISHING_ENCRYPTED_TUNNEL...",
    "DEVANTA_OS_PRO_V3.0",
    "STATUS: OPTIMAL"
  ];

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLines(prev => [...prev, `> ${messages[i]}`].slice(-4));
        i++;
      } else {
        setLines(prev => [...prev, `> SESSION_ACTIVE: ${Math.random().toString(36).substring(7).toUpperCase()}`].slice(-4));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] text-cyan-400/50 space-y-1">
      {lines.map((line, idx) => (
        <div key={idx} className="flex gap-2">
          <span className="opacity-30">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
          <span className="tracking-wider">{line}</span>
        </div>
      ))}
    </div>
  );
};

const SystemSublayersStream: React.FC<{ stack: string[] }> = ({ stack }) => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    if (stack.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stack.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stack]);

  if (stack.length === 0) {
    return (
      <div className="relative p-8 bg-white/[0.01] border border-white/5 rounded-3xl min-h-[200px] flex items-center justify-center">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-black text-center px-4">
          No stack tags in preview — public repo languages/topics will stream here.
        </p>
      </div>
    );
  }

  return (
    <div className="relative p-8 bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden group min-h-[400px]">
      {/* Horizontal Scanning Beam */}
      <motion.div 
        animate={{ left: ['-10%', '110%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 bottom-0 w-[80px] bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent z-0 pointer-events-none"
      />
      
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center relative">
            <LayoutGrid size={18} className="text-cyan-400" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-cyan-500/20 rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Neural_Stream</h3>
            <span className="text-[8px] text-white/20 uppercase tracking-widest font-black">Bit-Rate: 1.2GB/s</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 rounded-full">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
          <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Live_Sync</span>
        </div>
      </div>

      <div className="relative h-[250px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          {stack.map((skill, i) => {
            const isVisible = (i >= activeIdx && i < activeIdx + 4) || (i + stack.length < activeIdx + 4);
            if (!isVisible) return null;
            
            return (
              <motion.div 
                key={skill}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="mb-4 last:mb-0"
              >
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-6 group/blade hover:border-cyan-500/30 transition-all duration-500">
                  <div className="flex items-center gap-4 min-w-[100px]">
                    <div className="w-7 h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center group-hover/blade:border-cyan-500/50 transition-colors">
                      <Code2 size={12} className="text-white/20 group-hover/blade:text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover/blade:text-white transition-colors">
                      {skill}
                    </span>
                  </div>

                  {/* Dynamic Bit-Stream Effect */}
                  <div className="flex-1 flex gap-1 overflow-hidden opacity-20">
                    {[...Array(15)].map((_, j) => (
                      <motion.div 
                        key={j}
                        animate={{ opacity: [0.1, 1, 0.1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                        className="w-0.5 h-3 bg-cyan-500 rounded-full"
                      />
                    ))}
                  </div>

                  <div className="flex flex-col items-end min-w-[60px]">
                    <span className="text-[7px] text-white/20 uppercase tracking-tighter font-black">Latency</span>
                    <span className="text-[9px] font-black text-fuchsia-500/60 italic">
                      {(Math.random() * 10 + 2).toFixed(1)}ms
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4 relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-[8px] text-white/10 uppercase tracking-[0.5em] font-black">Progressive_Analysis</span>
          <span className="text-[8px] text-cyan-400/40 uppercase font-black">Status: Optimized</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-cyan-500/40"
          />
        </div>
      </div>
    </div>
  );
};

const NeuralBreaker: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [ballPos, setBallPos] = React.useState({ x: 50, y: 80 });
  const [paddlePos, setPaddlePos] = React.useState(50);
  const [bricks, setBricks] = React.useState(() => 
    [...Array(12)].map((_, i) => ({ id: i, active: true }))
  );
  
  const ballRef = React.useRef({ x: 50, y: 80 });
  const velocityRef = React.useRef({ x: 0.8, y: -0.8 });
  const paddleRef = React.useRef(50);
  const bricksRef = React.useRef([...Array(12)].map((_, i) => ({ id: i, active: true })));
  const requestRef = React.useRef<number>();

  const resetGame = () => {
    ballRef.current = { x: 50, y: 80 };
    velocityRef.current = { x: 0.8, y: -0.8 };
    bricksRef.current = bricksRef.current.map(b => ({ ...b, active: true }));
    setBallPos({ x: 50, y: 80 });
    setBricks(bricksRef.current);
    setScore(0);
  };

  const update = React.useCallback(() => {
    if (!isPlaying) return;

    const ball = ballRef.current;
    const velocity = velocityRef.current;
    const paddle = paddleRef.current;

    let newX = ball.x + velocity.x;
    let newY = ball.y + velocity.y;

    // Wall collisions
    if (newX <= 0 || newX >= 100) velocity.x *= -1;
    if (newY <= 0) velocity.y *= -1;

    // Paddle collision
    if (newY >= 85 && newY <= 90 && Math.abs(newX - paddle) < 15) {
      velocity.y *= -1;
      newY = 84;
    }

    // Brick collision
    let hit = false;
    let hitIdx = -1;
    bricksRef.current.forEach((brick, i) => {
      if (!brick.active || hit) return;
      const brickX = (i % 4) * 25 + 12.5;
      const brickY = Math.floor(i / 4) * 15 + 10;
      
      if (Math.abs(newX - brickX) < 12 && Math.abs(newY - brickY) < 7) {
        hit = true;
        hitIdx = i;
      }
    });

    if (hit) {
      velocity.y *= -1;
      bricksRef.current[hitIdx].active = false;
      setBricks([...bricksRef.current]);
      setScore(s => s + 100);
    }

    // Game Over
    if (newY >= 100) {
      setIsPlaying(false);
      resetGame();
      return;
    }

    ballRef.current = { x: newX, y: newY };
    setBallPos({ x: newX, y: newY });
    requestRef.current = requestAnimationFrame(update);
  }, [isPlaying]);

  React.useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(update);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, update]);

  return (
    <div className="relative p-6 bg-black/40 border border-white/5 rounded-3xl overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Zap size={14} className="text-yellow-400" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-400">Neural_Breaker_v1.0</h3>
        </div>
        <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Score: {score}</div>
      </div>

      <div 
        className="relative h-[200px] w-full bg-white/[0.02] border border-white/5 rounded-xl cursor-none"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const clampedX = Math.min(Math.max(x, 10), 90);
          paddleRef.current = clampedX;
          setPaddlePos(clampedX);
        }}
        onClick={() => !isPlaying && setIsPlaying(true)}
      >
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 backdrop-blur-sm">
            <button className="px-6 py-2 bg-yellow-400 text-black font-black text-[10px] uppercase tracking-widest rounded-lg animate-pulse">
              Initialize_Game_Session
            </button>
          </div>
        )}

        {/* Bricks */}
        <div className="absolute inset-0 p-2 grid grid-cols-4 gap-2">
          {bricks.map((brick, i) => (
            <div 
              key={brick.id}
              className={cn(
                "h-4 rounded-sm transition-all duration-300",
                brick.active ? "bg-cyan-500/20 border border-cyan-500/40" : "opacity-0 scale-0"
              )}
            />
          ))}
        </div>

        {/* Ball */}
        <div 
          className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,1)] transition-transform duration-75 ease-linear"
          style={{ 
            left: `${ballPos.x}%`, 
            top: `${ballPos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Paddle */}
        <div 
          className="absolute bottom-4 h-1.5 bg-white rounded-full transition-all duration-75"
          style={{ left: `${paddlePos}%`, width: '20%', transform: 'translateX(-50%)' }}
        />
      </div>
      
      <div className="mt-4 flex justify-between items-center text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
        <span>{"// Move Mouse to Control"}</span>
        <span>{"// Bypass_System_Restrictions"}</span>
      </div>
    </div>
  );
};

const AIAssistantHUD: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{role: 'ai' | 'user', content: string}[]>([
    { role: 'ai', content: "SYSTEM_READY. I am your neural interface. How can I assist with codebase analysis today?" }
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    setTimeout(() => {
      const responses = [
        "Analyzing architectural patterns...",
        "Neural sync complete. Repository health: 98.4%",
        "Codebase velocity optimized. No bottlenecks detected.",
        "Secure tunnel established. Signal integrity: OPTIMAL."
      ];
      setMessages(prev => [...prev, { role: 'ai', content: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-32 right-10 z-[30] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[320px] bg-black/80 backdrop-blur-3xl border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
          >
            <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrainCircuit size={16} className="text-cyan-400" />
                <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">Neural_Interface</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <ChevronRight size={16} className="rotate-90" />
              </button>
            </div>
            
            <div className="h-[300px] overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-[10px] leading-relaxed ${msg.role === 'user' ? "bg-cyan-500 text-black font-bold" : "bg-white/5 text-cyan-400/80 border border-white/5"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSend} className="p-4 bg-white/[0.02] border-t border-white/5">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query system..."
                className="w-full bg-transparent border-none outline-none text-[10px] text-white placeholder:text-white/10 uppercase font-bold"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onClick={() => !isOpen && setIsOpen(true)}
        className="p-4 bg-black/60 backdrop-blur-3xl border border-cyan-500/20 rounded-2xl cursor-pointer shadow-[0_0_50px_rgba(34,211,238,0.1)] group"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full animate-pulse" />
            <BrainCircuit size={24} className="text-cyan-400 relative z-10" />
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-[10px] font-black text-cyan-400 tracking-widest uppercase">AI_Assistant</span>
            <span className="text-[8px] text-white/20 tracking-tighter uppercase">Status: ONLINE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const LegendHeading: React.FC<{ number: string, title: string, subtitle?: string, icon: any }> = ({ number, title, subtitle, icon: Icon }) => (
  <div className="flex flex-col gap-2 mb-10">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[9px] font-black text-cyan-400 tracking-[0.3em]">
        <Icon size={12} />
        <span>{number}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
    <div className="flex flex-col">
      <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none group-hover:text-cyan-400 transition-colors">
        {title}<span className="text-cyan-500">.</span>
      </h2>
      {subtitle && <span className="text-[9px] text-white/20 uppercase tracking-[0.5em] mt-2 font-black">{subtitle}</span>}
    </div>
  </div>
);

const CreativeTemplate: React.FC<PortfolioProps> = ({ data, embedded = false }) => {
  const { about, featured_projects, tech_stack, github_stats, contact } = data;
  const bioText = about.bio?.trim() || 'Building in public on GitHub.';
  const nameParts = about.name.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? 'Developer';
  const restName = nameParts.slice(1).join(' ');
  const primary = github_stats.primary_language?.trim() || '';

  return (
    <div className="min-h-screen bg-[#080809] text-[#E0E0E6] selection:bg-cyan-500 selection:text-black font-mono overflow-x-hidden futuristic-scroll">
      <AIAssistantHUD />

      {/* Background Architecture + scroll-linked grid */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,12,1)_0%,rgba(5,5,6,1)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Color Science: Atmospheric Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-fuchsia-500/[0.02] blur-[150px] rounded-full" />
      </motion.div>
      <CreativeScrollBackdrop />

      {!embedded && (
        <header className="fixed top-0 left-0 right-0 z-30 h-20 border-b border-white/[0.03] bg-[#080809]/80 backdrop-blur-xl flex items-center px-10">
          <div className="flex items-center gap-8 w-full">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-center">
                <ShieldCheck size={20} className="text-cyan-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black tracking-[0.3em] uppercase">Devanta_OS</span>
                <span className="text-[9px] text-white/20 tracking-widest uppercase">Legend_Protocol_v3.2</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/5" />

            <div className="hidden md:flex items-center gap-10">
              <div className="flex items-center gap-3">
                <Radio size={14} className="text-cyan-500 animate-pulse" />
                <span className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">Uplink: Active</span>
              </div>
              <div className="flex items-center gap-3">
                <Activity size={14} className="text-fuchsia-500" />
                <span className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">Core: Stable</span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-6">
              <SystemTerminal />
            </div>
          </div>
        </header>
      )}

      <main
        className={`relative z-10 pb-20 max-w-[1800px] mx-auto px-6 lg:px-10 ${
          embedded ? 'pt-6 md:pt-10' : 'pt-32'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* SIDEBAR LEFT (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <ScrollReveal3D variant="creative" className="rounded-3xl">
              <section className="p-8 bg-gradient-to-br from-white/[0.04] to-transparent border border-cyan-500/15 rounded-3xl relative overflow-hidden group shadow-[0_24px_80px_-40px_rgba(34,211,238,0.12)]">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Lock size={60} />
              </div>
              
              <div className="space-y-8">
                <div className="relative inline-block">
                  <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  {/* Neural Pulse Rings */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                        className="absolute inset-0 border border-cyan-500/30 rounded-2xl"
                      />
                    ))}
                  </div>
                  
                  <ScrollParallaxLayer depth={0.75} intensity="soft" className="relative inline-block">
                    {about.avatar_url ? (
                      <img
                        src={about.avatar_url}
                        alt=""
                        className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 border border-cyan-500/20 shadow-[0_20px_50px_-20px_rgba(34,211,238,0.25)]"
                      />
                    ) : (
                      <div
                        className="relative flex h-32 w-32 lg:h-40 lg:w-40 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-2xl font-black text-cyan-500/50"
                        aria-hidden
                      >
                        {initialsFromName(about.name)}
                      </div>
                    )}
                  </ScrollParallaxLayer>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic leading-none">
                    {firstName}
                    <br />
                    <span
                      className="text-transparent stroke-text"
                      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                    >
                      {restName || '—'}
                    </span>
                  </h1>
                  <p className="text-xs text-white/40 leading-relaxed italic">
                    {"// "}
                    {bioText}
                  </p>
                  {primary ? (
                    <p className="text-[9px] text-cyan-500/50 uppercase tracking-widest font-black">
                      Primary_lang: <span className="text-cyan-400">{primary}</span>
                    </p>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[8px] text-white/20 uppercase tracking-widest block mb-1">Total_Stars</span>
                    <span className="text-2xl font-black text-cyan-400 italic leading-none">{github_stats.total_stars}</span>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[8px] text-white/20 uppercase tracking-widest block mb-1">Repos</span>
                    <span className="text-2xl font-black text-fuchsia-500 italic leading-none">{github_stats.total_repos}</span>
                  </div>
                </div>

                <motion.a 
                  href={contact.socials.github}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-[9px] flex items-center justify-center gap-3 transition-colors hover:bg-cyan-400 rounded-xl shadow-[0_12px_32px_-12px_rgba(34,211,238,0.35)]"
                >
                  Sync_Archive <Github size={14} />
                </motion.a>
              </div>
            </section>
            </ScrollReveal3D>

            <AIInsights />
            
            <div className="hidden lg:block">
              <SystemSublayersStream stack={tech_stack} />
            </div>
          </div>

          {/* MAIN CENTER (6 cols) */}
          <div className="lg:col-span-6 space-y-10">
            <ScrollReveal3D variant="creative" className="block">
            <section className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden relative group">
              {/* AI System Scanner Line */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20 pointer-events-none"
              />
              
              <div className="p-8 lg:p-10">
                <LegendHeading 
                  number="0x01" 
                  title="Repository_Archive" 
                  subtitle={`Active_Deployments: ${featured_projects.length}`}
                  icon={Box}
                />

                <div className="space-y-6">
                  {featured_projects.length === 0 ? (
                    <p className="text-xs text-white/30 italic leading-relaxed py-8 border border-dashed border-white/10 rounded-2xl text-center px-6">
                      {'// '}No public repositories in this preview — try another username or confirm repos are public.
                    </p>
                  ) : null}
                  {featured_projects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 28 }}
                      viewport={{ once: true }}
                      className="transform-gpu"
                    >
                    <div className="p-6 lg:p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-cyan-500/10 rounded-2xl group/item hover:border-cyan-500/30 hover:shadow-[0_28px_60px_-32px_rgba(34,211,238,0.15)] transition-all duration-500 relative">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-cyan-500/40 italic">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-2xl lg:text-3xl font-black uppercase italic group-hover/item:text-cyan-400 transition-colors">
                              {project.name}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {project.language ? (
                              <span className="text-[8px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20 uppercase tracking-widest font-black">
                                {project.language}
                              </span>
                            ) : (
                              <span className="text-[8px] px-2 py-0.5 bg-white/5 text-white/25 rounded border border-white/10 uppercase tracking-widest font-black">
                                —
                              </span>
                            )}
                            {project.topics?.slice(0, 3).map((topic) => (
                              <span key={topic} className="text-[8px] px-2 py-0.5 bg-white/5 text-white/40 rounded border border-white/5 uppercase tracking-widest">
                                {topic}
                              </span>
                            ))}
                          </div>
                          
                          {project.description?.trim() ? (
                            <p className="text-xs lg:text-sm text-white/40 leading-relaxed italic max-w-xl group-hover/item:text-white/70 transition-colors">
                              {"// "}
                              {project.description.trim()}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 text-cyan-500">
                              <Zap size={14} fill="currentColor" className="animate-pulse" />
                              <span className="text-sm font-black italic">{project.stars}</span>
                            </div>
                            <span className="text-[7px] text-white/20 uppercase tracking-widest font-black mt-1 text-right">Stars_Aligned</span>
                          </div>
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover/item:bg-cyan-500 group-hover/item:text-black transition-all duration-500 shadow-xl">
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
            </ScrollReveal3D>

            {/* System: Secure Transmission */}
            <ScrollReveal3D variant="creative" className="grid md:grid-cols-2 gap-8 lg:gap-10">
               <div className="p-8 lg:p-10 bg-white/[0.01] border border-white/5 rounded-3xl space-y-8">
                  <LegendHeading 
                    number="0x02" 
                    title="Uplink" 
                    subtitle="Secure_Comms_Channel"
                    icon={Binary}
                  />
                  <p className="text-xs lg:text-sm text-white/30 italic leading-relaxed">
                    Seeking architectural alignment or high-bandwidth collaboration. Secure channel open for transmission.
                  </p>
                  <div className="p-6 bg-black/40 border border-white/5 rounded-2xl group hover:border-cyan-500/30 transition-colors">
                    <span className="text-[8px] text-white/20 uppercase tracking-widest block mb-2 font-black">Endpoint</span>
                    {contact.email ? (
                      <a href={`mailto:${contact.email}`} className="text-base lg:text-lg font-black break-all group-hover:text-cyan-400 transition-colors italic">
                        {contact.email}
                      </a>
                    ) : (
                      <a
                        href={contact.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base lg:text-lg font-black break-all group-hover:text-cyan-400 transition-colors italic"
                      >
                        github.com/{contact.github_username}
                      </a>
                    )}
                  </div>
               </div>

               <form className="p-8 lg:p-10 bg-white/[0.01] border border-white/5 rounded-3xl space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <div className="relative">
                      <input type="text" placeholder="IDENTITY_TOKEN" className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors text-[10px] uppercase font-black placeholder:text-white/10" />
                    </div>
                    <div className="relative">
                      <textarea rows={4} placeholder="PAYLOAD_DATA..." className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors text-[10px] uppercase font-black placeholder:text-white/10 resize-none" />
                    </div>
                    <button className="w-full py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-cyan-400 transition-colors rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                      Execute_Transmission <ChevronRight size={16} />
                    </button>
                  </div>
               </form>
            </ScrollReveal3D>
          </div>

          {/* SIDEBAR RIGHT (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            <ActiveTerminal />
            
            <NeuralBreaker />

            <div className="lg:hidden">
              <SystemSublayersStream stack={tech_stack} />
            </div>

            <section className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">System_Health</span>
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">100%</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Neural_Load', val: '12.4%', color: 'bg-cyan-500' },
                  { label: 'Sync_Stability', val: '99.9%', color: 'bg-fuchsia-500' },
                  { label: 'Uplink_Integrity', val: 'Secure', color: 'bg-green-500' }
                ].map(item => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-tighter">
                      <span className="text-white/40">{item.label}</span>
                      <span className="text-white/60">{item.val}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: item.val.includes('%') ? item.val : '100%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-1000">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">
            <span>© {new Date().getFullYear()} {about.name}</span>
            <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
            <span>Made with Devanta</span>
          </div>
          <div className="flex gap-10">
            <span className="text-[9px] font-black text-white/10 uppercase tracking-widest hover:text-cyan-500 transition-colors cursor-pointer">Security_Audit</span>
            <span className="text-[9px] font-black text-white/10 uppercase tracking-widest hover:text-cyan-500 transition-colors cursor-pointer">Neural_Sync</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CreativeTemplate;
