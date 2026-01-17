import { verifyAccessToken } from "../auth/jwt.js";

/* Whenever a uses acesses a protected path, this will serve as the verification
   It works by checking if the access token supplied in the header of the json request
   was signed by the secret in the .env file
*/
export function requireAccess(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ error: "Missing access token" });

  try {
    req.user = verifyAccessToken(token); // attach user claims to req
    next();
  } catch {
    return res.status(401).json({ error: "Invalid/expired access token" });
  }
}
