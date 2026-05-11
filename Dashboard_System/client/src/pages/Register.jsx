import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "viewer",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      login(data);

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <select
          className="border w-full p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="viewer">Viewer</option>

          <option value="editor">Editor</option>

          <option value="admin">Admin</option>
        </select>

        <button className="bg-black text-white w-full py-3 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
