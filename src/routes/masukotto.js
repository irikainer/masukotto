const express = require('express');
const router = express.Router();

const apis = require('../controllers/apis');
const mascota = require('../controllers/mascotas');

router.get('/', apis.list);
router.get('/petlist', mascota.list);
router.post('/petadd', mascota.add)

module.exports = router;