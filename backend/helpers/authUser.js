require('dotenv').config();
const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

const authUser = (req, res, next) => {
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

    next();
  } catch(err) {
    res.status(401).json({ message: 'Acesso negado' });
    return;
  }
}

module.exports = authUser;