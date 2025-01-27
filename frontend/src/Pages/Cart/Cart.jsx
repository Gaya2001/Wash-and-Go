import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StoreNavbar from '../../components/NavBar/StoreNavbar';
import Footer from '../../components/Footer/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart'); // Adjust the URL as necessary
        setCartItems(response.data); // Assuming response.data is the array of cart items from your MongoDB
      } catch (error) {
        setError('Failed to fetch cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleCart = async () => {
    // Redirect to the checkout page
    navigate('/checkout', { state: { cartItems } });
  }

  const updateQuantity = async (id, delta) => {
    // Update cart quantity logic
    try {
      const updatedCart = cartItems.map((item) =>
        item._id === id
          ? { ...item, Quantity: item.Quantity + delta }
          : item
      );
      setCartItems(updatedCart);

      // Make a request to update the backend (if necessary)
      await axios.put(`http://localhost:5000/api/cart/${id}`, {
        Quantity: updatedCart.find((item) => item._id === id).Quantity,
      });
    } catch (error) {
      setError('Failed to update cart item.');
    }
  };

  const removeItem = async (id) => {
    try {
      // Remove the item from the cart
      setCartItems(cartItems.filter((item) => item._id !== id));

      // Make a request to remove the item from the backend
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
    } catch (error) {
      setError('Failed to remove item from cart.');
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <StoreNavbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-10">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-6 bg-gray-100 rounded-lg shadow-md">
                <img
                  src={item.ImageUrl}
                  alt={item.ProductName}
                  className="w-24 h-24 object-cover mr-6"
                /> {/* Display image */}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{item.ProductName}</h3>
                  <p>Price: ${item.Price}</p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      disabled={item.Quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-4">{item.Quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      disabled={item.Quantity >= 10} // Assuming max quantity is 10
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 ml-6"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center">Order Summary</h2>
          <p className="text-lg mt-4">Subtotal: ${getTotal().toFixed(2)}</p>
          <button className="w-full mt-6 px-4 py-3 bg-green-500 text-white text-lg rounded-md hover:bg-green-600" onClick={() => handleCart()}>
            Continue to checkout
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
