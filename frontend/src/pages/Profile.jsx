import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileThunk";
import { Link } from "react-router-dom";

export default function Profile(){
    const dispatch=useDispatch();
    const profile=useSelector((state)=>state.profile.data);

    useEffect(()=>{
        dispatch(fetchProfile());
    },[]);

    if (!profile) return <p>Loading...</p>
    console.log("Profile",profile)

    return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <div className="flex flex-col items-center">

        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
            {profile.username?.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {profile.username}
        </h2>

        <p className="mt-2 text-gray-600 text-center">
          {profile.bio || "No bio added yet."}
        </p>

        <div className="mt-4 flex items-center gap-2 text-gray-500">
          <span>📍</span>
          <span>{profile.location || "Location not specified"}</span>
        </div>

        <Link to="/complete-profile" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Complete Profile
        </Link>

      </div>
    </div>ss
  </div>
);

}