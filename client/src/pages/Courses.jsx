import { useEffect, useState } from "react";

import CourseCard from "../components/CourseCard";

const API =
  import.meta.env.VITE_API_URL;

export default function Courses() {
  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const coursesPerPage = 10;

  useEffect(() => {
    fetch(
      `${API}/courses?search=${search}`
    )
      .then((res) => res.json())
      .then((data) =>
        setCourses(data)
      );
  }, [search]);


  const lastIndex =
    page * coursesPerPage;

  const firstIndex =
    lastIndex - coursesPerPage;

  const currentCourses =
    courses.slice(
      firstIndex,
      lastIndex
    );

  const totalPages = Math.ceil(
    courses.length / coursesPerPage
  );

  return (
    <div className="p-5">

      {/* Search */}
      <input
        type="text"
        placeholder="Search courses..."
        className="border p-3 rounded-lg mb-5 w-full"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <p className="mb-5 text-gray-600">
        Showing {currentCourses.length} of{" "}
        {courses.length} courses
      </p>

    
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {currentCourses.map(
          (course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          )
        )}

      </div>

      <div className="flex gap-3 justify-center mt-10">

        {[
          ...Array(totalPages),
        ].map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setPage(index + 1)
            }
            className={`px-4 py-2 rounded-lg ${
              page === index + 1
                ? "bg-sky-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

      </div>
    </div>
  );
}