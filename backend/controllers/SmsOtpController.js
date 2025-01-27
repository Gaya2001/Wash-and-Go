const twilio = require("twilio");
const User = require("../models/Register");

let Email; // global variable
const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

let otpStorage = {}; // Temporary storage for OTPs

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

function formatPhoneNumber(mobilenumber) {
    // Add country code if it's missing
    if (!mobilenumber) {
        console.error("Invalid mobile number provided.");
        return null;
    }

    const countryCode = "+94"; // Replace with your country code (Sri Lanka here)
    if (!mobilenumber.startsWith("+")) {
        return countryCode + mobilenumber.replace(/^0+/, "");
    }
    return mobilenumber;
}

async function sendOtp(req, res) {
    const { email, mobilenumber } = req.body;
    Email = email;

    // Format phone number
    const formattedNumber = formatPhoneNumber(mobilenumber);
    if (!formattedNumber) {
        return res.status(400).json({ error: "Invalid mobile number format" });
    }

    const otp = generateOTP();
    otpStorage[formattedNumber] = otp;
    // console.log(`Stored OTP for ${formattedNumber}: ${otp}`);

    try {
        await client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER, // Ensure this is a valid Twilio number
            to: formattedNumber,
            body: `Your OTP is ${otp}`,
        });
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

function verifyOtp(req, res) {
    const { otp, mobilenumber } = req.body;
    const formattedNumber = formatPhoneNumber(mobilenumber);

    if (!formattedNumber) {
        return res.status(400).json({ error: "Invalid mobile number format" });
    }

    // console.log(`Verifying OTP for ${formattedNumber}: ${otp}`);
    // console.log(`Stored OTP is: ${otpStorage[formattedNumber]}`);

    if (otpStorage[formattedNumber] && otpStorage[formattedNumber] == otp) {
        delete otpStorage[formattedNumber]; // Remove OTP after successful verification
        return res.status(200).json({ message: "OTP verified successfully" });
    } else {
        return res.status(400).json({ error: "Invalid OTP" });
    }
}



// Function to change password
const changePassword = async (req, res) => {
    const { newPassword } = req.body; // Retrieve the new password from the request body

    // console.log(`Requested change Email ${newPassword}`);

    try {
        // Find the user by the global variable `Email`
        const user = await User.findOne({ Email });

        // console.log(`Requested change User ${user}`);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's password directly without hashing
        user.Password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { sendOtp, verifyOtp, changePassword };
