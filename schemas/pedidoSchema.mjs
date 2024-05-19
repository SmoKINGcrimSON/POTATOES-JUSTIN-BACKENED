import z from 'zod'

const pedidoSchema = z.object({
    id_administrador: z.string(),
    id_polleria: z.string(),
    cantidad_kg: z.number().positive(),
    precio_kg: z.number().positive(),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export function validatePedido(object){
    return pedidoSchema.safeParse(object)
}

export function validatePartialPedido(object){
    return pedidoSchema.partial().safeParse(object)
}