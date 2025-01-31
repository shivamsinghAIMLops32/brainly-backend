import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true }, // Indexing for performance reasons
    password: { type: String, required: true }, // Store hashed password here
  },
  { timestamps: true }
);

// Content schema
const contentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ["article", "video", "image"], required: true },
    content: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Link schema
const linkSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
  },
  { timestamps: true }
);

// Tag schema
const tagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Exporting models
export const UserModel = mongoose.model("User", userSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
export const LinkModel = mongoose.model("Link", linkSchema);
export const TagModel = mongoose.model("Tag", tagSchema);
