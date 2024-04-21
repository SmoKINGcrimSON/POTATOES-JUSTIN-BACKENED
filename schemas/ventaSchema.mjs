import z from 'zod'

const ventaSchema = z.object({
    fecha_transaccion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    metodo_pago: z.string().toLowerCase().regex(/^[a-zA-Z]+$/, {message: 'el método de pago debe ser una cadena de texto puro.'}),
    id_pedido: z.number().int().positive()
})

export function validateVenta(object){
    return ventaSchema.safeParse(object)
}