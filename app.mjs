import express, { json } from "express";
import {empleadoRouter} from './routes/empleadoRoute.mjs'
import {corsMiddleware} from './middlewares/cors.mjs';

// instantiation of the app
const app = express()
// use of middlewares
app.use(json())
app.use(corsMiddleware())
// end-points
app.use('/empleados', empleadoRouter)

// PORT FOR DEV AND DEPLOY(process.env.port)
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})