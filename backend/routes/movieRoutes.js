import express from "express";
import { getRecommendations } from "../controllers/movieController.js";

const router = express.Router();

router.post("/recommend", getRecommendations);

export default router;