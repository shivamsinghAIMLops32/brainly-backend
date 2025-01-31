import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  id: string;
  iat: number;  // Issued at timestamp
  exp: number;  // Expiration timestamp
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers['authorization'];
console.log('Authorization Header:', authHeader);  // Log the full header

  // Get token from Authorization header
  // @ts-ignore
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from "Bearer <token>"
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    // console.log(`${decodedToken.id} : is decoded token userid`);

    // Attach the decoded user information (e.g., user ID) to the req object
    req.userId = decodedToken.id;  // Store the user ID in the request object

    next(); // Proceed to the next middleware or route handler

  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;
