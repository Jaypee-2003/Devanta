const axios = require('axios');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

const redirectToGithub = (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;
  res.redirect(githubAuthUrl);
};

const handleGithubCallback = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    // 1. Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token from GitHub');
    }

    // 2. Fetch user profile from GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const githubUser = userResponse.data;

    // 3. Fetch primary email from GitHub (if not public)
    let email = githubUser.email;
    if (!email) {
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const primaryEmail = emailsResponse.data.find((e) => e.primary && e.verified);
      email = primaryEmail ? primaryEmail.email : null;
    }

    // 4. Find or create user in database
    let user = await userService.findUserByGithubId(githubUser.id.toString());

    if (!user) {
      user = await userService.createUser({
        github_id: githubUser.id.toString(),
        username: githubUser.login,
        email: email,
        avatar_url: githubUser.avatar_url,
        github_access_token: accessToken,
      });
    } else {
      // Update access token for existing user
      user = await userService.updateUserGithubToken(user.id, accessToken);
    }

    // 5. Generate JWT session token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 6. Return token and user profile
    res.status(200).json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
      },
    });

  } catch (error) {
    console.error('GitHub OAuth Error:', error.response ? error.response.data : error.message);
    next(error);
  }
};

module.exports = {
  redirectToGithub,
  handleGithubCallback,
};
