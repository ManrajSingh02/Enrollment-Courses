import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getDashboardStats,
  getStudents,
  updateStudent,
  deleteStudent,
  getEnrollments,
  deleteEnrollment,
  addSampleCourses,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

router.get("/students", authMiddleware, adminMiddleware, getStudents);

router.put("/students/:id", authMiddleware, adminMiddleware, updateStudent);

router.delete("/students/:id", authMiddleware, adminMiddleware, deleteStudent);

router.get("/enrollments", authMiddleware, adminMiddleware, getEnrollments);

router.delete(
  "/enrollments/:id",
  authMiddleware,
  adminMiddleware,
  deleteEnrollment,
);

router.post(
  "/sample-courses",
  authMiddleware,
  adminMiddleware,
  addSampleCourses,
);

export default router;
