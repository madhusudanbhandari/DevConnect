import React from "react";
import {useNavigate} from "react-router-dom"
import axiosInstance from "../api/axios";


export default function CompleteProfile(){
    const navigate=useNavigate();

    const[form,setForm]=useState({
        full_name:"",
        headline:"",
        bio:"",
        location:"",
        avatar:"",
        github:"",
        linkedin:"",
        website:"",

    });
    
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});

    };

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            await axiosInstance.put(
                "profile/",
                form
            );
            navigate("/profile");
        }catch(err){
            toast.error(
                "Failed to save profile"
            )

        }
    }



    return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold">
          Complete Your Profile
        </h2>

        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="headline"
          placeholder="Headline"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="github"
          placeholder="GitHub URL"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="linkedin"
          placeholder="LinkedIn URL"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="website"
          placeholder="Website URL"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Save Profile
        </button>

      </form>
    </div>
  );
}