const Product = require('../models/Product');
const Order = require('../models/Order');

require('dotenv').config();

module.exports = class KitchenController {
    static async registerProduct(req, res) {
        const { name, description, category, price, password  } = req.body;
        let picture = req.file || null;

        if(password !== process.env.ADMIN_PASSWORD) {
          res.status(404).json({ message: 'You are not allowed here!' });
          return;
        }

        if(!name || !description || !category || !price) {
          res.status(422).json({ message: 'Invalid credentials' });
          return;
        }

        const alredyRegistered = await Product.findOne({ where: { name: name } });
        
        if(alredyRegistered) {
          res.status(422).json({ message: 'An product with the same name is alredy registered' });
          return;
        }

        if(picture !== null) {
          picture = picture.path;
        }

        const product = {
            name: name.toLowerCase(),
            description,
            category,
            avaliable: true,
            price,
            promo: 0,
            picture
        }

        Product.create(product)
            .then((product) => {
                res.status(200).json({ message: `Product successfully registered!`, product: product });
            })
            .catch((err) => console.log(`Product register error: ${err}`));
    }

    static async editProduct(req, res) {
      const productId = parseFloat(req.params.id);
      const { name, description, category, price, avaliable, promo, password  } = req.body;

      if(password !== process.env.ADMIN_PASSWORD) {
        res.status(404).json({ message: 'You are not allowed here!' });
        return;
      }

      const productExist = await Product.findOne({ where: { id: productId } });

      if(!productExist) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      const nameRegistered = await Product.findOne({ where: { name: name } });
        
      if(nameRegistered && parseFloat(nameRegistered.id) !== productId) {
        res.status(422).json({ message: 'An product with the same name is alredy registered' });
        return;
      }

      const product = {
        name,
        description,
        category,
        avaliable,
        price,
        promo
      }

      Product.update(product, { where: { id: productId } })
        .then((product) => {
          res.status(200).json({ message: 'Product successfully updated!' });
        }).catch(err => console.log(`Product update error: ${err}`))
    }

    static async deleteProduct(req, res) {
      const id = req.params.id;
      const password = req.body.password;

      if(password !== process.env.ADMIN_PASSWORD) {
        res.status(404).json({ message: 'You are not allowed here!' });
        return;
      }

      const productExist = await Product.findOne({ where: { id: parseFloat(id) } });

      if(!productExist) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      Product.destroy({ where: { id: parseFloat(id) } })
        .then(() => res.status(200).json({ message: 'Product successfully deleted!' }))
        .catch(err => console.log(`Product delete error: ${err}`));
    }

    static async orders(req, res) {
      res.status(200).json({ message: await Order.findAll({ raw: true, where: { delivered: false } }) });
    }

    static async updateOrderStatus(req, res) {
      const orderId = req.params.id;

      const order = await Order.findOne({ raw: true, where: { id: parseFloat(orderId) } });

      if(!order) {
        res.status(404).json({ message: 'Invalid order' });
        return;
      }

      Order.update({ delivered: true }, { where: { id: orderId } })
      .then(() => {
        res.status(200).json({ message: 'You successfully finished an order' });
      }).catch(err => console.log(`Order update error: ${err}`));
    }

    static async getProduct(req, res) {
      const productId = req.params.id;

      const product = await Product.findOne({ raw: true, where: { id: productId } });

      if(!product) {
        res.status(404).json({ message: 'Invalid product' });
        return;
      }

      res.status(200).json({ message: product });
    }
}