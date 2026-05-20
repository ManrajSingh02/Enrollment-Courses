import { useState } from "react";

import { useNavigate } from "react-router";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        alert("Backend deployment error");

        return;
      }

      localStorage.setItem("token", data.token);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <form
        onSubmit={submit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-4 rounded-xl mb-5"
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
          required
          className="w-full border p-4 rounded-xl mb-5"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
