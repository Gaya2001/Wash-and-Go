const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import your CheckoutController
const CheckoutController = require("./controllers/CheckoutController");

const app = express();

// Middleware
app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json());  // Replace bodyParser.json() with express built-in middleware

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Checkout', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define Routes
app.post('/checkout', CheckoutController.saveCheckout);  // POST endpoint for saving checkout
app.get('/checkout', CheckoutController.getCheckouts);    // GET endpoint for fetching checkouts

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
