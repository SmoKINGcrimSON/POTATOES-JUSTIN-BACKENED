import { Router } from "express";
import { PolleriaController } from "../controllers/polleriaController.mjs";

export const polleriaRoute = Router();

polleriaRoute.get('/', PolleriaController.getAll)
polleriaRoute.get('/:id', PolleriaController.getById) //encontar todas las pollerías
polleriaRoute.delete('/:id', PolleriaController.deleteById) //delete by id
polleriaRoute.patch('/:id', PolleriaController.updateById) //update by id
polleriaRoute.post('/', PolleriaController.create) //crear una pollería