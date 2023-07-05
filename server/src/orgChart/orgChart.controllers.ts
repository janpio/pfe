import { Request, Response } from "express";
import prisma from "../../prisma/client";
import bcrypt from 'bcryptjs';
import { Employee } from "@prisma/client";

export const getOrgChart = async (req: Request, res: Response) => {
    try {
        const building = await prisma.building.findMany({
            select: {
                id: true, name: true, stages: {
                    select: {
                        id: true, name: true, image: true, rooms: {
                            select: {
                                id: true, name: true, image: true,
                                teams: {
                                    select: {
                                        id: true, name: true,
                                        supervisor: {
                                            select: {
                                                id: true, name: true, email: true, role: true, teamId: true, image: true, position: true,
                                                employees: {
                                                    select: { id: true, name: true, email: true, role: true, image: true, position: true, response: true, supervisor: { select: { name: true } } },
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            }
        });
        res.status(200).json(building);

    } catch (error) {
        res.json({ error: error })
    }

};

export const addEmployee = async (req: Request, res: Response) => {
    const { name, email, password, position, image, supervisor } = req.body;
    try {

        const Supervisor = await prisma.supervisor.findFirst({
            where: {
                name: supervisor
            },
        });
        const existingUser = await prisma.employee.findUnique({
            where: {
                email
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser: Employee = await prisma.employee.create({
            data: {
                name,
                email,
                password: hashedPassword,
                position,
                image,
                supervisorId: Number(Supervisor?.id)
            },
        });

        res.status(200).json({ user: newUser });

    } catch (err: any) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }


};