import { Router } from 'express';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();

charactersRouter.get('/', CharactersController.findAll);
charactersRouter.get('/:params', CharactersController.findOne);
charactersRouter.get('/game/:params', CharactersController.findByGame);
charactersRouter.post('/', CharactersController.create);

export { charactersRouter };