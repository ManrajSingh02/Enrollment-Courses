import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { getDB } from "../config/db.js";

export const register = async (req, res) => {
  try {
    const db = getDB();

    const { name, email, password, age } = req.body;

    const existing = await db.collection("users").findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      age,
      role: "student",
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    const user = {
      _id: result.insertedId,
      name,
      email,
      age,
      role: "student",
      createdAt: newUser.createdAt,
    };

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      message: "Registered Successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const db = getDB();

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
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
      },
    );

    const { password: _password, ...userData } = user;

    res.json({
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(decoded.id) });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { password: _password, ...userData } = user;
    res.json({ user: userData });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
