import { Router } from "express";
import { signUpUser,signInUser } from "../controllers/user.controller";
import validate from "../middleware/validate";
import { userZodSchema, signinZodSchema } from "../middleware/validation";

const router = Router();

// User routes
router.post("/signup", validate(userZodSchema), signUpUser);
router.post("/signin", validate(signinZodSchema), signInUser);

export default router;