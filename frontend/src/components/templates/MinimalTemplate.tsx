'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioProps } from '../../types/portfolio';
import { Star, ArrowUpRight } from 'lucide-react';
import { ScrollReveal3D, ScrollParallaxLayer } from '@/components/motion/ScrollScene3D';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const MinimalTemplate: React.FC<PortfolioProps> = ({ data, embedded = false }) => {
  const { about, featured_projects, tech_stack, github_stats, contact } = data;
  const nameParts = about.name.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? 'Developer';
  const nameRest = nameParts.slice(1).join(' ') || ' ';

  const sectionPad = embedded ? 'py-16 md:py-28' : 'py-32 md:py-48';

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-[#111] font-sans selection:bg-black selection:text-white">
      <div className={`max-w-5xl mx-auto px-8 md:px-12 ${sectionPad} space-y-32 md:space-y-44`}>
        {/* Hero — scroll 3D */}
        <ScrollReveal3D variant="minimal" className="grid md:grid-cols-12 gap-12 md:gap-16">
          <motion.section
            initial="initial"
            animate="animate"
            variants={stagger}
            className="md:col-span-8 space-y-12"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-black/10" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">Portfolio 2024</span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-black italic"
            >
              {firstName}
              <br />
              <span className="text-black/10">{nameRest}</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-2xl md:text-3xl text-black/60 leading-tight max-w-xl font-medium tracking-tight"
            >
              {about.bio}
            </motion.p>

            <motion.div variants={fadeIn} className="flex items-center gap-12 pt-8 flex-wrap">
              <a
                href={contact.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-black transition-colors border-b-2 border-black/5 pb-2"
              >
                GITHUB
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-black transition-colors border-b-2 border-black/5 pb-2"
                >
                  EMAIL
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ) : null}
            </motion.div>
          </motion.section>

          <div className="md:col-span-4 flex justify-end items-start pt-12">
            <ScrollParallaxLayer depth={0.7} className="relative w-full max-w-[280px]">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-[3.2rem] bg-gradient-to-br from-black/[0.08] via-transparent to-black/[0.04] blur-sm" />
                <div className="absolute inset-0 bg-black/[0.06] rounded-[3rem] translate-x-5 translate-y-5 shadow-2xl" />
                {about.avatar_url && (
                  <img
                    src={about.avatar_url}
                    alt={about.name}
                    className="relative w-64 h-80 rounded-[3rem] object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-black/10 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.35)]"
                  />
                )}
              </div>
            </ScrollParallaxLayer>
          </div>
        </ScrollReveal3D>

        {/* Projects — scroll 3D */}
        <ScrollReveal3D variant="minimal" className="space-y-20">
          <div className="flex items-center justify-between border-b border-black/10 pb-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30 underline decoration-black/10 underline-offset-[24px]">
              Featured Index
            </h2>
            <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest italic">Sorted by popularity</div>
          </div>

          <motion.div
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="space-y-2"
          >
            {featured_projects.map((project, i) => (
              <motion.div key={project.id} variants={fadeIn}>
                <div className="group grid md:grid-cols-12 gap-8 py-12 border-b border-black/[0.06] items-center px-4 -mx-2 rounded-2xl bg-white/0 hover:bg-white/90 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.1)] transition-all duration-500">
                  <div className="md:col-span-1 text-[10px] font-black text-black/20 italic">0{i + 1}</div>
                  <div className="md:col-span-4 space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight group-hover:pl-4 transition-all">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.name}
                      </a>
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-black/40 uppercase">
                      <Star size={12} className="fill-black/40 stroke-none" />
                      {project.stars}
                    </div>
                  </div>
                  <div className="md:col-span-5 text-lg text-black/50 leading-snug italic font-medium">
                    {project.description}
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-black/10 rounded-full text-black/40 group-hover:bg-black group-hover:text-white transition-all">
                      {project.language}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal3D>

        {/* Stack */}
        <ScrollReveal3D variant="minimal" className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">Arsenal</h2>
            <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-none italic">
              I specialize in <span className="text-black/20">scalable architecture</span> and{' '}
              <span className="text-black/20">refined interfaces</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {tech_stack.map((skill) => (
              <span
                key={skill}
                className="text-xl md:text-2xl font-bold text-black/10 hover:text-black transition-colors cursor-default underline decoration-black/5 underline-offset-8"
              >
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal3D>

        {/* Stats */}
        <ScrollReveal3D variant="minimal" className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/[0.07] border border-black/[0.08] overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-40px_rgba(0,0,0,0.18)]">
          <div className="bg-white p-10 md:p-12 space-y-2 text-center">
            <p className="text-5xl md:text-6xl font-bold tracking-tighter">{github_stats.total_repos}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">Repositories</p>
          </div>
          <div className="bg-white p-10 md:p-12 space-y-2 text-center">
            <p className="text-5xl md:text-6xl font-bold tracking-tighter">{github_stats.total_stars}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">Stars</p>
          </div>
          <div className="bg-white p-10 md:p-12 space-y-2 text-center col-span-2">
            <p className="text-5xl md:text-6xl font-bold tracking-tighter italic truncate px-2">
              {github_stats.primary_language}
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">Core Specialization</p>
          </div>
        </ScrollReveal3D>

        {/* Footer */}
        <footer className="pt-32 pb-12 border-t border-black/5 space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 text-[#111]">
            <div className="space-y-8 max-w-xl">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter italic leading-none">Connect.</h2>
              <p className="text-xl text-black/50 font-medium tracking-tight">
                Currently open to select freelance projects and full-stack opportunities.
              </p>
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block text-2xl md:text-4xl font-bold border-b-4 border-black pb-2 hover:text-black/50 hover:border-black/20 transition-all"
                >
                  {contact.email}
                </a>
              ) : (
                <a
                  href={contact.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-2xl md:text-4xl font-bold border-b-4 border-black pb-2 hover:text-black/50 hover:border-black/20 transition-all"
                >
                  github.com/{contact.github_username}
                </a>
              )}
            </div>
            <div className="flex flex-col items-end gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-black/40">
              <a href={contact.socials.github} className="hover:text-black transition-colors">
                GitHub
              </a>
              {contact.socials.twitter ? (
                <a
                  href={contact.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Twitter
                </a>
              ) : null}
              {contact.socials.linkedin ? (
                <a
                  href={contact.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.5em] text-black/20">
            <p>
              © {new Date().getFullYear()} {about.name}
            </p>
            <p>Built with Devanta Protocol</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MinimalTemplate;
