import { Router } from "express";
import {
    getActivties,
    sendInvitation,
    getInvitationsReceived,
    getInvitationsSent,
    changeInvitationStatus,
    changeHasRead
} from "./activity.controllers";
//import { authMiddleware } from "../auth.middleware";

const router = Router();
//router.use(authMiddleware)
router.get('/', getActivties)
router.post('/sendInvitation', sendInvitation)
router.get('/getInvitationsReceived/:employeeId', getInvitationsReceived)
router.get('/getInvitationsSent/:employeeId', getInvitationsSent)
router.patch('/changeInvitationStatus/:invitationId', changeInvitationStatus)
router.patch('/changeHasRead/:invitationId', changeHasRead)


export default router