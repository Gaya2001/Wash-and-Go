import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../../components/CustomerDashboard/CustomerHeader';
import CustomerSideBar from '../../../components/CustomerDashboard/CustomerSideBar';

function DeleteProfile() {
    const [userData, setUserData] = useState(null);
    const [customerDetails, setCustomerDetails] = useState({
        user: {
            FirstName: '',
            LastName: '',
            Address: '',
            MobileNumber: '',
            NIC: '',
            Email: '',
            Password: '',
        },
    });
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function



    // Fetch session data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Session');
                if (response.data) {
                    setUserData(response.data);
                } else {
                    navigate("/Login"); // Redirect if userData is null
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate("/Login"); // Redirect in case of an error
            }
        };

        fetchUserData();
    }, [navigate]);




    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (userData) {
                const URL = `http://localhost:5000/AdminCustomers/${userData.userId}`;
                try {
                    const response = await axios.get(URL);
                    setCustomerDetails(response.data);
                    console.log('Customer details fetched:', response.data);
                } catch (error) {
                    console.error('Error fetching customer details:', error);
                }
            }
        };

        fetchCustomerDetails();
    }, [userData]);

    const handleSendOtp = async () => {
        if (!userData) return;

        try {
            const response = await axios.post('http://localhost:5000/SendCustomerOtp', { id: userData.userId });
            if (response.status === 200) {
                setOtpSent(true);
                setMessage("OTP sent to your email. Please enter it below.");
            } else {
                setMessage("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage("An error occurred while sending the OTP.");
        }
    };

    const handleDeleteAccount = async () => {
        if (!otp) {
            setMessage("Please enter the OTP sent to your email.");
            return;
        }

        try {
            // Send delete account request
            const response = await axios.delete(`http://localhost:5000/AdminCustomers/${userData.userId}`, {
                data: { otp }
            });

            if (response.status === 200) {
                setMessage("Account deleted successfully.");

                // Perform logout
                await axios.post('http://localhost:5000/logout', {}, {
                    withCredentials: true // include this if you are using cookies for session management
                });

                setTimeout(() => {
                    navigate('/'); // Redirect to Home after deletion
                }, 2000); // Delay to show success message before redirecting
            } else {
                setMessage("Failed to delete account. Please check your OTP.");
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            setMessage("An error occurred while deleting the account.");
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <CustomerSideBar />
            <div className="flex flex-col flex-grow">
                <CustomerHeader />
                <div className="p-8 flex-grow">
                    <div className="bg-gray-800 p-4 rounded-md shadow-lg flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            className="py-2 px-6 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                        >
                            Back
                        </button>
                        <h1 className="text-2xl text-white font-bold uppercase text-center w-full">Delete Profile</h1>
                    </div>

                    <div className="mt-6 bg-white border border-gray-300 rounded-lg shadow-lg p-5">
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to delete your account? Please enter the OTP sent to your email to confirm.
                        </p>

                        {/* Button to send OTP */}
                        {!otpSent && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleSendOtp}
                                    className="py-2 px-10 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    Send OTP
                                </button>
                            </div>
                        )}

                        {/* OTP Input */}
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full border border-gray-300 p-2 mt-4 rounded-lg"
                        />

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="py-2 px-10 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Confirm Delete
                            </button>
                        </div>

                        {message && (
                            <div className="flex justify-center mt-3">
                                <p className="text-red-500">{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProfile;
