import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Courses from "./pages/Courses.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyCourses from "./pages/MyCourses.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageCourses from "./pages/admin/ManageCourses.jsx";
import ManageEnrollments from "./pages/admin/ManageEnrollments.jsx";
import ManageStudents from "./pages/admin/ManageStudents.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminRoute>
              <ManageCourses />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <ManageStudents />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/enrollments"
          element={
            <AdminRoute>
              <ManageEnrollments />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
