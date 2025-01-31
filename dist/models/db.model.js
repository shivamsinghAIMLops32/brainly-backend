"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// User schema
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true, index: true }, // Indexing for performance reasons
    password: { type: String, required: true }, // Store hashed password here
}, { timestamps: true });
// Content schema
const contentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ["article", "video", "image"], required: true },
    content: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
// Link schema
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    // contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
}, { timestamps: true });
// Tag schema
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true },
}, { timestamps: true });
// Exporting models
exports.UserModel = mongoose_1.default.model("User", userSchema);
exports.ContentModel = mongoose_1.default.model("Content", contentSchema);
exports.LinkModel = mongoose_1.default.model("Link", linkSchema);
exports.TagModel = mongoose_1.default.model("Tag", tagSchema);
