export default function RoleBadge({
  role,
}) {
  const colors = {
    admin: "bg-red-500",
    editor: "bg-blue-500",
    viewer: "bg-green-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm text-white ${colors[role]}`}
    >
      {role}
    </span>
  );
}