import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  LogOut, User, Map, LogIn, ShieldCheck, 
  Info, Building2, Menu, X 
} from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Main Site Links (Left side)
  const mainLinks = [
    { to: "/about", label: "About Us" },
    { to: "/enterprise", label: "For Enterprise" },
  ];

  // App Functional Links (Right side)
  const appLinks = [
    { to: "/roadmap", label: "Roadmap", icon: <Map size={16} /> },
  ];

  if (user) {
    appLinks.push({ to: "/profile", label: "Profile", icon: <User size={16} /> });
    if (user.role === "admin") {
      appLinks.push({ to: "/admin", label: "Admin", icon: <ShieldCheck size={16} /> });
    }
  }

  return (
    <nav className="sticky top-0 z-[60] backdrop-blur-xl bg-[#020617]/80 border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LEFT AREA: LOGO & PRIMARY NAV */}
        <div className="flex items-center gap-12">
          {/* LOGO */}
          <Link to="/" className="flex flex-col group transition-transform active:scale-95">
            <span className="text-3xl font-black tracking-tighter text-yellow-500 leading-none">
              SETU<span className="text-white">®</span>
            </span>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-slate-500 group-hover:text-yellow-500/50 transition-colors">
              योग: कर्मसु कौशलम्
            </span>
          </Link>

          {/* DESKTOP PRIMARY LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold tracking-tight transition-all relative py-2 ${
                  location.pathname === link.to 
                    ? "text-yellow-500" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full animate-in fade-in zoom-in duration-300"></span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT AREA: APP NAV & AUTH */}
        <div className="flex items-center gap-2">
          
          {/* APP PILLS (Roadmap, Profile) */}
          <div className="hidden md:flex items-center gap-1">
            {appLinks.map((link) => (
              <NavLink 
                key={link.to} 
                {...link} 
                active={location.pathname === link.to} 
              />
            ))}
          </div>

          <div className="w-px h-6 bg-white/10 mx-4 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all text-[10px] font-black uppercase tracking-widest"
              >
                <LogOut size={16} />
                <span className="hidden lg:inline">Logout</span>
              </button>
              
              {/* Profile Avatar */}
              <Link 
                to="/profile" 
                className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black shadow-lg shadow-yellow-500/20 border-2 border-white/10 hover:scale-105 transition-transform"
              >
                {user.name?.charAt(0) || "U"}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link 
                to="/login" 
                className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-yellow-500/10 active:scale-95"
              >
                Join Now
              </Link>
            </div>
          )}
          
          {/* MOBILE TOGGLE */}
          <button className="lg:hidden ml-4 p-2 text-slate-400 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/**
 * Styled NavLink Component for Functional Links (Roadmap, Profile)
 */
function NavLink({ to, label, icon, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        active 
          ? "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}