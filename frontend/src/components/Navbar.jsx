import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User, Map, LogIn, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Optimization: Centralized navigation logic
  const navLinks = [
    { to: "/roadmap", label: "Roadmap", icon: <Map size={18} /> },
  ];

  if (user) {
    navLinks.push({ to: "/profile", label: "Profile", icon: <User size={18} /> });
    if (user.role === "admin") {
      navLinks.push({ to: "/admin", label: "Admin", icon: <ShieldCheck size={18} /> });
    }
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* Simple Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-yellow-500">
          SETU
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              {...link} 
              active={location.pathname === link.to} 
            />
          ))}

          <div className="w-px h-6 bg-slate-800 mx-2 hidden sm:block" />

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login" label="Login" icon={<LogIn size={18} />} />
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-bold text-sm transition-all"
              >
                Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, icon, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "text-yellow-500 bg-yellow-500/10" 
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}