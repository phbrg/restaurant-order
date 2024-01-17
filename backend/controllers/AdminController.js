const Admin = require('../models/Admin');
const Product = require('../models/Product');

const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = class AdminController {
  static async registerAdmin(req, res) {
    const { name, login, password, confirmPassword, adminPassword } = req.body;

    if(!name || !login || !password || !confirmPassword || !adminPassword) {
      res.status(422).json({ message: 'Credenciais invalidas.' });
      return;
    }

    const stringRegex = /^[0-9a-zA-Z]+$/i;
    if(!stringRegex.test(name) || !stringRegex.test(login)) {
      res.status(422).json({ message: 'Não é permitido o uso de caracteres especiais.' });
      return;
    }

    const loginAlredyRegistered = await Admin.findOne({ raw: true, where: { login: login.toLowerCase() } }) || null;
    if(loginAlredyRegistered) {
      res.status(422).json({ message: 'Login ja resgistrado.' });
      return;
    }

    if(password !== confirmPassword) {
      res.status(422).json({ message: 'As senhas não coincidem.' });
      return;
    }

    if(password.length < 8) {
      res.status(422).json({ message: 'Senha muito curta.' });
      return;
    }

    if(adminPassword !== process.env.ADMIN_PASSWORD) {
      res.status(422).json({ message: 'Acesso negado.' });
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = {
      name,
      login: login.toLowerCase(),
      password: hashedPassword
    };

    await Admin.create(admin)
      .then((admin) => {
        createUserToken(admin, req, res);
      }).catch((err) => { 
        console.log(`> create admin error: ${err}`) 
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }

  static async createProduct(req, res) {
    const { name, description, category, price } = req.body;

    if(!name || !description || !category || !price) {
      res.status(422).json({ message: 'Credenciais invalidas.' });
      return;
    }

    if(description.length > 255) {
      res.status(422).json({ message: 'Descrição muito longa ( max. 255 ).' });
      return;
    }

    const stringRegex = /^[0-9a-zA-Z ]+$/i;
    if(!stringRegex.test(name) || !stringRegex.test(description)) {
      res.status(422).json({ message: 'Não é permitido o uso de caracteres especiais.' });
      return;
    }

    const productAlredyRegistered = await Product.findOne({ raw: true, where: { name: name } }) || null;
    if(productAlredyRegistered) {
      res.status(422).json({ message: 'Produto ja registrado.' });
      return;
    }

    const product = {
      name,
      description,
      category,
      price: parseFloat(price)
    }

    await Product.create(product)
      .then((product) => {
        res.status(200).json({ message: 'Produto registrado com sucesso!', product });
      }).catch((err) => { 
        console.log(`> create product error: ${err}`) 
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }

  static async editProduct(req, res) {
    const productId = req.params.id;
    const { name, description, category, price, promotion, avaliable } = req.body;

    if(!productId) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    if(!name && !description && !category && !price && !promotion && !avaliable) {
      res.status(422).json({ message: 'Valores invalidos.' });
      return;
    }

    const productOnDatabase = await Product.findOne({ raw: true, where: { id: parseFloat(productId) } }) || null;
    if(!productOnDatabase) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    const product = {
      name: productOnDatabase.name,
      description: productOnDatabase.description,
      category: productOnDatabase.category,
      price: productOnDatabase.price,
      promotion: productOnDatabase.promotion,
      avaliable: productOnDatabase.avaliable
    }

    if(name && name.length !== 0) {
      const stringRegex = /^[0-9a-zA-Z ]+$/i;
      if(!stringRegex.test(name)) {
        res.status(422).json({ message: 'Não é permitido o uso de caracteres especiais.' });
        return;
      }

      const productAlredyRegistered = await Product.findOne({ raw: true, where: { name: name } }) || null;
      if(productAlredyRegistered && productAlredyRegistered.id !== productId) {
        res.status(422).json({ message: 'Produto ja registrado.' });
        return;
      }

      product.name = name;
    }

    if(description && description.length !== 0) {
      if(description.length > 255) {
        res.status(422).json({ message: 'Descrição muito longa ( max. 255 ).' });
        return;
      }

      const stringRegex = /^[0-9a-zA-Z ]+$/i;
      if(!stringRegex.test(description)) {
        res.status(422).json({ message: 'Não é permitido o uso de caracteres especiais.' });
        return;
      }

      product.description = description;
    }

    if(category && category.length !== 0) {
      product.category = category;
    }

    if(price && price.length !== 0) {
      product.price = parseFloat(price);
    }

    if(promotion && promotion.length !== 0) {
      product.promotion = parseFloat(promotion);
    }

    if(avaliable && avaliable.length !== 0) {
      product.avaliable = avaliable;
    }

    await Product.update(product, { where: { id: productOnDatabase.id } })
      .then(() => {
        res.status(200).json({ message: 'Produto atualizado com sucesso.' });
      }).catch((err) => { 
        console.log(`> product update error: ${err}`) 
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }

  static async editAdmin(req, res) {
    const adminId = req.params.id;
    const { name, login, password, confirmPassword, adminPassword } = req.body;

    if(!adminId) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    if(!name && !login && !password && !confirmPassword && !adminPassword) {
      res.status(422).json({ message: 'Valores invalidos.' });
      return;
    }

    if(adminPassword !== process.env.ADMIN_PASSWORD) {
      res.status(422).json({ message: 'Acesso negado.' });
      return;
    }

    const adminOnDatabase = await Admin.findOne({ raw: true, where: { id: parseFloat(adminId) } }) || null;
    if(!adminOnDatabase) {
      res.status(422).json({ message: 'Admin não encontrado.' });
      return;
    }

    const admin = {
      name: adminOnDatabase.name,
      login: adminOnDatabase.login,
      password: adminOnDatabase.password,
    };

    if(name && name.length !== 0) {
      const stringRegex = /^[0-9a-zA-Z ]+$/i;
      if(!stringRegex.test(name)) {
        res.status(422).json({ message: 'Não é permitido o uso de caracteres especiais.' });
        return;
      }

      admin.name = name;
    }

    if(login && login.length !== 0) {
      const stringRegex = /^[0-9a-zA-Z ]+$/i;
      if(!stringRegex.test(login)) {
        res.status(422).json({ message: 'Não é permitido o uso de caracteres especiais.' });
        return;
      }

      admin.login = login;
    }

    if(password && password.length !== 0) {
      if(password !== confirmPassword) {
        res.status(422).json({ message: 'As senhas não coincidem' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      admin.password = hashedPassword;
    }

    await Admin.update(admin, { where: { id: parseFloat(adminId) } })
      .then(() => {
        res.status(422).json({ message: 'Admin atualizado com sucesso.' });
      }).catch((err) => { 
        console.log(`> Update admin error: ${err}`) 
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }

  static async deleteProduct(req, res) {
    const productId = req.params.id;

    if(!productId) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    const productOnDatabase = await Product.findOne({ raw: true, where: { id: parseFloat(productId) } }) || null;
    if(!productOnDatabase) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    await Product.destroy({ where: { id: parseFloat(productId) } })
      .then(() => {
        res.status(200).json({ message: 'Produto deletado com sucesso.' })
      }).catch((err) => { 
        console.log(`> delete product error: ${err}`) 
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }

  static async deleteAdmin(req, res) {
    const adminId = req.params.id;

    if(!adminId) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    const adminOnDatabase = await Admin.findOne({ raw: true, where: { id: parseFloat(adminId) } }) || null;
    if(!adminOnDatabase) {
      res.status(422).json({ message: 'Id invalido.' });
      return;
    }

    const adminToken = await getToken(req);
    const admin = await getUserByToken(adminToken);

    if(admin.id == adminOnDatabase.id) {
      res.status(422).json({ message: 'Você não pode deletar sua propria conta.' });
      return;
    }

    await Admin.destroy({ where: { id: parseFloat(adminId) } })
      .then(() => {
        res.status(200).json({ message: 'Admin deletado com sucesso.' })
      }).catch((err) => { 
        console.log(`> delete product error: ${err}`)
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }
}