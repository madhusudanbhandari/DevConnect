import React, { useState } from "react";
import {  registerUser  } from "../features/auth/authThunks";
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const[form,setForm]=useState({
        "username":"",
        "email":"",
        "password":"",
   } )
   const[error,setError]=useState("");
   const[msg,setMsg]=useState("");

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };
    const dispatch=useDispatch();
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
         await dispatch(registerUser(form));
        console.log("Registration Successfull")
        navigate("/");
        setMsg("Registration Successfull");
        setError("");
        }catch(err){
            setError("Registration Failed")
            setMsg("");
            console.log(err);
        }
    };


return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Register Here!
            </h3>
            {msg && <p>{msg}</p>}
            {error && <p>{error}</p>}

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
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
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
                    Register
                </button>
                <p>Already have an account?</p>
                <Link to="/">Login</Link>

            </form>
        </div>
    </div>
);
}