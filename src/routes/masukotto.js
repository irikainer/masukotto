const express = require('express');
const router = express.Router();

const apis = require('../controllers/apis');
const userController = require('../controllers/user');

router.get('/', apis.list);
router.post('/registerUser', userController.save)

module.exports = router;