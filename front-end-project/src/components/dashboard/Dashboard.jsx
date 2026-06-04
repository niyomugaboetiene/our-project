import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [totals, setTotals] = useState({});
    const [recentCars, setRecentCars] = useState([]);
    const [isLogged, setIsLogged] = useState(true);

    const navigate = useNavigate();

    const handleGetTotals = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/vehicle/report/totals",
                { withCredentials: true }
            );

            setTotals(res.data.totals);
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message === "Login first") {
                setIsLogged(false);
            }
        }
    };

    const handleGetRecentCars = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/vehicle/report/recent-cars",
                { withCredentials: true }
            );

            setRecentCars(res.data.cars);
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message === "Login first") {
                setIsLogged(false);
            }
        }
    };

    useEffect(() => {
        handleGetTotals();
        handleGetRecentCars();
    }, []);

    if (!isLogged) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-blue-400 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Security Alert
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Please login to access this data.
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Login Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-300 to-blue-400 mt-30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-20 bg-white/30 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-48 h-32 bg-white/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-24 bg-white/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/3 w-56 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="pt-8 pb-4 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
                        Dashboard
                        <span className="text-sm font-normal ml-4 text-white/80">Welcome back!</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Vehicles</p>
                                    <p className="text-4xl font-bold text-gray-800 mt-2">{totals?.vehicles || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Available</p>
                                    <p className="text-4xl font-bold text-green-600 mt-2">{totals?.available || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Rented</p>
                                    <p className="text-4xl font-bold text-blue-600 mt-2">{totals?.rented || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Revenue</p>
                                    <p className="text-4xl font-bold text-purple-600 mt-2">{totals?.totalValue || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           <div className="px-6 pb-8">
    <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Recent Cars</h2>
                <p className="text-gray-500 text-sm mt-1">Latest vehicles added to your fleet</p>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-3 text-left px-3">Plate Number</th>
                            <th className="py-3 text-left px-3">Brand</th>
                            <th className="py-3 text-left px-3">Model</th>
                            <th className="py-3 text-left px-3">Year</th>
                            <th className="py-3 text-left px-3">Type</th>
                            <th className="py-3 text-left px-3">Status</th>
                            <th className="py-3 text-left px-3">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentCars?.map((car, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0
                                        ? 'bg-sky-200'
                                        : 'bg-gray-200'
                                } text-gray-900 font-bold`}
                            >
                                <td className="py-3 px-3">
                                    {car.Plate_Number}
                                </td>
                                <td className="py-3 px-3">
                                    {car.Brand}
                                </td>
                                <td className="py-3 px-3">
                                    {car.Model}
                                </td>
                                <td className="py-3 px-3">
                                    {car.Year}
                                </td>
                                <td className="py-3 px-3">
                                    {car.Vehicle_Type}
                                </td>
                                <td className="py-3 px-3">
                                    {car.Status}
                                </td>
                                <td className="py-3 px-3">
                                    {car.Purchase_Price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {recentCars?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No cars found</p>
                </div>
            )}
        </div>
    </div>
</div>
        </div>
    );
};

export default Dashboard;