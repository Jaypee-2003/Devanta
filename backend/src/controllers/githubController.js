const githubService = require('../services/githubService');
const projectService = require('../services/projectService');
const userService = require('../services/userService');

const getAndSyncRepos = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // 1. Fetch user from DB to get GitHub token
    const user = await userService.findUserById(userId);
    if (!user || !user.github_access_token) {
      return res.status(401).json({ error: 'GitHub authentication required' });
    }

    // 2. Fetch public repos from GitHub API
    const repos = await githubService.fetchUserRepos(user.github_access_token);

    // 3. Sync repos with DB (Upsert)
    // Note: To keep it efficient, we process these in parallel
    const syncPromises = repos.map(async (repo) => {
      // Fetch README for each repo (optional, could be done on-demand or as background job)
      // For now, we'll just store basic repo info to avoid too many API calls
      return projectService.upsertProject({
        user_id: userId,
        repo_name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        github_url: repo.html_url,
        updated_at: repo.updated_at,
      });
    });

    await Promise.all(syncPromises);

    // 4. Return all synced projects
    const projects = await projectService.findProjectsByUserId(userId);

    res.status(200).json({
      message: 'GitHub repositories synced successfully',
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAndSyncRepos,
};
