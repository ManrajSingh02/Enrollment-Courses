export default function MessageModal({
  open,
  title = "Message",
  message,
  type = "info",
  onClose,
}) {
  if (!open) {
    return null;
  }

  const titleColor =
    type === "success"
      ? "text-green-600"
      : type === "error"
        ? "text-red-600"
        : "text-blue-600";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >
        <h2 className={`text-2xl font-bold ${titleColor}`}>{title}</h2>

        <p className="mt-4 text-gray-700">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}
