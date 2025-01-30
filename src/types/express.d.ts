// types/express.d.ts
import * as express from "express";

// Augment the Express module to add a custom property to the Request object
declare global {
  namespace Express {
    interface Request {
      userId?: any; // Or replace `any` with the actual type of the user object
      id?: any; // Or any other custom properties you want to add
    }
  }
}
