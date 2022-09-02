const express = require('express');
const router = express.Router();

const apis = require('../controllers/apis');

router.get('/', apis.list);

module.exports = router;