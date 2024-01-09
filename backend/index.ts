import express from 'express';
import cors from 'cors'
import { config } from 'dotenv';

import { conn } from './db/conn';
// import User from './models/User';

const port: number = 3001;
const app = express();

app.use(express.json());
app.use(express.static('public'));


// cors
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

// routes
// import UserRoute from './routes/UserRoute';
// import UserController from './controllers/UserController';

// app.use('/', UserRoute);

// server
conn
    //.sync({ force: true })
    .sync()
    .then(() => app.listen(port, console.log(`> server on...`)))
    .catch((err) => console.log(`Sync Error: ${err}`));
