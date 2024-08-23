import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import NavBar from "./Components/NavBar.jsx"
import Test from "./Test.jsx"
import Offer from './Pages/Home/Offer.jsx';
import PackageSection from './Pages/Home/PackageSection.jsx';
import Footer from './Components/Footer.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
