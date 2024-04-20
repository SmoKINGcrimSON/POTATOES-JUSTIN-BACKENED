import z from 'zod'

//evaluates if req.body info is correct.
const empleadoSchema = z.object({
    nombre: z.string(),
    fecha_ingreso: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dni: z.string().length(8).regex(/^\d+$/),
    telefono: z.string().regex(/^\d+$/),
    salario: z.number().positive().max(5000),
    fecha_pago: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    tipo_empleado: z.string().toLowerCase().regex(/^(trabajador a destajo|trabajador asalariado)$/i)
})

//function to validate req.body
export function validateEmpleado(object){
    return empleadoSchema.safeParse(object)
}

export function validatePartialEmpleado(object){
    return empleadoSchema.partial().safeParse(object)
}