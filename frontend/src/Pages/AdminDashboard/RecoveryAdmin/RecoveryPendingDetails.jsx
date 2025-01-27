import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./../../../components/Dashboards/Header";
import RecoverySideNavBar from "./../../../components/NavBar/RecoverySideNavBar";

export default function RecoveryPendingDetails() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drivers, setDrivers] = useState([]); // State to store driver data
  const [selectedDriver, setSelectedDriver] = useState(""); // State to store the selected driver
  const [message, setMessage] = useState(""); // State for message

  // Fetch recovery form details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/RecoveryForm/${userId}`
        );
        setUserDetails(response.data.getrecovery);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load recovery details.");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Fetch drivers data from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/DriversForm");
        setDrivers(response.data.drivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  // Update driver status function
  const updateDriverStatus = async (driverId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/DriversForm/${driverId}`
      );

      // Check if the response is successful
      if (response.status === 200) {
        setMessage(response.data.message); // Success message
        alert(response.data.message); // Display success message
      }
    } catch (error) {
      // Handle error appropriately
      if (error.response) {
        // The request was made, and the server responded with a status code
        setMessage(
          `Error: ${error.response.data.message || "Something went wrong!"}`
        );
        alert(message); // Display error message
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("Error: No response from server");
        alert(message);
      } else {
        // Something happened in setting up the request
        setMessage(`Error: ${error.message}`);
        alert(message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this recovery request?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/RecoveryForm/${userId}`);
        alert("Recovery request deleted successfully.");
        window.location.href = "/Dashboard/recoveryPendingDash";
      }
    } catch (err) {
      console.error("Error deleting recovery request:", err);
      alert("Failed to delete recovery request.");
    }
  };

  // Update the handleApprove function to include the selected driver
  const handleApprove = async () => {
    if (!selectedDriver) {
      alert("Please select a driver before approving.");
      return;
    }

    try {
      const confirmApprove = window.confirm(
        "Are you sure you want to approve this recovery request?"
      );
      if (confirmApprove) {
        // Send the PUT request with the selected driver's ID
        await axios.put(`http://localhost:5000/RecoveryForm/${userId}`, {
          DriverAssigned: selectedDriver,
        });
        alert("Recovery request approved successfully.");

        // Call UpdateDriverStatus after approving
        await updateDriverStatus(selectedDriver); // Call to update driver status

        window.location.href = "/Dashboard/recoveryPendingDash";
      }
    } catch (err) {
      console.error("Error approving recovery request:", err);
      alert("Failed to approve recovery request.");
    }
  };

  // Check loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check for error
  if (error) {
    return <div>{error}</div>;
  }

  // Check for user details
  if (!userDetails) {
    return <div>No recovery details found</div>;
  }

  // Handle driver selection change
  const handleDriverChange = (e) => {
    setSelectedDriver(e.target.value);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <RecoverySideNavBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 bg-gray-100 flex-1 flex flex-col overflow-y-auto">
          <div className="md:flex-row justify-between p-4 md:p-6 bg-white shadow">
            <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">
              Pending Request for Recovery ID:  {userDetails.RecoveryID}
            </h1>

            <main className="flex-1 p-4 md:p-8">
              <div className="bg-white shadow rounded-lg p-4 md:p-8">
                <h2 className="text-lg md:text-xl font-bold mb-4 bg-blue-100 p-4 rounded-lg">
                  Recovery Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* User Details */}
                  <div>
                    <label className="block font-bold text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={userDetails.Name}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Contact No
                    </label>
                    <input
                      type="text"
                      value={userDetails.ContactNo}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="text"
                      value={userDetails.EmailAddress}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={userDetails.Address}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Recovery No.
                    </label>
                    <input
                      type="text"
                      value={userDetails.RecoveryID}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Destination Location
                    </label>
                    <input
                      type="text"
                      value={userDetails.DestinationLocation}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Pick Up Location
                    </label>
                    <input
                      type="text"
                      value={userDetails.PickUpLocation}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Vehicle Registration Number
                    </label>
                    <input
                      type="text"
                      value={userDetails.VehicleRegistrationNumber}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Vehicle Type
                    </label>
                    <input
                      type="text"
                      value={userDetails.VehicleType}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      NIC Number
                    </label>
                    <input
                      type="text"
                      value={userDetails.NICNumber}
                      readOnly
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Driver Selection */}
                  <div>
                    <label className="block font-bold text-gray-700">
                      Select Driver
                    </label>
                    <select
                      className="w-full border rounded-lg px-4 py-2"
                      value={selectedDriver}
                      onChange={handleDriverChange}
                    >
                      <option value="">Select a driver</option>
                      {drivers.length > 0 ? (
                        drivers.map((driver) => (
                          <option
                            key={driver._id}
                            value={driver._id}
                            disabled={driver.States !== "Available"}
                          >
                            {driver.name} -{" "}
                            <span
                              style={{
                                color:
                                  driver.States === "Available"
                                    ? "blue"
                                    : "red",
                              }}
                            >
                              {driver.States}
                            </span>
                          </option>
                        ))
                      ) : (
                        <option disabled>No drivers available</option>
                      )}
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block font-bold text-gray-700">
                      Description
                    </label>
                    <textarea
                      className="w-full border rounded-lg px-4 py-2"
                      value={userDetails.Description}
                      readOnly
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-6">
                  <button
                    className="w-[10%] bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="w-[10%] bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={handleApprove}
                  >
                    Approve
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
