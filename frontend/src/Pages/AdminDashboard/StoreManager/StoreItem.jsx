import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import StoreSideNavBar from './../../../components/Dashboards/StoreSideNavBar';
import Header from './../../../components/Dashboards/Header';

export default function StoreItem() {

  const navigate = useNavigate(); // Initialize useNavigate
  const [items, setItems] = useState([]); // Store items in state

  const handleAddItemClick = () => {
    navigate('/AddItem'); // Navigate to AddItem page
  };

  const handleSeeMore = (item) => {
    navigate('/StoreItemView', { state: { itemData: item } }); // Pass the selected item data to the StoreItemView page
  };

  const URL = "http://localhost:5000/ItemRoutes";

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      console.log("Fetched data :",response.data); // Log the response data to check its structure
      setItems(response.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <StoreSideNavBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col bg-gray-50">
          <header className="flex items-center justify-center bg-white shadow-md px-6 h-16">
            <h1 className="font-bold text-2xl">STORE ITEM DETAILS</h1>
          </header>

          <div className="justify-between bg-white shadow-md mt-10">
            <button className="bg-blue-100 text-blue-500 font-semibold py-2 h-full rounded-t-md focus:outline-none w-1/2">Item Details</button>
            <button
              onClick={handleAddItemClick}
              className="text-green-500 font-semibold py-2 px-4 h-full rounded-t-md focus:outline-none w-1/2">Add Item
            </button>
          </div>

          <div className="flex-1 p-6 overflow-auto mt-6">
            <div className="bg-white rounded-lg shadow-md p-4 overflow-y-scroll h-[480px]">
              <table className="min-w-full bg-white table-auto">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-4 border-gray-300">Name</th>
                    <th className="text-left py-2 px-4 border-4 border-gray-300">model</th>
                    <th className="text-left py-2 px-4 border-4 border-gray-300">Brand</th>
                    <th className="text-left py-2 px-4 border-4 border-gray-300">Price</th>
                    <th className="text-left py-2 px-4 border-4 border-gray-300">Quantity</th>
                    <th className="text-left py-2 px-4 border-4 border-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { items &&
                    items.length > 0 ? (items.map ((item) => (
                      <tr key = {item._id} >
                              <td className="py-2 px-4 border-4 border-gray-300">{item.name}</td>
                              <td className="py-2 px-4 border-4 border-gray-300">{item.model_number}</td>
                              <td className="py-2 px-4 border-4 border-gray-300">{item.brand}</td>
                              <td className="py-2 px-4 border-4 border-gray-300">{item.price}</td>
                              <td className="py-2 px-4 border-4 border-gray-300">{item.quantity}</td>   
                              <td className="py-2 px-4 border-4 border-gray-300">
                                        <button
                                              onClick={() => handleSeeMore(item)}
                                              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">See More
                                        </button>
                              </td>
                      </tr>
                    ))
                  ) :(
                    <tr>
                      <td colSpan="6" className="text-center py-4 border-2 border-gray-300">No items found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

