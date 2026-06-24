import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useEffect } from "react";

export default function FindDeveloper() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const fetchDevelopers = async () => {
        try {
            const res = await axiosInstance.get("profiles/find/");
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDevelopers();
    }, []);

    const handleSearch = async () => {
        try {
            const res = await axiosInstance.get(`/profiles/find/?search=${search}`);
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const sendRequest=async(id)=>{
        try{
            await axiosInstance.post("/connections/send-request/",{
                to_user:id
            });
            alert("Request sent");
        }catch(err){
            alert(err.response?.data?.message);
            
        }
    };

    
    return (
        <div className="min-h-screen bg-gray-50 p-6">

          
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Find Developers</h1>
                <p className="text-gray-400 text-sm mt-1">Discover talented developers by skill or username</p>
            </div>

            <div className="flex justify-center mb-10">
                <div className="flex w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center pl-4 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={search}
                        placeholder="Search by skill or username..."
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 px-3 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold px-6 py-3 transition-all duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>


            <div className="max-w-5xl mx-auto grid gap-5 md:grid-cols-2">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-4"
                        >
                   
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-base font-bold text-gray-800 truncate">{user.username}</h2>
                                    {user.headline && (
                                        <p className="text-xs text-violet-500 font-medium truncate">{user.headline}</p>
                                    )}
                                    {user.location && (
                                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {user.location}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                {user.bio || "No bio available"}
                            </p>

                            {user.skills && user.skills.length > 0 && (
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {user.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className={`px-2.5 py-1 text-xs font-medium rounded-full border`}
                                            >
                                                {skill.skill}
                                                <span className="ml-1 opacity-60">· {skill.level}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div className="flex gap-3">
                                    {user.github && (
                                        <a
                                            href={user.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                    {user.linkedin && (
                                        <a
                                            href={user.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            LinkedIn
                                        </a>
                                    )}
                                </div>

                                <button onClick={()=>sendRequest(user.id)} 
                                    className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-1.5 rounded-lg transition-all duration-200 shadow-sm">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    Connect
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">No developers found</p>
                        <p className="text-gray-300 text-xs mt-1">Try a different skill or username</p>
                    </div>
                )}
            </div>
        </div>
    );
}