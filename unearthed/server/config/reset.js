import '../data/dotenv.js'
import { pool } from '../data/database.js'

import giftData from '../data/gifts.js'

async function reset() {
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

async function insertData() {
    const query = `INSERT INTO gifts 
    (name, price_point, audience, image, description, submittedBy, submittedOn) 
    values ($1,$2,$3,$4,$5,$6,$7)`



    for (const data of giftData) {
        const values = [
            data.name,
            data.pricePoint,
            data.audience,
            data.image,
            data.description,
            data.submittedBy,
            data.submittedOn
        ]

        await pool.query(query, values)
    }

    console.log("✅ Value insertion success")
}

async function main() {
    await reset()
    await insertData()
}

main()
    .catch((err) => console.error("❌ reset/seed failed:", err))
    .finally(() => pool.end())