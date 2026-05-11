import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function ManageStudents() {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/students`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, [token]);

  const updateStudent = async (id, updates) => {
    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        setStudents(
          students.map((student) =>
            student._id === id ? { ...student, ...updates } : student,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setStudents(students.filter((student) => student._id !== id));
      }
    } catch (error) {
      console.error("Error deleting student:", error);
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
                {students.map((student) => (
                  <tr key={student._id} className="border-t">
                    <td className="px-4 py-3">{student.name}</td>
                    <td className="px-4 py-3">{student.email}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
