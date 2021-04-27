import winston from 'winston';

const logFormat = winston.format.printf((info) => `${info.level}: ${info.message}`);

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
      level: process.env.NODE_ENV === 'production' ? 'warning' : 'debug',
    }),
    new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
