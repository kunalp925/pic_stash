import { Request, Response, Router } from "express";

export const userRouter = Router();

userRouter.get('/', (req : Request, res : Response) => {
    res.send('User Endpoints');
});

userRouter.post('/signup', (req : Request, res : Response) => {
    res.send('User Endpoints');
});