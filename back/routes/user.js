const express = require('express');
const router = express.Router();
const tkn = require('../middleware/tkn');

const userCtrl = require('../controllers/userCtrl.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', tkn, userCtrl.getOne);
router.delete('/:id',  userCtrl.deleteOne);


module.exports = router;