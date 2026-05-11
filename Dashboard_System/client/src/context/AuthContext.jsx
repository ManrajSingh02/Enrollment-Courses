import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const getStoredUser = () => {
    try {
      const user = localStorage.getItem("user");

      if (!user || user === "undefined") {
        return null;
      }

      return JSON.parse(user);
    } catch (error) {
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser());

  

  const login = (data) => {
    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };



  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
