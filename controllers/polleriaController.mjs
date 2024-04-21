import { Polleria } from "../models/polleria.mjs";
import { validatePartialPolleria, validatePolleria } from "../schemas/polleriaSchema.mjs";

export class PolleriaController{
    
    ///recuperar información de todas las pollerías
    static async getAll(req, res){
        //recuperar toas las pollerías del repositorio
        const pollerias = await Polleria.getAll()
        res.status(200).json(pollerias)
    }

    //recuperar pollería por ID
    static async getById(req, res){
        ///recuperar id de los parametros de la petición HTTP
        const {id} = req.params;
        ///comprobar si se trata de un número
        if(isNaN(id)) return res.status(400).json({mess: 'invalid ID'})
        ///llamar al repositorio para conseguir pollería.
        const polleria = await Polleria.getById({id: id})
        if(polleria === null) return res.status(404).json({mess: 'El recurso con el id proporcionado no existe en el repositorio'})
        res.status(200).json(polleria)
    }
    ///eliminar pollería por ID
    static async deleteById(req, res){
        ///recuperar id de los parametros de la petición HTTP
        const {id} = req.params;
        ///comprobar si se trata de un número
        if(isNaN(id)) return res.status(400).json({mess: 'invalid ID'})
        ///pasar id al repositorio para eliminar curso
        const eliminado = await Polleria.deleteById({id: id})
        return eliminado? res.status(200).json({mess: 'el recurso fue removido del repositorio.'}) : res.status(404).json({mess: 'el recurso no pudo ser eliminado porque no existe.'})
    }

    static async updateById(req, res){
        const {id} = req.params
        ///comprobamos de id sea un número
        if(isNaN(id)) return res.status(400).json({mess: 'invalid ID'})
        ////validar req.body con modelo (schema)
        const result = validatePartialPolleria(req.body)
        if(result.error) return res.status(401).json({err: JSON.parse(result.error.message)})  
        ///llamar al repositorio para actualizar los datos
        const updatePolleria = await Polleria.updateById({id: id, polleria: result.data})      
        if(!updatePolleria) return res.status(422).json({err: 'el recurso no pudo ser actualizado'})
        res.status(201).json(updatePolleria)
    }

    ///crear una pollería
    static async create(req, res){
        ///validar información de la pollería
        const result = validatePolleria(req.body)
        if(result.error) return res.status(401).json({err: JSON.parse(result.error.message)})
        ///tratar de crear el recurso en el repositorio
        const polleria = await Polleria.create({polleria: result.data})
        if(polleria === null) return res.status(401).json({err: 'no pudo crearse recurso en la base de datos!'})
        res.status(200).json(polleria)
    }
}