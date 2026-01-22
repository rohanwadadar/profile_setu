// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children, role }) {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" />;

//   if (role && user.role !== role) return <Navigate to="/" />;

//   return children;
// }

// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  // ⏳ Wait until auth check finishes
  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 👑 Role-based restriction
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
