import express from 'express';
import bairroController from '../controllers/bairroController.js';

const cidadeRouter = express.Router();

cidadeRouter.get('/', bairroController.getAll);
cidadeRouter.get('/:id', bairroController.getById);
cidadeRouter.post('/', bairroController.create);
cidadeRouter.put('/:id', bairroController.update);
cidadeRouter.delete('/:id', bairroController.delete);

export default cidadeRouter;