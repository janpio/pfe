import express from 'express';
import prisma from '../prisma/client'
import cors from 'cors';
import morgan from 'morgan'

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(
    cors()
);/*app.get('/', async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            username: 'hello',
            password: 'test',
        },
    })
})*/

app.get('/users', async (req, res) => {
    const building = await prisma.building.findMany({ select: { id: true, name: true, stages: true } });
    const users = await prisma.employee.findMany({ select: { name: true, supervisor: { select: { id: true, Team: true } } } })



    res.json({ users, building });
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})