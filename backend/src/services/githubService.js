const axios = require('axios');

/** GitHub.com path segments that are not usernames */
const RESERVED_PATH_SEGMENTS = new Set([
  'settings',
  'explore',
  'topics',
  'organizations',
  'orgs',
  'marketplace',
  'login',
  'signup',
  'search',
  'features',
  'sponsors',
  'pricing',
  'enterprise',
  'readme',
  'security',
  'about',
]);

const githubRequestHeaders = () => {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Devanta-Portfolio-Preview/1.0',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Parse a GitHub profile URL or plain username into a login handle.
 * Accepts: "torvalds", "@torvalds", "https://github.com/torvalds", "https://github.com/torvalds/linux"
 */
const parseGithubUsername = (input) => {
  if (input == null || typeof input !== 'string') return null;
  const raw = input.trim();
  if (!raw) return null;

  if (raw.startsWith('@')) {
    const login = raw.slice(1).split('/')[0];
    return login || null;
  }

  if (raw.includes('github.com')) {
    try {
      const normalized = raw.startsWith('http') ? raw : `https://${raw}`;
      const url = new URL(normalized);
      if (!url.hostname.endsWith('github.com')) return null;
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length === 0) return null;
      const first = parts[0];
      if (RESERVED_PATH_SEGMENTS.has(first.toLowerCase())) return null;
      return first;
    } catch {
      return null;
    }
  }

  if (/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-])){0,38}$/.test(raw)) {
    if (RESERVED_PATH_SEGMENTS.has(raw.toLowerCase())) return null;
    return raw;
  }

  return null;
};

const fetchPublicGithubUser = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: githubRequestHeaders(),
  });
  return response.data;
};

const fetchPublicGithubRepos = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}/repos`, {
    headers: githubRequestHeaders(),
    params: {
      per_page: 100,
      sort: 'updated',
      type: 'owner',
    },
  });
  return response.data;
};

/**
 * Build the same portfolio JSON shape the React templates expect, from public GitHub API data.
 */
const buildPortfolioFromGithubApi = (user, repos) => {
  const list = Array.isArray(repos) ? repos : [];

  const featuredProjects = [...list]
    .sort((a, b) => {
      const starsA = a.stargazers_count || 0;
      const starsB = b.stargazers_count || 0;
      if (starsB !== starsA) return starsB - starsA;
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6)
    .map((r) => ({
      id: String(r.id),
      name: r.name,
      description: r.description || '',
      language: r.language || null,
      stars: r.stargazers_count || 0,
      url: r.html_url,
      updated_at: r.updated_at,
    }));

  const languages = list.map((r) => r.language).filter(Boolean);
  const techStack = [...new Set(languages)];
  const totalStars = list.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  const primaryLanguage =
    techStack.length > 0
      ? techStack.sort(
          (a, b) => languages.filter((l) => l === b).length - languages.filter((l) => l === a).length,
        )[0]
      : 'N/A';

  const bio =
    user.bio ||
    `Public GitHub portfolio — ${list.length} public ${list.length === 1 ? 'repository' : 'repositories'}.`;

  return {
    about: {
      name: user.name || user.login,
      email: user.email || '',
      avatar_url: user.avatar_url,
      bio,
    },
    featured_projects: featuredProjects,
    tech_stack: techStack.length ? techStack : ['N/A'],
    github_stats: {
      total_repos: list.length,
      total_stars: totalStars,
      primary_language: primaryLanguage,
    },
    contact: {
      email: user.email || '',
      github_username: user.login,
      socials: {
        github: user.html_url,
      },
    },
  };
};

const fetchUserRepos = async (accessToken) => {
  try {
    const response = await axios.get('https://api.github.com/user/repos', {
      params: {
        type: 'public',
        sort: 'updated',
        per_page: 100,
      },
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return response.data;
  } catch (error) {
    handleGithubError(error);
  }
};

const fetchRepoReadme = async (accessToken, owner, repo) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    handleGithubError(error);
  }
};

const handleGithubError = (error) => {
  if (error.response) {
    const { status, data, headers } = error.response;
    if (status === 403 && headers['x-ratelimit-remaining'] === '0') {
      const resetTime = new Date(headers['x-ratelimit-reset'] * 1000);
      throw new Error(`GitHub API Rate Limit Exceeded. Resets at ${resetTime.toISOString()}`);
    }
    throw new Error(data.message || 'GitHub API error');
  }
  throw error;
};

module.exports = {
  fetchUserRepos,
  fetchRepoReadme,
  parseGithubUsername,
  githubRequestHeaders,
  fetchPublicGithubUser,
  fetchPublicGithubRepos,
  buildPortfolioFromGithubApi,
};
