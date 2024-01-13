const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const User = require('../models/User');
const Product = require('../models/Product');

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
      .catch((err) => console.log(`> create user error: ${err}`))
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
      console.log('> caiu aqui');
      // remove token from cookies
      return;
    }

    await User.update({ exit: new Date() }, { where: { id: parseFloat(user.id) } })
      .then(() => {
        res.status(200).json({ message: 'Obrigado por escolher o nosso restaurante! até a proxima.' });
        // remove token from cookies
      }).catch((err) => console.log(`> update user error: ${err}`));
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
}