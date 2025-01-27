import axios from "axios";
import React, { useState, useEffect } from "react";
import CustomerNavLink from "../Dashboards/SideNavLinks/CustomerNavLink";

function CustomerSideBar() {
    const [image, setImage] = useState(null); // State to hold a single image
    const [userData, setUserData] = useState(null);
    const [customerDetails, setCustomerDetails] = useState({
        user: {
            FirstName: "",
            LastName: "",
            Address: "",
            MobileNumber: "",
            NIC: "",
            Email: "",
            Password: "",
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Session");
                setUserData(response.data);
                console.log("User data fetched:", response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (userData) {
                const URL = `http://localhost:5000/AdminCustomers/${userData.userId}`;
                try {
                    const response = await axios.get(URL);
                    setCustomerDetails(response.data);
                    console.log("Customer details fetched:", response.data);
                } catch (error) {
                    console.error("Error fetching customer details:", error);
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
        <div className="w-1/5 h-screens bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center pt-8 shadow-lg">
            <img
                src={image ? `http://localhost:5000/${image.imageUrl}` : 'https://www.skanlibrary.org/app/uploads/2018/12/mystery-person-300x300.png'} // Constructing the image URL from the backend
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-green-500 p-1 mb-4 shadow-lg"
            />
            <h2 className="text-xl font-semibold uppercase mb-1">
                {customerDetails.user.LastName}
            </h2>
            <span className="text-sm text-gray-400 mb-6">User</span>

            <nav className="w-full flex flex-col text-center font-bold">
                <CustomerNavLink linkName="PROFILE" url="/profile" />
                <CustomerNavLink linkName="RESERVATIONS" url="/profile_reservation" />
                <CustomerNavLink linkName="RECOVERY" url="/recovery" />
            </nav>
        </div>
    );
}

export default CustomerSideBar;
