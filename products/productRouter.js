const express = require('express');
const router = express.Router();
const productController = require('../products/productController')

/* GET users listing. */
router.get('/', productController.getListProduct);
router.get('/:expore', productController.getListProduct);
router.get('/detail/:id', productController.geProductDetail);




module.exports = router;