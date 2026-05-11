import express from "express";
import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const db = getDB();

    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = {
      email,
      password,
      role: role || "viewer",
    };

    const result = await db.collection("users").insertOne(newUser);

    const token = jwt.sign(
      {
        id: result.insertedId,
        role: newUser.role,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertedId,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const db = getDB();

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
