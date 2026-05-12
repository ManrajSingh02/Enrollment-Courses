import { useCallback, useEffect, useState } from "react";

import Layout from "../components/Layout";
import { apiRequest } from "../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const data = await apiRequest("/users", { auth: true });

      setUsers(Array.isArray(data) ? data : []);
      setError("");
    } catch (error) {
      setError(error.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  
    fetchUsers();
  }, [fetchUsers]);

  const removeUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this user?",
    );

    if (!confirmDelete) return;

    try {
      const data = await apiRequest(`/users/${id}`, {
        method: "DELETE",
        auth: true,
      });

      alert(data.message);

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold text-lg">{user.email}</h2>

                  <p className="capitalize text-gray-500">{user.role}</p>
                </div>

                <button
                  onClick={() => removeUser(user.id)}
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
