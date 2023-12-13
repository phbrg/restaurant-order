const jwt = require('jsonwebtoken');

const Customer = require('../models/Customer');

const getCustomerByToken = async (token) => {
  if(!token) {
    res.status(201).json({ message: 'Access denied' });
    return;
  }
  
  const decoded = jwt.verify(token, 'secretjwt');
  const customerId = decoded.id; 

  const customer = await Customer.findOne({ where: { id: customerId } });

  return customer;
}

module.exports = getCustomerByToken;