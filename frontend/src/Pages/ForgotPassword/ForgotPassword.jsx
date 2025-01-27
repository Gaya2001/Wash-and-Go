import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, } from 'react-router-dom';
import ForgotPasswordImage from '../../assets/Register/EnterOTP.png';


function ForgotPassword() {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/SmsOtpSend", {
                email,
                mobilenumber: mobile // Send as 'mobilenumber' to match backend
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                setOtpSent(true);
            } else {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage("Error sending OTP. Please try again.");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/SmsOtpSend/verifyOTP", {
                otp,
                mobilenumber: mobile
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                navigate('/ChangePassword'); // Navigate to Change Password page
            } else {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage("Error verifying OTP. Please try again.");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-screen bg-gradient-to-br from-[#f0f4ff] to-[#d0eaff]">
            {/* Left side with image */}
            <div className="relative w-full lg:w-1/2 h-full">
                <img
                    src={ForgotPasswordImage}
                    alt="Forgot Password"
                    className="absolute inset-0 w-full h-full object-cover bg-cover bg-center"
                />
            </div>

            {/* Right side with forgot password form */}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-4 lg:p-8">
                <div className="w-full max-w-lg bg-white bg-opacity-80 rounded-lg shadow-xl p-6 lg:p-8">
                    <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-gray-800 py-2">Forgot Your Password?</h1>
                    <p className="text-lg font-semibold mb-6 text-center text-gray-600">
                        Enter your email and mobile number below to receive an OTP to reset your password.
                    </p>
                    {message && <p className="text-center text-red-500 mb-4">{message}</p>}
                    <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:border-[#006AFF]"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="mobile" className="block text-gray-700 mb-2 font-semibold">Mobile Number</label>
                            <input
                                type="tel"
                                id="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:border-[#006AFF]"
                                placeholder="Enter your mobile number"
                                required
                            />
                        </div>

                        {otpSent && (
                            <div className="mb-4">
                                <label htmlFor="otp" className="block text-gray-700 mb-2 font-semibold">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 leading-tight focus:outline-none focus:border-[#006AFF]"
                                    placeholder="Enter the OTP"
                                    required
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#0162c8] to-[#55e7fc] text-white font-semibold py-2 px-4 rounded-md shadow-lg w-full"
                            >
                                {otpSent ? 'Verify OTP' : 'Send OTP'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex justify-center gap-1">
                        <div className='text-gray-600'>Remembered your password? </div>
                        <Link to="/Login">
                            <div className="text-[#006AFF] font-semibold hover:underline">
                                Log in
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
