import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../../../components/Dashboards/SideNavBar';
import Header from '../../../components/Dashboards/Header';
import axios from 'axios';

export default function AddPackage() {
  const navigate = useNavigate();
  const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  const [formData, setFormData] = useState({
    PackageName: '',
    Description1: '',
    Description2: '',
    Price: 0,
    EstimatedTime: 0,
    Statues: 'Active',
    services: [{ id: '', service: '' }],
    images: [{ preview: '', url: '' }, { preview: '', url: '' }, { preview: '', url: '' }, { preview: '', url: '' }]
  });

  const [serviceOptions, setServiceOptions] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        if (Array.isArray(response.data)) {
          setServiceOptions(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (index, event) => {
    const value = event.target.value;
    const services = [...formData.services];
    services[index] = { id: value, service: value }; // Store the service ID in both id and service fields
    setFormData({ ...formData, services });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { id: '', service: '' }]
    });
  };

  const deleteService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: updatedServices });
  };

  const handleImageButtonClick = (index) => {
    fileInputRefs.current[index].current.click();
  };

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const updatedImages = [...formData.images];
      updatedImages[index] = { preview, url: updatedImages[index].url };
      setFormData({ ...formData, images: updatedImages });

      // Upload the file to the server
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      try {
        const res = await axios.post('http://localhost:5000/upload', uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedImages[index].url = res.data.filePath;
        setFormData({ ...formData, images: updatedImages });
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/packages', formData);
      if (response.status === 200) {
        console.log('Package added successfully:', response.data);
        alert('Package added successfully:', response.data);
        navigate('/dash_packages');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ', error);
    }
  };

  return (
    <div className="flex max-h-screen">
      <SideNavBar />

      <div className="h-screen flex-1 flex flex-col">
        <Header />

        <main className="h-1 flex-1 bg-gray-100">
          <div className="h-[700px] m-5 bg-gray-50 border-2 border-solid border-gray-300">
          <button
              className="px-2.5 py-1.5 ms-8 mt-8 bg-black text-white text-sm font-semibold rounded-md shadow-md absolute hover:bg-gray-700 hover:shadow-gray-700 hover:duration-300"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            
            <div className='h-full bg-white px-40 py-12 w-full overflow-y-auto mx-auto rounded-xl'>
            
              <div className="w-full bg-teal-100 p-10 rounded-lg shadow-xl mb-6 mx-auto border-gray-200 border-2">
                <h1 className='text-center font-bold text-2xl bg-gray-700 text-white rounded-lg p-2 mb-5'>ADD NEW PACKAGE</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="PackageName" className="block font-semibold mb-2">Package Name</label>
                    <input
                      type="text"
                      name="PackageName"
                      placeholder="Enter package name"
                      id="PackageName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.PackageName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Description1" className="block font-semibold mb-2">Package Description 1</label>
                    <textarea
                      name="Description1"
                      placeholder="Enter first description"
                      id="Description1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.Description1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Description2" className="block font-semibold mb-2">Package Description 2</label>
                    <textarea
                      name="Description2"
                      placeholder="Enter second description"
                      id="Description2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.Description2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="Price" className="block font-semibold mb-2">Price</label>
                    <input
                      type="number"
                      name="Price"
                      placeholder="Enter package price"
                      id="Price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.Price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="EstimatedTime" className="block font-semibold mb-2">Estimated Time</label>
                    <input
                      type="number"
                      name="EstimatedTime"
                      placeholder="Enter estimated time"
                      id="EstimatedTime"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.EstimatedTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="services" className="block font-semibold mb-2">Services</label>
                    {formData.services.map((service, index) => (
                      <div key={index} className="mb-2 flex gap-3 items-center">
                        <select
                          name="service"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={service.id}
                          onChange={(event) => handleServiceChange(index, event)}
                          required
                        >
                          <option value="" disabled>Select a service</option>
                          {serviceOptions.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => deleteService(index)}
                          className="text-red-500 hover:text-red-700 hover:duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addService}
                      className="text-green-500 hover:text-green-700 hover:duration-300"
                    >
                      + Add Service
                    </button>
                  </div>

                  {/* Add image inputs */}
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Images</label>
                    <div className='grid-cols-2 grid-rows-2 flex'>

                    
                    {formData.images.map((image, index) => (
                      <div key={index} className="mb-2 gap-3 items-center">
                        <input
                          type="file"
                          ref={fileInputRefs.current[index]}
                          onChange={(e) => handleFileChange(e, index)}
                          style={{ display: 'none' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleImageButtonClick(index)}
                          className="w-32 me-20 bg-green-700 text-white py-1 px-1 rounded-xl hover:bg-green-500 transition duration-300 transform hover:scale-105 gap-4 font-semibold"
                        >
                          Upload Image {index + 1}
                        </button>
                        {image.preview && (
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-32 h-20 object-cover rounded-md ms-3 mt-2"
                          />
                        )}
                      </div>
                    ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-3 py-2.5 bg-black text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-700 hover:shadow-gray-700 hover:duration-300"
                    >
                      Add Package
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
