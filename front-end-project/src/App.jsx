import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Footer from "./components/dashboard/Footer";
import NavBar from "./components/dashboard/NavBar";
import Dashboard from "./components/dashboard/Dashboard";
import AddCustomer from "./components/Customer/AddCustomer";
import CustomerList from "./components/Customer/CustomerLIst";
import UpdateCustomer from "./components/Customer/UpdateCustomer";

import AddReservation from "./components/Reservation_Rental/AddReservation";
import UpdateReservation from "./components/Reservation_Rental/UpdateReservation";
import ReservationRentalList from "./components/Reservation_Rental/ReservationList";

import AddVehicle from "./components/Vehicle/AddVehicle";
import VehicleList from "./components/Vehicle/VehicleLIst";
import Report from "./components/dashboard/Report";
import UpdateVehicle from "./components/Vehicle/UpdateVehicle";

function App() {

  return (
      <BrowserRouter>
      <NavBar />
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>

            <Route path="/dashboard" element ={<Dashboard />}/>
            <Route path="/customer/add" element ={<AddCustomer />}/>
            <Route path="/customer/list" element ={<CustomerList />}/>
            <Route path="/customer/update/:National_Id" element ={<UpdateCustomer />}/>

            <Route path="/reservation/add" element={<AddReservation />}/>
            <Route path="/reservation/list" element={<ReservationRentalList />}/>
            <Route path="/reservation/update/:id" element={<UpdateReservation />}/>

            <Route path="/report" element={<Report />}/>

            <Route path="/vehicle/add" element={<AddVehicle />}/>
            <Route path="/vehicle/list" element={<VehicleList />}/>
            <Route path="/vehicle/update/:plateNumber" element={<UpdateVehicle />}/>
            </Routes>
         <Footer />
      </BrowserRouter>
  )
}

export default App
