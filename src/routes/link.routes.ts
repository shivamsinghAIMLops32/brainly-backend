import { Router } from "express";
import authMiddleware from "../middleware/auth.user";
import { createLink, shareLink, deleteLink } from "../controllers/link.controller";
import validate from "../middleware/validate";
import { contentZodSchema, contentIdZodSchema } from "../middleware/validation";

const router = Router();

// Content routes
router.post("/share", authMiddleware, createLink);
router.get("/:shareLink", shareLink);
router.delete("/deleteLink", authMiddleware, deleteLink);

export default router;
