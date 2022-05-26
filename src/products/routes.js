const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getProducts);
router.post('/', controller.addProduct);
router.get('/:id', controller.getProductById);
router.get('/category/:id', controller.getProductsByCategoryId);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.removeProduct);

module.exports = router;