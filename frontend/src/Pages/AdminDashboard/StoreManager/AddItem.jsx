import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import StoreSideNavBar from './../../../components/Dashboards/StoreSideNavBar';
import Header from './../../../components/Dashboards/Header';
import axios from 'axios';

export default function AddItem(){

  const fileInputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const [selectedImage, setSelectedImage] = useState(null); // To store the image file that is selected by user
  const [imagePreview, setImagePreview] = useState(null);   // To store the image preview URL
  const [imageError, setImageError] = useState(null);        // To store any image-related errors

  // Handle the image file selection and generate a preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    // Check if the selected file is an image
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file); // Generate a preview URL for the image
      setImagePreview(imageUrl);
      setImageError(null); // Clear any previous errors
    } else {
      setImageError('Please select a valid image file.');
    }
  };

  const navigate = useNavigate();

  const [input , setInput] = useState({
    name : "",
    brand : "",
    model_number : "",
    length : "",
    width : "",
    height : "",
    quantity : "",
    price : "",
    color : "",
    images: [{ preview: '', url: '' }]
 
  });

  // Add state to store validation errors
  const [newErrors, setErrors] = useState({});

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setInput((prevState) => ({
    ...prevState,
    [name] : value,
  }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if name and brand are not empty
    if (!input.name.trim()) newErrors.name = "Item name is required";
    if (!input.brand.trim()) newErrors.brand = "Brand is required";

    // Model number validation: 2 letters followed by 4 digits (e.g., AB1234)
    const modelNumberRegex = /^[A-Za-z]{2}\d{4}$/;
    if (!modelNumberRegex.test(input.model_number)) {
      newErrors.model_number = "Model number must be 2 letters followed by 4 digits";
    }

    // Ensure quantity is more than 20
    if (input.quantity <= 20) {
      newErrors.quantity = "Quantity must be greater than 20";
    }

    // Validate color (simple check against CSS color names)
    const isValidColor = (color) => {
      const s = new Option().style;
      s.color = color;
      return s.color !== '';
    };
    if (!isValidColor(input.color)) {
      newErrors.color = "Please enter a valid CSS color name";
    }

    // Price must be a positive number
    if (input.price <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    // Validate dimensions: they should be positive numbers
    if (input.length <= 0) newErrors.length = "Length must be a positive number";
    if (input.width <= 0) newErrors.width = "Width must be a positive number";
    if (input.height <= 0) newErrors.height = "Height must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };


  const handleImageButtonClick = (index) => {
    fileInputRefs.current[index].current.click();
  };

const handleFileChange = async (e, index) => {
  const file = e.target.files[0];
  if (file) {
    const preview = URL.createObjectURL(file);
    const updatedImages = [...input.images];
    updatedImages[index] = { preview, url: updatedImages[index].url };
    setInput({ ...input, images: updatedImages });

    // Upload the file to the server
    const uploadInput = new FormData();
    uploadInput.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', uploadInput, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      updatedImages[index].url = res.data.filePath;
      setInput({ ...input, images: updatedImages });
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  }
};

  const handleStoreAddItemClick = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
  
     // Perform validation before submitting
     if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await axios.post('http://localhost:5000/ItemRoutes', input);
      if (response.status === 200) {
        console.log('item details added successfully:', response.data);
        alert('item details added successfully:', response.data);
        navigate('/StoreItem');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ', error);
    }
  
    const itemData = {
      name: input.name,
      brand: input.brand,
      model_number: input.model_number,
      length: input.length,
      width: input.width,
      height: input.height,
      quantity: input.quantity,
      price: input.price,
      color: input.color,
      images: input.selectedImageUrl
    };
  
    // Log the item data to ensure it's collected correctly
    console.log("Item Data:", itemData);
  
    // Navigate to the AddItemView page and pass the itemData
    navigate('/StoreItem');
  };
    return(
        <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <StoreSideNavBar/>
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header />
  
          <div className="flex-1 flex flex-col bg-gray-50">
            <header className="flex items-center justify-center bg-white shadow-md px-6 h-16">
            <h1 className="font-bold text-2xl">STORE ITEM DETAILS</h1>
            <div className="flex items-center">
            </div>
            </header>
            

            <div className="justify-between bg-white shadow-md  mt-10">
                <button 
                onClick={() => navigate('/StoreItem')}
                className=" text-blue-500 font-semibold py-2 h-full rounded-t-md focus:outline-none w-1/2">Item Details</button>
                <button className="bg-green-100 text-green-500 font-semibold py-2 px-4 h-full rounded-t-md focus:outline-none w-1/2">Add Item</button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h2 className="text-center text-2xl font-bold mb-6 text-green-500">Add New Item Details</h2>
            <form className="flex flex-col space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              <label htmlFor="name" className="font-semibold text-gray-600">Item Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value = {input.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                {newErrors.name && <p className="text-red-500">{newErrors.name}</p>}

              <label htmlFor="brand" className="font-semibold text-gray-600">Item Brand</label>  
                <input
                  type="text"
                  name = "brand"
                  placeholder="Brand"
                  value = {input.brand}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                {newErrors.brand && <p className="text-red-500">{newErrors.brand}</p>}

              <label htmlFor="model" className="font-semibold text-gray-600">Model Number</label>  
                <input
                  type="text"
                  name ="model_number"
                  placeholder="Model Number"
                  value = {input.model_number}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                 {newErrors.model_number && <p className="text-red-500">{newErrors.model_number}</p>}

              <label className="font-semibold text-gray-600">Dimensions</label>
              <div className="flex space-x-5">
                <div className="flex flex-col w-1/3">
              <label htmlFor="length" className="font-semibold text-center text-gray-600 mb-3">Length</label>  
                <input
                  type="number"
                  name = "length"//match the label with input field name of length
                  placeholder="Length"
                  value = {input.length}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                {newErrors.length && <p className="text-red-500">{newErrors.length}</p>}

                </div>
                <div className="flex flex-col w-1/3">
                <label htmlFor="width" className="font-semibold text-center text-gray-600 mb-3">Width</label>
                <input
                  type="number"
                  name = "width"//match the label with input field name of width
                  placeholder="Width"
                  value = {input.width}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                {newErrors.width && <p className="text-red-500">{newErrors.width}</p>}

                </div>
                <div className="flex flex-col w-1/3">
                <label htmlFor="height" className="font-semibold text-center text-gray-600 mb-3">Height</label>
                <input
                  type="number"
                  name = "height"//match the label with input field name of height
                  placeholder="Height"
                  value = {input.height}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                {newErrors.height && <p className="text-red-500">{newErrors.height}</p>}

                </div>
                </div>
              </div>
              <label htmlFor="quantity" className="font-semibold text-gray-600">Quantity</label>  
                <input
                  type="number"
                  name = "quantity"
                  placeholder="Quantity"
                  value = {input.quantity}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                {newErrors.quantity && <p className="text-red-500">{newErrors.quantity}</p>}

              <label htmlFor="price" className="font-semibold text-gray-600">Price</label>  
                <input
                  type="number"
                  name = "price"
                  placeholder="Price"
                  value = {input.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
                 {newErrors.price && <p className="text-red-500">{newErrors.price}</p>}

              <label htmlFor="color" className="font-semibold text-gray-600">Color</label>  
                <input
                  type="text"
                  name ="color"
                  placeholder="Color"
                  value = {input.color}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none"
                />
              

              
              <div className="grid grid-cols-1 gravity-center mx-auto">
                <label htmlFor="imageUpload" className="block text-gray-600  font-semibold text-center m-2">Item image</label>
                <div className="w-full min-w-60 min-h-40 bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center">
                {input.images.map((image, index) => (
                  <div key={index} className="mb-2 gap-3 flex justify-center items-center">
                    <input
                      type="file"
                      ref={fileInputRefs.current[index]}
                      onChange={(e) => handleFileChange(e, index)}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleImageButtonClick(index)}
                      className="w-32 me-20 bg-green-700 flex justify-center items-center text-white py-1 px-1 rounded-xl hover:bg-green-500 transition duration-300 transform hover:scale-105 gap-4 font-semibold"
                    >
                      Upload Image 
                    </button>
                    {image.preview && (
                      <img
                        src={image.preview}
                        alt={"Item image"}
                        className="w-32 h-20 object-cover rounded-md ms-3 mt-2"
                      />
                    )}
                  </div>
                ))}

              </div>    

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button 
                onClick={handleStoreAddItemClick}
                className="bg-blue-500 text-white py-2 px-6 rounded-md focus:outline-none">
                  Add Item
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}                
