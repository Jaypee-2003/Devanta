const githubService = require('../services/githubService');
const projectService = require('../services/projectService');
const userService = require('../services/userService');

/**
 * Public preview: build portfolio JSON from a GitHub profile URL or username (no auth, no DB).
 * Uses the public GitHub API — only public profile + public repos.
 */
const previewFromGithub = async (req, res, next) => {
  const raw =
    req.body?.input ??
    req.body?.url ??
    req.body?.username;

  const username = githubService.parseGithubUsername(
    typeof raw === 'string' ? raw : String(raw ?? ''),
  );

  if (!username) {
    return res.status(400).json({
      error: 'Invalid GitHub profile URL or username. Try a link like https://github.com/octocat or a username.',
    });
  }

  try {
    const user = await githubService.fetchPublicGithubUser(username);
    const repos = await githubService.fetchPublicGithubRepos(user.login);
    const data = githubService.buildPortfolioFromGithubApi(user, repos);

    res.status(200).json({
      message: 'Preview generated from public GitHub data',
      username: user.login,
      data,
    });
  } catch (error) {
    if (error.response) {
      const { status, data, headers } = error.response;
      if (status === 404) {
        return res.status(404).json({ error: 'GitHub user not found.' });
      }
      if (status === 403) {
        const reset = headers['x-ratelimit-reset'];
        const hint =
          reset && !process.env.GITHUB_TOKEN
            ? ' GitHub limits unauthenticated requests; add GITHUB_TOKEN to the backend .env for higher limits.'
            : '';
        return res.status(403).json({
          error: `${data?.message || 'GitHub API access denied or rate limited.'}${hint}`,
        });
      }
    }
    next(error);
  }
};

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
  previewFromGithub,
  getAndSyncRepos,
};
