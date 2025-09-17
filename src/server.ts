// import app from './app.js';
// import { connectDatabase } from './config/mongo.js';
// import { logger } from './config/logger.js';

// const PORT = parseInt(process.env.PORT || '3000', 10);
// const NODE_ENV = process.env.NODE_ENV || 'development';

// const startServer = async () => {
//   try {
//     const server = app.listen(PORT, () => {
//       logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
//     });

//     try {
//       await connectDatabase();
//     } catch (error) {
//       logger.error('Database connection failed, but server is still running:', error);
//     }

//     process.on('SIGTERM', () => {
//       logger.info('SIGTERM received, shutting down gracefully');
//       server.close(() => {
//         logger.info('Process terminated');
//         process.exit(0);
//       });
//     });

//     process.on('unhandledRejection', (err: Error) => {
//       logger.error('Unhandled Promise Rejection:', err);
//       server.close(() => {
//         process.exit(1);
//       });
//     });

//     process.on('uncaughtException', (err: Error) => {
//       logger.error('Uncaught Exception:', err);
//       process.exit(1);
//     });

//   } catch (error) {
//     logger.error('Failed to start server:', error);
//     process.exit(1);
//   }
// }

// startServer();

import express from "express";

const app = express();

app.get("/ping", (req, res) => {
  res.send({
    message: "pong",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    port: process.env.PORT
  });
});

app.get("/", (req, res) => {
  res.send({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  return console.log(`[server]: Server is running on ${PORT}`);
});
