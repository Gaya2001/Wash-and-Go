import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './Pages/AdminDashboard/Dashboard.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Packages_Dashboard from './Pages/AdminDashboard/ServicePackages/Packages_Dashboard.jsx'
import Add_Package from './Pages/AdminDashboard/ServicePackages/Add_Package.jsx'
import Cus_Details from './Pages/AdminDashboard/ManageCustomers/Customer_Details.jsx'
import Update_Package from './Pages/AdminDashboard/ServicePackages/Update_Package.jsx'
import App from './App.jsx';
import HomeNavbar from './components/NavBar/HomeNavbar.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword.jsx';
import ChangePassword from './Pages/ChangePassword/ChangePassword.jsx';
import StoreNavbar from './components/NavBar/StoreNavbar.jsx';
import Packages from './Pages/CustomerSide/ServicePackages/Packages.jsx'
import PackageDetails from './Pages/CustomerSide/ServicePackages/PackageDetails.jsx'
import UpdateCustomers from "./Pages/AdminDashboard/ManageCustomers/UpdateCustomers.jsx"
import AddCustomers from "./Pages/AdminDashboard/ManageCustomers/AddCustomers.jsx"
import ContactUs from './Pages/ContactUs/ContactUs.jsx';
import Profile from './Pages/CustomerSide/CustomerProfile/Profile.jsx';
import CustomerHeader from './components/CustomerDashboard/CustomerHeader.jsx';
import CustomerSideBar from './components/CustomerDashboard/CustomerSideBar.jsx';
import EditProfile from './Pages/CustomerSide/CustomerProfile/EditProfile.jsx';
import Test from './Test.jsx';
import Recovery from './Pages/CustomerSide/CustomerProfile/Recovery.jsx';
import DeleteProfile from './Pages/CustomerSide/CustomerProfile/DeleteProfile.jsx';
import Appointment1 from './Pages/CustomerSide/AppointmentManage/Appointment_1.jsx';
import Appointment5 from './Pages/CustomerSide/AppointmentManage/Appointment_View1.jsx';
import Reservation from './Pages/AdminDashboard/Reservation/Reservations.jsx';
import UpdateAppointment from './Pages/CustomerSide/CustomerProfile/updateAppointment.jsx';
import Reservation_Profile from './Pages/CustomerSide/CustomerProfile/Reservations_Profile.jsx'
import Offers from './Pages/Offers/Offers.jsx';
import OffersDashboard from './Pages/AdminDashboard/OffersDashboard/OffersDashboard.jsx';
import Add_Offer from './Pages/AdminDashboard/OffersDashboard/Add_Offer.jsx';
import UpdateOffers from './Pages/AdminDashboard/OffersDashboard/UpdateOffers.jsx';
import ReferralDashboard from './Pages/AdminDashboard/ReferralDashboard/ReferralDashboard.jsx';
import AddReferral from './Pages/AdminDashboard/ReferralDashboard/AddReferral.jsx';
import UpdateReferral from './Pages/AdminDashboard/ReferralDashboard/UpdateReferral.jsx';
import StoreNavBar from './components/NavBar/StoreNavbar.jsx';
import StoreSideNavbar from './Pages/../components/Dashboards/StoreSideNavBar.jsx';
import StoreDashboard from './Pages/AdminDashboard/StoreManager/StoreDashboard.jsx';
import StoreItem from './Pages/AdminDashboard/StoreManager/StoreItem.jsx';
import AddItem from './Pages/AdminDashboard/StoreManager/AddItem.jsx'
import StoreItemView from './Pages/AdminDashboard/StoreManager/StoreItemView.jsx';
import StoreItemUpdate from './Pages/AdminDashboard/StoreManager/StoreItemUpdate.jsx';
import StoreOil from './Pages/Store/StoreOil.jsx';
import StoreDecorations from './Pages/Store/StoreDecoration.jsx';
import StoreSpareParts from './Pages/Store/StoreSpareParts.jsx';
import ProductCart from './components/Dashboards/ProductCard.jsx';
import RecoveryDashboard from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryDashboard.jsx";
import RecoveryPending from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryPending.jsx";
import RecoveryPendingDetails from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryPendingDetails.jsx";
import RecoveryHome from "./Pages/CustomerSide/Recovery/RecoveryMain.jsx"
import Recoverydetails from "./Pages/CustomerSide/Recovery/RecoveryForm.jsx"
import RecoveryOngoing from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryOngoing.jsx"
import RecoveryOngoingDetails from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryOngingDeatails.jsx"
import RecoveryCompleted from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryCompleted.jsx"
import RecoveryCompletedDetails from "./Pages/AdminDashboard/RecoveryAdmin/RecoveryCompletedDeatails.jsx"
import Drivers from "./Pages/AdminDashboard/RecoveryAdmin/Drivers.jsx"
import Cart from './Pages/Cart/Cart.jsx';
import Checkout from './Pages/Checkout/Checkout.jsx';

