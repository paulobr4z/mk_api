import { Router } from 'express';

import { charactersRouter } from './characters.routes';

const routes = Router();

routes.use('/api/characters', charactersRouter);

export { routes };