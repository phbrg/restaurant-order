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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// routes
const CustomerRoute = require('./routes/CustomerRoute');
const CustomerController = require('./controllers/CustomerController');

app.use('/', CustomerRoute);

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page not found' });
});

// server
conn
    // .sync({ force: true })
    .sync()
    .then(() => app.listen(3001, console.log('> Server on: http://localhost:3000')))
    .catch((err) => console.log(`Sync Error: ${err}`));