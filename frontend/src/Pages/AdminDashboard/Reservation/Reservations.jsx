import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavBar from '../../../components/Dashboards/SideNavBar';
import Header from '../../../components/Dashboards/Header';
import ConfirmationPopup from "../../../components/Confirmations/PKGDeleteConfirm";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

export default function Reservations() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState("pending"); // Track filter type (pending or accepted)
  const navigate = useNavigate();

  const handleDeleteClick = (packageName) => {
    setSelectedPackage(packageName);
    setIsPopupOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Deleted: ${selectedPackage}`);
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const URL = "http://localhost:5000/appointment/appointments";

  const fetchHandler = async () => {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched data:", data);
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn("Unexpected response format:", data);
      }
    });
  }, []);

  const handleViewClick = (id) => {
    navigate(`/appointment/${id}`); // Navigate to the Appointment_View page with the selected appointment ID
  };

  const handleAcceptClick = async (id) => {
    try {
      await axios.put(`http://localhost:5000/appointment/appointments/${id}/accept`);
      setUsers(users.map(user => user._id === id ? { ...user, status: 'Accepted' } : user)); // Update local state
      alert('Appointment accepted successfully!');
    } catch (error) {
      console.error('Error accepting appointment:', error);
      alert('Failed to accept the appointment.');
    }
  };

  // Filter based on pending or accepted appointments
  const filteredUsers = users.filter((user) =>
    filterType === "pending" ? user.status === "Pending" : user.status === "Accepted"
  );

  return (
    <div className="flex max-h-screen">
      <SideNavBar />

      <div className="h-screen flex-1 flex flex-col">
        <Header />

        {/* Main Content Area */}
        <main className="h-screen flex-1 bg-gray-100">
          <div className='mt-10 bg-slate-500 text-center p-3 text-2xl font-bold'>
            <h1>RESERVATIONS</h1>
          </div>
          <div className="h-5/6 m-5 px-6 pt-6 bg-gray-50 border-2 border-solid border-gray-300">
            <div>
              <button
                onClick={() => setFilterType("pending")}
                className={`w-1/2 px-4 py-2 ${filterType === 'pending' ? 'bg-gray-700' : 'bg-gray-500'} text-white font-semibold shadow-md`}
              >
                Pending Reservations
              </button>
              <button
                onClick={() => setFilterType("accepted")}
                className={`w-1/2 px-4 py-2 ${filterType === 'accepted' ? 'bg-gray-700' : 'bg-gray-500'} text-white font-semibold shadow-md`}
              >
                Accepted Reservations
              </button>
            </div>
            <div className='mt-5 h-[470px] overflow-y-scroll bg-gray-100 border-2 border-solid border-gray-300'>
              <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg">
                <thead className="bg-gray-400">
                  <tr>
                    <th className="px-2 py-3 text-center font-bold text-black">ReservationID</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Name</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Estimated TimeSlot</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Date</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Payment Method</th>
                    <th className="px-2 py-3 text-center font-bold text-black">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id} className={`border-t border-gray-300 ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                      <td className="px-2 py-4 text-center text-black">ID {user._id}</td>
                      <td className="px-2 py-4 text-center text-black">{user.name}</td>
                      <td className="px-2 py-4 text-center text-black">{user.selectedTimeSlot}</td>
                      <td className="px-2 py-4 text-center text-black">{new Date(user.preferredAppointmentDate).toLocaleDateString()}</td>
                      <td className="px-2 py-4 text-center text-black">{user.selectedOption}</td>
                      <td className="text-center py-4 text-sm">
                        <button
                          className="px-3 py-2 mr-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 hover:shadow-gray-700 hover:duration-300"
                          onClick={() => handleViewClick(user._id)}
                        >
                          View
                        </button>
                        {filterType === 'pending' && (
                          <button
                            className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 hover:duration-300"
                            onClick={() => handleAcceptClick(user._id)}
                          >
                            Accept
                          </button>
                        )}
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
        packageName={selectedPackage}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
