// index.ts - entrypoint

// npm package imports
import cors from 'cors';
import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

// service imports
import SQLClient from './clients/sql-client';
import UserService from './services/UserService';

// Controller imports
import './controllers/UserController';

// container + server setup
const container = new Container(); 

container.bind(UserService).toSelf();
container.bind(SQLClient).toSelf();

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  dotenv.config();
  app.use(express.json());
});

// running server
const app = server.build();
const port = process.env.PORT;

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