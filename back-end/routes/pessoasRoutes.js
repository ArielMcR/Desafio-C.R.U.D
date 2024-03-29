import express from 'express';
import pessoasController from '../controllers/pessoasController.js';

const pessoasRouter = express.Router();

pessoasRouter.get('/', pessoasController.getAll);
pessoasRouter.get('/:id', pessoasController.getById);
pessoasRouter.post('/', pessoasController.create);
pessoasRouter.put('/:id', pessoasController.update);
pessoasRouter.delete('/:id', pessoasController.delete);

export default pessoasRouter;