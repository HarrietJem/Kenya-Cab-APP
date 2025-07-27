// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const driverRoutes = require('./routes/driverRoutes');
const { corsOptions } = require('./config/corsConfig');
const { helmetConfig } = require('./config/securityConfig');
const { morganConfig } = require('./config/loggingConfig');

require('dotenv').config();

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    // Security Middlewares
    this.app.use(helmet(helmetConfig));
    this.app.use(cors(corsOptions));
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));

    // Rate Limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200, // limit each IP to 200 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use(limiter);

    // Logging
    this.app.use(morgan(morganConfig.format, morganConfig.options));

    // Proxy Configuration (if needed)
    if (process.env.NODE_ENV === 'development') {
      this.app.use('/api', createProxyMiddleware({ 
        target: 'http://localhost:3000', 
        changeOrigin: true 
      }));
    }
  }

  initializeRoutes() {
    // API Routes
    this.app.use('/api/v1/auth', authRoutes);
    this.app.use('/api/v1/rides', rideRoutes);
    this.app.use('/api/v1/drivers', driverRoutes);

    // Health Check
    this.app.get('/health', (req, res) => res.status(200).json({ 
      status: 'UP', 
      timestamp: new Date().toISOString() 
    }));

    // Root Route
    this.app.get('/', (req, res) => 
      res.send('🚗 Ride-Hailing Backend Running'));
  }

  initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  getServer() {
    return this.app;
  }
}

module.exports = new App();