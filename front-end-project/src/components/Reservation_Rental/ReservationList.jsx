import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ReservationRentalList = () => {
    const [list, setList] = useState([]);
    const [isLogged, setIsLogged] = useState(true);
    const [keyword, setKeyword] = useState("");

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
            if (!keyword.trim()) {
                handleGetList();
                return;
            }

            const res = await axios.get(
                `http://localhost:5000/reservation/search?keyword=${keyword}`,
                { withCredentials: true }
            );

            setList(res.data.result || []);
        } catch (err) {
            console.error(err);
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
            <div className="bg-yellow-300 p-3 mt-70 w-1/4 ms-180 h-40 rounded-lg">
                <div>
                    <h2 className="text-center text-lg text-white font-bold mt-4">
                        Security Alert
                    </h2>

                    <p className="text-center text-yellow-700 font-bold">
                        Please login to access this data.
                    </p>
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
                </div>

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
                            <th className="py-3 text-left px-3">Added by</th>
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
                                <td className="py-3 px-3">{item.user_id}</td>
                                <td className="py-3 px-3">
                                    <Link className="bg-green-500 py-2 px-4 rounded-lg text-white" to={`/reservation/update/${item.id}`}>Update</Link>
                                </td>
                                <td className="py-3 px-3">
                                    <td>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                         className="bg-red-500 py-2 px-4 rounded-lg text-white"
                                   >
                                       Delete
                                   </button>
                                </td>
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