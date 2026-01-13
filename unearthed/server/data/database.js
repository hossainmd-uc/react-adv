import './dotenv.js'
import pg from 'pg'

const config = {
    user: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD ,   
    host: process.env.PGHOSTNAME,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
}

export const pool = new pg.Pool(config)