const router = require('express').Router();

const CustomerController = require('../controllers/CustomerController');

const authCustomer = require('../helpers/authCustomer');

router.post('/', CustomerController.register);
router.post('/registerorder', authCustomer, CustomerController.order);

router.get('/menu', authCustomer, CustomerController.menu);
router.get('/userorders', authCustomer, CustomerController.userOrders);

router.put('/checkout', authCustomer, CustomerController.checkOut);

module.exports = router;