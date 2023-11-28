const port = 3001

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// db
const conn = require('./db/conn');

const Cart = require('./models/Cart');
const Customer = require('./models/Customer');
const Kitchen = require('./models/Kitchen');
const Product = require('./models/Product');

// CORS
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));

// routes
const CustomerRoute = require('./routes/CustomerRoute');
const CustomerController = require('./controllers/CustomerController');

app.use('/', CustomerRoute);

// server
conn
    // .sync({ force: true })
    .sync()
    .then(() => app.listen(port, console.log(`> Server on: http://localhost:${port}`)))
    .catch((err) => console.log(`Sync Error: ${err}`));