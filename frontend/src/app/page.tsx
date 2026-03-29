'use client';

import React, { useState } from 'react';
import PortfolioRenderer from '@/components/templates/PortfolioRenderer';
import TemplateSwitcher from '@/components/templates/TemplateSwitcher';
import { PortfolioData } from '@/types/portfolio';

// Mock data for demonstration
const mockData: PortfolioData = {
  about: {
    name: "Alex Devanta",
    email: "alex@devanta.com",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Senior Full-stack Architect specializing in React, Node.js, and Cloud Infrastructure. Passionate about building tools that empower other developers."
  },
  featured_projects: [
    {
      id: "1",
      name: "Devanta Core",
      description: "A high-performance portfolio generator engine with support for real-time GitHub sync and multiple themes.",
      language: "TypeScript",
      stars: 1250,
      url: "#",
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      name: "GitSync-JS",
      description: "Lightweight utility library for syncing local git metadata with remote APIs efficiently.",
      language: "JavaScript",
      stars: 420,
      url: "#",
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      name: "Tailwind-Magic",
      description: "Collection of premium Tailwind CSS components for modern SaaS applications.",
      language: "CSS",
      stars: 890,
      url: "#",
      updated_at: new Date().toISOString()
    }
  ],
  tech_stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker", "AWS"],
  github_stats: {
    total_repos: 42,
    total_stars: 2560,
    primary_language: "TypeScript"
  },
  contact: {
    email: "alex@devanta.com",
    github_username: "alexdev",
    socials: {
      github: "https://github.com",
      twitter: "https://twitter.com/alexdev",
      linkedin: "https://linkedin.com/in/alexdev"
    }
  }
};

export default function Home() {
  const [template, setTemplate] = useState('minimal');

  return (
    <div className="relative">
      <TemplateSwitcher current={template} onSelect={setTemplate} />
      <PortfolioRenderer data={mockData} templateName={template} />
    </div>
  );
}
