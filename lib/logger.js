const winston = require('winston');
const path = require('path');

const round = process.env.ROUND || 0;

const logFolder = path.join(process.cwd(), '/logs');

console.log('Log folder:', logFolder);

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: path.join(logFolder, 'app.log'), level: 'info' }),
  ],
});

let lastGameLogger;

module.exports = {
  logger,
  addGameLogger: (filename) => {
    const fileTransport = winston.transports.File({ filename: path.join(logFolder, `round-${round}-${filename}.log`), level: 'info' });

    if (lastGameLogger) {
      logger.remove(lastGameLogger);
    }

    logger.add(fileTransport);

    lastGameLogger = fileTransport;
  },
};
