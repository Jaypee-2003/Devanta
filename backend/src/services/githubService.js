const axios = require('axios');

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
        Accept: 'application/vnd.github.v3.raw', // Get raw content
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // No README found
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
};
