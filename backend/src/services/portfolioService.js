const db = require('../config/db');
const userService = require('./userService');
const projectService = require('./projectService');

/**
 * Generate a structured portfolio JSON for a user.
 * @param {string} userId - The user's UUID.
 * @returns {Promise<Object>} - The structured portfolio data.
 */
const generatePortfolioData = async (userId) => {
  // 1. Fetch user profile and projects from DB
  const user = await userService.findUserById(userId);
  const projects = await projectService.findProjectsByUserId(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // 2. Rank and select featured projects
  // We sort by stars (desc) and updated_at (desc) as fallback
  const featuredProjects = projects
    .sort((a, b) => {
      if (b.stars !== a.stars) {
        return b.stars - a.stars;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 6) // Select top 6
    .map(p => ({
      id: p.id,
      name: p.repo_name,
      description: p.description,
      language: p.language,
      stars: p.stars,
      url: p.github_url,
      updated_at: p.updated_at,
    }));

  // 3. Extract tech stack from projects
  const languages = projects
    .map(p => p.language)
    .filter(lang => lang && lang !== 'null');
  
  const techStack = [...new Set(languages)]; // Unique languages

  // 4. Calculate GitHub Statistics
  const totalStars = projects.reduce((acc, p) => acc + (p.stars || 0), 0);
  const mostUsedLanguage = techStack.length > 0 
    ? techStack.sort((a, b) => 
        languages.filter(l => l === b).length - languages.filter(l => l === a).length
      )[0]
    : 'N/A';

  // 5. Construct the final structured JSON
  const portfolioData = {
    about: {
      name: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
      bio: `Professional developer with a passion for building scalable applications. Check out my ${projects.length} repositories on GitHub!`,
    },
    featured_projects: featuredProjects,
    tech_stack: techStack,
    github_stats: {
      total_repos: projects.length,
      total_stars: totalStars,
      primary_language: mostUsedLanguage,
    },
    contact: {
      email: user.email,
      github_username: user.username,
      socials: {
        github: `https://github.com/${user.username}`,
      }
    }
  };

  // 6. Persistence (Save/Update portfolio in DB)
  // We use the username as the default slug
  const query = `
    INSERT INTO portfolios (user_id, template, theme, slug, config)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id) DO UPDATE SET
      template = EXCLUDED.template,
      theme = EXCLUDED.theme,
      config = EXCLUDED.config,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;
  const values = [
    userId, 
    'minimal', 
    'dark', 
    user.username.toLowerCase(), 
    JSON.stringify(portfolioData)
  ];
  
  const { rows } = await db.query(query, values);
  
  return {
    portfolio: rows[0],
    data: portfolioData
  };
};

module.exports = {
  generatePortfolioData,
};
