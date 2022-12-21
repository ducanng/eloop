const express = require('express');
const router = express.Router();
const productController = require('../products/productController')

router.get('/', productController.getListProductQueryParam);
router.get('/:page', productController.getListProductQueryParam);
router.get('/:page/:expore', productController.getListProductQueryParam);
router.get('/:expore', productController.getListProductQueryParam);




module.exports = router;