const router = require('express').Router();

const CustomerController = require('../controllers/CustomerController');

const authCustomer = require('../helpers/authCustomer');

router.post('/', CustomerController.register);
router.post('/registerorder', authCustomer, CustomerController.order);

router.get('/menu', authCustomer, CustomerController.menu);

module.exports = router;