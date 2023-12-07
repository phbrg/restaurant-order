const router = require('express').Router();
const KitchenController = require('../controllers/KitchenController');

router.post('/registerproduct', KitchenController.registerProduct);
router.post('/editproduct/:name', KitchenController.editProduct);

router.delete('/deleteproduct/:name', KitchenController.deleteProduct);

router.get('/orders', KitchenController.orders);
router.get('/product/:id', KitchenController.getProduct);

router.put('/updatestatus/:id', KitchenController.updateOrderStatus)

module.exports = router;