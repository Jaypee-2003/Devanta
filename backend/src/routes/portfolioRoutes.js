const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route: Generate or update user's portfolio
router.post('/generate', authMiddleware, portfolioController.generatePortfolio);

// Public route: Get portfolio by slug
router.get('/p/:slug', portfolioController.getPortfolioBySlug);

module.exports = router;
