import { Request, Response, Router } from "express";

import { User } from "../Models/UserModel";
import { generateSQLDateTime } from "../Clients/sql-client";
import { insertUser } from "./UserService";
import { hashPassword } from "./UserHelpers";

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

        // const existingUser = await user.findOne({ email: req.body.email });
        // if (existingUser) {
        //   return res.status(400).json({ error: 'Email already exists' });
        // }

 
        // Hashing user's salt and password with 1000 iterations
        let hashedPassword = hashPassword(req.body.password)

        // Create a new user
        const user = new User(
            undefined,
            req.body.username,
            hashedPassword,
            generateSQLDateTime()
        );
        
        let insertRes = await insertUser(user);
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
