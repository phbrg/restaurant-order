const router = require('express').Router();
const CustomerController = require('../controllers/CustomerController');

const authCustomer = require('../helpers/authCustomer');
const upload = require('../helpers/upload');

router.post('/', CustomerController.register);

module.exports = router;