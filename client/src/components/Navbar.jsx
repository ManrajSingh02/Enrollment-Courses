import { useState } from "react";

import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  const displayName = user?.name || "Profile";

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-[#071028] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-4xl font-extrabold text-blue-400">
          CourseNest
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/courses">Courses</NavLink>

          {token && <NavLink to="/my-courses">My Courses</NavLink>}

          {user?.role === "admin" && (
            <NavLink to="/admin">Admin Dashboard</NavLink>
          )}

          {!token ? (
            <>
              <NavLink to="/login">Login</NavLink>

              <NavLink
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-[#1e293b] px-5 py-2 rounded-xl"
              >
                {displayName}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded-2xl shadow-2xl w-48 overflow-hidden">
                  <div className="px-5 py-3 font-semibold border-b">
                    {displayName}
                  </div>

                  {user?.role === "admin" && (
                    <NavLink
                      to="/admin"
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </NavLink>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-5 py-3 hover:bg-red-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#071028] border-t border-gray-700 px-6 py-5 flex flex-col gap-5">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/courses" onClick={() => setOpen(false)}>
            Courses
          </NavLink>

          {token && (
            <NavLink to="/my-courses" onClick={() => setOpen(false)}>
              My Courses
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" onClick={() => setOpen(false)}>
              Admin Dashboard
            </NavLink>
          )}

          {!token ? (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-blue-500 text-center py-3 rounded-xl"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <div className="font-semibold">{displayName}</div>

              <button onClick={logout} className="bg-red-500 py-3 rounded-xl">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
