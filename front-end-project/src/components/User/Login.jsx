import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messsage, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { username, password }, { withCredentials: true });
            console.log("messsage", res.data.message);
            setMessage(res.data.message);


            // setTimeout(() => {
            //     navigate('/dashboard');
            // }, 2000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error occured");
        }
    }

    return (
        <div className="min-h-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-white p-3 rounded-xl shadow-lg w-1/5">

                {messsage && (
                    <p>{messsage}</p>
                )}
                {error && (
                    <p>{error}</p>
                )}
                <div className="mt-2">
                    <label htmlFor="" className="block text-sky-500 text-lg font-bold">User Name</label>
                    <input type="text" name="" id="" onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>
                
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" name="" id="" onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                      className="w-full bg-sky-100 py-3 rounded-full px-2 focus:outline-2 focus:outline-sky-500"
                    />
                </div>

                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;