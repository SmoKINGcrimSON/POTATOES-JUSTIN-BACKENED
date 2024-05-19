import { ConnectionDB } from '../database/connection.mjs';

const connection = await ConnectionDB.instance()
export class Empleado{
    //getEmpleados
    static async getEmpleados({nombre}){
        ///DB connection
        const request = await connection.query('call sp_recuperarEmpleados();')
        let empleados = [...request[0][0]]
        ///filters
        if(nombre) empleados = empleados.filter(e => e.nombre && e.nombre.toString().toLowerCase() === nombre.toLowerCase());
        ///pass to controller
        return empleados
    }

    //getById
    static async getById({id}){
        ///DB connection
        let request = await connection.query('CALL sp_recuperarPorId(?);', [id])
        ///recover data
        const empleado = request[0][0]
        ///return to controller
        return empleado === undefined? null : empleado
    }

    //create resource
    static async create({empleado}){
        //employee data
        const {nombre, fecha_ingreso, dni, telefono, salario, fecha_pago, tipo_empleado} = empleado
        const uuid = crypto.randomUUID().toString()
        //call DB
        const request = await connection.query(
            'call sp_crearEmpleado(?, ?, ?, ?, ?, ?, ?, ?);',
            [uuid, nombre, fecha_ingreso, dni, telefono, salario, fecha_pago, tipo_empleado]
        )
        //return to controller (request[1] mark if was succesfull or not)
        return request[1] === undefined? null : request[0][0][0]
    }

    //delete resource
    static async delete({id}){
        //Call DB
        await connection.query('call sp_eliminarEmpleado(?, @empleado_eliminado);', [id])
        //recovers output
        const eliminado = await connection.query('SELECT @empleado_eliminado AS empleado_eliminado')
        console.log(eliminado[0][0].empleado_eliminado)
        //verificar si el empleado fue eliminado
        return eliminado[0][0].empleado_eliminado === 1? true : false
    }

    //update resource
    static async update({uuid, input}){
        //call DB
        const recuperarEmpleado = await connection.query('CALL sp_recuperarPorId(?);', [uuid])
        const empleado = recuperarEmpleado[0][0][0]
        if(empleado === undefined) return null
        //make empleado
        const {id, nombre, fecha_ingreso, dni, telefono, salario, fecha_pago, tipo_empleado} = empleado

        // construir un empleado actualizado a partir del 'recuperarEmpleado' e 'input'
        const ae = {
            id, nombre, fecha_ingreso, dni, telefono, salario, fecha_pago, tipo_empleado,
            ...input
        }
        //intentar actualizar en BBDD para persistencia de datos
        await connection.query(
            'call sp_actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, @actualizado);', [ae.id, ae.nombre, ae.fecha_ingreso, ae.dni, ae.telefono, ae.salario, ae.fecha_pago, ae.tipo_empleado]
        )
        //comprobar si se pudo actualizar
        const actualizado = await connection.query('SELECT @actualizado AS empleado_actualizado')
        return actualizado[0][0].empleado_actualizado === 0? null : ae
    }
}