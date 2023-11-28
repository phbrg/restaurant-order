const Customer = require('../models/Customer');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createCustomerToken = require('../helpers/createCustomerToken');
const getToken = require('../helpers/getToken');
const getCustomerByToken = require('../helpers/getCustomerByToken');

module.exports = class CustomerController {
    static async register(req, res) {
        const { name, table  } = req.body;

        if(!name || !table) {
            res.status(422).json({ message: 'Invalid credentials' });
            return;
        }

        if(parseFloat(table) < 0 || parseFloat(table) > 20) {
          res.status(422).json({ message: 'Invalid table' });
          return;
        }

        const customer = {
            name,
            table
        }

        Customer.create(customer)
            .then((customer) => {
                createCustomerToken(customer, req, res);
            })
            .catch((err) => console.log(`Customer register error: ${err}`));
    }
}