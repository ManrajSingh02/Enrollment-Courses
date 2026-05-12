import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../services/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchNotes = useCallback(async () => {
    try {
      const data = await apiRequest("/notes", { auth: true });

      setNotes(Array.isArray(data) ? data : []);
      setError("");
    } catch (error) {
      setNotes([]);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
 
    fetchNotes();
  }, [fetchNotes]);

  const deleteNote = async (id) => {
    try {
      await apiRequest(`/notes/${id}`, {
        method: "DELETE",
        auth: true,
      });

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

      {loading ? (
        <p className="text-gray-600">Loading notes...</p>
      ) : notes.length === 0 && !error ? (
        <p className="text-gray-600">No notes found.</p>
      ) : (
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
      )}
    </Layout>
  );
}
