import express from "express";
import { deleteUser, getUsers } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("admin"), getUsers);

router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;
