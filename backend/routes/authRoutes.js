import express from "express";
import upload from "../middleware/upload.js";

import {
  register,
  login,
  uploadAvatar,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// Upload Avatar
router.put(
  "/avatar/:id",
  upload.single("avatar"),
  uploadAvatar
);

export default router;