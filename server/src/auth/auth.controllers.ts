import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { excludeField } from './utils';
import { Employee, Supervisor } from '@prisma/client';

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
                role: "USER" as const
            },
        });
        const token = jwt.sign(newUser, 'splash_secret', { expiresIn: '7d' });

        const userWithoutPassword = excludeField(newUser, ['password'])

        res.status(200).json({ token, user: userWithoutPassword });

    } catch (err: any) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }


};
export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const supervisor: Supervisor | null = await prisma.supervisor.findUnique({
            where: {
                email
            },
        })

        const employee: Employee | null = await prisma.employee.findUnique({
            where: {
                email
            },
            include: { response: true, ActivityInvitationReceived: { include: { sender: true } }, ActivityInvitationSent: true }
        })
        let user: Employee | Supervisor | null = null;

        if (supervisor) {
            user = supervisor;
        } else if (employee) {
            user = employee;
        }

        if (!user || !(await bcrypt.compare(password, user.password as string))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(user, 'splash_secret', { expiresIn: '2d' });

        const userWithoutPassword = excludeField(user, ['password'] as never)

        res.status(200).json({ token, user: userWithoutPassword });

    } catch (err: any) {

        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
