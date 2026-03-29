const express = require('express');
const githubController = require('../controllers/githubController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route: Fetch and sync GitHub repos
router.get('/repos', authMiddleware, githubController.getAndSyncRepos);

module.exports = router;
