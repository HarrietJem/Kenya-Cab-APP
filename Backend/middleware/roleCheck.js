// middleware/roleCheck.js
const { constants } = require('../models');

// Predefined roles from constants if you have them
const ROLES = constants?.ROLES || ['admin', 'driver', 'user']; 

module.exports = function roleCheck(allowedRoles = []) {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: Requires ${allowedRoles.join(' or ')} role`,
        yourRole: req.user.role
      });
    }

    next();
  };
};