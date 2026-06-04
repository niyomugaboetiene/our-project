import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCustomer = () => {
    const [Full_Name, setFullName] = useState("");
    const [National_Id, setNationalId] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [Address, setAddress] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { National_Id: id } = useParams();

    const handleGetCustomer = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/customer/list/${id}`,
                { withCredentials: true }
            );

            const data = res.data.list[0];

            setFullName(data.Full_Name);
            setNationalId(data.National_Id);
            setPhone(data.Phone);
            setEmail(data.Email);
            setAddress(data.Address);

        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/customer/update/${id}`,
                { Full_Name, National_Id, Phone, Email, Address },
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate("/customer/list");
            }, 1500);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error occurred");
            setMessage("");

            if (err.response?.data?.message === "Login first") {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        handleGetCustomer();
    }, []);

    return (
        <div className="min-h-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/4">

                <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">
                    Update Customer
                </h1>

                <p className="text-sky-500 text-center text-md mb-3 font-bold">
                    Edit customer information
                </p>

                {message && (
                    <div className="bg-green-200 py-2 px-3 rounded-lg mb-2">
                        <p className="text-green-700 font-bold">{message}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-200 py-2 px-3 rounded-lg mb-2">
                        <p className="text-red-700 font-bold">{error}</p>
                    </div>
                )}

   <div className="mt-2 grid grid-cols-2">
                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">Full Name</label>
                    <input
                        type="text"
                        value={Full_Name}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">National ID</label>
                    <input
                        type="number"
                        value={National_Id}
                        onChange={(e) => setNationalId(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
   </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">Phone</label>
                    <input
                        type="text"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">Email</label>
                    <input
                        type="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">Address</label>
                    <input
                        type="text"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full py-3 rounded-full bg-sky-300 mt-3 text-white font-bold hover:bg-sky-400 hover:scale-105 transition duration-200"
                >
                    Save Changes
                </button>

            </div>
        </div>
    );
};

export default UpdateCustomer;