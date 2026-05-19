import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import dns from "node:dns";
dotenv.config();

const app = express();

dns.setServers(["0.0.0.0", "8.8.8.8"]);
// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());

app.use(express.json());




// ==========================
// ROUTES
// ==========================
app.get("/api", (req, res) => {
  res.json({
    message: "API Running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/courses",
  courseRoutes
);

app.use(
  "/api/enrollments",
  enrollmentRoutes
);




// ==========================
// START SERVER
// ==========================
const PORT =
  process.env.PORT || 5000;

connectDB()
  .then(() => {

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );
    });

  })
  .catch((error) => {

    console.log(error);

  });