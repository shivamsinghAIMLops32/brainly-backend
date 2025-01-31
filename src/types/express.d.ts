// types/express.d.ts
import * as express from "express";

// Augment the Express module to add a custom property to the Request object
declare global {
  namespace Express {
    interface Request {
      userId?: string; // Or replace `any` with the actual type of the user object
      id?: string; // Or any other custom properties you want to add
    }
  }
}
