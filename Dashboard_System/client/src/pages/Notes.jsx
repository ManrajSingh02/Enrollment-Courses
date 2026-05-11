import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `${API_URL}/notes`,
        {
          headers: {
            Authorization:
              localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load notes");
      }

      setNotes(Array.isArray(data) ? data : []);
      setError("");
    } catch (error) {
      setNotes([]);
      setError(error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization:
            localStorage.getItem("token"),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete note");
      }

      fetchNotes();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-5 font-bold">
        Notes
      </h1>

      {error && (
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}

      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded-xl shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {note.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {note.content}
            </p>

            <div className="flex gap-4 mt-4">
              <Link
                to={`/notes/${note.id}`}
                className="text-blue-500"
              >
                View
              </Link>

              {(user?.role === "admin" ||
                user?.role === "editor") && (
                <Link
                  to={`/edit/${note.id}`}
                  className="text-green-500"
                >
                  Edit
                </Link>
              )}

              {user?.role === "admin" && (
                <button
                  onClick={() =>
                    deleteNote(note.id)
                  }
                  className="text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
