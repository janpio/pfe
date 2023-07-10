import { Router } from "express";
import {
    getActivties,
    addActivity,
    deleteActivity,
    sendInvitation,
    getAllInvitations,
    getInvitationsReceived,
    getInvitationsSent,
    changeInvitationStatus,
    changeHasRead,
    deleteInvitation
} from "./activity.controllers";
import { authMiddleware } from "..//middlewares/auth.middleware";
import { checkRole } from "..//middlewares/checkRole.middleware";


const router = Router();
router.use(authMiddleware)
router.get('/', checkRole(["ADMIN", "USER"]), getActivties)
router.post('/', checkRole(["ADMIN"]), addActivity)
router.delete('/:id', checkRole(["ADMIN"]), deleteActivity)
router.post('/sendInvitation', checkRole(["USER"]), sendInvitation)
router.get('/getAllInvitations', checkRole(["ADMIN"]), getAllInvitations)
router.get('/getInvitationsReceived/:employeeId', checkRole(["USER"]), getInvitationsReceived)
router.get('/getInvitationsSent/:employeeId', checkRole(["USER"]), getInvitationsSent)
router.patch('/changeInvitationStatus/:invitationId', checkRole(["USER"]), changeInvitationStatus)
router.patch('/changeHasRead/:invitationId', checkRole(["USER"]), changeHasRead)
router.delete('/deleteInvitation/:invitationId', checkRole(["USER"]), deleteInvitation)


export default router