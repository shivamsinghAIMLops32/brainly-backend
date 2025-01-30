"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// User schema
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true, index: true }, // Make sure indexing is intended for performance reasons
    password: { type: String, required: true },
}, { timestamps: true });
// Content schema
const contentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ["article", "video", "image"], required: true },
    content: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag" }], // Use the model name "Tag" for references
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }, // Use the model name "User" for references
}, { timestamps: true });
// Link schema
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }, // Use the model name "User"
}, { timestamps: true });
// Tag schema
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
}, { timestamps: true });
// Create models
exports.UserModel = mongoose_1.default.model("User", userSchema);
exports.ContentModel = mongoose_1.default.model("Content", contentSchema);
exports.LinkModel = mongoose_1.default.model("Link", linkSchema);
exports.TagModel = mongoose_1.default.model("Tag", tagSchema);