const router = createBrowserRouter([


  // ======================== Client  Side=====================

  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/HomeContactUs",
    element: <ContactUs />,
  },

  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/ChangePassword",
    element: <ChangePassword />,
  },
  {
    path: "/StoreNavbar",
    element: <StoreNavbar />,
  },
  {
    path: "/packages",
    element: <Packages />,
  },
  {
    path: "/packages/:id",
    element: <PackageDetails />,
  },
  {
    path: "/Test",
    element: <Test />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/CustomerSideBar",
    element: <CustomerSideBar />,
  },
  {
    path: "/CustomerSideBar",
    element: <CustomerHeader />,
  },
  {
    path: "/EditProfile",
    element: <EditProfile />,
  },
  {
    path: "/Reservation",
    element: <Reservation />,
  },
  {
    path: "/Recovery",
    element: <Recovery />,
  },
  {
    path: "/DeleteProfile",
    element: <DeleteProfile />,
  },

  // --------- Reservations ---------------

  {
    path: "/appointment",
    element: <Appointment1 />,
  },
  {
    path: "/appointment4",
    element: <Appointment5 />,
  },
  {
    path: "/profile_reservation",
    element: <Reservation_Profile />,
  },
  {
    path: "/profile_reservation/appointment_update/:id",
    element: <UpdateAppointment />,
  },

  // ------------ Offers ----------------

  {
    path: "/Offers",
    element: <Offers />,
  },
  {
    path: "/add_offer",
    element: <Add_Offer />,
  },

  // ------------- Store -----------------

  {
    path: "/StoreNavBar",
    element: <StoreNavBar/>
  },
  {
    path: "/StoreOil",
    element: <StoreOil/>
  },
  {
    path: "/StoreDecorations",
    element: <StoreDecorations/>
  },
  {
    path: "/StoreSpareParts",
    element: <StoreSpareParts/>
  },
  {
    path: "/ProductCard",
    element: <ProductCart/>
  },

  // -------------- Recovery ---------------

  {
    path: "/RecoveryHome",
    element: <RecoveryHome />,
  },
  {
    path: "/Recoverydetails",
    element: <Recoverydetails />,
  },
//-----------------Cart---------------------
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "Checkout",
    element: <Checkout />
  },

  // ======================== Admin Side=====================

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dash_packages",
    element: <Packages_Dashboard />,
  },
  {
    path: "/packages/addpckg",
    element: <Add_Package />,
  },
  {
    path: "/cus_details",
    element: <Cus_Details />,
  },
  {
    path: "/cus_details_update/:id",
    element: <UpdateCustomers />,
  },
  {
    path: "/cus_Add",
    element: <AddCustomers />,
  },
  {
    path: "/packages/update",
    element: <Update_Package />,
  },
  {
    path: "/packages/update/:id",
    element: <Update_Package />,
  },

// ---------------- Reservations ---------------

{
  path: "/reservations",
  element: <Reservation />,
},

{
  path: "/appointment/:id",
  element: <Appointment5 />,
},

// ----------------- Offers -----------------

  {
    path: "/offers_dash",
    element: <OffersDashboard/>,
  },
  {
    path: "/update_offer/:id",
    element: <UpdateOffers/>,
  },
  {
    path: "/referrals_dash",
    element: <ReferralDashboard />,
  },
  {
    path: "/add_referral",
    element: <AddReferral />,
  },
  {
    path: "/update_referral/:id",
    element: <UpdateReferral />,
  },


  // --------------- Store ----------------

  {
    path: "/StoreSideNavBar",
    element: <StoreSideNavbar />,
  },
  {
    path: "/StoreDashboard",
    element: <StoreDashboard />,
  },
  {
    path: "/StoreItem",
    element: <StoreItem />,
  },
  {
    path: "/AddItem",
    element: <AddItem />,
  },
  {
    path:"/StoreItemView",
    element: <StoreItemView/>
  },
  {
    path:"/StoreItemUpdate",
    element: <StoreItemUpdate/>
  },

  // -------------- Recovery ----------------

  {
    path: "/Dashboard/recoveryDash",
    element: <RecoveryDashboard />,
  },

  {
    path: "/Dashboard/recoveryPendingDash",
    element: <RecoveryPending />,
  },
  {
    path: "/user-details/:userId",
    element: <RecoveryPendingDetails />,
  },
  {
    path: "/Dashboard/Ongoing",
    element: <RecoveryOngoing />,
  },
  {
    path: "/Onging-details/:userId",
    element: <RecoveryOngoingDetails />,
  },
  {
    path: "/Dashboard/Completed",
    element: <RecoveryCompleted />,
  },
  {
    path: "/Completed-details/:userId",
    element: <RecoveryCompletedDetails />,
  },
  {
    path: "/Dashboard/Drivers",
    element: <Drivers/>,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
