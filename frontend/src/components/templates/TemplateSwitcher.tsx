'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Sparkles, Command, Cpu, Layout, Layers, X } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TemplateSwitcherProps {
  current: string;
  onSelect: (template: string) => void;
}

const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({ current, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const templates = [
    { id: 'minimal', icon: Layout, label: 'Editorial', desc: 'Minimal' },
    { id: 'modern', icon: Layers, label: 'Modern', desc: 'SaaS Pro' },
    { id: 'creative', icon: Cpu, label: 'Creative', desc: 'Legend' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getThemeStyles = () => {
    switch (current) {
      case 'creative':
        return {
          bg: "bg-[#0A0A0A]/90",
          border: "border-cyan-500/30",
          accent: "bg-cyan-500",
          text: "text-cyan-400",
          font: "font-mono",
          glow: "shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        };
      case 'modern':
        return {
          bg: "bg-white/95",
          border: "border-slate-200",
          accent: "bg-indigo-600",
          text: "text-indigo-600",
          font: "font-sans",
          glow: "shadow-2xl"
        };
      default:
        return {
          bg: "bg-white/95",
          border: "border-slate-200",
          accent: "bg-black",
          text: "text-black",
          font: "font-serif",
          glow: "shadow-xl"
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className="fixed bottom-8 right-6 sm:bottom-10 sm:right-10 z-[50] flex items-end justify-end pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="minimized"
            layoutId="switcher-shell"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center border backdrop-blur-xl transition-all duration-500",
              theme.bg,
              theme.border,
              theme.glow
            )}
          >
            <div className="relative">
              <Command size={24} className={theme.text} />
              <div className={cn("absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white", theme.accent)} />
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layoutId="switcher-shell"
            initial={{ width: 60, height: 60, opacity: 0 }}
            animate={{ width: 'auto', height: 'auto', opacity: 1 }}
            exit={{ width: 60, height: 60, opacity: 0 }}
            className={cn(
              "p-2 rounded-[2rem] border backdrop-blur-2xl flex items-center gap-2",
              theme.bg,
              theme.border,
              theme.glow
            )}
          >
            <div className="flex items-center gap-1.5 p-1">
              {templates.map((t) => {
                const isActive = current === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelect(t.id);
                      setIsExpanded(false);
                    }}
                    className={cn(
                      "relative flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300",
                      isActive ? "text-white" : "text-slate-500 hover:text-slate-900",
                      theme.font
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-bg"
                        className={cn("absolute inset-0 rounded-2xl -z-10", theme.accent)}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <t.icon size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <div className="w-px h-10 bg-white/10 mx-1" />
            
            <button
              onClick={() => setIsExpanded(false)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateSwitcher;
