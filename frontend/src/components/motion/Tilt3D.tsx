'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const springDefault = { stiffness: 320, damping: 32, mass: 0.4 };

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees */
  intensity?: number;
  /** Disable pointer tracking (static card) */
  disabled?: boolean;
};

/**
 * Mouse-driven 3D tilt using Framer Motion springs — GPU-friendly via transform-gpu.
 */
export function Tilt3D({ children, className = '', intensity = 12, disabled = false }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const off = disabled || !!reduced;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(my, [-0.5, 0.5], [intensity, -intensity]),
    springDefault,
  );
  const rotateY = useSpring(
    useTransform(mx, [-0.5, 0.5], [-intensity, intensity]),
    springDefault,
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (off) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className={`[perspective:1000px] ${off ? '' : 'cursor-default'}`}>
      <motion.div
        ref={ref}
        className={`transform-gpu will-change-transform [transform-style:preserve-3d] ${className}`}
        style={off ? undefined : { rotateX, rotateY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}

type FloatIdleProps = {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
};

/** Subtle vertical drift — respect reduced motion via CSS in parent or keep amplitude low */
export function FloatIdle({ children, className = '', amplitude = 6, duration = 5 }: FloatIdleProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

type HoverLift3DProps = {
  children: React.ReactNode;
  className?: string;
  rx?: number;
  ry?: number;
  y?: number;
};

/** Lightweight spring hover — no mouse tracking; good for dense lists */
export function HoverLift3D({ children, className = '', rx = 4, ry = -4, y = -6 }: HoverLift3DProps) {
  const reduced = useReducedMotion();
  return (
    <div className="[perspective:900px]">
      <motion.div
        className={`transform-gpu [transform-style:preserve-3d] ${className}`}
        whileHover={
          reduced
            ? undefined
            : {
                rotateX: rx,
                rotateY: ry,
                y,
                transition: { type: 'spring', stiffness: 400, damping: 28 },
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
