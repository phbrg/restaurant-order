require('dotenv').config();
const jwt = require('jsonwebtoken');

const createUserToken = (user, req, res) => {
  let isAdmin = false;

  if(user.login) {
    isAdmin = true;
  }

  const token = jwt.sign({
    id: user.id,
    name: user.name,
    isAdmin: isAdmin
  }, process.env.JWT_KEY);

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
  });
  
  res.status(200).json({ message: 'Seja bem vindo!' });
}

module.exports = createUserToken;