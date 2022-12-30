var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
      console.log("jjjj");
  res.render('users/shopping-cart');
});

router.post('/');
module.exports = router;