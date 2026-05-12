import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

export default function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await apiRequest(`/notes/${id}`, { auth: true });

        setNote(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNote();
  }, [id]);

  const deleteNote = async () => {
    try {
      await apiRequest(`/notes/${id}`, {
        method: "DELETE",
        auth: true,
      });

      navigate("/notes");
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
            <button
              onClick={deleteNote}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
