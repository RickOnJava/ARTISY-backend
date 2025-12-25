import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    mood: {
      type: String,
      enum: [
        "Calm",
        "Dark",
        "Vibrant",
        "Minimal",
        "Moody",
        "Aesthetic",
        "Warm",
        "Cold",
        "Dreamy",
        "Vintage",
        "Abstract",
        "Nature",
        "Urban",
        "Cinematic",
      ],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
