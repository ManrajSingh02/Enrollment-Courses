import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  enrollCourse,
  myEnrollments,
  removeEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/", authMiddleware, enrollCourse);

router.get(
  "/my",
  authMiddleware,
  myEnrollments
);

router.delete(
  "/:id",
  authMiddleware,
  removeEnrollment
);

export default router;