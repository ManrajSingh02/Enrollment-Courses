import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest, getStoredToken } from "../services/api.js";

const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(() => Boolean(getStoredToken()));

  useEffect(() => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      return;
    }

    apiRequest("/auth/verify", { auth: true })
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          setToken(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (data) => {
    if (data?.token && data?.user) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
