// import { useEffect, useState } from "react";
// import { getProfile, updateProfile } from "../api/profile";

// export default function Profile() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     linkedin_url: "",
//     phone: "",
//     experience_years: "",
//     organization: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // Load profile
//   useEffect(() => {
//     getProfile()
//       .then((res) => {
//         setForm(res.data);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setMessage(null);
    
//     try {
//       await updateProfile(form);
//       setMessage({ type: "success", text: "Profile updated successfully!" });
//       setIsEditing(false);
//     } catch (error) {
//       setMessage({ type: "error", text: "Failed to update profile" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setMessage(null);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setMessage(null);
//     // Reload profile to reset changes
//     getProfile().then((res) => {
//       setForm(res.data);
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-12 h-12 border-3 border-slate-700 border-t-yellow-500 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-slate-400 text-sm">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//       <div className="max-w-5xl mx-auto px-6 py-8">
        
//         {/* Header */}
//         <div className="mb-8 flex justify-between items-start">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-1.5">
//               Profile Settings
//             </h1>
//             <p className="text-slate-400 text-sm">Manage your account information</p>
//           </div>
          
//           {!isEditing && (
//             <button
//               onClick={handleEdit}
//               className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>

//         {/* Success/Error Message */}
//         {message && (
//           <div className={`mb-6 p-4 rounded-lg border ${
//             message.type === "success" 
//               ? "bg-emerald-950/50 border-emerald-800/50 text-emerald-400" 
//               : "bg-red-950/50 border-red-800/50 text-red-400"
//           }`}>
//             <div className="flex items-center gap-2 text-sm">
//               <span>{message.type === "success" ? "✓" : "✕"}</span>
//               <span>{message.text}</span>
//             </div>
//           </div>
//         )}

//         {/* Profile Card */}
//         <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/50 border border-slate-800/50 rounded-xl p-8 backdrop-blur-sm">
          
//           {isEditing ? (
//             // Edit Mode - Form
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <Input 
//                   label="Full Name" 
//                   name="name" 
//                   value={form.name} 
//                   onChange={handleChange}
//                   required
//                 />

//                 <Input 
//                   label="Email Address" 
//                   value={form.email} 
//                   disabled 
//                 />

//                 <Input
//                   label="LinkedIn Profile"
//                   name="linkedin_url"
//                   value={form.linkedin_url}
//                   onChange={handleChange}
//                   placeholder="https://linkedin.com/in/username"
//                 />

//                 <Input
//                   label="Phone Number"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="+1 (555) 000-0000"
//                 />

//                 <Input
//                   label="Years of Experience"
//                   name="experience_years"
//                   type="number"
//                   value={form.experience_years}
//                   onChange={handleChange}
//                   placeholder="0"
//                 />

