import Image from "../models/Image.model.js";
import cloudinary from "../config/cloudinary.js";

// UPLOAD IMAGE
export const uploadImage = async (req, res, next) => {
  try {
    const { title, mood } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    );

    const image = await Image.create({
      imageUrl: result.secure_url,
      title,
      mood,
      user: req.user._id,
    });

    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

// GET LOGGED-IN USER IMAGES
export const getMyImages = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const images = await Image.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          imageUrl: 1,
          title: 1,
          mood: 1,
          likes: 1,
          dislikes: 1,
          views: 1,
          createdAt: 1,
          "user._id": 1,
          "user.username": 1,
        },
      },
    ]);

    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};


// GET RANDOM IMAGES (LANDING PAGE)
export const getRandomImages = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 20;

    const images = await Image.aggregate([
      { $sample: { size: limit } },

      // Join with users collection
      {
        $lookup: {
          from: "users",              // MongoDB collection name
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },

      // Convert array -> object
      {
        $unwind: "$user",
      },

      // Select only needed fields
      {
        $project: {
          imageUrl: 1,
          title: 1,
          mood: 1,
          likes: 1,
          dislikes:1,
          views: 1,
          createdAt: 1,
          "user._id": 1,
          "user.username": 1,
        },
      },
    ]);

    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

// GET IMAGES BY MOOD
export const getImagesByMood = async (req, res, next) => {
  try {
    const { mood } = req.query;

    const pipeline = [];

    // Optional filter by mood
    if (mood) {
      pipeline.push({ $match: { mood } });
    }

    pipeline.push(
      { $sort: { createdAt: -1 } },

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $project: {
          imageUrl: 1,
          title: 1,
          mood: 1,
          likes: 1,
          dislikes: 1,
          views: 1,
          createdAt: 1,
          "user._id": 1,
          "user.username": 1,
        },
      }
    );

    const images = await Image.aggregate(pipeline);
    res.status(200).json(images);
  } catch (error) {
    next(error);
  }
};



// INCREMENT IMAGE VIEW COUNT
export const incrementImageView = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const viewerId = req.user._id; 

    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // ❌ If owner views own image → do nothing
    if (image.user.toString() === viewerId) {
      return res.status(200).json({ message: "Owner view ignored" });
    }

    // ❌ If user already viewed → do nothing
    if (image.viewedBy.includes(viewerId)) {
      return res.status(200).json({ message: "Already viewed" });
    }

    // ✅ First-time valid view
    image.views += 1;
    image.viewedBy.push(viewerId);

    await image.save();

    res.status(200).json({ message: "View counted" });
  } catch (error) {
    next(error);
  }
};
