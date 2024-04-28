import mysql from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config.mjs'

export class ConnectionDB{
    static connectionInstance = null
    //connection configuration
    static config = {
        host: DB_HOST,
        user: DB_USER,
        port: DB_PORT,
        password: DB_PASSWORD,
        database: DB_NAME
    }

    static async instance(){
        if(ConnectionDB.connectionInstance === null){
            ConnectionDB.connectionInstance = await mysql.createConnection(ConnectionDB.config)
        }
        return ConnectionDB.connectionInstance
    }
}