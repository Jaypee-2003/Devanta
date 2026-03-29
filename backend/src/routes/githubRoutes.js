const express = require('express');
const githubController = require('../controllers/githubController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public: preview portfolio JSON from profile URL or username (no DB)
router.post('/preview', githubController.previewFromGithub);

// Protected route: Fetch and sync GitHub repos
router.get('/repos', authMiddleware, githubController.getAndSyncRepos);

module.exports = router;
