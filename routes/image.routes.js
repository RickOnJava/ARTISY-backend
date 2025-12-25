import express from "express";
import {
  uploadImage,
  getMyImages,
  getRandomImages,
  getImagesByMood,
  incrementImageView,
} from "../controllers/image.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  uploadImage
);

router.get("/my-images", authMiddleware, getMyImages);

router.get("/random",authMiddleware, getRandomImages);

router.get("/", authMiddleware, getImagesByMood); // ?mood=Calm

router.post("/:imageId/view", authMiddleware, incrementImageView);

export default router;
