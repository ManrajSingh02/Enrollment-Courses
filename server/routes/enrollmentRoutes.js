import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  enrollCourse,
  myEnrollments,
  removeEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", protect, enrollCourse);

router.get(
  "/my",
  protect,
  myEnrollments
);

router.delete(
  "/:id",
  protect,
  removeEnrollment
);

export default router;
