import { Router } from 'express';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();

charactersRouter.get('/', CharactersController.findAll);
charactersRouter.get('/:id', CharactersController.findById);
charactersRouter.post('/', CharactersController.create);

export { charactersRouter };