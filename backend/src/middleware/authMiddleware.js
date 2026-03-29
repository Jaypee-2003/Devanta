const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  // 1. Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Authentication failed: No token provided',
      },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user info to request object
    // Expecting payload to contain { id, username } from authController
    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (err) {
    let message = 'Authentication failed: Invalid token';
    
    if (err.name === 'TokenExpiredError') {
      message = 'Authentication failed: Token has expired';
    }

    return res.status(401).json({
      error: {
        status: 401,
        message: message,
      },
    });
  }
};

module.exports = authMiddleware;
