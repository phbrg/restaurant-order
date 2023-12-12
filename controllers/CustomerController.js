const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Order = require('../models/Order');

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
        res.status(200).json({ message: await Product.findAll({ raw: true, where: { avaliable: true } }) });
    }

    static async order(req, res) {
        const order = req.body.order;

        let products = [];
        let price = 0;

        const customerToken = getToken(req);
        const customer = await getCustomerByToken(customerToken);

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
            price,
            CustomerId: customer.id
        }

        await Order.create(finalOrder)
            .then((data) => {
                res.status(200).json({ message: 'Order successfully created', order: data.products });
            })
            .catch(err => console.log(`Create order error: ${err}`));
    }

    static async checkOut(req, res) {
        const customerToken = getToken(req);
        const customer = await getCustomerByToken(customerToken);

        const order = await Order.findAll({ raw: true, where: { CustomerId: customer.id } });

        if(order.length <= 0) {
            res.status(200).json({ message: `You didn't order anything, you have nothing to pay nothing.` });
            return;
        }

        let finalPrice = 0;
        let products = []

        order.map((order) => {
            finalPrice = finalPrice + order.price;
            order.products.map((product) => {
                products.push({ name: product.name, price: product.price });
            });
        });

        res.status(200).json({ message: `Thank you for being our client! | Your total is: ${finalPrice}`, products: products });
        Customer.update({exitDate: new Date()}, { where: { id: customer.id } });
    }

    static async userOrders(req, res) {
        const customerToken = getToken(req);
        const customer = await getCustomerByToken(customerToken);

        const orders = await Order.findAll({ raw: true, where: { CustomerId: customer.id  } });

        if(!orders || orders.length <= 0) {
            res.status(404).json({ message: 'You have no orders' });
            return;
        }

        res.status(200).json({ orders });
    }
}