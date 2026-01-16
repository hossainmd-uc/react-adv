import { hashPassword } from "../auth/password";
import { verifyPassword } from "../auth/password";
import { signAccessToken } from "../auth/jwt";

import { pool } from "../config/db";

const register = async (req, res, next) => {

    try {

        const { email, password, username } = req.body

        const emailNorm = (email ?? "").trim().toLowerCase();
        const usernameNorm = (username ?? "").trim();

        if (!emailNorm || !usernameNorm || !password) {
            return res.status(400).json({ error: "email, username, and password are required" });
        }

        const passwordHash = await hashPassword(password)

        const registerQuery =
            `INSERT INTO users (email, username, password_hash)  
            values ($1, $2, $3) 
            RETURNING id, email, username`

        const result = await pool.query(registerQuery, [emailNorm, usernameNorm, passwordHash])
        res.status(201).json({ user: result.rows[0] })

    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "Email or username already in use" });
        }

        next(err);
    }

}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const r = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = r.rows[0];
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const ok = await verifyPassword(password, user.password_hash);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        const accessToken = signAccessToken(user);
        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
}


export const account = { register, login }