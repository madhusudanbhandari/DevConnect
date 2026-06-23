import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useEffect } from "react";

export default function FindDeveloper() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);


    const handleSearch = async () => {
        try {
            const res = await axiosInstance.get(
                `/profiles/find/?search=${search}`
            );

            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Find Developers
            </h1>

            {/* Search Box */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    value={search}
                    placeholder="Search by skill or username..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-80 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Results */}
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
                
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
                        >
                            {/* Username */}
                            <h2 className="text-xl font-bold text-gray-800">
                                {user.username}
                            </h2>

                            {/* Bio */}
                            <p className="text-gray-600 mt-1">
                                {user.bio || "No bio available"}
                            </p>

                            {/* Location */}
                            <p className="text-sm text-gray-500 mt-1">
                                📍 {user.location || "Unknown"}
                            </p>

                            {/* Skills */}
                            <div className="mt-3">
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    Skills
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {user.skills?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
                                        >
                                            {skill.skill} ({skill.level})
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="mt-4 flex gap-4">
                                {user.github && (
                                    <a
                                        href={user.github}
                                        target="_blank"
                                        className="text-sm text-gray-700 hover:text-black"
                                    >
                                        GitHub
                                    </a>
                                )}

                                {user.linkedin && (
                                    <a
                                        href={user.linkedin}
                                        target="_blank"
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                             <button>Contact</button>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-2 text-gray-500">
                        No developers found
                    </p>
                )}
                  
            </div>
         
        </div>
    );
}