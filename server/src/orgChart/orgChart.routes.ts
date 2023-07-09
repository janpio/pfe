import { Router } from "express";
import { getOrgChart } from "./orgChart.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

//router.use(authMiddleware)
router.get('/', getOrgChart)
//router.post('/', addEmployee)

export default router