// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error('[ERROR]', new Date().toISOString(), err.stack);

  // Handle JWT errors specifically
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Token expired' });
  }

  const statusCode = err.statusCode || res.statusCode || 500;
  const response = {
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
    response.details = err.details;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;