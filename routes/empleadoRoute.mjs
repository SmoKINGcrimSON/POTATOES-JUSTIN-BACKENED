import {Router} from 'express'
import {EmpleadoController} from '../controllers/empleadoController.mjs'

export const empleadoRouter = Router()

empleadoRouter.get('/', EmpleadoController.getEmpleados)
empleadoRouter.get('/:id', EmpleadoController.getById)
empleadoRouter.post('/', EmpleadoController.create)
empleadoRouter.delete('/:id', EmpleadoController.delete)
empleadoRouter.patch('/:id', EmpleadoController.update)