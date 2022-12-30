const express = require('express');
const router = express.Router();
const productController = require('./productController')

router.get('/', productController.getListProductQueryParam);
router.get('/:expore', productController.getListProductQueryParam);




module.exports = router;