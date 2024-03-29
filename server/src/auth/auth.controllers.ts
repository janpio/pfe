import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { excludeField } from './utils';
import { Employee } from '@prisma/client';

export const Register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
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
                name: name,
                email: email,
                password: hashedPassword,
                role: "USER"
            },
        });
        const userWithoutPassword = excludeField(newUser, ['password', 'createdAt', 'updatedAt'])

        const token = jwt.sign(userWithoutPassword, process.env.SECRET as jwt.Secret, { expiresIn: '7d' });


        res.status(200).json({ token, user: userWithoutPassword });

    } catch (err: any) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }


};
export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                email
            },
            include: {
                Team: { select: { name: true } },
                supervisor: { select: { Team: { select: { name: true } }, name: true } },
                response: true,
                ActivityInvitationReceived: { include: { sender: true } },
                ActivityInvitationSent: true
            }
        })

        if (!employee || !(await bcrypt.compare(password, employee.password as string))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const userWithoutPassword = excludeField(employee, ['password', 'createdAt', 'updatedAt'])

        const token = jwt.sign(userWithoutPassword, process.env.SECRET as jwt.Secret, { expiresIn: '2d' });

        res.status(200).json({ token, user: userWithoutPassword });

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
