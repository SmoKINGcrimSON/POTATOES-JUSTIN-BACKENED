import { Venta } from "../models/venta.mjs";
import { validateVenta } from "../schemas/ventaSchema.mjs";


export class VentaController{
    ///recuperar ventas
    static async getVentas(req, res){
        const {polleria_id} = req.query
        ///llamar al repositorio
        const ventas = await Venta.getVentas({polleria_id: polleria_id})
        ///comprobar si las ventas existen
        if(ventas === null) return res.status(404).json({mess: '404: no se encontraron recursos'})
        ///200: ok
        res.status(200).json(ventas)
    }
    ///deleteById
    static async deleteById(req, res){
        ///recuperar id
        const {id} = req.params
        ///validar id
        if(isNaN(id)) return res.status(401).json({mess: '401: el recurso no ha podido ser eliminado'})
        ////llamar al repositorio
        const eliminado = await Venta.deleteById({id: id})
        if(!eliminado) return res.status(401).json({mess: '401: el recurso no ha podido ser eliminado'})
        return res.status(200).json({mess: '200: resource was removed'})
    }
    ///crear una venta
    static async create(req, res){
        const result = validateVenta(req.body)
        if(result.error) return res.status(401).json({mess: JSON.parse(result.error.message)})
        const creado = await Venta.create({venta: result.data})
        if(creado === null) return res.status(401).json({mess: '401: el recurso no pudo ser creado'})
        return res.status(200).json(creado)
    }
}