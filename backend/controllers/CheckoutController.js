const Checkout = require('../models/Checkout');

// Save checkout information
exports.saveCheckout = async (req, res) => {
    try {
        const { firstName, lastName, address, apartment, city, country, zipcode, optional, cartItems } = req.body;

        // Create a new checkout object and save it
        const newCheckout = new Checkout({
            firstName,
            lastName,
            address,
            apartment,
            city,
            country,
            zipcode,
            optional,
            cartItems
        });

        // Save to the database
        await newCheckout.save();

        // Send success response
        res.status(201).json({ message: 'Checkout information with cart items saved successfully!' });
    } catch (error) {
        // Send error response if something goes wrong
        res.status(500).json({ message: 'Error saving checkout information', error });
    }
};

// Get all checkout information
exports.getCheckouts = async (req, res) => {
    try {
        const checkouts = await Checkout.find();  // Fetch all checkout documents
        res.json(checkouts);  // Send the checkouts data as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving checkout information', error });
    }
};
