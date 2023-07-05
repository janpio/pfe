import { Router } from "express";
import { getOrgChart, addEmployee } from "./orgChart.controllers";
import { authMiddleware } from "../auth.middleware";
const router = Router();

router.use(authMiddleware)
router.get('/', getOrgChart)
router.post('/', addEmployee)

export default router