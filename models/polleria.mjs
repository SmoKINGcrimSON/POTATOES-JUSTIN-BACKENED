import { ConnectionDB } from "../database/connection.mjs"

const connection = await ConnectionDB.instance()
export class Polleria{

    static async getAll(){
        const pollerias = await connection.query('call sp_recuperarPollerias();')
        return pollerias[0][0]
    }
    //recuperar por id
    static async getById({id}){
        const polleria = await connection.query('call sp_recuperarPolleriaPorId(?);', [id])
        return polleria[0][0][0] === undefined? null : polleria[0][0]
    }
    //delete by id
    static async deleteById({id}){ //return boolean
        await connection.query('call sp_eliminarPolleriaPorId(?, @eliminado);', [id]);
        const eliminado = await connection.query('select @eliminado as eliminado;')
        return eliminado[0][0].eliminado == 1? true : false;
    }
    
    //actualizar datos a través del id
    static async updateById({id, polleria}){
        const np = {id, ...polleria}
        await connection.query('call sp_actualizarPolleria(?, ?, ?, ?, ?, @resultado);', [np.id, np.ruc, np.nombre_empresa, np.telefono, np.titular])
        const creado = await connection.query('select @resultado as resultado;')
        console.log(creado)
        return creado[0][0].resultado === 1? np : null
    }

    ///crear pollería
    static async create({polleria}){
        const {ruc, nombre_empresa, telefono, titular} = polleria
        const id = crypto.randomUUID().toString()
        await connection.query('call sp_crearPolleria(?, ?, ?, ?, ?, @resultado);', [id, ruc, nombre_empresa, telefono, titular])
        const creado = await connection.query('select @resultado as resultado;')
        return creado[0][0].resultado === 1? {id, ...polleria} : null
    }
}