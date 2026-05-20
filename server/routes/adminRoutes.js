import express from "express";
import protect from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllEnrollments,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/dashboard", protect, adminOnly, getDashboardStats);

router.get("/users", protect, adminOnly, getAllUsers);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/enrollments", protect, adminOnly, getAllEnrollments);

export default router;
