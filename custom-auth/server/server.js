import express from 'express'
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';

import cors from 'cors'
import { corsOptions } from './config/cors.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet'

const app = express();
app.use(express.json());      // Parses incoming JSON request bodies and puts the result on req.body
app.use(cookieParser());      // Parses the "Cookie" header and populates req.cookies (and req.signedCookies if you use a secret)
app.use(helmet());            // Sets various security-related HTTP response headers (helps protect against common web attacks)
app.use(cors(corsOptions));   // Controls Cross-Origin Resource Sharing; allows/blocks requests from other origins based on corsOptions



app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({error: "Internal server error"})
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`✅ Server started Successfully on port ${PORT}`))


