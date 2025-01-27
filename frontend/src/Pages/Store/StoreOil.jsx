import React from 'react';
import { useNavigate } from 'react-router-dom';
import StoreNavBar from './../../components/NavBar/StoreNavbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/Dashboards/ProductCard';

const products = [
    { id: 1, imageUrl: 'Product1.png', title: 'Oil can 1', price: '$10', count: '10' },
    { id: 2, imageUrl: 'product2.jpg', title: 'Product 2', price: '$20', count: '10' },
    { id: 3, imageUrl: 'product3.jpg', title: 'Product 3', price: '$20', count: '10' },
    { id: 4, imageUrl: 'product4.jpg', title: 'Product 4', price: '$20', count: '10' },
    { id: 5, imageUrl: 'product5.jpg', title: 'Product 5', price: '$20', count: '10' },
    { id: 6, imageUrl: 'product6.jpg', title: 'Product 6', price: '$20', count: '10' },

    // Add more products as needed
];

const ProductGrid = () => {

    return(

    <div className="grid grid-cols-3 p-6 gap-6">
    {products.map(product => (
        <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            count={product.count}
                />
            ))}
        </div>
    );
}

export default function StoreOil(){

        const navigate = useNavigate();
    
        const handleSparePartClick = () => {
            navigate('/StoreSpareParts')
        };
    
        const handleDecorationClick = () => {
            navigate('/StoreDecorations')
        };

    return(
        <div className=" h-screen w-screen ">
            <StoreNavBar/>
            <div className="flex items-center justify-center mt-10 h-60  mx-20 bg-blue-500 
            rounded-lg border border-1 border-gray-200 shadow-md">
                    <h3 className="font-semibold text-3xl text-white">Enjoy free home delivery this summer</h3>
            </div>
            <div className="flex justify-start bg-white shadow-md mt-10 px-20 h-14 gap-8">
                <button className="bg-blue-500 text-white border-2 border-gray-300 rounded-md focus:outline-none h-full px-20">Oil</button>
                <button
                onClick = {handleDecorationClick}
                className="bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none h-full px-11">Decorations</button>
                <button 
                onClick = {handleSparePartClick}
                className="bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none h-full px-11">Spare Parts</button>
            </div>
            <div className="flex justify-center m-10">
                <div className="w-full max-w-6xl rounded-lg p-6 bg-gray-200">
                    <ProductGrid/>
                </div>
        </div>
        <Footer/>
        </div>
        );
    };

