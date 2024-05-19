import { Venta } from "../models/venta.mjs";
import { validateVenta } from "../schemas/ventaSchema.mjs";


export class VentaController{
    static async getVentas(req, res){
        const {polleria_nombre} = req.query
        const ventas = await Venta.getVentas({polleria_nombre: polleria_nombre})
        return ventas === null? 
            res.status(404).json({mess: '404: no se encontraron recursos'}) :
            res.status(200).json(ventas)
    }
    ///deleteById
    static async deleteById(req, res){
        ///recuperar id
        const {id} = req.params
        ////llamar al repositorio
        const eliminado = await Venta.deleteById({id: id})
        return !eliminado?
            res.status(401).json({mess: '401: recurso no eliminado'}) :
            res.status(200).json({mess: '200: recurso eliminado'})
    }
    ///crear una venta
    static async create(req, res){
        const result = validateVenta(req.body)
        if(result.error) return res.status(401).json({mess: JSON.parse(result.error.message)})
        const creado = await Venta.create({venta: result.data})
        return creado === null?
            res.status(401).json({mess: '401: recurso no creado'}) :
            res.status(200).json(creado)
    }
}