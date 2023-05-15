import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const getOrgChart = async (req: Request, res: Response) => {
    try {
        const building = await prisma.building.findMany({
            select: {
                id: true, name: true, stages: {
                    select: {
                        id: true, name: true, rooms: {
                            select: {
                                id: true, name: true, image: true,
                                teams: {
                                    select: {
                                        id: true, name: true,
                                        supervisor: {
                                            select: {
                                                id: true, name: true, role: true, teamId: true, image: true,
                                                employees: { select: { id: true, name: true, role: true, image: true } }
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