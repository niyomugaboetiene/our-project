import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Footer from "./components/dashboard/Footer";
import NavBar from "./components/dashboard/NavBar";

function App() {

  return (
      <BrowserRouter>
      <NavBar />
         <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
         </Routes>
         <Footer />
      </BrowserRouter>
  )
}

export default App
