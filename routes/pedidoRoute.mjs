import { Router } from "express";
import { PedidoController } from "../controllers/pedidoController.mjs";


export const pedidoRouter = Router()
pedidoRouter.get('/', PedidoController.getAll)
pedidoRouter.delete('/:id', PedidoController.deleteById)
pedidoRouter.patch('/:id', PedidoController.update)
pedidoRouter.post('/', PedidoController.create)