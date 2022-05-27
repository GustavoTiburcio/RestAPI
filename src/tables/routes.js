const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getTables);
router.get('/:id', controller.getTableById);
router.post('/', controller.addTable);
router.put('/:id', controller.updateTableNumber);
router.put('/changeTableValues/:id', controller.changeTableValues);
router.delete('/:id', controller.removeTable);

module.exports = router;