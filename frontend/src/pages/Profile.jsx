import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profile";
import { 
  User, BookOpen, Trophy, Clock, LayoutDashboard, 
  Settings, Briefcase, Linkedin, Phone, Calendar, 
  ArrowUpRight, Save, X, Mail, Globe, GraduationCap, ArrowRight
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
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to dashboard/overview
  const [isEditing, setIsEditing] = useState(false);

  // Roadmap Data (Matches your screenshot)
  const roadmaps = [
    { 
      id: 1, 
      title: "Frontend Developer Roadmap", 
      created: "10 Jan 2026", 
      progress: 0,
      gradient: "from-blue-500/10 to-transparent"
    },
    { 
      id: 2, 
      title: "Gemini AI Roadmap", 
      created: "07 Jan 2026", 
      progress: 1,
      gradient: "from-indigo-500/10 to-transparent"
    }
  ];

  // Load profile
  useEffect(() => {
    getProfile()
      .then((res) => {
        const profileData = res.data || res;
        setForm(profileData);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-yellow-500/30 font-sans">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-yellow-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* PROFILE HERO HEADER */}
        <header className="mb-12 flex flex-col md:flex-row items-center gap-8 bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black text-5xl font-black shadow-[0_0_30px_rgba(250,204,21,0.2)]">
              {form.name?.charAt(0) || "U"}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-lg border-4 border-[#020617]">
              <Trophy size={20} className="text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <h1 className="text-4xl font-black text-white tracking-tight">
                Welcome {form.name?.split(' ')[0] || "Student"}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit mx-auto md:mx-0">
                Active Learner
              </span>
            </div>
            <p className="text-slate-400 flex items-center justify-center md:justify-start gap-2 mb-6">
              <Mail size={16} /> {form.email}
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <TabBtn active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={<LayoutDashboard size={18}/>} label="Overview" />
              <TabBtn active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User size={18}/>} label="Account Settings" />
            </div>
          </div>
        </header>

        {/* FEEDBACK MESSAGE */}
        {message && (
          <div className={`mb-8 p-4 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top-4 ${
            message.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            <div className="p-1 rounded-full bg-current/10">
              {message.type === "success" ? <Save size={16}/> : <X size={16}/>}
            </div>
            <p className="text-sm font-bold tracking-wide uppercase">{message.text}</p>
          </div>
        )}

        {activeTab === "dashboard" ? (
          /* --- OVERVIEW / DASHBOARD SECTION --- */
          <div className="space-y-12 animate-in fade-in duration-700">
            {/* Intro Text Card */}
            <div className="bg-slate-900/20 border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm max-w-4xl">
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                All course materials and session recordings will soon be ready for you on SETU’s roadmap platform 
                (<span className="text-blue-400 underline cursor-pointer">roadmap.setuschool.com</span>). 
                Keep an eye on your inbox—you’ll receive an email with details as soon as your access is active. 
                Happy studying, and enjoy the journey!
              </p>
            </div>

            {/* Roadmaps Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-1.5 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase italic">Shifu - Learning Roadmap</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roadmaps.map((roadmap) => (
                  <div 
                    key={roadmap.id} 
                    className={`group relative bg-gradient-to-b ${roadmap.gradient} border border-white/5 rounded-[2.5rem] p-1 transition-all duration-500 hover:border-yellow-500/50 hover:shadow-[0_0_40px_rgba(250,204,21,0.05)]`}
                  >
                    <div className="bg-[#020617]/90 backdrop-blur-xl p-8 rounded-[2.4rem] h-full flex flex-col">
                      <div className="mb-8">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
                          <GraduationCap size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors mb-2">
                          {roadmap.title}
                        </h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Created on : <span className="text-slate-300 ml-1">{roadmap.created}</span>
                        </p>
                      </div>

                      <div className="mt-auto space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className="text-slate-500">Progress</span>
                            <span className="text-yellow-500">{roadmap.progress}% Completed</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-yellow-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(250,204,21,0.4)]" 
                              style={{ width: `${Math.max(roadmap.progress, 2)}%` }}
                            />
                          </div>
                        </div>

                        <button className="w-full py-4 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] border border-white/10 rounded-2xl group-hover:bg-yellow-500 group-hover:text-black group-hover:border-transparent transition-all">
                          View Roadmap <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* --- PROFILE SETTINGS SECTION --- */
          <section className="animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-[1.5rem] backdrop-blur-md">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Quick Connectivity</h3>
                  <div className="space-y-4">
                    <SocialLink icon={<Linkedin size={20}/>} label="LinkedIn" value={form.linkedin_url} href={form.linkedin_url} />
                    <SocialLink icon={<Globe size={20}/>} label="Phone" value={form.phone} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h2 className="text-2xl font-black text-white">Profile Details</h2>
                      <p className="text-slate-500 text-sm mt-1">Update your professional information</p>
                    </div>
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-yellow-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                      >
                        <Settings size={16}/> Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                        <InputField label="Email Address" value={form.email} disabled tip="Contact support to change email" />
                        <InputField label="LinkedIn URL" name="linkedin_url" value={form.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                        <InputField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234..." />
                        <InputField label="Experience (Years)" name="experience_years" type="number" value={form.experience_years} onChange={handleChange} placeholder="5" />
                        <InputField label="Current Organization" name="organization" value={form.organization} onChange={handleChange} placeholder="Company Name" />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                        <button
                          type="submit"
                          disabled={saving}
                          className="flex-1 bg-yellow-500 text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {saving ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Save size={18}/>}
                          {saving ? "Processing..." : "Save Changes"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-8 py-4 bg-slate-800 text-slate-300 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all"
                        >
                          Discard
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <DisplayItem icon={<User size={20}/>} label="Legal Name" value={form.name} />
                      <DisplayItem icon={<Mail size={20}/>} label="Contact Email" value={form.email} />
                      <DisplayItem icon={<Briefcase size={20}/>} label="Organization" value={form.organization} />
                      <DisplayItem icon={<Calendar size={20}/>} label="Work Experience" value={`${form.experience_years} Years`} />
                      <DisplayItem icon={<Phone size={20}/>} label="Mobile" value={form.phone} />
                      <DisplayItem icon={<Linkedin size={20}/>} label="Social Identity" value={form.linkedin_url} isLink />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function TabBtn({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
        active 
        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" 
        : "bg-white/5 text-slate-400 hover:bg-white/10"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function InputField({ label, tip, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
        {label}
      </label>
      <input 
        {...props}
        className="bg-[#020617] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-slate-700 disabled:bg-slate-900/50 disabled:text-slate-500 disabled:cursor-not-allowed"
      />
      {tip && <p className="text-[9px] text-slate-600 italic ml-1">{tip}</p>}
    </div>
  );
}

function DisplayItem({ icon, label, value, isLink }) {
  return (
    <div className="group">
      <div className="flex items-center gap-3 mb-2 text-slate-500 group-hover:text-yellow-500 transition-colors">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="pl-8">
        {isLink && value ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View Profile <ArrowUpRight size={14}/>
          </a>
        ) : (
          <p className="text-md font-bold text-slate-200">{value || "—"}</p>
        )}
      </div>
    </div>
  );
}

function SocialLink({ icon, label, value, href }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
      <div className="p-2 bg-[#020617] rounded-lg text-slate-400 group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-300 truncate block hover:text-white">
            {value.replace('https://', '')}
          </a>
        ) : (
          <p className="text-xs font-bold text-slate-300 truncate">{value || "Not Linked"}</p>
        )}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-yellow-500/10 border-t-yellow-500 rounded-2xl animate-spin mb-4" />
      <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">Syncing Shifu...</p>
    </div>
  );
}