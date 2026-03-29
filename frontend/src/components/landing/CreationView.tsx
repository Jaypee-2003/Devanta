'use client';

import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import PreviewChrome from '@/components/landing/PreviewChrome';
import PortfolioRenderer from '@/components/templates/PortfolioRenderer';
import TemplateSwitcher from '@/components/templates/TemplateSwitcher';
import { PortfolioData } from '@/types/portfolio';

interface CreationViewProps {
  data: PortfolioData;
  username: string;
  template: string;
  onTemplateChange: (id: string) => void;
  onBack: () => void;
}

export default function CreationView({
  data,
  username,
  template,
  onTemplateChange,
  onBack,
}: CreationViewProps) {
  // After generate or template switch, land on the hero (top) — not mid-page scroll.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [template]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#fafafa]"
    >
      <PreviewChrome theme={template} username={username} onBack={onBack} />

      <div className="relative z-0 isolate">
        <TemplateSwitcher current={template} onSelect={onTemplateChange} />
        <PortfolioRenderer key={template} data={data} templateName={template} embedded />
      </div>
    </motion.div>
  );
}
