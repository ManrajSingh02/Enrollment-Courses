import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import Loader from "../../components/Loader.jsx";
import { apiRequest } from "../../services/api.js";

const menuItems = [
  { to: "/admin", label: "Dashboard", shortLabel: "D" },
  { to: "/admin/students", label: "Students", shortLabel: "S" },
  { to: "/admin/courses", label: "Courses", shortLabel: "C" },
  { to: "/admin/enrollments", label: "Enrollments", shortLabel: "E" },
];

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    difficulty: "Beginner",
    duration: "",
    price: "",
  });

  const loadCourses = useCallback(() => {
    apiRequest("/courses")
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setCourses([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest("/courses", {
        method: "POST",
        auth: true,
        body: form,
      });

      setShowForm(false);
      setForm({
        title: "",
        description: "",
        instructor: "",
        category: "",
        difficulty: "Beginner",
        duration: "",
        price: "",
      });
      loadCourses();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteCourse = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await apiRequest(`/courses/${id}`, {
        method: "DELETE",
        auth: true,
      });

      loadCourses();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex">
        {/* Modern Sidebar */}
        <aside className="w-72 bg-white shadow-xl border-r border-gray-100">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-white">EA</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">EduAdmin</h1>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-xs font-bold text-gray-700">
                    {item.shortLabel}
                  </span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Manage Courses
                </h2>
                <p className="text-gray-600">
                  Create and manage your course catalog
                </p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span>
                {showForm ? "Cancel" : "Add Course"}
              </button>
            </div>
            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Create New Course
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter course title"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor
                    </label>
                    <input
                      type="text"
                      placeholder="Enter instructor name"
                      value={form.instructor}
                      onChange={(e) =>
                        setForm({ ...form, instructor: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Web Development, Design"
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={form.difficulty}
                      onChange={(e) =>
                        setForm({ ...form, difficulty: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 8 weeks, 40 hours"
                      value={form.duration}
                      onChange={(e) =>
                        setForm({ ...form, duration: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description
                  </label>
                  <textarea
                    placeholder="Describe what students will learn in this course..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    rows="4"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Course
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

    
          <div className="space-y-4">
            {courses.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-gray-400">Book</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first course
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Your First Course
                </button>
              </div>
            ) : (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-linear-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-blue-600">
                            Course
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            by {course.instructor}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              Category:
                              {course.category}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                course.difficulty === "Beginner"
                                  ? "bg-green-100 text-green-700"
                                  : course.difficulty === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {course.difficulty}
                            </span>
                            <span>₹{course.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
