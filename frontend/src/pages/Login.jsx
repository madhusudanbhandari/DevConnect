import React, { useState } from "react";
import { loginUser } from "../features/auth/authThunks";
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const[form,setForm]=useState({
        "username":"",
        "password":"",
   } )
   const [msg,setMessage]=useState("");
   const[error,setError]=useState("");

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
         await dispatch(loginUser(form));
            setMessage("Login Successfull")
            navigate("/profile")
            setError("");
        }catch(err){
            setMessage("")
            setError("Login Failed");
            
        }
    };


return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Login Please!
            </h3>

            {msg && <p className="text-green-400">{msg}</p>}
            {error && <p className=" text-red-500">{error}</p>} 


            <form onSubmit={handleSubmit} className="space-y-5">

               
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

               
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg 
                               hover:bg-blue-700 transition duration-200 font-medium"
                >
                    Login
                </button>
                <p>Dont have an account?</p>
                <Link to="/register">Register</Link>

            </form>
        </div>
    </div>
);
}