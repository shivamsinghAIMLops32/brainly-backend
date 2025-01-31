"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentIdZodSchema = exports.contentZodSchema = exports.signinZodSchema = exports.userZodSchema = void 0;
const zod_1 = require("zod");
// Define the schema for user registration
exports.userZodSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be at least 3 characters long").max(30, "Username cannot exceed 30 characters"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
exports.signinZodSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Username must be at least 3 characters long").max(30, "Username cannot exceed 30 characters"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
});
// Schema for content validation
exports.contentZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    type: zod_1.z.enum(["article", "video", "image"]).refine((val) => ["article", "video", "image"].includes(val), {
        message: "Invalid content type",
    }),
    content: zod_1.z.string().min(1, "Content is required"),
    tags: zod_1.z.array(zod_1.z.string()).min(1, "At least one tag is required"),
    link: zod_1.z.string().optional(),
});
exports.contentIdZodSchema = zod_1.z.object({
    contentId: zod_1.z.string().length(24, "Invalid content ID").optional(),
});
// export const shareContentZodSchema = z.object({
//   contentId: z.string().length(24, "Invalid content ID").min(1, "Content ID is required"),
// });
