// import { createContext, useState, useEffect } from "react";
// import { getProfile } from "../api/auth";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       getProfile()
//         .then(res => setUser(res.data))
//         .catch(() => {
//           localStorage.removeItem("token");
//           setUser(null);
//         });
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/profile";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 🔐 Check auth on app load
   */
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (err) {
      console.error("Auth check failed", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🚪 Logout helper
   */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
