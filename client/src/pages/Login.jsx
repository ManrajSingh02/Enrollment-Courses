import { useState } from "react";

import { useNavigate } from "react-router";

import MessageModal from "../components/MessageModal";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const [modal, setModal] = useState(null);

  const closeModal = () => {
    const nextPath = modal?.nextPath;

    setModal(null);

    if (nextPath) {
      navigate(nextPath);
    }
  };

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
        },
      );

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        setModal({
          title: "Login Failed",
          message: "Backend deployment error",
          type: "error",
        });

        return;
      }

      if (!res.ok || !data.token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setModal({
          title: "Login Failed",
          message: data.message || "Login failed",
          type: "error",
        });
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
          },
        ),
      );

      setModal({
        title: `${isAdminLogin ? "Admin" : "Login"} Successful`,
        message: "You are logged in successfully.",
        type: "success",
        nextPath: isAdminLogin ? "/admin" : "/",
      });
    } catch (error) {
      console.log(error);

      setModal({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
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

      <MessageModal
        open={Boolean(modal)}
        title={modal?.title}
        message={modal?.message}
        type={modal?.type}
        onClose={closeModal}
      />
    </div>
  );
}
