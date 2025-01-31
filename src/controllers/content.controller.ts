import { Request, Response } from "express";
import { ContentModel } from "../models/db.model";
import mongoose from "mongoose";

// create content
export const createContent = 
async (req: Request, res: Response): Promise<any> => {
  const userId = req.userId; // Get the user ID from the decoded token
  const { title, type, content, tags, link } = req.body;

  console.log('Creating content');

  try {
    // Create content and associate with the userId
    await ContentModel.create({
      title,
      type,
      content,
      tags,
      link,
      userId: userId,  // Associate user ID from JWT token
    });

    return res.status(200).json({
      message: "Content created successfully!",
    });
  } catch (error ) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: "Error creating content!",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred.");
    }
  
  
  }
}

// get content by user
export const getContent =  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    console.log(`Fetching content for user with ID: ${userId}`);
    
    try {
      const userContent = await ContentModel.find({userId: new mongoose.Types.ObjectId(userId)}).populate("userId", "username");
      return res.status(200).json({ userContent });
    } catch (error ) {
      // @ts-ignore
      return res.status(500).json({ message: `${error.message}`|| "error "});
    }
  }

  // delete content of user
  export const deleteContent =  async (req: Request, res: Response): Promise<any> => {
    const userId = req.userId;
    const contentId = req.body.contentId;
  
    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required" });
    }
    try {
      const val = await ContentModel.deleteMany({ _id: contentId, userId: userId });
      console.log(JSON.stringify(val));
      return res.status(200).json({ message: "Content deleted successfully!" });
    } catch (error) {
      return res.status(400).json({ message: `Error in deleting content ${contentId}` });
    }
  }