//                 <Input
//                   label="Current Organization"
//                   name="organization"
//                   value={form.organization}
//                   onChange={handleChange}
//                   placeholder="Company Name"
//                 />
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {saving ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
//                       <span>Saving...</span>
//                     </>
//                   ) : (
//                     <span>Save Changes</span>
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   disabled={saving}
//                   className="px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // View Mode - Display
//             <div className="space-y-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <DisplayField 
//                   label="Full Name" 
//                   value={form.name}
//                 />

//                 <DisplayField 
//                   label="Email Address" 
//                   value={form.email}
//                 />

//                 <DisplayField
//                   label="LinkedIn Profile"
//                   value={form.linkedin_url}
//                   link
//                 />

//                 <DisplayField
//                   label="Phone Number"
//                   value={form.phone}
//                 />

//                 <DisplayField
//                   label="Years of Experience"
//                   value={form.experience_years}
//                 />

//                 <DisplayField
//                   label="Current Organization"
//                   value={form.organization}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Input({ label, ...props }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
//         {label}
//       </label>
//       <input
//         {...props}
//         className="w-full bg-slate-950/50 border border-slate-700/50 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500/50 transition-all duration-200 placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-600/70"
//       />
//     </div>
//   );
// }

// function DisplayField({ label, value, link }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
//         {label}
//       </label>
//       <div className="bg-slate-950/30 border border-slate-800/50 rounded-lg px-4 py-2.5 min-h-[42px] flex items-center">
//         {link && value ? (
//           <a 
//             href={value} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-sm text-blue-400 hover:text-blue-300 underline decoration-blue-400/30 hover:decoration-blue-300/50 transition-colors truncate"
//           >
//             {value}
//           </a>
//         ) : (
//           <span className="text-sm text-slate-300 truncate">
//             {value || <span className="text-slate-600">Not provided</span>}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profile";
import { 
  User, BookOpen, Trophy, Clock, LayoutDashboard, 
  Settings, Briefcase, Linkedin, Phone, Calendar, ArrowUpRight 
} from "lucide-react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin_url: "",
    phone: "",
    experience_years: "",
    organization: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard or profile
  const [isEditing, setIsEditing] = useState(false);

  // Mock Dashboard Data (You can later replace this with a real API call)
  const dashboardData = {
    courses: [
      { id: 1, name: "Python for Data Detectives", progress: 75, nextSession: "Tomorrow, 10:00 AM", instructor: "Dr. Aris" },
      { id: 2, name: "Advanced GenAI & LLMs", progress: 30, nextSession: "Monday, 2:00 PM", instructor: "Prof. Sarah" },
    ],
    exams: [
      { id: 1, subject: "SQL & Databases", date: "Jan 05, 2026", score: "88%", status: "Passed" },
      { id: 2, subject: "Statistics Foundation", date: "Dec 20, 2025", score: "92%", status: "Passed" },
    ]
  };

  // LOAD PROFILE - Fixed API Logic
  useEffect(() => {
    getProfile()
      .then((res) => {
        // Ensure we are setting the data correctly based on your API response structure
        const profileData = res.data || res; 
        setForm(profileData);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setMessage({ type: "error", text: "Failed to load profile data." });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT PROFILE - Fixed API Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    try {
      await updateProfile(form);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30">
      
      {/* 1. TOP HEADER / COVER AREA */}
      <div className="h-48 bg-gradient-to-r from-yellow-600/10 via-slate-900 to-slate-900 border-b border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <div className="w-24 h-24 rounded-3xl bg-yellow-500 flex items-center justify-center text-black text-4xl font-black shadow-2xl">
              {form.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight">{form.name || "User Name"}</h1>
              <p className="text-slate-400 font-medium">{form.email}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setActiveTab("dashboard"); setIsEditing(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "dashboard" ? "bg-yellow-500 text-black" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
              >
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "profile" ? "bg-yellow-500 text-black" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}
              >
                <User size={18} /> Profile Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* SUCCESS / ERROR MESSAGES */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 ${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
             <span className="text-sm font-bold">{message.type === "success" ? "✓" : "✕"} {message.text}</span>
          </div>
        )}

        {activeTab === "dashboard" ? (
          /* --- DASHBOARD VIEW --- */
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<BookOpen size={20}/>} label="Started" value="2" color="text-blue-400" />
              <StatCard icon={<Clock size={20}/>} label="Exp" value={`${form.experience_years}y`} color="text-yellow-500" />
              <StatCard icon={<Trophy size={20}/>} label="Exams" value="12" color="text-emerald-400" />
              <StatCard icon={<Briefcase size={20}/>} label="Org" value={form.organization?.split(' ')[0] || "None"} color="text-purple-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Courses Section */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold">Ongoing Courses</h2>
                {dashboardData.courses.map(course => (
                  <div key={course.id} className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl group hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-yellow-500 transition-colors">{course.name}</h3>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Timing</p>
                        <p className="text-sm text-yellow-500 font-bold">{course.nextSession}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: `${course.progress}%` }} />
                      </div>
                      <p className="text-[10px] text-slate-500 text-right font-bold">{course.progress}% Completed</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exam Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Latest Exams</h2>
                <div className="bg-slate-900/40 border border-white/5 rounded-2xl divide-y divide-white/5">
                  {dashboardData.exams.map(exam => (
                    <div key={exam.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm">{exam.subject}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">{exam.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-yellow-500">{exam.score}</p>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Passed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- PROFILE SETTINGS VIEW (ORIGINAL FIELDS) --- */
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-md">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Profile Details</h2>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-yellow-500 text-sm font-bold hover:underline">
                    <Settings size={16}/> Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                    <InputField label="Email (Disabled)" value={form.email} disabled />
                    <InputField label="LinkedIn URL" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                    <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                    <InputField label="Years of Experience" name="experience_years" type="number" value={form.experience_years} onChange={handleChange} />
                    <InputField label="Organization" name="organization" value={form.organization} onChange={handleChange} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={saving} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 rounded-xl transition-all shadow-xl shadow-yellow-500/20">
                      {saving ? "SAVING..." : "SAVE CHANGES"}
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-8 bg-slate-800 text-white font-bold rounded-xl transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                /* Static Display of the 6 fields */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DisplayItem icon={<User size={18}/>} label="Full Name" value={form.name} />
                  <DisplayItem icon={<Clock size={18}/>} label="Email Address" value={form.email} />
                  <DisplayItem icon={<Linkedin size={18}/>} label="LinkedIn Profile" value={form.linkedin_url} isLink />
                  <DisplayItem icon={<Phone size={18}/>} label="Phone Number" value={form.phone} />
                  <DisplayItem icon={<Calendar size={18}/>} label="Years Experience" value={form.experience_years} />
                  <DisplayItem icon={<Briefcase size={18}/>} label="Organization" value={form.organization} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// STYLED SUB-COMPONENTS
function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
      <div className={`mb-2 ${color}`}>{icon}</div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black mt-1 truncate w-full">{value || "0"}</p>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <input 
        {...props} 
        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-yellow-500/50 outline-none transition-all disabled:opacity-50"
      />
    </div>
  );
}

function DisplayItem({ icon, label, value, isLink }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-3 bg-slate-800/50 rounded-xl text-yellow-500">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
        {isLink && value ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-400 hover:underline flex items-center gap-1">
            Visit Link <ArrowUpRight size={14}/>
          </a>
        ) : (
          <p className="text-sm font-bold text-slate-100 truncate">{value || "Not Provided"}</p>
        )}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin" />
    </div>
  );
}