import z from 'zod'

const polleriaSchema = z.object({
    ruc: z.string().length(11).regex(/^\d+$/),
    nombre_empresa: z.string(),
    telefono: z.string().length(9).regex(/^\d+$/),
    titular: z.string()
})

export function validatePolleria(object){
    return polleriaSchema.safeParse(object)
}

export function validatePartialPolleria(object){
    return polleriaSchema.partial().safeParse(object)
}