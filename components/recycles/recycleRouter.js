const express = require('express');
const router = express.Router();
const recycleController = require('./recycleController')

router.get('/', recycleController.getListRecycle);




module.exports = router;