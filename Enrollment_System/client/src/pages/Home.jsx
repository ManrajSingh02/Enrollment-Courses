import { NavLink } from "react-router";

export default function Home() {
  const features = [
    {
      icon: "Book",
      title: "Expert Teachers",
      description:
        "Learn from skilled instructors who explain each topic clearly.",
      cardClass: "from-blue-50 to-indigo-50",
      iconClass: "from-blue-600 to-indigo-600",
    },
    {
      icon: "Time",
      title: "Learn Anytime",
      description:
        "Study at your own speed and continue whenever you are ready.",
      cardClass: "from-green-50 to-emerald-50",
      iconClass: "from-green-600 to-emerald-600",
    },
    {
      icon: "Done",
      title: "Build Skills",
      description:
        "Complete courses and improve the skills you need for your goals.",
      cardClass: "from-purple-50 to-pink-50",
      iconClass: "from-purple-600 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-4 text-lg font-bold text-white shadow-lg">
                CourseNest
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Learn New Skills with
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                CourseNest
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse courses, enroll easily, and learn step by step at your own
              pace.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <NavLink
                to="/courses"
                className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Explore Courses
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm hover:border-gray-400 hover:shadow-md transition-all duration-200"
              >
                Create Account
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose CourseNest?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple way to find courses and start learning
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`rounded-2xl bg-linear-to-br ${feature.cardClass} p-8 text-center shadow-sm border border-gray-100`}
              >
                <div
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r ${feature.iconClass} text-sm font-bold text-white`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-linear-to-r from-blue-600 to-indigo-600">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Create an account and enroll in your first course today.
          </p>
          <NavLink
            to="/register"
            className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Get Started Today
          </NavLink>
        </div>
      </section>
    </div>
  );
}
