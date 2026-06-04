import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
    return (
        <div className="bottom-0 left-0 right-0 fixed bg-sky-900 h-60">
            <div className="flex justify-between text-white">
                <div className="bg-linear-to-l from-purple-500 to-sky-500 via-green-500 text-transparent bg-clip-text w-1/7">
                    <p className="text-2xl mt-4 ms-3 font-bold">Vehicle Rental</p>
                    <p className="ms-3 text-white font-bold">SalesPro Ltd is a company located in Huye District, southern province of Rwanda. It provides electronic equipment sales services.</p>
                </div>
                <div className="mt-4">
                    <h1 className="border-s-3 text-xl font-bold text-sky-500 mb-3">Quick Link</h1>
                    <div className="grid space-y-2">
                        <Link to={'/sales/report'} className="hover:text-sky-500 hover:translate-x-2 transition duration-200">Dashboard</Link>
                        <Link to={'/product/AddProduct'} className="hover:text-sky-500 hover:translate-x-2 transition duration-200">Customer</Link>
                        <Link to={'/sales/list'} className="hover:text-sky-500 hover:translate-x-2 transition duration-200">Reservation</Link>
                        <Link to={'/customer/list'} className="hover:text-sky-500 hover:translate-x-2 transition duration-200">Report</Link>
                        <Link to={'/customer/list'} className="hover:text-sky-500 hover:translate-x-2 transition duration-200">Vehicle</Link>
                    </div>
                </div>
                <div className="mt-4">
                    <h1 className="border-s-3 border-purple-500 text-xl font-bold text-sky-500 mb-3">Contact Us</h1>
                    <div className="grid space-y-2">
                        <p className="hover:text-sky-500 hover:translate-x-2 transition duration-200">rental@info.com</p>
                        <p className="hover:text-sky-500 hover:translate-x-2 transition duration-200">072 81 82399</p>
                    </div>
                </div>
                <div className="mt-4 me-5">
                    <p className="border-s-3 border-green-500 text-xl font-bold text-sky-500 mb-3">Let's go on Social</p>
                    <div className="grid grid-cols-2">
                       <p className="bg-red-500 py-3 flex justify-center rounded-lg me-3 hover:scale-110 transition duration-200"><FaYoutube /></p>
                       <p className="bg-sky-500 py-3 flex justify-center rounded-lg me-3 hover:scale-110 transition duration-200"><FaTwitter /></p>
                       <p className="bg-blue-500 py-3 flex justify-center rounded-lg me-3 mt-3 hover:scale-110 transition duration-200"><FaFacebook /></p>
                       <p className="bg-purple-500 py-3 flex justify-center rounded-lg me-3 mt-3 hover:scale-110 transition duration-200"><FaInstagram /></p>
                    </div>
                </div>
             </div>
        </div>
    )
}

export default Footer;