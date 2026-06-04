import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ReservationRentalList = () => {
    const [list, setList] = useState([]);
    const [isLogged, setIsLogged] = useState(true);
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()

    const handleGetList = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/reservation/list",
                { withCredentials: true }
            );

            setList(res.data.list || []);
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message === "Login first") {
                setIsLogged(false);
            }
        }
    };

    useEffect(() => {
        handleGetList();
    }, []);

    const handleSearch = async () => {
        try {
            console.log("Searching keyword:", keyword);

            if (!keyword.trim()) {
                handleGetList();
                return;
            }

            const res = await axios.get(
                `http://localhost:5000/reservation/search?keyword=${encodeURIComponent(keyword)}`,
                { withCredentials: true }
            );

            setList(res.data.result || []);
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message === "Login first") {
                setIsLogged(false);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this reservation?");

            if (!confirmDelete) return;

            await axios.delete(
                `http://localhost:5000/reservation/delete/${id}`,
                { withCredentials: true }
            );

            await handleGetList();

        } catch (err) {
            console.error(err);
        }
    };

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
        <div className="min-h-screen bg-sky-50">
            <div className="mx-auto w-full mt-35">

                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-sky-500 font-bold text-xl">
                        Reservation Rental List
                    </h1>

                    <button
                        className="bg-sky-500 py-2 px-6 text-white font-bold rounded-lg"
                        onClick={() => navigate('/reservation/add')}
                    >
                        Add New
                    </button>                </div>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search reservation..."
                        className="border p-2 w-80 rounded-md"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-green-500 px-6 py-2 text-white font-bold rounded-md"
                    >
                        Search
                    </button>

                    <button
                        onClick={handleGetList}
                        className="bg-gray-500 px-6 py-2 text-white font-bold rounded-md"
                    >
                        Reset
                    </button>
                </div>

                <table className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-3 text-left px-3">Reservation ID</th>
                            <th className="py-3 text-left px-3">Reservation_Date</th>
                            <th className="py-3 text-left px-3">Start_Date</th>
                            <th className="py-3 text-left px-3">End_Date</th>
                            <th className="py-3 text-left px-3">Reservation_Status</th>
                            <th className="py-3 text-left px-3">Rental_Date</th>
                            <th className="py-3 text-left px-3">Return_Date</th>
                            <th className="py-3 text-left px-3">Rental_Fee</th>
                            <th className="py-3 text-left px-3">Rental_Status</th>
                            <th className="py-3 text-left px-3">Rental_Date</th>
                            <th className="py-3 text-left px-3">customer_nationa_id</th>
                            <th className="py-3 text-left px-3">plate_number</th>
                            <th className="py-3 text-left px-3" colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {list?.map((item, index) => (
                            <tr
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-sky-200" : "bg-gray-200"
                                } text-gray-900 font-bold`}
                            >
                                <td className="py-3 px-3">{item.id}</td>
                                <td className="py-3 px-3">{new Date(item.Reservation_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{new Date(item.Start_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{new Date(item.End_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{item.Reservation_Status}</td>
                                <td className="py-3 px-3">{new Date(item.Rental_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{new Date(item.Return_Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3">{item.Rental_Fee}</td>
                                <td className="py-3 px-3">{item.Rental_Status}</td>
                                <td className="py-3 px-3">{item.Rental_Fee}</td>
                                <td className="py-3 px-3">{item.customer_nationa_id}</td>
                                <td className="py-3 px-3">{item.plate_number}</td>
                                <td className="py-3 px-3">
                                    <Link className="bg-green-500 py-2 px-4 rounded-lg text-white" to={`/reservation/update/${item.id}`}>
                                        Update
                                    </Link>
                                </td>

                                <td className="py-3 px-3">
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 py-2 px-4 rounded-lg text-white"
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

export default ReservationRentalList;