import React, { useState, useRef, useEffect } from 'react';
import HomeNavbar from '../../../components/NavBar/HomeNavbar';
import Footer from '../../../components/Footer/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUpload, faTrashAlt, faDollarSign, faTools } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppointmentCheckoutPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const [selectedOption, setSelectedOption] = useState('');

  // State for all form data
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    manufactureDate: null,
    vehicleModel: '',
    vehicleMake: '',
    licensePlate: '',
    appointmentDate: null,
    selectedTimeSlot: null,
    servicePackage: '', 
    additionalRequests: '',
    selectedOption: '',
    images: [{ preview: '', url: '' }]
  });

  const [errors, setErrors] = useState({});

  // Fetch packages from the backend on mount
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/Packages');
        setPackages(response.data.Packages || []);
      } catch (error) {
        setError('Failed to fetch packages');
      } finally {
        setLoading(false);
      }
      
    };
    fetchPackages();
  }, []);

    // Form validation function
    const validateForm = () => {
      let formErrors = {};
      let isValid = true;
  
      if (!formData.name) {
        formErrors.name = 'Name is required';
        isValid = false;
      }
  
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
        formErrors.phoneNumber = 'A valid phone number is required (10 digits)';
        isValid = false;
      }
  
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        formErrors.email = 'A valid email is required';
        isValid = false;
      }
  
      if (!formData.address) {
        formErrors.address = 'Address is required';
        isValid = false;
      }
  
      if (!formData.vehicleModel) {
        formErrors.vehicleModel = 'Vehicle model is required';
        isValid = false;
      }
  
      if (!formData.vehicleMake) {
        formErrors.vehicleMake = 'Vehicle make is required';
        isValid = false;
      }
  
      if (!formData.manufactureDate) {
        formErrors.manufactureDate = 'Year of manufacture is required';
        isValid = false;
      }
  
      if (!formData.licensePlate) {
        formErrors.licensePlate = 'License plate is required';
        isValid = false;
      }
  
      if (!formData.appointmentDate) {
        formErrors.appointmentDate = 'Appointment date is required';
        isValid = false;
      }
  
      if (!formData.selectedTimeSlot) {
        formErrors.selectedTimeSlot = 'Please select a time slot';
        isValid = false;
      }
  
      if (!formData.servicePackage) {
        formErrors.servicePackage = 'Please select a service package';
        isValid = false;
      }
  
      if (!formData.selectedOption) {
        formErrors.paymentOption = 'Please select a payment method';
        isValid = false;
      }
  
      setErrors(formErrors);
      return isValid;
    };


     // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    try {
      const response = await axios.post('http://localhost:5000/appointment/appointments', formData);
      alert('Appointment added successfully');
      navigate('/profile_reservation');

    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Error submitting appointment');
    }
  };

  // Handle input change for personal details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle package selection change
  const handlePackageChange = (e) => {
    setFormData({ ...formData, servicePackage: e.target.value });
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    if (/^\d{0,10}$/.test(input)) {
      setFormData({
        ...formData,
        phoneNumber: input,
      });
    }
  };

  // Handle time slot selection
  const handleTimeSlotClick = (slot) => {
    setFormData({ ...formData, selectedTimeSlot: slot });
    setErrors((prevErrors) => ({ ...prevErrors, selectedTimeSlot: null }));
  };

  // Handle payment option change
  const handleOptionChange = (option) => {
    setFormData({ ...formData, selectedOption: option, filePreview: null });
    setErrors({ ...errors, paymentOption: '' });
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

  // Handle file delete
const handleDeleteFile = () => {
  setFormData({ ...formData, filePreview: null });
};

const handleImageButtonClick = (index) => {
  fileInputRefs.current[index].current.click();
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <HomeNavbar />

      {/* Form Section */}
      <div className="flex flex-col items-center mt-10 mb-20">
        <h2 className="text-2xl text-red-500 font-bold mb-2">Let’s start with your Personal, Vehicle, and Booking Details</h2>
        <p className="text-gray-500 mb-8">Fill the following text fields with your personal, vehicle, and booking details</p>

        <form className="w-1/2 bg-blue-50 p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold text-red-500 mb-4">Personal Details</h3>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handlePhoneNumberChange}
            className={`w-full px-3 py-2 border rounded ${errors.phoneNumber ? 'border-red-500' : ''}`}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
              placeholder="Enter your address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Vehicle Details */}
          <h3 className="text-lg font-bold text-red-500 mb-4">Vehicle Details</h3>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="vehicleModel">Vehicle Model</label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${errors.vehicleModel ? 'border-red-500' : ''}`}
              placeholder="Enter vehicle model"
            />
            {errors.vehicleModel && <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="vehicleMake">Vehicle Make</label>
            <input
              type="text"
              id="vehicleMake"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${errors.vehicleMake ? 'border-red-500' : ''}`}
              placeholder="Enter vehicle make"
            />
            {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="manufactureDate">Year of Manufacture</label>
            <DatePicker
              id="manufactureDate"
              selected={formData.manufactureDate}
              onChange={(date) => setFormData({ ...formData, manufactureDate: date })}
              dateFormat="yyyy"
              showYearPicker
              className={`w-full px-3 py-2 border rounded ${errors.manufactureDate ? 'border-red-500' : ''}`}
              placeholderText="Select year"
            />
            {errors.manufactureDate && <p className="text-red-500 text-sm mt-1">{errors.manufactureDate}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="licensePlate">License Plate</label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded ${errors.licensePlate ? 'border-red-500' : ''}`}
              placeholder="Enter license plate number"
            />
            {errors.licensePlate && <p className="text-red-500 text-sm mt-1">{errors.licensePlate}</p>}
          </div>

          {/* Booking Information */}
          <h3 className="text-lg font-bold text-red-500 mb-4">Booking Information</h3>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="appointmentDate">Appointment Date</label>
            <DatePicker
              id="appointmentDate"
              selected={formData.appointmentDate}
              onChange={(date) => setFormData({ ...formData, appointmentDate: date })}
              dateFormat="yyyy-MM-dd"
              className={`w-full px-3 py-2 border rounded ${errors.appointmentDate ? 'border-red-500' : ''}`}
              placeholderText="Select appointment date"
            />
            {errors.appointmentDate && <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>}
          </div>


          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">Preferred Time Slot</label>
            <div className="grid grid-cols-2 gap-2">
              {['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onChange={handleTimeSlotClick}
                  className={`px-4 py-2 border rounded ${formData.selectedTimeSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setFormData({ ...formData, selectedTimeSlot: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
            {errors.selectedTimeSlot && <p className="text-red-500 text-sm mt-1">{errors.selectedTimeSlot}</p>}
          </div>
          <h3 className="text-lg font-bold text-red-500 mb-4">Booking Information</h3>

          {/* Service Package Dropdown */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="servicePackage">Service Package</label>
            {loading ? (
              <p>Loading packages...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <select
                id="servicePackage"
                name="servicePackage"
                value={formData.servicePackage}
                onChange={handlePackageChange}
                className={`w-full px-3 py-2 border rounded ${errors.servicePackage ? 'border-red-500' : ''}`}
              >
                <option value="">Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg._id} value={pkg.PackageName}>
                    {`${pkg.PackageName} - RS: ${pkg.Price}`}
                  </option>
                ))}
              </select>
            )}
            {errors.servicePackage && <p className="text-red-500 text-sm mt-1">{errors.servicePackage}</p>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="additionalRequests">Additional Requests</label>
            <textarea
              id="additionalRequests"
              name="additionalRequests"
              value={formData.additionalRequests}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter any additional requests"
            />
          </div>

          {/* Checkout Section */}
          <h3 className="text-lg font-bold text-red-500 mb-4">Payment Information</h3>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">Payment Method</label>
            <div className="flex space-x-4">
              {/* Message for Custom Delivery Option */}
            
              {['Payment after service', 'Bank Transfer'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onChange={handleOptionChange}
                  className={`px-4 py-2 border rounded ${formData.selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setFormData({ ...formData, selectedOption: option, uploadedFile: null, filePreview: null })}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.paymentOption && <p className="text-red-500 text-sm mt-1">{errors.paymentOption}</p>}
          </div>
          {formData.selectedOption === 'Payment after service' && (
              <div className="mb-6 text-center text-yellow-600 bg-yellow-100 p-4 rounded-lg">
                <p>
                  You can make your payment on cash at the premises (at the Service center).
                </p>
              </div>
            )}
          {formData.selectedOption === 'Bank Transfer' && (
            <div className="mb-6">
              <div className="mb-6 text-center text-blue-600 bg-blue-100 p-4 rounded-lg">
                  <p>
                    Add your bank payment slip here.
                  </p>
                </div>

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
              {errors.uploadedFile && <p className="text-red-500 text-sm mt-1">{errors.uploadedFile}</p>}
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AppointmentCheckoutPage;

