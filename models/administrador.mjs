import { ConnectionDB } from "../database/connection.mjs"

const connection = await ConnectionDB.instance()

export class Administrador{

    static async get({id}){
        const data = await connection.query('call sp_recuperarAdministrador(?);', [id])
        return data[0][0][0] === undefined? null : data[0][0][0] 
    }

    static async exist({administrador}){
        //call DB
        const {email, password} = administrador
        const response = await connection.query('call sp_existeAdministrador(?, ?);', [email, password])
        //return controller
        return response[1] === undefined? null : response[0][0][0] 
    }

    static async update({id, administrador}){
        //call DB
        const resultado = await connection.query('call sp_recuperarAdministrador(?);', [id])
        if(resultado[0][0][0] === undefined) return null
        ///nueva data
        const data = {
            ...resultado[0][0][0],
            ...administrador
        }
        ///call DB again
        const dataUpdate = await connection.query('call sp_actualizarAdministrador(?, ?, ?);', [data.id, data.email, data.password])
        ///return
        return dataUpdate[0][0][0] === undefined? null : dataUpdate[0][0][0]
    }
}