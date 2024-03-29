import express from 'express';
import vendaController from '../controllers/vendaController.js';

const vendaRoutes = express.Router();

vendaRoutes.get('/', vendaController.getAll);
vendaRoutes.get('/:id', vendaController.getById);
vendaRoutes.post('/', vendaController.create);
vendaRoutes.put('/:id', vendaController.update);
vendaRoutes.delete('/:id', vendaController.delete);

export default vendaRoutes;