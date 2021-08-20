const express = require('express');
const router = express.Router();
const tkn = require('../middleware/tkn');

const msgCtrl = require('../controllers/msgCtrl.js');

router.get('/', msgCtrl.getAll);
router.post('/', msgCtrl.createMsg);


module.exports = router;