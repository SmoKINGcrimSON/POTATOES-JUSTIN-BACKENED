import express, { json } from "express";
import {empleadoRouter} from './routes/empleadoRoute.mjs'
import {corsMiddleware} from './middlewares/cors.mjs';
import { administradorRouter } from "./routes/administradoresRoute.mjs";
import { polleriaRoute } from "./routes/polleriasRoute.mjs";
import { pedidoRouter } from "./routes/pedidoRoute.mjs";
import { ventaRouter } from "./routes/ventasRoute.mjs";
import cors from 'cors'

// instantiation of the app
export const app = express()
// use of middlewares
app.use(json())
app.use(cors())
// end-points
app.use('/empleados', empleadoRouter)
app.use('/administradores', administradorRouter)
app.use('/pollerias', polleriaRoute)
app.use('/pedidos', pedidoRouter)
app.use('/ventas', ventaRouter)