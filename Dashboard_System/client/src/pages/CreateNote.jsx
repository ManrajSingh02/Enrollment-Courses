import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function CreateNote() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create note");
      }

      navigate("/notes");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-5">
          Create Note
        </h1>

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Title"
          className="border w-full p-2 mb-4 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Content"
          className="border w-full p-2 mb-4 rounded h-40"
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
        />

        <button className="bg-black text-white px-5 py-2 rounded">
          Create
        </button>
      </form>
    </Layout>
  );
}
