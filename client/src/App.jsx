import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/course/:id" element={<CourseDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </>
  );
}
