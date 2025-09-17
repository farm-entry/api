// import app from './app.js';
// import { connectDatabase } from './config/mongo.js';
// import { logger } from './config/logger.js';

// const PORT = parseInt(process.env.PORT || '3000', 10);
// const NODE_ENV = process.env.NODE_ENV || 'development';

// async function startServer() {
//   try {
//     // Start server first, then try to connect to database
//     const server = app.listen(PORT, '0.0.0.0', () => {
//       logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
//     });

//     // Try to connect to database (don't block server startup)
//     try {
//       await connectDatabase();
//     } catch (error) {
//       logger.error('Database connection failed, but server is still running:', error);
//     }

//     // Graceful shutdown handling
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
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from TypeScript API on Heroku!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});