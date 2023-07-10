import { Router } from "express";
import { getQuestions, saveResponse, addQuestion, deleteQuestion } from "./chatbot.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "..//middlewares/checkRole.middleware";

const router = Router();

router.use(authMiddleware)
router.get('/', checkRole(["ADMIN", "USER"]), getQuestions)
router.post('/', checkRole(["ADMIN"]), addQuestion)
router.delete('/:id', checkRole(["ADMIN"]), deleteQuestion)
router.post('/response', checkRole(["USER"]), saveResponse)

//router.post('/', addEmployee)

export default router