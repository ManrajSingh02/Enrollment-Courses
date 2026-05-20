import express from "express";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  adminOnly,
} from "../middleware/adminMiddleware.js";

import {
  getAllUsers,
  getAllEnrollments,
} from "../controllers/adminController.js";

const router =
  express.Router();

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.get(
  "/enrollments",
  protect,
  adminOnly,
  getAllEnrollments
);

export default router;