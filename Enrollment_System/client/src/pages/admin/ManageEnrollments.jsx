import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function ManageEnrollments() {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/enrollments`, {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEnrollments(data);
        setLoading(false);
      });
  }, [token]);

  const deleteEnrollment = async (id) => {
    if (!confirm("Are you sure you want to remove this enrollment?")) return;

    try {
      const res = await fetch(`${API_URL}/enrollments/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setEnrollments(
          enrollments.filter((enrollment) => enrollment._id !== id),
        );
      }
    } catch (error) {
      console.error("Error deleting enrollment:", error);
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
            <a href="/admin/students">Students</a>
            <a href="/admin/courses">Courses</a>
            <a href="/admin/enrollments" className="text-blue-400">
              Enrollments
            </a>
          </nav>
        </aside>
        <section className="flex-1">
          <h2 className="text-4xl font-bold text-gray-950">
            Manage Enrollments
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full rounded-lg bg-white shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Course
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Enrolled Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id} className="border-t">
                    <td className="px-4 py-3">{enrollment.student.name}</td>
                    <td className="px-4 py-3">{enrollment.course.title}</td>
                    <td className="px-4 py-3">
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteEnrollment(enrollment._id)}
                        className="rounded bg-red-600 px-3 py-1 text-white text-sm"
                      >
                        Remove
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
