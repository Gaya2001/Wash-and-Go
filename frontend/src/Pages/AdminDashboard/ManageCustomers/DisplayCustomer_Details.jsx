import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmationPopup from "../../../components/Confirmations/CusDeleteConfirm";
import SideNavLinks from "../../../components/Dashboards/SideNavLinks/SideNavLinks";


function DisplayCustomer_Details({ user, index, onDelete }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedCus, setSelectedCus] = useState("");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();


    // Fetch session data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Session');
                console.log(response.data);

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



    const handleDeleteClick = (cusName) => {
        setSelectedCus(cusName);
        setIsPopupOpen(true);
    };

    const handleConfirmDelete = async () => {
        await deleteHandler();
        setIsPopupOpen(false);
        onDelete(); // Notify parent component to refetch or update the list
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const deleteHandler = async () => {
        try {
            console.log("Deleting user with ID:", user._id); // Log the ID
            await axios.delete(`http://localhost:5000/AdminCustomers/${user._id}`);
            console.log("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        }
    };

    const { _id, FirstName, LastName, Address, MobileNumber, NIC, Email } = user;


    const [image, setImage] = useState(null); // State to hold a single image

    // Fetch images when userData is available

    useEffect(() => {
        const fetchImages = async () => {
            if (_id) {
                const imageUrl = `http://localhost:5000/ImageUploads?customerId=${_id}`;
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
    }, [_id]);



    return (
        <>
            <tr

                key={_id}
                className={`border-t border-gray-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                    hover:bg-gray-200 active:bg-gray-300 transition duration-300 ease-in-out`}

            >
                <td>
                    <img
                        src={image ? `http://localhost:5000/${image.imageUrl}` : 'https://www.skanlibrary.org/app/uploads/2018/12/mystery-person-300x300.png'} // Constructing the image URL from the backend
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-2 border-blue-500  ml-4"
                    />
                </td>
                <td className="px-2 py-4 text-center text-black">{FirstName} {LastName}</td>
                <td className="px-2 py-4 text-center text-black">{Address}</td>
                <td className="px-2 py-4 text-center text-black">{MobileNumber}</td>
                <td className="px-2 py-4 text-center text-black">{NIC}</td>
                <td className="px-2 py-4 text-center text-black">{Email}</td>
                <td className="text-center py-4 text-sm">
                    <Link to={`/cus_details_update/${_id}`}>
                        <button className="h-[40px] w-[70px] bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 hover:shadow-gray-700 transition duration-300">
                            Update
                        </button>
                    </Link>

                    <button
                        className="h-[40px] w-[70px] my-1 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 hover:shadow-gray-700 transition duration-300"
                        onClick={() => handleDeleteClick(`${FirstName} ${LastName}`)}
                    >
                        Delete
                    </button>
                </td>
            </tr>

            {isPopupOpen && (
                <ConfirmationPopup
                    isOpen={isPopupOpen}
                    cusName={selectedCus}
                    onClose={handleClosePopup}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
}


export default DisplayCustomer_Details;
