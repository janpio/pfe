import { Router } from "express";
import { Register, Login } from "./auth.controllers";
import { authMiddleware } from "../auth.middleware";
const router = Router();

//router.use(authMiddleware)
router.post('/register', Register)
router.post('/login', Login)

export default router