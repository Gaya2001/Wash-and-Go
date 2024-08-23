import React from 'react'
import NavBar from './Components/NavBar'
import HeroSection from './Pages/Home/HeroSection'
import AboutSection from './Pages/Home/AboutSection'
import PackageSection from './Pages/Home/PackageSection'
import Offer from './Pages/Home/Offer'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <AboutSection />
      <PackageSection />
      <Offer />
      <Footer />



    </div>
  )
}

export default App