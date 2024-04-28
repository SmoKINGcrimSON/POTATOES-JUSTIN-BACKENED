import request from "supertest"
import { app } from "../app.mjs"

describe('Mantener registro de clientes actualizado.', () =>{
    test('Recuperar clientes.', async () =>{
        const response = await request(app).get('/pollerias').send()
        expect(response.statusCode).toBe(200)
    })
    test('Fallar al intentar CREAR un cliente sin todos sus datos.', async () =>{
        const response = await request(app).post('/pollerias').send({
            "ruc": "88866655511",
            "nombre_empresa": "El rey del Posho",
        })
        expect(response.statusCode).toBe(401)
    })
    test('Poder CREAR un cliente a partir de todos sus DATOS.', async () => {
        const response = await request(app).post('/pollerias').send({
            "ruc": "12345678911",
            "nombre_empresa": "Pollo Chicken",
            "telefono": "986234123",
            "titular": "José Manuel Guevara Cruzado"
        })
        expect(response.statusCode).toBe(200)
    })
    test('el sistema NO DEBE registrar clientes con RUCs repetidos.', async () => {
        const response = await request(app).post('/pollerias').send({
            "ruc": "12345678911",
            "nombre_empresa": "Pollo Chicken",
            "telefono": "986234123",
            "titular": "José Manuel Guevara Cruzado"
        })
        expect(response.statusCode).toBe(401)
    })
})