import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== "admin@gmail.com" ||
      password !== "admin123"
    ) {
      return res.status(401).json({
        message: "Invalid admin credentials",
      });
    }

    const token = jwt.sign(
      {
        id: "admin",
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      role: "admin",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const db = getDB();

    const totalUsers = await db
      .collection("users")
      .countDocuments();

    const totalCourses = await db
      .collection("courses")
      .countDocuments();

    const totalEnrollments = await db
      .collection("enrollments")
      .countDocuments();

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const db = getDB();

    const users = await db
      .collection("users")
      .find({})
      .toArray();

    res.json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = getDB();

    await db.collection("users").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const db = getDB();

    const enrollments = await db
      .collection("enrollments")
      .find({})
      .toArray();

    res.json(enrollments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllEnrollments,
};