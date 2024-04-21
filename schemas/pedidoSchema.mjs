import z from 'zod'

const pedidoSchema = z.object({
    id_administrador: z.number().int().positive(),
    id_polleria: z.number().int().positive(),
    cantidad_kg: z.number().positive(),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    tipo_papa: z.string().regex(/^[a-zA-Z]+$/, {message: 'el tipo_papa no debe incluir espacios en blanco ni caracteres a parte de letras.'})
})

export function validatePedido(object){
    return pedidoSchema.safeParse(object)
}

export function validatePartialPedido(object){
    return pedidoSchema.partial().safeParse(object)
}