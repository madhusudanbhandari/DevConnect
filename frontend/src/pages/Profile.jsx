import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileThunk";
import { Link } from "react-router-dom";

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.data);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (!profile)
        return (
            <div className="h-screen flex items-center justify-center text-gray-500">
                Loading profile...
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

                {/* HEADER */}
                <div className="flex flex-col items-center border-b pb-6">

                    {profile.avatar ? (
                        <img
                            src={profile.avatar}
                            alt={profile.username}
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600">
                            {profile.username?.charAt(0).toUpperCase()}
                        </div>
                    )}

                    <h2 className="mt-4 text-3xl font-bold text-gray-800">
                        {profile.username}
                    </h2>

                    <p className="text-gray-600 text-center mt-2">
                        {profile.bio || "No bio added yet."}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">
                        📍 {profile.location || "Location not specified"}
                    </div>

                    <Link
                        to="/complete-profile"
                        className="mt-4 bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition"
                    >
                        Edit Profile
                    </Link>
                </div>

                {/* DETAILS SECTION */}
                <div className="mt-6 space-y-5">

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            📇 Contact Info
                        </h3>

                        <div className="space-y-1 text-gray-600 text-sm">
                            <p>
                                <span className="font-medium">Email:</span>{" "}
                                {profile.email || "Not provided"}
                            </p>

                            <p>
                                <span className="font-medium">Website:</span>{" "}
                                {profile.website ? (
                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {profile.website}
                                    </a>
                                ) : (
                                    "Not provided"
                                )}
                            </p>
                        </div>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            🌐 Social Links
                        </h3>

                        <div className="flex gap-4 text-sm">
                            {profile.github && (
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    className="text-gray-700 hover:text-black"
                                >
                                    GitHub
                                </a>
                            )}

                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>

                 
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            🧠 Skills
                        </h3>

                        {profile.skills && profile.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                                    >
                                        {skill.skill} ({skill.level})
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-sm">
                                No skills added yet
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}