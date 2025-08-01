// server.js
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const App = require('./app');
const { socketAuth } = require('./middleware/socketAuth');
const { socketHandlers } = require('./services/socketService');
const { initializeRedis } = require('./services/cacheService');
const { MONGO_OPTIONS } = require('./config/dbConfig');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

class Server {
  constructor() {
    this.app = new App().getServer();
    this.server = http.createServer(this.app);
    this.io = this.initializeSocketIO();
    this.initializeDatabase();
    this.initializeCache();
  }

  initializeSocketIO() {
    const io = socketIo(this.server, {
      cors: {
        origin: process.env.ALLOWED_ORIGINS.split(','),
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
      },
      transports: ['websocket', 'polling'],
      path: '/socket.io'
    });

    // Socket.IO Middleware
    io.use(socketAuth);

    // Socket.IO Events
    io.on('connection', (socket) => {
      console.log(`🟢 New socket connected: ${socket.id}`);
      socketHandlers(io, socket);

      socket.on('disconnect', () => {
        console.log(`🔴 Socket disconnected: ${socket.id}`);
      });
    });

    this.app.set('io', io);
    return io;
  }

  async initializeDatabase() {
    try {
      await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
      console.log('✅ MongoDB Connected');
      
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB Connection Error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB Disconnected');
      });
    } catch (err) {
      console.error('❌ MongoDB Connection Failed', err);
      process.exit(1);
    }
  }

  async initializeCache() {
    try {
      await initializeRedis();
      console.log('✅ Redis Connected');
    } catch (err) {
      console.error('❌ Redis Connection Failed', err);
    }
  }

  start() {
    if (cluster.isMaster && process.env.NODE_ENV === 'production') {
      console.log(`Master ${process.pid} is running`);

      // Fork workers
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Restart worker
      });
    } else {
      this.server.listen(PORT, () => {
        console.log(`🚀 Worker ${process.pid} running on http://localhost:${PORT}`);
      });
    }
  }
}

// Start the server
if (require.main === module) {
  const server = new Server();
  server.start();
}

module.exports = Server;