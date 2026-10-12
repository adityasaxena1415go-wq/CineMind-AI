import express from "express";
import upload from "../middleware/upload.js";
import { uploadAvatar } from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/upload/:id",
  upload.single("avatar"),
  uploadAvatar
);

export default router;