import React, { useState } from "react";
import logo from "../../../assets/Recovery/Rform.png";
import Header from "../../../components/NavBar/HomeNavbar.jsx";
import Footer from "../../../components/Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RecoveryForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    Name: "",
    EmailAddress: "",
    Address: "",
    ContactNo: "",
    DestinationLocation: "",
    VehicleType: "",
    PickUpLocation: "",
    NICNumber: "",
    VehicleRegistrationNumber: "",
    Description: "",
    States: "pending", // Added field with default value null
    Date: null, // Added field with default value null
    Time: null, // Added field with default value null
    DistanceTraveled: null, // Added field with default value null
    TimeDuration: null, // Added field with default value null
    ServiceCharges: null, // Added field with default value null
    TotalAmount: null, // Added field with default value null
    DriverAssigned: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!input.Name.trim()) {
      newErrors.Name = "Name is required";
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(input.EmailAddress)) {
      newErrors.EmailAddress = "Please enter a valid email ending with @gmail.com";
    }

    // Address validation
    if (!input.Address.trim()) {
      newErrors.Address = "Address is required";
    }

    // ContactNo validation (10 digits)
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(input.ContactNo)) {
      newErrors.ContactNo = "Contact number must be 10 digits";
    }

    // NIC validation (12 digits)
    const nicPattern = /^\d{12}$/;
    if (!nicPattern.test(input.NICNumber)) {
      newErrors.NICNumber = "NIC Number must be 12 digits";
    }

    // Vehicle registration number validation (3 letters, a hyphen, and 4 digits)
    const vehicleRegPattern = /^[A-Z]{3}-\d{4}$/||/^[A-Z]{2}-\d{4}$/ ;
    if (!vehicleRegPattern.test(input.VehicleRegistrationNumber)) {
      newErrors.VehicleRegistrationNumber = "Vehicle Registration Number must be in the format ABC-1234";
    }

    // Destination Location validation
    if (!input.DestinationLocation.trim()) {
      newErrors.DestinationLocation = "Destination Location is required";
    }

    // Vehicle Type validation
    if (!input.VehicleType.trim()) {
      newErrors.VehicleType = "Vehicle Type is required";
    }

    // PickUp Location validation
    if (!input.PickUpLocation.trim()) {
      newErrors.PickUpLocation = "Pick Up Location is required";
    }

    // Description validation
    if (!input.Description.trim()) {
      newErrors.Description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors => form is valid
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (!validate()) {
      return;
    }

    await sendRequest();
    navigate("/");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/RecoveryForm", {
      Name: String(input.Name),
      EmailAddress: String(input.EmailAddress),
      Address: String(input.Address),
      ContactNo: String(input.ContactNo),
      DestinationLocation: String(input.DestinationLocation),
      VehicleType: String(input.VehicleType),
      PickUpLocation: String(input.PickUpLocation), // Include in the request
      NICNumber: String(input.NICNumber),
      VehicleRegistrationNumber: String(input.VehicleRegistrationNumber),
      Description: String(input.Description),
      States: String(input.States), // Include in the request
      Date: input.Date, // Include in the request
      Time: input.Time, // Include in the request
      DistanceTraveled: input.DistanceTraveled, // Include in the request
      TimeDuration: input.TimeDuration, // Include in the request
      ServiceCharges: input.ServiceCharges, // Include in the request
      TotalAmount: input.TotalAmount, // Include in the request
      DriverAssigned: input.DriverAssigned, // Include in the request
    });
  };

  return (
    <div>
      <Header />
      <main className="mt-[0vh] flex items-center">
        <section id="home" className="h-fit w-full">
          <div className="bg-gradient-to-r from-blue-500 to-white p-10">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-1/2 flex items-start">
                  <img src={logo} alt="Car Recovery" className="rounded-lg" />
                </div>
                <div className="md:w-1/2 md:pl-8">
                  <h2 className="text-2xl font-bold text-gray-700 mb-6">
                    User Details
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="Name"
                        value={input.Name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your name"
                      />
                      {errors.Name && (
                        <p className="text-red-500 text-sm">{errors.Name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="EmailAddress"
                        value={input.EmailAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your email address"
                      />
                      {errors.EmailAddress && (
                        <p className="text-red-500 text-sm">
                          {errors.EmailAddress}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="Address"
                        value={input.Address}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter your address"
                      />
                      {errors.Address && (
                        <p className="text-red-500 text-sm">{errors.Address}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Contact No
                      </label>
                      <input
                        type="text"
                        name="ContactNo"
                        value={input.ContactNo}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="+94xxxxxxxxx"
                      />
                      {errors.ContactNo && (
                        <p className="text-red-500 text-sm">
                          {errors.ContactNo}
                        </p>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700 mt-8 mb-6">
                      Recovery Details
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Destination Location
                      </label>
                      <input
                        type="text"
                        name="DestinationLocation"
                        value={input.DestinationLocation}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Destination Location"
                      />
                      {errors.DestinationLocation && (
                        <p className="text-red-500 text-sm">
                          {errors.DestinationLocation}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Vehicle Type
                      </label>
                      <input
                        type="text"
                        name="VehicleType"
                        value={input.VehicleType}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Vehicle Type"
                      />
                      {errors.VehicleType && (
                        <p className="text-red-500 text-sm">
                          {errors.VehicleType}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Pick Up Location
                      </label>
                      <input
                        type="text"
                        name="PickUpLocation"
                        value={input.PickUpLocation}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Pick Up Location"
                      />
                      {errors.PickUpLocation && (
                        <p className="text-red-500 text-sm">
                          {errors.PickUpLocation}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        NIC Number
                      </label>
                      <input
                        type="text"
                        name="NICNumber"
                        value={input.NICNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter NIC Number"
                      />
                      {errors.NICNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.NICNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Vehicle Registration Number
                      </label>
                      <input
                        type="text"
                        name="VehicleRegistrationNumber"
                        value={input.VehicleRegistrationNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Vehicle Registration Number"
                      />
                      {errors.VehicleRegistrationNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.VehicleRegistrationNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="Description"
                        value={input.Description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Description"
                      />
                      {errors.Description && (
                        <p className="text-red-500 text-sm">
                          {errors.Description}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default RecoveryForm;
