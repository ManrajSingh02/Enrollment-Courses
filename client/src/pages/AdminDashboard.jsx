import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");

  const getId = (value) => {
    if (!value) return "";

    if (typeof value === "object") {
      return value._id || value.$oid || value.toString();
    }

    return value.toString();
  };

  const getUserByEnrollment = (enrollment) => {
    const enrollmentUserId = getId(enrollment.userId || enrollment.studentId);

    return users.find((user) => getId(user._id || user.id) === enrollmentUserId);
  };

  const getCourseByEnrollment = (enrollment) => {
    const enrollmentCourseId = getId(enrollment.courseId);

    return courses.find((course) => getId(course._id) === enrollmentCourseId);
  };


  useEffect(() => {
    fetch(`${API}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : []));

    fetch(`${API}/admin/enrollments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEnrollments(Array.isArray(data) ? data : []));

    fetch(`${API}/courses`)
      .then((res) => res.json())
      .then((data) => setCourses(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10">
      <h1 className="text-5xl font-bold">Admin Dashboard</h1>

   
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-5xl font-bold text-blue-500">{users.length}</h2>

          <p className="mt-3 text-gray-600">Total Users</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-5xl font-bold text-purple-500">
            {enrollments.length}
          </h2>

          <p className="mt-3 text-gray-600">Total Enrollments</p>
        </div>
      </div>

     
      <div className="bg-white rounded-3xl shadow-lg mt-12 p-8 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-8">Users</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Name</th>

              <th className="text-left py-4">Email</th>

              <th className="text-left py-4">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td className="py-4 text-gray-500" colSpan="3">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-4">{user.name}</td>

                  <td className="py-4">{user.email}</td>

                  <td className="py-4 capitalize">{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-3xl shadow-lg mt-12 p-8 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-8">Enrolled Courses</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">User</th>

              <th className="text-left py-4">Email</th>

              <th className="text-left py-4">Course</th>

              <th className="text-left py-4">Category</th>

              <th className="text-left py-4">Enrolled At</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td className="py-4 text-gray-500" colSpan="5">
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => {
                const user = getUserByEnrollment(enrollment);
                const course = getCourseByEnrollment(enrollment);
                const enrolledAt = enrollment.createdAt || enrollment.enrolledAt;

                return (
                  <tr key={enrollment._id} className="border-b">
                    <td className="py-4">{user?.name || "Unknown User"}</td>

                    <td className="py-4">{user?.email || "-"}</td>

                    <td className="py-4">{course?.title || "Unknown Course"}</td>

                    <td className="py-4">{course?.category || "-"}</td>

                    <td className="py-4">
                      {enrolledAt
                        ? new Date(enrolledAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
