const express = require('express');
const router = express.Router();
const tkn = require('../middleware/tkn');

const msgCtrl = require('../controllers/msgCtrl.js');

router.get('/', tkn, msgCtrl.getAll);
router.post('/', tkn,  msgCtrl.createMsg);


module.exports = router;