const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const User = require('../models/User');

module.exports = class UserController {
  static async register(req, res) {
    const { name, table } = req.body;

    if(!name || !table || name.length == 0 || table.length == 0) {
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
      res.status(422).json({ message: 'Invalid table.' }); 
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
    }

    await User.update({ exit: new Date() }, { where: { id: parseFloat(user.id) } })
      .then(() => {
        res.status(200).json({ message: 'Obrigado por escolher o nosso restaurante! até a proxima.' });
        // remove token from cookies
      }).catch((err) => console.log(`> update user error: ${err}`));
  }
}