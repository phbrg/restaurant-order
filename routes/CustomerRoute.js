const router = require('express').Router();
const CustomerController = require('../controllers/CustomerController');

router.post('/', CustomerController.register);

module.exports = router;