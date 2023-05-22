const express = require('express');
const router = express.Router();

const userRoutes = require('../domain/user/routes');
const otpRoutes = require('../domain/otp/routes');
const emailVerificationRoutes = require('../domain/email_verification/routes');

router.use('/user', userRoutes);
router.use('/otp', otpRoutes);
router.use('/email_verification', emailVerificationRoutes);

module.exports = router;