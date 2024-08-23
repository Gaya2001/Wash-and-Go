import React from "react";
import { GiAutoRepair } from "react-icons/gi";
import { IoCheckmarkSharp } from "react-icons/io5";



function AboutSection() {
  return (
    <div className="h-[95vh] w-full">
      <div className="h-[80vh] w-[85%] flex mx-auto mt-[5vh]">
        <div className="h-[80vh] w-1/2 bg-gray-200">
          <div className="bg-[url('/Img4.jpg.jpg')] bg-cover bg-center w-full h-full">
            <img
              src="/Img1.jpg"
              alt="Description of image"
              className="w-[55%] h-[45%] relative left-[-10%] top-[5%]"
              height={50}
            />
            <img
              src="/service1.jpg"
              alt="Description of image"
              className="w-[55%] h-[45%] ml-[55%] mt-[5%]"
              height={50}
            />
          </div>
        </div>

        <div className="h-[80vh] w-1/2">
          <div className="ml-[13%]">
            <div className="w-[32%] text-xl font-bold flex items-center mt-5">
              <GiAutoRepair className="mx-1" /> <h1>OUR ABOUT</h1>
              <GiAutoRepair className="mx-1" />
            </div>

            <div className="text-4xl font-bold w-[95%] my-5">
              Myths About Car Repair Keeps You From Growing.
            </div>

            <div className="w-[80%] font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus odio voluptates temporibus adipisci autem. Ipsam
              nemo libero eius? Adipisicing elit. Itaque neque, ex fugit quae
              nobis qui laborum, harum cupiditate beatae est magni volu
            </div>

            <div className="grid grid-cols-2 gap-4 font-bold">
              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Great Depression.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Repair Domination.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Expertise & Innovation.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Great Innovation.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Leading Industrial.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>From Unlikely Sources.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Quality Immediately.</div>
              </div>

              <div className="flex items-center mt-5 text-xl">
                <IoCheckmarkSharp className="text-red-500" />
                <div>Blah Into Fantastic.</div>
              </div>
            </div>
            {/* <div className="flex justify-center w-full mt-4">
                <button className="p-3 bg-orange-600 w-[130px] text-center text-black font-bold">
                  Read More
                </button>
              </div> */}
          </div>
        </div>
      </div>

      <div className="h-[14.9vh] mt-[0.1vh] w-full bg-black flex items-center justify-center gap-[9%] text-white">
        <div className="w-[210px] text-center">
          <div className="text-5xl font-bold text-[#eb3301]">725+</div>
          <div className="text-xl font-semibold">PIONEER THROUGHS</div>
        </div>

        <div className="w-[210px] text-center">
          <div className="text-5xl font-bold text-[#eb3301]">129+</div>
          <div className="text-xl font-semibold">CLIENT EXPECTATIONS</div>
        </div>

        <div className="w-[210px] text-center">
          <div className="text-5xl font-bold text-[#eb3301]">66K</div>
          <div className="text-xl font-semibold">DELIVERED PROMISES</div>
        </div>

        <div className="w-[210px] text-center">
          <div className="text-5xl font-bold text-[#eb3301]">63K</div>
          <div className="text-xl font-semibold">COMPANY AWARDS</div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection