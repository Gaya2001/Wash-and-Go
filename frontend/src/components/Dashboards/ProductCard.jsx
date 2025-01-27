import React from 'react';

const ProductCard = ({ imageUrl, title, price,count }) => {
    return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img className="w-full" src={imageUrl} alt={title} />
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base text-left">{price}</p>
        <p className="text-black text-base text-left">{count}</p>
            </div>
        <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ADD TO CART
        </button>
        </div>
    </div>
    );
};

export default ProductCard;
