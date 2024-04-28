import { ConnectionDB } from "../database/connection.mjs"

const connection = await ConnectionDB.instance()

export class Administrador{
    //existAdministrador
    static async existAdministrador({administrador}){
        //desestructuración de administrador
        const {email, password} = administrador
        //query para comprobar si usuario existe
        await connection.query('call sp_existeAdministrador(?, ?, @existe_administrador);', [email, password])
        //query seleccionar lo que retorna @existe_administrador
        const existe = await connection.query('select @existe_administrador as existe_administrador')
        //no existe el recurso
        if(existe[0][0].existe_administrador === 0){
            return false
        }
        else return true
    }
    //update
    static async update({id, administrador}){
        ///recuperar el administrador (call to BBDD):
        const resultado = await connection.query('call sp_recuperarAdministrador(?);', [id])
        ///verificar si se recuperaron los datos
        if(resultado[0][0] === undefined) return null
        ///crear un nuevo administrador:
        const ne = {
            ...resultado[0][0][0],
            ...administrador
        }
        ///actualizar datos con 'newAdministrador' AQUÍ ME QUEDÉ
        const creado = await connection.query('call sp_actualizarAdministrador(?, ?, ?);', [ne.id, ne.email, ne.password])
        ///recuperar los datos actualizados del administrador
        const newAdministrador = creado[0][0][0]
        ///devolver el administrador
        return newAdministrador
    }
}