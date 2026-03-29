'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/** Matches framer-motion `useScroll` `offset` without importing internal `ScrollOffset` */
type FramerScrollOffset = NonNullable<
  NonNullable<Parameters<typeof useScroll>[0]>['offset']
>;

export type ScrollTemplateVariant = 'minimal' | 'modern' | 'creative' | 'landing';

const SCROLL_REVEAL_OFFSET = ['start 0.92', 'end 0.08'] as const;
/** Landing: wider window = calmer motion per pixel scrolled */
const LANDING_SCROLL_OFFSET = ['start 0.72', 'end 0.28'] as const;
const PARALLAX_LAYER_OFFSET = ['start end', 'end start'] as const;

/** rotateX (deg) at scroll progress 0 / 0.5 / 1 — section enters tipped, flattens, exits */
const rotatePresets: Record<ScrollTemplateVariant, [number, number, number]> = {
  minimal: [9, 0, -7],
  modern: [13, 0, -9],
  creative: [20, 0, -15],
  landing: [0, 0, 0],
};

/** vertical parallax (px) at 0 / 0.5 / 1 */
const yPresets: Record<ScrollTemplateVariant, [number, number, number]> = {
  minimal: [22, 0, -18],
  modern: [36, 0, -28],
  creative: [48, 0, -40],
  landing: [10, 0, -8],
};

const opacityPresets: Record<ScrollTemplateVariant, [number, number, number, number]> = {
  minimal: [0.88, 1, 1, 0.92],
  modern: [0.9, 1, 1, 0.9],
  creative: [0.82, 1, 1, 0.85],
  landing: [0.995, 1, 1, 0.995],
};

type ScrollReveal3DProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ScrollTemplateVariant;
  id?: string;
  /** Framer scroll offset — tighter = more reaction while section is on screen */
  offset?: readonly [string, string];
};

/**
 * Scroll-linked 3D: as the block crosses the viewport, rotateX + translateY respond.
 * Feels “futuristic” without mouse tracking — pure scroll choreography.
 */
