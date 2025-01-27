const Cart = require('../models/Cart'); // Import the Cart model

// Get all items in the cart (backend logic)
const fetchCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find(); // Fetch all cart items from the database
        res.status(200).json(cartItems); // Send the fetched data as JSON to the client
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    const { name, quantity, price, imageUrl } = req.body; // include imageUrl in the request body
    try {
        const cartItem = new Cart({
            name,
            quantity,
            price,
            ImageUrl: imageUrl, // Save the image URL
        });
        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
};


// Update item quantity in the cart
const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const updatedItem = await Cart.findByIdAndUpdate(
            req.params.id,
            { quantity, updatedAt: Date.now() },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart item' });
    }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove cart item' });
    }
};

// Export all functions
module.exports = {
    fetchCartItems,
    addToCart,
    updateCartItem,
    removeCartItem,
};
