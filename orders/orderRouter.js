const express = require('express');
const router = express.Router();
const sellProductController = require('../orders/orderController')

router.get('/', sellProductController.getSellProductList);
router.post('/:id', sellProductController.addToSellProduct);






module.exports = router;