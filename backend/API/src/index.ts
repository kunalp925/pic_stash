// index.ts - entrypoint
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { authRouter } from "./Auth/AuthController";
import { userRouter } from "./Users/UserController";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req : Request, res : Response) => {
  res.send('PicStash Server');
});

app.use('/auth', authRouter);
app.use('/user', userRouter);

/**
 * If you would like to enable cors and specify the origins
 * Since I am building locally, I've commented it out
 */
// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 
// }
// app.use(cors(corsOptions))

app.listen(port, () =>
{
  console.log(`[server]: Server is running at http://localhost:${port}`);
});