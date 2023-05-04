import express from 'express';
import prisma from '../prisma/client'
import cors from 'cors';
import morgan from 'morgan'

const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

app.get('/users', async (req, res) => {
    const building = await prisma.building.findMany({
        select: {
            id: true,
            name: true,
            stages: {
                select: {
                    id: true,
                    name: true,
                    rooms: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            teams: {
                                select: {
                                    id: true,
                                    name: true,
                                    supervisor: {
                                        select: {
                                            id: true,
                                            name: true,
                                            role: true,
                                            teamId: true,
                                            image: true,
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


    res.json(building);
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})