export function ScrollReveal3D({
  children,
  className = '',
  variant = 'modern',
  id,
  offset,
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scrollOffset = (
    offset ?? (variant === 'landing' ? LANDING_SCROLL_OFFSET : SCROLL_REVEAL_OFFSET)
  ) as unknown as FramerScrollOffset;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset,
  });

  const isLanding = variant === 'landing';
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], rotatePresets[variant]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], yPresets[variant]);
  const opacity = useTransform(
    scrollYProgress,
    isLanding ? [0, 0.08, 0.92, 1] : [0, 0.12, 0.88, 1],
    opacityPresets[variant],
  );

  if (reduced) {
    return (
      <div ref={ref} id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      id={id}
      className={
        isLanding
          ? 'scroll-mt-24'
          : '[perspective:min(1400px,100vw)] [perspective-origin:50%_10%] scroll-mt-24'
      }
    >
      <motion.div
        ref={ref}
        className={`transform-gpu will-change-transform ${isLanding ? '' : '[transform-style:preserve-3d]'} ${className}`}
        style={isLanding ? { y, opacity } : { rotateX, y, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}

type ScrollParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** Extra vertical drift multiplier vs parent motion */
  depth?: number;
  /** Landing/marketing: use `soft` to cut drift ~50% for calmer scroll */
  intensity?: 'default' | 'soft';
  offset?: readonly [string, string];
};

const PARALLAX_DRIFT = { default: 32, soft: 16 } as const;

/** Inner layer moves on a different curve — stacked depth while scrolling */
export function ScrollParallaxLayer({
  children,
  className = '',
  depth = 1,
  intensity = 'default',
  offset,
}: ScrollParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const parallaxOffset = (offset ?? PARALLAX_LAYER_OFFSET) as unknown as FramerScrollOffset;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: parallaxOffset,
  });
  const drift = PARALLAX_DRIFT[intensity];
  const y = useTransform(scrollYProgress, [0, 1], [drift * depth, -drift * depth]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu will-change-transform ${className}`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

/** Full-page scroll progress for backgrounds (creative grid drift, etc.) */
export function usePageScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}

type CreativeScrollBackdropProps = {
  className?: string;
};

/** Futuristic: grid + beams drift with page scroll */
export function CreativeScrollBackdrop({ className = '' }: CreativeScrollBackdropProps) {
  const reduced = useReducedMotion();
  const scrollYProgress = usePageScrollProgress();
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const gridX = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.04, 0.09, 0.05]);

  if (reduced) {
    return (
      <div
        className={`pointer-events-none fixed inset-0 z-0 ${className}`}
        aria-hidden
      >
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#22d3ee18_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee18_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute inset-[-20%] opacity-[0.055] bg-[linear-gradient(to_right,#22d3ee22_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee22_1px,transparent_1px)] bg-[size:52px_52px]"
        style={{ y: gridY, x: gridX }}
      />
      <motion.div
        className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
        style={{ opacity: beamOpacity }}
      />
      <motion.div
        className="absolute right-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-500/25 to-transparent"
        style={{ opacity: beamOpacity }}
      />
    </div>
  );
}

type LandingScrollBackdropProps = {
  className?: string;
};

/** Landing page: violet/fuchsia grid + beams tied to page scroll — pairs with section `ScrollReveal3D` landing variant */
export function LandingScrollBackdrop({ className = '' }: LandingScrollBackdropProps) {
  const reduced = useReducedMotion();
  const scrollYProgress = usePageScrollProgress();
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const gridX = useTransform(scrollYProgress, [0, 1], ['0%', '-3%']);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.06, 0.09, 0.07]);
  const centerWashOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.72, 0.55]);

  if (reduced) {
    return (
      <div
        className={`pointer-events-none fixed inset-0 z-[1] ${className}`}
        aria-hidden
      >
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,rgba(167,139,250,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,139,250,0.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none fixed inset-0 z-[1] overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="absolute inset-[-18%] opacity-[0.045] bg-[linear-gradient(to_right,rgba(192,132,252,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.12)_1px,transparent_1px)] bg-[size:56px_56px]"
        style={{ y: gridY, x: gridX }}
      />
      <motion.div
        className="absolute left-[12%] top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-400/35 to-transparent"
        style={{ opacity: beamOpacity }}
      />
      <motion.div
        className="absolute right-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-400/28 to-transparent"
        style={{ opacity: beamOpacity }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-full w-[min(100%,720px)] -translate-x-1/2 bg-gradient-to-b from-violet-600/[0.04] via-transparent to-cyan-500/[0.05]"
        style={{ opacity: centerWashOpacity }}
      />
    </div>
  );
}

/** Vertical “signal” that travels with scroll — ties sections into one continuous 3D lane */
export function LandingScrollSpine() {
  const reduced = useReducedMotion();
  const scrollYProgress = usePageScrollProgress();
  const pulseTop = useTransform(scrollYProgress, [0, 1], ['12%', '82%']);
  const spineOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.45, 0.7, 0.7, 0.5]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-y-0 z-[2] hidden w-0 md:block left-[max(1rem,calc(50%-36rem))]"
      aria-hidden
    >
      <motion.div
        className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"
        style={{ opacity: spineOpacity }}
      />
      <motion.div
        className="absolute left-1/2 h-28 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-400/90 via-fuchsia-400/80 to-violet-500/70 shadow-[0_0_24px_rgba(167,139,250,0.45)]"
        style={{ top: pulseTop }}
      />
    </div>
  );
}

type LandingDepthCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger float phase — 0 = front */
  layer?: number;
};

/**
 * Floating panel for landing: depth shadow + gentle Y loop (pairs with parent `ScrollReveal3D` 3D tilt).
 */
export function LandingDepthCard({
  children,
  className = '',
  layer = 0,
}: LandingDepthCardProps) {
  const reduced = useReducedMotion();
  const floatDur = 5.2 + layer * 0.45;

  if (reduced) {
    return (
      <div
        className={`rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md shadow-xl ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`rounded-2xl border border-white/10 bg-slate-900/75 backdrop-blur-md shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06] [transform-style:preserve-3d] ${className}`}
      animate={{ y: [0, -6 - layer * 2, 0] }}
      transition={{
        duration: floatDur,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: layer * 0.18,
      }}
    >
      {children}
    </motion.div>
  );
}
