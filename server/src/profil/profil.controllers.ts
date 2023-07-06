import { Request, Response } from "express";
import { Employee, Supervisor } from '@prisma/client';
import prisma from "../../prisma/client";

export const ChangeProfilePhoto = async (req: Request, res: Response) => {
    const id = req.params.employeeId;
    const { image } = req.body;

    try {
        let user: Employee | Supervisor | null = null;

        const employee = await prisma.employee.findUnique({
            where: {
                id: Number(id),
            }
        })
        if (employee) {
            user = await prisma.employee.update({
                where: {
                    id: Number(id),
                },
                data: {
                    image
                },
            })
        } else {
            user = await prisma.supervisor.update({
                where: {
                    id: Number(id),
                },
                data: {
                    image
                },
            })
        }

        res.status(200).json(user);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};