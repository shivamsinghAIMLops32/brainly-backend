import { Request, Response } from "express";
import { ContentModel,LinkModel } from "../models/db.model";
import crypto from "crypto";
import mongoose from "mongoose";

export const createLink = async (req: Request, res: Response): Promise<any> => {
    // const { contentId } = req.body;
    const userId = req.userId;
  
    // if (!contentId) {
    //   return res.status(400).json({ message: "Content ID is required!" });
    // }
  
    const hashLink = await LinkModel.findOne({ userId });
    if (hashLink && hashLink.hash) {
      const shareLink = `${req.protocol}://${req.get('host')}/api/v1/brain/${hashLink.hash}`;
      return res.status(200).json({ shareLink });
    }
  
    try {
      // Check if the content exists and belongs to the user
      const content = await ContentModel.findOne({userId });
      if (!content) {
        return res.status(404).json({ message: "Content not found or unauthorized!" });
      }
  
      // Generate a unique hash for the shareable link
      const hash = crypto.randomBytes(16).toString('hex');
  
      // Save the shareable link in the database
      await LinkModel.create({ hash, userId});
  
      // Return the shareable link
      const shareLink = `${req.protocol}://${req.get('host')}/api/v1/brain/${hash}`;
      return res.status(200).json({ message: "Shareable link created!", shareLink });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  // share link
  export const shareLink = async (req: Request, res: Response): Promise<any> => {
    const { shareLink } = req.params;
  
    try {
      // Find the link in the database
      const link = await LinkModel.findOne({ hash: shareLink });
      if (!link) {
        return res.status(404).json({ message: "Invalid or expired share link!" });
      }
  
      // Find the content associated with the link
      const content = await ContentModel.findOne({ userId: link.userId })
        .populate("userId", "username");
  
      if (!content) {
        return res.status(404).json({ message: "Content not found!" });
      }
  
      // Return the shared content
      return res.status(200).json({ content });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

// delete link
  export const deleteLink = async (req: Request, res: Response): Promise<any> => {
    try {
      const { userId } = req;
  
      // Check if userId is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required!" });
      }
  
      // Find link information
      const hashedLinkInfo = await LinkModel.findOne({ userId });
  
      if (!hashedLinkInfo || !hashedLinkInfo.hash) {
        return res.status(404).json({ message: "No share link found!" });
      }
  
      // Clear the hash
      await LinkModel.findOneAndUpdate(
        { userId },
        { $set: { hash: "" } },
        { new: true }
      );
  
      return res.status(200).json({ message: "Share link deleted successfully!" });
    } catch (error) {
      console.error("Error deleting share link:", error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  };
  