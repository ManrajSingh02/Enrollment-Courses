import { Link } from "react-router";

export default function CourseCard({ course }) {
  return (
    <div className="bg-[#081028] rounded-xl overflow-hidden shadow-lg">

 
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h2 className="text-white text-xl font-bold">
          {course.title}
        </h2>

        <p className="text-gray-300 mt-2 line-clamp-3">
          {course.description}
        </p>

        <div className="flex justify-between mt-4 text-white">
          <span>{course.category}</span>

          <span>₹{course.price}</span>
        </div>

        <Link
          to={`/course/${course._id}`}
          className="block text-center bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-lg mt-5"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}