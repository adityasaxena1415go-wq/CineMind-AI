import express from "express";

import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/add", addToWatchlist);

router.get("/:user", getWatchlist);

router.delete("/:id", removeFromWatchlist);

export default router;