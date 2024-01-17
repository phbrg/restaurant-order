const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = class UserController {
  static async register(req, res) {
    const { name, table } = req.body;

    if(!name || !table) {
      console.log('> caiu no if');
      res.status(422).json({ message: 'Credenciais invalidas.' });
      return;
    }

    if(parseFloat(table) <= 0 || parseFloat(table) > 99) {
      res.status(422).json({ message: 'Mesa invalida.' });
      return;
    }

    const nameRegex = /^[0-9a-zA-Z]+$/i;
    if(!nameRegex.test(name)) {
      res.status(422).json({ message: 'Nome invalido.' });
      return;
    }

    const validTable = await User.findAll({ raw: true, where: { table: table } });
    try {
      validTable.map((table) => {
        if(table.exit !== null) {} 
        else {
          throw new Error();
        }
      });
    } catch(err) {
      res.status(422).json({ message: 'Mesa invalida.' }); 
      return;
    }

    await User.create({ name, table })
      .then((user) => {
        try {
          createUserToken(user, req, res);
        } catch(err) { console.log(`> create user token error: ${err}`) }
      })
      .catch((err) => { 
        console.log(`> create user error: ${err}`); 
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      })
  }

  static async logout(req, res) {
    const userToken = await getToken(req) || null;

    if(!userToken) {
      res.status(422).json({ message: 'Houve um erro ao processar a sua solicitação.' });
      return;
    }

    const user = await getUserByToken(userToken, req, res) || null;

    if(!user) {
      res.status(422).json({ message: 'Houve um erro ao processar a sua solicitação.' });
      return;
    } else if(user.isAdmin) {
      // remove token from cookies
      return;
    }

    await User.update({ exit: new Date() }, { where: { id: parseFloat(user.id) } })
      .then(() => {
        res.status(200).json({ message: 'Obrigado por escolher o nosso restaurante! até a proxima.' });
        // remove token from cookies
      }).catch((err) => { 
        console.log(`> update user error: ${err}`) ;
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      });
  }

  static async getProducts(req, res) {
    let param1 = null;
    let param2 = null;

    if(req.params) {
      param1 = req.params.param1;
      param2 = req.params.param2 || null;
    }

    let response;
    let status;

    switch(param1) {
      case 'avaliable':
        response = await Product.findAll({ raw: true, where: { avaliable: true } }) || null;
        status = 200;
        break;
      case 'unavaliable':
        response = await Product.findAll({ raw: true, where: { avaliable: false } }) || null;
        status = 200;
        break;
      case 'id': 
        if(!param2) {
          response = 'Pesquisa invalida.';
          status = 404;
        } else {
          response = await Product.findAll({ raw: true, where: { id: parseFloat(param2) } }) || null;
          status = 200;
        }
        break;
      case 'name':
        if(!param2) {
          response = 'Pesquisa invalida.';
          status = 404;
        } else {
          response = await Product.findAll({ raw: true, where: { name: param2.toLowerCase() } }) || null;
          status = 200;
        }
        break;
      case 'category':
        if(!param2) {
          response = 'Pesquisa invalida.';
          status = 404;
        } else {
          response = await Product.findAll({ raw: true, where: { category: param2.toUpperCase() } }) || null;
          status = 200;
        }
        break;
      default:
        response = await Product.findAll({ raw: true }) || null;
        status = 200;
    }

    if(response == [] || response.length == 0 || response == '' || response == null) {
      response = 'Não foi possivel achar o produto que deseja.';
      status = 404;
    }

    res.status(status).json({ response });
  }

  static async registerOrder(req, res) {
    const userToken = await getToken(req);
    const user = await getUserByToken(userToken, req, res) || null;

    if(!user) {
      res.status(401).json({ message: 'Acesso negado.' });
      return;
    }

    const { order } = req.body;

    if(!order) {
      res.status(422).json({ message: 'Pedido invalido.' });
      return;
    }

    let total = 0;

    try {
      for(const pedido of order) {
        const orderOnDatabase = await Product.findOne({ raw: true, where: { id: parseFloat(pedido.id) } }) || null;
        if(!orderOnDatabase) {
          throw new Error('Produto invalido.');
        }

        if(orderOnDatabase.promotion) {
          total += orderOnDatabase.promotion;
        } else {
          total += orderOnDatabase.price;
        }
      }
    } catch(err) {
      res.status(500).json({ message: err.message });
      return;
    }

    await Order.create({ order, total, UserId: parseFloat(user.id) })
      .then((order) => {
        res.status(200).json({ message: 'Seu pedido foi registrado com sucesso!', order });
      }).catch((err) => {
        console.log(`> create order error: ${err}`);
        res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
      })
  }
}