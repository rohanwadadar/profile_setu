import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.access_token);

      const profile = await fetch("http://127.0.0.1:5000/api/profile", {
        headers: { Authorization: `Bearer ${res.data.access_token}` }
      }).then(r => {
        if (!r.ok) throw new Error("Failed to fetch profile");
        return r.json();
      });

      setUser(profile);
      navigate(profile.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Please enter your details to sign in</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border bg-red-950/50 border-red-800/50 text-red-400">
            <div className="flex items-center gap-2 text-sm">
              <span>✕</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/50 border border-slate-800/50 rounded-xl p-8 backdrop-blur-sm shadow-2xl">
          <form onSubmit={submit} className="space-y-6">
            <Input 
              label="Email Address" 
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input 
              label="Password" 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center mt-8 text-sm text-slate-500">
            Don't have an account?{" "}
            <button className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors">
              Contact Admin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusing the same styled Input component for consistency
function Input({ label, ...props }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-slate-950/50 border border-slate-700/50 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500/50 transition-all duration-200 placeholder:text-slate-600 hover:border-slate-600/70"
      />
    </div>
  );
}