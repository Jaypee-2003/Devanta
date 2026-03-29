'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioProps } from '../../types/portfolio';
import { ArrowUpRight, Star } from 'lucide-react';
import { ScrollReveal3D, ScrollParallaxLayer } from '@/components/motion/ScrollScene3D';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12%' },
  transition: { duration: 0.7, ease },
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function sectionShell(
  embedded: boolean,
  extra = '',
): string {
  const h = embedded ? 'min-h-[72vh] sm:min-h-[85vh]' : 'min-h-screen';
  return `${h} flex flex-col justify-center py-20 sm:py-24 md:py-28 ${extra}`;
}

const MinimalTemplate: React.FC<PortfolioProps> = ({ data, embedded = false }) => {
  const { about, featured_projects, tech_stack, github_stats, contact } = data;
  const nameParts = about.name.trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] ?? 'Developer';
  const restName = nameParts.slice(1).join(' ');
  const year = new Date().getFullYear();
  const primary = github_stats.primary_language?.trim() || '';
  const bioText = about.bio?.trim() || 'Building in public on GitHub.';

  const shell = (bg: string) => sectionShell(embedded, bg);
  const padX = 'px-6 sm:px-10 md:px-14 lg:px-16';

  return (
    <div className="bg-[#faf9f6] text-[#1a1a18] font-sans antialiased selection:bg-[#1a1a18] selection:text-[#faf9f6]">
      {/* Intro — full viewport */}
      <ScrollReveal3D variant="minimal" id="intro" className={`${shell('')} scroll-mt-4`}>
        <div className={`${padX} w-full max-w-6xl mx-auto`}>
          <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:gap-20 lg:items-center">
            <div className="space-y-10">
              <p className="text-sm text-[#5c5c56] tracking-wide">
                Portfolio · {year}
              </p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[#1a1a18] leading-[1.05]">
                {firstName}
                {restName ? (
                  <>
                    <br />
                    <span className="text-[#b5b3ad]">{restName}</span>
                  </>
                ) : null}
              </h1>
              <p className="text-lg sm:text-xl text-[#4a4a44] leading-relaxed max-w-xl">
                {bioText}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-4 pt-2">
                <a
                  href={contact.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base text-[#1a1a18] border-b border-[#1a1a18]/20 pb-0.5 hover:border-[#1a1a18] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a1a18]/30 rounded-sm"
                >
                  View GitHub
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                </a>
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-base text-[#1a1a18] border-b border-[#1a1a18]/20 pb-0.5 hover:border-[#1a1a18] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a1a18]/30 rounded-sm"
                  >
                    Send email
                    <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ScrollParallaxLayer depth={0.35} intensity="soft" className="relative w-full max-w-[260px] sm:max-w-[280px]">
                {about.avatar_url ? (
                  <img
                    src={about.avatar_url}
                    alt=""
                    className="w-full aspect-[4/5] rounded-2xl object-cover border border-[#1a1a18]/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.25)]"
                  />
                ) : (
                  <div
                    className="flex w-full aspect-[4/5] items-center justify-center rounded-2xl border border-[#1a1a18]/10 bg-[#f0eeea] text-3xl font-medium text-[#b5b3ad]"
                    aria-hidden
                  >
                    {initialsFromName(about.name)}
                  </div>
                )}
              </ScrollParallaxLayer>
            </div>
          </div>
        </div>
      </ScrollReveal3D>

      {/* Work — full viewport, two-column repo grid on md+ */}
      <section id="work" className={`${shell('bg-[#f2f1ed]')} scroll-mt-4 border-y border-[#1a1a18]/6`}>
        <div className={`${padX} w-full max-w-6xl mx-auto`}>
          <motion.header {...fadeUp} className="mb-10 md:mb-14 space-y-4 max-w-3xl">
            <p className="text-sm font-medium text-[#8a8880] uppercase tracking-wider">Work</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1a1a18] leading-tight">
              Selected repositories
            </h2>
            <p className="text-base sm:text-lg text-[#5c5c56] leading-relaxed">
              Top public repos by stars, shown two per row on larger screens. Tap a card for GitHub.
            </p>
          </motion.header>

          {featured_projects.length === 0 ? (
            <p className="text-lg text-[#8a8880] leading-relaxed max-w-2xl">
              No public repositories in this preview yet. Try another username or confirm your repos are public.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {featured_projects.map((project, i) => (
                <motion.li
                  key={project.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-6%' }}
                  transition={{ duration: 0.45, delay: i * 0.03, ease }}
                  className="min-w-0"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-h-[11rem] flex-col gap-3 rounded-2xl border border-[#1a1a18]/10 bg-[#faf9f6] p-5 sm:p-6 shadow-[0_1px_0_rgba(26,26,24,0.04)] transition-all duration-300 hover:border-[#1a1a18]/20 hover:shadow-[0_12px_40px_-24px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a18]/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-2">
                        <span className="mt-0.5 text-xs font-medium tabular-nums text-[#b5b3ad] shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="min-w-0 text-base sm:text-lg font-semibold tracking-tight text-[#1a1a18] transition-colors group-hover:text-[#5c5c56] line-clamp-2">
                          {project.name}
                        </h3>
                      </div>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-[#b5b3ad] opacity-60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1a1a18] group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    {project.description?.trim() ? (
                      <p className="text-sm sm:text-[0.9375rem] text-[#5c5c56] leading-relaxed line-clamp-3">
                        {project.description.trim()}
                      </p>
                    ) : null}
                    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[#1a1a18]/8 pt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#1a1a18]/6 px-2 py-1 text-xs tabular-nums text-[#4a4a44]">
                        <Star className="size-3 fill-[#c4c2bc] stroke-none" aria-hidden />
                        {project.stars}
                      </span>
                      {project.language ? (
                        <span className="rounded-md border border-[#1a1a18]/10 bg-white/80 px-2 py-1 text-xs font-medium text-[#4a4a44]">
                          {project.language}
                        </span>
                      ) : (
                        <span className="text-xs text-[#b5b3ad]">—</span>
                      )}
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Stack — full viewport, split layout + dense panel */}
      <section id="stack" className={`${shell('')} scroll-mt-4`}>
        <div className={`${padX} w-full max-w-6xl mx-auto`}>
          <motion.div
            {...fadeUp}
            className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch"
          >
            <header className="space-y-4 lg:py-2">
              <p className="text-sm font-medium text-[#8a8880] uppercase tracking-wider">Stack</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1a1a18] leading-tight">
                Languages & tools
              </h2>
              <p className="text-base sm:text-lg text-[#5c5c56] leading-relaxed">
                {primary ? (
                  <>
                    <span className="text-[#1a1a18] font-medium">{primary}</span> shows up most in this snapshot.
                    The panel lists everything we inferred from public repos{tech_stack.length > 0 ? ` (${tech_stack.length} tags)` : ''}.
                  </>
                ) : (
                  <>
                    Tags come from languages and topics on your visible repositories. More public activity fills this
                    panel out.
                  </>
                )}
              </p>
            </header>

            <div className="rounded-3xl border border-[#1a1a18]/10 bg-[#f2f1ed] p-6 sm:p-8 md:p-10 min-h-[min(100%,320px)] flex flex-col">
              {primary ? (
                <div className="mb-6 pb-6 border-b border-[#1a1a18]/10">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a8880]">Primary in preview</p>
                  <p className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1a1a18]">{primary}</p>
                </div>
              ) : (
                <div className="mb-6 pb-6 border-b border-[#1a1a18]/10">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a8880]">Primary in preview</p>
                  <p className="mt-2 text-lg text-[#8a8880] leading-relaxed">Not enough signal yet — add or star public repos.</p>
                </div>
              )}
              {tech_stack.length === 0 ? (
                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-dashed border-[#1a1a18]/15 bg-[#faf9f6]/60 px-6 py-10 text-center">
                  <p className="text-base text-[#5c5c56] leading-relaxed">
                    No stack tags in this preview. Public repos with languages or topics will appear here.
                  </p>
                </div>
              ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 auto-rows-fr">
                  {tech_stack.map((skill) => {
                    const isPrimary = primary && skill.toLowerCase() === primary.toLowerCase();
                    return (
                      <li
                        key={skill}
                        className={`flex items-center justify-center rounded-xl border px-3 py-2.5 text-center text-sm sm:text-base leading-snug transition-colors ${
                          isPrimary
                            ? 'border-[#1a1a18] bg-[#1a1a18] text-[#faf9f6] font-medium shadow-sm'
                            : 'border-[#1a1a18]/12 bg-[#faf9f6] text-[#4a4a44] hover:border-[#1a1a18]/22'
                        }`}
                      >
                        <span className="line-clamp-2">{skill}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Numbers — full viewport, dense 2×2 / 4-col band */}
      <section id="numbers" className={`${shell('bg-[#f2f1ed]')} scroll-mt-4 border-y border-[#1a1a18]/6`}>
        <div className={`${padX} w-full max-w-6xl mx-auto`}>
          <motion.div {...fadeUp} className="space-y-10 md:space-y-12">
            <header className="space-y-4 max-w-3xl">
              <p className="text-sm font-medium text-[#8a8880] uppercase tracking-wider">At a glance</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1a1a18] leading-tight">
                GitHub in a few numbers
              </h2>
              <p className="text-base sm:text-lg text-[#5c5c56] leading-relaxed">
                Snapshot from your public profile: repo count, stars, main language, and how many repos we highlight above.
              </p>
            </header>

            <div className="rounded-3xl border border-[#1a1a18]/10 bg-[#ebeae6]/90 p-5 sm:p-6 md:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-[#1a1a18]/8 bg-[#faf9f6] p-6 sm:p-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a8880]">Public repos</p>
                  <p className="mt-3 text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-[#1a1a18]">
                    {github_stats.total_repos}
                  </p>
                  <p className="mt-2 text-sm text-[#5c5c56] leading-relaxed">Counted on your profile</p>
                </div>
                <div className="rounded-2xl border border-[#1a1a18]/8 bg-[#faf9f6] p-6 sm:p-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a8880]">Total stars</p>
                  <p className="mt-3 text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-[#1a1a18]">
                    {github_stats.total_stars}
                  </p>
                  <p className="mt-2 text-sm text-[#5c5c56] leading-relaxed">Across public repos</p>
                </div>
                <div className="rounded-2xl border border-[#1a1a18]/8 bg-[#faf9f6] p-6 sm:p-7 min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a8880]">Primary language</p>
                  <p
                    className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-[#1a1a18] truncate"
                    title={primary || undefined}
                  >
                    {primary || '—'}
                  </p>
                  <p className="mt-2 text-sm text-[#5c5c56] leading-relaxed">From this preview</p>
                </div>
                <div className="rounded-2xl border border-[#1a1a18]/8 bg-[#faf9f6] p-6 sm:p-7">
                  <p className="text-xs font-medium uppercase tracking-wider text-[#8a8880]">Featured</p>
                  <p className="mt-3 text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-[#1a1a18]">
                    {featured_projects.length}
                  </p>
                  <p className="mt-2 text-sm text-[#5c5c56] leading-relaxed">Repos in the Work grid</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer — compact, detailed */}
      <footer id="contact" className="border-t border-[#1a1a18]/10 bg-[#1a1a18] text-[#e8e6e1] scroll-mt-4">
        <div className={`${padX} py-12 sm:py-14 md:py-16 w-full max-w-6xl mx-auto`}>
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm font-medium text-[#9c9a94] uppercase tracking-wider">Contact</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#faf9f6] leading-tight">
                Let&apos;s talk
              </h2>
              <p className="text-base sm:text-lg text-[#b5b3ad] leading-relaxed max-w-md">
                This page is generated from your GitHub public data. Reach out through email or your profiles below if
                you&apos;d like to collaborate or hire.
              </p>
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block text-xl sm:text-2xl font-medium text-[#faf9f6] border-b border-[#faf9f6]/30 pb-1 hover:border-[#faf9f6] transition-colors break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6]/40 rounded-sm"
                >
                  {contact.email}
                </a>
              ) : (
                <a
                  href={contact.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xl sm:text-2xl font-medium text-[#faf9f6] border-b border-[#faf9f6]/30 pb-1 hover:border-[#faf9f6] transition-colors break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6]/40 rounded-sm"
                >
                  github.com/{contact.github_username}
                </a>
              )}
            </div>

            <nav
              className="lg:col-span-3 space-y-5"
              aria-label="On this page"
            >
              <p className="text-sm font-medium text-[#9c9a94] uppercase tracking-wider">On this page</p>
              <ul className="space-y-3 text-base leading-relaxed">
                <li>
                  <a href="#intro" className="text-[#b5b3ad] hover:text-[#faf9f6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm">
                    Introduction
                  </a>
                </li>
                <li>
                  <a href="#work" className="text-[#b5b3ad] hover:text-[#faf9f6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#stack" className="text-[#b5b3ad] hover:text-[#faf9f6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm">
                    Stack
                  </a>
                </li>
                <li>
                  <a href="#numbers" className="text-[#b5b3ad] hover:text-[#faf9f6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm">
                    Numbers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[#b5b3ad] hover:text-[#faf9f6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <div className="lg:col-span-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#9c9a94] uppercase tracking-wider">Profiles</p>
                <ul className="space-y-3 text-base">
                  <li>
                    <a
                      href={contact.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#faf9f6] hover:text-[#b5b3ad] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm"
                    >
                      GitHub
                      <ArrowUpRight className="size-4 shrink-0 opacity-70" aria-hidden />
                    </a>
                  </li>
                  {contact.socials.twitter ? (
                    <li>
                      <a
                        href={contact.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#faf9f6] hover:text-[#b5b3ad] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm"
                      >
                        Twitter / X
                        <ArrowUpRight className="size-4 shrink-0 opacity-70" aria-hidden />
                      </a>
                    </li>
                  ) : null}
                  {contact.socials.linkedin ? (
                    <li>
                      <a
                        href={contact.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#faf9f6] hover:text-[#b5b3ad] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#faf9f6]/30 rounded-sm"
                      >
                        LinkedIn
                        <ArrowUpRight className="size-4 shrink-0 opacity-70" aria-hidden />
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium text-[#9c9a94] uppercase tracking-wider">About this page</p>
                <p className="text-sm text-[#8a8880] leading-relaxed">
                  Built with Devanta from live GitHub data. It is a snapshot, not a full CV. © {year}{' '}
                  {about.name}. All project links go to GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t border-[#faf9f6]/10 ${padX} py-5 sm:py-6`}>
          <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-[#8a8880]">
            <p>
              <span className="text-[#b5b3ad]">{about.name}</span>
              <span className="mx-2 text-[#5c5c56]">·</span>
              @{contact.github_username}
            </p>
            <p>Made with Devanta</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalTemplate;
