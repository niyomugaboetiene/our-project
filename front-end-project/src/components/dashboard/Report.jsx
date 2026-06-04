import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
    const [recentCars, setRecentCars] = useState([]);
    const [isLogged, setIsLogged] = useState(true);

    const navigate = useNavigate();


    const handleGetReport = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/reservation/report/full",
                { withCredentials: true }
            );

            setRecentCars(res.data.report);
        } catch (err) {
            console.error(err);
            if (err.response?.data?.message === "Login first") {
                setIsLogged(false);
            }
        }
    };

    useEffect(() => {
        handleGetReport();
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
                            onClick={() => navigate("/login")}
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
            

            <div className="pt-8 pb-4 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
                        Report
                        <span className="text-sm font-normal ml-4 text-white/80">Welcome back!</span>
                    </h1>
                </div>
            </div>

           <div className="px-6 pb-8">
    <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Report</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-3 text-left px-3">Full Name</th>
                            <th className="py-3 text-left px-3">National_Id</th>
                            <th className="py-3 text-left px-3">Phone</th>
                            <th className="py-3 text-left px-3">Plate_Number</th>
                            <th className="py-3 text-left px-3">Brand</th>
                            <th className="py-3 text-left px-3">Model</th>
                            <th className="py-3 text-left px-3">Year</th>
                            <th className="py-3 text-left px-3">Vehicle_Type</th>
                            <th className="py-3 text-left px-3">Reservation_Date</th>
                            <th className="py-3 text-left px-3">Start_Date</th>
                            <th className="py-3 text-left px-3">End_Date</th>
                            <th className="py-3 text-left px-3">Reservation_Status</th>
                            <th className="py-3 text-left px-3">Rental_Date</th>
                            <th className="py-3 text-left px-3">Return_Date</th>
                            <th className="py-3 text-left px-3">Rental_Fee</th>
                            <th className="py-3 text-left px-3">Rental_Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentCars?.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0
                                        ? 'bg-sky-200'
                                        : 'bg-gray-200'
                                } text-gray-900 font-bold`}
                            >
                                                    {/*                 c.Full_Name AS customerFullName,
                c.National_Id AS customerNationalId,
                c.Phone AS customerPhone,

                v.Plate_Number AS vehiclePlateNumber,
                v.Brand AS vehicleBrand,
                v.Model AS vehicleModel,
                v.Year AS vehicleYear,
                v.Vehicle_Type AS vehicleType,

                rr.Reservation_Date,
                rr.Start_Date AS rentalStartDate,
                rr.End_Date AS rentalEndDate,
                rr.Reservation_Status,
                rr.Rental_Date,
                rr.Return_Date,
                rr.Rental_Fee,
                rr.Rental_Status */}
                                <td className="py-3 px-3">{item.customerFullName}</td>
                                <td className="py-3 px-3">{item.customerNationalId}</td>
                                <td className="py-3 px-3">{item.customerPhone}</td>
                                <td className="py-3 px-3">{item.vehiclePlateNumber}</td>
                                <td className="py-3 px-3">{item.vehicleBrand}</td>
                                <td className="py-3 px-3">{item.vehicleModel}</td>
                                <td className="py-3 px-3">{item.vehicleYear}</td>
                                <td className="py-3 px-3">{item.vehicleType}</td>
                                <td className="py-3 px-3">{new Date(item.Reservation_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{new Date(item.rentalStartDate).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{new Date(item.rentalEndDate).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{item.Reservation_Status}</td>
                                <td className="py-3 px-3">{new Date(item.Rental_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{new Date(item.Return_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{item.Rental_Fee}</td>
                                <td className="py-3 px-3">{item.Rental_Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {recentCars?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No Report found</p>
                </div>
            )}
        </div>
    </div>
</div>
        </div>
    );
};

export default Report;