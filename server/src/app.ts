import express from 'express';
import path from 'path';
import './util/secrets';

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as apiController from './controllers/api';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'public')));

/**
 * App routes.
 */
app.get('/', homeController.index);

/**
 * API routes.
 */
app.get('/api', apiController.getApi);

export default app;
