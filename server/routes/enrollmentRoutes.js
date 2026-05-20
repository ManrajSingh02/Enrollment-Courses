import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  enrollCourse,
  getMyEnrollments,
  removeEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", protect, enrollCourse);

router.get("/my", protect, getMyEnrollments);

router.delete("/:id", protect, removeEnrollment);

export default router;