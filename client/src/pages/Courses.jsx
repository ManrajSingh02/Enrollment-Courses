import { useEffect, useState } from "react";

import { NavLink } from "react-router";

const API = import.meta.env.VITE_API_URL;

const COURSES_PER_PAGE = 10;

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(courses.length / COURSES_PER_PAGE));

  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;

  const visibleCourses = courses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/courses?search=${search}`);

        const data = await res.json();

        setCourses(data);
        setCurrentPage(1);
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
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border p-4 rounded-2xl mb-8"
        />

        <p className="text-xl mb-8">
          Showing {visibleCourses.length} of {courses.length} courses
        </p>

        {loading ? (
          <h2 className="text-2xl">Loading...</h2>
        ) : courses.length === 0 ? (
          <div className="bg-white p-14 rounded-[40px] shadow-lg text-center">
            <h2 className="text-4xl font-bold">No Courses Found</h2>
          </div>
        ) : (
          <>
          <div className="grid md:grid-cols-3 gap-8">
            {visibleCourses.map((course) => (
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

                  <NavLink
                    to={`/course/${course._id}`}
                    className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl mt-6"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>

          {courses.length > COURSES_PER_PAGE && (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="px-5 py-3 rounded-xl bg-white shadow disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-5 py-3 rounded-xl shadow ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-3 rounded-xl bg-white shadow disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}
