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

  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${API}${isAdminLogin ? "/admin/login" : "/auth/login"}`,
        {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
        }
      );

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        alert("Backend deployment error");

        return;
      }

      if (!res.ok || !data.token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user || {
            name: "Admin",
            email: form.email,
            role: data.role || "admin",
          }
        )
      );

      alert(`${isAdminLogin ? "Admin" : "Login"} Successful`);

      navigate(isAdminLogin ? "/admin" : "/");
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
        <h1 className="text-4xl font-bold text-center mb-8">
          {isAdminLogin ? "Admin Login" : "Login"}
        </h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setIsAdminLogin(false)}
            className={`py-3 rounded-xl ${
              !isAdminLogin ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => setIsAdminLogin(true)}
            className={`py-3 rounded-xl ${
              isAdminLogin ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            Admin
          </button>
        </div>

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
          {loading ? "Loading..." : isAdminLogin ? "Admin Login" : "Login"}
        </button>
      </form>
    </div>
  );
}
