import express from "express";

import { ObjectId } from "mongodb";

import { getDB } from "../config/db.js";

import { verifyToken } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const db = getDB();

    const users = await db.collection("users").find().toArray();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const db = getDB();

      const userId = req.params.id;

      await db.collection("users").deleteOne({
        _id: new ObjectId(userId),
      });

      res.json({
        message: "User removed successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

export default router;
