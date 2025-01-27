import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate to redirect
import axios from 'axios';
import SideNavBar from '../../../components/Dashboards/SideNavBar';
import Header from '../../../components/Dashboards/Header';

export default function Appointment_View1() {
  const { id } = useParams(); // Extract ID from the URL
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // For navigating after deletion

  // Fetch appointment data on component mount
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/appointment/appointments/${id}`);
        setAppointment(response.data); // Appointment should include the updated status field
        setFormData({
          name: response.data.name,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber,
          preferredAppointmentDate: response.data.preferredAppointmentDate,
          selectedTimeSlot: response.data.selectedTimeSlot,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        setIsLoading(false);
      }
    };

    fetchAppointmentData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle updating the appointment
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/appointment/appointments/${id}`, formData);
      alert('Appointment updated successfully!');
      setIsEditing(false);
      setAppointment({ ...appointment, ...formData }); // Update local state
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update the appointment.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!appointment) {
    return <div>No appointment found.</div>;
  }

  return (
    <div className="flex max-h-screen">
      <SideNavBar />
      <div className="h-screen flex-1 flex flex-col">
        <Header />

        {/* Main Content Area */}
        <main className="h-screen flex-1 bg-gray-100">
          <div className="mt-10 bg-slate-500 text-center p-3 text-2xl font-bold">
            <h1>APPOINTMENT DETAILS</h1>
          </div>

          <div className="h-4/6 m-5 px-6 pt-6 bg-gray-50 border-2 border-solid border-gray-300 overflow-y-auto">
            <div className="min-h-screen bg-gray-100 flex flex-col items-center">
              <div className="w-full max-w-5xl bg-blue-50 p-8 mt-10 mb-20 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center mb-8">Customer Reservations</h2>

                {/* Appointment Details Section */}
                <div className="border p-8 rounded-lg shadow-inner">
                  <h3 className="text-3xl font-bold text-green-600 text-center mb-8">Appointment Details</h3>

                  {/* Personal Information */}
                  <div className="mb-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleInputChange}
                          readOnly={appointment.status !== 'Pending' || !isEditing}
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address || ''}
                          onChange={handleInputChange}
                          readOnly={appointment.status !== 'Pending' || !isEditing}
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium">Phone No</label>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber || ''}
                          onChange={handleInputChange}
                          readOnly={appointment.status !== 'Pending' || !isEditing}
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div className="mb-6 bg-slate-200 rounded-lg shadow-lg">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium">Preferred Appointment Date</label>
                        <input
                          type="date"
                          name="preferredAppointmentDate"
                          value={
                            formData.preferredAppointmentDate
                              ? new Date(formData.preferredAppointmentDate).toISOString().split('T')[0]
                              : ''
                          }
                          onChange={handleInputChange}
                          readOnly={appointment.status !== 'Pending' || !isEditing}
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium">Preferred Time Slot</label>
                        <input
                          type="text"
                          name="selectedTimeSlot"
                          value={formData.selectedTimeSlot || ''}
                          onChange={handleInputChange}
                          readOnly={appointment.status !== 'Pending' || !isEditing}
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {appointment.status === 'Pending' && (
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-6 py-3 rounded-lg ${isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                      >
                        {isEditing ? 'Cancel Edit' : 'Edit Appointment'}
                      </button>
                      {isEditing && (
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
                        >
                          Update Appointment
                        </button>
                      )}
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="mb-6 mt-10">
                    <h4 className="text-2xl font-bold mb-4 text-blue-500">Personal Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium">Email</label>
                        <input
                          type="text"
                          value={appointment.email || ''}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-4 text-blue-500">Vehicle Information</h4>
                    <div className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium">Vehicle Make</label>
                        <input
                          type="text"
                          value={appointment.vehicleMake || 'Not provided'}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium">Vehicle Model</label>
                        <input
                          type="text"
                          value={appointment.vehicleModel || 'Not provided'}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium">License Plate Number</label>
                        <input
                          type="text"
                          value={appointment.licensePlate || 'Not provided'}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Information */}
                  <div className="mb-6 bg-slate-200 rounded-lg shadow-lg">
                    <h4 className="text-2xl font-bold mb-4 text-blue-500">Booking Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium">Selected Service Package</label>
                        <input
                          type="text"
                          value={appointment.servicePackage || 'Not provided'}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-lg font-medium">Additional Requests or Concerns</label>
                        <input
                          type="text"
                          value={appointment.additionalRequests || 'None'}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold mb-4 text-blue-500">Payment Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium">Payment Type</label>
                        <input
                          type="text"
                          value={appointment.selectedOption || 'Not provided'}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        {appointment.filePreview && appointment.filePreview.length > 0 && (
                          <img
                            src={appointment.filePreview} // Assuming this is the file path or URL
                            alt="Payment Slip"
                            className="mx-auto w-32 h-auto rounded-lg cursor-pointer"
                            onClick={openModal}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
