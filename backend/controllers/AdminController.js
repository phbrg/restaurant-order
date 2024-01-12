const Admin = require('../models/Admin');

const createUserToken = require('../helpers/createUserToken');

const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = class AdminController {
  static async registerAdmin(req, res) {
    const { name, login, password, confirmPassword, adminPassword } = req.body;

    if(!name || !login || !password || !confirmPassword || adminPassword) {
      res.status(422).json({ message: 'Credenciais invalidas.' });
      return;
    }

    const stringRegex = /^[0-9a-zA-Z]+$/i;
    if(!stringRegex.test(name) || stringRegex.test(login)) {
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
      }).catch((err) => console.log(`> create admin error: ${err}`));
  }
}