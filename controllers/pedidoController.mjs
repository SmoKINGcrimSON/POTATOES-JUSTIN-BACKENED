import { Pedido } from "../models/pedido.mjs";
import { validatePartialPedido, validatePedido } from "../schemas/pedidoSchema.mjs";


export class PedidoController{
    //crear pedido
    static async create(req, res){
        const result = validatePedido(req.body)
        if(result.error) return res.status(401).json({mess: JSON.parse(result.error.message)})
        const creado = await Pedido.create({pedido: result.data})
        return creado === null? 
            res.status(401).json({mess: '401: recurso no creado'}) :
            res.status(201).json(creado)
    }
    ////manage getAll pedidos
    static async getAll(req, res){
        //call Repository
        const {polleria_nombre} = req.query
        const pedidos = await Pedido.getAll({polleria_nombre: polleria_nombre})
        //return JSON
        return res.status(200).json(pedidos)
    }
    ///eliminar Pedido por Id
    static async deleteById(req, res){
        ///call Repository
        const {id} = req.params
        const result = await Pedido.deleteById({id: id})
        return !result? 
            res.status(401).json({mess: '401: recurso no eliminado'}) :
            res.status(200).json({mess: '201: recurso eliminado'})
    }
    ///actualizar pedido
    static async update(req, res){
        const {id} = req.params
        const result = validatePartialPedido(req.body)
        if(result.error) return res.status(401).json({mess: JSON.parse(result.error.message)})
        const actualizado = await Pedido.update({id: id, pedido: result.data})
        return actualizado === null? 
            res.status(401).json({mess: '401: recurso no actualizado'}) :
            res.status(200).json(actualizado)
    }
}