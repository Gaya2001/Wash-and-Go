import React from 'react';
import StoreSideNavBar from './../../../components/Dashboards/StoreSideNavBar';
import Header from './../../../components/Dashboards/Header';


export default function StoreDashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <StoreSideNavBar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className='mt-10 bg-white ms-10 p-3 text-2xl font-bold'>
          <h1>STORE MANAGER DASHBOARD</h1>
        </div>

        {/* Main Dashboard Area */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto pt-20">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6">
            <div className="bg-red-100 shadow rounded-lg p-6">
              <h2 className="text-red-500 text-xl font-semibold text-center">Pending Orders</h2>
              {/* Add a chart component here */}
              <p className="text-red-600 mt-2 text-center text-2xl font-bold"> 13</p>
          </div>

            <div className="bg-blue-100 shadow rounded-lg p-6">
              <h2 className="text-blue-500 text-xl font-semibold text-center">Order Requests</h2>
              {/* Add a chart component here */}
              <p className="text-blue-600 mt-2 text-center text-2xl font-bold"> 05</p>
            </div>

            <div className="bg-green-100 shadow rounded-lg p-6">
              <h2 className="text-green-500 text-xl font-semibold text-center">Approved Orders</h2>
              {/* Add a chart component here */}
              <p className="text-green-600 mt-2 text-center text-2xl font-bold"> 10</p>
            </div>
            
          </div>

        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
                <h2 className="text-lg font-semibold">Orders</h2>
                <div className="mt-4">
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-2">
                        <div className="flex justify-between p-3 ml-10">
                            <span className="text-sm text-red-500 font-semibold">Pending Order</span>
                            <span className="text-sm text-red-500 font-bold mr-8">26%</span>
                        </div>
                        <div className="flex justify-between p-2 ml-10">
                            <span className="text-sm text-green-500 font-semibold">Approved Orders</span>
                            <span className="text-sm text-green-500 font-bold mr-8">54%</span>
                        </div>
                        <div className="flex justify-between p-2 ml-10">
                            <span className="Text-sm text-blue-500 font-semibold">Order Requests</span>
                            <span className="text-sm text-blue-500 font-bold mr-8">20%</span>
                        </div>
                    </div>
                </div>
              </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 ">
                    <h2 className="text-lg font-semibold">Available items</h2>
                    <div className="flex items-center justify-between mt-4">
                        <div className="w-full h-32 bg-gray-200 rounded-lg">
                            <div className="text-3xl font-bold mt-6 ml-10">
                                <div className="text-sm text-orange-500">
                                    <span >Total Items : 100 </span>
                                </div>
                                <div className="text-sm mt-8 text-green-700">    
                                    <span >Available Items : 80 </span>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
          </div>
          </section>
        </main>
      </div>
    </div>
  );
}
