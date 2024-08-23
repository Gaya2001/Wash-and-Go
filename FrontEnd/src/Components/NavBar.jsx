import React from "react";
import { IoIosMail } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";


function NavBar() {
  return (
    <div className="">
      {/* Header Section */}
      <div className="z-40 absolute w-[280px] h-[150px] bg-[#eb3301] angled-rectangle1">
        <h1 className="text-white font-bold text-6xl absolute top-[48px] left-[38px]">
          LOGO
        </h1>
      </div>

      <div className="absolute w-[330px] h-[150px] bg-[#c42703] angled-rectangle2 z-20"></div>

      <div className="absolute left-[280px] h-[55px] bg-white angled-rectangle3 right-0">
        <h4 className="font-bold absolute top-[15px] text-xl left-8">
          Welcome to LOGO Car Repair Company
        </h4>
      </div>

      <div className="text-white z-30 absolute top-[55px] left-[259px] h-[95px] bg-[#161920] angled-rectangle4 right-0">
        <div className="flex gap-16">
          <div className="flex items-center gap-2 ml-10 mt-7">
            <div>
              <IoIosMail size={40} />
            </div>
            <div>
              <h5>Make An Email</h5>
              <h5 className="font-bold">Kavigayashan149@gmail.com</h5>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-10 mt-7">
            <div>
              <IoCallSharp size={40} />
            </div>
            <div>
              <h5>Call Us 24/7</h5>
              <h5 className="font-bold">+94 71 550 3670</h5>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-10 mt-7">
            <div>
              <FaRegClock size={40} />
            </div>
            <div>
              <h5>Office Hours</h5>
              <h5 className="font-bold">Mon-Sat 8am-6pm</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black h-[55px] absolute top-[149px] right-0 left-0">
        <ul className="text-white font-semibold flex gap-14 absolute top-[17px] left-[110px] text-md">
          <li>HOME</li>
          <li>SERVICES</li>
          <li>ABOUT</li>
          <li>PAGES</li>
          <li>NEWS</li>
          <li>CONTACT US</li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar