import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-4 text-lg">
          Welcome back,
          <span className="font-bold">
            {" "}
            {user.email}
          </span>
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-100 p-5 rounded-xl">
            <h2 className="text-xl font-bold">
              Notes
            </h2>

            <p className="mt-2">
              Manage all your notes
            </p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl">
            <h2 className="text-xl font-bold">
              Role
            </h2>

            <p className="mt-2 capitalize">
              {user.role}
            </p>
          </div>

          <div className="bg-purple-100 p-5 rounded-xl">
            <h2 className="text-xl font-bold">
              Access
            </h2>

            <p className="mt-2">
              Enabled
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
