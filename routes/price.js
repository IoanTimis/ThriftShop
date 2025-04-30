const express = require('express');
const router = express.Router();
const price = require('../controllers/price');

router.post('/estimate', price.getPriceFromModel);

module.exports = router;
