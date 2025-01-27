import React, { useEffect, useState } from 'react';
import SideNavBar from '../../components/Dashboards/SideNavBar';
import Header from '../../components/Dashboards/Header';
import { PieChart } from '@mui/x-charts/PieChart';
import BarChart from '../../components/Dashboards/BarChart'
import PieCharts from '../../components/Dashboards/PieChart'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




export default function AdminDashboard() {


  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch session data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Session');
        console.log(response.data);

        if (response.data) {
          setUserData(response.data);
        } else {
          navigate("/Login"); // Redirect if userData is null
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate("/Login"); // Redirect in case of an error

      }
    };

    fetchUserData();
  }, [navigate]);





  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideNavBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className='mt-10 bg-white ms-10 p-3 text-2xl font-bold'>
          <h1>ADMIN DASHBOARD</h1>
        </div>

        {/* Main Dashboard Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto pt-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6">

            <div className="bg-white row-span-2 col-span-2 shadow rounded-lg p-6">
              <BarChart />
            </div>

            <div className="h-60 bg-white shadow rounded-lg p-6">
              <PieCharts />
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-gray-700 text-xl font-semibold">Sales Overview</h2>
              {/* Add a chart component here */}
              <p className="text-gray-500 mt-2">Total Sales: $50,000</p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
