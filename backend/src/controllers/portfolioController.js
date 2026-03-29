const db = require('../config/db');
const portfolioService = require('../services/portfolioService');

const generatePortfolio = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const result = await portfolioService.generatePortfolioData(userId);
    
    res.status(200).json({
      message: 'Portfolio generated successfully',
      portfolio: result.portfolio,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getPortfolioBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const query = 'SELECT * FROM portfolios WHERE slug = $1';
    const { rows } = await db.query(query, [slug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.status(200).json({
      portfolio: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generatePortfolio,
  getPortfolioBySlug,
};
