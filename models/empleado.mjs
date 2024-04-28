import { ConnectionDB } from '../database/connection.mjs';

const connection = await ConnectionDB.instance()
export class Empleado{
    //getEmpleados
    static async getEmpleados(){
        let empleados;
        empleados = await connection.query('CALL sp_recuperarEmpleados();');
        return empleados[0][0]
    }

    //getById
    static async getById({id}){
        let empleado = await connection.query('CALL sp_recuperarPorId(?)', [id])
        if(empleado[0][0].length <= 0) return null
        else return empleado[0][0][0]
    }

    //create resource
    static async create({empleado}){
        //desestructurar empleado
        const {
            nombre, 
            fecha_ingreso, 
            dni, 
            telefono, 
            salario, 
            fecha_pago,
            tipo_empleado
        } = empleado

        //try to create resource in BBDD
        await connection.query(
            'call sp_crearEmpleado(?, ?, ?, ?, ?, ?, ?, @empleado_creado);',
            [nombre, fecha_ingreso, dni, telefono, salario, fecha_pago, tipo_empleado]
        )
        //recovers output value of the store procedure: @empleado_creado
        const empleadoCreado = await connection.query('SELECT @empleado_creado AS empleado_creado')
        //verificar si el empleado no fue creado correctamente
        if(empleadoCreado[0][0].empleado_creado === 0){
            return null;
        }
        //employee created!
        const newEmpleado = await connection.query('call sp_recuperarUltimoEmpleado();')
        //return newEmpleado to EmpleadoController
        return newEmpleado[0][0][0];
    }

    //delete resource
    static async delete({id}){
        //intentar eliminar el 'id' en base de datos
        await connection.query(
            'call sp_eliminarEmpleado(?, @empleado_eliminado);', [id]
        )
        //recovers output value of the store procedure: @empleado_eliminado
        const empleadoEliminado = await connection.query('SELECT @empleado_eliminado AS empleado_eliminado');
        //verificar si el empleado fue eliminado
        if(empleadoEliminado[0][0].empleado_eliminado === 0){
            return false
        }
        //si el empleado fue correctamente eliminado entonces enviar un true
        return true
    }

    //update resource
    static async update({id, input}){
        //recuperar empleado mediante el ID
        const recuperarEmpleado = await this.getById({id})
        if(recuperarEmpleado === null){
            return false
        }

        console.log(recuperarEmpleado)
        /// desestructurar campos recuperados y renombrar para coincidencia con input
        const {nombre, fecha_ingreso, dni, telefono, sueldo: salario, 
        fecha_pago, tipo_empleado} = recuperarEmpleado;

        // construir un empleado actualizado a partir del 'recuperarEmpleado' e 'input'
        const ae = {
            id,
            nombre, fecha_ingreso, dni, telefono, salario, fecha_pago, tipo_empleado,
            ...input
        }
        //console.log(ae.id, ae.nombre, ae.fecha_ingreso, ae.dni, ae.telefono, ae.salario, ae.fecha_pago, ae.tipo_empleado)
        //intentar actualizar en BBDD para persistencia de datos
        await connection.query(
            'call sp_actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, @actualizado);', [ae.id, ae.nombre, ae.fecha_ingreso, ae.dni, ae.telefono, ae.salario, ae.fecha_pago, ae.tipo_empleado]
        )
        //comprobar si se pudo actualizar
        const actualizado = await connection.query('SELECT @actualizado AS empleado_actualizado');
        if(actualizado[0][0].empleado_actualizado === 0){
            return false
        }
        //retornar valor actualizado
        return ae
    }
}