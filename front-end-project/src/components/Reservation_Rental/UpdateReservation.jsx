import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Reservation_Date, setReservation_Date] = useState("");
    const [Start_Date, setStart_Date] = useState("");
    const [End_Date, setEnd_Date] = useState("");
    const [Reservation_Status, setReservation_Status] = useState("");
    const [Rental_Date, setRental_Date] = useState("");
    const [Return_Date, setReturn_Date] = useState("");
    const [Rental_Fee, setRental_Fee] = useState("");
    const [Rental_Status, setRental_Status] = useState("");
    const [customer_nationa_id, setCustomer_nationa_id] = useState("");
    const [plate_number, setPlate_number] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const getReservation = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/reservation/list/${id}`,
                { withCredentials: true }
            );

            const data = res.data.list[0];
            setReservation_Date(new Date(data.Reservation_Date).toISOString('').split('T'));
            setStart_Date(new Date(data.Start_Date).toISOString('').split('T'));
            setEnd_Date(new Date(data.End_Date).toISOString('').split('T'));
            setReservation_Status(data.Reservation_Status);
            setRental_Status(data.Rental_Status);
            setPlate_number(data.plate_number);
            setCustomer_nationa_id(data.customer_nationa_id);
            setRental_Date(new Date(data.Rental_Date).toISOString('').split('T'));
            setReturn_Date(new Date(data.Return_Date).toISOString('').split('T'));
            setRental_Fee(data.Rental_Fee);
            setReservation_Date(new Date(data.Reservation_Date).toISOString('').split('T'));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getReservation();
    }, []);


    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/reservation/update/${id}`,
                  {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
                { withCredentials: true }
            );

            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate("/reservation/list");
            }, 1500);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error occurred");
        }
    };

    return (
       <div className=" min-h-screen bg-sky-200 flex justify-center items-center mb-12">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/4">

                <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">
                    Update Reservation
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
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Reservation_Date
                    </label>
                    <input
                        type="date"
                        value={Reservation_Date}
                        onChange={(e) => setReservation_Date(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Start_Date
                    </label>
                    <input
                        type="date"
                        value={Start_Date}
                        onChange={(e) => setStart_Date(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
          
           </div>
   <div className="mt-2 grid grid-cols-2 space-x-2">
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        End_Date
                    </label>
                    <input
                        type="date"
                        value={End_Date}
                        onChange={(e) => setEnd_Date(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Reservation_Status
                    </label>
                    <input
                        type="text"
                        value={Reservation_Status}
                        onChange={(e) => setReservation_Status(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
          
           </div>
   <div className="mt-2 grid grid-cols-2 space-x-2">
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Rental_Date
                    </label>
                    <input
                        type="date"
                        value={Rental_Date}
                        onChange={(e) => setRental_Date(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Return_Date
                    </label>
                    <input
                        type="date"
                        value={Return_Date}
                        onChange={(e) => setReturn_Date(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
          
           </div>
           
           <div className="mt-2 grid grid-cols-2 space-x-2">
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Rental_Fee
                    </label>
                    <input
                        type="text"
                        value={Rental_Fee}
                        onChange={(e) => Rental_Fee(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        Rental_Status
                    </label>
                    <input
                        type="text"
                        value={Rental_Status}
                        onChange={(e) => setRental_Status(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
          
           </div>      


           <div className="mt-2 grid grid-cols-2 space-x-2">
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        customer_nationa_id
                    </label>
                    <input
                        type="text"
                        value={customer_nationa_id}
                        onChange={(e) => setCustomer_nationa_id(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    {/*                   {	Reservation_Date,	Start_Date,	End_Date,	Reservation_Status,	Rental_Date,	Return_Date,	Rental_Fee,	Rental_Status, customer_nationa_id, plate_number } ,
 */}
                    <label className="block text-sky-500 text-lg font-bold">
                        plate_number
                    </label>
                    <input
                        type="text"
                        value={plate_number}
                        onChange={(e) => setPlate_number(e.target.value)}
                        className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
          
           </div>

                <button
                    className="w-full py-3 rounded-full bg-sky-300 mt-3 text-white font-bold hover:bg-sky-400 hover:scale-105 transition duration-200"
                    onClick={handleUpdate}
                >
                    Update Reservation
                </button>

            </div>
        </div>
    );
};


export default UpdateReservation;