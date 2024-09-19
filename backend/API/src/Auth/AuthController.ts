import { Request, Response, Router } from "express";

export const authRouter = Router();

authRouter.get('/', (req : Request, res : Response) => {
    res.send('Auth Endpoints');
});

authRouter.post('/token', (req : Request, res : Response) => {
    let { email, password } = req.body;
    
    res.send('Auth Endpoints');
});