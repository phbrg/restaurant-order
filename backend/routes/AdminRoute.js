const router = require('express').Router();

const AdminController = require('../controllers/AdminController');

const authAdmin = require('../helpers/authAdmin');

router.post('/register', authAdmin, AdminController.registerAdmin);
router.put('/editadmin/:id', authAdmin, AdminController.editAdmin);
router.delete('/deleteadmin/:id', authAdmin, AdminController.deleteAdmin);

router.post('/createproduct', authAdmin, AdminController.createProduct);
router.put('/editproduct/:id', authAdmin, AdminController.editProduct);
router.delete('/deleteproduct/:id', authAdmin, AdminController.deleteProduct);



module.exports = router;