const router = require('express').Router();

const AdminController = require('../controllers/AdminController');

const authAdmin = require('../helpers/authAdmin');

router.post('/register', authAdmin, AdminController.registerAdmin);

module.exports = router;