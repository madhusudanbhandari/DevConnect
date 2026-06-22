import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()

    useEffect(() => {
        fetchDashboard();
    }, []);

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

    const { user, profile, stats, suggested_developers } = data;

    return (
        <div className="min-h-screen bg-gray-100">
            
            <div className="bg-white shadow p-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    👋 Welcome back, {user.username}
                </h1>
                <p className="text-gray-500">
                    Role: {user.role || "Developer"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

                
                <div className="space-y-6">

                   
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">
                            👤 Profile Overview
                        </h2>

                        <div className="space-y-2 text-gray-700 text-sm">
                            <p><span className="font-semibold">Email:</span> {user.email}</p>
                            <p><span className="font-semibold">Bio:</span> {profile.bio || "Not added"}</p>
                            <p><span className="font-semibold">Location:</span> {profile.location || "Not set"}</p>
                        </div>


                       
                    </div>

                  
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">
                            ⚡ Quick Actions
                        </h2>

                        <div className="space-y-2">
                            <button onClick={()=>navigate("/complete-profile")} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                Edit Profile
                            </button>

                            <button  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900">
                                Add Skills
                            </button>

                            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                                Find Developers
                            </button>
                        </div>
                    </div>

                </div>

                {/* CENTER SECTION */}
                <div className="space-y-6">

                    {/* SKILLS */}
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">
                            🧠 Skills
                        </h2>

                        {profile.skills && profile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No skills added yet
                            </p>
                        )}
                    </div>

                    {/* STATS */}
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">
                            📊 Stats
                        </h2>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-xl font-bold">{stats.connections}</p>
                                <p className="text-sm text-gray-500">Connections</p>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="text-xl font-bold">{stats.projects}</p>
                                <p className="text-sm text-gray-500">Projects</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className="space-y-6">

                    {/* SUGGESTED DEVELOPERS */}
                    <div className="bg-white rounded-xl shadow p-5">
                        <h2 className="text-lg font-semibold mb-3">
                            🔥 Suggested Developers
                        </h2>

                        <div className="space-y-3">
                            {suggested_developers.length > 0 ? (
                                suggested_developers.map((dev, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border-b pb-2"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {dev.username}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {dev.role || "Developer"}
                                            </p>
                                        </div>

                                        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg">
                                            Connect
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No suggestions yet
                                </p>
                            )}
                        </div>
                    </div>

                    {/* PROFILE TIP CARD */}
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl shadow p-5">
                        <h2 className="font-semibold text-lg">
                            🚀 Improve your profile
                        </h2>
                        <p className="text-sm mt-2">
                            Add skills and projects to increase visibility and get more connections.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}