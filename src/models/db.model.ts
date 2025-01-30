import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, index: true }, // Make sure indexing is intended for performance reasons
    password: { type: String, required: true },
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
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // Use the model name "Tag" for references
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Use the model name "User" for references
  },
  { timestamps: true }
);

// Link schema
const linkSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Use the model name "User"
  },
  { timestamps: true }
);

// Tag schema
const tagSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

// Create models
export const UserModel = mongoose.model("User", userSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
export const LinkModel = mongoose.model("Link", linkSchema);
export const TagModel = mongoose.model("Tag", tagSchema);
