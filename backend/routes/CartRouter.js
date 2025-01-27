const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// Routes
router.get('/', CartController.fetchCartItems);
router.post('/', CartController.addToCart);
router.put('/:id', CartController.updateCartItem);
router.delete('/:id', CartController.removeCartItem);

module.exports = router;
