import express from 'express';
import produtoController from '../controllers/produtoController.js';

const produtoRouter = express.Router();

produtoRouter.get('/', produtoController.getAll);
produtoRouter.get('/:id', produtoController.getById);
produtoRouter.post('/', produtoController.create);
produtoRouter.put('/:id', produtoController.update);
produtoRouter.delete('/:id', produtoController.delete);

export default produtoRouter;