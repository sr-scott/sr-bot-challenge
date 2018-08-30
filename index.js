const app = require('./lib/app');
const { logger } = require('./lib/logger');

try {
  app.listen(3000);

  logger.info('Server started');
} catch (e) {
  logger.error(`Error starting server: ${e.message}`);
}
