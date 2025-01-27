const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        default: 1,
    },
    ImageUrl: String, // This stores the URL of the product image
});


module.exports = mongoose.model('Cart', cartSchema);
