import z from 'zod'

const administradorSchema = z.object({
    email: z.string().email({message: 'email is not correct typed'}),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:',.<>?/~]).{8,}$/)
})

//functions to export and validate

export function validateAdministrador(object){
    return administradorSchema.safeParse(object) //return object
}

export function validatePartialAdministrador(object){
    return administradorSchema.partial().safeParse(object) //return object
}