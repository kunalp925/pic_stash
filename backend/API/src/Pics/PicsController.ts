import { Request, Response, Router } from "express";

export const picsRouter = Router();

picsRouter.get('/', (req : Request, res : Response) => {
    res.send('Pics Endpoints');
});