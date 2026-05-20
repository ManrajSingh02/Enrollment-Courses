import { useEffect, useState } from "react";

import { Link } from "react-router";

const API = import.meta.env.VITE_API_URL;

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/courses?search=${search}`);

        const data = await res.json();

        setCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-4 rounded-2xl mb-8"
        />

        <p className="text-xl mb-8">Showing {courses.length} courses</p>

        {loading ? (
          <h2 className="text-2xl">Loading...</h2>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="text-2xl font-bold">{course.title}</h2>

                  <p className="text-gray-600 mt-3 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex justify-between mt-5">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {course.category}
                    </span>

                    <span className="font-bold">₹{course.price}</span>
                  </div>

                  <Link
                    to={`/course/${course._id}`}
                    className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl mt-6"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
