import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.config";
import {
  userZodSchema,
  contentZodSchema,
  tagZodSchema,
  linkZodSchema,
} from "./middleware/validation";
import validate from "./middleware/validate";
import { UserModel } from "./models/db.model";
import bcrypt from "bcryptjs";
import authMiddleware from "./middleware/auth.user";

const app = express();

dotenv.config();

app.use(express.json());

// Signup Route
app.post(
  "/api/v1/signup",
  validate(userZodSchema),
  async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    // Check if user already exists in DB
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the new user to the database
      await UserModel.create({ username, password: hashedPassword });

      return res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

// Login Route
app.post(
  "/api/v1/signin",
  validate(userZodSchema),
  async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username does not exist!" });
    }

    try {
      // Compare the provided password with the hashed password in DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      // setting cookie as name as token 
      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: false,
      });
      return res.json({ message: "Logged in successfully!" ,token});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Incorrect credential!" });
    }
  }
);

// Content Routes
app.post("/api/v1/content", authMiddleware,(req: Request, res: Response) => {
  // how to get get id of user so use auth middleware and get get that stored in token as jwt.sign(token,jwtsecret)
});

app.get("/api/v1/content", (req: Request, res: Response) => {
  // Your content fetching logic here
});

app.delete("/api/v1/content", (req: Request, res: Response) => {
  // Your content deletion logic here
});

// Share Brain Route
app.post("/api/v1/brain/share", (req: Request, res: Response) => {
  // Your brain share logic here
});

app.get("/api/v1/brain/:shareLink", (req: Request, res: Response) => {
  // Your logic for fetching shared brain link here
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
