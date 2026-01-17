
import { Router } from "express";
import { account } from "../controllers/account";


export const authRouter = Router();

authRouter.post('/register', account.register)
authRouter.post('/login', account.login)
authRouter.post('/refresh', account.refresh)