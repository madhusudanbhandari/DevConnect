import React, { useState } from "react";

// Mocking hooks/axios for preview purposes
const useNavigate = () => () => {};
const axiosInstance = { put: async () => {} };

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    headline: "",
    bio: "",
    location: "",
    avatar: "",
    github: "",
    linkedin: "",
    website: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put("profiles/profile/", form);
      setMsg("Profile saved successfully!");
      setErr("");
      navigate("/dashboard");
    } catch (error) {
      setErr("Something went wrong. Please try again.");
      setMsg("");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white-900 border border-slate-700 text-slate-100 placeholder-slate-500 p-3 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 text-sm";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
     
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-lg shadow-violet-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Complete Your Profile</h1>
          <p className="text-slate-400 mt-1 text-sm">Let the community know who you are</p>
        </div>

   
        <div className="bg-white-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">

          
          {msg && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-lg">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              {msg}
            </div>
          )}
          {err && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
           
            <div>
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">Identity</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Full Name</label>
                  <input name="full_name" placeholder="Jane Doe" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Headline</label>
                  <input name="headline" placeholder="e.g. Full-Stack Developer · Open Source Enthusiast" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Bio</label>
                  <textarea
                    name="bio"
                    rows={3}
                    placeholder="Tell the community a bit about yourself..."
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Location</label>
                  <input name="location" placeholder="San Francisco, CA" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium">Avatar URL</label>
                  <input name="avatar" placeholder="https://..." onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800" />

            {/* Section: Links */}
            <div>
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">Links</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </label>
                  <input name="github" placeholder="https://github.com/you" onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </label>
                  <input name="linkedin" placeholder="https://linkedin.com/in/you" onChange={handleChange} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1.5 font-medium flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    Website
                  </label>
                  <input name="website" placeholder="https://yoursite.com" onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Saving…
                </>
              ) : (
                <>
                  Save Profile
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">You can update this anytime from your settings</p>
      </div>
    </div>
  );
}