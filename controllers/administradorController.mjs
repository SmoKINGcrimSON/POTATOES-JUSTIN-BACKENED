import { Administrador } from '../models/administrador.mjs'
import { validateAdministrador, validatePartialAdministrador } from '../schemas/administradorSchema.mjs'

export class AdministradorController{

    static async getById(req, res){
        //call repository
        const {id} = req.params;
        const data = await Administrador.get({id: id})
        return data === null?
            res.status(404).json({mess: "404: recurso no encontrado"}) :
            res.status(200).json(data)
    }

    static async exist(req, res){
        //validate info
        const administrador = validateAdministrador(req.body)
        if(administrador.error) return res.status(401).json({mess: JSON.parse(administrador.error.message)})
        //call Repository
        const data = await Administrador.exist({administrador: administrador.data})
        //response JSON
        return data === null? 
            res.status(404).json({mess: "404: el administrador no existe."}) :
            res.status(200).json(data)
    }

    static async update(req, res){
        //recover data
        const administrador = validatePartialAdministrador(req.body)
        const {id} = req.params
        if(administrador.error) return res.status(401).json({mess: JSON.parse(administrador.error.message)})
        //call Repository
        const data = await Administrador.update({id: id, administrador: administrador.data})
        //deleterminar si updateAdministrador es nulo
        return data === null?
            res.status(401).json({mess: "401: recurso no actualizado"}) :
            res.status(201).json(data)
    }
}