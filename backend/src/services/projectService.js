const db = require('../config/db');

const upsertProject = async (projectData) => {
  const {
    user_id,
    repo_name,
    description,
    language,
    stars,
    github_url,
    updated_at,
  } = projectData;

  const query = `
    INSERT INTO projects (user_id, repo_name, description, language, stars, github_url, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (user_id, repo_name) DO UPDATE SET
      description = EXCLUDED.description,
      language = EXCLUDED.language,
      stars = EXCLUDED.stars,
      github_url = EXCLUDED.github_url,
      updated_at = EXCLUDED.updated_at
    RETURNING *
  `;
  const values = [user_id, repo_name, description, language, stars, github_url, updated_at];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const findProjectsByUserId = async (userId) => {
  const query = 'SELECT * FROM projects WHERE user_id = $1 ORDER BY stars DESC, updated_at DESC';
  const { rows } = await db.query(query, [userId]);
  return rows;
};

module.exports = {
  upsertProject,
  findProjectsByUserId,
};
