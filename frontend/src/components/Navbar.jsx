import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate=useNavigate()
    return (
        <nav className="bg-blue-500 border-b shadow-sm sticky top-0 z-20 px-1">
            <div className="max-w-7xl mx-auto h-14 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-bold text-gray-800">
                        DevConnect
                    </h1>
                </div>

                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link
                        to="/complete-profile"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Edit Profile
                    </Link>

                    <Link
                        to="/add-skill"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Add Skills
                    </Link>

                    <Link
                        to="/find-developer"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        Find Developers
                    </Link>

                </div>

                <div className="flex items-center gap-3">

                    <button onClick={()=>navigate("/profile")} className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                        Profile
                    </button>

                    <button 
                    onClick={()=>{
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");

                        navigate("/")
                    }}
                    className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}