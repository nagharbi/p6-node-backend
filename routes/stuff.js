const express = require('express');
const stuffCtrl = require('../controllers/stuff');

const router = express.Router();

router.post('/', stuffCtrl.createThing);
router.put('/:id', stuffCtrl.updateThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/:id', stuffCtrl.getThing);
router.get('/', stuffCtrl.getAllThing);

module.exports = router;