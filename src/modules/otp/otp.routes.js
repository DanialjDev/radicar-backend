const express = require('express');
const otpController = require("./../otp/otp.controller");

const router = express.Router();


router.route("/create").post(otpController.createOtp)
router.route("/check").post(otpController.checkOtp)




module.exports = router
