import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerHeader from '../../../components/CustomerDashboard/CustomerHeader';
import CustomerSideBar from '../../../components/CustomerDashboard/CustomerSideBar';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const [profileImage, setProfileImage] = useState(""); // Holds the image URL
    const [imageFile, setImageFile] = useState(null);
    const [userData, setUserData] = useState(null);
    const [input, setInput] = useState({
        FirstName: '',
        LastName: '',
        Address: '',
        MobileNumber: '',
        NIC: '',
        Email: '',
        Password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Preview the image immediately
            setImageFile(file);
        }
    };

    const handleSaveImage = async () => {
        if (!imageFile) return;
        const formData = new FormData();
        formData.append('image', imageFile); // Match the backend field name
        formData.append('customerId', userData.userId); // Pass customer ID as required by the backend

        try {
            const response = await axios.post('http://localhost:5000/ImageUploads/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Construct the full URL
            const fullImageUrl = `http://localhost:5000/${response.data.savedImage.imageUrl}`;
            setProfileImage(fullImageUrl); // Update with the full URL
            console.log('Profile image URL:', fullImageUrl); // Log the full image URL
            alert('Profile image saved successfully!');

            // Refresh the page after successful upload
            window.location.reload();
        } catch (error) {
            console.error('Error saving image:', error);
            alert('Failed to save profile image.');
        }
    };


    const handleBack = () => {
        navigate(-1);
    };

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

    // Fetch user profile details
    useEffect(() => {
        if (userData) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/AdminCustomers/${userData.userId}`);
                    setInput(response.data.user);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };

            fetchUser();
        }
    }, [userData]);

    const validateForm = () => {
        const newErrors = {};

        if (!input.FirstName.trim()) {
            newErrors.FirstName = "First name is required.";
        }

        if (!input.LastName.trim()) {
            newErrors.LastName = "Last name is required.";
        }

        if (!input.Email) {
            newErrors.Email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(input.Email)) {
            newErrors.Email = "Email address is invalid.";
        }

        if (!input.MobileNumber) {
            newErrors.MobileNumber = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(input.MobileNumber)) {
            newErrors.MobileNumber = "Mobile number must be 10 digits.";
        }

        if (!input.NIC.trim()) {
            newErrors.NIC = "NIC number is required.";
        }

        if (!input.Address.trim()) {
            newErrors.Address = "Address is required.";
        }

        if (!input.Password) {
            newErrors.Password = "Password is required.";
        } else if (input.Password.length < 6) {
            newErrors.Password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/AdminCustomers/${userData.userId}`, {
                FirstName: String(input.FirstName),
                LastName: String(input.LastName),
                Address: String(input.Address),
                MobileNumber: String(input.MobileNumber),
                NIC: String(input.NIC),
                Email: String(input.Email),
                Password: String(input.Password),
            });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await sendRequest();
            navigate("/Profile");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <CustomerSideBar />
            <div className="flex flex-col flex-grow">
                <CustomerHeader />
                <main className="flex-1 flex flex-col p-5 overflow-y-auto">
                    <div className="bg-gray-800 text-center p-4 rounded-md shadow-lg flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            className="py-2 px-6 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                        >
                            Back
                        </button>
                        <h1 className="text-2xl text-white font-bold uppercase">Edit Profile</h1>
                        <div className="w-24" />
                    </div>

                    <div className="mt-4 bg-white border border-gray-300 rounded-lg shadow-lg p-5">
                        <div className="flex flex-col md:flex-row items-center  bg-[#DDEDF7] p-2 mb-3 rounded-xl">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/000/420/353/original/vector-upload-icon.jpg"
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4   mr-4"
                            />
                            <div className="flex flex-col items-start ml-4  ">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="profileImageUpload"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="profileImageUpload"
                                    className="cursor-pointer text-blue-500 hover:underline mb-2"
                                >
                                    Add Image to Profile
                                </label>

                                <button
                                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 shadow-md"
                                    onClick={handleSaveImage}
                                >
                                    Save Profile Image
                                </button>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6  " onSubmit={handleSubmit}>
                            <div className="col-span-1">
                                <label className="block text-gray-700 font-semibold">First Name</label>
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={input.FirstName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                                    placeholder="Enter first name"
                                />
                                {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 font-semibold">Last Name</label>
                                <input
                                    type="text"
                                    name="LastName"
                                    value={input.LastName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                                    placeholder="Enter last name"
                                />
                                {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 font-semibold">Email Address</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={input.Email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                                    placeholder="Enter email"
                                />
                                {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 font-semibold">Contact No</label>
                                <input
                                    type="text"
                                    name="MobileNumber"
                                    value={input.MobileNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                                    placeholder="Enter contact number"
                                />
                                {errors.MobileNumber && <p className="text-red-500 text-sm">{errors.MobileNumber}</p>}
                            </div>


                            <div className="col-span-1">
                                <label className="block text-gray-700 font-semibold">NIC</label>
                                <input
                                    type="text"
                                    name="NIC"
                                    value={input.NIC}
                                    disabled
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg "
                                    placeholder="Enter NIC"
                                />
                                {errors.NIC && <p className="text-red-500 text-sm">{errors.NIC}</p>}
                            </div>

                            <div className="col-span-1">
                                <label className="block text-gray-700 font-semibold">Address</label>
                                <input
                                    type="text"
                                    name="Address"
                                    value={input.Address}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                                    placeholder="Enter address"
                                />
                                {errors.Address && <p className="text-red-500 text-sm">{errors.Address}</p>}
                            </div>

                            <div className="col-span-2">
                                <label className="block text-gray-700 font-semibold">Password</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={input.Password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 mt-1 rounded-lg"
                                    placeholder="Enter password"
                                />
                                {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
                            </div>
                            <div className='w-full flex justify-center col-span-2'>
                                <button
                                    type="submit"
                                    className="py-2 px-10 bg-blue-500 text-white font-semibold rounded-sm hover:bg-blue-600 transition duration-300"
                                >
                                    Update Profile
                                </button>
                            </div>


                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default EditProfile;
