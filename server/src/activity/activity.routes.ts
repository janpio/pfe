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
    changeHasRead
} from "./activity.controllers";
//import { authMiddleware } from "../auth.middleware";

const router = Router();
//router.use(authMiddleware)
router.get('/', getActivties)
router.post('/', addActivity)
router.delete('/:id', deleteActivity)
router.post('/sendInvitation', sendInvitation)
router.get('/getAllInvitations', getAllInvitations)
router.get('/getInvitationsReceived/:employeeId', getInvitationsReceived)
router.get('/getInvitationsSent/:employeeId', getInvitationsSent)
router.patch('/changeInvitationStatus/:invitationId', changeInvitationStatus)
router.patch('/changeHasRead/:invitationId', changeHasRead)


export default router