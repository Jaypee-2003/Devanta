const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/github', authController.redirectToGithub);
router.get('/github/callback', authController.handleGithubCallback);

module.exports = router;
