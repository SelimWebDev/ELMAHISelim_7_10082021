const express = require('express');
const router = express.Router();

const tkn = require('../middleware/tkn');
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/commentCtrl.js');

router.get('/', tkn, commentCtrl.getAll);
router.post('/', tkn, multer, commentCtrl.createMsg);
router.delete('/', tkn, commentCtrl.deleteMsg);


module.exports = router;