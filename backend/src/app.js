const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Security: Helmet for common headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Versioning and Routes ---
const v1Routes = express.Router();
const authRoutes = require('./routes/authRoutes');
const githubRoutes = require('./routes/githubRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Health check endpoint
v1Routes.get('/health', (req, res) => {
  res.status(200).json({ status: 'API running' });
});

// Profile endpoint (protected)
v1Routes.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'User profile retrieved successfully',
    user: req.user,
  });
});

// Portfolio routes
v1Routes.use('/portfolios', portfolioRoutes);

// GitHub routes
v1Routes.use('/github', githubRoutes);

// Auth routes
v1Routes.use('/auth', authRoutes);

// Register v1 routes
app.use('/api/v1', v1Routes);

// --- Error Handling Middleware ---
app.use((req, res, next) => {
  const error = new Error('Resource Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log the error stack in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error] ${statusCode}: ${message}`, err.stack);
  }

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: message,
      // Only include stack trace in dev
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    }
  });
});

module.exports = app;
