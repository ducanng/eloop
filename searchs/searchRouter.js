const express = require('express');
const router = express.Router();
const searchController = require('../searchs/searchController.js')


/* GET users listing. */

router.post('/', searchController.findProductWithSearch)

// router.post('/change_password', userController.postUserChangePassword)

module.exports = router;
