import cors from 'cors'

//COORS: it's complicated depending on the method.
//easy methods to resolve COOORS: get, head, post
//complex methods to resolve COORS: put, patch, delete 

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://localhost:3000',
    'http://localhost:5500'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors
({
    origin: (origin, callback) => {
        if(ACCEPTED_ORIGINS.includes(origin)) return callback(null, true)
        if(!origin) return callback(null, true)
        return callback(new Error('Not allowed by CORS'))
    }
}
)