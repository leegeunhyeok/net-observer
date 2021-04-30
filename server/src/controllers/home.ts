import { Request, Response } from 'express';
import loader from '../util/loader';

/**
 * Home page.
 * @route GET /
 */
export const index = async (_req: Request, res: Response): Promise<void> => {
  res.setHeader('Content-Type', 'text/html');
  res.send(await loader('index.html'));
};
