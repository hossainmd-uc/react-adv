import '../data/dotenv.js'
import { pool } from '../data/database.js'

import giftData from '../data/gifts.js'

async function reset(params) {
    const query = `CREATE TABLE IF NOT EXISTS gifts (

        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price_point VARCHAR(5) NOT NULL,
        audience VARCHAR(50) NOT NULL,
        image VARCHAR(255),
        description text NOT NULL,
        submittedBy VARCHAR(20) NOT NULL,
        submittedOn TIMESTAMP DEFAULT NOW()
    )`

    await pool.query(query)
    console.log("✅ gifts table ensured")
}

reset()
    .catch((error) => console.log("Unable to reset", error))
    .finally(() => pool.end())