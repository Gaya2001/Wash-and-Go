import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SelectPayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const cartItems = location.state?.cartItems || [];
    const formData = location.state?.formData || {};

    const [paymentMethod, setPaymentMethod] = useState('');
    const [bankSlip, setBankSlip] = useState(null);
    const [errors, setErrors] = useState({
        paymentMethod: '',
        bankSlip: ''
    });
    const [orderConfirmed, setOrderConfirmed] = useState(false);  // To track order confirmation status

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        setErrors({ ...errors, paymentMethod: '' }); // Clear payment method error on change
    };

    const handleFileChange = (e) => {
        setBankSlip(e.target.files[0]);
        setErrors({ ...errors, bankSlip: '' }); // Clear bank slip error when file is selected
    };

    const handleContinueToConfirmation = () => {
        let formErrors = {};

        if (!paymentMethod) {
            formErrors.paymentMethod = 'Please select a payment method.';
        }

        if (paymentMethod === 'bankTransfer' && !bankSlip) {
            formErrors.bankSlip = 'Please upload a bank slip.';
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Set order confirmation status to true and show the message
        setOrderConfirmed(true);
    };

    const handleGoToCart = () => {
        navigate('/cart'); // Manually navigate to Cart page
    };

    return (


        <div className="w-full pt-2 mt-6 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>

            <div>
                <input
                    type="radio"
                    id="bankTransfer"
                    name="paymentMethod"
                    value="bankTransfer"
                    checked={paymentMethod === 'bankTransfer'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="bankTransfer" className="ml-2">Bank Transfer</label>
            </div>
            {paymentMethod === 'bankTransfer' && (
                <div className="mt-4">
                    <label className="block mb-2">Upload Bank Slip</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        className="w-full p-2 border rounded"
                    />
                    {bankSlip && <p className="mt-2 text-gray-700">File: {bankSlip.name}</p>}
                    {errors.bankSlip && <p className="text-red-600 text-sm mt-2">{errors.bankSlip}</p>}
                </div>
            )}

            <div className="mt-4">
                <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={handlePaymentMethodChange}
                />
                <label htmlFor="cashOnDelivery" className="ml-2">Cash on Delivery</label>
            </div>

            {errors.paymentMethod && <p className="text-red-600 text-sm mt-4">{errors.paymentMethod}</p>}

        </div>

    );
}

export default SelectPayment;
