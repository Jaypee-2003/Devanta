'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioProps } from '../../types/portfolio';
import { Github, Mail, ExternalLink, Star, Code2, ArrowUpRight } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const MinimalTemplate: React.FC<PortfolioProps> = ({ data }) => {
  const { about, featured_projects, tech_stack, github_stats, contact } = data;

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-32 md:py-48 space-y-48">
        
        {/* Editorial Header */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="grid md:grid-cols-12 gap-12"
        >
          <div className="md:col-span-8 space-y-12">
            <motion.div variants={fadeIn} className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-black/10"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">Portfolio 2024</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] text-black italic">
              {about.name.split(' ')[0]}<br />
              <span className="text-black/10">{about.name.split(' ')[1] || 'DEV'}</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-2xl md:text-3xl text-black/60 leading-tight max-w-xl font-medium tracking-tight">
              {about.bio}
            </motion.p>

            <motion.div variants={fadeIn} className="flex items-center gap-12 pt-8">
              <a href={contact.socials.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-black transition-colors border-b-2 border-black/5 pb-2">
                GITHUB
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a href={`mailto:${contact.email}`} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-black transition-colors border-b-2 border-black/5 pb-2">
                EMAIL
                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="md:col-span-4 flex justify-end items-start pt-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-black/5 rounded-[3rem] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
              {about.avatar_url && (
                <img 
                  src={about.avatar_url} 
                  alt={about.name} 
                  className="relative w-64 h-80 rounded-[3rem] object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-black/5"
                />
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Dynamic Project Index */}
        <section className="space-y-24">
          <div className="flex items-center justify-between border-b border-black/10 pb-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30 underline decoration-black/10 underline-offset-[24px]">Featured Index</h2>
            <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest italic">Sorted by popularity</div>
          </div>

          <motion.div 
            whileInView="animate"
            initial="initial"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="space-y-1"
          >
            {featured_projects.map((project, i) => (
              <motion.div 
                key={project.id} 
                variants={fadeIn}
                className="group grid md:grid-cols-12 gap-8 py-12 border-b border-black/5 items-center hover:bg-[#f9f9f9] transition-colors px-4 -mx-4 rounded-xl"
              >
                <div className="md:col-span-1 text-[10px] font-black text-black/20 italic">0{i + 1}</div>
                <div className="md:col-span-4 space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight group-hover:pl-4 transition-all">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
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
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Minimal Stack */}
        <section className="grid md:grid-cols-2 gap-24 items-center text-[#111]">
          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">Arsenal</h2>
            <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-none italic">
              I specialize in <span className="text-black/20">scalable architecture</span> and <span className="text-black/20">refined interfaces</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {tech_stack.map((skill) => (
              <span key={skill} className="text-xl md:text-2xl font-bold text-black/10 hover:text-black transition-colors cursor-default underline decoration-black/5 underline-offset-8">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* GitHub Analytics */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 border border-black/5 overflow-hidden rounded-3xl">
          <div className="bg-white p-12 space-y-2 text-center">
            <p className="text-6xl font-bold tracking-tighter">{github_stats.total_repos}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">Repositories</p>
          </div>
          <div className="bg-white p-12 space-y-2 text-center">
            <p className="text-6xl font-bold tracking-tighter">{github_stats.total_stars}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">Stars</p>
          </div>
          <div className="bg-white p-12 space-y-2 text-center col-span-2">
            <p className="text-6xl font-bold tracking-tighter italic truncate px-4">{github_stats.primary_language}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-black">Core Specialization</p>
          </div>
        </section>

        {/* Minimal Contact */}
        <footer className="pt-48 pb-12 border-t border-black/5 space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 text-[#111]">
            <div className="space-y-8 max-w-xl">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter italic leading-none">Connect.</h2>
              <p className="text-xl text-black/50 font-medium tracking-tight">
                Currently open to select freelance projects and full-stack opportunities.
              </p>
              <a 
                href={`mailto:${contact.email}`} 
                className="inline-block text-2xl md:text-4xl font-bold border-b-4 border-black pb-2 hover:text-black/50 hover:border-black/20 transition-all"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex flex-col items-end gap-4 text-[10px] font-black tracking-[0.3em] uppercase text-black/40">
              <a href={contact.socials.github} className="hover:text-black transition-colors">GitHub</a>
              <a href={contact.socials.twitter} className="hover:text-black transition-colors">Twitter</a>
              <a href={contact.socials.linkedin} className="hover:text-black transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.5em] text-black/20">
            <p>© {new Date().getFullYear()} {about.name}</p>
            <p>Built with Devanta Protocol</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MinimalTemplate;
