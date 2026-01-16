import express from 'express'
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({error: "Internal server error"})
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`✅ Server started Successfully on port ${PORT}`))
