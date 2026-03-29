'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, LayoutTemplate, Sparkles } from 'lucide-react';

export type PreviewTheme = 'minimal' | 'modern' | 'creative';

function resolvePreviewTheme(template: string): PreviewTheme {
  const k = template.toLowerCase();
  if (k === 'modern' || k === 'creative') return k;
  return 'minimal';
}

const themes: Record<
  PreviewTheme,
  {
    bar: string;
    shell: string;
    border: string;
    backBtn: string;
    label: string;
    name: string;
    hint: string;
    iconWrap: string;
    iconGlow: string;
  }
> = {
  minimal: {
    bar: 'from-neutral-400 via-black to-neutral-400',
    shell: 'bg-white/95 text-neutral-900 border-neutral-200/80',
    border: 'border-b border-neutral-200/90',
    backBtn:
      'text-neutral-600 hover:text-black hover:bg-neutral-100 border border-transparent hover:border-neutral-200',
    label: 'text-neutral-500',
    name: 'font-semibold text-neutral-900',
    hint: 'text-neutral-500',
    iconWrap: 'bg-neutral-900 text-white',
    iconGlow: 'shadow-neutral-900/15',
  },
  modern: {
    bar: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    shell: 'bg-white/90 text-slate-900 border-indigo-100/60',
    border: 'border-b border-indigo-100/70',
    backBtn:
      'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 border border-transparent hover:border-indigo-100',
    label: 'text-slate-500',
    name: 'font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-700',
    hint: 'text-slate-500',
    iconWrap: 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white',
    iconGlow: 'shadow-indigo-500/25',
  },
  creative: {
    bar: 'from-cyan-400 via-fuchsia-500 to-violet-600',
    shell: 'bg-[#080809]/95 text-slate-200 border-cyan-500/15',
    border: 'border-b border-white/[0.06]',
    backBtn:
      'text-cyan-200/80 hover:text-cyan-100 hover:bg-white/[0.04] border border-transparent hover:border-cyan-500/25 font-mono',
    label: 'text-cyan-500/70 font-mono text-[11px] uppercase tracking-widest',
    name: 'font-semibold text-cyan-100 font-mono',
    hint: 'text-slate-500 font-mono',
    iconWrap: 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400',
    iconGlow: 'shadow-[0_0_24px_rgba(34,211,238,0.15)]',
  },
};

interface PreviewChromeProps {
  theme: string;
  username: string;
  onBack: () => void;
}

export default function PreviewChrome({ theme, username, onBack }: PreviewChromeProps) {
  const key = resolvePreviewTheme(theme);
  const t = themes[key];

  return (
    <div className="relative z-[40]">
      <motion.div
        layout
        initial={{ scaleX: 0.3, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
        className={`h-[3px] w-full origin-left bg-gradient-to-r ${t.bar}`}
        aria-hidden
      />
      <motion.header
        layout
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 34, delay: 0.05 }}
        className={`sticky top-0 backdrop-blur-xl supports-[backdrop-filter]:backdrop-blur-md ${t.border} ${t.shell} shadow-[0_12px_40px_-20px_rgba(0,0,0,0.15)]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <motion.button
              type="button"
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors shrink-0 ${t.backBtn}`}
              aria-label="Back to landing — enter a new GitHub link"
            >
              <ArrowLeft size={18} aria-hidden />
              <span className="hidden sm:inline">New link</span>
            </motion.button>
            <span
              className={`h-5 w-px hidden sm:block opacity-40 ${key === 'creative' ? 'bg-cyan-500/40' : 'bg-current'}`}
              aria-hidden
            />
            <div className="flex items-center gap-2 min-w-0 text-sm">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${t.iconWrap} shadow-md ${t.iconGlow}`}
              >
                <LayoutTemplate size={16} aria-hidden />
              </span>
              <span className={`truncate ${t.label}`}>
                Preview · <span className={t.name}>{username}</span>
              </span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 }}
            className={`flex items-center gap-2 text-xs ${t.hint}`}
          >
            <Sparkles size={14} className="opacity-80 shrink-0 text-fuchsia-400" aria-hidden />
            <Github size={14} className="shrink-0 opacity-70" aria-hidden />
            <span className="hidden sm:inline max-w-[min(280px,40vw)]">
              Templates — bottom-right control
            </span>
            <span className="sm:hidden">↘</span>
          </motion.div>
        </div>
      </motion.header>
    </div>
  );
}
