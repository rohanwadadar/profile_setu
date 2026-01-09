import { CheckCircle, Code, BarChart, Database, Brain, Rocket, MessageSquare } from "lucide-react";

export default function Roadmap() {
  const steps = [
    {
      title: "Term 1: Data Foundations",
      icon: <Code className="w-6 h-6" />,
      content: "Environment setup and core programming logic using Python.",
      sublinks: ["Python Fundamentals (Loops, List, Dict)", "Advanced SQL & RDBMS", "Data Cleaning with Pandas/NumPy", "Regular Expressions & File I/O"]
    },
    {
      title: "Term 2: Applied Machine Learning",
      icon: <Brain className="w-6 h-6" />,
      content: "Transitioning from theory to industry-grade predictive modeling.",
      sublinks: ["Supervised Learning (Regression, Classifiers)", "Unsupervised Learning (Clustering, PCA)", "Model Evaluation & Hyperparameter Tuning", "Introduction to GenAI & LLMs"]
    },
    {
      title: "Problem Solving & Storytelling",
      icon: <MessageSquare className="w-6 h-6" />,
      content: "Setu's unique module on defining strategy and business impact.",
      sublinks: ["Hypothesis Generation", "ROI & Monetary Impact Analysis", "Data Driven Storytelling", "Stakeholder Management"]
    },
    {
      title: "MLOps & Cloud Infrastructure",
      icon: <Database className="w-6 h-6" />,
      content: "Building and deploying models on real-world cloud environments.",
      sublinks: ["Cloud Environment Setup", "Version Control with Git/GitHub", "Model Deployment Basics", "Big Data Introduction"]
    },
    {
      title: "Data Gym & Industry Projects",
      icon: <Rocket className="w-6 h-6" />,
      content: "Hands-on experience with real industry data sets.",
      sublinks: ["Guaranteed Internship Modules", "Live Industry Projects", "Capstone Presentation", "Placement Assistance & Mock Interviews"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            Learning <span className="text-yellow-500">Roadmap</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            A comprehensive path designed by industry leaders at Setu School to take you from a learner to a Data Detective.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Icon / Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-yellow-500 shadow-xl z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 group-hover:border-yellow-500/50">
                {step.icon}
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/60 border border-slate-800/50 p-6 rounded-xl backdrop-blur-sm shadow-2xl hover:border-slate-700/80 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white text-xl">{step.title}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {step.content}
                </p>
                
                <ul className="grid grid-cols-1 gap-2">
                  {step.sublinks.map((sub, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-2">Ready to start your journey?</h2>
            <p className="text-slate-400 text-sm mb-6">Join 500+ learners currently mastering Data Science and AI.</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-yellow-500/20">
              Download Full Curriculum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}