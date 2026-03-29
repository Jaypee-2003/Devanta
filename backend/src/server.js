const app = require('./app');
const { pool } = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Attempt to connect to the database
    await pool.connect();
    console.log('Connected to PostgreSQL successfully.');
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    if (process.env.NODE_ENV === 'production') {
      console.error('Server not started due to DB connection failure in production.');
      process.exit(1);
    }
    console.warn('Continuing server startup in development mode without active DB connection...');
  }

  const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
  });

  // Keep the process alive in development if there are no active handles (e.g. DB failed)
  if (process.env.NODE_ENV !== 'production') {
    setInterval(() => {}, 1000 * 60 * 60); // 1 hour
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('SIGINT received.');
    server.close(() => {
      console.log('Server closed.');
      pool.end(() => {
        console.log('Database pool has ended.');
        process.exit(0);
      });
    });
  });
};

startServer();
