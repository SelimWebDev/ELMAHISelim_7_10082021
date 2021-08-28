const express = require('express');
const router = express.Router();

const tkn = require('../middleware/tkn');
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controllers/commentCtrl.js');

router.get('/:id', tkn, commentCtrl.getAll);
router.post('/', tkn, multer, commentCtrl.createComment);
router.delete('/', tkn, commentCtrl.deleteComment);


module.exports = router;