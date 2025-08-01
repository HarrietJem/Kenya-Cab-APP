// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Using the index.js barrel import
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach full user object
    req.token = token; // Attach token for potential logout functionality
    next();
  } catch (err) {
    res.status(401).json({ 
      message: 'Invalid token',
      ...(process.env.NODE_ENV === 'development' && { error: err.message }) 
    });
  }
};