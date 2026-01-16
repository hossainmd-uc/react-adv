import dotenv from 'dotenv'

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT ?? 3000),

  // Connection string: one env var containing host/user/password/port/db
  DATABASE_URL: process.env.DATABASE_URL,

  // Secrets used to sign JWTs (MUST be long random strings in real apps)
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  // Token lifetimes
  ACCESS_TTL: process.env.ACCESS_TTL ?? "15m",
  REFRESH_TTL: process.env.REFRESH_TTL ?? "7d",

  // Frontend origin allowed to call this API
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",

  // Cookie security
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true", // true in production (HTTPS)
};