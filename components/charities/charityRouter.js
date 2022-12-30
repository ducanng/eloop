const express = require('express');
const router = express.Router();
const charityController = require('./charityController')

router.get('/', charityController.getListCharity);

module.exports = router;