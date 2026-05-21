import { useState } from "react";

import { useNavigate } from "react-router";

import MessageModal from "../components/MessageModal";

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

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

      const res = await fetch(`${API}/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setModal({
          title: "Registration Failed",
          message: data.message || "Registration failed",
          type: "error",
        });
        return;
      }

      setModal({
        title: "Registration Successful",
        message: "Your account has been created successfully.",
        type: "success",
        nextPath: "/login",
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
        <h1 className="text-4xl font-bold text-center mb-8">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full border p-4 rounded-xl mb-5"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

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
          type="number"
          placeholder="Age"
          required
          className="w-full border p-4 rounded-xl mb-5"
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
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
          {loading ? "Loading..." : "Register"}
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
