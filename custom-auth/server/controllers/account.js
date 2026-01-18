import { hashPassword } from "../auth/password.js";
import { verifyPassword } from "../auth/password.js";
import { signAccessToken, verifyRefreshToken } from "../auth/jwt.js";

import { signRefreshToken } from "../auth/jwt.js";
import { REFRESH_COOKIE, setRefreshCookie } from "../auth/cookies.js";

import { pool } from "../config/db.js";

/*
Creates user by processing username and hashed password. Handles case 
where email and username in use
*/
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

/*
Allows the user to  log in and sets access and refresh token, saves 
refresh to httpOnly cookie
*/
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const r = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = r.rows[0];
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const ok = await verifyPassword(password, user.password_hash);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        // Access token is generated after db authentication
        const accessToken = signAccessToken(user);
        // Refresh token is generated and saved to HttpOnly cookie
        const refreshToken = signRefreshToken(user);
        setRefreshCookie(refreshToken);

        res.json({ accessToken });
    } catch (err) {
        next(err);
    }
}

/*
Continously resigns the access token after verification of refresh token
*/
async function refresh(req, res, next) {

    try {
        const refreshToken = req.cookies?.[REFRESH_COOKIE];
        if (!refreshToken) return res.status(401).json({ error: "No refresh token found." });

        const payload = verifyRefreshToken(refreshToken);

        const query = `SELECT id, email, username FROM users WHERE id=$1`;
        const result = pool.query(query, [payload.sub]);

        if (!result.rows[0]) return res.status(401).json({ error: "User not found" })

        const accessToken = signAccessToken(user)
        return res.json({ accessToken })

    } catch (error) {
        return res.status(401).json({ error: "Invalid/expired refresh token" });
    }


}

export const account = { register, login, refresh };