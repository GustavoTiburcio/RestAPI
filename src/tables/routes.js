const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTables);
router.post('/', controller.addTable);
router.get('/:id', controller.getTableById);
router.put('/:id', controller.updateTableNumber);
router.delete('/:id', controller.removeTable);
router.put('/changeTableValues/:id', controller.changeTableValues);

module.exports = router;