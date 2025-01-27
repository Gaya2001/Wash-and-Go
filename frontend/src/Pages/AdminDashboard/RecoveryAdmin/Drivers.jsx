import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./../../../components/Dashboards/Header";

import RecoverySideNavBar from "./../../../components/NavBar/RecoverySideNavBar";

const Drivers = () => {
  const [DriverDetail, setDriverDetails] = useState([]);

  // Fetch the driver details from the backend
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/DriversForm");
        const data = response.data.drivers; // Access drivers array from response
        console.log(data);
        setDriverDetails(data); // Set drivers data to state
      } catch (err) {
        console.error("Error fetching driver details:", err);
      }
    };

    fetchDriverDetails();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <RecoverySideNavBar />
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="p-6 bg-gray-100 flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 p-0 bg-gray-100">
            <div className="flex-1 p-8">
              <h1 className="text-3xl font-bold mb-6">Drivers</h1>

              {/* Drivers Table */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">No.</th>
                      <th className="px-4 py-2 text-left">Driver_ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">States</th>
                      <th className="px-4 py-2 text-left">Recovery Vehicle No</th>
                      <th className="px-4 py-2 text-left">Address</th>
                      <th className="px-4 py-2 text-left">Phone No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DriverDetail.map((driver, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{`0${index + 1}`}</td>
                        <td className="px-4 py-2">{driver.id}</td>
                        <td className="px-4 py-2 flex items-center">
                          <img
                            src={driver.image || "https://via.placeholder.com/30"}
                            alt={driver.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <span>{driver.name}</span>
                        </td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded ${driver.States === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {driver.States}
                          </span>
                        </td>
                        <td className="px-4 py-2">{driver.RecoveryVehicleNo}</td>
                        <td className="px-4 py-2">{driver.Address}</td>
                        <td className="px-4 py-2">{driver.PhoneNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
