export interface Project {
  id: string;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  topics?: string[];
  updated_at: string;
}

export interface PortfolioData {
  about: {
    name: string;
    email: string;
    avatar_url: string | null;
    bio: string;
  };
  featured_projects: Project[];
  tech_stack: string[];
  github_stats: {
    total_repos: number;
    total_stars: number;
    primary_language: string;
  };
  contact: {
    email: string;
    github_username: string;
    socials: {
      github: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

export interface PortfolioProps {
  data: PortfolioData;
  /** When true, outer preview chrome is shown; hide duplicate nav/header inside template */
  embedded?: boolean;
}
