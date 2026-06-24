import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myskills, setMySkills] = useState(null);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { fetchDashboard(); }, []);
  useEffect(() => { getSkills(); }, []);
  useEffect(() => { getConnections(); }, []);

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

  const getSkills = async () => {
    try {
      const res = await axiosInstance.get("profiles/skills/");
      setMySkills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getConnections = async () => {
    try {
      const res = await axiosInstance.get("connections/my-connections/");
      setConnections(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load dashboard
      </div>
    );
  }

  const { user, profile, stats, suggested_developers } = data;

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            👋 Welcome back, {user.username}
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Build. Connect. Grow your developer network.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Role</p>
          <p className="text-base font-semibold text-indigo-600">
            {user.role || "Developer"}
          </p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">

        <div className="col-span-3 space-y-5">

        
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mb-3">
                {getInitials(user.username)}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{user.username}</h2>
              <p className="text-sm text-indigo-500 font-medium">{user.role || "Developer"}</p>
              <p className="text-xs text-gray-400 mt-1">{profile.location || "Location not set"}</p>
            </div>
            <hr className="border-gray-100 mb-4" />
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                <p className="font-medium text-gray-700 truncate">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Bio</p>
                <p className="text-gray-600">{profile.bio || "No bio added yet"}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="mt-4 w-full text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl py-2 hover:bg-indigo-50 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">Stats</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-indigo-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-indigo-600">{connections.length}</p>
                <p className="text-xs text-gray-500 mt-1">Connections</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">{stats.projects}</p>
                <p className="text-xs text-gray-500 mt-1">Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Skills</h2>
            {myskills && myskills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {myskills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No skills added yet</p>
            )}
          </div>

        </div>

              
        <div className="col-span-6 space-y-5">

          
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-3">
               <div className="w-13 h-13 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold mb-3">
                {getInitials(user.username)}
              </div>
              <textarea
                placeholder={`What's on your mind, ${user.username}?`}
                rows={3}
                className="flex-1 resize-none text-sm text-gray-700 placeholder-gray-400 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={()=>navigate("/post")}
                className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>

      


          <div className="bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm p-10 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-base font-semibold text-gray-700">No posts yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Be the first to share something with your network.
            </p>
          </div>

        </div>

        <div className="col-span-3 space-y-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
              🔥 Suggested Developers
            </h2>
            <div className="space-y-3">
              {suggested_developers.length > 0 ? (
                suggested_developers.map((dev, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                        {getInitials(dev.username)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{dev.username}</p>
                        <p className="text-xs text-gray-400">{dev.role || "Developer"}</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors shrink-0">
                      + Connect
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No suggestions yet</p>
              )}
            </div>
          </div>

          {/* My Connections Preview */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">My Connections</h2>
              <button
                onClick={() => navigate("/connections")}
                className="text-xs text-indigo-500 font-medium hover:underline"
              >
                View all
              </button>
            </div>
            {connections.length > 0 ? (
              <div className="space-y-3">
                {connections.slice(0, 4).map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                      {getInitials(c.username)}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{c.username}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No connections yet</p>
            )}
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow p-5">
            <h2 className="text-base font-bold">🚀 Boost your profile</h2>
            <p className="text-sm mt-2 text-white/80">
              Add skills, projects, and a bio to get discovered faster.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="mt-4 text-xs font-semibold bg-white text-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Complete Profile →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}