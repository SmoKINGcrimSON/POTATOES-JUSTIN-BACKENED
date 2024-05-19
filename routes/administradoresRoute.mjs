import {Router} from 'express'
import { AdministradorController } from '../controllers/administradorController.mjs'

export const administradorRouter = Router()

administradorRouter.get('/:id', AdministradorController.getById)
administradorRouter.post('/', AdministradorController.exist)
administradorRouter.patch('/:id', AdministradorController.update)