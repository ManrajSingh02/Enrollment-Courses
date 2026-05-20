import { useEffect, useState } from "react";

import { Link } from "react-router";

const API = import.meta.env.VITE_API_URL;

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API}/api/enrollments/my`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="text-center mt-20 text-3xl font-bold">Loading...</div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Please Login First</h1>

        <Link
          to="/login"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl"
        >
          Go To Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-6xl font-extrabold mb-14">My Courses</h1>

        {courses.length === 0 ? (
          <div className="bg-white p-14 rounded-[40px] shadow-lg text-center">
            <h2 className="text-4xl font-bold">No Enrolled Courses</h2>

            <p className="mt-5 text-gray-600 text-lg">
              Explore courses and start learning today.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((item) => {
              const course = item.course;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-[35px] overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
                >
                  {/* IMAGE */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />

              
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm">
                        {course.category}
                      </span>

                      <span className="font-bold text-lg">₹{course.price}</span>
                    </div>

                    <h2 className="text-2xl font-bold mt-5">{course.title}</h2>

                    <p className="mt-4 text-gray-600 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="flex justify-between mt-6 text-sm text-gray-500">
                      <span>{course.duration}</span>

                      <span>{course.difficulty}</span>
                    </div>

                    <Link
                      to={`/course/${course._id}`}
                      className="block text-center mt-8 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
