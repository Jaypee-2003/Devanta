'use client';

import React from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Loader2,
  Sparkles,
  Link2,
  AlertCircle,
  Zap,
  Palette,
  Globe,
  ArrowRight,
  Layers,
  Rocket,
  Shield,
  Clock,
  Monitor,
  HelpCircle,
  ChevronDown,
  Star,
  MousePointerClick,
  Heart,
  ExternalLink,
  Code2,
} from 'lucide-react';
import {
  LandingScrollBackdrop,
  ScrollReveal3D,
  ScrollParallaxLayer,
} from '@/components/motion/ScrollScene3D';

interface LandingPageProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

/** Creator & project links — update repo URL when published */
const CREATOR = {
  name: 'Jaypee Behera',
  handle: 'jaypeebehera',
  github: 'https://github.com/jaypeebehera',
  repo: 'https://github.com/jaypeebehera/devanta',
} as const;

function AnimatedOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-violet-600/25 blur-[100px]" />
        <div className="absolute top-1/4 -right-20 h-[380px] w-[380px] rounded-full bg-fuchsia-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-cyan-500/15 blur-[90px]" />
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-violet-600/30 blur-[100px]"
        animate={{ x: [0, 24, -12, 0], y: [0, -16, 8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/4 -right-20 h-[380px] w-[380px] rounded-full bg-fuchsia-500/25 blur-[100px]"
        animate={{ x: [0, -20, 14, 0], y: [0, 22, -10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-cyan-400/18 blur-[90px]"
        animate={{ scale: [1, 1.08, 0.95, 1], opacity: [0.35, 0.55, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/** Layered aurora, mesh, grain & vignette — pairs with `LandingScrollBackdrop` */
function LandingAmbientBackground({ reduced }: { reduced: boolean }) {
  return (
    <>
      <div
        className="fixed inset-0 z-0 bg-[linear-gradient(168deg,#020617_0%,#0a1628_28%,#111c2f_55%,#030712_100%)]"
        aria-hidden
      />
      <div className="fixed inset-0 z-0 bg-mesh-hero opacity-[0.97] pointer-events-none mix-blend-screen" />
      {!reduced && (
        <>
          <motion.div
            className="fixed left-[-20%] top-[-25%] h-[85vh] w-[min(140vw,900px)] rounded-full pointer-events-none z-0 opacity-70"
            style={{
              background:
                'radial-gradient(closest-side, rgba(124,58,237,0.45), rgba(167,139,250,0.08) 55%, transparent 70%)',
              filter: 'blur(48px)',
            }}
            animate={{ x: [0, 32, -16, 0], y: [0, 20, -12, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="fixed right-[-15%] bottom-[-15%] h-[75vh] w-[min(120vw,800px)] rounded-full pointer-events-none z-0 opacity-60"
            style={{
              background:
                'radial-gradient(closest-side, rgba(34,211,238,0.35), rgba(6,182,212,0.12) 50%, transparent 68%)',
              filter: 'blur(56px)',
            }}
            animate={{ x: [0, -28, 14, 0], y: [0, -18, 10, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <motion.div
            className="fixed inset-[-40%] z-0 pointer-events-none opacity-[0.14] mix-blend-screen"
            style={{
              background:
                'conic-gradient(from 200deg at 50% 45%, rgba(124,58,237,0.35), transparent 28%, rgba(217,70,239,0.25) 52%, transparent 72%, rgba(34,211,238,0.2))',
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 220, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}
      <div
        className="fixed inset-0 z-[1] pointer-events-none bg-landing-shine bg-[length:200%_100%] opacity-50 mix-blend-soft-light"
        aria-hidden
      />
      <div
        className="fixed inset-0 z-[1] pointer-events-none bg-noise-fine opacity-[0.055] mix-blend-overlay"
        aria-hidden
      />
      <div className="fixed inset-0 z-[2] pointer-events-none landing-vignette" aria-hidden />
    </>
  );
}

const navLink =
  'text-sm font-medium text-slate-400 hover:text-white transition-colors';

const TEMPLATE_DECK = [
  {
    name: 'Minimal',
    tag: 'Editorial',
    line: 'Typography-first, lots of whitespace.',
    accent: 'from-slate-200/20 to-white/5',
    chip: 'bg-slate-500/20 text-slate-200',
  },
  {
    name: 'Modern',
    tag: 'SaaS polish',
    line: 'Gradients, cards, confident CTAs.',
    accent: 'from-indigo-500/25 to-violet-500/10',
    chip: 'bg-indigo-500/20 text-indigo-200',
  },
  {
    name: 'Creative',
    tag: 'Futuristic',
    line: 'HUD, terminal vibes, high energy.',
    accent: 'from-cyan-500/20 to-fuchsia-500/10',
    chip: 'bg-cyan-500/15 text-cyan-200',
  },
] as const;

/** Browser-style mock — familiar SaaS visual, no 3D stack */
function HeroPreviewMock() {
  return (
    <div className="hidden lg:block w-full max-w-[420px] ml-auto">
      <div className="rounded-2xl border border-white/10 bg-slate-900/90 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06] overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-slate-950/90">
          <div className="flex gap-1.5 shrink-0" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="min-w-0 flex-1 rounded-lg bg-white/[0.06] px-3 py-1.5 text-left">
            <p className="text-[10px] font-mono text-slate-500 truncate">devanta.app · preview</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex items-start gap-3">
            <div
              className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-md"
              aria-hidden
            />
            <div className="min-w-0 flex-1 space-y-2 pt-0.5">
              <div className="h-3.5 w-3/4 max-w-[200px] rounded-md bg-white/10" aria-hidden />
              <div className="h-2.5 w-1/2 max-w-[140px] rounded-md bg-white/[0.06]" aria-hidden />
            </div>
          </div>

          <div className="space-y-2" aria-hidden>
            <div className="h-2 rounded bg-white/[0.07] w-full" />
            <div className="h-2 rounded bg-white/[0.07] w-[92%]" />
            <div className="h-2 rounded bg-white/[0.05] w-[70%]" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Top repos
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="h-2 w-24 rounded bg-white/15" aria-hidden />
                <span className="text-[10px] font-mono text-amber-400/90">★ 128</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="h-2 w-28 rounded bg-white/10" aria-hidden />
                <span className="text-[10px] font-mono text-amber-400/80">★ 84</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Theme
            </p>
            <div className="flex rounded-xl bg-black/40 p-1 border border-white/[0.06]">
              {TEMPLATE_DECK.map((t, i) => (
                <span
                  key={t.name}
                  className={`flex-1 text-center text-[10px] font-semibold py-2 rounded-lg transition-colors ${
                    i === 1
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  {t.name}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500 leading-snug">{TEMPLATE_DECK[1].line}</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[11px] text-slate-600">Illustration · not your data</p>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    q: 'Do I need a GitHub account to try Devanta?',
    a: 'No signup here. You only need a public GitHub username or profile URL. We never ask for your password.',
  },
  {
    q: 'What data do you use?',
    a: 'Only what is already public on GitHub: profile, public repos, stars, languages, and topics. Private repos and emails are not accessed.',
  },
  {
    q: 'Can I use a repo URL instead of a profile?',
    a: 'Yes. Paste a link to any public repo—we resolve the owner and build the portfolio from their profile.',
  },
  {
    q: 'Is this a hosted website for my domain?',
    a: 'Devanta is a live preview inside this app—great for demos and iteration. For a custom domain, export the idea to your own site when you are ready.',
  },
] as const;

export default function LandingPage({
  input,
  onInputChange,
  onSubmit,
  loading,
  error,
}: LandingPageProps) {
  const reduced = useReducedMotion() ?? false;

  const fade = reduced
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

  return (
    <div
      id="top"
      className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-500/40 selection:text-white"
    >
      <LandingAmbientBackground reduced={reduced} />
      <AnimatedOrbs reduced={reduced} />
      <LandingScrollBackdrop />
      <div
        className="fixed inset-0 z-[3] pointer-events-none bg-[linear-gradient(180deg,rgba(2,6,23,0.35)_0%,transparent_38%,rgba(3,7,18,0.55)_72%,rgba(2,6,17,0.92)_100%)]"
        aria-hidden
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/65">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
            <a
              href="#hero"
              className="group flex items-center gap-3 scroll-mt-28 focus-visible:rounded-lg"
              aria-label="Devanta home"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-fuchsia-500/25">
                <Layers className="text-white" size={18} strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Devanta
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Portfolio
                </span>
              </span>
            </a>
            <nav
              className="flex items-center gap-3 sm:gap-5 flex-wrap justify-end max-w-[min(100%,28rem)] sm:max-w-none"
              aria-label="Primary"
            >
              <a href="#hero" className={`hidden xl:inline ${navLink}`}>
                Home
              </a>
              <a href="#themes" className={`hidden lg:inline ${navLink}`}>
                Themes
              </a>
              <a href="#how" className={`hidden sm:inline ${navLink}`}>
                How it works
              </a>
              <a href="#faq" className={`hidden md:inline ${navLink}`}>
                FAQ
              </a>
              <a href="#story" className={`hidden lg:inline ${navLink}`}>
                Story
              </a>
              <a
                href="#generate"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 ring-1 ring-white/10 hover:brightness-110 transition-all"
              >
                Try free
                <ArrowRight size={14} className="opacity-90" />
              </a>
            </nav>
          </div>
        </header>

        <main className="flex flex-col">
          {/* —— Hero —— */}
          <ScrollReveal3D
            variant="landing"
            id="hero"
            className="min-h-[min(92dvh,840px)] flex flex-col justify-center border-b border-white/[0.05]"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full pt-10 md:pt-16 pb-14 md:pb-20">
              <div className="grid lg:grid-cols-[1fr_min(380px,42%)] gap-10 lg:gap-14 items-center">
                <div className="max-w-2xl lg:max-w-none">
                  <motion.div
                    {...fade}
                    className="mb-6 flex flex-wrap items-center gap-3"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/[0.12] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-fuchsia-200">
                      <Sparkles size={12} className="text-fuchsia-300" aria-hidden />
                      Free forever
                    </span>
                    <span className="text-sm text-slate-500">No signup · No card · Public GitHub only</span>
                  </motion.div>

                  <ScrollParallaxLayer depth={0.08} intensity="soft" className="max-w-[22rem] sm:max-w-3xl lg:max-w-4xl">
                    <motion.h1
                      {...fade}
                      transition={{ duration: 0.5 }}
                      className="text-[clamp(2.25rem,6.8vw,3.75rem)] sm:text-[clamp(2.5rem,6.5vw,4.1rem)] font-bold leading-[1.06] tracking-tight"
                    >
                      <span className="text-white">Stop sending a bare GitHub link.</span>
                      <span className="mt-2 block bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                        Send a portfolio that sells your craft.
                      </span>
                    </motion.h1>
                  </ScrollParallaxLayer>

                  <motion.p
                    {...fade}
                    transition={{ duration: 0.5, delay: 0.06 }}
                    className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl"
                  >
                    <strong className="font-semibold text-slate-200">Devanta</strong> turns your public profile
                    into a recruiter-ready page in seconds—repos, stars, languages, and bio, styled in{' '}
                    <strong className="font-semibold text-slate-200">three themes</strong> you can flip until it
                    feels like you.
                  </motion.p>

                  <motion.div
                    {...fade}
                    transition={{ duration: 0.5, delay: 0.09 }}
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {['Interviews', 'Freelance clients', 'Personal brand'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    {...fade}
                    transition={{ duration: 0.5, delay: 0.11 }}
                    className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Zap size={16} className="text-amber-400/90 shrink-0" aria-hidden />
                      Live in under a minute
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Star size={16} className="text-violet-400/90 shrink-0" aria-hidden />
                      Looks designed—not scraped
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MousePointerClick size={16} className="text-cyan-400/80 shrink-0" aria-hidden />
                      Paste once, iterate free
                    </span>
                  </motion.div>

                  <motion.div
                    {...fade}
                    transition={{ duration: 0.5, delay: 0.13 }}
                    className="mt-10 flex flex-wrap items-center gap-3"
                  >
                    <a
                      href="#generate"
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 ring-1 ring-white/10 hover:brightness-110 transition-all"
                    >
                      Build my preview
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                    <a
                      href="#themes"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/[0.14] transition-colors"
                    >
                      <Palette size={16} aria-hidden />
                      Browse themes
                    </a>
                  </motion.div>

                  <motion.p
                    {...fade}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className="mt-8 text-xs text-slate-600"
                  >
                    Simple flow: paste URL → preview → pick Minimal, Modern, or Creative → share or refine.
                  </motion.p>
                </div>

                <HeroPreviewMock />
              </div>
            </div>
          </ScrollReveal3D>

          {/* —— Generate —— */}
          <ScrollReveal3D
            variant="landing"
            id="generate"
            className="scroll-mt-24 border-b border-white/[0.05] py-20 md:py-28"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="flex flex-wrap gap-4 justify-center mb-10 text-center">
                {[
                  { icon: Shield, label: 'Public API only' },
                  { icon: Clock, label: 'Results in seconds' },
                  { icon: Monitor, label: 'Works on mobile & desktop' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300"
                  >
                    <Icon size={14} className="text-violet-400" aria-hidden />
                    {label}
                  </div>
                ))}
              </div>

              <motion.div
                className="relative rounded-[1.75rem] p-[1px] bg-gradient-to-br from-fuchsia-500/70 via-violet-500/60 to-cyan-400/50 shadow-[0_0_80px_-20px_rgba(168,85,247,0.45)]"
                initial={reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              >
                <div className="rounded-[1.7rem] bg-slate-900/92 backdrop-blur-xl border border-white/5 p-6 sm:p-10 md:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-14">
                    <div className="flex-1 space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-fuchsia-300 ring-1 ring-fuchsia-500/20">
                        <Rocket size={12} aria-hidden />
                        Start here
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Drop your GitHub URL or username
                      </h2>
                      <p className="text-slate-400 leading-relaxed max-w-xl text-[15px]">
                        Works with <strong className="text-slate-200 font-medium">profile links</strong>,{' '}
                        <strong className="text-slate-200 font-medium">repo links</strong>, or a bare
                        username—we figure out the owner. Nothing private is requested.
                      </p>
                    </div>
                    <form
                      onSubmit={onSubmit}
                      className="w-full lg:max-w-md shrink-0 space-y-3"
                      aria-busy={loading}
                    >
                      <label htmlFor="github-input" className="sr-only">
                        GitHub profile URL or username
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <Link2
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400/70 pointer-events-none"
                            size={16}
                            aria-hidden
                          />
                          <input
                            id="github-input"
                            type="text"
                            value={input}
                            onChange={(e) => onInputChange(e.target.value)}
                            placeholder="https://github.com/octocat or octocat"
                            disabled={loading}
                            autoComplete="off"
                            spellCheck={false}
                            className="w-full min-h-[48px] pl-9 pr-3 py-3.5 rounded-2xl border border-white/10 bg-slate-950/50 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/40 disabled:opacity-55"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-bold shadow-lg shadow-fuchsia-500/25 hover:brightness-110 active:scale-[0.98] disabled:opacity-55 disabled:hover:brightness-100 transition-all whitespace-nowrap"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin" size={18} aria-hidden />
                          ) : (
                            <Sparkles size={18} aria-hidden />
                          )}
                          Generate
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        <span className="text-slate-400 font-medium">Examples:</span>{' '}
                        <code className="text-violet-300/90">octocat</code>,{' '}
                        <code className="text-violet-300/90">github.com/vercel</code>,{' '}
                        <code className="text-violet-300/90">github.com/owner/repo</code>
                      </p>
                      <AnimatePresence mode="wait">
                        {error && (
                          <motion.div
                            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                            role="alert"
                            className="flex items-start gap-2 text-sm text-rose-100 bg-rose-500/15 border border-rose-400/30 rounded-xl px-3 py-2.5"
                          >
                            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-300" aria-hidden />
                            <span>{error}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>
              </motion.div>

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-slate-400"
                  aria-live="polite"
                >
                  <Loader2 className="animate-spin text-violet-400" size={20} aria-hidden />
                  <span>Fetching profile & repos from GitHub…</span>
                </motion.div>
              )}
            </div>
          </ScrollReveal3D>

          {/* —— Themes —— */}
          <ScrollReveal3D
            variant="landing"
            id="themes"
            className="scroll-mt-24 border-b border-white/[0.05] bg-gradient-to-b from-slate-900/30 to-transparent py-20 md:py-28"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-fuchsia-400/90 mb-4">
                Pick your vibe
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 max-w-2xl">
                Three templates. Same data—different first impression.
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mb-12 leading-relaxed">
                After you generate, use the switcher at the top to hop between looks. Each one is a full page,
                not just a color swap.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {TEMPLATE_DECK.map((t, i) => (
                  <ScrollParallaxLayer
                    key={t.name}
                    depth={0.08 + i * 0.06}
                    intensity="soft"
                    className="h-full"
                  >
                    <motion.div
                      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.06, duration: 0.45 }}
                      className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.45)] hover:border-fuchsia-500/20 transition-colors"
                    >
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${t.chip}`}
                      >
                        {t.tag}
                      </span>
                      <h3 className="mt-4 text-xl font-bold text-white">{t.name}</h3>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{t.line}</p>
                    </motion.div>
                  </ScrollParallaxLayer>
                ))}
              </div>
            </div>
          </ScrollReveal3D>

          {/* —— How —— */}
          <ScrollReveal3D
            variant="landing"
            id="how"
            className="scroll-mt-24 border-b border-white/[0.05] py-20 md:py-28"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-violet-400/90 mb-4">
                Simple pipeline
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Three steps. One stunning page.
              </h2>
              <p className="text-slate-400 mb-14 max-w-2xl leading-relaxed">
                No config files, no deploy step for the preview—just paste and explore.
              </p>
              <div className="grid md:grid-cols-3 gap-8 md:gap-6">
                {[
                  {
                    step: '01',
                    title: 'Paste',
                    desc: 'Profile or repo URL—we resolve the GitHub login automatically.',
                    icon: Link2,
                    grad: 'from-violet-500 to-indigo-600',
                  },
                  {
                    step: '02',
                    title: 'Sync',
                    desc: 'We read public profile data: repos, stars, languages, and topics.',
                    icon: Zap,
                    grad: 'from-fuchsia-500 to-pink-600',
                  },
                  {
                    step: '03',
                    title: 'Create',
                    desc: 'Choose minimal, modern, or creative—switch whenever you like.',
                    icon: Palette,
                    grad: 'from-cyan-500 to-teal-600',
                  },
                ].map(({ step, title, desc, icon: Icon, grad }) => (
                  <motion.div
                    key={step}
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-fuchsia-500/25 transition-colors shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]"
                  >
                    <div
                      className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} shadow-lg text-white`}
                    >
                      <Icon size={22} strokeWidth={2} aria-hidden />
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">
                      Step {step}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal3D>

          {/* —— Why / benefits —— */}
          <ScrollReveal3D variant="landing" id="why" className="scroll-mt-24 border-b border-white/[0.05] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-400/80 mb-4">
                Why builders use it
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12 max-w-2xl">
                Built to lower the “blank portfolio” stress
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  {
                    title: 'Starts from real work',
                    body: 'Repos and stars you already shipped—not an empty About page.',
                    icon: Github,
                  },
                  {
                    title: 'Iterate on presentation',
                    body: 'Try three aesthetics before you invest in a custom domain or CMS.',
                    icon: Palette,
                  },
                  {
                    title: 'Share in seconds',
                    body: 'Record a scroll-through or walk someone through the app—no deploy required.',
                    icon: Globe,
                  },
                  {
                    title: 'Privacy-conscious',
                    body: 'We only request public GitHub data. No passwords, no private repo access.',
                    icon: Shield,
                  },
                ].map(({ title, body, icon: Icon }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/40 p-6 hover:bg-slate-900/60 transition-colors"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/20">
                      <Icon size={20} strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{title}</h3>
                      <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal3D>

          {/* —— Features —— */}
          <ScrollReveal3D
            variant="landing"
            id="features"
            className="scroll-mt-24 border-b border-white/[0.05] py-20 md:py-28"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-500 mb-4">
                Product
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Everything in one preview
              </h2>
              <p className="text-slate-400 mb-14 max-w-2xl leading-relaxed">
                One paste gives you bio, avatar, ranked projects, tech stack signals, and contact hints—laid
                out like a product, not a spreadsheet.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: 'Live GitHub data',
                    body: 'Repos, stars, and languages woven into sections people actually read.',
                    iconWrap: 'from-amber-400/25 to-orange-600/15',
                    iconClass: 'text-amber-200',
                  },
                  {
                    icon: Palette,
                    title: 'Three art directions',
                    body: 'Minimal editorial, modern SaaS, and a high-energy creative mode.',
                    iconWrap: 'from-fuchsia-400/25 to-violet-700/15',
                    iconClass: 'text-fuchsia-200',
                  },
                  {
                    icon: Globe,
                    title: 'Share-ready',
                    body: 'Use it as a demo, moodboard, or talking point in interviews.',
                    iconWrap: 'from-cyan-400/25 to-emerald-700/15',
                    iconClass: 'text-cyan-200',
                  },
                ].map(({ icon: Icon, title, body, iconWrap, iconClass }) => (
                  <motion.div
                    key={title}
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-8 hover:from-white/[0.1] transition-colors shadow-[0_20px_44px_-26px_rgba(0,0,0,0.4)]"
                  >
                    <div
                      className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${iconWrap} ring-1 ring-white/10`}
                    >
                      <Icon className={iconClass} size={22} strokeWidth={1.8} aria-hidden />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal3D>

          {/* —— FAQ —— */}
          <ScrollReveal3D variant="landing" id="faq" className="scroll-mt-24 border-b border-white/[0.05] py-20 md:py-28">
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="text-violet-400" size={22} aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-violet-400/90">
                  Questions
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
                Quick answers
              </h2>
              <div className="space-y-3">
                {FAQ_ITEMS.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:bg-white/[0.05] open:border-violet-500/20 transition-colors"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left font-semibold text-slate-100 text-[15px]">
                      {item.q}
                      <ChevronDown
                        className="shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                        size={18}
                        aria-hidden
                      />
                    </summary>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed pr-6 border-t border-white/5 pt-3">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </ScrollReveal3D>

          {/* —— About Devanta & story —— */}
          <ScrollReveal3D variant="landing" id="about" className="scroll-mt-24 border-t border-white/[0.06] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-violet-400/80 mb-4">
                    About Devanta
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                    Devanta = <span className="text-gradient-accent">dev</span> + avant
                  </h2>
                  <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                    Developers out front—where your commits already tell the story.
                  </p>
                </div>
                <div className="space-y-6 text-slate-400 leading-relaxed">
                  <p>
                    Blank portfolios are intimidating. Devanta starts from{' '}
                    <strong className="text-slate-200 font-semibold">what you shipped</strong>—public repos,
                    languages, and signals—and frames them so recruiters and clients see you clearly.
                  </p>
                  <p>
                    It&apos;s a fast preview layer: iterate on presentation before you invest in a custom domain
                    or CMS. Same data, multiple aesthetics.
                  </p>
                  <p className="flex items-start gap-3 text-sm text-slate-500">
                    <Github className="shrink-0 mt-0.5 text-slate-400" size={18} aria-hidden />
                    <span>Preview uses GitHub&apos;s public API only—private repos and emails stay private.</span>
                  </p>
                </div>
              </div>

              <div
                id="story"
                className="mt-20 pt-16 border-t border-white/[0.08] scroll-mt-24 grid md:grid-cols-2 gap-12 lg:gap-16"
              >
                <div className="space-y-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-fuchsia-400/90">
                    Mission
                  </p>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Make your public work impossible to ignore
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Devanta exists to shrink the gap between &quot;I have GitHub activity&quot; and &quot;here is a
                    credible story about my craft.&quot; It is opinionated, visual, and fast—so you spend time on
                    shipping, not on formatting a portfolio from scratch.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-cyan-400/85">
                    Built for
                  </p>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Developers who learn in public
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Whether you are job hunting, freelancing, or showing your work to friends, Devanta turns
                    familiar signals—repos, stars, languages—into a layout that feels intentional. Switch
                    themes in one tap until the vibe matches how you want to be seen.
                  </p>
                </div>
              </div>

              <div className="mt-16 rounded-[1.75rem] border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.12] via-slate-900/60 to-fuchsia-500/[0.08] p-8 md:p-10 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/25">
                      <Code2 size={26} strokeWidth={2.2} aria-hidden />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-300/90">
                        Creator
                      </p>
                      <p className="mt-2 text-xl font-bold text-white tracking-tight">{CREATOR.name}</p>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-md">
                        Devanta is designed, built, and maintained by {CREATOR.name}. All product direction,
                        visuals, and engineering—resolved here for the community of developers who ship in
                        public.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 md:justify-end">
                    <a
                      href={CREATOR.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                    >
                      <Github size={18} aria-hidden />
                      @{CREATOR.handle}
                    </a>
                    <a
                      href={CREATOR.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/15 px-4 py-2.5 text-sm font-semibold text-fuchsia-200 ring-1 ring-fuchsia-500/30 hover:bg-fuchsia-500/25 transition-colors"
                    >
                      <ExternalLink size={14} aria-hidden />
                      Source
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal3D>

          <footer className="relative border-t border-white/10 bg-gradient-to-b from-slate-950/80 via-slate-950 to-[#020617] overflow-hidden">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"
              aria-hidden
            />
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[min(100%,56rem)] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]" aria-hidden />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10">
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-fuchsia-500/20">
                      <Layers className="text-white" size={18} />
                    </span>
                    <span className="text-lg font-bold text-white">Devanta</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                    GitHub-powered portfolio previews—three themes, zero friction. Built for clarity before you
                    invest in a custom site.
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Heart className="text-fuchsia-500/60" size={14} aria-hidden />
                    <span>
                      Made with care by{' '}
                      <a
                        href={CREATOR.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-300 hover:text-white transition-colors"
                      >
                        {CREATOR.name}
                      </a>
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Product</p>
                  <ul className="space-y-2.5 text-sm text-slate-400">
                    <li>
                      <a href="#generate" className="hover:text-violet-300 transition-colors">
                        Generate preview
                      </a>
                    </li>
                    <li>
                      <a href="#themes" className="hover:text-violet-300 transition-colors">
                        Themes
                      </a>
                    </li>
                    <li>
                      <a href="#features" className="hover:text-violet-300 transition-colors">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#faq" className="hover:text-violet-300 transition-colors">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Explore</p>
                  <ul className="space-y-2.5 text-sm text-slate-400">
                    <li>
                      <a href="#how" className="hover:text-violet-300 transition-colors">
                        How it works
                      </a>
                    </li>
                    <li>
                      <a href="#why" className="hover:text-violet-300 transition-colors">
                        Why Devanta
                      </a>
                    </li>
                    <li>
                      <a href="#story" className="hover:text-violet-300 transition-colors">
                        Story & mission
                      </a>
                    </li>
                    <li>
                      <a href="#hero" className="hover:text-violet-300 transition-colors">
                        Back to top
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Connect</p>
                  <ul className="space-y-2.5 text-sm text-slate-400">
                    <li>
                      <a
                        href={CREATOR.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-violet-300 transition-colors"
                      >
                        <Github size={16} aria-hidden />
                        GitHub · @{CREATOR.handle}
                      </a>
                    </li>
                    <li>
                      <a
                        href={CREATOR.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-violet-300 transition-colors"
                      >
                        <ExternalLink size={16} aria-hidden />
                        Open source
                      </a>
                    </li>
                    <li>
                      <a
                        href={`${CREATOR.repo}/issues`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-violet-300 transition-colors"
                      >
                        <Sparkles size={16} aria-hidden />
                        Feedback & issues
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative border-t border-white/[0.06] bg-black/20">
              <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <span className="text-center sm:text-left">
                  © {new Date().getFullYear()} Devanta · All rights reserved ·{' '}
                  <span className="text-slate-600">Public GitHub data only</span>
                </span>
                <span className="text-center sm:text-right text-slate-600">
                  Ship in public · Iterate on the story · Own your vibe
                </span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
