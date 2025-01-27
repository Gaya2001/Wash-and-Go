import React from 'react'
import HomeNavbar from './components/NavBar/HomeNavbar'
import HeroSection from './Pages/Home/HeroSection'
import AboutSection from './Pages/Home/AboutSection'
import Offer from './Pages/Home/Offer'
import Footer from './components/Footer/Footer'
import PackageSection from './Pages/Home/PackageSection'
import Test from './Test'


function App() {
    return (



        <div  >

            <div className='h-screen'>
                <HomeNavbar />
                <HeroSection />
            </div>
            <AboutSection />
            <PackageSection />
            <Offer />
            <Footer />



        </div >




        // <SessionProvider>

        //     <Test />
        // </SessionProvider>




    )
}

export default App