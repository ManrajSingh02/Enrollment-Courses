import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  return authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;
};

export const register = async (req, res) => {
  try {
    const db = getDB();

    const { name, email, password } =
      req.body;

    const existingUser =
      await db
        .collection("users")
        .findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user = {
      name,
      email,
      password:
        hashedPassword,
      role: "student",
      createdAt: new Date(),
    };

    await db
      .collection("users")
      .insertOne(user);

    res.json({
      message:
        "Registration successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Registration failed",
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const db = getDB();

    const { email, password } =
      req.body;

    const user =
      await db
        .collection("users")
        .findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};

export const verify = async (req, res) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({
        message: "No token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const db = getDB();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
