const express = require('express');
const router = express.Router();

const tkn = require('../middleware/tkn');
const admin = require ('../middleware/admin')
const multer = require('../middleware/multer-config');

const msgCtrl = require('../controllers/msgCtrl.js');

router.get('/', tkn, msgCtrl.getAll);
router.get('/:id', tkn, msgCtrl.getOne);
router.post('/', tkn, multer, msgCtrl.createMsg);
router.delete('/', tkn, admin, msgCtrl.deleteMsg);


module.exports = router;