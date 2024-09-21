import express from "express";

import UserService from "../services/UserService";
import { HttpResponseMessage, StringContent, controller, httpGet, httpMethod, request, response } from "inversify-express-utils";

@controller('/user')
export class UserController
{
    private readonly _userService : UserService;

    constructor(
        userService : UserService
    ){
        this._userService = userService;
    }

    @httpGet('/')
    TestRoute()
    {
        const response = new HttpResponseMessage(200);
        response.content = new StringContent("User Endpoints");
        return response;
    }

    @httpMethod('post', '/register')
    async RegisterUser(
        @request() req : express.Request,
        @response() res: express.Response
    ){
        try {
            let username = req.body.username;
            let password = req.body.password;

            if (username == undefined || password == undefined)
            {
                res.status(400).json({message: 'Invalid format for username/password'});
            }

            // check if user exists
            const existingUser = await this._userService.DoesUserExist(username);
            if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
            }

            // insert user
            const insertRes = await this._userService.CreateUser(username, password);

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
    }

    @httpMethod('post', '/login')
    async LoginUser(
        @request() req : express.Request,
        @response() res : express.Response
    ){
        try {

            let username = req.body.username;
            let password = req.body.password;

            if (username == undefined || password == undefined)
            {
                res.status(401).json({ message: 'Invalid User' });
            }

            // check if user exists
            const existingUser = await this._userService.DoesUserExist(username);
            if (!existingUser) {
            return res.status(401).json({ message: 'Invalid User' });
            }

            // verification
            const userVerification = await this._userService.VerifyUser(username, password);
            const isUserVerified = userVerification[0];
            const token = userVerification[1];

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
    }
}