import { Request, Response } from 'express';
import { Employee, Supervisor } from '@prisma/client';
import prisma from '../../prisma/client';

export const getActivties = async (req: Request, res: Response) => {
    try {
        const activities = await prisma.activity.findMany()
        res.status(200).json(activities);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const addActivity = async (req: Request, res: Response) => {
    const { type, image } = req.body;

    try {
        const activity = await prisma.activity.create({
            data: {
                type,
                image
            }
        })
        res.status(201).json(activity);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const activity = await prisma.activity.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json(activity);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const sendInvitation = async (req: Request, res: Response) => {
    const { sender, recipient, activity, date } = req.body;

    try {
        let user: Employee | Supervisor | null = null;

        const employee = await prisma.employee.findFirst({
            where: {
                name: sender,
            }
        })
        if (employee) {
            user = employee
        } else {
            user = await prisma.supervisor.findFirst({
                where: {
                    name: sender,
                }
            })
        }
        console.log(user)
        const activityChosen = await prisma.activity.findFirst({
            where: {
                type: activity
            }
        })
        const teammateToInvite = await prisma.employee.findFirst({
            where: {
                name: recipient
            }
        })

        const invitation = await prisma.activityInvitation.create({
            data: {
                senderId: user?.id,
                recipientId: teammateToInvite?.id,
                activityId: activityChosen?.id,
                date
            }
        })
        res.status(200).json(invitation);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const getAllInvitations = async (req: Request, res: Response) => {
    try {

        const allInvitations = await prisma.activityInvitation.findMany({
            orderBy: { createdAt: 'desc' },
            include:
                { sender: true, recipient: true, activity: true }
        })

        res.status(200).json(allInvitations);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const getInvitationsReceived = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {

        const invitationsReceived = await prisma.employee.findUnique({
            where: {
                id: Number(employeeId)
            },
            select: {
                ActivityInvitationReceived: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true, activity: true, hasRead: true, sender: { select: { name: true, image: true } }, status: true, date: true
                    }
                }
            }
        })
        const invitations = invitationsReceived?.ActivityInvitationReceived
        res.status(200).json(invitations);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const getInvitationsSent = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    try {
        const invitationsSent = await prisma.employee.findUnique({
            where: {
                id: Number(employeeId)
            },
            select: {
                ActivityInvitationSent: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true, activity: true, recipient: { select: { name: true, image: true } }, status: true, date: true
                    }
                }
            }
        })
        const invitations = invitationsSent?.ActivityInvitationSent
        res.status(200).json(invitations);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const changeInvitationStatus = async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const { status } = req.body;
    try {
        const updatedInvitation = await prisma.activityInvitation.update({
            where: {
                id: Number(invitationId),
            },
            data: {
                status
            },
        })
        res.status(200).json(updatedInvitation);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

export const changeHasRead = async (req: Request, res: Response) => {
    const { invitationId } = req.params;
    const { hasRead } = req.body;

    try {
        const updatedInvitation = await prisma.activityInvitation.update({
            where: {
                id: Number(invitationId),
            },
            data: {
                hasRead: !hasRead
            },
        })
        res.status(200).json(updatedInvitation);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};