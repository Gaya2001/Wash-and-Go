import React, {useState} from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import StoreSideNavBar from '../../../components/Dashboards/StoreSideNavBar';
import Header from '../../../components/Dashboards/Header';
import axios from 'axios';

export default function StoreItemUpdate(){

    
const navigate = useNavigate(); // Initialize useNavigate
const location = useLocation(); // Get the current location
const { itemData } = location.state || {}; // Retrieve passed item data

if (!itemData) {
    return <div>No item data available.</div>; // Display an error or redirect
}

// Use state to hold the updated form values
const [updatedItem, setUpdatedItem] = useState({
    name: itemData.name,
    brand: itemData.brand,
    model_number: itemData.model_number,
    length: itemData.length,
    width: itemData.width,
    height: itemData.height,
    quantity: itemData.quantity,
    price: itemData.price,
    color: itemData.color,
});

// Handle input changes
const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prevItem) => ({ ...prevItem, [name]: value }));
};




// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(itemData._id)
    try {
        
        await axios.put(`http://localhost:5000/ItemRoutes/${itemData._id}`, updatedItem); // Update the item in the database
        navigate('/StoreItem'); // Redirect to StoreItem page after successful update
    } catch (error) {
        console.error('Error updating item:', error);
        alert('Failed to update item. Please try again.'); // Provide user feedback
    }
};

    return(

    <div className="flex h-screen overflow-hidden">
            {/*Store navigation side bar goes here */}
            <StoreSideNavBar/>

        <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Header goes here */}
            <Header/>

            <div className="flex-1 flex flex-col bg-gray-50">
                <header className="flex items-center justify-center bg-white shadow-md px-6 h-16">
                <h1 className="font-bold text-2xl">STORE ITEM DETAILS</h1>
                <div className="flex items-center">
                </div>
                </header>

                <div className="justify-between bg-white shadow-md mt-10  border-2 border-gray-300">
                    <button className="bg-blue-100 text-blue-500 font-semibold py-2 h-full rounded-md focus:outline-none w-1/2 border-2 border-blue-100">Item Details</button>
                    <button className=" text-green-500 font-semibold h-full py-2 rounded-md focus:outline-none w-1/2">Add Item</button>
                </div>
                <div>
                    {/*Form*/}
                    <div className="bg-white border-2 border-gray-100 rounded-lg shadow-md mt-6 p-6 ">
                        <h2 className="text-center text-2xl font-bold mb-6 text-green-500">Store Item Details</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-5 ml-6">

                                <label className="block text-gray-700 font-semibold">Item Name </label>
                                <input type="text" name="name" value={updatedItem.name} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>

                                <label className="block text-gray-700 font-semibold">Brand </label>
                                <input type="text" name="brand" value={updatedItem.brand} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>

                                <label className="block text-gray-700 font-semibold">Model Number </label>
                                <input type="text" name="model_number" value={updatedItem.model_number} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>

                                <label className="block text-gray-700 font-semibold">Dimensions </label>

                                <div className="flex space-x-5">
                                    <div className="flex flex-col w-1/3">
                                        <label htmlFor="length" className="font-semibold text-center text-gray-600 mb-3">Length</label>
                                        <input type="text" name="length" value={updatedItem.length} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>
                                    </div>

                                    <div className="flex flex-col w-1/3">
                                        <label htmlFor="width" className="font-semibold text-center text-gray-600 mb-3">Width</label>
                                        <input type="text" name="width" value={updatedItem.width} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>
                                    </div>

                                    <div className="flex flex-col w-1/3">
                                        <label htmlFor="height" className="font-semibold text-center text-gray-600 mb-3">Height</label>
                                        <input type="text" name="height" value={updatedItem.height} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>
                                    </div>
                                </div>

                                <label className="block text-gray-700 font-semibold">Quantity </label>
                                <input type="number" name="quantity" value={updatedItem.quantity} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>

                                <label className="block text-gray-700 font-semibold">Price </label>
                                <input type="text" name="price" value={updatedItem.price} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>

                                <label className="block text-gray-700 font-semibold">Color </label>
                                <input type="text" name="color" value={updatedItem.color} onChange={handleChange} className="w-full border border-gray-500 bg-gray-200 rounded-lg focus:outline-none px-4 py-2"/>
                                <div className="flex justify-between bg-white border-2 border-gray-300 shadow-md mt-10 h-14 py-2 px-4">
                                <button type="submit" className="bg-green-500 text-white rounded-md focus:outline-none h-full px-10">
                                Update
                                </button>
                                <button onClick={() => navigate('/StoreItem')} className="bg-blue-500 text-white rounded-md px-10 py-2">
                                Cancel
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