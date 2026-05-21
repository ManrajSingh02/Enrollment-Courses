import { NavLink } from "react-router";

export default function Home() {

  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-[#f8fafc]">


      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

       
          <div>

            <h1 className="text-6xl font-extrabold leading-tight text-[#0f172a]">

              Learn New Skills
              <span className="text-blue-500">
                {" "}Online
              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">

              Browse premium courses,
              enroll easily, and improve
              your skills with expert-led
              learning paths.

            </p>

            <div className="flex gap-5 mt-8">

              <NavLink
                to="/courses"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg"
              >
                Explore Courses
              </NavLink>

              {!token && (
                <NavLink
                  to="/register"
                  className="bg-white border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-2xl shadow"
                >
                  Create Account
                </NavLink>
              )}

            </div>

          </div>

          
          <div className="flex justify-center">

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-[320px] h-[320px] rounded-[40px] shadow-2xl flex items-center justify-center">

              <h2 className="text-white text-5xl font-extrabold">
                CourseNest
              </h2>

            </div>

          </div>

        </div>

      </section>

  
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <div className="text-5xl">
              📚
            </div>

            <h3 className="text-2xl font-bold mt-5">
              25+ Courses
            </h3>

            <p className="mt-3 text-gray-600">

              Explore courses in web
              development, AI, cloud,
              cybersecurity, and more.

            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <div className="text-5xl">
              🎓
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Expert Instructors
            </h3>

            <p className="mt-3 text-gray-600">

              Learn directly from industry
              experts and experienced
              mentors.

            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <div className="text-5xl">
              🚀
            </div>

            <h3 className="text-2xl font-bold mt-5">
              Career Growth
            </h3>

            <p className="mt-3 text-gray-600">

              Gain practical skills and
              prepare yourself for
              real-world opportunities.

            </p>

          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">

        {!token ? (


          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] p-14 text-center text-white shadow-2xl">

            <h2 className="text-5xl font-bold">
              Ready to Start Learning?
            </h2>

            <p className="mt-5 text-lg text-blue-100">

              Create your account and
              start learning from premium
              courses today.

            </p>

            <NavLink
              to="/register"
              className="inline-block mt-8 bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100"
            >
              Get Started
            </NavLink>

          </div>

        ) : (

         
          <div className="bg-[#0f172a] rounded-[40px] p-10 shadow-2xl text-white">

          
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-[#1e293b] p-8 rounded-3xl">

                <h2 className="text-5xl font-bold text-blue-400">
                  25+
                </h2>

                <p className="mt-3 text-gray-400">
                  Premium Courses
                </p>

              </div>

              <div className="bg-[#1e293b] p-8 rounded-3xl">

                <h2 className="text-5xl font-bold text-purple-400">
                  1500+
                </h2>

                <p className="mt-3 text-gray-400">
                  Active Students
                </p>

              </div>

              <div className="bg-[#1e293b] p-8 rounded-3xl">

                <h2 className="text-5xl font-bold text-green-400">
                  98%
                </h2>

                <p className="mt-3 text-gray-400">
                  Course Completion Rate
                </p>

              </div>

            </div>

          
            <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">

              <div>

                <h2 className="text-4xl font-bold">
                  Welcome Back 👋
                </h2>

                <p className="mt-3 text-gray-400 text-lg">

                  Continue learning and
                  explore new premium
                  courses to boost your
                  career.

                </p>

              </div>

              <NavLink
                to="/courses"
                className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl shadow-lg"
              >
                Explore More Courses
              </NavLink>

            </div>

          </div>

        )}

      </section>

    </div>
  );
}
