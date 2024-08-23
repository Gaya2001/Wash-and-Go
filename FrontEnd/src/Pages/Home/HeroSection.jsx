import React from "react";




function HeroSection() {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover w-full h-screen">
      <div className="w-[550px] text-white flex flex-col relative top-1/3 left-10 gap-2">
        <h4 className="w-full mt-5 font-bold">
          NON STOP CAR SERVICES CENTER
        </h4>
        <h1 className="text-6xl font-bold text-[white] mt-4">
          Get Your <span className="text-[#eb3301]">Amazing</span> Car
          Solution
        </h1>
        <p className="mt-4 text-xl">
          Take Payments online with scalable platform that grows your perfect
          business
        </p>
        <div className="mx-auto">
          <button className="bg-[#eb3301] px-4 py-3 text-xl font-bold w-[180px]">
            GET A QUOTE
          </button>
        </div>
      </div>
    </div>

  )
}

export default HeroSection