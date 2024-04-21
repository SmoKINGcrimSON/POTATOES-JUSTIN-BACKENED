import mysql from 'mysql2/promise'

//connection configuration
const config = {
    host: 'localhost',
    user: 'adminPotatoes',
    port: 3306,
    password: 'SmOkInGcRiMsOn169?*',
    database: 'potatoesJustin'
}

const connection = await mysql.createConnection(config)

export class Pedido{
    ///recuperar todos los pedidos
    static async getAll({polleria_id}){
        ///instanciar variable que retorna
        let pedidos = [];
        ///comprobar si se pasó el id de una pollería
        if(polleria_id !== undefined && !isNaN(polleria_id)){
            pedidos = await connection.query('call sp_recuperarPedidosPorPolleria_id(?);', [polleria_id])
        }
        ////devolver todas las pollerías
        else pedidos = await connection.query('call sp_recuperarPedidos();')
        ///determinar lo que se retornará
        return pedidos[0][0] === undefined? null : pedidos[0][0]
    }

    ///eliminar pedido por Id
    static async deleteById({id}){
        ///intentar eliminar recurso en base de datos
        await connection.query('call sp_eliminarPedidoPorId(?, @eliminado);', [id])
        ///recuperar resultado de la operación
        const eliminado = await connection.query('SELECT @eliminado as eliminado;')
        ///retornar el resultado de la operación
        return eliminado[0][0].eliminado? true : false
    }

    ///actualizar pedido por ID
    static async update({id, pedido}){
        const oldPedido = await connection.query('call sp_recuperarPedidoPorId(?)', [id])
        if(oldPedido[0][0] === undefined) return null
        const np = {
            id, ...oldPedido[0][0][0], ...pedido
        }
        console.log(np)
        ////aquí me quedé
        await connection.query('call sp_actualizarPedido(?, ?, ?, ?, ?, ?, @actualizado);', [np.id, np.id_administrador, np.cantidad_kg, np.fecha, np.tipo_papa, np.id_polleria])
        ///tomar resultado de la operación
        const actualizado = await connection.query('SELECT @actualizado as actualizado;')
        return actualizado[0][0].actualizado? np : null
    }

    ///crear pedido
    static async create({pedido}){
        const {id_administrador, id_polleria, cantidad_kg, fecha, tipo_papa} = pedido
        const creado = await connection.query('call sp_crearPedido(?, ?, ?, ?, ?, @creado);', [id_administrador, id_polleria, cantidad_kg, fecha, tipo_papa])
        return creado[0][0] === undefined? null : creado[0][0][0]
    }
}