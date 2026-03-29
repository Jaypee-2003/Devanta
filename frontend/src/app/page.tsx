'use client';

import React, { useState, useCallback } from 'react';
import LandingPage from '@/components/landing/LandingPage';
import CreationView from '@/components/landing/CreationView';
import { PortfolioData } from '@/types/portfolio';
import { fetchGithubPreview } from '@/lib/api';

export default function Home() {
  const [input, setInput] = useState('');
  const [template, setTemplate] = useState('minimal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [resolvedUser, setResolvedUser] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const q = input.trim();
      if (!q) {
        setError('Paste a GitHub profile link or username.');
        return;
      }
      setLoading(true);
      try {
        const { username, data: next } = await fetchGithubPreview(q);
        setResolvedUser(username);
        setData(next);
      } catch (err) {
        setData(null);
        setResolvedUser(null);
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    },
    [input],
  );

  const handleBack = useCallback(() => {
    setData(null);
    setResolvedUser(null);
    setError(null);
    setTemplate('minimal');
    window.scrollTo(0, 0);
  }, []);

  if (data && resolvedUser && !loading) {
    return (
      <CreationView
        data={data}
        username={resolvedUser}
        template={template}
        onTemplateChange={setTemplate}
        onBack={handleBack}
      />
    );
  }

  return (
    <LandingPage
      input={input}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}
