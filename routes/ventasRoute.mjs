import { Router } from "express";
import { VentaController } from "../controllers/ventaController.mjs";

export const ventaRouter = Router()

ventaRouter.get('/', VentaController.getVentas)
ventaRouter.delete('/:id', VentaController.deleteById)
ventaRouter.post('/', VentaController.create)