import app from './app.js';
import { connectDatabase } from './config/mongo.js';
import { logger } from './config/logger.js';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {
  try {
    connectDatabase();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${NODE_ENV} mode`);
    });

    // process.on('unhandledRejection', (err: Error) => {
    //   logger.error('Unhandled Promise Rejection:', err);
    // });

    // process.on('uncaughtException', (err: Error) => {
    //   logger.error('Uncaught Exception:', err);
    // });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();