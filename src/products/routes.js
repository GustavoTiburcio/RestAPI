const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.get('/category/:id', controller.getProductsByCategoryId);
router.post('/', controller.addProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.removeProduct);

module.exports = router;