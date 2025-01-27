import React, { useEffect } from 'react';
import StoreSideNavBar from './../../../components/Dashboards/StoreSideNavBar';
import Header from './../../../components/Dashboards/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function StoreItemView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { itemData } = location.state || {}; // Retrieve passed item data, fallback to empty object if undefined

    useEffect(() => {
        if (!itemData) {
            // If itemData is not available, navigate back to StoreItem page
            navigate('/StoreItem');
        }
    }, 
    [itemData, navigate]);

    // Handle delete
    const handleItemDeleteClick = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete && itemData && itemData._id) {
            try {
                await axios.delete(`http://localhost:5000/ItemRoutes/${itemData._id}`);
                alert("Item deleted successfully");

                // Navigate to StoreItem page after successful deletion
                navigate('/StoreItem');
            } catch (error) {
                console.error("Error deleting item:", error);
                alert("Failed to delete item. Please try again.");
            }
        }
    };

    const handleItemUpdateClick = () => {
        navigate('/StoreItemUpdate', { state: { itemData } });
    };

    const handleItemBackClick = () => {
        navigate('/StoreItem');
    };

    // Avoid rendering if itemData is undefined or null
    if (!itemData) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Store navigation side bar */}
            <StoreSideNavBar />

            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <Header />

                <div className="flex-1 flex flex-col bg-gray-50">
                    <header className="flex items-center justify-center bg-white shadow-md px-6 h-16">
                        <h1 className="font-bold text-2xl">STORE ITEM DETAILS</h1>
                        <div className="flex items-center"></div>
                    </header>

                    <div className="justify-between bg-white shadow-md mt-10 border-2 border-gray-300">
                        <button className="bg-blue-100 text-blue-500 font-semibold py-2 h-full rounded-md focus:outline-none w-1/2 border-2 border-blue-100">
                            Item Details
                        </button>
                        <button className="text-green-500 font-semibold h-full py-2 rounded-md focus:outline-none w-1/2">Add Item</button>
                    </div>
                    <div>
                        {/* Form */}
                        <div className="bg-white border-2 border-gray-100 rounded-lg shadow-md mt-6 p-6 ">
                            <h2 className="text-center text-2xl font-bold mb-6 text-green-500">Store Item Details</h2>
                            <form className="flex flex-col space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-5 ml-6">
                                    <label className="block text-gray-700 font-semibold">Item Name</label>
                                    <p className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.name}
                                    </p>

                                    <label className="block text-gray-700 font-semibold">Brand</label>
                                    <p className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.brand}
                                    </p>

                                    <label className="block text-gray-700 font-semibold">Model Number</label>
                                    <p className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.model_number}
                                    </p>

                                    <label className="block text-gray-700 font-semibold">Dimensions</label>
                                    <div className="flex space-x-5">
                                        <div className="flex flex-col w-1/3">
                                        <label className="block text-gray-700 text-center font-semibold mb-3">Length</label>
                                        <p className="w-full border text-center border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.length}
                                        </p>
                                        </div>
                                        <div className="flex flex-col w-1/3">
                                        <label className="block text-gray-700 font-semibold text-center mb-3">Width</label>
                                        <p className="w-full border text-center border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.width}
                                        </p>
                                        </div>
                                        <div className="flex flex-col w-1/3">
                                        <label className="block text-gray-700 text-center font-semibold mb-3">Height</label>
                                        <p className="w-full border text-center border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.height}
                                        </p>
                                        </div>
                                    </div>
                                    <label className="block text-gray-700 font-semibold">Quantity</label>
                                    <p className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.quantity}
                                    </p>

                                    <label className="block text-gray-700 font-semibold">Price</label>
                                    <p className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.price}
                                    </p>

                                    <label className="block text-gray-700 font-semibold">Color</label>
                                    <p className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2">
                                        {itemData.color}
                                    </p>

                                    <div className="flex justify-between bg-white border-2 border-gray-300 shadow-md mt-10 h-14 py-2 px-4">
                                        <button
                                            onClick={handleItemBackClick}
                                            className="bg-blue-500 text-white rounded-md focus:outline-none h-full px-10"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleItemUpdateClick}
                                            className="bg-green-500 text-white rounded-md focus:outline-none h-full px-10"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={handleItemDeleteClick}
                                            className="bg-red-500 text-white rounded-md focus:outline-none h-full px-10 gap-5"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
