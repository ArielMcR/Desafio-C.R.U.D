import express from "express";
import vendaItemController from "../controllers/vendaItemController.js";

const vendaItemRoutes = express.Router()

vendaItemRoutes.get('/', vendaItemController.getAll)
vendaItemRoutes.get('/:id', vendaItemController.getById)
vendaItemRoutes.post('/', vendaItemController.create)
vendaItemRoutes.put('/:id', vendaItemController.update)
vendaItemRoutes.delete('/:id', vendaItemController.delete)

export default vendaItemRoutes