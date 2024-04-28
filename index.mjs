import { app } from "./app.mjs"
import { PORT } from "./config.mjs"
// PORT FOR DEV AND DEPLOY(process.env.port)
//const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

//Logging modules: morgan, winston, pino...