import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./../../../components/Dashboards/Header";
import RecoverySideNavBar from "./../../../components/NavBar/RecoverySideNavBar";

export default function CompletedRequest() {


    const { userId } = useParams();
    const [recoveryDetails, setRecoveryDetails] = useState(null);
    const [DriverDetail, setDriverDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  
  
    // Fetch recovery form details
    useEffect(() => {
      const fetchRecoveryDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/RecoveryForm/${userId}`
          );
          const data = response.data.getrecovery;
          setRecoveryDetails(data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to load recovery details.");
        } finally {
          setLoading(false); // Ensure loading state is stopped
        }
      };
  
      fetchRecoveryDetails();
    }, [userId]);
  
    // Fetch driver details after recoveryDetails is fetched
    useEffect(() => {
      if (recoveryDetails && recoveryDetails.DriverAssigned) {
        const fetchDriverDetails = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/DriversForm/${recoveryDetails.DriverAssigned}`
            );
            const data = response.data.driver;
            setDriverDetails(data);
          } catch (err) {
            console.error("Error fetching driver details:", err);
            setError("Failed to load driver details.");
          }
        };
  
        fetchDriverDetails();
      }
    }, [recoveryDetails]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!recoveryDetails) {
      return <div>No recovery details found</div>;
    }










  return (
    <div className="flex h-screen overflow-hidden">
    <RecoverySideNavBar />
    <div className="flex-1 flex flex-col">
      <Header />

      {/* Main Content */}
        <main className="flex-1 p-10 bg-gray-100 overflow-y-auto">
          <h1 className="text-4xl mb-6 font-bold text-gray-800">
            Completed Request
          </h1>
          <section className="bg-white shadow-lg rounded-xl p-8 space-y-8">
            {/* Status */}
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-green-600">
                Completed
              </h2>
              <div className="text-gray-500">
                Date:
                {recoveryDetails.Date
                      ? new Date(recoveryDetails.Date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}| Time:{recoveryDetails.Time
                        ? new Date(
                          `1970-01-01T${recoveryDetails.Time}`
                        ).toLocaleTimeString("en-LK", {
                          timeZone: "Asia/Colombo", // Time zone for Sri Lanka
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "N/A"}
              </div>
            </div>

            <hr className="my-6" />

            {/* User Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Recovery No.
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.RecoveryID || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  User Name
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.Name || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone No.
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.ContactNo || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  NIC
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.NICNumber || "N/A"}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.Address || "N/A"}</p>
              </div>
            </div>

            <hr className="my-6" />

            {/* Vehicle Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Vehicle Type
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.VehicleType || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Vehicle Registration Number
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.VehicleRegistrationNumber || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Pick Up Location
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.PickUpLocation || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Destination Location
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.DestinationLocation || "N/A"}</p>
              </div>
            </div>

            <hr className="my-6" />

            {/* Driver Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Driver ID
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{DriverDetail?.id || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Driver Name
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{DriverDetail?.name || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Recovery Vehicle No.
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{DriverDetail?.id || "N/A"}</p>
              </div>
            </div>

            <hr className="my-6" />

            {/* Service and Charges */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Distance Traveled (km)
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.DistanceTraveled || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Time Duration (hours)
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.TimeDuration || "N/A"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Service Charges
                </label>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-300">{recoveryDetails.ServiceCharges || "N/A"}</p>
              </div>
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-600">
                  Total Amount (Rs.)
                </label>
                <p className="text-3xl font-bold text-gray-800">{recoveryDetails.TotalAmount || "N/A"}</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-8">
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition"
                onClick={() => window.history.back()}
              >
                Close
              </button>
            </div>
          </section>
        </main>
    </div>
    </div>
  );
}
