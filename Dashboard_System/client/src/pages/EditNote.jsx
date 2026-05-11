import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditNote() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load note");
      }

      setForm({
        title: data.title || "",
        content: data.content || "",
      });
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update note");
      }

      navigate("/notes");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <h1 className="text-3xl font-bold mb-5">Edit Note</h1>

        {error && (
          <p className="mb-4 text-red-500">
            {error}
          </p>
        )}

        <input
          type="text"
          value={form.title}
          className="border w-full p-2 mb-4 rounded"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          value={form.content}
          className="border w-full p-2 mb-4 rounded h-40"
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
        />

        <button className="bg-black text-white px-5 py-2 rounded">
          Update
        </button>
      </form>
    </Layout>
  );
}
