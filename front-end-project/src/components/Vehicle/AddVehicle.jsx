import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
            Plate_Number: "",
            Brand: "",
            Model: "",
            Year: "",
            Vehicle_Type: "",
            Purchase_Price: "",
            Status: ""
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
            console.log(customer);
            const res = await axios.post(
                "http://localhost:5000/vehicle/addNew",
                customer,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate("/vehicle/list");
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
        <div className=" min-h-screen bg-sky-200 flex justify-center items-center mb-20">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/4">

                <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">
                    Add Vehicle
                </h1>
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
                          Plate NUmber
                    </label>
                    <input
                        type="text"
                        name="Plate_Number"
                        placeholder="Plate_Number"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Brand
                    </label>
                    <input
                        type="text"
                        name="Brand"
                        placeholder="Brand"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
   </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Model
                    </label>
                    <input
                        type="text"
                        name="Model"
                        placeholder="Model"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Year
                    </label>
                    <input
                        type="text"
                        name="Year"
                        placeholder="Year"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Vehicle_Type
                    </label>
                    <input
                        type="text"
                        name="Vehicle_Type"
                        placeholder="Vehicle_Type"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Purchase_Price
                    </label>
                    <input
                        type="text"
                        name="Purchase_Price"
                        placeholder="Purchase_Price"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    <label className="block text-sky-500 text-lg font-bold">
                        Status
                    </label>
                    <input
                        type="text"
                        name="Status"
                        placeholder="Status"
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <button
                    className="w-full py-3 rounded-full bg-sky-300 mt-3 text-white font-bold hover:bg-sky-400 hover:scale-105 transition duration-200"
                    onClick={handleSubmit}
                >
                    Add Vehicle
                </button>

            </div>
        </div>
    );
};

export default AddVehicle;