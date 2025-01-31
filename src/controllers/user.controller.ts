import { Request, Response } from "express";
import { UserModel } from "../models/db.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const signUpUser = 
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

// signin user
export const signInUser = 
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

      return res.json({ message: "Logged in successfully!", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Incorrect credential!" });
    }
  }