import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import RoleBadge from "./RoleBadge";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <Link
          to="/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/notes"
          className="hover:text-gray-300"
        >
          Notes
        </Link>

        {(user?.role === "admin" ||
          user?.role === "editor") && (
          <Link
            to="/create-note"
            className="hover:text-gray-300"
          >
            Create Note
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/users"
            className="hover:text-gray-300"
          >
            Users
          </Link>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <RoleBadge role={user?.role} />

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}