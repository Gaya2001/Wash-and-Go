import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF AutoTable plugin
import Header from "./../../../components/Dashboards/Header";
import RecoverySideNavBar from "./../../../components/NavBar/RecoverySideNavBar";

export default function RecoveryOngoingDetails() {
  const { userId } = useParams();
  const [recoveryDetails, setRecoveryDetails] = useState(null);
  const [DriverDetail, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTotal, setShowTotal] = useState(false);
  const [error, setError] = useState(null);

  // State to track form inputs
  const [distanceTraveled, setDistanceTraveled] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [serviceCharges, setServiceCharges] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [drivers, setDrivers] = useState([]); // State to store driver data
  const [message, setMessage] = useState(""); // State for message

  const updateTotalCheak = () => {
    setShowTotal(true);
    // This will display the div
  };

  // Fetch recovery form details
  useEffect(() => {
    const fetchRecoveryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/RecoveryForm/${userId}`
        );
        const data = response.data.getrecovery;
        setRecoveryDetails(data);
        setDistanceTraveled(data.DistanceTraveled || "");
        setTimeDuration(data.TimeDuration || "");
        setServiceCharges(data.ServiceCharges || "");
        setTotalAmount(data.TotalAmount || "");
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

  // Function to handle the download of recovery report as PDF
  const handleDownload = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text("DRIVER REPORT FOR", 105, 20, null, null, "center");

    // Set font size and color for RecoveryID
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0); // Set text color to green (RGB: 0, 128, 0)
    doc.text(`RecoveryID: (${recoveryDetails.RecoveryID || "N/A"}) | `, 17, 35);

    // Set font size and color for DriverID (aligned to the right)
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0); // Keep the text color green
    doc.text(
      `DriverID: (${DriverDetail?.id || "N/A"})`,
      117,
      35,
      null,
      null,
      "right"
    );

    // Add report details as a table
    doc.autoTable({
      startY: 40, // Adjusted the start position of the table
      head: [["Field", "Details"]],
      body: [
        ["Date", new Date(recoveryDetails.Date).toLocaleDateString("en-US")],
        [
          "Time",
          new Date(`1970-01-01T${recoveryDetails.Time}`).toLocaleTimeString(
            "en-LK"
          ),
        ],
        ["Recovery No.", recoveryDetails.RecoveryID || "N/A"],
        ["User Name", recoveryDetails.Name || "N/A"],
        ["Phone No.", recoveryDetails.ContactNo || "N/A"],
        ["NIC", recoveryDetails.NICNumber || "N/A"],
        ["Address", recoveryDetails.Address || "N/A"],
        ["Vehicle Type", recoveryDetails.VehicleType || "N/A"],
        [
          "Vehicle Registration Number",
          recoveryDetails.VehicleRegistrationNumber || "N/A",
        ],
        ["Pick Up Location", recoveryDetails.PickUpLocation || "N/A"],
        ["Destination Location", recoveryDetails.DestinationLocation || "N/A"],
        ["Driver ID", DriverDetail?.id || "N/A"],
        ["Driver Name", DriverDetail?.name || "N/A"],
        ["Recovery Vehicle No.", DriverDetail?.RecoveryVehicleNo || "N/A"],
      ],
    });

    // Save the PDF with a dynamic name
    doc.save(`Recovery_Report_${recoveryDetails.RecoveryID || "report"}.pdf`);
  };

  const handleComplete = async () => {
    // Validation checks
    if (!distanceTraveled) {
      alert("Distance Traveled is required.");
      return;
    }

    if (!timeDuration) {
      alert("Time Duration is required.");
      return;
    }

    if (!serviceCharges) {
      alert("Service Charges are required.");
      return;
    }

    const serviceChargesValue = parseFloat(serviceCharges);

    if (serviceChargesValue < 10 || serviceChargesValue > 20) {
      alert("Service Charges must be between 10 and 20.");
      return;
    }
    try {
      const confirmApprove = window.confirm(
        "Are you sure you want to Complete this recovery request?"
      );
      if (confirmApprove) {
        const response = await axios.put(
          `http://localhost:5000/RecoveryForm/complete/${userId}`,
          {
            DistanceTraveled: distanceTraveled,
            TimeDuration: timeDuration,
            ServiceCharges: serviceCharges,
            TotalAmount: totalAmount,
          }
        );
        alert("Recovery request Completed successfully.");
        console.log(response);

        // Call UpdateDriverStatus after approving
        await updateDriverStatus(); // Call to update driver status

        window.location.href = "/Dashboard/Ongoing";
      }
    } catch (error) {
      console.error("Error completing recovery request:", error);
      alert("Error completing the recovery request.");
    }
  };

  const handleCheak = async () => {
    // Validation checks
    if (!distanceTraveled) {
      alert("Distance Traveled is required.");
      return;
    }

    if (!timeDuration) {
      alert("Time Duration is required.");
      return;
    }

    if (!serviceCharges) {
      alert("Service Charges are required.");
      return;
    }

    const serviceChargesValue = parseFloat(serviceCharges);

    if (serviceChargesValue < 10 || serviceChargesValue > 20) {
      alert("Service Charges must be between 10 and 20.");
      return;
    }
    try {
      const confirmApprove = window.confirm(
        "Are you sure you want to complete this recovery request?"
      );
      if (confirmApprove) {
        const response = await axios.put(
          `http://localhost:5000/RecoveryForm/completecheak/${userId}`,
          {
            DistanceTraveled: distanceTraveled,
            TimeDuration: timeDuration,
            ServiceCharges: serviceCharges,
          }
        );
        console.log(response);

        // Fetch updated recovery details
        const updatedResponse = await axios.get(
          `http://localhost:5000/RecoveryForm/${userId}`
        );
        const updatedData = updatedResponse.data.getrecovery;
        setRecoveryDetails(updatedData);

        // Call updateTotalCheak function
        updateTotalCheak();
      }
    } catch (error) {
      console.error("Error completing recovery request:", error);
      alert("Error checking the recovery request.");
    }
  };

  // Update driver status function
  const updateDriverStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/DriversForm/${recoveryDetails.DriverAssigned}`
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

  return (
    <div className="flex h-screen overflow-hidden">
      <RecoverySideNavBar />
      <div className="flex-1 flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="p-6 bg-gray-100 flex-1 flex flex-col overflow-y-auto">
          <main className="flex-1 p-10 bg-gray-100">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">On Going Request</h2>
              <div className="relative"></div>
            </header>

            <section className="p-6 bg-gray-100 flex-1 flex flex-col overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-5">Recovery Report</h3>

              {/* Recovery Details */}
              <div className="mb-5">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Date:
                  </label>
                  <p>
                    {recoveryDetails.Date
                      ? new Date(recoveryDetails.Date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Time:
                  </label>
                  <p>
                    {recoveryDetails.Time
                      ? new Date(
                          `1970-01-01T${recoveryDetails.Time}`
                        ).toLocaleTimeString("en-LK", {
                          timeZone: "Asia/Colombo", // Time zone for Sri Lanka
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Recovery No.:
                  </label>
                  <p>{recoveryDetails.RecoveryID || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    User Name:
                  </label>
                  <p>{recoveryDetails.Name || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Phone No.:
                  </label>
                  <p>{recoveryDetails.ContactNo || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    NIC:
                  </label>
                  <p>{recoveryDetails.NICNumber || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Address:
                  </label>
                  <p>{recoveryDetails.Address || "N/A"}</p>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-8 border-gray-300" />

              {/* Vehicle and Driver Details */}
              <div className="mb-5">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Vehicle Type:
                  </label>
                  <p>{recoveryDetails.VehicleType || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Vehicle Registration Number:
                  </label>
                  <p>{recoveryDetails.VehicleRegistrationNumber || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Pick Up Location:
                  </label>
                  <p>{recoveryDetails.PickUpLocation || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Destination Location:
                  </label>
                  <p>{recoveryDetails.DestinationLocation || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Driver ID:
                  </label>
                  <p>{DriverDetail?.id || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Driver Name:
                  </label>
                  <p>{DriverDetail?.name || "N/A"}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Recovery Vehicle No.:
                  </label>
                  <p>{DriverDetail?.RecoveryVehicleNo || "N/A"}</p>
                </div>
              </div>

              {/* Distance, Time, and Charges */}
              <section className="mt-10 bg-white shadow rounded-lg p-6">
                <div className="mb-5">
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Distance Traveled (km):
                    </label>
                    <input
                      type="text"
                      value={distanceTraveled}
                      onChange={(e) => setDistanceTraveled(e.target.value)}
                      className="border rounded-md p-2 w-1/4 text-gray-700"
                    />
                  </div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Time Duration (hours):
                    </label>
                    <input
                      type="text"
                      value={timeDuration}
                      onChange={(e) => setTimeDuration(e.target.value)}
                      className="border rounded-md p-2 w-1/4 text-gray-700"
                    />
                  </div>
                  <div className="flex justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">
                      Service Charges:
                    </label>
                    <input
                      type="text"
                      value={serviceCharges}
                      onChange={(e) => setServiceCharges(e.target.value)}
                      className="border rounded-md p-2 w-1/4 text-gray-700"
                    />
                  </div>
                  <div>
                    {/* Conditionally show this div based on showTotal */}
                    {showTotal && (
                      <div className="flex justify-between mb-3">
                        <label className="text-2xl font-bold text-gray-800">
                          Total Amount :
                        </label>
                        <p className="text-2xl font-bold text-gray-800">
                          Rs {recoveryDetails.TotalAmount || "N/A"}.00
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={handleCheak}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Cheack
                    </button>
                  </div>
                </div>
              </section>

              {/* Buttons Section */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Download Report
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Complete
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
