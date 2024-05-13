import { Empleado } from "../models/empleado.mjs"
import {validateEmpleado, validatePartialEmpleado} from "../schemas/empleadoSchema.mjs"

export class EmpleadoController{
    //obtener empleados
    static async getEmpleados(req, res){
        const empleados = await Empleado.getEmpleados()
        //renderize in json
        res.status(200).json(empleados)
    }

    //obtener empleado a través del ID
    static async getById(req, res){
        const {id} = req.params;
        const empleado = await Empleado.getById({id})
        if(empleado) return res.status(200).json(empleado)
        res.status(200).json({message: '404: empleado no encontrado'})
    }

    //crear un nuevo empleado
    static async create(req, res){
        //validate with schema (class) the req.body
        const empleado = validateEmpleado(req.body)
        //send error if the req.body doesn't match the schema
        if(empleado.error){
            // 422 unprocessable entity
            return res.status(400).json({error: JSON.parse(empleado.error.message)})
        }
        //newEmpleado try to create the resource in BBDD
        const newEmpleado = await Empleado.create({empleado: empleado.data})
        //if the resource could not be created, send 422 status code.
        if(newEmpleado === null){
            return res.status(422).json({error: "422: resource could not be created."})
        }
        //inform resource could be created in route.
        res.status(201).json(newEmpleado)
    }

    //delete nuevo empleado
    static async delete(req, res){
        //obtener id del empleado
        const { id } = req.params
        //determinar si 'id' es un número
        if(isNaN(id)) return res.status(400).json({message: '400: tipo incorrecto del id'})
        //tratar de eliminar en BASE DE DATOS (return BOOL)
        const fueEliminado = await Empleado.delete({id})
        //si no se pudo eliminar porque el id no existe, salta el siguiente error
        if(!fueEliminado) return res.status(400).json({message: '400: el id del empleado no existe'})
        //si el empleado pudo ser eliminado:
        return res.status(200).json({message: '200: el empleado fue eliminado exitosamente'})
    }

    //patch empleado
    static async update(req, res){
        //evaluar si req.body coincide con todo o parte del esquema:
        const empleado = validatePartialEmpleado(req.body)
        //si no hay coincidencia en al menos un campo, lanzar error:
        if(empleado.error) return res.status(400).json({error: JSON.parse(empleado.error.message)})
        //recuperar id de los params
        const {id} = req.params
        //evaluar que el id sea válido
        if(isNaN(id)) return res.status(400).json({message: '400: tipo incorrecto del id'})
        //si todo es válido, proceder a tratar de actualizar la BBDD con los nuevos datos
        const updatedEmpleado = await Empleado.update({id, input: empleado.data})
        //devolver el resultado de la operación
        if(updatedEmpleado === null) return res.status(401).json({message: '401: el recurso no fue actualizado, dni pertenece ya a otra persona.'})
        return res.status(202).json(updatedEmpleado)
    }
}