import dotenv from 'dotenv';
dotenv.config();

const port: number = 3001

import * as express from 'express';
import * as cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// db
import conn from './db/conn';

// import User from './models/User';

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
