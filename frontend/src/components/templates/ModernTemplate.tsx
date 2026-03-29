'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal3D, ScrollParallaxLayer } from '@/components/motion/ScrollScene3D';
import { PortfolioProps } from '../../types/portfolio';
import {
  Github,
  ExternalLink,
  Mail,
  Star,
  Code2,
  Rocket,
  Layout,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function sectionShell(embedded: boolean, extra = ''): string {
  const h = embedded ? 'min-h-[72vh] sm:min-h-[90vh]' : 'min-h-screen';
  return `${h} flex flex-col justify-center py-16 sm:py-20 md:py-24 scroll-mt-24 ${extra}`;
}

const ModernTemplate: React.FC<PortfolioProps> = ({ data, embedded = false }) => {
  const { about, featured_projects, tech_stack, github_stats, contact } = data;
  const year = new Date().getFullYear();
  const primary = github_stats.primary_language?.trim() || '';
  const bioText = about.bio?.trim() || 'Building in public on GitHub.';
  const nameParts = about.name.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? 'Developer';
  const restName = nameParts.slice(1).join(' ');

  const shell = (extra?: string) => sectionShell(embedded, extra ?? '');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Ambient background */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[min(70vh,520px)] bg-gradient-to-b from-violet-200/25 to-transparent blur-3xl rounded-full" />
        <motion.div
          className="absolute top-[15%] right-[5%] w-80 h-80 bg-indigo-300/15 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[0%] w-96 h-96 bg-fuchsia-200/15 blur-[120px] rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </motion.div>

      {!embedded && (
        <nav className="sticky top-0 z-30 bg-white/75 backdrop-blur-xl border-b border-indigo-100/40">
          <div className="max-w-7xl mx-auto px-6 h-[4.5rem] md:h-20 flex items-center justify-between">
            <a
              href="#intro"
              className="flex items-center gap-3 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 rounded-lg"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-300/40">
                D
              </div>
              <span className="font-bold text-lg md:text-xl tracking-tight">{about.name}</span>
            </a>
            <div className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
              <a href="#projects" className="hover:text-indigo-600 transition-colors">
                Projects
              </a>
              <a href="#stack" className="hover:text-indigo-600 transition-colors">
                Stack
              </a>
              <a href="#numbers" className="hover:text-indigo-600 transition-colors">
                Stats
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-300/40 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* —— Hero — full viewport —— */}
      <section id="intro" className={shell()}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <ScrollReveal3D variant="modern" className="w-full">
            <div
              className={`grid lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center ${
                embedded ? 'pt-4 md:pt-8' : ''
              }`}
            >
              <div className="lg:col-span-7 space-y-8 md:space-y-10">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
                    <Sparkles size={14} className="text-violet-500" aria-hidden />
                    Portfolio · {year}
                  </span>
                  {primary ? (
                    <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Often <span className="mx-1 text-indigo-600">{primary}</span>
                    </span>
                  ) : null}
                </motion.div>

                <div className="space-y-2 md:space-y-3">
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-sm font-bold uppercase tracking-[0.35em] text-indigo-500/90"
                  >
                    Hello — I&apos;m
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-slate-900"
                  >
                    {firstName}
                    {restName ? (
                      <>
                        <br />
                        <span className="text-slate-300">{restName}</span>
                      </>
                    ) : null}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-800 pt-2"
                  >
                    I build{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500">
                      future-proof
                    </span>{' '}
                    systems — live from GitHub.
                  </motion.p>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium border-l-4 border-indigo-200 pl-6"
                >
                  {bioText}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap items-stretch gap-4"
                >
                  <a
                    href={contact.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold shadow-xl shadow-slate-300/50 hover:from-indigo-600 hover:to-violet-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    <Github size={22} aria-hidden />
                    <span>GitHub</span>
                    <ChevronRight
                      size={18}
                      className="opacity-60 group-hover:translate-x-1 transition-transform"
                      aria-hidden
                    />
                  </a>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-indigo-100 bg-white text-slate-800 font-bold hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      <Mail size={22} aria-hidden />
                      Email
                    </a>
                  ) : null}
                  <div className="flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/90 border border-indigo-50 shadow-md shadow-indigo-100/30">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 leading-none tabular-nums">
                        {github_stats.total_stars}
                      </p>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mt-1">Stars</p>
                    </div>
                    <div className="h-10 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" aria-hidden />
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none tabular-nums">
                        {github_stats.total_repos}
                      </p>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mt-1">Repos</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full"
              >
                <div className="absolute -inset-8 md:-inset-12 bg-gradient-to-br from-indigo-400/25 via-violet-400/20 to-fuchsia-300/15 blur-[90px] rounded-full" />
                <ScrollParallaxLayer depth={0.5} intensity="soft" className="relative">
                  <div className="relative p-1 rounded-[2.75rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_32px_64px_-20px_rgba(99,102,241,0.45)]">
                    <div className="rounded-[2.65rem] bg-white p-1.5">
                      {about.avatar_url ? (
                        <img
                          src={about.avatar_url}
                          alt=""
                          className="aspect-square w-full rounded-[2.4rem] object-cover"
                        />
                      ) : (
                        <div
                          className="flex aspect-square w-full items-center justify-center rounded-[2.4rem] bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 text-5xl font-black text-indigo-200"
                          aria-hidden
                        >
                          {initialsFromName(about.name)}
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, type: 'spring', stiffness: 200 }}
                    className="absolute -bottom-4 -right-2 md:-right-4 w-max max-w-[10rem] rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-[1px] shadow-xl"
                  >
                    <div className="rounded-2xl bg-white/95 backdrop-blur px-4 py-3 text-center">
                      <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Primary</p>
                      <p
                        className="text-base font-black text-slate-900 truncate max-w-[7rem]"
                        title={primary || undefined}
                      >
                        {primary || '—'}
                      </p>
                    </div>
                  </motion.div>
                </ScrollParallaxLayer>
              </motion.div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* —— Projects — full viewport —— */}
      <section id="projects" className={shell('bg-white/70 border-y border-indigo-100/30')}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <ScrollReveal3D variant="modern" className="w-full space-y-12 md:space-y-14">
            <div className="space-y-5 max-w-3xl">
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">Featured</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-none">
                Selected <span className="italic font-serif text-slate-500">repositories</span>
              </h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Public GitHub projects by stars. Two per row on desktop — each card opens the repo.
              </p>
            </div>

            {featured_projects.length === 0 ? (
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                No public repositories in this preview yet. Try another username or confirm repos are public.
              </p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {featured_projects.map((project, i) => (
                  <motion.li
                    key={project.id}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 28 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 260, damping: 28 }}
                    className="transform-gpu min-w-0"
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full min-h-[13rem] flex-col gap-4 rounded-[2rem] border border-slate-100 bg-white p-8 md:p-9 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.1)] transition-all duration-500 hover:border-indigo-200 hover:shadow-[0_28px_60px_-20px_rgba(99,102,241,0.2)] overflow-hidden relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-100/60 to-violet-50/40 rounded-bl-[4rem] -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

                      <div className="relative flex flex-1 flex-col gap-4">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex min-w-0 items-start gap-3">
                            <span className="mt-1 text-[10px] font-black tabular-nums text-slate-300 shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200/50 shrink-0">
                              <Layout size={22} aria-hidden />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-xl md:text-2xl font-black text-slate-900 leading-tight line-clamp-2 pr-2">
                                {project.name}
                              </h4>
                            </div>
                          </div>
                          <ExternalLink
                            size={18}
                            className="shrink-0 text-slate-400 group-hover:text-indigo-600 transition-colors"
                            aria-hidden
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-100">
                            <Star size={12} className="fill-amber-400 stroke-none shrink-0" aria-hidden />
                            {project.stars}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                            Updated {new Date(project.updated_at).getFullYear()}
                          </span>
                        </div>

                        {project.description?.trim() ? (
                          <p className="text-base text-slate-500 font-medium leading-relaxed line-clamp-3">
                            {project.description.trim()}
                          </p>
                        ) : null}

                        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                          {project.language ? (
                            <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md">
                              {project.language}
                            </span>
                          ) : (
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">—</span>
                          )}
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            Open on GitHub
                          </span>
                        </div>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            )}
          </ScrollReveal3D>
        </div>
      </section>

      {/* —— Stack — full viewport —— */}
      <section id="stack" className={shell('bg-slate-950 text-white')}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <ScrollReveal3D variant="modern" className="w-full block">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-indigo-600/30 via-violet-600/15 to-fuchsia-600/20 blur-3xl opacity-60" />
            <div className="rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-slate-900/90 p-10 md:p-16 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[min(100%,480px)] h-[min(100%,480px)] bg-gradient-to-bl from-indigo-500/25 to-transparent rounded-bl-full" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-20 items-stretch">
                <div className="space-y-8 lg:py-2">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-300">Stack</h2>
                  <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
                    Languages &amp; tools
                  </h3>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                    {primary ? (
                      <>
                        <span className="text-white font-semibold">{primary}</span> leads this preview. Full list from
                        your public repos
                        {tech_stack.length > 0 ? ` (${tech_stack.length} tags)` : ''}.
                      </>
                    ) : (
                      <>
                        Tags from languages and topics on visible repos — more public work fills this out.
                      </>
                    )}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col min-h-[260px] backdrop-blur-sm">
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-fuchsia-300">Primary in preview</p>
                    {primary ? (
                      <p className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-white">{primary}</p>
                    ) : (
                      <p className="mt-3 text-lg text-slate-500 leading-relaxed">
                        Not enough signal yet — add or star public repos.
                      </p>
                    )}
                  </div>
                  {tech_stack.length === 0 ? (
                    <div className="flex flex-1 flex-col justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 px-6 py-12 text-center">
                      <p className="text-base text-slate-400 leading-relaxed">
                        No stack tags in this preview. Languages and topics from public repos will show here.
                      </p>
                    </div>
                  ) : (
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {tech_stack.map((skill, i) => {
                        const isPrimary = primary && skill.toLowerCase() === primary.toLowerCase();
                        return (
                          <motion.li
                            key={skill}
                            whileInView={{ opacity: 1, scale: 1 }}
                            initial={{ opacity: 0, scale: 0.94 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.04, type: 'spring', stiffness: 280, damping: 26 }}
                            className={`flex flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center transition-colors ${
                              isPrimary
                                ? 'border-fuchsia-400/50 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 shadow-lg shadow-indigo-950/50'
                                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-400/35'
                            }`}
                          >
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/60">
                              <Code2 size={20} aria-hidden />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/85 line-clamp-2">
                              {skill}
                            </p>
                          </motion.li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* —— Stats — full viewport —— */}
      <section id="numbers" className={shell('bg-gradient-to-b from-indigo-50/40 to-white border-y border-indigo-100/20')}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <ScrollReveal3D variant="modern" className="w-full space-y-10">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">At a glance</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                GitHub snapshot
              </h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Repos, stars, primary language, and how many projects appear above — from this preview.
              </p>
            </div>
            <div className="rounded-[2rem] border border-indigo-100/60 bg-white/80 backdrop-blur p-6 md:p-8 shadow-xl shadow-indigo-100/40">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Public repos', value: github_stats.total_repos, sub: 'On your profile', accent: 'from-indigo-500 to-violet-500' },
                  { label: 'Total stars', value: github_stats.total_stars, sub: 'Across public repos', accent: 'from-violet-500 to-fuchsia-500' },
                  { label: 'Primary language', value: primary || '—', sub: 'This preview', accent: 'from-fuchsia-500 to-pink-500', isText: true },
                  { label: 'Featured', value: featured_projects.length, sub: 'In the grid', accent: 'from-cyan-500 to-indigo-500' },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm overflow-hidden relative group"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-90 ${cell.accent}`}
                      aria-hidden
                    />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cell.label}</p>
                    <p
                      className={`mt-3 font-black text-slate-900 ${cell.isText ? 'text-2xl md:text-3xl truncate' : 'text-3xl md:text-4xl tabular-nums'}`}
                      title={cell.isText ? String(cell.value) : undefined}
                    >
                      {cell.value}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">{cell.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal3D>
        </div>
      </section>

      {/* —— Contact — full viewport —— */}
      <section id="contact" className={shell('bg-white')}>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <ScrollReveal3D variant="modern" className="w-full grid lg:grid-cols-2 gap-14 lg:gap-20 items-stretch">
            <div className="space-y-10 flex flex-col justify-center">
              <div className="space-y-6">
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">Get in touch</h2>
                <h3 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-none">
                  Let&apos;s start <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                    something.
                  </span>
                </h3>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
                  Generated from your public GitHub data. Email or the form below — we&apos;ll wire it up later.
                </p>
              </div>
              <div className="flex items-center gap-6 p-6 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg">
                  <Mail size={24} aria-hidden />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</p>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-xl font-bold text-slate-900 hover:text-indigo-600 break-all"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <a
                      href={contact.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-slate-900 hover:text-indigo-600 break-all"
                    >
                      github.com/{contact.github_username}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <form
              className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-200/40 space-y-8 border-2 border-indigo-50 flex flex-col justify-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="What are you working on?"
                  className="w-full bg-slate-50 border-none rounded-[2rem] py-5 px-8 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-6 rounded-2xl font-black uppercase tracking-widest text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:from-indigo-500 hover:via-violet-500 hover:to-fuchsia-500 shadow-lg shadow-indigo-300/40 transition-all flex items-center justify-center gap-4"
              >
                Send message <Rocket size={20} aria-hidden />
              </button>
            </form>
          </ScrollReveal3D>
        </div>
      </section>

      {/* —— Footer — compact, colorful —— */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white scroll-mt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-amber-400/15 blur-[70px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 md:py-12">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8 pb-8 border-b border-white/20">
            <div className="md:col-span-4 space-y-3">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">{about.name}</p>
              <p className="text-sm text-white/90 leading-relaxed max-w-sm font-medium">
                Built with <span className="text-amber-200 font-bold">Devanta</span> from live GitHub data. Snapshot
                only — not a full résumé.
              </p>
            </div>
            <nav className="md:col-span-3 space-y-3" aria-label="On this page">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">On this page</p>
              <ul className="space-y-2 text-sm font-semibold text-white/85">
                {[
                  ['Intro', '#intro'],
                  ['Projects', '#projects'],
                  ['Stack', '#stack'],
                  ['Stats', '#numbers'],
                  ['Contact', '#contact'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="hover:text-amber-200 transition-colors inline-flex items-center gap-1">
                      {label}
                      <ChevronRight className="size-3.5 opacity-60" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:col-span-5">
              <div className="space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60">Profiles</p>
                <div className="flex flex-col gap-2 text-sm font-semibold">
                  <a
                    href={contact.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-cyan-200 transition-colors"
                  >
                    GitHub <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                  {contact.socials.twitter ? (
                    <a
                      href={contact.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-cyan-200 transition-colors"
                    >
                      Twitter <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ) : null}
                  {contact.socials.linkedin ? (
                    <a
                      href={contact.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-cyan-200 transition-colors"
                    >
                      LinkedIn <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col gap-4">
            <div className="flex h-1 w-full max-w-xs rounded-full overflow-hidden shadow-md shadow-black/15" aria-hidden>
              <span className="flex-1 bg-amber-300" />
              <span className="flex-1 bg-pink-400" />
              <span className="flex-1 bg-violet-300" />
              <span className="flex-1 bg-cyan-300" />
              <span className="flex-1 bg-indigo-300" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <p className="text-white/80 font-medium">
                © {year}{' '}
                <span className="text-white font-bold">{about.name}</span>
                <span className="text-white/50 mx-2">·</span>@{contact.github_username}
              </p>
              <p className="text-base font-black tracking-tight">
                <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
                  Made with Devanta
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernTemplate;
