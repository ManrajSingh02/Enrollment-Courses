import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getNotes);

router.get("/:id", verifyToken, getNote);

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "editor"),
  createNote
);

router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "editor"),
  updateNote
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteNote
);

export default router;
