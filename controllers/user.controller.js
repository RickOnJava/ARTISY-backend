import User from "../models/User.model.js";
import Image from "../models/Image.model.js";

// GET PUBLIC USER PROFILE
export const getPublicUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const viewerId = req.user._id;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ Owner viewing own profile
    if (user._id.toString() === viewerId) {
      return res.status(200).json({
        id: user._id,
        username: user.username,
        profileViews: user.profileViews,
        createdAt: user.createdAt,
      });
    }

    // ❌ Already viewed
    if (user.profileViewedBy.includes(viewerId)) {
      return res.status(200).json({
        id: user._id,
        username: user.username,
        profileViews: user.profileViews,
        createdAt: user.createdAt,
      });
    }

    // ✅ First-time valid profile view
    user.profileViews += 1;
    user.profileViewedBy.push(viewerId);
    await user.save();

    res.status(200).json({
      id: user._id,
      username: user.username,
      profileViews: user.profileViews,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// GET PUBLIC USER IMAGES
export const getPublicUserImages = async (req, res, next) => {
  try {
    const { username } = req.params;

    // Get user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const images = await Image.aggregate([
      {
        $match: {
          user: user._id,
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

