import { Link, useNavigate } from "react-router";

import { useState } from "react";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

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
        {/* LOGO */}
        <Link to="/" className="text-4xl font-extrabold text-blue-400">
          CourseNest
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>

          <Link to="/courses">Courses</Link>

          {token && <Link to="/my-courses">My Courses</Link>}

          {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}

          {!token ? (
            <>
              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-[#1e293b] px-5 py-2 rounded-xl"
              >
                👤 Profile
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded-2xl shadow-2xl w-48 overflow-hidden">
                  <Link
                    to="/my-courses"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    My Courses
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
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
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#071028] border-t border-gray-700 px-6 py-5 flex flex-col gap-5">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link to="/courses" onClick={() => setOpen(false)}>
            Courses
          </Link>

          {token && (
            <Link to="/my-courses" onClick={() => setOpen(false)}>
              My Courses
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin Dashboard
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-blue-500 text-center py-3 rounded-xl"
              >
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} className="bg-red-500 py-3 rounded-xl">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
