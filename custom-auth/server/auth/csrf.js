import csurf from "csurf";
import { env } from "../config/env.js";

/**
 * csurf uses a secret stored in a cookie and generates a per-request token.
 * The client must send the token back (usually as a header).
 */
export const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: "lax",
    path: "/api/auth",
  },
});
