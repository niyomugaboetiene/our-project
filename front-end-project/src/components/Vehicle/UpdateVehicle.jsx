import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVehicle = () => {
    const navigate = useNavigate();
    const { plateNumber } = useParams();

    const [vehicle, setVehicle] = useState({
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

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/vehicle/list/${plateNumber}`,
                    { withCredentials: true }
                );

                setVehicle(res.data.list[0]);
            } catch (err) {
                console.error(err);
                setError("Failed to load vehicle data");
            }
        };

        fetchVehicle();
    }, [plateNumber]);

    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/vehicle/update/${plateNumber}`,
                vehicle,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate("/vehicle/list");
            }, 1500);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Update failed");
            setMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-sky-200 flex justify-center items-center mb-30">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/4">

                <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">
                    Update Vehicle
                </h1>

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

                {/* Plate Number */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Plate Number</label>
                    <input
                        type="text"
                        name="Plate_Number"
                        value={vehicle.Plate_Number}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                {/* Brand */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Brand</label>
                    <input
                        type="text"
                        name="Brand"
                        value={vehicle.Brand}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                {/* Model */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Model</label>
                    <input
                        type="text"
                        name="Model"
                        value={vehicle.Model}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                {/* Year */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Year</label>
                    <input
                        type="text"
                        name="Year"
                        value={vehicle.Year}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                {/* Vehicle Type */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Vehicle Type</label>
                    <input
                        type="text"
                        name="Vehicle_Type"
                        value={vehicle.Vehicle_Type}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                {/* Purchase Price */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Purchase Price</label>
                    <input
                        type="text"
                        name="Purchase_Price"
                        value={vehicle.Purchase_Price}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                {/* Status */}
                <div className="mt-2">
                    <label className="block text-sky-500 font-bold">Status</label>
                    <input
                        type="text"
                        name="Status"
                        value={vehicle.Status}
                        onChange={handleChange}
                        className="w-full bg-sky-100 py-3 rounded-full px-2"
                    />
                </div>

                <button
                    className="w-full py-3 rounded-full bg-sky-300 mt-3 text-white font-bold hover:bg-sky-400 transition"
                    onClick={handleSubmit}
                >
                    Update Vehicle
                </button>

            </div>
        </div>
    );
};

export default UpdateVehicle;