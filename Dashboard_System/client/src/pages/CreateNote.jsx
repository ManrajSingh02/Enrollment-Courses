import { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";
import { apiRequest } from "../services/api";

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
      await apiRequest("/notes", {
        method: "POST",
        auth: true,
        body: form,
      });

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
