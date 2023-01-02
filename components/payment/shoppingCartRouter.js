var express = require('express');
var router = express.Router();
const shoppingCartController = require('../payment/paymentController')

router.get('/remove/:id', shoppingCartController.removeOutCart);
router.get('/', shoppingCartController.getShoppingCartList);
router.post('/:id', shoppingCartController.addToCart);

// router.get('/', function(req, res, next) {
      
//   res.render('users/shopping-cart');
// });

//router.post('/');

module.exports = router;