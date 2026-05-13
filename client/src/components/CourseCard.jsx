import { Link } from "react-router";

export default function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        border: "1px solid #1e293b",
      }}
    >
      <div style={{ fontSize: "50px" }}>
        {course.thumbnail}
      </div>

      <h2>{course.title}</h2>

      <p>{course.description}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <span>{course.category}</span>
        <span>₹{course.price}</span>
      </div>

      <Link to={`/courses/${course._id}`}>
        <button
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            background: "#0ea5e9",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          View Course
        </button>
      </Link>
    </div>
  );
}
