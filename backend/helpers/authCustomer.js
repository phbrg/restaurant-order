const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

const authUser = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(201).json({ message: 'Access denied' });
    return;
  }

  const token = getToken(req);

  if(!token) {
    res.status(201).json({ message: 'Access denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, 'secretjwt');
    req.user = verified;

    next();
  } catch(err) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
}

module.exports = authUser;