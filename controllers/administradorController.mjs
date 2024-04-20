import { Administrador } from '../models/administrador.mjs'
import { validateAdministrador, validatePartialAdministrador } from '../schemas/administradorSchema.mjs'

export class AdministradorController{

    //recover information for validation of login
    static async existAdministrador(req, res){
        const administrador = validateAdministrador(req.body)
        if(administrador.error) return res.status(401).json({mess: JSON.parse(administrador.error.message)})
        const exist = await Administrador.existAdministrador({administrador: administrador.data})
        if(!exist) return res.status(404).json({mess: "404: el administrador no existe."})
        return res.status(200).json({mess: "200: el administrador existe."})
    }

    //actualizar Administrador
    static async update(req, res){
        //recuperar id
        const {id} = req.params
        //validad que id es un int
        if(isNaN(id)) return res.status(401).json({mess: "id: id no es un número"})
        //validación del administrador
        const administrador = validatePartialAdministrador(req.body)
        if(administrador.error) return res.status(401).json({mess: JSON.parse(administrador.error.message)})
        //llamar al modelo
        const updateAdministrador = await Administrador.update({id: id, administrador: administrador.data})
        //deleterminar si updateAdministrador es nulo
        if(updateAdministrador === null) return res.status(401).json({mess: "no se pudo actualizar el recurso"})
        ///enviar datos del éxito en la operación
        res.status(201).json(updateAdministrador)
    }
}