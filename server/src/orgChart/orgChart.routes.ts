import { Router } from "express";
import { getOrgChart } from "./orgChart.controllers";
import { authMiddleware } from "../auth.middleware";
const router = Router();

router.use(authMiddleware)
router.get('/', getOrgChart)

export default router