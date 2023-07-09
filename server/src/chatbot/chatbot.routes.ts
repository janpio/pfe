import { Router } from "express";
import { getQuestions, saveResponse, addQuestion, deleteQuestion } from "./chatbot.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware)
router.get('/', getQuestions)
router.post('/', addQuestion)
router.delete('/:id', deleteQuestion)
router.post('/response', saveResponse)

//router.post('/', addEmployee)

export default router