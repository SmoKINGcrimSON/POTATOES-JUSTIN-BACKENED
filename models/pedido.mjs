import { ConnectionDB } from "../database/connection.mjs";

const connection = await ConnectionDB.instance()

export class Pedido{
    ///crear pedido
    static async create({pedido}){
        const {id_administrador, id_polleria, cantidad_kg, precio_kg, fecha} = pedido
        const id = crypto.randomUUID().toString()
        const creado = await connection.query('call sp_crearPedido(?, ?, ?, ?, ?, ?);', [id, id_administrador, id_polleria, cantidad_kg, precio_kg, fecha])
        return creado[0][1] === undefined? null : creado[0][0][0]
    }
    ///recuperar todos los pedidos
    static async getAll({polleria_nombre}){
        const pedidos = await connection.query('call sp_recuperarPedidos();')
        return pedidos[0][0]
    }

    ///eliminar pedido por Id
    static async deleteById({id}){
        await connection.query('call sp_eliminarPedidoPorId(?, @eliminado);', [id])
        const eliminado = await connection.query('SELECT @eliminado as eliminado;')
        return eliminado[0][0].eliminado? true : false
    }

    ///actualizar pedido por ID
    static async update({id, pedido}){
        const oldPedido = await connection.query('call sp_recuperarPedidoPorId(?)', [id])
        if(oldPedido[0][0] === undefined) return null
        const np = {id, ...oldPedido[0][0][0], ...pedido}
        await connection.query('call sp_actualizarPedido(?, ?, ?, ?, ?, ?, @actualizado);', [np.id, np.id_administrador, np.id_polleria, np.cantidad_kg, np.precio_kg, np.fecha])
        const actualizado = await connection.query('SELECT @actualizado as actualizado;')
        return actualizado[0][0].actualizado === 1? np : null
    }
}