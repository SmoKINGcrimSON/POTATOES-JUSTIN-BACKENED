import { ConnectionDB } from "../database/connection.mjs"

const connection = await ConnectionDB.instance()
export class Polleria{
    //recuperar todas las pollerías
    static async getAll(){
        const pollerias = await connection.query('call sp_recuperarPollerias();')
        return pollerias[0][0]
    }
    //recuperar por id
    static async getById({id}){
        ///tratar de recuperar pollería del repositorio
        const polleria = await connection.query('call sp_recuperarPolleriaPorId(?);', [id])
        return polleria[0][0] === undefined? null : polleria[0][0][0]
    }
    //delete by id
    static async deleteById({id}){ //return boolean
        ///recuperar el resultado
        await connection.query('call sp_eliminarPolleriaPorId(?, @eliminado);', [id]);
        ////recuperar resultado de la base de datos
        const eliminado = await connection.query('select @eliminado as eliminado;')
        ///recuperar el resultado
        return eliminado[0][0].eliminado == 0? false : true;
    }
    
    //actualizar datos a través del id
    static async updateById({id, polleria}){
        ///tratar de actualizar pollería
        const np = {id, ...polleria}
        await connection.query('call sp_actualizarPolleria(?, ?, ?, ?, ?, @resultado);', [np.id, np.ruc, np.nombre_empresa, np.telefono, np.titular])
        ///recuperar dato del resultado
        const creado = await connection.query('select @resultado as resultado;')
        return creado[0][0].resultado === 0? null : np
    }

    ///crear pollería
    static async create({polleria}){
        ///desestructurar datos del objeto pollería
        const {ruc, nombre_empresa, telefono, titular} = polleria
        //persistencia de datos en BBDD
        const result = await connection.query('call sp_crearPolleria(?, ?, ?, ?, @resultado);', [ruc, nombre_empresa, telefono, titular])
        ////hacer return del objeto
        return result[0][0] === undefined? null: result[0][0][0]
    }
}