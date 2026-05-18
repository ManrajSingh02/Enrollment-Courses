import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth.js";
import Loader from "../components/Loader.jsx";
import { apiRequest } from "../services/api.js";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    apiRequest(`/courses/${id}`)
      .then((data) => {
        if (!data?._id) {
          throw new Error("We could not find that course.");
        }

        return data;
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "We could not load this course right now.");
        setLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      await apiRequest("/enrollments", {
        method: "POST",
        auth: true,
        body: { courseId: id },
      });

      alert("Successfully enrolled in the course!");
      navigate("/my-courses");
    } catch (error) {
      setError(error.message || "We could not enroll you right now.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!course) return <div className="p-6 text-center">Course not found</div>;

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gray-100">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
              {course.category || "Course"}
            </span>
            <span className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700">
              {course.difficulty || "Beginner"}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-950">
            {course.title || "Course name unavailable"}
          </h1>
          <p className="mt-2 text-gray-600">
            by {course.instructor || "CourseNest"}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{course.duration || "Not added"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-semibold">
                {course.price || course.price === 0
                  ? `Rs. ${course.price}`
                  : "Not added"}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-950">Description</h2>
            <p className="mt-4 text-gray-600">
              {course.description || "Course description has not been added."}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="rounded bg-blue-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="rounded bg-gray-200 px-6 py-3 font-semibold text-gray-900"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
