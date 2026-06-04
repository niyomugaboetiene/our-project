import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReservation = () => {
    const { id } = useParams();
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

    const getReservation = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/reservation/list/${id}`,
                { withCredentials: true }
            );

            const data = res.data.list[0];

            setReservation({
                Reservation_Date: data.Reservation_Date?.split("T")[0] || "",
                Start_Date: data.Start_Date?.split("T")[0] || "",
                End_Date: data.End_Date?.split("T")[0] || "",
                Reservation_Status: data.Reservation_Status || "",
                Rental_Date: data.Rental_Date?.split("T")[0] || "",
                Return_Date: data.Return_Date?.split("T")[0] || "",
                Rental_Fee: data.Rental_Fee || "",
                Rental_Status: data.Rental_Status || "",
                customer_nationa_id: data.customer_nationa_id || "",
                plate_number: data.plate_number || ""
            });

        } catch (err) {
            console.error(err);
            setError("Failed to load reservation");
        }
    };

    useEffect(() => {
        getReservation();
    }, [id]);

    const handleChange = (e) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/reservation/update/${id}`,
                reservation,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate("/reservation/list");
            }, 1500);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[700px]">

                <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">
                    Update Reservation
                </h1>

                {message && (
                    <div className="bg-green-200 p-2 rounded mb-2 text-green-700 font-bold">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="bg-red-200 p-2 rounded mb-2 text-red-700 font-bold">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">

                    <Input label="Reservation Date" name="Reservation_Date" type="date" value={reservation.Reservation_Date} handleChange={handleChange} />
                    <Input label="Start Date" name="Start_Date" type="date" value={reservation.Start_Date} handleChange={handleChange} />
                    <Input label="End Date" name="End_Date" type="date" value={reservation.End_Date} handleChange={handleChange} />

                    <Input label="Reservation Status" name="Reservation_Status" type="text" value={reservation.Reservation_Status} handleChange={handleChange} />
                    <Input label="Rental Date" name="Rental_Date" type="date" value={reservation.Rental_Date} handleChange={handleChange} />
                    <Input label="Return Date" name="Return_Date" type="date" value={reservation.Return_Date} handleChange={handleChange} />

                    <Input label="Rental Fee" name="Rental_Fee" type="number" value={reservation.Rental_Fee} handleChange={handleChange} />
                    <Input label="Rental Status" name="Rental_Status" type="text" value={reservation.Rental_Status} handleChange={handleChange} />

                    <Input label="Customer National ID" name="customer_nationa_id" type="text" value={reservation.customer_nationa_id} handleChange={handleChange} />
                    <Input label="Plate Number" name="plate_number" type="text" value={reservation.plate_number} handleChange={handleChange} />

                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full mt-5 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 transition"
                >
                    Update Reservation
                </button>

            </div>
        </div>
    );
};

const Input = ({ label, name, type, value, handleChange }) => (
    <div>
        <label className="block text-sky-500 font-bold mb-1">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full bg-sky-100 py-2 px-3 rounded-full focus:outline-sky-500"
        />
    </div>
);

export default UpdateReservation;