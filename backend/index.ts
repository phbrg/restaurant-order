import dotenv from 'dotenv';
dotenv.config();

const port: number = 3001

import * as express from 'express';
import * as cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// db
const conn = require('./db/conn');

const User = require('./models/User');
const Invite = require('./models/Invite');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Up = require('./models/Up');

// cors
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

// routes
const UserRoute = require('./routes/UserRoute');
const UserController = require('./controllers/UserController');

const AdminRoute = require('./routes/AdminRoute');
const AdminController = require('./controllers/AdminController');

app.use('/admin', AdminRoute);
app.use('/', UserRoute);

// server
conn
    //.sync({ force: true })
    .sync()
    .then(() => app.listen(port, console.log(`> server on...`)))
    .catch((err) => console.log(`Sync Error: ${err}`));
