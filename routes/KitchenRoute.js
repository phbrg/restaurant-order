const router = require('express').Router();
const KitchenController = require('../controllers/KitchenController');

const upload = require('../helpers/upload');

router.post('/registerproduct', upload.single('picture'), KitchenController.registerProduct);
router.post('/editproduct/:id', KitchenController.editProduct);

router.delete('/deleteproduct/:id', KitchenController.deleteProduct);

router.get('/orders', KitchenController.orders);
router.get('/product/:id', KitchenController.getProduct);

router.put('/updatestatus/:id', KitchenController.updateOrderStatus)

module.exports = router;