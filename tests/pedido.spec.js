import request from "supertest"
import { app } from "../app.mjs"

describe('Registrar pedidos de clientes.', () =>{
    test('Registrar un NUEVO pedido.', async () =>{
        const response = await request(app).post('/pedidos').send({
            "id_administrador": 1,
            "id_polleria": 2,
            "cantidad_kg": 10.5,
            "fecha": "2024-03-11",
            "tipo_papa": "Huamantanga"
        })
        expect(response.statusCode).toBe(201)
    })
    test("poder ACTUALIZAR un pedido.", async () => {
        const response = await request(app).patch('/pedidos/5').send({
            "id_administrador": 1,
            "id_polleria": 1,
            "fecha": "2024-03-30"
        })
        expect(response.statusCode).toBe(200)        
    })
    test("el usuario NO PUEDE registrar un pedido con datos incompletos.", async () => {
        const response = await request(app).post('/pedidos').send({
            "id_administrador": 1,
            "id_polleria": 4,
            "cantidad_kg": 50
        })
        expect(response.statusCode).toBe(401)        
    })
})