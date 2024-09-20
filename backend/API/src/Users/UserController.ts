import { Request, Response, Router } from "express";

import {
    createUser,
    doesUserExist,
    verifyUser
} from "./UserService";

export const userRouter = Router();

userRouter.get('/', (req : Request, res : Response) => {
    res.send('User Endpoints');
});

userRouter.post('/register', async (req : Request, res : Response) => {
    try {

        let username = req.body.username;
        let password = req.body.password;

        if (username == undefined || password == undefined)
        {
            res.status(400).json({message: 'Invalid format for username/password'});
        }

        // check if user exists
        const existingUser = await doesUserExist(username);
        if (existingUser) {
          return res.status(400).json({ error: 'Username already exists' });
        }

        // insert user
        const insertRes = await createUser(username, password);

        if(insertRes)
        {
            res.status(201).json({ message: 'User registered successfully' });
        }
        else
        {
            res.status(500).json({message: 'Unable to register user'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

userRouter.post('/login', async (req : Request, res : Response) => {
    try {

        let username = req.body.username;
        let password = req.body.password;

        if (username == undefined || password == undefined)
        {
            res.status(401).json({ message: 'Invalid User' });
        }

        // check if user exists
        const existingUser = await doesUserExist(username);
        if (!existingUser) {
          return res.status(401).json({ message: 'Invalid User' });
        }

        // verification
        const userVerification = await verifyUser(username, password);
        const isUserVerified = userVerification[0];
        const token = userVerification[1];
        console.log(isUserVerified);

        if(isUserVerified)
        {
            res.status(200).json({ token: token });
        }
        else
        {
            res.status(401).json({message: 'Invalid user'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});