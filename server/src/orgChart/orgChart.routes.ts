import { Router } from "express";
import { getOrgChart } from "./orgChart.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "..//middlewares/checkRole.middleware";

const router = Router();

router.use(authMiddleware)
router.get('/', checkRole(["ADMIN", "USER"]), getOrgChart)
//router.post('/', addEmployee)

export default router