const router = require('express').Router();

const UserController = require('../controllers/UserController');

const authUser = require('../helpers/authUser');

router.post('/register', UserController.register);

router.put('/logout', authUser, UserController.logout);

module.exports = router;