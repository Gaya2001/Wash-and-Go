const express = require("express");
const router = express.Router();
const SmsOTP = require("../controllers/SmsOtpController");

router.post("/", SmsOTP.sendOtp);
router.post("/verifyotp", SmsOTP.verifyOtp);
router.post("/ChangePassword", SmsOTP.changePassword);

module.exports = router;
