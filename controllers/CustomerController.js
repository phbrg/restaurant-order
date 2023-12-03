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
        res.status(200).json({ message: await Product.findAll({ raw: true }) });
    }

    static async order(req, res) {
        const order = req.body.order;

        let products = [];
        let price = 0;

        async function processOrders() {
            for (const id of order) {
              const orderExist = await Product.findOne({ raw: true, where: { id: parseFloat(id) } });

              if(!orderExist) {
                res.status(404).json({ message: 'Invalid product' });
                return;
              }

              products.push(orderExist);
              price += orderExist.price;
            }
        }

        await processOrders();

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