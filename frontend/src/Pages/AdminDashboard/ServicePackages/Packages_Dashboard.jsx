import React, { useState, useEffect } from 'react';
import SideNavBar from '../../../components/Dashboards/SideNavBar';
import Header from '../../../components/Dashboards/Header';
import ConfirmationPopup from "../../../components/Confirmations/PKGDeleteConfirm";
import SideNavLinks from "../../../components/Dashboards/SideNavLinks/SideNavLinks";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios if you use it for API calls

export default function PackagesDashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: "", id: "" });
  const [packages, setPackages] = useState([]);

  const navigate = useNavigate();

  // Fetch packages from backend
  useEffect(() => {
    fetch('http://localhost:5000/Packages')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log data to check structure
        setPackages(data.Packages || []);  // Adjusting for correct data structure
      })
      .catch(error => console.error('Error fetching packages:', error));
  }, []);

  const handleDeleteClick = (packageName, packageId) => {
    setSelectedPackage({ name: packageName, id: packageId });
    setIsPopupOpen(true);
  };

  const handleUpdateClick = (packageId) => {
    navigate(`/Packages/update/${packageId}`);
  };

  const handleConfirmDelete = () => {
    deleteHandler(selectedPackage.id); // Call deleteHandler with the package ID
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // ====================Delete Handler========================
  const deleteHandler = async (packageId) => {
    try {
      console.log("Deleting package with ID:", packageId); // Log the ID
      await axios.delete(`http://localhost:5000/Packages/${packageId}`);
      console.log("Package deleted successfully");
      // Update the package list after deletion
      setPackages(packages.filter(pkg => pkg._id !== packageId));
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error deleting package:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="flex max-h-screen">
      <SideNavBar />

      <div className="h-screen flex-1 flex flex-col">
        <Header />

        {/* Main Content Area */}
        <main className="h-screen flex-1 bg-gray-100">
          <div className='mt-10 bg-slate-500 text-center p-3 text-2xl font-bold'>
            <h1>SERVICE PACKAGES</h1>
          </div>
          <div className="h-5/6 m-5 px-6 pt-6 bg-gray-50 border-2 border-solid border-gray-300">
            <div>
              <button className="w-1/2 px-4 py-2 bg-gray-700 text-white font-semibold shadow-md">Package Details</button>
              <button className="w-1/2 px-4 py-2 bg-gray-500 text-white font-semibold shadow-md hover:bg-gray-600 hover:duration-300">
                <SideNavLinks linkName="Add Package" url="/packages/addpckg" />
              </button>
            </div>
            <div className='mt-5 h-[470px] overflow-y-scroll bg-gray-100 border-2 border-solid border-gray-300'>
              <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg table-auto">
                <thead className="bg-gray-400 sticky top-0">
                  <tr>
                    <th className="px-2 py-3 text-center font-bold text-black">Package ID</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Package Name</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Estimated Time</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Price</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Package Status</th>
                    <th className="py-3 text-center font-bold text-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg, index) => (
                    <tr key={pkg._id} className={`border-t border-gray-300 ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                      <td className="px-2 py-3 text-center text-black">{pkg.PackageID}</td>
                      <td className="px-2 py-3 text-center text-black">{pkg.PackageName}</td>
                      <td className="px-2 py-3 text-center text-black">{pkg.EstimatedTime} Hrs</td>
                      <td className="px-2 py-3 text-center text-black">RS {pkg.Price}</td>
                      <td className="px-2 py-3 text-black"><h1 className='h-fit w-fit flex mx-auto px-3 py-1 rounded-3xl bg-green-200'>{pkg.Statues}</h1></td>
                      <td className="text-center py-3 text-sm">
                        <button
                          onClick={() => handleUpdateClick(pkg._id)}
                          className="px-2 py-2 mr-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 hover:shadow-gray-700 hover:duration-300"
                        >
                          Update
                        </button>
                        <button
                          className="px-2 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 hover:shadow-gray-700 hover:duration-300"
                          onClick={() => handleDeleteClick(pkg.PackageName, pkg._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={isPopupOpen}
        packageName={selectedPackage.name}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
