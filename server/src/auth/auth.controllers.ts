import { Request, Response } from 'express';
import prisma from '../../prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { excludeField } from './utils';

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
        const newUser = await prisma.employee.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
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
        const user = await prisma.employee.findUnique({
            where: {
                email
            },
        });


        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign(user, 'splash_secret', { expiresIn: '2d' });

        const userWithoutPassword = excludeField(user, ['password'] as never)

        res.status(200).json({ token, user: userWithoutPassword });

    } catch (err: any) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
