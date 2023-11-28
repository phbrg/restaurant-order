const Customer = require('../models/Customer');
const Product = require('../models/Product');

const createCustomerToken = require('../helpers/createCustomerToken');

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

    static async menu(req, res) {
        res.status(200).json({ message: await Product.findAll() });
    }
}