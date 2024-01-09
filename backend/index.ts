const port: number = 3001;

import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import { conn } from './db/conn';
// import User from './models/User';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

// import UserRoute from './routes/UserRoute';
// import UserController from './controllers/UserController';

// app.use('/', UserRoute);

// server
conn
    //.sync({ force: true })
    .sync()
    .then(() => app.listen(port, console.log(`> server on...`)))
    .catch((err) => console.log(`> sync error: ${err}`));
