import { Router } from "express";
import { ChangeProfilePhoto } from "./profil.controllers";
import { checkRole } from "..//middlewares/checkRole.middleware";

const router = Router();

router.patch('/ChangeProfilePhoto/:employeeId', checkRole(["USER"]), ChangeProfilePhoto)


export default router