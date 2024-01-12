require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Admin = require('../models/Admin');

const getUserByToken = async (token, req, res) => {
  if(!token) {
    res.status(401).json({ error: 'Token invalido.' });
    return;
  }
  
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const userId = decoded.id; 

  if(decoded.isAdmin) {
    const admin = await Admin.findOne({ raw: true, where: { id: userId } }) || null;
    const response = {
      admin,
      isAdmin: true
    }
    return response;
  } else {
    const user = await User.findOne({ raw: true, where: { id: userId } }) || null;
    return user;
  }
}

module.exports = getUserByToken;