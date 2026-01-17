import express from 'express'
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';

import cors from 'cors'
import { corsOptions } from './config/cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(helmet())
app.use(cors(corsOptions))


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({error: "Internal server error"})
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`✅ Server started Successfully on port ${PORT}`))
