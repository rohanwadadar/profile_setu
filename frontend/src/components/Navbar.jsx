import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LogOut, User, ShieldCheck,
  Menu, X, Search, ChevronRight
} from "lucide-react";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${searchQuery}`);
      setIsMenuOpen(false);
    }
  };

  const mainLinks = [
    { to: "/about", label: "About Us" },
    { to: "/enterprise", label: "For Enterprise" },
  ];

  return (
    <nav className="sticky top-0 z-[60] backdrop-blur-xl bg-[#020617]/90 border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center gap-4">

        {/* LEFT: LOGO */}
        <Link to="/" className="flex items-center flex-shrink-0 transition-transform active:scale-95">
          <img
            src="https://setuschool.com/static/media/setu-logo-web-footer.1955db586cc455c25e448cc8a4b75584.svg"
            alt="SETU Logo"
            className="h-8 sm:h-10 w-auto object-contain"
          // Note: If the logo appears invisible because it's dark, 
          // you can add "brightness-0 invert" to the className
          />
        </Link>

        {/* CENTER: SEARCH BAR (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-sm lg:max-w-md relative group"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 transition-all"
          />
        </form>

        {/* RIGHT AREA */}
        <div className="flex items-center gap-2 sm:gap-6">

          {/* Desktop Links (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-8 mr-4">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] font-black uppercase tracking-widest transition-all ${location.pathname === link.to ? "text-yellow-500" : "text-slate-400 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Profile & Auth Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin" className="hidden sm:block text-slate-400 hover:text-yellow-500 transition-colors">
                    <ShieldCheck size={20} />
                  </Link>
                )}

                {/* Profile Avatar */}
                <Link
                  to="/profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black shadow-lg shadow-yellow-500/20 border border-white/10 hover:scale-105 transition-transform overflow-hidden"
                >
                  {user.name?.charAt(0).toUpperCase() || <User size={18} />}
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden sm:flex p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Login
                </Link>
                <Link to="/register" className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-yellow-400 transition-all">
                  Join
                </Link>
              </div>
            )}

            {/* MOBILE HAMBURGER MENU TOGGLE */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white bg-white/5 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-[#020617] border-b border-white/10 p-5 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">

          {/* Mobile Search bar */}
          <form onSubmit={handleSearch} className="md:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none"
            />
          </form>

          {/* Nav Links moved to menu on small screens */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-2">Navigation</p>
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 text-slate-200 font-bold transition-colors"
              >
                {link.label}
                <ChevronRight size={16} className="text-slate-600" />
              </Link>
            ))}
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-4 border-t border-white/5">
            {user ? (
              <div className="space-y-3">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 p-3 text-slate-200 font-bold"
                >
                  <User size={18} className="text-yellow-500" /> My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full p-3 text-red-400 font-bold uppercase text-[10px] tracking-widest"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex justify-center py-3 border border-white/10 rounded-xl text-white font-black text-[10px] uppercase tracking-widest"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex justify-center py-3 bg-yellow-500 rounded-xl text-black font-black text-[10px] uppercase tracking-widest"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}