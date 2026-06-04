import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
            alert('Logged out successfully');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }
    return (
     <div className="fixed top-0 left-0 right-0">
        <div className="bg-sky-500 h-7 flex space-x-4 justify-end">
            <Link className="text-white font-bold " to={'/'}>Login</Link>
            <Link className="text-white font-bold me-3" to={'/register'}>Register</Link>
        </div>
         <div className="shadow-xl h-25 p-3 bg-sky-100">
            <div className="flex justify-between">
                <div className="bg-linear-to-l from-purple-500 to-sky-500 via-green-500 text-transparent bg-clip-text">
                    <p className="text-2xl mt-4 ms-3 font-bold">Vehical Rental</p>
                </div>
                <div className="mt-4">
                <nav className="flex space-x-5">
                    <Link className="hover:text-sky-500 transition-colors" to={''}>Dashboard</Link>
                    <Link className="hover:text-sky-500 transition-colors" to={'/product/list'}>Customer</Link>
                    <Link className="hover:text-sky-500 transition-colors" to={'/sales/list'}>Vehicle</Link>
                    <Link className="hover:text-sky-500 transition-colors" to={'/customer/list'}>Redervation Rental</Link>
                    <Link className="hover:text-sky-500 transition-colors" to={'/customer/list'}>Report</Link>
                </nav>
                </div>
                <div>
                   <button className="bg-red-500 px-6 py-2 rounded-lg text-white font-bold hover:bg-red-600 transition-colors" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
     </div>
    )
}

export default NavBar;