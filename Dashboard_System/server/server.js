import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./config/seed.js";
import dns from "node:dns";
dotenv.config();

const app = express();
dns.setServers(["0.0.0.0", "8.8.8.8"]);
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Dashboard API");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  console.error(error.message);

  res.status(500).json({
    message: error.message || "Internal server error",
  });
});

const startServer = async () => {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  try {
    await connectDB();
    await seedDatabase();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
