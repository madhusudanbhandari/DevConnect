import React, { useState } from "react";
import axiosInstance from "../api/axios";

export default function AddSkill() {
    const [form, setForm] = useState({
        skill: "",
        level: "",
    });
    const[error,setError]=useState("");
    const[msg,setMsg]=useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axiosInstance.post("profiles/skills/add/", form);
           
            setMsg("Skill added successfully!");
            setError("");
        }catch (err) {
            const data = err.response?.data;

            if (data?.skill) {
                setError(data.skill[0]);
            } else if (data?.detail) {
                setError(data.detail);
            } else {
                setError("Something went wrong.");
            }

            setMsg("");
    }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add Your Skill
                </h3>
                {error && (
                    <div className="bg-red-100 text-red-600">
                        {error}
                    </div>)}
                {msg && (
                    <div className="bg-green-100 text-green-700">
                        {msg}
                    </div>    
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Skill Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skill Name
                        </label>
                        <input
                            type="text"
                            name="skill"
                            value={form.skill}
                            onChange={handleChange}
                            placeholder="Enter your skill"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Level Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Skill Level
                        </label>
                        <select
                            name="level"
                            value={form.level}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select level</option>
                            <option value="begineer">Begineer</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="pro">Pro</option>
                        </select>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                    >
                        Add Skill
                    </button>
                </form>
            </div>
        </div>
    );
}