import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth.js";
import Loader from "../components/Loader.jsx";
import { apiRequest } from "../services/api.js";

export default function MyCourses() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/enrollments/my", { auth: true })
      .then((data) => {
        setEnrollments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "We could not load your courses right now.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold text-gray-950">My Courses</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>

        {enrollments.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-gray-500">
              You haven't enrolled in any courses yet.
            </p>
            <a
              href="/courses"
              className="mt-4 inline-block rounded bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment) => (
              <article
                key={enrollment._id}
                className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-blue-700">
                    {enrollment.course?.category || "Course"}
                  </p>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                    Enrolled
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-950">
                  {enrollment.course?.title || "Course unavailable"}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {enrollment.course?.description ||
                    "This course is no longer available."}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Enrolled on{" "}
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
