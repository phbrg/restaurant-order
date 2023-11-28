const router = require('express').Router();
const KitchenController = require('../controllers/KitchenController');

router.post('/registerproduct', KitchenController.registerProduct);
router.post('/editproduct/:name', KitchenController.editProduct);

router.delete('/deleteproduct/:name/:password', KitchenController.deleteProduct)

module.exports = router;