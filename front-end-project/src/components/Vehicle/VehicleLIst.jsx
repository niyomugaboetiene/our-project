import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VehicleList = () => {
    const [customers, setCustomers] = useState([]);
    const [isLogged, setIsLogged] = useState(true);
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const handleGetCustomers = async () => {
        try {
            const res = await axios.get(
                'http://localhost:5000/vehicle/list',
                { withCredentials: true }
            );

            setCustomers(res.data.list || []);
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message === 'Login first') {
                setIsLogged(false);
            }
        }
    };

    useEffect(() => {
        handleGetCustomers();
    }, []);

    const handleSearch = async () => {
        try {
            console.log("Searching keyword:", keyword);

            if (!keyword.trim()) {
                handleGetCustomers();
                return;
            }

            const res = await axios.get(
                `http://localhost:5000/vehicle/search?keyword=${encodeURIComponent(keyword)}`,
                { withCredentials: true }
            );

            setCustomers(res.data.result || []);
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message === 'Login first') {
                setIsLogged(false);
            }
        }
    };

    const handleDelete = async (nationalId) => {
        try {
            const confirmDelete = window.confirm("Are you sure ?");

            if (confirmDelete) {
                await axios.delete(
                    `http://localhost:5000/vehicle/delete/${nationalId}`,
                    { withCredentials: true }
                );

                await handleGetCustomers();
            }
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message === 'Login first') {
                setIsLogged(false);
            }
        }
    };

    if (!isLogged) {
        return (
            <div className="bg-yellow-300 p-3 mt-70 w-1/4 ms-180 h-40 rounded-lg">
                <div>
                    <h2 className="text-center text-lg text-white font-bold mt-4">
                        Security Alert
                    </h2>

                    <p className="text-center text-yellow-700 font-bold">
                        Please login to access this data.
                    </p>

                    <button
                        onClick={() => navigate('/login')}
                        className="bg-sky-500 ms-40 mt-3 py-3 px-12 rounded-full text-white font-black"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-sky-50">
            <div className="max-w-7xl mx-auto w-full mt-35">

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-sky-500 font-bold text-xl">
                        Vehicle List
                    </h1>

                    <button
                        className="bg-sky-500 py-2 px-6 text-white font-bold rounded-lg"
                        onClick={() => navigate('/vehicle/add')}
                    >
                        Add New
                    </button>
                </div>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search customer..."
                        className="border p-2 w-80 rounded-md"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-green-500 px-6 py-2 text-white font-bold rounded-md"
                    >
                        Search
                    </button>

                    <button
                        onClick={handleGetCustomers}
                        className="bg-gray-500 px-6 py-2 text-white font-bold rounded-md"
                    >
                        Reset
                    </button>
                </div>

                <table className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-3 text-left px-3">Plate_Number</th>
                            <th className="py-3 text-left px-3">Brand</th>
                            <th className="py-3 text-left px-3">Model</th>
                            <th className="py-3 text-left px-3">Year</th>
                            <th className="py-3 text-left px-3">Vehicle_Type</th>
                            <th className="py-3 text-left px-3">Purchase_Price</th>
                            <th className="py-3 text-left px-3">Status</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers?.map((customer, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? 'bg-sky-200' : 'bg-gray-200'
                                } text-gray-900 font-bold`}
                            >
                                <td className="py-3 px-3">{customer.Plate_Number}</td>
                                <td className="py-3 px-3">{customer.Brand}</td>
                                <td className="py-3 px-3">{customer.Model}</td>
                                <td className="py-3 px-3">{customer.Year}</td>
                                <td className="py-3 px-3">{customer.Vehicle_Type}</td>
                                <td className="py-3 px-3">{customer.Purchase_Price}</td>
                                <td className="py-3 px-3">{customer.Status}</td>

                                <td>
                                    <Link
                                        to={`/vehicle/update/${customer.Plate_Number}`}
                                        className="bg-green-500 py-2 px-6 rounded-lg text-white"
                                    >
                                        Update
                                    </Link>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(customer.Plate_Number)}
                                        className="bg-red-500 py-2 px-6 rounded-lg text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default VehicleList;