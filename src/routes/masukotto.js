const express = require('express');
const router = express.Router();

const apis = require('../controllers/apis');
const userController = require('../controllers/user');

router.get('/', apis.list);
router.post('/registerUser', userController.save);
router.get('/profile/:id', userController.edit);
router.post('/update/:id', userController.update);

module.exports = router;