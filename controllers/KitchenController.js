const Product = require('../models/Product');

require('dotenv').config();

module.exports = class KitchenController {
    static async registerProduct(req, res) {
        const { name, description, category, price, password  } = req.body;

        if(parseFloat(password) !== parseFloat(process.env.ADMIN_PASSWORD)) {
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

        const product = {
            name: name.toLowerCase(),
            description,
            category,
            avaliable: true,
            price,
            promo: 0
        }

        Product.create(product)
            .then((product) => {
                res.status(200).json({ message: `Product successfully registered!` });
            })
            .catch((err) => console.log(`Product register error: ${err}`));
    }

    static async editProduct(req, res) {
      const productName = req.params.name;
      const { name, description, category, price, avaliable, promo, password  } = req.body;

      if(parseFloat(password) !== parseFloat(process.env.ADMIN_PASSWORD)) {
        res.status(404).json({ message: 'You are not allowed here!' });
        return;
      }

      const productExist = await Product.findOne({ where: { name: productName.toLowerCase() } });

      if(!productExist) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      const product = {
        name: name.toLowerCase(),
        description,
        category,
        avaliable,
        price,
        promo
      }

      Product.update(product, { where: { name: productName } })
        .then((product) => {
          res.status(200).json({ message: 'Product successfully updated!' });
        }).catch(err => console.log(`Product update error: ${err}`))
    }

    static async deleteProduct(req, res) {
      const { name, password } = req.params;

      if(parseFloat(password) !== parseFloat(process.env.ADMIN_PASSWORD)) {
        res.status(404).json({ message: 'You are not allowed here!' });
        return;
      }

      const productExist = await Product.findOne({ where: { name: name.toLowerCase() } });

      if(!productExist) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      Product.destroy({ where: { name: name.toLowerCase() } })
        .then(() => res.status(200).json({ message: 'Product successfully deleted!' }))
        .catch(err => console.log(`Product delete error: ${err}`));
    }
}