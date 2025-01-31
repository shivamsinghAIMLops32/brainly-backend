import { Router } from "express";
import authMiddleware from "../middleware/auth.user";
import { createContent, getContent, deleteContent } from "../controllers/content.controller";
import validate from "../middleware/validate";
import { contentZodSchema, contentIdZodSchema } from "../middleware/validation";

const router = Router();

// Content routes
router.post("/", authMiddleware, validate(contentZodSchema), createContent);
router.get("/", authMiddleware, getContent);
router.delete("/", authMiddleware, validate(contentIdZodSchema), deleteContent);

export default router;
