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
} from 'lucide-react';

const ModernTemplate: React.FC<PortfolioProps> = ({ data, embedded = false }) => {
  const { about, featured_projects, tech_stack, github_stats, contact } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
        <motion.div
          className="absolute top-[10%] left-[10%] w-72 h-72 bg-indigo-200/20 blur-[100px] rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-violet-200/20 blur-[120px] rounded-full"
          animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </motion.div>

      {!embedded && (
        <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-slate-100/50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">
                D
              </div>
              <span className="font-bold text-xl tracking-tight">{about.name}</span>
            </div>
            <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a>
              <a href="#stack" className="hover:text-indigo-600 transition-colors">Stack</a>
              <a href="#contact" className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                Contact
              </a>
            </div>
          </div>
        </nav>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-48 pb-48">
        {/* Hero — scroll 3D */}
        <ScrollReveal3D
          variant="modern"
          className={`grid lg:grid-cols-12 gap-20 items-center ${
            embedded ? 'pt-12 md:pt-20' : 'pt-24 md:pt-40'
          }`}
        >
          <div className="lg:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest shadow-sm"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Available for engineering projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-slate-900"
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">future-proof</span> digital systems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-2xl font-medium"
            >
              {about.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href={contact.socials.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all font-bold shadow-2xl shadow-slate-200">
                <Github size={20} />
                <span>GitHub Archive</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform opacity-50" />
              </a>
              <div className="flex items-center gap-8 px-8 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900 leading-none">{github_stats.total_stars}</p>
                  <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mt-1">Stars</p>
                </div>
                <div className="h-8 w-px bg-slate-100"></div>
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900 leading-none">{github_stats.total_repos}</p>
                  <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mt-1">Repos</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-12 bg-gradient-to-br from-indigo-400/20 via-violet-400/15 to-fuchsia-300/10 blur-[110px] rounded-full opacity-70" />
            {about.avatar_url && (
              <ScrollParallaxLayer depth={0.85} className="relative max-w-md mx-auto lg:max-w-none">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/30 to-violet-500/20 blur-xl opacity-90" />
                  <img
                    src={about.avatar_url}
                    alt={about.name}
                    className="relative w-full h-full aspect-square rounded-[3rem] object-cover shadow-[0_40px_80px_-24px_rgba(79,70,229,0.45)] border-[10px] border-white ring-1 ring-indigo-100/80"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
                    className="absolute -bottom-5 -right-5 w-36 h-36 bg-white/95 backdrop-blur rounded-3xl shadow-[0_24px_48px_-12px_rgba(15,23,42,0.25)] flex items-center justify-center border border-indigo-100/80"
                  >
                    <div className="text-center px-2">
                      <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Top Language</p>
                      <p className="text-lg font-black text-slate-900">{github_stats.primary_language}</p>
                    </div>
                  </motion.div>
                </div>
              </ScrollParallaxLayer>
            )}
          </motion.div>
        </ScrollReveal3D>

        {/* Modern Projects — scroll 3D */}
        <ScrollReveal3D variant="modern" className="space-y-20" id="projects">
          <div className="space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">Featured Deployments</h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-slate-900">
              <h3 className="text-4xl md:text-6xl font-black tracking-tight max-w-2xl leading-none">
                Engineering solutions for the <span className="italic font-serif">modern web.</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured_projects.map((project, i) => (
              <motion.div
                key={project.id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 36 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 28 }}
                className="transform-gpu"
              >
                <div className="group h-full relative bg-white/95 backdrop-blur-sm border border-slate-100/90 rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12)] hover:shadow-[0_36px_72px_-28px_rgba(79,70,229,0.22)] border-indigo-100/50 transition-shadow duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-indigo-100/50 to-violet-50/30 rounded-bl-[5rem] -mr-14 -mt-14 group-hover:scale-110 transition-transform duration-500" />

                  <div className="relative h-full flex flex-col justify-between space-y-12">
                    <div className="space-y-8">
                      <div className="flex justify-between items-start">
                        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                          <Layout size={28} />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-xs font-bold text-slate-500 border border-slate-100">
                          <Star size={14} className="fill-amber-400 stroke-none" />
                          <span>{project.stars}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-3xl font-black text-slate-900">{project.name}</h4>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-200">
                          {project.language}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                          v2.0.{new Date(project.updated_at).getFullYear()}
                        </span>
                      </div>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal3D>

        {/* Tech Ecosystem */}
        <ScrollReveal3D variant="modern" className="block" id="stack">
          <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center text-white">
              <div className="space-y-8">
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400">Core Arsenal</h2>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                  Technologies <br />
                  <span className="text-white/40 italic">we use to scale.</span>
                </h3>
                <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                  Leveraging the latest in full-stack engineering to build reliable, high-performance applications.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tech_stack.map((skill, i) => (
                  <motion.div
                    key={skill}
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 280, damping: 26 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center space-y-4 hover:bg-white/10 hover:border-indigo-400/40 transition-colors group transform-gpu shadow-[0_16px_40px_-20px_rgba(0,0,0,0.4)]"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/40 group-hover:text-indigo-400 transition-colors">
                      <Code2 size={24} />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-white/60">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal3D>

        {/* Contact Section */}
        <ScrollReveal3D variant="modern" className="grid lg:grid-cols-2 gap-20 items-start pt-20" id="contact">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600">Get in touch</h2>
              <h3 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-none">
                Let&apos;s start <br /> something.
              </h3>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
                Interested in collaborating or have a question about my work? Feel free to reach out.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Direct Protocol</p>
                  {contact.email ? (
                    <p className="text-xl font-bold text-slate-900">{contact.email}</p>
                  ) : (
                    <a
                      href={contact.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-slate-900 hover:text-indigo-600"
                    >
                      github.com/{contact.github_username}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-indigo-100/50 space-y-8 border border-slate-50" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Identity</label>
                <input type="text" placeholder="Full Name" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Channel</label>
                <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Transmission</label>
              <textarea rows={4} placeholder="Project Details..." className="w-full bg-slate-50 border-none rounded-[2rem] py-5 px-8 focus:ring-2 focus:ring-indigo-600 transition-all font-bold text-slate-900 resize-none" />
            </div>
            <button className="w-full py-6 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 hover:shadow-2xl transition-all flex items-center justify-center gap-4">
              Initialize Project <Rocket size={20} />
            </button>
          </form>
        </ScrollReveal3D>

        <footer className="pt-20 pb-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
          <p>© {new Date().getFullYear()} {about.name} • DEVANTA_MODERN_v1.0</p>
          <div className="flex gap-12 flex-wrap justify-center">
            <a href={contact.socials.github} className="hover:text-indigo-600 transition-colors">GitHub</a>
            {contact.socials.twitter ? (
              <a href={contact.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Twitter</a>
            ) : null}
            {contact.socials.linkedin ? (
              <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
            ) : null}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ModernTemplate;
