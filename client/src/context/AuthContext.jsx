import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest, getStoredToken } from "../services/api.js";
import { AuthContext } from "./auth-context.js";

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

  const login = useCallback((data) => {
    if (data?.token && data?.user) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      token,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      loading,
    }),
    [loading, login, logout, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
