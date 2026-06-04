import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddReservation = () => {
    const navigate = useNavigate();

    const [reservation, setReservation] = useState({
        Reservation_Date: "",
        Start_Date: "",
        End_Date: "",
        Reservation_Status: "",
        Rental_Date: "",
        Return_Date: "",
        Rental_Fee: "",
        Rental_Status: "",
        customer_nationa_id: "",
        plate_number: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                "http://localhost:5000/reservation_rental/addNew",
                reservation,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate("/reservation_rental/list");
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
        <div className="min-h-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[700px]">

                <h1 className="text-sky-500 text-center text-xl mb-2 font-bold">
                    Add Reservation & Rental
                </h1>

                <p className="text-sky-500 text-center mb-4 font-bold">
                    Fill all reservation details
                </p>

                {/* Messages */}
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

                {/* ✅ GRID FORM (2 columns) */}
                <div className="grid grid-cols-2 gap-4">

                    <Input label="Reservation Date" name="Reservation_Date" type="date" handleChange={handleChange} />
                    <Input label="Start Date" name="Start_Date" type="date" handleChange={handleChange} />
                    <Input label="End Date" name="End_Date" type="date" handleChange={handleChange} />

                    <Input label="Reservation Status" name="Reservation_Status" type="text" handleChange={handleChange} />
                    <Input label="Rental Date" name="Rental_Date" type="date" handleChange={handleChange} />
                    <Input label="Return Date" name="Return_Date" type="date" handleChange={handleChange} />

                    <Input label="Rental Fee" name="Rental_Fee" type="number" handleChange={handleChange} />
                    <Input label="Rental Status" name="Rental_Status" type="text" handleChange={handleChange} />

                    <Input label="Customer National ID" name="customer_nationa_id" type="text" handleChange={handleChange} />
                    <Input label="Plate Number" name="plate_number" type="text" handleChange={handleChange} />

                </div>

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    className="w-full mt-5 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 transition"
                >
                    Add Reservation
                </button>

            </div>
        </div>
    );
};

// ✅ Reusable Input Component
const Input = ({ label, name, type, handleChange }) => (
    <div>
        <label className="block text-sky-500 font-bold mb-1">
            {label}
        </label>
        <input
            type={type}
            name={name}
            onChange={handleChange}
            className="w-full bg-sky-100 py-2 px-3 rounded-full focus:outline-sky-500"
        />
    </div>
);

export default AddReservation;