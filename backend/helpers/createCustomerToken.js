const jwt = require('jsonwebtoken');

const createCustomerToken = async(customer, req, res) => {
  const token = jwt.sign({
    id: customer.id,
    name: customer.name,
  }, 'secretjwt');

  res.status(200).json({ message: 'You are successfully authenticated', token: token, id: customer.id});
}

module.exports = createCustomerToken;