import express from "express";
import {
  likeImage,
  dislikeImage,
  getImageReactions,
} from "../controllers/reaction.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:imageId/like", authMiddleware, likeImage);
router.post("/:imageId/dislike", authMiddleware, dislikeImage);
router.get("/:imageId/reactions",authMiddleware, getImageReactions);

export default router;
