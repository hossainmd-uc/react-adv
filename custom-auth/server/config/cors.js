import { env } from "./env.js";

export const corsOptions = {
  origin: env.FRONTEND_ORIGIN,
  credentials: true, // needed so browser will send cookies
};
