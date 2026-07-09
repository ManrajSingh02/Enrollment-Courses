import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!showDropdown) return;

    const handleScroll = () => {
      setShowDropdown(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400 transition";

  return (
    <nav className="bg-[#06122f] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink
            to="/"
            className="flex items-center gap-3 text-3xl font-bold text-blue-500"
          >
            <img
              src="/favicon.svg"
              alt="CourseNest"
              className="h-11 w-11 rounded-xl"
            />
            <span>CourseNest</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink>

            {user && (
              <NavLink to="/my-courses" className={navLinkClass}>
                My Courses
              </NavLink>
            )}

            {!user ? (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition"
                >
                  <span className="text-lg">👤</span>

                  <span>{user.name}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-5 border-b">
                      <h3 className="font-semibold text-lg">{user.name}</h3>

                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-4 text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col gap-5 py-5 border-t border-white/10">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/courses"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Courses
            </NavLink>

            {user && (
              <NavLink
                to="/my-courses"
                className={navLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                My Courses
              </NavLink>
            )}

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-blue-600 px-4 py-2 rounded-xl text-center"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <div className="bg-white/10 rounded-xl px-4 py-3">
                  <p className="font-semibold">{user.name}</p>

                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-xl"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
