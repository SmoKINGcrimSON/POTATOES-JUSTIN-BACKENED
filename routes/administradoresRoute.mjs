import {Router} from 'express'
import { AdministradorController } from '../controllers/administradorController.mjs'

export const administradorRouter = Router()

administradorRouter.post('/', AdministradorController.existAdministrador)
administradorRouter.patch('/:id', AdministradorController.update)