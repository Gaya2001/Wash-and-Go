import React from "react";
import logo from '../../assets/Dashboard/Logo.jpg';
import SideNavLinks from "./SideNavLinks/SideNavLinks";

export default function StoreSideNavBar() {
  return (
    <aside>
    <aside className="h-screen w-64 bg-gray-900 text-white hidden md:block">
      <div className="p-4 flex items-center">
        <img src={logo} alt="Logo" className="h-32 w-auto mt-5 mx-auto rounded-full" />
      </div>
      <nav className="mt-8">
        <ul className="space-y-5 font-bold text-xl text-center">
        
          <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
            <SideNavLinks linkName="DASHBOARD" url="/StoreDashboard" className=""/>
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
            <SideNavLinks linkName="ORDERS" url="/orders"/>
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
            <SideNavLinks linkName="ITEMS" url="/StoreItem"/>
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 hover:duration-300">
            <SideNavLinks linkName="REQUESTS" url="/requests"/>
          </li>
        </ul>
      </nav>
    </aside>
    </aside>
  );
}