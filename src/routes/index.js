const express = require('express');
const router = express.Router();

const userRoutes = require('../domain/user/routes');
const otpRoutes = require('../domain/otp/routes');

router.use('/user', userRoutes);
router.use('/otp', otpRoutes);

module.exports = router;