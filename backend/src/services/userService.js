const db = require('../config/db');

const findUserByGithubId = async (githubId) => {
  const query = 'SELECT * FROM users WHERE github_id = $1';
  const { rows } = await db.query(query, [githubId]);
  return rows[0];
};

const createUser = async (userData) => {
  const { github_id, username, email, avatar_url, github_access_token } = userData;
  const query = `
    INSERT INTO users (github_id, username, email, avatar_url, github_access_token)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [github_id, username, email, avatar_url, github_access_token];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateUserGithubToken = async (userId, token) => {
  const query = 'UPDATE users SET github_access_token = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
  const { rows } = await db.query(query, [token, userId]);
  return rows[0];
};

const findUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

module.exports = {
  findUserByGithubId,
  createUser,
  findUserById,
  updateUserGithubToken,
};
