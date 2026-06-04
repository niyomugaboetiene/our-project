import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        Full_Name: "",
        National_Id: "",
        Phone: "",
        Email: "",
        Address: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/customer/addNew",
                customer,
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

    return (
        <div className=" min-h-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/4">

                <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">
                    Add Customer
                </h1>

                <p className="text-sky-500 text-center text-md mb-3 font-bold">
                    Fill customer information
                </p>

                {message && (
                    <div className="bg-green-200 py-2 px-3 rounded-lg mb-2">
                        <p className="text-green-700 font-bold">
                            {message}
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-200 py-2 px-3 rounded-lg mb-2">
                        <p className="text-red-700 font-bold">
                            {error}
                        </p>
                    </div>
                )}

   <div className="mt-2 grid grid-cols-2 space-x-2">
                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="Full_Name"
                        placeholder="Full name"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        National ID
                    </label>
                    <input
                        type="number"
                        name="National_Id"
                        placeholder="National ID"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
   </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Phone
                    </label>
                    <input
                        type="text"
                        name="Phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Address
                    </label>
                    <input
                        type="text"
                        name="Address"
                        placeholder="Address"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <button
                    className="w-full py-3 rounded-full bg-sky-300 mt-3 text-white font-bold hover:bg-sky-400 hover:scale-105 transition duration-200"
                    onClick={handleSubmit}
                >
                    Add Customer
                </button>

            </div>
        </div>
    );
};

export default AddCustomer;