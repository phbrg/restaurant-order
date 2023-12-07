const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Kitchen = require('../models/Kitchen');

const createCustomerToken = require('../helpers/createCustomerToken');

module.exports = class CustomerController {
    static async register(req, res) {
        const { name, table  } = req.body;

        if(!name || !table) {
            res.status(422).json({ message: 'Invalid credentials' });
            return;
        }

        if(parseFloat(table) < 0 || parseFloat(table) > 1000) {
          res.status(422).json({ message: 'Invalid table' });
          return;
        }

        const invalidTable = await Customer.findAll({ raw: true, where: { table: parseFloat(table) } });
        try {
            invalidTable.forEach(elm => {
                if(!elm.exitDate) {
                    throw new Error('Table is currently in use');
                }
            })
        } catch(err) {
            res.status(400).json({ message: err.message });
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
        res.status(200).json({ message: await Product.findAll({ raw: true }) });
    }

    static async order(req, res) {
        const order = req.body.order;

        let products = [];
        let price = 0;

        async function processOrders() {
            for (const obj of order) {
              let orderExist = await Product.findOne({ raw: true, where: { id: parseFloat(obj.id) } });

              if(!orderExist) {
                throw new Error('Invalid product');
              }

              if(obj.notes) {
                orderExist['note'] = obj.notes;
              }

              products.push(orderExist);
              price += orderExist.price;
            }
        }

        try {
            await processOrders();
        } catch (err) {
            res.status(404).json({ message: err.message });
            return;
        }

        const finalOrder = {
            products,
            price
        }

        await Order.create(finalOrder)
            .then((data) => {
                Kitchen.create({ order: products, OrderId: data.id })
                    .then(() => {
                        res.status(200).json({ message: 'Order successfully created' });
                    })
                    .catch(err => console.log(`Create kitchen order error: ${err}`));
            })
            .catch(err => console.log(`Create order error: ${err}`));
    }
}