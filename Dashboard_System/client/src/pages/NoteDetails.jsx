import { useEffect, useState } from "react";

import { Link, useParams } from "react-router";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function NoteDetails() {
  const { id } = useParams();

  const { user } = useAuth();

  const [note, setNote] = useState(null);
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

      setNote(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return (
      <Layout>
        <h1 className="text-red-500">{error}</h1>
      </Layout>
    );
  }

  if (!note) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-4xl font-bold">{note.title}</h1>

        <p className="mt-4 text-gray-700">{note.content}</p>

        <div className="flex gap-4 mt-6">
          {(user?.role === "admin" || user?.role === "editor") && (
            <Link
              to={`/edit/${note.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>
          )}

          {user?.role === "admin" && (
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
