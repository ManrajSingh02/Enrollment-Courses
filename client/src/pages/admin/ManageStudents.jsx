import { useEffect, useState } from "react";
import Loader from "../../components/Loader.jsx";
import { apiRequest } from "../../services/api.js";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/admin/students", { auth: true })
      .then((data) => {
        setStudents(Array.isArray(data) ? data : []);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setStudents([]);
        setLoading(false);
      });
  }, []);

  const deleteStudent = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await apiRequest(`/admin/students/${id}`, {
        method: "DELETE",
        auth: true,
      });

      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-[calc(100vh-65px)] bg-gray-100">
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-10">
        <aside className="w-64 rounded-lg bg-gray-900 p-6 text-white">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <nav className="mt-8 grid gap-4 text-sm">
            <a href="/admin">Dashboard</a>
            <a href="/admin/students" className="text-blue-400">
              Students
            </a>
            <a href="/admin/courses">Courses</a>
            <a href="/admin/enrollments">Enrollments</a>
          </nav>
        </aside>
        <section className="flex-1">
          <h2 className="text-4xl font-bold text-gray-950">Manage Students</h2>
          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-6 overflow-x-auto">
            <table className="w-full rounded-lg bg-white shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-500" colSpan="4">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                  <tr key={student._id} className="border-t">
                    <td className="px-4 py-3">{student.name || "Name unavailable"}</td>
                    <td className="px-4 py-3">{student.email || "Email unavailable"}</td>
                    <td className="px-4 py-3">{student.age || "N/A"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteStudent(student._id)}
                        className="rounded bg-red-600 px-3 py-1 text-white text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
