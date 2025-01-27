import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideNavBar from '../../../components/Dashboards/SideNavBar';
import Header from '../../../components/Dashboards/Header';
import axios from 'axios';

export default function UpdatePackage() {
  const navigate = useNavigate();
  const { id } = useParams();// Get the package ID from the URL 
  console.log('Package ID from params:', id);  // Check if the ID is correct
 
  const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  const [formData, setFormData] = useState({
    id: '',
    PackageName: '',
    Description1: '',
    Description2: '',
    Price: 0,
    EstimatedTime: 0,
    Statues: 'Active'
  });

  const [serviceOptions, setServiceOptions] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch package details to pre-fill the form
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/packages/${id}`);
        if (response.status === 200 && response.data) {
          const packageData = response.data;

          // Ensure formData matches structure of fetched packageData
          setFormData({
            id: packageData.id || '',
            PackageName: packageData.PackageName || '',
            Description1: packageData.Description1 || '',
            Description2: packageData.Description2 || '',
            Price: packageData.Price || 0,
            EstimatedTime: packageData.EstimatedTime || 0,
            Statues: packageData.Statues || 'Active'
          });

          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
        setLoading(false); // Ensure loading is set to false in case of an error
      }
    };

    fetchPackageDetails();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for updating the package
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/packages/${id}`, formData);
      if (response.status === 200) {
        console.log('Package updated successfully:', response.data);
        navigate('/dash_packages');
      }
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  return (
    <div className="flex max-h-screen">
      <SideNavBar />

      <div className="h-screen flex-1 flex flex-col">
        <Header />

        <main className="h-1 flex-1 bg-gray-100">
          <div className="h-[700px] m-5 p-6 bg-gray-50 border-2 border-solid border-gray-300">
            <button
              className="px-2.5 py-1.5 bg-black text-white text-sm font-semibold rounded-md shadow-md absolute hover:bg-gray-700 hover:shadow-gray-700 hover:duration-300"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <div className='h-full bg-white px-32 p-5 w-4/5 overflow-y-auto mx-auto rounded-xl'>
              <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6 mx-auto">
                <h1 className='text-center font-bold text-2xl bg-gray-700 text-white rounded-lg p-2 mb-5'>UPDATE PACKAGE</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="PackageName" className="block text-sm font-semibold">Package Name</label>
                    <input
                      type="text"
                      name="PackageName"
                      id="PackageName"
                      value={formData.PackageName}
                      placeholder={formData.PackageName}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Description1" className="block text-sm font-semibold">Description 1</label>
                    <textarea
                      name="Description1"
                      id="Description1"
                      value={formData.Description1}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Description2" className="block text-sm font-semibold">Description 2</label>
                    <textarea
                      name="Description2"
                      id="Description2"
                      value={formData.Description2}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Price" className="block text-sm font-semibold">Price</label>
                    <input
                      type="number"
                      name="Price"
                      id="Price"
                      value={formData.Price}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="EstimatedTime" className="block text-sm font-semibold">Estimated Time (in hours)</label>
                    <input
                      type="number"
                      name="EstimatedTime"
                      id="EstimatedTime"
                      value={formData.EstimatedTime}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Statues" className="block text-sm font-semibold">Status</label>
                    <select
                      name="Statues"
                      id="Statues"
                      value={formData.Statues}
                      onChange={handleInputChange}
                      className="border border-gray-300 p-2 rounded w-full"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                  >
                    Update Package
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
