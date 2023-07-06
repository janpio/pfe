import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import orgRouter from './orgChart/orgChart.routes'
import authRouter from './auth/auth.routes'
import chatbotRouter from './chatbot/chatbot.routes'
import activityRouter from './activity/activity.routes'
import profileRouter from './profil/profil.routes'

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(morgan('dev'))
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
    res.send('hello')
})
app.use('/api/orgchart', orgRouter)
app.use('/api/auth', authRouter)
app.use('/api/profil', profileRouter)
app.use('/api/chatbot', chatbotRouter)
app.use('/api/activity', activityRouter);



app.listen(3001, () => {
    console.log("server running on port 3001")
})