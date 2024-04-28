import { ConnectionDB } from "../database/connection.mjs";

const connection = await ConnectionDB.instance()

export class Venta{
    ////recuperar todas las ventas
    static async getVentas({polleria_id}){
        let ventas = [];
        if(!isNaN(polleria_id)){
            ventas = await connection.query('call sp_recuperarVentasPorPolleriaId(?);', [polleria_id])            
        }
        else ventas = await connection.query('call sp_recuperarVentas();')
        return ventas[0][0] === undefined? null : ventas[0][0]
    }

    ///eliminar venta por ID
    static async deleteById({id}){
        //call BBDD to delete resource
        await connection.query('call sp_eliminarVentaPorId(?, @eliminado);', [id])
        ///recover @eliminado
        const result = await connection.query('SELECT @eliminado as eliminado;')
        ///result
        return result[0][0].eliminado? true : false
    }
    ////crear una venta
    static async create({venta}){
        const {fecha_transaccion, metodo_pago, id_pedido} = venta;
        const result = await connection.query('call sp_crearVenta(?, ?, ?);', [fecha_transaccion, metodo_pago, id_pedido])
        return result[0][0] === undefined? null : result[0][0][0]
    }
}