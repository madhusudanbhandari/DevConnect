import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState([]);

  useEffect(() => { fetchRequests(); }, []);
  useEffect(() => { getConnections(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("connections/requests/");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

  const respondRequest = async (id, action) => {
    try {
      await axiosInstance.post(`connections/respond-requests/${id}/`, { action });
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "??";

  const avatarColors = [
    { bg: "bg-indigo-100", text: "text-indigo-600" },
    { bg: "bg-orange-100", text: "text-orange-600" },
    { bg: "bg-emerald-100", text: "text-emerald-600" },
    { bg: "bg-purple-100", text: "text-purple-600" },
    { bg: "bg-rose-100", text: "text-rose-600" },
  ];

  return (
    <div className="w-full min-h-screen bg-white px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Connections</h1>
        {requests.length > 0 && (
          <span className="text-base font-semibold bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full">
            {requests.length} pending
          </span>
        )}
      </div>

      {/* Pending Requests */}
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Pending Requests
      </p>

      {loading ? (
        <p className="text-lg text-gray-400 py-4">Loading...</p>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No pending requests</p>
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {requests.map((req, i) => {
            const color = avatarColors[i % avatarColors.length];
            return (
              <div
                key={req.id}
                className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${color.bg} ${color.text} shrink-0`}>
                  {getInitials(req.from_user)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-semibold text-gray-900 truncate">{req.from_user}</p>
                  <p className="text-sm text-gray-400 mt-0.5">Wants to connect with you</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => respondRequest(req.id, "accept")}
                    className="text-base font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    ✓ Accept
                  </button>
                  <button
                    onClick={() => respondRequest(req.id, "reject")}
                    className="text-base font-semibold text-gray-500 border border-gray-200 px-6 py-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <hr className="border-gray-100 my-8" />

      {/* My Connections */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
          My Connections
        </p>
        {connections.length > 5 && (
          <span className="text-sm text-gray-400">Showing 5 of {connections.length}</span>
        )}
      </div>

      {connections.length === 0 ? (
        <p className="text-lg text-gray-400 py-8 text-center">No connections yet</p>
      ) : (
        <div className="space-y-3">
          {connections.slice(0, 5).map((user, i) => {
            const color = avatarColors[i % avatarColors.length];
            return (
              <div
                key={user.id}
                className="flex items-center gap-5 bg-white border border-gray-200 rounded-2xl px-6 py-4 hover:border-gray-300 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${color.bg} ${color.text} shrink-0`}>
                  {getInitials(user.username)}
                </div>
                <span className="text-xl font-semibold text-gray-800  ml-1 mr-90">{user.username}</span>
                <p>{user.bio}</p>
                <span className="text-sm font-medium text-gray-400 bg-gray-100 px-4 py-1.5 rounded-full ">
                  Connected
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}