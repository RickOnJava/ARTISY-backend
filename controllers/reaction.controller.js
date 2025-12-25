import Image from "../models/Image.model.js";

// LIKE IMAGE
export const likeImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const userId = req.user._id;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // already liked
    if (image.likes.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }

    // remove dislike if exists
    image.dislikes = image.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );

    image.likes.push(userId);
    await image.save();

    res.status(200).json({
      likes: image.likes.length,
      dislikes: image.dislikes.length,
    });
  } catch (error) {
    next(error);
  }
};

// DISLIKE IMAGE
export const dislikeImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const userId = req.user._id;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // already disliked
    if (image.dislikes.includes(userId)) {
      return res.status(400).json({ message: "Already disliked" });
    }

    // remove like if exists
    image.likes = image.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    image.dislikes.push(userId);
    await image.save();

    res.status(200).json({
      likes: image.likes.length,
      dislikes: image.dislikes.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET REACTION STATS
export const getImageReactions = async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const image = await Image.findById(imageId).select("likes dislikes");

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      likes: image.likes.length,
      dislikes: image.dislikes.length,
    });
  } catch (error) {
    next(error);
  }
};
