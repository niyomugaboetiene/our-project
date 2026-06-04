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
                `http://localhost:5000/reservation_rental/list/${id}`,
                { withCredentials: true }
            );

            setReservation(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getReservation();
    }, []);

    const handleChange = (e) => {
        setReservation({
            ...reservation,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/reservation_rental/update/${id}`,
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
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-sky-200">
            <div className="bg-white p-6 rounded-xl w-[700px]">

                <h1 className="text-center font-bold text-sky-500 mb-4">
                    Update Reservation
                </h1>

                <div className="grid grid-cols-2 gap-4">

                    {Object.keys(reservation).map((key) => (
                        <div key={key}>
                            <label className="font-bold text-sky-500">
                                {key}
                            </label>
                            <input
                                type="text"
                                name={key}
                                value={reservation[key] || ""}
                                onChange={handleChange}
                                className="w-full bg-sky-100 p-2 rounded-full"
                            />
                        </div>
                    ))}

                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full mt-5 bg-sky-500 text-white py-3 rounded-full font-bold"
                >
                    Update Reservation
                </button>

            </div>
        </div>
    );
};

export default UpdateReservation;