import { useEffect, useState } from "react";

import { useParams, Link } from "react-router";

const API = import.meta.env.VITE_API_URL;

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [enrolling, setEnrolling] = useState(false);

 
  useEffect(() => {
    fetch(`${API}/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [id]);


  const enroll = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");

        return;
      }

      setEnrolling(true);

      const res = await fetch(`${API}/api/enrollments`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          authorization: token,
        },

        body: JSON.stringify({
          courseId: id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);

        setEnrolling(false);

        return;
      }

      alert(data.message);
    } catch (error) {
      console.log(error);

      alert("Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };


  if (loading) {
    return (
      <div className="text-center mt-20 text-3xl font-bold">Loading...</div>
    );
  }


  if (!course) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold">Course Not Found</h1>

        <Link
          to="/courses"
          className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl"
        >
          Back To Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-112.5 object-cover rounded-[40px] shadow-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
        
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[40px] shadow-lg">
              <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-xl">
                {course.category}
              </span>

              <h1 className="text-5xl font-extrabold mt-6 text-[#0f172a]">
                {course.title}
              </h1>

              <p className="mt-8 text-gray-600 text-lg leading-relaxed">
                {course.description}
              </p>

       
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="bg-[#f8fafc] p-6 rounded-3xl">
                  <h3 className="text-2xl font-bold">Instructor</h3>

                  <p className="mt-3 text-gray-600">{course.instructor}</p>
                </div>

                <div className="bg-[#f8fafc] p-6 rounded-3xl">
                  <h3 className="text-2xl font-bold">Difficulty</h3>

                  <p className="mt-3 text-gray-600">{course.difficulty}</p>
                </div>

                <div className="bg-[#f8fafc] p-6 rounded-3xl">
                  <h3 className="text-2xl font-bold">Duration</h3>

                  <p className="mt-3 text-gray-600">{course.duration}</p>
                </div>

                <div className="bg-[#f8fafc] p-6 rounded-3xl">
                  <h3 className="text-2xl font-bold">Price</h3>

                  <p className="mt-3 text-gray-600">₹{course.price}</p>
                </div>
              </div>
            </div>
          </div>

    
          <div>
            <div className="bg-[#0f172a] text-white p-8 rounded-[40px] shadow-2xl sticky top-10">
              <h2 className="text-4xl font-bold">Enroll Now 🚀</h2>

              <p className="mt-5 text-gray-300 leading-relaxed">
                Start learning today and improve your skills with this premium
                course.
              </p>

              <div className="mt-10">
                <div className="flex justify-between mb-5">
                  <span className="text-gray-400">Course Price</span>

                  <span className="text-2xl font-bold">₹{course.price}</span>
                </div>

                <div className="flex justify-between mb-5">
                  <span className="text-gray-400">Duration</span>

                  <span>{course.duration}</span>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-gray-400">Difficulty</span>

                  <span>{course.difficulty}</span>
                </div>
              </div>

              <button
                onClick={enroll}
                disabled={enrolling}
                className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-2xl text-lg font-semibold"
              >
                {enrolling ? "Enrolling..." : "Enroll Course"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
