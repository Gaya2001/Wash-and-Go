const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    apartment: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: String, // Use String to accommodate various formats
        required: true
    },
    optional: {
        type: String
    },
    cartItems: [
        {
            productId: String,
            productName: String,
            quantity: Number,
            price: Number
        }
    ]
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
