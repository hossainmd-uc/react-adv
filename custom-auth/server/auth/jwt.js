import jwt from "jsonwebtoken"
import { env } from "../config/env"

export function signAccessToken(user) {
    return jwt.sign({ sub: user.id, username: user.username, email: user.email },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: env.ACCESS_TTL })
}

export function verifyAccessToken(token) {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET)
}

export function signRefreshToken(user) {
    return jwt.sign(
        { sub: user.id },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: env.REFRESH_TTL }
    );
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
}

