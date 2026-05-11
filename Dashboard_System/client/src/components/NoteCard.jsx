import { Link } from "react-router";

export default function NoteCard({
  note,
  user,
  onDelete,
}) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-2xl font-bold">
        {note.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {note.content}
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          to={`/notes/${note.id}`}
          className="text-blue-500"
        >
          View
        </Link>

        {(user.role === "admin" ||
          user.role === "editor") && (
          <Link
            to={`/edit/${note.id}`}
            className="text-green-500"
          >
            Edit
          </Link>
        )}

        {user.role === "admin" && (
          <button
            onClick={() =>
              onDelete(note.id)
            }
            className="text-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}