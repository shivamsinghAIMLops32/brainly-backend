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
import { ContentModel, UserModel } from "./models/db.model";
import bcrypt from "bcryptjs";
import authMiddleware from "./middleware/auth.user";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());  // for req.cookies

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
      return res.json({ message: "Logged in successfully!", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Incorrect credential!" });
    }
  }
);

// Content Routes
app.post(
  "/api/v1/content",
  authMiddleware,
  async (req: Request, res: Response):Promise<any> => {
    // how to get get id of user so use auth middleware and get get that stored in token as jwt.sign(token,jwtsecret)
    const  userId  = req.userId; // from decoded token
    const { title, type, content, tags, link } = req.body;
   
console.log('content');
    try {
        await ContentModel.create({
            title,
            type,
            content,
            tags,
            link,
            userId: userId,
          });
          return res.status(200).json({
            message: "Content created successfully!",
          });
        
    } catch (error) {
        return res.status(500).json({
            message: "Error creating content!",
            // @ts-ignore
            error: error.message,
  
        });
    }
  }
);

app.get("/api/v1/content",authMiddleware, async (req: Request, res: Response):Promise<any> => {
  // Your content fetching logic here
  const userId = req.userId;
  console.log(`i am user id  of get content with user id : ${userId} and ${typeof userId}`);
  
  try {
    const userContent = await ContentModel.findOne({userId: new mongoose.Types.ObjectId(userId)}).populate("userId","username");
    return res.status(200).json({userContent});
  } catch (error) {
    // @ts-ignore 
    return res.status( 500).json({message: error.message || error });
  }

});

app.delete("/api/v1/content", authMiddleware,async (req: Request, res: Response):Promise<any> => {
  // take userid
  const userId = req.userId;
  const contentId = req.body.contentId;

  if(!contentId){
    //@ts-ignore
    return res.status(400).json({message: "Content Id is required"});
  }
  try {
    const val = await ContentModel.deleteMany({ _id:contentId,
      // owner of content
      userId: userId});
    console.log(JSON.stringify(val));
    return res.status(200).json({message: "Content deleted successfully!"});

  } catch (error) {
    //@ts-ignore
    return res.status( 400 ).json({message: "error in deleting content ${contentId}"});
  }
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
