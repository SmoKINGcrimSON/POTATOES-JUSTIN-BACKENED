import { Pedido } from "../models/pedido.mjs";
import { validatePartialPedido, validatePedido } from "../schemas/pedidoSchema.mjs";


export class PedidoController{
    ////manage getAll pedidos
    static async getAll(req, res){
        ///recuperar query (consulta)
        const {polleria_id} = req.query
        ///conectar con el repositorio
        const pedidos = await Pedido.getAll({polleria_id: polleria_id})
        ///devolver status_code 404 de no haber encontrado recursos
        if(pedidos === null) return res.status(404).json({message: '404: no se han devuelto recursos!'})
        //devolver status_code 200 de haber encontrado recursos
        res.status(200).json(pedidos)
    }
    ///eliminar Pedido por Id
    static async deleteById(req, res){
        ///recuperar id
        const {id} = req.params
        if(isNaN(id)) res.status(401).json({mess: '401: no pudo eliminarse el recurso'})
        ///tratar de eliminar el recurso llamando al repositorio
        const result = await Pedido.deleteById({id: id})
        if(!result) res.status(401).json({mess: '401: no pudo eliminarse el recurso'})
        else res.status(200).json({mess: '201: el recurso fue eliminado'})
    }
    ///actualizar pedido
    static async update(req, res){
        ///recuperar id
        const {id} = req.params
        ///validate id
        if(isNaN(id)) return res.status(401).json({mess: '401: no se pudo actualizar el pedido.'})
        ///validar req.body
        const result = validatePartialPedido(req.body)
        if(result.error) return res.status(401).json({mess: JSON.parse(result.error.message)})
        ///tratar de actualizar en repositorio
        const actualizado = await Pedido.update({id: id, pedido: result.data})
        if(actualizado === null) return res.status(401).json({mess: 'el recurso no pudo ser actualizado'})
        res.status(200).json(actualizado)
    }

    //crear pedido
    static async create(req, res){
        const result = validatePedido(req.body)
        if(result.error) return res.status(401).json({mess: JSON.parse(result.error.message)})
        const creado = await Pedido.create({pedido: result.data})
        if(creado === null) return res.status(401).json({mess: '401: recurso no pudo ser creado.'})
        res.status(201).json(creado)
    }
}