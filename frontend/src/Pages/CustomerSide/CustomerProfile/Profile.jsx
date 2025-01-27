import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../../components/CustomerDashboard/CustomerHeader';
import CustomerSideBar from '../../../components/CustomerDashboard/CustomerSideBar';
import { Link } from 'react-router-dom';

function Profile() {
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
        }
    });
    const [image, setImage] = useState(null); // State to hold a single image
    const navigate = useNavigate(); // Initialize useNavigate

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

    // Fetch customer details when userData is available
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

    // Fetch images when userData is available
    useEffect(() => {
        const fetchImages = async () => {
            if (userData) {
                const imageUrl = `http://localhost:5000/ImageUploads?customerId=${userData.userId}`;
                try {
                    const response = await axios.get(imageUrl);
                    if (response.data.images && response.data.images.length > 0) {
                        setImage(response.data.images[0]);
                    } else {
                        console.log('No images found for this customer.');
                    }
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            }
        };

        fetchImages();
    }, [userData]);

    return (
        <div className="flex h-screen bg-gray-100">
            <CustomerSideBar />
            <div className="flex flex-col flex-grow">
                <CustomerHeader />
                <div className="p-8 flex-grow">

                    <div className="bg-gray-800 p-4 rounded-md shadow-lg flex justify-between items-center">
                        <h1 className="text-2xl text-white font-bold uppercase text-center w-full">Profile</h1>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 mt-3">
                        <div className="flex items-center mb-2 bg-[#DDEDF7] p-2 rounded-xl">
                            <img
                                src={image ? `http://localhost:5000/${image.imageUrl}` : 'https://www.skanlibrary.org/app/uploads/2018/12/mystery-person-300x300.png'}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-2 border-blue-500 mr-4"
                            />

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 uppercase">
                                    {customerDetails.user.FirstName} {customerDetails.user.LastName}
                                </h2>
                                <span className="text-gray-500">User</span>
                            </div>
                            <div className="ml-auto flex space-x-4">
                                <Link to="/EditProfile">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200">
                                        Edit
                                    </button>
                                </Link>
                                <Link to="/DeleteProfile">
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200">
                                        Delete Profile
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    value={`${customerDetails.user.FirstName} ${customerDetails.user.LastName}`}
                                    disabled
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={customerDetails.user.Email}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    disabled
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Contact No</label>
                                <input
                                    type="text"
                                    value={`${customerDetails.user.MobileNumber}`}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    disabled
                                />
                            </div>

                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">NIC Number</label>
                                <input
                                    type="text"
                                    value={customerDetails.user.NIC}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    disabled
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    value={customerDetails.user.Address}
                                    disabled
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={customerDetails.user.Password}
                                    disabled
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
