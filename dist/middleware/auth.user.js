"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token; // token was set as 'token' in cookies
    // or take  it out from auth header
    // const token = req.headers["authorization"]; and then decode it 
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        // Decode the JWT token
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Attach the decoded user information (e.g., user ID) to the req.user
        // @ts-ignore  override the types of express req object
        req.userId = decodedToken.id; // you can store other user information if needed
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
    next(); // Proceed to the next middleware or route handler
};
exports.default = authMiddleware;
