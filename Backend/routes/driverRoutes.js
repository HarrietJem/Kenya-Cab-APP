// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const { auth, roleCheck } = require('../middleware');
const driverController = require('../controllers/driverController');

// Protected routes
router.get('/profile', auth, driverController.getProfile);
router.get('/earnings', auth, roleCheck(['driver', 'admin']), driverController.getEarnings);

module.exports = router;