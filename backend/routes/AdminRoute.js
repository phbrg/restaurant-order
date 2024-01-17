const router = require('express').Router();

const AdminController = require('../controllers/AdminController');

const authAdmin = require('../helpers/authAdmin');

router.post('/register', authAdmin, AdminController.registerAdmin);
router.put('/editadmin/:id', authAdmin, AdminController.editAdmin);
router.delete('/deleteadmin/:id', authAdmin, AdminController.deleteAdmin);

router.post('/createproduct', authAdmin, AdminController.createProduct);
router.put('/editproduct/:id', authAdmin, AdminController.editProduct);
router.delete('/deleteproduct/:id', authAdmin, AdminController.deleteProduct);

router.get('/orders/:param1?/:param2?', authAdmin, AdminController.getOrders);
router.put('/updateorderstatus/:orderId', authAdmin, AdminController.updateOrderStatus);

module.exports = router;