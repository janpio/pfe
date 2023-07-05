import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import orgRouter from './orgChart/orgChart.routes'
import authRouter from './auth/auth.routes'
import chatbotRouter from './chatbot/chatbot.routes'
import activityRouter from './activity/activity.routes'

const app = express();
<<<<<<< HEAD:server/server.ts
app.use(cors({
    origin: '*',
    credentials: true,
}));
=======
app.use(cors());

>>>>>>> 525641f5aea0201570ef160808568c906f5e2981:server/src/server.ts
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
app.use('/api/orgchart', orgRouter)
app.use('/api/auth', authRouter)
app.use('/api/chatbot', chatbotRouter)
app.use('/api/activity', activityRouter);



app.listen(3001, () => {
    console.log("server running on port 3001")
})