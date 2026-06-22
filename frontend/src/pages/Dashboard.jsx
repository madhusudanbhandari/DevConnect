import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    const[myskills,setMySkills]=useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    useEffect(()=>{
        getSkills();
        
    })
    const getSkills=async()=>{
        try{
            const res=await axiosInstance.get("profiles/skills/");
            setMySkills(res.data);
        }catch(err){
            console.log(err)
        }
    }

    const fetchDashboard = async () => {
        try {
            const res = await axiosInstance.get("dashboard/dash/");
            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                Failed to load dashboard
            </div>
        );
    }

    const { user, profile, stats, suggested_developers} = data;

    return (
       
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
         <Navbar/>
        {/* Top Header */}
        <div className="bg-white/80 backdrop-blur border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        👋 Welcome back, {user.username}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Build. Connect. Grow your developer network.
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-400">Role</p>
                    <p className="font-semibold text-gray-700">
                        {user.role || "Developer"}
                    </p>
                </div>
            </div>
        </div>

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* LEFT COLUMN */}
            <div className="space-y-6">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        👤 Profile Overview
                    </h2>

                    <div className="space-y-3 text-sm text-gray-600">
                        <div>
                            <p className="text-xs text-gray-400">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">Bio</p>
                            <p>{profile.bio || "No bio added yet"}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p>{profile.location || "Not set"}</p>
                        </div>
                    </div>
                </div>

               

            </div>

            {/* MIDDLE COLUMN */}
            <div className="space-y-6">

                {/* Skills */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        🧠 Skills
                    </h2>

                    {myskills && myskills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {myskills.map((skills, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                                >
                                    {skills.skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">
                            No skills added yet
                        </p>
                    )}
                </div>

                {/* Stats */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        📊 Stats
                    </h2>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="p-4 rounded-xl bg-gray-50 border text-center">
                            <p className="text-2xl font-bold text-gray-800">
                                {stats.connections}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Connections
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gray-50 border text-center">
                            <p className="text-2xl font-bold text-gray-800">
                                {stats.projects}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Projects
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">

                {/* Suggested Developers */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        🔥 Suggested Developers
                    </h2>

                    <div className="space-y-3">
                        {suggested_developers.length > 0 ? (
                            suggested_developers.map((dev, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {dev.username}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {dev.role || "Developer"}
                                        </p>
                                    </div>

                                    <button className="text-xs px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                                        Connect
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400">
                                No suggestions yet
                            </p>
                        )}
                    </div>
                </div>

                {/* Motivational Card */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow p-6">
                    <h2 className="text-lg font-semibold">
                        🚀 Improve your profile
                    </h2>
                    <p className="text-sm mt-2 text-white/90">
                        Add skills, projects, and bio to increase visibility and get more connections.
                    </p>
                </div>

            </div>

        </div>
    </div>
);
}