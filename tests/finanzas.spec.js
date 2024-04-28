import request from "supertest"
import { app } from "../app.mjs"

describe('Acceder a informes financieros.', () =>{
    test('Ver registro de ventas.', async () =>{
        const response = await request(app).get('/ventas').send()
        expect(response.statusCode).toBe(200)
    })
    test('Ver registro de pedidos.', async () =>{
        const response = await request(app).get('/pedidos').send()
        expect(response.statusCode).toBe(200)
    })
    test('Ver registro de empleados.', async () => {
        const response = await request(app).get('/empleados').send()
        expect(response.statusCode).toBe(200)
    })
})