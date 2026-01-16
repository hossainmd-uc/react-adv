import { Router } from "express";
import { requireAccess } from "../middleware/requireAccess.js";

export const userRouter = Router();

userRouter.get("/me", requireAccess, (req, res) => {
  // req.user came from JWT claims
  res.json({ user: req.user });
});
