import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// =====================
// Routes
// =====================

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
// =====================
// Health Check
// =====================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CineMind AI Backend Running 🚀",
  });
});

export default app;