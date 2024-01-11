require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const getUserByToken = async (token) => {
  if(!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const userId = decoded.id; 

  const user = await User.findOne({ raw: true, where: { id: userId } });

  return user;
}

module.exports = getUserByToken;