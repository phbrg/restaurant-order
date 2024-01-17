const router = require('express').Router();

const UserController = require('../controllers/UserController');

const authUser = require('../helpers/authUser');

router.post('/register', UserController.register);
router.put('/logout', authUser, UserController.logout);

router.get('/products/:param1?/:param2?', authUser, UserController.getProducts);

router.post('/registerorder', authUser, UserController.registerOrder);

module.exports = router;