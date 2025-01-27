import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectPayment from '../Cart/SelectPayment';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const cartItems = location.state?.cartItems || [];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        country: '',
        zipcode: '',
        optional: ''
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        zipcode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.firstName) formErrors.firstName = 'First Name is required.';
        if (!formData.lastName) formErrors.lastName = 'Last Name is required.';
        if (!formData.address) formErrors.address = 'Address is required.';
        if (!formData.city) formErrors.city = 'City is required.';
        if (!formData.country) formErrors.country = 'Country is required.';
        if (!formData.zipcode) formErrors.zipcode = 'Zipcode is required.';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleContinueToShipping = () => {
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }
        navigate('/selectPayment', { state: { cartItems, formData } });
    };

    return (

        <div className="bg-cyan-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col lg:flex-row justify-between items-start">
                    {/* Shipping Information Form */}
                    <div className="w-full lg:w-1/2 p-6 border rounded-lg shadow-md bg-white">
                        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
                        <form className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                    {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
                                </div>
                                <div className="w-1/2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                    {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="apartment"
                                    placeholder="Apartment, suite, etc (optional)"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <div className="w-1/3">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                    {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
                                </div>
                                <div className="w-1/3">
                                    <input
                                        type="text"
                                        name="zipcode"
                                        placeholder="Zipcode"
                                        value={formData.zipcode}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                    {errors.zipcode && <p className="text-red-600 text-sm">{errors.zipcode}</p>}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full p-3 bg-black text-white rounded mt-4 hover:bg-gray-800"
                                onClick={handleContinueToShipping}
                            >
                                Continue to shipping
                            </button>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/2 p-6  mt-10 lg:mt-0 lg:ml-10 border rounded-lg shadow-md bg-white">
                        {/* Cart Items Section */}
                        <div className="p-4 border rounded-lg shadow-md bg-white">
                            <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div className="flex items-center mb-6 border-b pb-4" key={item._id}>
                                        <img
                                            src={item.ImageUrl || 'defaultImage.png'}
                                            alt={item.ProductName}
                                            className="w-24 h-24 object-contain mr-6"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{item.ProductName}</h3>
                                            <p>Quantity: {item.Quantity}</p>
                                            <p className="font-semibold">LKR {item.Price}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <p>Subtotal</p>
                                    <p>LKR {cartItems.reduce((total, item) => total + (item.Price * item.Quantity), 0)}</p>
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <p>Total</p>
                                    <p>LKR {cartItems.reduce((total, item) => total + (item.Price * item.Quantity), 0)}</p>
                                </div>
                            </div>
                        </div>
                        <SelectPayment />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
