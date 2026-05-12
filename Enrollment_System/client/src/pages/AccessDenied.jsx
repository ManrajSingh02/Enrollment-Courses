import { Link } from "react-router";

export default function AccessDenied() {
  return (
    <main className="min-h-[calc(100vh-65px)] bg-gray-100">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <h1 className="text-3xl font-bold text-gray-950">Access denied</h1>
          <p className="mt-3 text-gray-600">
            Your account does not have permission to view this page.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
