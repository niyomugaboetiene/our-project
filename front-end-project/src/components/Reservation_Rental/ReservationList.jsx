import axios from "axios";
import { useState, useEffect } from "react";

const ReservationRentalList = () => {
    const [list, setList] = useState([]);
    const [isLogged, setIsLogged] = useState(true);
    const [keyword, setKeyword] = useState("");

    const handleGetList = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/reservation_rental/list",
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

    // ✅ SEARCH FUNCTION (same style as CustomerList)
    const handleSearch = async () => {
        try {
            if (!keyword.trim()) {
                handleGetList();
                return;
            }

            const res = await axios.get(
                `http://localhost:5000/reservation_rental/search?keyword=${keyword}`,
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
            `http://localhost:5000/reservation_rental/delete/${id}`,
            { withCredentials: true }
        );

        // refresh list after delete
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
            <div className="max-w-7xl mx-auto w-full mt-35">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-sky-500 font-bold text-xl">
                        Reservation Rental List
                    </h1>
                </div>

                {/* ✅ SEARCH BAR (same style as your CustomerList) */}
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

                {/* TABLE */}
                <table className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-3 text-left px-3">Reservation ID</th>
                            <th className="py-3 text-left px-3">Customer Name</th>
                            <th className="py-3 text-left px-3">Room Number</th>
                            <th className="py-3 text-left px-3">Check In</th>
                            <th className="py-3 text-left px-3">Check Out</th>
                            <th className="py-3 text-left px-3">Status</th>
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
                                <td className="py-3 px-3">{item.Reservation_Id}</td>
                                <td className="py-3 px-3">{item.Customer_Name}</td>
                                <td className="py-3 px-3">{item.Room_Number}</td>
                                <td className="py-3 px-3">{item.Check_In_Date}</td>
                                <td className="py-3 px-3">{item.Check_Out_Date}</td>
                                <td className="py-3 px-3">{item.Status}</td>
                                <td className="py-3 px-3">
                                    <Link >Update</Link>
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