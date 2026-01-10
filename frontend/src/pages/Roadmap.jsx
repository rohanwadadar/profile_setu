import { useState } from "react";
import { 
  CheckCircle, Code, BarChart, Database, Brain, Rocket, 
  MessageSquare, Sparkles, Target, Layers, Zap, ArrowRight,
  Search
} from "lucide-react";

export default function Roadmap() {
  const [prompt, setPrompt] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const steps = [
    {
      title: "Term 1: Data Foundations",
      icon: <Code className="w-5 h-5" />,
      content: "Environment setup and core programming logic using Python.",
      sublinks: ["Python Fundamentals", "Advanced SQL & RDBMS", "Data Cleaning", "Regular Expressions"]
    },
    {
      title: "Term 2: Applied Machine Learning",
      icon: <Brain className="w-5 h-5" />,
      content: "Transitioning from theory to industry-grade predictive modeling.",
      sublinks: ["Supervised Learning", "Clustering & PCA", "Hyperparameter Tuning", "Intro to LLMs"]
    },
    {
      title: "Problem Solving & Storytelling",
      icon: <MessageSquare className="w-5 h-5" />,
      content: "Setu's unique module on defining strategy and business impact.",
      sublinks: ["Hypothesis Generation", "ROI Analysis", "Data Driven Storytelling", "Stakeholder Management"]
    }
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (prompt.trim()) setIsGenerated(true);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30 font-sans pb-20">
      
      {/* 1. HERO SECTION (Matches your screenshot) */}
      <div className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
            What are you learning today?
          </h1>
          <div className="space-y-2">
            <p className="text-slate-300 text-lg font-bold">Write what you want to learn</p>
            <p className="text-slate-500 text-sm">I will create a comprehensive roadmap to master it</p>
          </div>

          {/* INPUT CARD */}
          <form onSubmit={handleGenerate} className="mt-12 relative max-w-3xl mx-auto">
            <div className="bg-white rounded-[2rem] p-4 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center gap-4">
               <div className="pl-4 text-slate-400">
                 <Search size={24} />
               </div>
               <input 
                 type="text"
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder="e.g. Frontend Developer Roadmap"
                 className="flex-1 bg-transparent border-none outline-none text-slate-900 text-xl font-medium placeholder:text-slate-300"
               />
               <button 
                type="submit"
                className="bg-[#ffcc33] hover:bg-yellow-400 text-black p-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-yellow-500/20"
               >
                 <ArrowRight size={24} strokeWidth={3} />
               </button>
            </div>
          </form>
        </div>
      </div>

      {/* 2. FEATURE CARDS (Matches your screenshot) */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <FeatureCard 
          icon={<Target className="text-red-500" size={32} />} 
          title="Personalized Path" 
          desc="AI-generated roadmap tailored to your goals and skill level" 
        />
        <FeatureCard 
          icon={<Layers className="text-emerald-500" size={32} />} 
          title="Curated Content" 
          desc="Validated resources for each chapter - no time wasted searching" 
        />
        <FeatureCard 
          icon={<Zap className="text-orange-500" size={32} />} 
          title="Start Learning" 
          desc="Your roadmap is ready in seconds. Just begin your journey" 
        />
      </div>

      {/* 3. GENERATED CONTENT (Timeline) */}
      {isGenerated && (
        <div className="max-w-5xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-8 w-1.5 bg-[#ffcc33] rounded-full"></div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Your Custom Roadmap</h2>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-yellow-500/50 before:to-transparent">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-12 group">
                {/* Marker */}
                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-[#ffcc33] z-10 group-hover:border-[#ffcc33]/50 transition-colors">
                  {step.icon}
                </div>

                {/* Card */}
                <div className="bg-[#0b1120] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-all">
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">{step.content}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.sublinks.map((sub, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-black/40 p-3 rounded-xl border border-white/5 group-hover:text-slate-300">
                        <CheckCircle size={14} className="text-[#ffcc33]" />
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
             <button className="bg-[#ffcc33] text-black font-black px-12 py-5 rounded-2xl uppercase text-xs tracking-[0.2em] hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20">
               Save this Roadmap to Profile
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0b1120] border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-white/[0.02] transition-all">
      <div className="mb-6 bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}