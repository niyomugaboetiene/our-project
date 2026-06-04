import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
    //  Full_Name, National_Id, Phone, Email, Address
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [messsage, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:5000/customer/addNew', { username, password, role }, { withCredentials: true });
            console.log("messsage", res.data.message);
            setMessage(res.data.message);
            setError("");

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error occured");
            setMessage("");
        }
    }

    return (
        <div className="min-h-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/5">

             <h1 className="text-sky-500 text-center text-xl mb-3 font-bold">Register Portal</h1>
             <p className="text-sky-500 text-center text-md mb-3 font-bold">Allowed members Only</p>
                {messsage && (
                   <div className="bg-green-200 py-2  px-3 rounded-lg">
                     <p className="text-green-700 font-bold">{messsage}</p>
                   </div>
                )}
                {error && (
                    <div className="bg-red-200 py-2  px-3 rounded-lg">
                        <p className="text-red-700 font-bold">{error}</p>
                    </div>
                )}
                <div className="mt-2">
                    <label htmlFor="" className="block text-sky-500 text-lg font-bold">User Name</label>
                    <input type="text" placeholder="User name" onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    <label htmlFor="" className="block text-sky-500 text-lg font-bold">Password</label>
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                      className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div className="mt-2">
                    <label htmlFor="" className="block text-sky-500 text-lg font-bold">Role</label>
                    <input type="text" placeholder="Role" onChange={(e) => {
                        setRole(e.target.value)
                    }}
                      className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <button className="w-full py-3 rounded-full bg-sky-300 mt-3 text-white font-bold hover:bg-sky-400 hover:scale-105 transition duration-200" onClick={handleRegister}>Register</button>
            </div>
        </div>
    )
}

export default AddCustomer;