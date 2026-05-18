import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Loader from "./components/Loader.jsx";

const AccessDenied = lazy(() => import("./pages/AccessDenied.jsx"));
const CourseDetails = lazy(() => import("./pages/CourseDetails.jsx"));
const Courses = lazy(() => import("./pages/Courses.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const ManageCourses = lazy(() => import("./pages/admin/ManageCourses.jsx"));
const ManageEnrollments = lazy(
  () => import("./pages/admin/ManageEnrollments.jsx"),
);
const ManageStudents = lazy(() => import("./pages/admin/ManageStudents.jsx"));
const MyCourses = lazy(() => import("./pages/MyCourses.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

export default function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-denied" element={<AccessDenied />} />
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
      </Suspense>
    </>
  );
}
