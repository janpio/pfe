import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const ChangeProfilePhoto = async (req: Request, res: Response) => {
    const id = req.params.employeeId;
    const { image } = req.body;

    const user = req.user;

    if (user.id != Number(id)) {
        return res.status(401).json({ error: "Unauthorized !" })
    }

    try {

        const updatedEmployee = await prisma.employee.update({
            where: {
                id: Number(id),
            },
            data: {
                image
            },
        })

        res.status(200).json(updatedEmployee);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};