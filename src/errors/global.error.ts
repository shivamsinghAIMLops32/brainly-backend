import { Request,Response,Errback ,NextFunction} from "express";
export const globalError = (err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }