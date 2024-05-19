import { ConnectionDB } from "../database/connection.mjs";

const connection = await ConnectionDB.instance()

export class Venta{
    ////recuperar todas las ventas
    static async getVentas({polleria_nombre}){
        let response = await connection.query('call sp_recuperarVentas();')
        let ventas = [...response[0][0]]   
        ///filters
        if(polleria_nombre) ventas = ventas.filter(v => v.polleria_nombre && polleria_nombre.toString().toLowerCase() === v.polleria_nombre.toString().toLowerCase());
        //pass to controller
        return ventas
    }

    ///eliminar venta por ID
    static async deleteById({id}){
        await connection.query('call sp_eliminarVentaPorId(?, @eliminado);', [id])
        const result = await connection.query('SELECT @eliminado as eliminado;')
        return result[0][0].eliminado? true : false
    }
    ////crear una venta
    static async create({venta}){
        const {id, fecha_transaccion, metodo_pago} = venta;
        const result = await connection.query('call sp_crearVenta(?, ?, ?);', [id, fecha_transaccion, metodo_pago.toString().toLowerCase()])
        return result[0][1] === undefined? null : result[0][0][0]
    }
}