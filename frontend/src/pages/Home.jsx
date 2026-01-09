import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  Terminal, 
  Compass, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Radio,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const { user } = useContext(AuthContext);

  const steps = [
    {
      icon: <Terminal className="text-yellow-500" size={28} />,
      title: "Tell Shifu your goal",
      desc: "'Want to be a Data Analyst' or 'learn Agentic AI in Finance'?"
    },
    {
      icon: <Compass className="text-yellow-500" size={28} />,
      title: "Get your personalized roadmap",
      desc: "Shifu analyzes millions of paths to build the one just for you."
    },
    {
      icon: <BookOpen className="text-yellow-500" size={28} />,
      title: "Access Curated Contents",
      desc: "The best articles, videos, and courses, all in one place."
    }
  ];

  const workshops = [
    { title: "Vibe Coding a GenAI application (C3)", category: "GenAI" },
    { title: "Python for All", category: "Basics" },
    { title: "AI Meets Agile", category: "Management" },
    { title: "Agentic AI for Non-Coders", category: "No-Code" },
    { title: "Agentic AI - Build Autonomous Solutions", category: "Advanced" },
    { title: "GenAI Powered Transformative HR", category: "Business" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30">
      {/* Hero Section */}
      <div className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Shifu — your personal <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    AI learning coach
                  </span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
                  Stop searching. Start Learning with a clear path in just 3 simple steps.
                </p>
              </div>

              <button className="group flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-yellow-500/20 active:scale-95">
                Create My Roadmap 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Step Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                {steps.map((step, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-sm">
                    <div className="mb-4">{step.icon}</div>
                    <h3 className="font-bold text-sm mb-2">{step.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Illustration/Input Preview */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">What are you Learning today?</h2>
                <div className="relative">
                  <input 
                    disabled
                    placeholder="domain, I do not have any coding background" 
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-5 px-6 text-slate-400 pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-yellow-500 p-3 rounded-xl text-black">
                    <Sparkles size={20} />
                  </div>
                </div>
                {/* Floating tags decoration */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {['Data Science', 'Generative AI', 'Agentic Workflows'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Workshops Section */}
      <section className="py-24 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold px-6 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-3">
              <Radio className="text-red-500 animate-pulse" size={20} />
              DAP Live Workshops
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((item, i) => (
              <div key={i} className="group relative overflow-hidden bg-slate-900/50 border border-slate-800/80 p-6 rounded-2xl hover:border-yellow-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-950 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
                    <Lock size={12} className="text-yellow-500" />
                    CLASS FULL
                  </div>
                </div>
                <h3 className="font-bold text-slate-200 group-hover:text-yellow-500 transition-colors mb-4">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-slate-600">Upcoming Session</span>
                  <ChevronRight size={16} className="text-slate-700 group-hover:text-yellow-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}