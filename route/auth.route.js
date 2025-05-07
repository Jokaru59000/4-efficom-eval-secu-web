const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller.js');
const limiter = require("./../middleware/rateLimit.middleware.js");

router.post('/login', authController.login);
router.post('/login',limiter(1,5),authController.login);

module.exports = router;