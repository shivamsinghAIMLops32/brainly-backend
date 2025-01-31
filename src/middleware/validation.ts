import { z } from "zod";

// Define the schema for user registration
export const userZodSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(30, "Username cannot exceed 30 characters"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signinZodSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(30, "Username cannot exceed 30 characters"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Schema for content validation
export const contentZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["article", "video", "image"]).refine(
    (val) => ["article", "video", "image"].includes(val),
    {
      message: "Invalid content type",
    }
  ),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  link: z.string().optional(),
});

export const contentIdZodSchema = z.object({
  contentId: z.string().length(24, "Invalid content ID").optional(),
});

// export const shareContentZodSchema = z.object({
//   contentId: z.string().length(24, "Invalid content ID").min(1, "Content ID is required"),
// });

