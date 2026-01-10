import React from "react";
import { 
  BarChart3, Users, Zap, Search, ShieldCheck, 
  Target, Rocket, CheckCircle2, ArrowRight, 
  MessageSquare, Briefcase, Globe
} from "lucide-react";
import Footer from "../components/Footer";

export default function ForEnterprise() {
  const pillars = [
    {
      id: "upskill",
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "Outcome-Oriented Skilling",
      subtitle: "Upskill Talent with Purpose",
      desc: "Measure the impact of your training investment. We bridge the skills gap through industry-oriented hands-on experiential training by top experts.",
      points: ["NeoSkill Senior Management", "AI-Driven Strategic Initiatives", "Measure ROI of Training"]
    },
    {
      id: "recruit",
      icon: <Users className="text-blue-400" size={32} />,
      title: "Setu RecruitEase",
      subtitle: "Find Top Talent, Faster",
      desc: "Swamped with resumes? Cut through the clutter. We help you establish a center of excellence for skill development and knowledge dissemination.",
      points: ["80% Hiring Time Saved", "60% Recruitment Cost Savings", "4X Productivity Gain"]
    },
    {
      id: "assess",
      icon: <Search className="text-emerald-400" size={32} />,
      title: "Setu SkillScan",
      subtitle: "Holistic Talent Assessment",
      desc: "Measure the natural strength of your data talent. Build high-performance data teams with confidence using our proprietary framework.",
      points: ["Assess 8 Technical Skills", "Evaluate 5 Attitudinal Attributes", "Data-Driven Hiring Decisions"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30 font-sans">
      
      {/* 1. ENTERPRISE HERO */}
      <div className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
             <Briefcase size={14} /> Global Enterprise Solutions
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-tight mb-8">
            Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Workforce</span> <br /> 
            with AI Excellence
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-12">
            SETU recognizes your organization's unique talent needs and custom designs curriculum 
            tailored to your specific requirements. Measure ROI, not just hours.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <button className="px-10 py-5 bg-yellow-500 text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 active:scale-95">
               Schedule a Consultation
             </button>
             <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition-all">
               View Case Studies
             </button>
          </div>
        </div>
      </div>

      {/* 2. THE THREE PILLARS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="group relative bg-slate-900/30 border border-white/5 p-10 rounded-[2.5rem] hover:border-yellow-500/30 transition-all">
                <div className="mb-8">{pillar.icon}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">{pillar.subtitle}</p>
                <h3 className="text-2xl font-black italic uppercase mb-6">{pillar.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{pillar.desc}</p>
                <div className="space-y-4">
                  {pillar.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                      <CheckCircle2 size={16} className="text-yellow-500/50" /> {pt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SETU CODEVERSE HACKATHONS */}
      <section className="py-24 px-6 bg-slate-900/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase leading-tight">
              Quality Talent Hiring via <br />
              <span className="text-yellow-500">SETU Codeverse</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              Utilize the SETU Codeverse platform for hackathon-based hiring to identify and recruit top talent efficiently. 
              Access pre-trained and pre-evaluated talent at zero cost.
            </p>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                  <p className="text-2xl font-black text-white">0 Cost</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Recruitment Fee</p>
               </div>
               <div className="p-6 bg-black/40 border border-white/5 rounded-2xl">
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Verified Outcomes</p>
               </div>
            </div>
            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-yellow-500 group">
              Explore Codeverse Platform <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="relative">
             <div className="aspect-video bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-12">
                <div className="text-center space-y-4">
                   <Target size={64} className="text-yellow-500/20 mx-auto" />
                   <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">Simulated Lab Environment</p>
                </div>
             </div>
             {/* Decorative tags */}
             <div className="absolute -top-4 -right-4 bg-yellow-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
               Real Use Cases
             </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNERSHIP CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600/10 to-transparent border border-white/5 p-16 rounded-[4rem] text-center backdrop-blur-xl">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-tight">
            Ready to <span className="text-yellow-500">Transform</span> <br /> Your Business?
          </h2>
          <p className="text-slate-400 text-lg mb-12 font-medium">
            Join top companies partnering with SETU to bridge theoretical knowledge with practical application.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
             <input 
               type="email" 
               placeholder="Enter your corporate email"
               className="w-full md:w-96 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-yellow-500 outline-none transition-all"
             />
             <button className="w-full md:w-auto px-10 py-5 bg-yellow-500 text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-yellow-400 transition-all">
               Get Started
             </button>
          </div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-8">
             Talk to us: <span className="text-slate-400">mitra@setuschool.com</span>
          </p>
        </div>
      </section>
    </div>
  );
}

// Utility Section Header (Optional reuse)
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">{title}</h2>
      <div className="h-1 w-20 bg-yellow-500 rounded-full"></div>
    </div>
  );
}