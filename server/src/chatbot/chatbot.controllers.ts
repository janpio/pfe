import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await prisma.question.findMany({ include: { response: { include: { Question: true, Employee: true } } } })
        res.status(200).json(questions);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
export const saveResponse = async (req: Request, res: Response) => {
    const { questionId, response, employeeId } = req.body;
    try {
        const userResponse = await prisma.response.create({
            data: {
                response,
                questionId,
                employeeId
            }
        })
        res.status(200).json(userResponse);

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
