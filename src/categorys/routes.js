const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getCategorys);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.addCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.removeCategory);

module.exports = router;
