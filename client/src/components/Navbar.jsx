import {
  Link,
  useNavigate,
} from "react-router";

import { useState } from "react";

export default function Navbar() {

  const token =
    localStorage.getItem("token");

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-[#0f172a] text-white px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-bold text-blue-400"
      >
        CourseNest
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">

        <Link to="/">
          Home
        </Link>

        <Link to="/courses">
          Courses
        </Link>

        {token && (
          <Link to="/my-courses">
            My Courses
          </Link>
        )}

        {!token ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-500 px-5 py-2 rounded-xl"
            >
              Create Account
            </Link>
          </>
        ) : (

          // Profile Dropdown
          <div className="relative">

            <button
              onClick={() =>
                setOpen(!open)
              }
              className="bg-[#1e293b] px-4 py-2 rounded-xl flex items-center gap-2"
            >
              👤 Profile
            </button>

            {open && (
              <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-xl w-48 overflow-hidden z-50">

                <Link
                  to="/my-courses"
                  className="block px-5 py-3 hover:bg-gray-100"
                >
                  My Courses
                </Link>

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
    </nav>
  );
}