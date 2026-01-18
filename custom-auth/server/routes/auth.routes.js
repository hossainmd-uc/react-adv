
import { Router } from "express";
import { account } from "../controllers/account.js";
import { csrfProtection } from "../auth/csrf.js";

export const authRouter = Router();

// Post
authRouter.post('/register', account.register)
authRouter.post('/login', account.login)
authRouter.post('/refresh', csrfProtection, account.refresh)
authRouter.post("/logout", csrfProtection, (req, res) => {
  clearRefreshCookie(res);
  res.json({ ok: true });
});

// Get
authRouter.get("/csrf-token", csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
