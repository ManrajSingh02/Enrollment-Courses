import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const [enrollments, setEnrollments] = useState([]);

  const token = localStorage.getItem("token");


  useEffect(() => {
    fetch(`${API}/admin/users`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch(`${API}/admin/enrollments`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setEnrollments(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10">
      <h1 className="text-5xl font-bold">Admin Dashboard</h1>

   
      <div className="grid md:grid-cols-3 gap-8 mt-10">
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

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-5xl font-bold text-green-500">
            {users.filter((u) => u.role === "admin").length}
          </h2>

          <p className="mt-3 text-gray-600">Total Admins</p>
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
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-4">{user.name}</td>

                <td className="py-4">{user.email}</td>

                <td className="py-4 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
