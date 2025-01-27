import React, { useEffect, useState } from "react";
import profile from '../../assets/Dashboard/Profile.png';
import { FaBell } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaHome } from "react-icons/fa"; // Import Home icon
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function CustomerHeader() {
    const [image, setImage] = useState(null); // State to hold a single image
    const [menuOpen, setMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    // Fetch session data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Session');
                setUserData(response.data);
                console.log('User data fetched:', response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Logout
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/logout', {}, {
                withCredentials: true // include this if you are using cookies for session management
            });
            console.log(response.data.message); // Handle the successful logout message

            // Navigate to the login page after successful logout
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
            // Optionally, handle error state
        }
    };

    // Fetch images when userData is available
    useEffect(() => {
        const fetchImages = async () => {
            if (userData) {
                const imageUrl = `http://localhost:5000/ImageUploads?customerId=${userData.userId}`;
                try {
                    const response = await axios.get(imageUrl);
                    console.log('Fetched images response:', response.data.images);

                    // Check if an image exists and set it to state
                    if (response.data.images && response.data.images.length > 0) {
                        setImage(response.data.images[0]); // Set the first image object
                        console.log('Image URL:', response.data.images[0].imageUrl); // Log the image URL
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
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Link to="/">
                    <button

                        className="flex items-center text-gray-700 hover:text-gray-900"
                    >
                        <FaHome className="h-6 w-6" />
                        <span className="ml-1">Home</span>
                    </button>
                </Link>
            </div>

            <div className="flex items-center space-x-4 h-full bg-white relative z-10">
                <span className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-black hover:duration-500">
                    <FaBell className="ms-2.5 mt-2.5 h-5 w-5" />
                </span>
                <span className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-black hover:duration-500">
                    <IoMdMail className="ms-2 mt-2 h-6 w-6" />
                </span>
                <img
                    src={image ? `http://localhost:5000/${image.imageUrl}` : 'https://www.skanlibrary.org/app/uploads/2018/12/mystery-person-300x300.png'} // Constructing the image URL from the backend
                    alt="Profile"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-black hover:duration-500"
                />
                {userData && (
                    <span className="text-gray-700 font-bold">{userData.Fname} {userData.Lname}</span>
                )}
            </div>
            {menuOpen && (
                <div className="fixed right-[9%] bg-black hover:shadow-sm hover:shadow-black text-white duration-300 mt-24 z-[10]">
                    <button
                        onClick={handleLogout}
                        className="border py-1 px-3 font-bold hover:bg-red-600 duration-200"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </header>
    );
}

export default CustomerHeader;
