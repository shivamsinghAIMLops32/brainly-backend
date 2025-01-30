import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

interface DecodedToken {
    id: string;
    iat: number;  // Issued at timestamp
    exp: number;  // Expiration timestamp
  }

const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  // Get token from cookies
  const token = req.cookies.token; // token was set as 'token' in cookies
  // or take  it out from auth header
  // const token = req.headers["authorization"]; and then decode it 

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    // Attach the decoded user information (e.g., user ID) to the req.user
    // @ts-ignore  override the types of express req

    console.log(`${decodedToken} : is decode token`); // { id: user._id, iat: <timestamp>, exp: <timestamp> }
    
    req.userId = decodedToken.id; // you can store other user information if needed

  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  next(); // Proceed to the next middleware or route handler
};

export default authMiddleware;
