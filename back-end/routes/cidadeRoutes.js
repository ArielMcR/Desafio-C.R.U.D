import express from 'express';
import cidadeController from '../controllers/cidadeController.js';

const cidadeRouter = express.Router();

cidadeRouter.get('/', cidadeController.getAll);
cidadeRouter.get('/:id', cidadeController.getById);
cidadeRouter.post('/', cidadeController.create);
cidadeRouter.put('/:id', cidadeController.update);
cidadeRouter.delete('/:id', cidadeController.delete);

export default cidadeRouter;