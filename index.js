const port = 3001

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// db
const conn = require('./db/conn');

const Order = require('./models/Order');
const Customer = require('./models/Customer');
const Product = require('./models/Product');

// cors
app.use(cors({ credentials: true }));

// routes
const CustomerRoute = require('./routes/CustomerRoute');
const CustomerController = require('./controllers/CustomerController');
const KitchenRoute = require('./routes/KitchenRoute');
const KitchenController = require('./controllers/KitchenController');

app.use('/', CustomerRoute);
app.use('/k', KitchenRoute);

// server
conn
    //.sync({ force: true })
    .sync()
    .then(() => app.listen(port, console.log(`> Server on: http://localhost:${port}`)))
    .catch((err) => console.log(`Sync Error: ${err}`));