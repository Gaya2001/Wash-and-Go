const express = require("express");
const router = express.Router();
const CustomerOtp = require("../controllers/CustomerOtp");
const { sendOtp } = require('../controllers/CustomerOtp'); // Import sendOtp from the controller

// Define routes and link to controller methods
router.post("/", sendOtp); // Use the send-otp route

module.exports = router;
