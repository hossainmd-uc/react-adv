import { env } from "../config/env";

export const REFRESH_COOKIE = "refresh_token";

export function setRefreshToken(res, refreshToken) {
    res.cookie(REFRESH_COOKIE, refreshToken, {
        httpOnly: true,
        secure: env.COOKIE_SECURE,
        sameSite: "lax",
        path: '/api/auth',
        maxAge: 1000 * 15,

    })
}

export function clearRefreshCookie(res) {
    res.clearCookie(refreshToken, {path: '/api/auth'})
}