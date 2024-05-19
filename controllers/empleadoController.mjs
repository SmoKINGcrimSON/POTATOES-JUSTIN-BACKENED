import { Empleado } from "../models/empleado.mjs"
import {validateEmpleado, validatePartialEmpleado} from "../schemas/empleadoSchema.mjs"

export class EmpleadoController{
    //obtener empleados
    static async getEmpleados(req, res){
        ///recover query
        const {nombre} = req.query
        ///call Repository
        const empleados = await Empleado.getEmpleados({nombre: nombre}) //call repository
        ///return JSON
        res.status(200).json(empleados)
    }

    //obtener empleado a través del ID
    static async getById(req, res){
        ///recover params
        const {id} = req.params;
        ///call Repository
        const empleado = await Empleado.getById({id})
        ///return JSON
        return empleado? 
            res.status(200).json(empleado) : 
            res.status(404).json({message: '404: recurso no encontrado'})
    }

    //crear un nuevo empleado
    static async create(req, res){
        //validate body
        const empleado = validateEmpleado(req.body)
        //send error if the req.body doesn't match the schema
        if(empleado.error) return res.status(422).json({error: JSON.parse(empleado.error.message)})
        //call Repository
        const newEmpleado = await Empleado.create({empleado: empleado.data})
        //if the resource could not be created, send 422 status code.
        return newEmpleado === null?
            res.status(422).json({error: "422: recuros no pudo ser creado."}) :
            res.status(201).json(newEmpleado)
    }

    //delete nuevo empleado
    static async delete(req, res){
        //get id
        const { id } = req.params
        //call Repository
        const eliminado = await Empleado.delete({id})
        //return JSON
        return eliminado? 
            res.status(200).json({message: '200: empleado eliminado'}) :
            res.status(400).json({message: '400: id no existe'})
    }

    //patch empleado
    static async update(req, res){
        //validate
        const empleado = validatePartialEmpleado(req.body)
        //check error
        if(empleado.error) return res.status(422).json({error: JSON.parse(empleado.error.message)})
        //get id
        const {id} = req.params
        //call Repository
        const updatedEmpleado = await Empleado.update({uuid: id, input: empleado.data})
        //return JSON
        return updatedEmpleado === null? 
            res.status(422).json({message: '422: el recurso no fue actualizado'}) :
            res.status(200).json(updatedEmpleado)
    }
}