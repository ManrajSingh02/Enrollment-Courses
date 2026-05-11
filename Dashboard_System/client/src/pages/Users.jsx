import { useEffect, useState } from "react";

import Layout from "../components/Layout";

const API_URL = import.meta.env.VITE_API_URL;

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this user?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      alert(data.message);

      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold text-lg">{user.email}</h2>

                  <p className="capitalize text-gray-500">{user.role}</p>
                </div>

                <button
                  onClick={() => removeUser(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
