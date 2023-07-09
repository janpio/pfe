import { Router } from "express";
import { ChangeProfilePhoto } from "./profil.controllers";

const router = Router();

router.patch('/ChangeProfilePhoto/:employeeId', ChangeProfilePhoto)


export default router