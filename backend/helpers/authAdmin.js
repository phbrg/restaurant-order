require('dotenv').config();
const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

const getUserByToken = require('./getUserByToken');

const authAdmin = async (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).json({ message: 'Acesso negado' });
    return;
  }

  const token = getToken(req);

  if(!token) {
    res.status(401).json({ message: 'Acesso negado' });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;

    const response = await getUserByToken(token);

    if(response.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Acesso negado' });
      return;
    }

  } catch(err) {
    res.status(401).json({ message: 'Acesso negado' });
    return;
  }
}

module.exports = authAdmin;