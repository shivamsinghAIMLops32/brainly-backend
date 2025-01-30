import { z } from "zod";

// Define the schema for user registration
export const userZodSchema = z.object({
  username: z.string().min(3).max(20), // Min 3, Max 20 chars
  password: z.string().min(6), // Min 6 chars
});

// Schema for content validation
export const contentZodSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  type: z.enum(["article", "video", "image"]).optional(), // Enum validation
  content: z.string().min(10, "Content must be at least 10 characters"),
   tags: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/)).optional(), // Validate MongoDB ObjectId
  userId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid userId"), // Validate MongoDB ObjectId
  link:z.string()
});

export const linkZodSchema = z.object({
  hash: z.string(),
  userId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid userId"), // Validate MongoDB ObjectId
  
});

export const tagZodSchema = z.object({
  title:z.string()
})