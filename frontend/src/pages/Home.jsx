import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import Footer from "../components/Footer";
import {
  Terminal, Compass, BookOpen, ArrowRight, Sparkles,
  Lock, Radio, ChevronRight, Play, Users,
  PlayCircle, ExternalLink, GraduationCap
} from "lucide-react";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // 2. Initialize navigate

  const steps = [
    {
      icon: <Terminal className="text-[#ffcc33]" size={42} strokeWidth={1.5} />,
      title: "Tell Shifu your goal",
      desc: "'Want to be a Data Analyst' or 'learn Agentic AI in Finance'?"
    },
    {
      icon: <Compass className="text-[#ffcc33]" size={42} strokeWidth={1.5} />,
      title: "Get your personalized roadmap",
      desc: "Shifu analyzes millions of paths to build the one just for you."
    },
    {
      icon: <BookOpen className="text-[#ffcc33]" size={42} strokeWidth={1.5} />,
      title: "Access Curated Contents",
      desc: "The best articles, videos, and courses, all in one place"
    }
  ];

  const workshops = [
    { title: "Vibe Coding a GenAI application(C3)", category: "GenAI" },
    { title: "Python for All", category: "Basics" },
    { title: "AI Meets Agile", category: "Management" },
    { title: "Agentic AI for Non-Coders", category: "No-Code" },
    { title: "Agentic AI - Build Autonomous Solutions (C1)", category: "Advanced" },
    { title: "GenAI Powered Transformative HR", category: "Business" },
  ];

  const selfPaced = [
    "Large Language Modeling (LLM)", "Generative Business Intelligence (GenBI)", "MLOps & LLMOps",
    "Career Transition with AI", "Data Strategy for Senior Professionals", "Supervised Learning (ML)",
    "Unsupervised Learning (ML)", "Data Engineering with AWS", "Data Engineering with Azure",
    "Data Engineering with Snowflake", "PowerBI & Power Automate", "Managing Semi-structured Data with NoSQL"
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-[#ffcc33]/30 font-sans">

      {/* --- COMPACT HERO SECTION --- */}
      <div className="relative pt-10 pb-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <p className="text-[#ffcc33] text-[10px] font-bold tracking-[0.4em] uppercase mb-4 opacity-80 text-center lg:text-left animate-pulse">
            योग: कर्मसु कौशलम्
          </p>

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div className="space-y-6 relative z-10">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                  Shifu - <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">your personal AI learning coach</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium max-w-lg">
                  Stop searching. Start Learning with a clear path in <span className="text-[#ffcc33] underline decoration-[#ffcc33]/30 underline-offset-4">3 simple steps</span>.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/roadmap")}
                  className="group relative flex items-center gap-4 bg-[#ffcc33] text-black font-black px-10 py-4 rounded-xl transition-all shadow-[0_0_40px_rgba(255,204,51,0.3)] hover:shadow-[0_0_60px_rgba(255,204,51,0.5)] active:scale-95 uppercase text-xs tracking-widest overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative">Create My Roadmap</span>
                  <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* VIDEO CONTAINER WITH GOLDEN BORDER */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ffcc33] to-[#ffa500] rounded-[2.2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative aspect-video w-full bg-[#020617] border border-[#ffcc33]/50 rounded-[2rem] overflow-hidden shadow-2xl">

                {/* Decorative Golden Corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#ffcc33] rounded-tl-xl z-20"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#ffcc33] rounded-tr-xl z-20"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#ffcc33] rounded-bl-xl z-20"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#ffcc33] rounded-br-xl z-20"></div>

                <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                  <source src="https://setucontainer.blob.core.windows.net/setu/Shifu%20Video%20Part%202.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-[#ffcc33] rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,204,51,0.4)] animate-pulse">
                      <Play size={16} fill="black" />
                    </div>
                    <div>
                      <span className="text-[#ffcc33] text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Preview</span>
                      <span className="text-white text-sm font-bold">Shifu AI Coach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-20">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center w-full group">
                <div className="flex-1 bg-[#0f172a]/40 border border-[#ffcc33]/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#ffcc33]/60 transition-all duration-500 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(255,204,51,0.1)] group-hover:-translate-y-1">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(255,204,51,0.5)]">
                    {step.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-2 uppercase tracking-wider text-white group-hover:text-[#ffcc33] transition-colors">{step.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed italic">{step.desc}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="hidden md:block px-2">
                    <DottedArrow />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WORKSHOPS SECTION */}
      <section className="py-24 px-6 border-t border-[#ffcc33]/10">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="DAP Live Workshops" badgeIcon={<Radio className="text-red-500 animate-pulse" size={18} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((item, i) => (
              <WorkshopCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SELF PACED COURSES */}
      <section className="py-24 px-6 bg-[#0f172a]/30 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ffcc33]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="DAP Self Paced Courses" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selfPaced.map((course, i) => (
              <button key={i} className="text-left p-6 bg-slate-900/60 border border-white/5 rounded-2xl font-bold text-sm hover:border-[#ffcc33] hover:bg-slate-800 transition-all flex justify-between items-center group relative overflow-hidden">
                <span className="relative z-10 group-hover:text-[#ffcc33] transition-colors">{course}</span>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#ffcc33] transition-colors relative z-10" />
                <div className="absolute inset-0 bg-[#ffcc33]/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT & PROJECTS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <SectionHeader title="Skill Based Assessment" subtitle="3 Free Attempts Per Test" />
            <div className="grid grid-cols-2 gap-4">
              {['SQL', 'Big Data', 'Data Science', 'Statistics', 'Python', 'Machine Learning'].map(item => (
                <div key={item} className="p-5 bg-slate-900/30 border border-white/10 rounded-2xl text-center font-black uppercase text-[11px] tracking-[0.2em] text-slate-500 hover:text-[#ffcc33] hover:border-[#ffcc33] hover:shadow-[0_0_15px_rgba(255,204,51,0.15)] transition-all cursor-default">{item}</div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Industry Projects" subtitle="Apply Knowledge to Real Use Cases" />
            <div className="relative h-56 bg-slate-900/40 border border-[#ffcc33]/20 rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden group hover:border-[#ffcc33]/50 transition-colors">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <h3 className="text-7xl font-black text-[#ffcc33] opacity-5 uppercase italic tracking-tighter absolute group-hover:opacity-10 transition-opacity">Coming Soon</h3>
              <div className="flex gap-4 relative z-10">
                {['FinTech', 'HealthTech', 'GenAI'].map(tag => (
                  <span key={tag} className="px-5 py-2 bg-[#ffcc33]/10 text-[#ffcc33] text-[10px] font-black rounded-xl uppercase border border-[#ffcc33]/20 shadow-[0_0_10px_rgba(255,204,51,0.1)]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENTORING */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center space-y-10 bg-gradient-to-br from-blue-600/5 to-transparent border border-[#ffcc33]/10 p-16 rounded-[4rem] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-[#ffcc33] blur-[20px]"></div>

          <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#ffcc33]/10 border border-[#ffcc33]/20 text-[#ffcc33] rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,204,51,0.1)]">
            <Users size={18} /> Mentoring by PragNnan Community
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight italic leading-tight">"A great Mentor is your <br /> guiding light."</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium relaxed">Schedule Career Coaching Sessions with Global Technology Leaders. Visit the PragNnan series to listen to the pearls of wisdom.</p>
          <div className="flex flex-wrap justify-center gap-10 pt-6">
            <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white hover:text-[#ffcc33] transition-all underline decoration-[#ffcc33]/30 underline-offset-[12px]">See Mentors <ExternalLink size={14} /></button>
            <button className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-white hover:text-red-500 transition-all underline decoration-red-500/30 underline-offset-[12px]">Listen to Series <PlayCircle size={14} /></button>
          </div>
        </div>
      </section>
    </div>
  );

}

// --- REUSABLE COMPONENTS ---

function DottedArrow() {
  return (
    <div className="flex items-center opacity-40">
      <svg width="48" height="8" viewBox="0 0 48 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4H43" stroke="#ffcc33" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 6" />
        <path d="M41 1L47 4L41 7" stroke="#ffcc33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function SectionHeader({ title, subtitle, badgeIcon }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-black uppercase italic tracking-tighter px-8 py-4 border border-[#ffcc33]/40 rounded-2xl bg-[#ffcc33]/5 flex items-center gap-4 shadow-[0_0_15px_rgba(255,204,51,0.05)]">
          {badgeIcon} {title}
        </h2>
        {subtitle && (
          <span className="hidden md:block px-4 py-1.5 bg-blue-600/10 text-blue-400 text-[10px] font-black rounded-lg uppercase border border-blue-500/20 tracking-widest">
            {subtitle}
          </span>
        )}
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-[#ffcc33]/30 to-transparent"></div>
    </div>
  );
}

function WorkshopCard({ item }) {
  return (
    <div className="group bg-[#0b1120] border border-slate-800 p-10 rounded-3xl hover:border-[#ffcc33] transition-all cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(255,204,51,0.1)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffcc33]/5 rounded-bl-[4rem] group-hover:bg-[#ffcc33]/10 transition-colors"></div>
      <div className="flex justify-between items-start mb-8 relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#ffcc33] transition-colors">{item.category}</span>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-black/40 px-3 py-2 rounded-xl border border-white/5">
          <Lock size={12} className="text-[#ffcc33]" /> CLASS FULL
        </div>
      </div>
      <h3 className="text-xl font-bold group-hover:text-[#ffcc33] transition-colors mb-4 leading-tight relative z-10">{item.title}</h3>
      <div className="mt-10 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-black uppercase tracking-widest">Upcoming Session</span>
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}