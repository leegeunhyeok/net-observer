import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.error('Cannot found .env file');
  process.exit(1);
}
export const ENVIRONMENT = process.env.NODE_ENV;
