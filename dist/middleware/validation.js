"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagZodSchema = exports.linkZodSchema = exports.contentZodSchema = exports.userZodSchema = void 0;
const zod_1 = require("zod");
// Define the schema for user registration
exports.userZodSchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20), // Min 3, Max 20 chars
    password: zod_1.z.string().min(6), // Min 6 chars
});
// Schema for content validation
exports.contentZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, "Title must be at least 5 characters"),
    type: zod_1.z.enum(["article", "video", "image"]).optional(), // Enum validation
    content: zod_1.z.string().min(10, "Content must be at least 10 characters"),
    tags: zod_1.z.array(zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/)).optional(), // Validate MongoDB ObjectId
    userId: zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid userId"), // Validate MongoDB ObjectId
    link: zod_1.z.string()
});
exports.linkZodSchema = zod_1.z.object({
    hash: zod_1.z.string(),
    userId: zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid userId"), // Validate MongoDB ObjectId
});
exports.tagZodSchema = zod_1.z.object({
    title: zod_1.z.string()
});
