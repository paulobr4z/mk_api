import { Router } from 'express';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();

charactersRouter.get('/', CharactersController.findAll);
charactersRouter.get('/:params', CharactersController.findOne);
charactersRouter.post('/', CharactersController.create);

export { charactersRouter };