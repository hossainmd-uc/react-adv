
import { Router } from "express";
import { hashPassword } from "../auth/register";
import { pool } from "../config/db";

const authRouter = Router();

authRouter.post('/register', async (req, res, next) => {

    const { email, password, username } = req.body

    try {
        const passwordHash = hashPassword(password)

        const registerQuery =
            `INSERT INTO users (email, username, password_hash)  
            values ($1, $2, $3) 
            RETURNING id, email, username`

        const result = await pool.query(registerQuery, [email, username, passwordHash])
        res.status(201).json({ user: result.rows[0]})

    } catch (err) {
        next(err);
    }

})

export default authRouter;