const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose'); // Assuming you're using Mongoose for MongoDB
require('dotenv').config(); // Load environment variables
const User = require("../models/Register"); // Ensure this is the correct path to your User model

// Function to generate OTP
const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-digit OTP
};

// Function to send OTP email
const sendOtpEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Your Gmail address from .env
      pass: process.env.EMAIL_PASSWORD // Your Gmail app password from .env
    }
  });

  const mailOptions = {
    from: process.env.EMAIL, // Sender email
    to: email, // Receiver email
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`
  };

  return transporter.sendMail(mailOptions); // Return the Promise
};





// Route to trigger sending OTP
const sendOtp = async (req, res) => {
  const { id } = req.body; // Get user ID from request body

  try {
    // Search for the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = generateOTP(); // Generate OTP
    await sendOtpEmail(user.Email, otp); // Send OTP email



    // Send OTP back to the frontend (for validation purposes)
    res.status(200).json({ message: 'OTP sent successfully!', otp }); // You might want to remove otp before sending to the frontend for security reasons
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP email' });
  }
};


module.exports = { sendOtp }; // Export sendOtp function
