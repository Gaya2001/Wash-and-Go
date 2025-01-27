import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../../components/NavBar/HomeNavbar';
import Footer from '../../components/Footer/Footer';

const StoreSpareParts = () => {
    const [items, setItems] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        fetch('http://localhost:5000/ItemRoutes/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch Items: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data); // Debugging message to see the structure of the response
                setItems(data.items || []); // Ensure the packages are always an array
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error); // Log the error to the console
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleOilClick = () => {
        navigate('/StoreOil');
    };

    const handleDecorationClick = () => {
        navigate('/StoreDecorations');
    };


    return (
        <div>
            <HomeNavbar />
            <div>
                <h1 className='w-full text-center mt-20 font-bold text-4xl'>Store Items</h1>
            </div>
            <div className="flex items-center justify-center mt-10 h-60 mx-20 bg-blue-500 rounded-lg border border-1 border-gray-200 shadow-md">
                <h3 className="font-semibold text-3xl text-white">Enjoy free home delivery this summer</h3>
            </div>
            <div className="flex justify-start bg-white shadow-md mt-10 px-20 h-14 gap-8">
                <button onClick={handleOilClick} className="bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none h-full px-20">Oil</button>
                <button onClick={handleDecorationClick} className="bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none h-full px-11">Decorations</button>
                <button className="bg-blue-500 text-white border-2 border-gray-300 rounded-md focus:outline-none h-full px-11">Spare Parts</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mx-16 p-16 h-fit my-12 rounded-2xl bg-blue-100">
                {items.length > 0 ? (
                    items.map((itm) => (
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl flex justify-center">
                            <div className="p-6">
                                {itm.images && itm.images.length > 0 && (
                                    <img src={`http://localhost:5000${itm.images[0].url}`} alt={itm.name} className="w-full h-48 object-cover mb-4" />
                                )}
                                <h3 className="text-2xl font-bold mb-2 text-gray-800">{itm.name}</h3>
                                <p className="text-gray-600 mb-4">{itm.quantity}</p>
                                <p className="text-gray-600 mb-4">RS: {itm.price}</p>
                                <button className="bg-blue-500 mb-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    ADD TO CART
                                </button>
                            </div>
                            
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default StoreSpareParts;
