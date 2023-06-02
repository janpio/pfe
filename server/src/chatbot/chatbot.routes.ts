import { Router } from "express";
import { getQuestions, saveResponse } from "./chatbot.controllers";
import { authMiddleware } from "../auth.middleware";

const router = Router();

//router.use(authMiddleware)
router.get('/', getQuestions)
router.post('/', saveResponse)

//router.post('/', addEmployee)

export default router