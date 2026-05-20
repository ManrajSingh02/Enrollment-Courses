import { getDB } from "../config/db.js";

export const getAllUsers =
  async (req, res) => {
    try {
      const db = getDB();

      const users =
        await db
          .collection("users")
          .find({})
          .toArray();

      res.json(users);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  };

export const getAllEnrollments =
  async (req, res) => {
    try {
      const db = getDB();

      const enrollments =
        await db
          .collection("enrollments")
          .find({})
          .toArray();

      res.json(enrollments);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch enrollments",
      });
    }
  };