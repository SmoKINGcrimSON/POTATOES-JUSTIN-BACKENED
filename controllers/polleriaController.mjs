import { Polleria } from "../models/polleria.mjs";
import { validatePartialPolleria, validatePolleria } from "../schemas/polleriaSchema.mjs";

export class PolleriaController{
    
    static async getAll(req, res){
        const pollerias = await Polleria.getAll()
        return res.status(200).json(pollerias);
    }

    //recuperar pollería por ID
    static async getById(req, res){
        //call Repository
        const {id} = req.params;
        const polleria = await Polleria.getById({id: id})
        //return JSON
        return polleria === null? 
            res.status(404).json({mess: 'Recurso no encontrado'}):
            res.status(200).json(polleria)
    }
    ///eliminar pollería por ID
    static async deleteById(req, res){
        const {id} = req.params;
        const eliminado = await Polleria.deleteById({id: id})
        return eliminado? 
            res.status(200).json({mess: 'recurso eliminado.'}) : 
            res.status(401).json({mess: '401: no pudo eliminarse el recurso'})
    }

    static async updateById(req, res){
        const {id} = req.params
        const result = validatePartialPolleria(req.body)
        if(result.error) return res.status(401).json({err: JSON.parse(result.error.message)})  
        const updatePolleria = await Polleria.updateById({id: id, polleria: result.data})      
        return updatePolleria === null?
            res.status(422).json({err: 'recurso no actualizado'}) : 
            res.status(201).json(updatePolleria)
    }

    ///crear una pollería
    static async create(req, res){
        const result = validatePolleria(req.body)
        if(result.error) return res.status(401).json({err: JSON.parse(result.error.message)})
        const polleria = await Polleria.create({polleria: result.data})
        return polleria === null? 
            res.status(400).json({err: 'recurso no creado'}) :
            res.status(201).json(polleria)
    }
}