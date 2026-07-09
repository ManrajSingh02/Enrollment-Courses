import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router";

const API = import.meta.env.VITE_API_URL;

const getStoredToken = () => {
  const token = localStorage.getItem("token");

  return token && token !== "null" && token !== "undefined" ? token : null;
};

export default function MyCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [token, setToken] = useState(getStoredToken);

  const enrolledCourses = courses
    .map((item) => ({
      ...item,
      course: Array.isArray(item.course) ? item.course[0] : item.course,
    }))
    .filter((item) => item.course);


  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setLoading(false);
      return;
    }

    fetch(`${API}/enrollments/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            navigate("/login");
          }

          throw new Error(data.message || "Failed to fetch courses");
        }

        return data;
      })
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setError(error.message);

        setCourses([]);

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

        <NavLink
          to="/login"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl"
        >
          Go To Login
        </NavLink>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Unable To Load Courses</h1>

        <p className="mt-5 text-gray-600 text-lg">{error}</p>

        <NavLink
          to="/login"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl"
        >
          Login Again
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-6xl font-extrabold mb-14">My Courses</h1>

        {enrolledCourses.length === 0 ? (
          <div className="bg-white p-14 rounded-[40px] shadow-lg text-center">
            <h2 className="text-4xl font-bold">No Enrolled Courses</h2>

            <p className="mt-5 text-gray-600 text-lg">
              Explore courses and start learning today.
            </p>

            <NavLink
              to="/courses"
              className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl"
            >
              Browse Courses
            </NavLink>
          </div>
        ) : (
      
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {enrolledCourses.map((item) => {
              const course = item.course;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-[35px] overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
                >
                 
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
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

                    <NavLink
                      to={`/course/${course._id}`}
                      className="block text-center mt-8 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl"
                    >
                      View Details
                    </NavLink>
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
