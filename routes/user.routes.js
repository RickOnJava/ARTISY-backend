import express from "express";
import {
  getPublicUserProfile,
  getPublicUserImages,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/:username",authMiddleware, getPublicUserProfile);
router.get("/:username/images", authMiddleware, getPublicUserImages);

export default router;
