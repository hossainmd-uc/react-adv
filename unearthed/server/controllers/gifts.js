import { pool } from "../data/database.js";

async function getAllGifts(req, res) {

    try {
        const query = 'SELECT * FROM gifts ORDER BY id ASC'

        const result = await pool.query(query)

        console.log('✅Succesfully retrieved all records!')
        console.log(result.rows)

        return res.status(200).json(result.rows)
    } catch (error) {

        console.log("Error retrieving gifts", error)
        return res.status(500).json({ error: error.message })
    }
}

async function getSpecificGift(req, res) {

    const id = Number(req.params.id)

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const query = `SELECT * FROM gifts WHERE id = $1`

        const result = await pool.query(query, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Gift not found" });
        }

        console.log('✅Succesfully retrieved single record!')
        return res.status(200).json(result.rows[0]);
    } catch (error) {

        console.log(`Error retrieving single gift ${id}`, error)
        return res.status(500).json({ error: error.message })
    }
}


export const GiftsController = { getAllGifts, getSpecificGift }

