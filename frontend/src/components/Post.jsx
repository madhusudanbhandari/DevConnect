import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axiosInstance from "../api/axios";

export default function Post() {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState("");
  const fileInputRef = useRef(null);

  const makePost = async () => {
    if (!postText.trim()) return;

    const formData = new FormData();
    formData.append("post", postText);
    if (image) formData.append("photo", image);
    if (location) formData.append("location", location);

    try {
      const res = await axiosInstance.post("posts/post/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      setPostText("");
      setImage(null);
      setImagePreview(null);
      setLocation("");
      onPostCreated();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

      {/* Header */}
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Create Post</h2>

      {/* Text area */}
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        className="w-full resize-none text-sm text-gray-700 placeholder-gray-400 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
      />

      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mt-3">
          <img
            src={imagePreview}
            alt="preview"
            className="rounded-xl max-h-56 object-cover w-full"
          />
          <button
            onClick={() => { setImage(null); setImagePreview(null); fileInputRef.current.value = ""; }}
            className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg hover:bg-black/70 transition"
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Location input */}
      {location !== null && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-base">📍</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add location..."
            className="flex-1 text-sm border border-gray-100 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition placeholder-gray-400"
          />
        </div>
      )}

      {/* Toolbar + Post button */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">

        {/* Left — action buttons */}
        <div className="flex gap-1">

          {/* Photo button */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 font-medium px-3 py-1.5 rounded-lg transition"
          >
            🖼️ Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setImagePreview(URL.createObjectURL(file)); // preview only — no functionality change
            }}
          />

          {/* Location button */}
          <button
            onClick={() => setLocation("")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition ${
              location
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-400 hover:text-indigo-500 hover:bg-indigo-50"
            }`}
          >
            📍 Location
          </button>

        </div>

        {/* Post button */}
        <button
          onClick={makePost}
          disabled={!postText.trim()}
          className="text-sm font-semibold bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Post
        </button>

      </div>
    </div>
  );
}