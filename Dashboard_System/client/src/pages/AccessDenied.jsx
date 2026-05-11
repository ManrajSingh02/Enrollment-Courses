import { Link } from "react-router";

export default function AccessDenied() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">
        403
      </h1>

      <p className="mt-4 text-xl">
        You don't have permission
        to access this page.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-black text-white px-5 py-2 rounded"
      >
        Go Back
      </Link>
    </div>
  );
}