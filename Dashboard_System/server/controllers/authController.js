import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersCollection } from "../models/User.js";
import { users as sampleUsers } from "../data/users.js";

const validRoles = ["admin", "editor", "viewer"];

const formatUser = (user) => ({
  id: user._id ? user._id.toString() : String(user.id),
  name: user.name,
  email: user.email,
  role: user.role,
});

const createToken = (user) =>
  jwt.sign(
    {
      id: user._id ? user._id.toString() : String(user.id),
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

const loginWithSampleUser = (email, password, res) => {
  const user = sampleUsers.find(
    (sampleUser) => sampleUser.email === email
  );

  if (!user) {
    return null;
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createToken(user);

  return res.json({ token, user: formatUser(user) });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const users = usersCollection();
    const exists = await users.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const now = new Date();

    const newUser = {
      name,
      email,
      password: hashed,
      role: validRoles.includes(role) ? role : "viewer",
      createdAt: now,
      updatedAt: now,
    };

    const result = await users.insertOne(newUser);

    const createdUser = { ...newUser, _id: result.insertedId };
    const token = createToken(createdUser);

    res.status(201).json({ token, user: formatUser(createdUser) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    const exists = sampleUsers.find((user) => user.email === email);

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
      role: validRoles.includes(role) ? role : "viewer",
    };

    sampleUsers.push(user);

    const token = createToken(user);

    res.status(201).json({ token, user: formatUser(user) });
  }
};

export const login = async (req, res) => {
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const sampleLogin = loginWithSampleUser(email, password, res);

  if (sampleLogin) {
    return sampleLogin;
  }

  try {
    const user = await usersCollection().findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    res.json({ token, user: formatUser(user) });
  } catch {
    return res.status(503).json({
      message: "Database connection failed. Use a sample login or fix MongoDB.",
    });
  }
};
